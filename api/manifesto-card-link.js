const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const USER_AGENT = "luzora-website/1.0";
const MANIFESTO_CARD_BASE_URL = "https://luzora.app/manifesto/s/";
const NAME_RE = /^[A-Za-z0-9_]{3,24}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_FRAGMENT_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
const SHARE_URL_RE = /^https?:\/\/[^/\s]+\/manifesto\/s\/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

function publicCardUrlFromPublicId(publicId) {
  var value = String(publicId || "").trim();
  return UUID_RE.test(value) ? MANIFESTO_CARD_BASE_URL + encodeURIComponent(value) : "";
}

function normalizeShareUrl(signature) {
  var shareUrl = String(signature && signature.share_url || "").trim();
  if (SHARE_URL_RE.test(shareUrl)) return shareUrl;
  return publicCardUrlFromPublicId(extractPublicId(signature));
}

function normalizePublicSignature(row) {
  if (!row) return null;

  var shareUrl = normalizeShareUrl(row);
  var publicId = extractPublicId(row);
  if (!UUID_RE.test(publicId)) {
    var match = shareUrl.match(UUID_FRAGMENT_RE);
    publicId = match ? match[0] : "";
  }

  if (!shareUrl || !UUID_RE.test(publicId)) return null;

  return {
    ok: true,
    username: row.username,
    public_id: publicId,
    signer_number: row.signer_number,
    share_url: shareUrl
  };
}

async function fetchSignatureRows(filters, limit) {
  var serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
  }

  var query =
    SUPABASE_URL +
    "/rest/v1/manifesto_signatures?select=username,email,public_id,signer_number,share_url,signed_at";

  filters.forEach(function (filter) {
    query += "&" + filter.key + "=eq." + encodeURIComponent(filter.value);
  });

  query += "&order=signed_at.desc&limit=" + encodeURIComponent(String(limit || 1));

  var response = await fetch(query, {
    method: "GET",
    headers: {
      apikey: serviceKey,
      Authorization: "Bearer " + serviceKey,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT
    }
  });

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

  return Array.isArray(rows) ? rows : [];
}

async function findSavedSignature(name, email) {
  var normalizedName = name.toLowerCase();
  var rows = await fetchSignatureRows([
    { key: "email_normalized", value: email },
    { key: "username_normalized", value: normalizedName }
  ], 1);

  var row = rows[0] || null;

  if (!row) {
    rows = await fetchSignatureRows([{ key: "email_normalized", value: email }], 5);
    row = rows.find(function (candidate) {
      return String(candidate && candidate.username || "").trim().toLowerCase() === normalizedName;
    }) || rows[0] || null;
  }

  if (!row) {
    rows = await fetchSignatureRows([{ key: "username_normalized", value: normalizedName }], 5);
    row = rows.find(function (candidate) {
      return String(candidate && candidate.email || "").trim().toLowerCase() === email;
    }) || rows[0] || null;
  }

  return normalizePublicSignature(row);
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
