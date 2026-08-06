const { hashCode, isSixDigits } = require("./_manifesto-code.js");

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const USER_AGENT = "luzora-website/1.0";
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

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, message: "Method not allowed." });
  }

  try {
    const body = await readJson(req);
    const email = String(body.email || "").trim().toLowerCase();
    const code = String(body.code || "").trim();

    if (!EMAIL_RE.test(email)) {
      return json(res, 400, { ok: false, reason: "invalid_email" });
    }

    // Shape is checked here so a malformed entry never spends one of the five
    // attempts the database allows.
    if (!isSixDigits(code)) {
      return json(res, 400, { ok: false, reason: "invalid_code" });
    }

    const result = await callRpc("verify_manifesto_code", {
      p_email: email,
      p_code_hash: hashCode(email, code)
    });

    if (!result || result.ok !== true) {
      const reason = (result && result.reason) || "request_failed";
      const status = reason === "too_many_attempts" ? 429 : 400;
      const payload = { ok: false, reason: reason };
      if (result && typeof result.attempts_left === "number") {
        payload.attemptsLeft = result.attempts_left;
      }
      return json(res, status, payload);
    }

    return json(res, 200, {
      ok: true,
      alreadyVerified: Boolean(result.already_verified),
      username: result.username || "",
      publicId: result.public_id || "",
      shareUrl: result.share_url || "",
      credited: Number(result.credited || 0)
    });
  } catch (error) {
    console.error("Luzora manifesto code verification failed:", error);
    return json(res, 500, { ok: false, reason: "request_failed" });
  }
};
