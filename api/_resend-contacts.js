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

// Resend keys carry a permission level. A "Sending access" key can send mail
// but cannot manage contacts, which fails here with "This API key is
// restricted to only send emails".
//
// RESEND_API_KEY is used by every route that sends mail, so widening it to
// full access to fix this would widen the blast radius of that one key
// everywhere. Prefer a separate full access key used only for contacts, and
// fall back to the main key for anyone who would rather run one.
function contactsApiKey() {
  return process.env.RESEND_CONTACTS_API_KEY || process.env.RESEND_API_KEY;
}

async function callResend(path, options) {
  const apiKey = contactsApiKey();
  if (!apiKey) {
    throw new Error("RESEND_CONTACTS_API_KEY or RESEND_API_KEY must be configured.");
  }

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

// Resend's own wording is accurate but does not say what to do about it.
function describeResendError(message) {
  const text = String(message || "Resend contact sync failed.");
  if (/restricted to only send/i.test(text)) {
    return (
      text +
      " — contact management needs a Resend key with full access. Set " +
      "RESEND_CONTACTS_API_KEY to one, or widen RESEND_API_KEY."
    );
  }
  if (/properties do not exist/i.test(text)) {
    return (
      text +
      " — a custom property must be defined on the Resend audience before a " +
      "contact can carry it."
    );
  }
  return text;
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
  const hasProperties = Object.keys(properties).length > 0;

  // Resend requires a custom property to be defined on the audience before a
  // contact can carry it, and rejects the whole request otherwise. A topic id
  // can be wrong too. Neither is worth losing the contact over, so try the
  // full payload first and shed the optional parts if it is refused. The
  // address is the part that matters; the rest is decoration.
  const attempts = [];
  if (hasTopic || hasProperties) attempts.push({ topics: hasTopic, props: hasProperties });
  if (hasProperties && hasTopic) attempts.push({ topics: true, props: false });
  if (hasProperties) attempts.push({ topics: false, props: false });
  if (hasTopic && !hasProperties) attempts.push({ topics: false, props: false });
  if (!attempts.length) attempts.push({ topics: false, props: false });

  let createResult = null;
  let usedTopics = false;
  let usedProperties = false;
  let droppedProperties = false;

  for (const attempt of attempts) {
    createResult = await callResend("/contacts", {
      method: "POST",
      body: {
        email,
        unsubscribed: false,
        topics: attempt.topics ? topics : undefined,
        properties: attempt.props ? properties : undefined
      }
    });

    if (createResult.ok) {
      usedTopics = attempt.topics;
      usedProperties = attempt.props;
      droppedProperties = hasProperties && !attempt.props;
      break;
    }

    // An existing contact is not something a simpler payload fixes.
    if (createResult.status === 409) break;
  }

  if (createResult && createResult.ok) {
    return {
      duplicate: false,
      contactId: createResult.data && createResult.data.id,
      topicId: usedTopics ? topicId : null,
      topicWarning: hasTopic && !usedTopics,
      propertiesWarning: droppedProperties,
      propertiesStored: usedProperties
    };
  }

  if (!createResult || createResult.status !== 409) {
    const message =
      createResult &&
      createResult.data &&
      (createResult.data.message || createResult.data.name || createResult.data.error);
    throw new Error(describeResendError(message || "Resend contact sync failed."));
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
    throw new Error(describeResendError(topicMessage || "Resend topic sync failed."));
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
