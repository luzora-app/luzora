// The price poller.
//
// Asks CoinGecko once for every coin anyone is still waiting on, stores the
// answers, and fires the alerts those prices have satisfied.
//
// One request covers every coin, which is the whole reason the free tier works:
// ten users and ten thousand users cost the same. Only the number of distinct
// coins matters, and those all travel in one address.
//
// Budget: the Demo tier allows 10,000 calls a month. At one call every five
// minutes that is about 8,928 in a 31 day month, roughly 11% spare. Adding a
// second endpoint per cycle would put it over, so this route deliberately calls
// exactly one.
//
// Run from a scheduler every five minutes:
//   curl -X POST https://www.luzora.app/api/price-poll \
//        -H "Authorization: Bearer $PRICE_POLL_SECRET"

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const COINGECKO_URL = "https://api.coingecko.com/api/v3";
const USER_AGENT = "luzora-website/1.0";

// Coin ids travel in the query string, and addresses have a practical length
// limit. Past this many, the batch is split, which costs a second call. Logged
// loudly because two calls every five minutes is over the monthly budget.
const MAX_IDS_PER_REQUEST = 200;

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

// The Demo key goes in a header, never in the query string, so it does not end
// up in logs or referrers.
async function fetchPrices(ids) {
  const key = process.env.COINGECKO_API_KEY;
  const headers = {
    Accept: "application/json",
    "User-Agent": USER_AGENT
  };
  if (key) headers["x-cg-demo-api-key"] = key;

  const url =
    COINGECKO_URL +
    "/simple/price?ids=" +
    encodeURIComponent(ids.join(",")) +
    "&vs_currencies=usd";

  const response = await fetch(url, { headers });

  let data = null;
  try {
    data = await response.json();
  } catch (error) {}

  if (!response.ok) {
    const message = (data && (data.error || data.status?.error_message)) || "";
    // 429 means the budget or the rate limit is spent. Retrying immediately
    // would spend more of it, so this surfaces and stops.
    throw new Error(
      "CoinGecko responded " + response.status + (message ? ": " + message : "") + "."
    );
  }

  return data || {};
}

module.exports = async function handler(req, res) {
  // The Hobby plan allows 12 serverless functions per deployment, so the
  // catalogue refresh is dispatched from here rather than owning a route of its
  // own. It is still a separate file, and still a separate schedule.
  let job = "";
  try {
    job = String(new URL(req.url, "http://localhost").searchParams.get("job") || "").trim();
  } catch (error) {}

  if (job === "catalog") {
    return require("./_price-catalog-refresh.js")(req, res);
  }

  if (req.method !== "POST" && req.method !== "GET") {
    res.setHeader("Allow", "POST, GET");
    return json(res, 405, { ok: false, message: "Method not allowed." });
  }

  if (!authorized(req)) {
    return json(res, 401, { ok: false, reason: "unauthorized" });
  }

  const startedAt = Date.now();

  try {
    const rows = await callRpc("price_alert_watchlist", {});
    const ids = (Array.isArray(rows) ? rows : [])
      .map(function (row) {
        return row && row.coin_id;
      })
      .filter(Boolean);

    // Nobody is waiting on anything. Spending a call to confirm that would be
    // spending budget on nothing.
    if (!ids.length) {
      return json(res, 200, {
        ok: true,
        watched: 0,
        calls: 0,
        fired: 0,
        note: "nothing being watched"
      });
    }

    const batches = [];
    for (let i = 0; i < ids.length; i += MAX_IDS_PER_REQUEST) {
      batches.push(ids.slice(i, i + MAX_IDS_PER_REQUEST));
    }

    if (batches.length > 1) {
      console.error(
        "Luzora price poll used " +
          batches.length +
          " calls for " +
          ids.length +
          " coins. More than one call per cycle exceeds the monthly budget."
      );
    }

    let quotes = {};
    for (const batch of batches) {
      const part = await fetchPrices(batch);
      quotes = Object.assign(quotes, part);
    }

    // CoinGecko returns { bitcoin: { usd: 94180 } }. Flattened to
    // { bitcoin: 94180 } so the database function takes one simple shape.
    const flat = {};
    let missing = 0;
    for (const id of ids) {
      const value = quotes[id] && quotes[id].usd;
      if (typeof value === "number" && isFinite(value)) flat[id] = value;
      else missing += 1;
    }

    const fired = await callRpc("record_coin_quotes", { p_quotes: flat });
    const firedRows = Array.isArray(fired) ? fired : [];

    return json(res, 200, {
      ok: true,
      watched: ids.length,
      priced: Object.keys(flat).length,
      // A coin CoinGecko does not recognise never gets a price and its alert
      // waits forever. Surfaced rather than swallowed.
      unpriced: missing,
      calls: batches.length,
      fired: firedRows.length,
      firedAlerts: firedRows.slice(0, 20).map(function (row) {
        return { coin: row.coin_id, target: row.target, price: row.fired_price };
      }),
      tookMs: Date.now() - startedAt
    });
  } catch (error) {
    console.error("Luzora price poll failed:", error);
    return json(res, 500, { ok: false, reason: "poll_failed", message: String(error.message || error) });
  }
};
