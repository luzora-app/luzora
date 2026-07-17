function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function socialIcon(href, imageUrl, label) {
  return '<td align="center" width="48" style="width:48px;">'
    + '<a href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer" aria-label="' + escapeHtml(label) + '" style="display:inline-block;width:36px;height:36px;">'
    + '<img src="' + escapeHtml(imageUrl) + '" width="18" height="18" alt="' + escapeHtml(label) + '" style="display:block;width:18px;height:18px;margin:9px auto;border:0;outline:none;text-decoration:none;">'
    + "</a></td>";
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
  var privateTestUrl = String(opts.privateTestUrl || "https://www.luzora.app/blog/help-shape-luzora-private-testing-is-opening");
  var headerImage = "https://www.luzora.app/assets/brand-kit/other%20assets/Private/emaill-header-manifesto-signature.png";
  var assetBase = "https://www.luzora.app/assets/brand-kit/other%20assets/Private/";
  var preheader = "Your Hive name is reserved and your manifesto card is ready.";
  var subject = "You signed the Luzora Manifesto, #" + signerNumber;

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
    + '<h1 class="title" style="margin:0;font-family:\'DM Sans\',Arial,sans-serif;font-size:24px;line-height:120%;font-weight:500;letter-spacing:-0.01em;color:#000000!important;text-align:center;">You signed the Luzora Manifesto</h1>'
    + '<div style="height:32px;line-height:32px;">&nbsp;</div>'
    + '<p style="margin:0;font-family:\'DM Sans\',Arial,sans-serif;font-size:16px;line-height:150%;font-weight:400;letter-spacing:-0.02em;color:#38362E!important;">'
    + "Hi " + escapeHtml(username) + ",<br><br>"
    + "You showed up.<br><br>"
    + "You are officially Luzora manifesto signer <strong>#" + escapeHtml(signerNumber) + "</strong>. Your unique Hive name has been reserved, and your manifesto card is ready.<br><br>"
    + "Signing the manifesto reserves your access to Luzora's upcoming beta. Before the beta opens, we are running a limited private test for people who want to help shape what comes next."
    + "</p>"
    + '<div style="height:24px;line-height:24px;">&nbsp;</div>'
    + button("View your manifesto card", cardUrl)
    + '<div style="height:32px;line-height:32px;">&nbsp;</div>'
    + '<p style="margin:0;font-family:\'DM Sans\',Arial,sans-serif;font-size:16px;line-height:150%;font-weight:400;letter-spacing:-0.02em;color:#38362E!important;">Want to get involved sooner? You can also apply to join the Luzora private test.</p>'
    + '<div style="height:24px;line-height:24px;">&nbsp;</div>'
    + button("Apply for the private test", privateTestUrl)
    + '<div style="height:32px;line-height:32px;">&nbsp;</div>'
    + '<p style="margin:0;font-family:\'DM Sans\',Arial,sans-serif;font-size:16px;line-height:150%;font-weight:400;letter-spacing:-0.02em;color:#38362E!important;">Keep showing up,<br><strong>The Luzora Team</strong></p>'
    + "</td></tr></table></td></tr>"
    + '<tr><td class="outer-pad" style="padding:16px;"><table role="presentation" width="568" cellpadding="0" cellspacing="0" border="0" class="footer-card" style="width:568px;background:#FFD52B!important;border-radius:16px;"><tr><td class="footer-inner" align="center" style="padding:36px 55px;">'
    + '<table role="presentation" width="192" cellpadding="0" cellspacing="0" border="0" style="width:192px;"><tr>'
    + socialIcon("https://x.com/LuzoraHQ", assetBase + "Twitter%20-%20Original.svg", "X")
    + socialIcon("https://www.youtube.com/@LuzoraHQ", assetBase + "YouTube%20-%20Negative.svg", "YouTube")
    + socialIcon("https://www.tiktok.com/@luzorahq", assetBase + "TikTok%20-%20Negative.svg", "TikTok")
    + socialIcon("https://www.linkedin.com/company/luzorahq", assetBase + "Linkedin-Black.svg", "LinkedIn")
    + "</tr></table>"
    + '<div style="height:9px;line-height:9px;">&nbsp;</div>'
    + '<p style="margin:0;font-family:\'DM Sans\',Arial,sans-serif;font-size:14px;line-height:150%;font-weight:400;letter-spacing:-0.02em;color:#151411!important;text-align:center;">For the website/tasks you keep coming back to</p>'
    + '<div style="height:23px;line-height:23px;">&nbsp;</div>'
    + '<p style="margin:0;font-family:\'DM Sans\',Arial,sans-serif;font-size:14px;line-height:150%;font-weight:400;letter-spacing:-0.02em;color:#38362E!important;text-align:center;">You received this email because you signed the Luzora manifesto.<br><a href="https://www.luzora.app" target="_blank" rel="noopener noreferrer" style="color:#38362E!important;text-decoration:underline;">luzora.app</a>&nbsp;&nbsp;<a href="mailto:support@luzora.app" style="color:#38362E!important;text-decoration:underline;">support@luzora.app</a></p>'
    + "</td></tr></table></td></tr>"
    + "</table></td></tr></table></body></html>";

  var text = [
    "You signed the Luzora Manifesto",
    "",
    "Hi " + username + ",",
    "",
    "You showed up.",
    "",
    "You are officially Luzora manifesto signer #" + signerNumber + ". Your unique Hive name has been reserved, and your manifesto card is ready.",
    "",
    "View your manifesto card: " + cardUrl,
    "",
    "Before the beta opens, we are running a limited private test for people who want to help shape what comes next.",
    "",
    "Apply for the private test: " + privateTestUrl,
    "",
    "Keep showing up,",
    "The Luzora Team"
  ].join("\n");

  return { subject: subject, preheader: preheader, html: html, text: text };
}

module.exports = { manifestoSignedEmail: manifestoSignedEmail };
