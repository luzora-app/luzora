const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "sb_publishable_z2T50qlQe_r07Ay1Gy7c5w_Hg3euo0W";
const RESEND_API_URL = "https://api.resend.com";
const USER_AGENT = "luzora-website/1.0";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

async function readJson(req) {
  var chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function callResend(path, options) {
  var apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  var response = await fetch(RESEND_API_URL + path, {
    method: options.method,
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  var data = null;
  try {
    data = await response.json();
  } catch (error) {}

  return { ok: response.ok, status: response.status, data };
}

async function syncResendContact(email, source, pageUrl) {
  var topicId = process.env.RESEND_NEWSLETTER_TOPIC_ID || process.env.RESEND_TOPIC_ID;
  if (!topicId) {
    throw new Error("RESEND_NEWSLETTER_TOPIC_ID is not configured.");
  }

  var topics = [{ id: topicId, subscription: "opt_in" }];
  var createResult = await callResend("/contacts", {
    method: "POST",
    body: {
      email,
      unsubscribed: false,
      topics,
      properties: {
        source,
        page_url: pageUrl || ""
      }
    }
  });

  if (createResult.ok) {
    return {
      duplicate: false,
      contactId: createResult.data && createResult.data.id,
      topicId
    };
  }

  if (createResult.status !== 409) {
    var message =
      createResult.data && (createResult.data.message || createResult.data.name || createResult.data.error);
    throw new Error(message || "Resend contact sync failed.");
  }

  var topicResult = await callResend("/contacts/" + encodeURIComponent(email) + "/topics", {
    method: "PATCH",
    body: { topics }
  });

  if (!topicResult.ok) {
    var topicMessage =
      topicResult.data && (topicResult.data.message || topicResult.data.name || topicResult.data.error);
    throw new Error(topicMessage || "Resend topic sync failed.");
  }

  return {
    duplicate: true,
    contactId: topicResult.data && topicResult.data.id,
    topicId
  };
}

async function postSupabase(payload) {
  var response = await fetch(SUPABASE_URL + "/rest/v1/newsletter_subscribers", {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: "Bearer " + SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) return { duplicate: false };

  var text = "";
  try {
    text = await response.text();
  } catch (error) {}

  if (response.status === 409 || /duplicate|unique/i.test(text)) {
    return { duplicate: true };
  }

  return { error: true, status: response.status, message: text };
}

async function saveToSupabase(payload) {
  var firstAttempt = await postSupabase(payload);
  if (!firstAttempt.error) return firstAttempt;

  if (
    firstAttempt.status === 400 &&
    /resend_contact_id|resend_topic_id|resend_synced_at|column/i.test(firstAttempt.message || "")
  ) {
    return postSupabase({
      email: payload.email,
      source: payload.source,
      page_url: payload.page_url,
      referrer: payload.referrer,
      user_agent: payload.user_agent
    });
  }

  throw new Error(firstAttempt.message || "Supabase newsletter insert failed.");
}

async function sendWelcomeEmail(email) {
  if (process.env.RESEND_SEND_WELCOME !== "true") return null;

  var from = process.env.RESEND_FROM || "Luzora <hello@luzora.app>";
  var replyTo = process.env.RESEND_REPLY_TO || "hello@luzora.app";

  var result = await callResend("/emails", {
    method: "POST",
    body: {
      from,
      to: [email],
      reply_to: replyTo,
      subject: "You're on the Luzora list",
      html:
        "<p>Thanks for joining the Luzora list.</p>" +
        "<p>We will send product updates, beta notes, and launch news when there is something useful to share.</p>" +
        "<p>With care,<br />Luzora</p>",
      text:
        "Thanks for joining the Luzora list.\n\n" +
        "We will send product updates, beta notes, and launch news when there is something useful to share.\n\n" +
        "With care,\nLuzora"
    }
  });

  if (!result.ok) {
    var message = result.data && (result.data.message || result.data.name || result.data.error);
    throw new Error(message || "Welcome email failed.");
  }

  return result.data && result.data.id;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, message: "Method not allowed." });
  }

  try {
    var body = await readJson(req);
    var email = cleanEmail(body.email);

    if (!isValidEmail(email)) {
      return json(res, 400, { ok: false, message: "Please enter a valid email address." });
    }

    var source = String(body.source || "website").slice(0, 80);
    var pageUrl = body.page_url ? String(body.page_url).slice(0, 1000) : null;
    var resend = await syncResendContact(email, source, pageUrl);

    var supabase = await saveToSupabase({
      email,
      source,
      page_url: pageUrl,
      referrer: body.referrer ? String(body.referrer).slice(0, 1000) : null,
      user_agent: req.headers["user-agent"] || body.user_agent || null,
      resend_contact_id: resend.contactId || null,
      resend_topic_id: resend.topicId,
      resend_synced_at: new Date().toISOString()
    });

    var welcomeEmailId = null;
    try {
      welcomeEmailId = await sendWelcomeEmail(email);
    } catch (error) {
      console.error("Luzora welcome email failed:", error);
    }

    return json(res, 200, {
      ok: true,
      duplicate: resend.duplicate || supabase.duplicate,
      welcome_email_id: welcomeEmailId
    });
  } catch (error) {
    console.error("Luzora newsletter signup failed:", error);
    return json(res, 500, {
      ok: false,
      message: "Subscription failed. Please try again."
    });
  }
};
