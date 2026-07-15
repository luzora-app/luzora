const crypto = require("crypto");
const { luzoraEmail } = require("./_email.js");

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
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

function getSiteOrigin(req) {
  var envOrigin = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (envOrigin) return envOrigin.replace(/\/+$/, "");

  var host = req.headers["x-forwarded-host"] || req.headers.host || "www.luzora.app";
  var proto = req.headers["x-forwarded-proto"] || "https";
  return proto + "://" + host;
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

  if (!response.ok) {
    var message = data && (data.message || data.name || data.error);
    throw new Error(message || "Resend email failed.");
  }

  return data;
}

async function insertDeletionRequest(payload) {
  var serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
  }

  var response = await fetch(SUPABASE_URL + "/rest/v1/data_deletion_requests", {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: "Bearer " + serviceKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) return;

  var text = "";
  try {
    text = await response.text();
  } catch (error) {}
  throw new Error(text || "Could not store the deletion request.");
}

async function sendVerificationEmail(email, verifyUrl, scope) {
  var from = process.env.RESEND_FROM || "Luzora <hello@luzora.app>";
  var replyTo = process.env.RESEND_REPLY_TO || "hello@luzora.app";
  var scopeLabel = scope === "account" ? "account and data" : "task data";
  var branded = luzoraEmail({
    preheader: "Verify your Luzora data deletion request.",
    heading: "Verify your request",
    lines: [
      "We received a request to delete your Luzora " + scopeLabel + ".",
      "If this was you, tap the button below to confirm the request."
    ],
    ctaLabel: "Verify Delete",
    ctaUrl: verifyUrl,
    note: "This link expires in 24 hours. If you did not request this, you can safely ignore this email."
  });

  return callResend("/emails", {
    method: "POST",
    body: {
      from,
      to: [email],
      reply_to: replyTo,
      subject: "Verify your Luzora data deletion request",
      html: branded.html,
      text: branded.text
    }
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, message: "Method not allowed." });
  }

  try {
    var body = await readJson(req);
    var email = cleanEmail(body.email);
    var scope = String(body.scope || "").trim();
    var reason = String(body.reason || "").trim();

    if (!isValidEmail(email)) {
      return json(res, 400, { ok: false, message: "Please enter a valid email address." });
    }

    if (scope !== "data" && scope !== "account") {
      return json(res, 400, { ok: false, message: "Please choose what you want to delete." });
    }

    if (reason.length < 10 || reason.length > 2000) {
      return json(res, 400, { ok: false, message: "Please share a short reason for the request." });
    }

    var token = crypto.randomBytes(32).toString("hex");
    var tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    var now = Date.now();
    var expiresAt = new Date(now + 24 * 60 * 60 * 1000).toISOString();
    var siteOrigin = getSiteOrigin(req);
    var verifyUrl = siteOrigin + "/delete-confirmed?token=" + encodeURIComponent(token);

    await insertDeletionRequest({
      email,
      scope,
      reason,
      token_hash: tokenHash,
      status: "pending",
      page_url: body.page_url ? String(body.page_url).slice(0, 1000) : null,
      referrer: body.referrer ? String(body.referrer).slice(0, 1000) : null,
      user_agent: req.headers["user-agent"] || body.user_agent || null,
      expires_at: expiresAt
    });

    await sendVerificationEmail(email, verifyUrl, scope);

    return json(res, 200, { ok: true });
  } catch (error) {
    console.error("Luzora data deletion request failed:", error);
    return json(res, 500, {
      ok: false,
      message: "Could not send the verification email. Please try again."
    });
  }
};
