const { manifestoSignedEmail } = require("./_manifesto-email.js");

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "sb_publishable_z2T50qlQe_r07Ay1Gy7c5w_Hg3euo0W";
const RESEND_API_URL = "https://api.resend.com";
const USER_AGENT = "luzora-website/1.0";
const MANIFESTO_EMAIL_VERSION = "v3";
const MANIFESTO_CARD_BASE_URL = "https://luzora.app/manifesto/s/";
const NAME_RE = /^[A-Za-z0-9_]{3,24}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_FRAGMENT_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
const SHARE_URL_RE = /^https?:\/\/[^/\s]+\/manifesto\/s\/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const X_HANDLE_RE = /^@?[A-Za-z0-9_]{1,15}$/;

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

function normalizeSignatureResponse(value) {
  if (Array.isArray(value)) return value[0] || null;
  return value || null;
}

function normalizeXHandle(value) {
  return String(value || "").trim().replace(/^@+/, "").toLowerCase();
}

function normalizeReferralCode(value) {
  var code = String(value || "").trim().replace(/^@+/, "");
  return NAME_RE.test(code) ? code.toLowerCase() : "";
}

function extractPublicId(signature) {
  var direct = String(signature && signature.public_id || "").trim();
  if (UUID_RE.test(direct)) return direct;

  var shareUrl = String(signature && signature.share_url || "");
  var match = shareUrl.match(UUID_FRAGMENT_RE);
  return match ? match[0] : "";
}

function publicCardUrlFromPublicId(publicId) {
  var value = String(publicId || "").trim();
  return UUID_RE.test(value) ? MANIFESTO_CARD_BASE_URL + encodeURIComponent(value) : "";
}

function normalizeShareUrl(signature) {
  var shareUrl = String(signature && signature.share_url || "").trim();
  if (SHARE_URL_RE.test(shareUrl)) return shareUrl;
  return publicCardUrlFromPublicId(extractPublicId(signature));
}

function normalizePublicSignature(signature) {
  if (!signature) return null;

  var shareUrl = normalizeShareUrl(signature);
  var publicId = extractPublicId(signature);
  if (!UUID_RE.test(publicId)) {
    var match = shareUrl.match(UUID_FRAGMENT_RE);
    publicId = match ? match[0] : "";
  }

  if (!shareUrl || !UUID_RE.test(publicId)) return null;

  var normalized = Object.assign({}, signature);
  normalized.public_id = publicId;
  normalized.share_url = shareUrl;
  return normalized;
}

function hasPublicCard(signature) {
  return Boolean(normalizePublicSignature(signature));
}

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

async function fetchSignatureRows(filters, limit) {
  var serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return null;

  var response = await fetch(
    SUPABASE_URL +
      "/rest/v1/manifesto_signatures?select=username,email,public_id,signer_number,share_url,signed_at" +
      filters.map(function (filter) {
        return "&" + filter.key + "=eq." + encodeURIComponent(filter.value);
      }).join("") +
      "&order=signed_at.desc&limit=" + encodeURIComponent(String(limit || 1)),
    {
      method: "GET",
      headers: {
        apikey: serviceKey,
        Authorization: "Bearer " + serviceKey,
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT
      }
    }
  );

  if (!response.ok) return null;

  var rows = null;
  try {
    rows = await response.json();
  } catch (error) {}

  return Array.isArray(rows) ? rows : [];
}

async function findSavedSignature(name, email) {
  var normalizedName = name.toLowerCase();
  var rows = await fetchSignatureRows([
    { key: "email_normalized", value: email },
    { key: "username_normalized", value: normalizedName }
  ], 1);

  var row = rows && rows[0] || null;

  if (!row) {
    rows = await fetchSignatureRows([{ key: "email_normalized", value: email }], 5);
    row = rows && (rows.find(function (candidate) {
      return String(candidate && candidate.username || "").trim().toLowerCase() === normalizedName;
    }) || rows[0]) || null;
  }

  if (!row) {
    rows = await fetchSignatureRows([{ key: "username_normalized", value: normalizedName }], 5);
    row = rows && (rows.find(function (candidate) {
      return String(candidate && candidate.email || "").trim().toLowerCase() === email;
    }) || rows[0]) || null;
  }

  return normalizePublicSignature(row);
}

