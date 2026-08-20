// One entry point for the Manifesto flow.
//
// The Hobby plan allows 12 serverless functions per deployment. Four separate
// routes for one flow spent four of them, so they are dispatched from here
// instead. The handlers are unchanged: each still lives in its own file, now
// prefixed with an underscore so Vercel does not route to it directly.
//
// Old paths still work. vercel.json rewrites them onto this function, so
// anything already calling /api/manifesto-signer-page keeps working.
//
//   /api/manifesto-flow?action=signer-page
//   /api/manifesto-flow?action=resend-backfill
//
// Email verification has moved to The Hive.
//
// request-code and verify-code used to live here. No page on this site ever
// called them, which is why not one signer was ever marked verified through
// them, but request-code would send a code to any address already in the
// signer list and verify-code would mark the signature verified without the
// Hive knowing. The Hive now owns verification end to end, so leaving a
// second unattended door onto the same records serves nothing.
//
// The handler files remain in the repository, unreferenced, so restoring
// this is a matter of adding the two lines back rather than rewriting them.

const handlers = {
  "signer-page": require("./_manifesto-signer-page.js"),
  "resend-backfill": require("./_manifesto-resend-backfill.js")
};

// Retired actions answer plainly rather than as an unknown action, so anything
// still calling them reports something legible instead of looking like a typo.
const retired = {
  "request-code": "Email verification has moved to The Hive.",
  "verify-code": "Email verification has moved to The Hive."
};

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  let action = "";
  try {
    action = String(new URL(req.url, "http://localhost").searchParams.get("action") || "").trim();
  } catch (error) {}

  if (Object.prototype.hasOwnProperty.call(retired, action)) {
    return json(res, 410, {
      ok: false,
      reason: "moved_to_hive",
      message: retired[action]
    });
  }

  const chosen = handlers[action];
  if (!chosen) {
    return json(res, 404, {
      ok: false,
      reason: "unknown_action",
      actions: Object.keys(handlers)
    });
  }

  return chosen(req, res);
};
