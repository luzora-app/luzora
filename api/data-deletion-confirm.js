const crypto = require("crypto");
const { luzoraEmail } = require("./_email.js");

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const RESEND_API_URL = "https://api.resend.com";
const USER_AGENT = "luzora-website/1.0";

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  var chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function supabaseRequest(path, options) {
  var serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
  }

  var response = await fetch(SUPABASE_URL + path, {
    method: options.method,
    headers: {
      apikey: serviceKey,
      Authorization: "Bearer " + serviceKey,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation"
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  var text = "";
  try {
    text = await response.text();
  } catch (error) {}

  var data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
    }
  }

  if (!response.ok) {
    throw new Error(typeof data === "string" ? data : "Supabase request failed.");
  }

  return data;
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

  if (response.ok) return;

  var data = null;
  try {
    data = await response.json();
  } catch (error) {}

  var message = data && (data.message || data.name || data.error);
  throw new Error(message || "Resend email failed.");
}

async function notifyLuzora(request) {
  var from = process.env.RESEND_FROM || "Luzora <hello@luzora.app>";
  var notifyTo = process.env.DATA_DELETION_NOTIFY_TO || "hello@luzora.app";
  var scopeLabel = request.scope === "account" ? "Account and data" : "Task data";
  var safeEmail = escapeHtml(request.email);
  var safeScope = escapeHtml(scopeLabel);
  var safeReason = escapeHtml(request.reason);
  var safeId = escapeHtml(request.id);

  return callResend("/emails", {
    method: "POST",
    body: {
      from,
      to: [notifyTo],
      reply_to: request.email,
      subject: "Verified Luzora data deletion request",
      html:
        "<p>A user has verified a Luzora data deletion request.</p>" +
        "<p><strong>Email:</strong> " + safeEmail + "</p>" +
        "<p><strong>Scope:</strong> " + safeScope + "</p>" +
        "<p><strong>Reason:</strong> " + safeReason + "</p>" +
        "<p><strong>Request ID:</strong> " + safeId + "</p>",
      text:
        "A user has verified a Luzora data deletion request.\n\n" +
        "Email: " + request.email + "\n" +
        "Scope: " + scopeLabel + "\n" +
        "Reason: " + request.reason + "\n" +
        "Request ID: " + request.id
    }
  });
}

async function sendUserConfirmation(request) {
  var from = process.env.RESEND_FROM || "Luzora <hello@luzora.app>";
  var replyTo = process.env.RESEND_REPLY_TO || "hello@luzora.app";
  var branded = luzoraEmail({
    preheader: "Your Luzora deletion request is confirmed.",
    heading: "Your request is confirmed",
    lines: [
      "Your Luzora deletion request has been verified.",
      "We will review and process it according to our data deletion policy. Deletion can take up to 45 days where required."
    ],
    ctaLabel: "Go to Luzora",
    ctaUrl: "https://www.luzora.app",
    footerNote: "You received this email because a deletion request was verified for this Luzora account."
  });

  return callResend("/emails", {
    method: "POST",
    body: {
      from,
      to: [request.email],
      reply_to: replyTo,
      subject: "Your Luzora deletion request is confirmed",
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
    var token = String(body.token || "").trim();

    if (!/^[a-f0-9]{64}$/i.test(token)) {
      return json(res, 400, { ok: false, message: "This deletion link is invalid." });
    }

    var tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    var rows = await supabaseRequest(
      "/rest/v1/data_deletion_requests?token_hash=eq." + encodeURIComponent(tokenHash) +
        "&select=id,email,scope,reason,status,expires_at,verified_at",
      { method: "GET" }
    );
    var request = Array.isArray(rows) ? rows[0] : null;

    if (!request) {
      return json(res, 404, { ok: false, message: "This deletion link is invalid." });
    }

    if (request.status === "confirmed" || request.verified_at) {
      return json(res, 200, { ok: true, already_confirmed: true });
    }

    if (request.expires_at && new Date(request.expires_at).getTime() < Date.now()) {
      await supabaseRequest(
        "/rest/v1/data_deletion_requests?id=eq." + encodeURIComponent(request.id),
        { method: "PATCH", body: { status: "expired" }, prefer: "return=minimal" }
      );
      return json(res, 410, { ok: false, message: "This deletion link has expired. Please submit a new request." });
    }

    var verifiedAt = new Date().toISOString();
    await supabaseRequest(
      "/rest/v1/data_deletion_requests?id=eq." + encodeURIComponent(request.id),
      { method: "PATCH", body: { status: "confirmed", verified_at: verifiedAt }, prefer: "return=minimal" }
    );

    request.status = "confirmed";
    request.verified_at = verifiedAt;

    try {
      await notifyLuzora(request);
      await sendUserConfirmation(request);
    } catch (error) {
      console.error("Luzora deletion confirmation email failed:", error);
    }

    return json(res, 200, { ok: true });
  } catch (error) {
    console.error("Luzora data deletion confirmation failed:", error);
    return json(res, 500, {
      ok: false,
      message: "Could not verify this deletion request. Please try again."
    });
  }
};
