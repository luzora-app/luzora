// One entry point for the Manifesto flow.
//
// The Hobby plan allows 12 serverless functions per deployment. Four separate
// routes for one flow spent four of them, so they are dispatched from here
// instead. The handlers are unchanged: each still lives in its own file, now
// prefixed with an underscore so Vercel does not route to it directly.
//
// Old paths still work. vercel.json rewrites them onto this function, so
// anything already calling /api/manifesto-verify-code keeps working.
//
//   /api/manifesto-flow?action=request-code
//   /api/manifesto-flow?action=verify-code
//   /api/manifesto-flow?action=signer-page
//   /api/manifesto-flow?action=resend-backfill

const handlers = {
  "request-code": require("./_manifesto-request-code.js"),
  "verify-code": require("./_manifesto-verify-code.js"),
  "signer-page": require("./_manifesto-signer-page.js"),
  "resend-backfill": require("./_manifesto-resend-backfill.js")
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
