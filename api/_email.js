// Shared branded email layout for all Luzora transactional emails sent from the
// Vercel API functions. Email clients (Gmail, Outlook) need table-based layout
// and inline CSS, so this is intentionally not like our site CSS.
//
// luzoraEmail({ preheader, heading, lines, ctaLabel, ctaUrl, footerNote })
//   -> { html, text }
// `lines` is an array of plain-text paragraphs (escaped for you).

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function luzoraEmail(options) {
  var opts = options || {};
  var preheader = opts.preheader || "";
  var heading = opts.heading || "";
  var lines = Array.isArray(opts.lines) ? opts.lines : (opts.lines ? [opts.lines] : []);
  var ctaLabel = opts.ctaLabel || "";
  var ctaUrl = opts.ctaUrl || "";
  var footerNote = opts.footerNote || "";

  var paras = lines.map(function (line) {
    return '<p style="margin:0 0 14px;font-family:\'DM Sans\',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#38362E;">' + escapeHtml(line) + "</p>";
  }).join("");

  var button = (ctaLabel && ctaUrl)
    ? '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 4px;"><tr><td bgcolor="#FFD52B" style="border-radius:12px;">'
      + '<a href="' + escapeHtml(ctaUrl) + '" target="_blank" style="display:inline-block;padding:13px 26px;font-family:\'DM Sans\',Helvetica,Arial,sans-serif;font-weight:600;font-size:15px;line-height:1;color:#151411;text-decoration:none;border-radius:12px;">'
      + escapeHtml(ctaLabel) + "</a></td></tr></table>"
    : "";

  var footerExtra = footerNote
    ? '<p style="margin:0 0 10px;font-family:\'DM Sans\',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#8D8873;">' + escapeHtml(footerNote) + "</p>"
    : "";

  var html = '<!doctype html><html><head><meta charset="utf-8">'
    + '<meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<meta name="color-scheme" content="light"></head>'
    + '<body style="margin:0;padding:0;background:#FFFBEA;">'
    + '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#FFFBEA;">' + escapeHtml(preheader) + "</div>"
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFBEA" style="background:#FFFBEA;">'
    + '<tr><td align="center" style="padding:32px 16px;">'
    + '<table role="presentation" width="480" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:480px;background:#FFFFFF;border:1px solid #EFE9D6;border-radius:16px;">'
    + '<tr><td style="padding:26px 32px 6px;"><span style="font-family:\'Figtree\',Helvetica,Arial,sans-serif;font-weight:700;font-size:20px;letter-spacing:-0.01em;color:#151411;">Luzora</span></td></tr>'
    + '<tr><td style="padding:6px 32px 0;">'
    + '<h1 style="margin:0 0 14px;font-family:\'Figtree\',Helvetica,Arial,sans-serif;font-weight:700;font-size:22px;line-height:1.3;color:#151411;">' + escapeHtml(heading) + "</h1>"
    + paras + button
    + "</td></tr>"
    + '<tr><td style="padding:22px 32px 28px;">'
    + '<div style="border-top:1px solid #EFE9D6;margin:0 0 16px;font-size:0;line-height:0;">&nbsp;</div>'
    + footerExtra
    + '<p style="margin:0;font-family:\'DM Sans\',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#8D8873;">'
    + "For the websites you keep coming back to.<br>"
    + '<a href="https://luzora.app" target="_blank" style="color:#8D8873;text-decoration:underline;">luzora.app</a>&nbsp;&middot;&nbsp;'
    + '<a href="mailto:support@luzora.app" style="color:#8D8873;text-decoration:underline;">support@luzora.app</a>'
    + "</p></td></tr></table></td></tr></table></body></html>";

  var textParts = [];
  if (heading) textParts.push(heading);
  lines.forEach(function (line) { textParts.push(line); });
  if (ctaLabel && ctaUrl) textParts.push(ctaLabel + ": " + ctaUrl);
  if (footerNote) textParts.push(footerNote);
  textParts.push("");
  textParts.push("For the websites you keep coming back to.");
  textParts.push("luzora.app  ·  support@luzora.app");

  return { html: html, text: textParts.join("\n\n") };
}

module.exports = { luzoraEmail: luzoraEmail, escapeHtml: escapeHtml };
