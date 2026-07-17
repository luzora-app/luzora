function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function button(label, url) {
  return '<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">'
    + '<tr><td align="center" bgcolor="#FFD52B" style="background:#FFD52B;border:1px solid #B5971F;border-radius:12px;box-shadow:0 2px 4px rgba(170,119,5,0.30);">'
    + '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:13px 20px;font-family:\'DM Sans\',Arial,sans-serif;font-size:14px;line-height:18px;font-weight:700;text-align:center;color:#151411;text-decoration:none;border-radius:12px;">'
    + escapeHtml(label)
    + "</a></td></tr></table>";
}

function manifestoSignedEmail(options) {
  var opts = options || {};
  var username = String(opts.username || "Luzora signer");
  var signerNumber = String(opts.signerNumber || "");
  var cardUrl = String(opts.cardUrl || "https://www.luzora.app/manifesto");
  var privateTestUrl = "https://www.luzora.app/blog/help-shape-luzora-private-testing-is-opening";
  var headerImage = "https://www.luzora.app/assets/brand-kit/other%20assets/Private/emaill-header-manifesto-signature.png";
  var preheader = "You are Luzora manifesto signer #" + signerNumber + ".";
  var subject = "Your Luzora manifesto card is ready";

  var html = '<!doctype html><html><head><meta charset="utf-8">'
    + '<meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">'
    + '<style>:root{color-scheme:light only}.email-bg,.email-wrap,.content-card{background:#fff!important}.footer-card{background:#FFD52B!important}@media only screen and (max-width:620px){.email-wrap{width:100%!important}.outer-pad{padding:12px!important}.header-image,.content-card,.footer-card{width:100%!important;height:auto!important}.body-inner{padding:32px 24px!important}.footer-inner{padding:32px 24px!important}.title{font-size:22px!important}}</style>'
    + "</head>"
    + '<body style="margin:0;padding:0;width:100%!important;background:#ffffff!important;font-family:\'DM Sans\',Arial,sans-serif;">'
    + '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">' + escapeHtml(preheader) + "</div>"
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="email-bg" style="width:100%;background:#ffffff!important;"><tr><td align="center" style="padding:0;">'
    + '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="email-wrap" style="width:600px;max-width:600px;background:#ffffff!important;">'
    + '<tr><td class="outer-pad" style="padding:16px;"><img class="header-image" src="' + escapeHtml(headerImage) + '" width="568" height="271" alt="Luzora manifesto signature" style="display:block;width:568px;height:auto;border:0;outline:none;text-decoration:none;border-radius:16px;"></td></tr>'
    + '<tr><td class="outer-pad" style="padding:16px;"><table role="presentation" width="568" cellpadding="0" cellspacing="0" border="0" class="content-card" style="width:568px;border-radius:16px;background:#ffffff!important;"><tr>'
    + '<td class="body-inner" style="padding:28px 52px;">'
    + '<h1 class="title" style="margin:0;font-family:\'DM Sans\',Arial,sans-serif;font-size:24px;line-height:120%;font-weight:500;letter-spacing:-0.01em;color:#000000!important;text-align:center;">Your Luzora manifesto card is ready</h1>'
    + '<div style="height:32px;line-height:32px;">&nbsp;</div>'
    + '<p style="margin:0;font-family:\'DM Sans\',Arial,sans-serif;font-size:16px;line-height:150%;font-weight:400;letter-spacing:-0.02em;color:#38362E!important;">'
    + "Hi " + escapeHtml(username) + ",<br><br>"
    + "Your manifesto signature is confirmed.<br><br>"
    + "You are Luzora manifesto signer <strong>#" + escapeHtml(signerNumber) + "</strong>. Your unique Hive name has been reserved, and your card is ready."
    + "</p>"
    + '<div style="height:24px;line-height:24px;">&nbsp;</div>'
    + button("View your manifesto card", cardUrl)
    + '<div style="height:32px;line-height:32px;">&nbsp;</div>'
    + '<p style="margin:0;font-family:\'DM Sans\',Arial,sans-serif;font-size:16px;line-height:150%;font-weight:400;letter-spacing:-0.02em;color:#38362E!important;">'
    + "You are eligible to join Luzora's beta when it goes live.<br><br>"
    + 'Right now, Luzora is in private testing. If you intend to participate, <a href="' + escapeHtml(privateTestUrl) + '" target="_blank" rel="noopener noreferrer" style="color:#38362E!important;font-weight:700;text-decoration:underline;">apply</a> for a chance to join and receive the <strong>Founding Bee</strong> role.'
    + "</p>"
    + '<div style="height:32px;line-height:32px;">&nbsp;</div>'
    + '<p style="margin:0;font-family:\'DM Sans\',Arial,sans-serif;font-size:16px;line-height:150%;font-weight:400;letter-spacing:-0.02em;color:#38362E!important;">Keep showing up,<br><strong>The Luzora Team</strong></p>'
    + "</td></tr></table></td></tr>"
    + '<tr><td class="outer-pad" style="padding:16px;"><table role="presentation" width="568" cellpadding="0" cellspacing="0" border="0" class="footer-card" style="width:568px;background:#FFD52B!important;border-radius:16px;"><tr><td class="footer-inner" align="center" style="padding:36px 55px;">'
    + '<p style="margin:0;font-family:\'DM Sans\',Arial,sans-serif;font-size:14px;line-height:150%;font-weight:400;letter-spacing:-0.02em;color:#151411!important;text-align:center;">You received this transactional email because you signed the Luzora Manifesto.</p>'
    + '<div style="height:16px;line-height:16px;">&nbsp;</div>'
    + '<p style="margin:0;font-family:\'DM Sans\',Arial,sans-serif;font-size:14px;line-height:150%;font-weight:400;letter-spacing:-0.02em;color:#38362E!important;text-align:center;">Questions? Reply to this email or contact <a href="mailto:hello@luzora.app" style="color:#38362E!important;text-decoration:underline;">hello@luzora.app</a>.<br><a href="https://www.luzora.app" target="_blank" rel="noopener noreferrer" style="color:#38362E!important;text-decoration:underline;">luzora.app</a></p>'
    + "</td></tr></table></td></tr>"
    + "</table></td></tr></table></body></html>";

  var text = [
    "Your Luzora manifesto card is ready",
    "",
    "Hi " + username + ",",
    "",
    "Your manifesto signature is confirmed.",
    "",
    "You are Luzora manifesto signer #" + signerNumber + ". Your unique Hive name has been reserved, and your card is ready.",
    "",
    "View your manifesto card: " + cardUrl,
    "",
    "You are eligible to join Luzora's beta when it goes live.",
    "",
    "Right now, Luzora is in private testing. If you intend to participate, apply for a chance to join and receive the Founding Bee role:",
    privateTestUrl,
    "",
    "Keep showing up,",
    "The Luzora Team",
    "",
    "You received this transactional email because you signed the Luzora Manifesto.",
    "Questions? Reply to this email or contact hello@luzora.app."
  ].join("\n");

  return { subject: subject, preheader: preheader, html: html, text: text };
}

module.exports = { manifestoSignedEmail: manifestoSignedEmail };
