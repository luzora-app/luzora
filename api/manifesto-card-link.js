const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const USER_AGENT = "luzora-website/1.0";
const NAME_RE = /^[A-Za-z0-9_]{3,24}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_FRAGMENT_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;

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

function normalizeName(value) {
  return String(value || "").trim();
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function extractPublicId(signature) {
  var direct = String(signature && signature.public_id || "").trim();
  if (UUID_RE.test(direct)) return direct;

  var shareUrl = String(signature && signature.share_url || "");
  var match = shareUrl.match(UUID_FRAGMENT_RE);
  return match ? match[0] : "";
}

async function findSavedSignature(name, email) {
  var serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
  }

  var response = await fetch(
    SUPABASE_URL +
      "/rest/v1/manifesto_signatures?select=username,public_id,signer_number,share_url" +
      "&email_normalized=eq." + encodeURIComponent(email) +
      "&username_normalized=eq." + encodeURIComponent(name.toLowerCase()) +
      "&order=signed_at.desc&limit=1",
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

  if (!response.ok) {
    var details = "";
    try {
      details = await response.text();
    } catch (error) {}
    throw new Error(details || "Supabase lookup failed.");
  }

  var rows = null;
  try {
    rows = await response.json();
  } catch (error) {}

  if (!Array.isArray(rows) || !rows[0]) return null;

  var publicId = extractPublicId(rows[0]);
  if (!UUID_RE.test(publicId)) return null;

  return {
    ok: true,
    username: rows[0].username,
    public_id: publicId,
    signer_number: rows[0].signer_number,
    share_url: rows[0].share_url || null
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, reason: "method_not_allowed" });
  }

  try {
    var body = await readJson(req);
    var name = normalizeName(body.name);
    var email = normalizeEmail(body.email);

    if (!NAME_RE.test(name) || !EMAIL_RE.test(email) || email.length > 254) {
      return json(res, 400, { ok: false, reason: "missing_identity" });
    }

    var signature = await findSavedSignature(name, email);
    if (!signature) {
      return json(res, 202, { ok: false, reason: "pending" });
    }

    return json(res, 200, signature);
  } catch (error) {
    console.error("Luzora manifesto card lookup failed:", error);
    return json(res, 500, { ok: false, reason: "lookup_failed" });
  }
};
