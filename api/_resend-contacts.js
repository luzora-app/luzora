// Adding a contact to Resend.
//
// Extracted from the newsletter route so the Manifesto flow can reuse the same
// behaviour: create the contact, fall back without a topic if the topic is
// misconfigured, and treat an existing contact as a topic update rather than a
// failure.
//
// newsletter.js still has its own copy. It works and is deployed, so it is left
// alone for now; if it is ever touched, it should adopt this.

const RESEND_API_URL = "https://api.resend.com";
const USER_AGENT = "luzora-website/1.0";

async function callResend(path, options) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");

  const response = await fetch(RESEND_API_URL + path, {
    method: options.method,
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  let data = null;
  try {
    data = await response.json();
  } catch (error) {}

  return { ok: response.ok, status: response.status, data };
}

// Returns { contactId, topicId, duplicate, topicWarning }.
// Throws only when the contact could not be stored at all.
async function syncResendContact(options) {
  const opts = options || {};
  const email = String(opts.email || "").trim().toLowerCase();
  const topicId = opts.topicId || null;
  const properties = opts.properties || {};

  if (!email) throw new Error("An email address is required.");

  const hasTopic = Boolean(topicId);
  const topics = hasTopic ? [{ id: topicId, subscription: "opt_in" }] : [];

  const createResult = await callResend("/contacts", {
    method: "POST",
    body: {
      email,
      unsubscribed: false,
      topics: hasTopic ? topics : undefined,
      properties
    }
  });

  if (createResult.ok) {
    return {
      duplicate: false,
      contactId: createResult.data && createResult.data.id,
      topicId
    };
  }

  // A bad topic id should not cost us the contact. Store them without it and
  // report the warning so the misconfiguration is visible in logs.
  if (createResult.status !== 409 && hasTopic) {
    const fallback = await callResend("/contacts", {
      method: "POST",
      body: { email, unsubscribed: false, properties }
    });

    if (fallback.ok) {
      return {
        duplicate: false,
        contactId: fallback.data && fallback.data.id,
        topicId: null,
        topicWarning: true
      };
    }
  }

  if (createResult.status !== 409) {
    const message =
      createResult.data && (createResult.data.message || createResult.data.name || createResult.data.error);
    throw new Error(message || "Resend contact sync failed.");
  }

  // 409 means the address is already a contact. Someone who subscribed to the
  // newsletter and later signed the Manifesto is one person, not two, so this
  // adds the topic rather than trying to create them again.
  if (!hasTopic) {
    return { duplicate: true, contactId: null, topicId: null };
  }

  const topicResult = await callResend(
    "/contacts/" + encodeURIComponent(email) + "/topics",
    { method: "PATCH", body: topics }
  );

  if (!topicResult.ok) {
    const topicMessage =
      topicResult.data && (topicResult.data.message || topicResult.data.name || topicResult.data.error);
    throw new Error(topicMessage || "Resend topic sync failed.");
  }

  return {
    duplicate: true,
    contactId: topicResult.data && topicResult.data.id,
    topicId
  };
}

function manifestoTopicId() {
  return (
    process.env.RESEND_MANIFESTO_TOPIC_ID ||
    process.env.RESEND_TOPIC_ID ||
    null
  );
}

module.exports = { callResend, syncResendContact, manifestoTopicId };
