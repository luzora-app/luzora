// Shared branded email layout for Luzora transactional and lifecycle emails.
// Email clients need table-based layout and inline CSS, so this intentionally
// does not mirror the website CSS structure.
//
// luzoraEmail({
//   preheader, heading, lines, ctaLabel, ctaUrl, note, footerNote,
//   imageUrl, imageAlt, align
// }) -> { html, text }

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeLines(lines) {
  if (!lines) return [];
  return Array.isArray(lines) ? lines : [lines];
}

function paragraphHtml(line, align) {
  return '<p style="margin:0 0 16px;font-family:\'DM Sans\',Arial,sans-serif;font-size:16px;line-height:24px;letter-spacing:-0.02em;text-align:' + align + ';color:#38362E;">'
    + escapeHtml(line)
    + "</p>";
}

function buttonHtml(label, url) {
  if (!label || !url) return "";

  return '<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:24px auto 0;">'
    + '<tr><td align="center" bgcolor="#FFD52B" style="background:#FFD52B;border:1px solid #B5971F;border-radius:12px;box-shadow:0 2px 4px rgba(170,119,5,0.30);">'
    + '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:13px 20px;min-width:112px;font-family:\'DM Sans\',Arial,sans-serif;font-size:14px;line-height:18px;font-weight:700;text-align:center;color:#151411;text-decoration:none;border-radius:12px;">'
    + escapeHtml(label)
    + "</a></td></tr></table>";
}

function imageHtml(url, alt) {
  if (!url) return "";

  return '<tr><td align="center" style="padding:0 44px 32px;">'
    + '<img src="' + escapeHtml(url) + '" width="240" alt="' + escapeHtml(alt || "") + '" style="display:block;width:100%;max-width:240px;height:auto;border:0;outline:none;text-decoration:none;">'
    + "</td></tr>";
}

function footerLink(label, url) {
  return '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:36px;height:36px;font-family:\'DM Sans\',Arial,sans-serif;font-size:13px;line-height:36px;font-weight:700;text-align:center;color:#0E0E0C;text-decoration:none;border-radius:8px;">'
    + escapeHtml(label)
    + "</a>";
}

function luzoraEmail(options) {
  var opts = options || {};
  var preheader = opts.preheader || "";
  var heading = opts.heading || "";
  var lines = normalizeLines(opts.lines);
  var ctaLabel = opts.ctaLabel || "";
  var ctaUrl = opts.ctaUrl || "";
  var note = opts.note || "";
  var footerNote = opts.footerNote || "You received this email because you used Luzora or requested this action.";
  var align = opts.align === "left" ? "left" : "center";
  var logoUrl = opts.logoUrl || "https://www.luzora.app/assets/brand-kit/logos/wordmark/luzora-wordmark-black.png";

  var paragraphs = lines.map(function (line) {
    return paragraphHtml(line, align);
  }).join("");

  var noteHtml = note
    ? '<p style="margin:24px 0 0;font-family:\'DM Sans\',Arial,sans-serif;font-size:14px;line-height:21px;letter-spacing:-0.02em;text-align:center;color:#38362E;">' + escapeHtml(note) + "</p>"
    : "";

  var contentAlign = align === "left" ? "left" : "center";
  var html = '<!doctype html><html><head><meta charset="utf-8">'
    + '<meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<meta name="color-scheme" content="light">'
    + '<style>@media only screen and (max-width:620px){.luzora-wrap{width:100%!important}.luzora-card-pad{padding:44px 24px!important}.luzora-main-pad{padding:16px!important}.luzora-footer{padding:32px 24px!important}}</style>'
    + "</head>"
    + '<body style="margin:0;padding:0;background:#FFFBEA;">'
    + '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#FFFBEA;mso-hide:all;">' + escapeHtml(preheader) + "</div>"
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFBEA" style="width:100%;background:#FFFBEA;">'
    + '<tr><td align="center" style="padding:0;">'
    + '<table role="presentation" class="luzora-wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#FFFBEA;">'
    + '<tr><td align="center" style="height:135px;padding:0;">'
    + '<img src="' + escapeHtml(logoUrl) + '" width="158" alt="Luzora" style="display:block;width:158px;max-width:158px;height:auto;border:0;outline:none;text-decoration:none;">'
    + "</td></tr>"
    + imageHtml(opts.imageUrl, opts.imageAlt)
    + '<tr><td class="luzora-main-pad" align="center" style="padding:16px;">'
    + '<table role="presentation" width="568" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:568px;background:#FFFFFF;border:1px solid #FFEC9D;border-radius:16px;border-collapse:separate;">'
    + '<tr><td class="luzora-card-pad" align="' + contentAlign + '" style="padding:60px 44px;">'
    + '<h1 style="margin:0 0 40px;font-family:\'DM Sans\',Arial,sans-serif;font-size:24px;line-height:29px;font-weight:700;letter-spacing:-0.01em;text-align:center;color:#000000;">' + escapeHtml(heading) + "</h1>"
    + paragraphs
    + buttonHtml(ctaLabel, ctaUrl)
    + noteHtml
    + "</td></tr></table>"
    + "</td></tr>"
    + '<tr><td class="luzora-footer" align="center" bgcolor="#FFD52B" style="padding:36px 55px;background:#FFD52B;">'
    + '<table role="presentation" width="490" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:490px;">'
    + '<tr><td align="center" style="padding:0 0 9px;">'
    + footerLink("X", "https://x.com/LuzoraHQ")
    + footerLink("YT", "https://www.youtube.com/@LuzoraHQ")
    + footerLink("Tik", "https://www.tiktok.com/@luzorahq")
    + footerLink("in", "https://www.linkedin.com/company/luzorahq")
    + "</td></tr>"
    + '<tr><td align="center" style="padding:0 0 23px;font-family:\'DM Sans\',Arial,sans-serif;font-size:14px;line-height:21px;letter-spacing:-0.02em;color:#151411;">For the website/tasks you keep coming back to</td></tr>'
    + '<tr><td align="center" style="font-family:\'DM Sans\',Arial,sans-serif;font-size:14px;line-height:21px;letter-spacing:-0.02em;color:#38362E;">'
    + escapeHtml(footerNote) + '<br>'
    + '<a href="https://www.luzora.app" target="_blank" rel="noopener noreferrer" style="color:#38362E;text-decoration:underline;">luzora.app</a>'
    + '&nbsp;&nbsp;'
    + '<a href="mailto:hello@luzora.app" style="color:#38362E;text-decoration:underline;">hello@luzora.app</a>'
    + "</td></tr></table>"
    + "</td></tr>"
    + "</table></td></tr></table></body></html>";

  var textParts = [];
  if (heading) textParts.push(heading);
  lines.forEach(function (line) { textParts.push(line); });
  if (ctaLabel && ctaUrl) textParts.push(ctaLabel + ": " + ctaUrl);
  if (note) textParts.push(note);
  textParts.push("");
  textParts.push("For the website/tasks you keep coming back to");
  textParts.push(footerNote);
  textParts.push("luzora.app");
  textParts.push("hello@luzora.app");

  return { html: html, text: textParts.join("\n\n") };
}

module.exports = { luzoraEmail: luzoraEmail, escapeHtml: escapeHtml };
