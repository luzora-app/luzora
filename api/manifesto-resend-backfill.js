// Adds verified Manifesto signers to Resend who were never synced.
//
// Covers two cases: everyone who signed before this existed, and anyone whose
// sync failed at verification time because Resend was unreachable.
//
// Protected by a shared secret, not by being obscure. It reads every signer
// address, so an open endpoint here would be an address dump.
//
//   curl -X POST https://www.luzora.app/api/manifesto-resend-backfill \
//        -H "Authorization: Bearer $MANIFESTO_BACKFILL_SECRET" \
//        -H "Content-Type: application/json" \
//        -d '{"limit": 50, "dryRun": true}'

const { syncResendContact, manifestoTopicId } = require("./_resend-contacts.js");

const SUPABASE_URL = process.env.SUPABASE_URL || "https://wtunedbjhpxnmlsvssiw.supabase.co";
const USER_AGENT = "luzora-website/1.0";

// Resend's contact API is rate limited. A pause between calls keeps a large
// backfill from tripping it and marking half the batch as failed.
const PAUSE_MS = 120;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
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

function authorized(req) {
  const secret = process.env.MANIFESTO_BACKFILL_SECRET;
  if (!secret) return false;

  const header = String(req.headers.authorization || "");
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (token.length !== secret.length) return false;

  // Constant time compare, so a wrong secret does not leak its length or
  // prefix through response timing.
  let diff = 0;
  for (let i = 0; i < secret.length; i += 1) {
    diff |= token.charCodeAt(i) ^ secret.charCodeAt(i);
  }
  return diff === 0;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, message: "Method not allowed." });
  }

  if (!authorized(req)) {
    return json(res, 401, { ok: false, reason: "unauthorized" });
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {};

    const limit = Math.min(Math.max(Number(body.limit) || 100, 1), 500);
    const dryRun = body.dryRun === true;

    const pending = await callRpc("manifesto_signers_pending_resend", { p_limit: limit });
    const rows = Array.isArray(pending) ? pending : [];

    if (dryRun) {
      return json(res, 200, {
        ok: true,
        dryRun: true,
        pending: rows.length,
        // Usernames only. A dry run should not print an address list.
        sample: rows.slice(0, 10).map(function (row) {
          return row.username;
        })
      });
    }

    const topicId = manifestoTopicId();
    let synced = 0;
    let failed = 0;
    let withoutTopic = 0;
    let withoutProperties = 0;
    const failures = [];

    for (const row of rows) {
      try {
        const sync = await syncResendContact({
          email: row.email,
          topicId: topicId,
          properties: { source: "manifesto_backfill", username: row.username || "" }
        });

        await callRpc("mark_manifesto_resend_synced", {
          p_public_id: row.public_id,
          p_contact_id: sync.contactId || "",
          p_topic_id: sync.topicId || ""
        });

        if (sync.topicWarning) withoutTopic += 1;
        if (sync.propertiesWarning) withoutProperties += 1;
        synced += 1;
      } catch (error) {
        // Left unmarked, so the next run retries this signer.
        failed += 1;
        failures.push({ username: row.username, message: String(error.message || error) });
      }

      await delay(PAUSE_MS);
    }

    return json(res, 200, {
      ok: true,
      considered: rows.length,
      synced: synced,
      failed: failed,
      // Contacts stored, but with a part Resend refused. Not a failure, and
      // worth knowing: a wrong topic id means these people are not on the
      // list you meant to build.
      syncedWithoutTopic: withoutTopic,
      syncedWithoutProperties: withoutProperties,
      failures: failures.slice(0, 10),
      more: rows.length === limit
    });
  } catch (error) {
    console.error("Luzora manifesto Resend backfill failed:", error);
    return json(res, 500, { ok: false, reason: "request_failed" });
  }
};
