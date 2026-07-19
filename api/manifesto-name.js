const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || "sb_publishable_z2T50qlQe_r07Ay1Gy7c5w_Hg3euo0W";
const USER_AGENT = "luzora-website/1.0";
const NAME_RE = /^[A-Za-z0-9_]{3,24}$/;

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

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, message: "Method not allowed." });
  }

  try {
    const body = await readJson(req);
    const name = String(body.name || "").trim();

    if (!NAME_RE.test(name)) {
      return json(res, 400, { ok: false, reason: "invalid_name", available: false });
    }

    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
    const response = await fetch(SUPABASE_URL + "/rest/v1/rpc/username_available", {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT
      },
      body: JSON.stringify({ candidate: name })
    });

    let data = null;
    try {
      data = await response.json();
    } catch (error) {}

    if (!response.ok) {
      throw new Error("Supabase username check failed with status " + response.status + ".");
    }

    return json(res, 200, { ok: true, available: Boolean(data) });
  } catch (error) {
    console.error("Luzora manifesto name check failed:", error);
    return json(res, 500, { ok: false, reason: "request_failed", available: false });
  }
};
