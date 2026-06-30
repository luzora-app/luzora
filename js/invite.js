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
    return fromPath.trim().toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 24);
  }

  var code = readCode();
  var hero = document.querySelector(".invite-hero");
  var fromEl = document.getElementById("invite-from");
  var codeEl = document.getElementById("invite-code");
  var copyBtn = document.getElementById("invite-copy");

  if (code && code.length >= 3) {
    if (codeEl) codeEl.textContent = code;
    if (fromEl) fromEl.textContent = "@" + code;
    document.title = "@" + code + " invited you to Luzora";
  } else {
    // No valid code: show a generic invite and hide the code card.
    if (hero) hero.classList.add("is-generic");
    if (fromEl) fromEl.textContent = "You're";
    document.title = "You're invited to Luzora";
  }

  if (copyBtn && codeEl) {
    copyBtn.addEventListener("click", function () {
      var value = codeEl.textContent || "";
      var done = function () {
        var original = copyBtn.dataset.label || copyBtn.textContent;
        copyBtn.dataset.label = original;
        copyBtn.textContent = "Copied";
        copyBtn.classList.add("is-copied");
        window.setTimeout(function () {
          copyBtn.textContent = original;
          copyBtn.classList.remove("is-copied");
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done, done);
      } else {
        var input = document.createElement("input");
        input.value = value;
        document.body.appendChild(input);
        input.select();
        try { document.execCommand("copy"); } catch (error) {}
        document.body.removeChild(input);
        done();
      }
    });
  }
})();