async function waitForSavedSignature(name, email, attempts, delayMs) {
  for (var index = 0; index < attempts; index += 1) {
    var signature = await findSavedSignature(name, email);
    if (hasPublicCard(signature)) return signature;
    if (index < attempts - 1) await delay(delayMs);
  }

  return null;
}

function manifestoCardUrl(signature) {
  var cardUrl = normalizeShareUrl(signature);
  if (!cardUrl) {
    throw new Error("Manifesto signature is missing a valid public card id.");
  }

  return cardUrl;
}

async function sendConfirmationEmail(email, signature) {
  var apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");

  var from = process.env.RESEND_MANIFESTO_FROM || "Luzora <notifications@luzora.app>";
  var replyTo = process.env.RESEND_REPLY_TO || "hello@luzora.app";
  var branded = manifestoSignedEmail({
    username: signature.username,
    signerNumber: signature.signer_number,
    cardUrl: manifestoCardUrl(signature)
  });

  var response = await fetch(RESEND_API_URL + "/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      "Idempotency-Key": "manifesto-confirmation-" + MANIFESTO_EMAIL_VERSION + "/" + signature.public_id
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

async function recordManifestoReferral(publicId, referrerCode) {
  var serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey || !publicId || !referrerCode) return null;

  var response = await fetch(SUPABASE_URL + "/rest/v1/rpc/record_manifesto_referral", {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: "Bearer " + serviceKey,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT
    },
    body: JSON.stringify({
      p_referred_public_id: publicId,
      p_referrer_code: referrerCode
    })
  });

  var data = null;
  try {
    data = await response.json();
  } catch (error) {}

  if (!response.ok) {
    throw new Error("Manifesto referral recording failed with status " + response.status + ".");
  }

  return data;
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
    var xHandle = normalizeXHandle(body.xHandle);
    var referrerCode = normalizeReferralCode(body.referrerCode);
    var followConfirmed = body.followConfirmed === true;
    var retweetConfirmed = body.retweetConfirmed === true;

    if (!NAME_RE.test(name)) {
      return json(res, 400, { ok: false, reason: "invalid_name" });
    }

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return json(res, 400, { ok: false, reason: "invalid_email" });
    }

    if (!X_HANDLE_RE.test(xHandle)) {
      return json(res, 400, { ok: false, reason: "invalid_x_handle" });
    }

    if (!followConfirmed || !retweetConfirmed) {
      return json(res, 400, { ok: false, reason: "social_tasks_incomplete" });
    }

    if (referrerCode === name.toLowerCase()) referrerCode = "";

    var signature = normalizeSignatureResponse(await signManifesto(name, email));
    if (!signature || !signature.ok) {
      return json(res, 200, signature || { ok: false, reason: "request_failed" });
    }

    signature = normalizePublicSignature(signature) || signature;

    if (!hasPublicCard(signature)) {
      var recoveredSignature = await waitForSavedSignature(name, email, 8, 500);
      if (hasPublicCard(recoveredSignature)) {
        signature = normalizePublicSignature(recoveredSignature);
      }
    }

    if (!hasPublicCard(signature)) {
      console.error("Manifesto signature saved without a public card id:", {
        username: signature.username,
        signer_number: signature.signer_number
      });
      return json(res, 202, {
        ok: false,
        reason: "card_pending",
        message: "Your signature was saved, but we could not open your public card yet."
      });
    }

    await recordDelivery(signature.public_id, {
      x_handle: xHandle,
      x_follow_confirmed: true,
      x_retweet_confirmed: true,
      x_tasks_confirmed_at: new Date().toISOString()
    });

    var referralAttribution = null;
    if (referrerCode) {
      try {
        referralAttribution = await recordManifestoReferral(signature.public_id, referrerCode);
      } catch (error) {
        console.error("Luzora manifesto referral attribution failed:", error);
      }
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
      referral_code: String(signature.username || name).toLowerCase(),
      referral_url:
        "https://luzora.app/manifesto?ref=" +
        encodeURIComponent(String(signature.username || name).toLowerCase()),
      referral_attribution: referralAttribution,
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
