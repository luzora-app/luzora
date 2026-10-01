(function () {
  "use strict";

  // Pull the referral code from the path (/r/<username>) or a query fallback
  // (?u= / ?code= / ?ref=) so the page works with or without host rewrites.
  function readCode() {
    var fromPath = "";
    var match = window.location.pathname.match(/\/r\/([^/?#]+)/i);
    if (match) fromPath = match[1];
    if (!fromPath) {
      var params = new URLSearchParams(window.location.search);
      fromPath = params.get("u") || params.get("code") || params.get("ref") || "";
    }
    try {
      fromPath = decodeURIComponent(fromPath);
    } catch (error) {
      // keep raw value if it isn't valid percent-encoding
    }
    // Usernames are 3-24 chars of letters, numbers, underscores (see Supabase).
    var normalized = fromPath.trim().toLowerCase();
    return /^[a-z0-9_]{3,24}$/.test(normalized) ? normalized : "";
  }

  var code = readCode();
  var hero = document.querySelector(".invite-hero");
  var fromEl = document.getElementById("invite-from");
  var downloadLink = document.getElementById("invite-download-link");

  if (code && code.length >= 3) {
    if (fromEl) fromEl.textContent = "@" + code;
    // A first-party cookie survives the Chrome Web Store round-trip and is
    // readable on both the apex and www install-welcome pages. The extension
    // reads it there; visitors never have to transcribe a code.
    document.cookie = "luzora_extension_ref=" + encodeURIComponent(code)
      + "; Domain=luzora.app; Path=/; Max-Age=2592000; SameSite=Lax; Secure";
    if (downloadLink) downloadLink.href = "/download?ref=" + encodeURIComponent(code);
    document.title = "@" + code + " invited you to Luzora";
  } else {
    // No valid code: keep the page welcoming without showing a referrer pill.
    if (hero) hero.classList.add("is-generic");
    document.title = "You're invited to Luzora";
  }

})();
