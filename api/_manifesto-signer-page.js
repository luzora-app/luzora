// Public read for a signer page. Anyone may look one up by public id,
// username, or email.
//
// Email is accepted because people remember their address, not their public
// id. That makes this endpoint an enumeration surface: without a limit,
// someone could walk a list of addresses and learn which ones signed Luzora.
// The address is never returned, and the limit below makes walking a list slow
// enough not to be worth it.

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const USER_AGENT = "luzora-website/1.0";

const WINDOW_MS = 60 * 1000;
const MAX_LOOKUPS_PER_WINDOW = 20;
const buckets = new Map();

function rateLimited(key) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.start > WINDOW_MS) {
    buckets.set(key, { start: now, count: 1 });

    // The map is per instance and short lived, but a long running instance
    // should not grow one entry per caller forever.
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) {
        if (now - v.start > WINDOW_MS) buckets.delete(k);
      }
    }
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_LOOKUPS_PER_WINDOW;
}

function clientKey(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded) return forwarded.split(",")[0].trim();
  return (req.socket && req.socket.remoteAddress) || "unknown";
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return json(res, 405, { ok: false, message: "Method not allowed." });
  }

  try {
    let lookup = "";
    if (req.method === "GET") {
      const url = new URL(req.url, "http://localhost");
      lookup = String(url.searchParams.get("q") || "").trim();
    } else {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {};
      lookup = String(body.lookup || body.q || "").trim();
    }

    if (!lookup) {
      return json(res, 400, { ok: false, reason: "missing_lookup" });
    }

    if (rateLimited(clientKey(req))) {
      return json(res, 429, { ok: false, reason: "rate_limited" });
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");

    const response = await fetch(SUPABASE_URL + "/rest/v1/rpc/get_signer_page", {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: "Bearer " + serviceKey,
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT
      },
      body: JSON.stringify({ p_lookup: lookup })
    });

    let data = null;
    try {
      data = await response.json();
    } catch (error) {}

    if (!response.ok) {
      throw new Error("Supabase get_signer_page failed with status " + response.status + ".");
    }

    if (!data || data.ok !== true) {
      const reason = (data && data.reason) || "not_found";
      const payload = { ok: false, reason: reason };
      if (reason === "not_verified" && data && data.username) payload.username = data.username;
      return json(res, 404, payload);
    }

    return json(res, 200, { ok: true, page: data });
  } catch (error) {
    console.error("Luzora signer page lookup failed:", error);
    return json(res, 500, { ok: false, reason: "request_failed" });
  }
};
