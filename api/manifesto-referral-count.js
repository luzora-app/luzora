const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

async function supabaseGet(path, serviceKey, extraHeaders) {
  return fetch(SUPABASE_URL + path, {
    headers: {
      apikey: serviceKey,
      Authorization: "Bearer " + serviceKey,
      "User-Agent": "Luzora-Manifesto-Referral-Count/1.0",
      ...(extraHeaders || {})
    }
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { ok: false, reason: "method_not_allowed" });
  }

  var publicId = String(req.query && req.query.id || "").trim();
  if (!UUID_RE.test(publicId)) return json(res, 400, { ok: false, reason: "invalid_id" });

  var serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return json(res, 500, { ok: false, reason: "server_not_configured" });

  try {
    var signatureResponse = await supabaseGet(
      "/rest/v1/manifesto_signatures?select=id&public_id=eq." + encodeURIComponent(publicId) + "&limit=1",
      serviceKey
    );
    if (!signatureResponse.ok) throw new Error("signature_lookup_failed");

    var signatures = await signatureResponse.json();
    if (!Array.isArray(signatures) || !signatures[0] || !signatures[0].id) {
      return json(res, 404, { ok: false, reason: "not_found" });
    }

    var referralResponse = await supabaseGet(
      "/rest/v1/manifesto_referrals?select=id&referrer_signature_id=eq." +
        encodeURIComponent(signatures[0].id) +
        "&status=in.(pending,active)",
      serviceKey,
      { Prefer: "count=exact" }
    );
    if (!referralResponse.ok) throw new Error("referral_lookup_failed");

    var referrals = await referralResponse.json();
    var contentRange = referralResponse.headers.get("content-range") || "";
    var countMatch = contentRange.match(/\/(\d+)$/);
    var count = countMatch ? Number(countMatch[1]) : (Array.isArray(referrals) ? referrals.length : 0);

    return json(res, 200, { ok: true, count: Math.max(0, count || 0) });
  } catch (error) {
    console.error("Luzora manifesto referral count failed:", error);
    return json(res, 500, { ok: false, reason: "request_failed" });
  }
};
