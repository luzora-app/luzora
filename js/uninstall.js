// =====================================================================
// Luzora - Uninstall feedback (/uninstalled)
// Submits an anonymous reason + optional note to Supabase via a
// security-definer RPC. No secrets here, only the public anon key.
// =====================================================================
(function () {
  "use strict";

  var SUPABASE_URL = "https://wtunedbjhpxnmlsvssiw.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_z2T50qlQe_r07Ay1Gy7c5w_Hg3euo0W";

  var hero = document.getElementById("uninstall-hero");
  if (!hero) return;
  var form = document.getElementById("uninstall-form");
  var messageInput = document.getElementById("uninstall-message");
  var submit = document.getElementById("uninstall-submit");
  var errorEl = document.getElementById("uninstall-error");

  // --- Context from the URL + environment (no sensitive data) ---
  var params = new URLSearchParams(window.location.search);
  var extensionVersion = (params.get("v") || params.get("version") || "").slice(0, 40);
  var source = (params.get("src") || params.get("source") || "extension_uninstall").slice(0, 60);

  function detectBrowser() {
    var ua = navigator.userAgent || "";
    if (navigator.brave) return "Brave";
    if (/Edg\//.test(ua)) return "Edge";
    if (/OPR\/|Opera/.test(ua)) return "Opera";
    if (/Firefox\//.test(ua)) return "Firefox";
    if (/Chrome\//.test(ua)) return "Chrome";
    if (/Safari\//.test(ua)) return "Safari";
    return "Other";
  }

  function selectedReason() {
    var checked = form.querySelector('input[name="reason"]:checked');
    return checked ? checked.value : "";
  }

  function setError(text) {
    if (!errorEl) return;
    errorEl.textContent = text || "";
    errorEl.hidden = !text;
  }

  form.addEventListener("change", function () {
    if (selectedReason()) setError("");
  });

  async function sendFeedback(payload) {
    var response = await fetch(SUPABASE_URL + "/rest/v1/rpc/submit_uninstall_feedback", {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: "Bearer " + SUPABASE_ANON_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("request_failed");
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var reason = selectedReason();
    if (!reason) {
      setError("Please pick a reason so we can send your feedback.");
      return;
    }
    setError("");
    submit.disabled = true;
    submit.textContent = "Sending...";

    try {
      await sendFeedback({
        reason: reason,
        message: (messageInput.value || "").trim().slice(0, 2000),
        extension_version: extensionVersion,
        browser: detectBrowser(),
        source: source
      });
      hero.setAttribute("data-state", "success");
      if (window.scrollTo) window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      submit.disabled = false;
      submit.textContent = "Send feedback";
      setError("Could not send your feedback. Please check your connection and try again.");
    }
  });
})();
