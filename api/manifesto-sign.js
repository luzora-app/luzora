const { manifestoSignedEmail } = require("./_manifesto-email.js");

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "sb_publishable_z2T50qlQe_r07Ay1Gy7c5w_Hg3euo0W";
const RESEND_API_URL = "https://api.resend.com";
const USER_AGENT = "luzora-website/1.0";
const NAME_RE = /^[A-Za-z0-9_]{3,24}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  var chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function signManifesto(name, email) {
  var response = await fetch(SUPABASE_URL + "/rest/v1/rpc/sign_manifesto", {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: "Bearer " + SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT
    },
    body: JSON.stringify({ p_name: name, p_email: email })
  });

  var data = null;
  try {
    data = await response.json();
  } catch (error) {}

  if (!response.ok) {
    throw new Error("Supabase manifesto signing failed with status " + response.status + ".");
  }

  return data;
}

async function sendConfirmationEmail(email, signature) {
  var apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");

  var from = process.env.RESEND_FROM || "Luzora <hello@luzora.app>";
  var replyTo = process.env.RESEND_REPLY_TO || "hello@luzora.app";
  var branded = manifestoSignedEmail({
    username: signature.username,
    signerNumber: signature.signer_number,
    cardUrl: signature.share_url,
    privateTestUrl: "https://www.luzora.app/blog/help-shape-luzora-private-testing-is-opening"
  });

  var response = await fetch(RESEND_API_URL + "/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      "Idempotency-Key": "manifesto-confirmation/" + signature.public_id
    },
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: replyTo,
      subject: branded.subject,
      html: branded.html,
      text: branded.text,
      tags: [
        { name: "email_type", value: "manifesto_confirmation" },
        { name: "signer_number", value: String(signature.signer_number) }
      ]
    })
  });

  var data = null;
  try {
    data = await response.json();
  } catch (error) {}

  if (!response.ok) {
    var message = data && (data.message || data.name || data.error);
    throw new Error(message || "Resend manifesto confirmation failed.");
  }

  return data && data.id;
}

async function recordDelivery(publicId, values) {
  var serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.error("Manifesto email delivery was not recorded: SUPABASE_SERVICE_ROLE_KEY is missing.");
    return;
  }

  var response = await fetch(
    SUPABASE_URL + "/rest/v1/manifesto_signatures?public_id=eq." + encodeURIComponent(publicId),
    {
      method: "PATCH",
      headers: {
        apikey: serviceKey,
        Authorization: "Bearer " + serviceKey,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(values)
    }
  );

  if (!response.ok) {
    var details = "";
    try {
      details = await response.text();
    } catch (error) {}
    console.error("Manifesto email delivery tracking failed:", details || response.status);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, message: "Method not allowed." });
  }

  try {
    var body = await readJson(req);
    var name = String(body.name || "").trim();
    var email = String(body.email || "").trim().toLowerCase();

    if (!NAME_RE.test(name)) {
      return json(res, 400, { ok: false, reason: "invalid_name" });
    }

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return json(res, 400, { ok: false, reason: "invalid_email" });
    }

    var signature = await signManifesto(name, email);
    if (!signature || !signature.ok) {
      return json(res, 200, signature || { ok: false, reason: "request_failed" });
    }

    var attemptedAt = new Date().toISOString();
    var emailId = null;
    var emailError = null;

    try {
      emailId = await sendConfirmationEmail(email, signature);
      await recordDelivery(signature.public_id, {
        confirmation_email_attempted_at: attemptedAt,
        confirmation_email_sent_at: new Date().toISOString(),
        confirmation_email_id: emailId || null,
        confirmation_email_error: null
      });
    } catch (error) {
      emailError = String(error && error.message || "Email delivery failed.").slice(0, 1000);
      console.error("Luzora manifesto confirmation email failed:", error);
      await recordDelivery(signature.public_id, {
        confirmation_email_attempted_at: attemptedAt,
        confirmation_email_error: emailError
      });
    }

    return json(res, 200, {
      ...signature,
      confirmation_email_sent: Boolean(emailId),
      confirmation_email_id: emailId || null
    });
  } catch (error) {
    console.error("Luzora manifesto signing failed:", error);
    return json(res, 500, {
      ok: false,
      reason: "request_failed",
      message: "Could not sign right now. Please try again."
    });
  }
};
