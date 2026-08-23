const { luzoraEmail } = require("./_email.js");
const { CODE_TTL_SECONDS, generateCode, hashCode } = require("./_manifesto-code.js");

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const RESEND_API_URL = "https://api.resend.com";
const USER_AGENT = "luzora-website/1.0";
const NAME_RE = /^[A-Za-z0-9_]{3,16}$/;
const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function callRpc(name, payload) {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");

  const response = await fetch(SUPABASE_URL + "/rest/v1/rpc/" + name, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: "Bearer " + serviceKey,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT
    },
    body: JSON.stringify(payload)
  });

  let data = null;
  try {
    data = await response.json();
  } catch (error) {}

  if (!response.ok) {
    throw new Error("Supabase " + name + " failed with status " + response.status + ".");
  }

  return data;
}

async function sendCodeEmail(email, code) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");

  const minutes = Math.round(CODE_TTL_SECONDS / 60);
  const branded = luzoraEmail({
    preheader: "Your Luzora verification code is " + code + ".",
    heading: code,
    lines: [
      "Enter this code on the Manifesto page to confirm your email address and reserve your name.",
      "The code expires in " + minutes + " minutes."
    ],
    note: "If you did not ask for this, you can ignore this email. Nothing has been signed.",
    footerNote: "You received this email because someone entered this address on the Luzora Manifesto page."
  });

  const response = await fetch(RESEND_API_URL + "/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT
    },
    body: JSON.stringify({
      from: "Luzora <hello@luzora.app>",
      to: [email],
      reply_to: "hello@luzora.app",
      subject: code + " is your Luzora code",
      html: branded.html,
      text: branded.text,
      tags: [{ name: "email_type", value: "manifesto_code" }]
    })
  });

  let data = null;
  try {
    data = await response.json();
  } catch (error) {}

  if (!response.ok) {
    const message = data && (data.message || data.name || data.error);
    throw new Error(message || "Resend manifesto code failed.");
  }

  return data && data.id;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, message: "Method not allowed." });
  }

  try {
    const body = await readJson(req);
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();

    // Resume is for someone who verified but closed the tab before finishing
    // the tasks. Their address is already taken, so the signup path would
    // refuse it, and the page itself is read only. No name is involved: they
    // reserved one already.
    const resume = body.resume === true;

    if (!resume && !NAME_RE.test(name)) {
      return json(res, 400, { ok: false, reason: "invalid_name" });
    }
    if (!EMAIL_RE.test(email)) {
      return json(res, 400, { ok: false, reason: "invalid_email" });
    }

    const code = generateCode();
    const codeHash = hashCode(email, code);
    const result = resume
      ? await callRpc("start_manifesto_resume", {
          p_email: email,
          p_code_hash: codeHash,
          p_ttl_seconds: CODE_TTL_SECONDS
        })
      : await callRpc("start_manifesto_verification", {
          p_name: name,
          p_email: email,
          p_code_hash: codeHash,
          p_ttl_seconds: CODE_TTL_SECONDS
        });

    if (!result || result.ok !== true) {
      const reason = (result && result.reason) || "request_failed";

      // Already signed and verified is a destination, not a failure. The page
      // sends them to their card instead of asking for a code they cannot use.
      if (reason === "already_verified") {
        return json(res, 200, {
          ok: false,
          reason: reason,
          username: result.username || "",
          publicId: result.public_id || ""
        });
      }

      const status = reason === "too_soon" || reason === "too_many_requests" ? 429 : 400;
      return json(res, status, { ok: false, reason: reason });
    }

    // The row is stored before the mail goes out. If Resend fails, the caller
    // is told, and asking again is cheap because the code is simply replaced.
    await sendCodeEmail(email, code);

    return json(res, 200, {
      ok: true,
      username: result.username || name,
      expiresAt: result.expires_at || null,
      ttlSeconds: CODE_TTL_SECONDS
    });
  } catch (error) {
    console.error("Luzora manifesto code request failed:", error);
    return json(res, 500, { ok: false, reason: "request_failed" });
  }
};
