// Refreshes the coin name-to-identifier list.
//
// People type "BTC" or "Bitcoin". CoinGecko wants "bitcoin". This keeps the map
// that translates, and it is what the disambiguation step searches when a
// ticker is shared by several coins.
//
// The list changes slowly, so this runs rarely: weekly is plenty, and even
// daily is only 30 calls a month against a 10,000 budget. It is deliberately a
// separate route from the poller so a catalogue refresh can never delay or
// consume the five minute price cycle.
//
//   curl -X POST https://www.luzora.app/api/price-catalog-refresh \
//        -H "Authorization: Bearer $PRICE_POLL_SECRET"

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const COINGECKO_URL = "https://api.coingecko.com/api/v3";
const USER_AGENT = "luzora-website/1.0";

// The full list is thousands of coins, most of which nobody will ever watch.
// Storing all of them makes the disambiguation list noisier without making it
// more useful, so this keeps the established ones.
const MAX_COINS = 2000;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function matches(token, secret) {
  if (!secret || token.length !== secret.length) return false;
  let diff = 0;
  for (let i = 0; i < secret.length; i += 1) {
    diff |= token.charCodeAt(i) ^ secret.charCodeAt(i);
  }
  return diff === 0;
}

// Vercel Cron sends Authorization: Bearer <CRON_SECRET> automatically. Accepting
// either that or our own secret means the scheduler works without keeping two
// identical values in step, and a manual run still works from a terminal.
function authorized(req) {
  const header = String(req.headers.authorization || "");
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return false;
  return matches(token, process.env.PRICE_POLL_SECRET) || matches(token, process.env.CRON_SECRET);
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
    body: JSON.stringify(payload || {})
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

// /coins/markets carries the market cap rank, which /coins/list does not.
// Rank is what lets "SOL" offer Solana before an unknown coin with the same
// ticker, so it is worth the paged reads on a rare job.
async function fetchCoins() {
  const key = process.env.COINGECKO_API_KEY;
  const headers = { Accept: "application/json", "User-Agent": USER_AGENT };
  if (key) headers["x-cg-demo-api-key"] = key;

  const perPage = 250;
  const pages = Math.ceil(MAX_COINS / perPage);
  const coins = [];

  for (let page = 1; page <= pages; page += 1) {
    const url =
      COINGECKO_URL +
      "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=" +
      perPage +
      "&page=" +
      page +
      "&sparkline=false";

    const response = await fetch(url, { headers });

    let data = null;
    try {
      data = await response.json();
    } catch (error) {}

    if (!response.ok) {
      // Whatever was gathered so far is still worth storing. Failing the whole
      // refresh because page 6 timed out would throw away five good pages.
      if (coins.length) break;
      throw new Error("CoinGecko responded " + response.status + ".");
    }

    if (!Array.isArray(data) || !data.length) break;

    for (const row of data) {
      if (!row || !row.id || !row.symbol || !row.name) continue;
      coins.push({
        id: row.id,
        symbol: row.symbol,
        name: row.name,
        market_cap_rank: row.market_cap_rank || null
      });
    }

    if (data.length < perPage) break;
  }

  return coins;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.setHeader("Allow", "POST, GET");
    return json(res, 405, { ok: false, message: "Method not allowed." });
  }

  if (!authorized(req)) {
    return json(res, 401, { ok: false, reason: "unauthorized" });
  }

  const startedAt = Date.now();

  try {
    const coins = await fetchCoins();
    if (!coins.length) {
      return json(res, 502, { ok: false, reason: "no_coins_returned" });
    }

    const stored = await callRpc("replace_coin_catalog", { p_coins: coins });

    return json(res, 200, {
      ok: true,
      fetched: coins.length,
      stored: typeof stored === "number" ? stored : null,
      calls: Math.ceil(coins.length / 250),
      tookMs: Date.now() - startedAt
    });
  } catch (error) {
    console.error("Luzora coin catalog refresh failed:", error);
    return json(res, 500, {
      ok: false,
      reason: "refresh_failed",
      message: String(error.message || error)
    });
  }
};
