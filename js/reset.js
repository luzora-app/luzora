// =====================================================================
// Luzora - Reset Password flow
//
// Flow: the recovery email (sent by Supabase, delivered via Resend SMTP)
// links back here with a short-lived recovery session in the URL hash, e.g.
//   .../reset-password.html#access_token=...&refresh_token=...&type=recovery
// We read that token, let the user set a new password, and PUT it to
// Supabase GoTrue (/auth/v1/user). No secrets live in this file, only the
// public (publishable) anon key, exactly like the extension's supabase.js.
// =====================================================================
(function () {
  "use strict";

  // --- Supabase config (public values, same project as the extension) ---
  var SUPABASE_URL = "https://wtunedbjhpxnmlsvssiw.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_z2T50qlQe_r07Ay1Gy7c5w_Hg3euo0W";

  // --- Password rules (mirror the extension's PASSWORD_RULES) ---
  var RULES = {
    minLength: function (v) { return v.length >= 8; },
    number: function (v) { return /\d/.test(v); },
    lowercase: function (v) { return /[a-z]/.test(v); },
    uppercase: function (v) { return /[A-Z]/.test(v); },
    special: function (v) { return /[^A-Za-z0-9\s]/.test(v); }
  };

  function meetsAll(value) {
    return Object.keys(RULES).every(function (key) { return RULES[key](value); });
  }

  // --- DOM refs ---
  var hero = document.getElementById("reset-hero");
  if (!hero) return;
  var form = document.getElementById("reset-form");
  var passwordInput = document.getElementById("reset-password");
  var confirmInput = document.getElementById("reset-confirm");
  var submit = document.getElementById("reset-submit");
  var errorEl = hero.querySelector("[data-error]");
  var ruleEls = hero.querySelectorAll("[data-rule]");
  var invalidMessage = hero.querySelector("[data-invalid-message]");

  var recoveryToken = "";

  // -------------------------------------------------------------------
  // 1) Parse the recovery token (or an error) from the URL
  // -------------------------------------------------------------------
  function parseParams() {
    var out = {};
    var sources = [
      window.location.hash ? window.location.hash.slice(1) : "",
      window.location.search ? window.location.search.slice(1) : ""
    ];
    sources.forEach(function (raw) {
      if (!raw) return;
      new URLSearchParams(raw).forEach(function (value, key) {
        if (out[key] === undefined) out[key] = value;
      });
    });
    return out;
  }

  function initState() {
    var params = parseParams();

    if (params.error || params.error_code || params.error_description) {
      var msg = params.error_description
        ? decodeURIComponent(params.error_description).replace(/\+/g, " ")
        : "";
      if (/expired/i.test(msg) || params.error_code === "otp_expired") {
        msg = "This password reset link has expired. Please request a new one from the Luzora extension.";
      } else if (!msg) {
        msg = "This password reset link is invalid. Please request a new one from the Luzora extension.";
      }
      if (invalidMessage) invalidMessage.textContent = msg;
      hero.setAttribute("data-state", "invalid");
      return;
    }

    if (params.access_token && (params.type === "recovery" || !params.type)) {
      recoveryToken = params.access_token;
      hero.setAttribute("data-state", "form");
      // Clean the token out of the address bar so it isn't left in history.
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      return;
    }

    // No token at all, wrong/old link.
    hero.setAttribute("data-state", "invalid");
  }

  // -------------------------------------------------------------------
  // 2) Live validation + UI
  // -------------------------------------------------------------------
  function updateRules() {
    var value = passwordInput.value;
    ruleEls.forEach(function (el) {
      var key = el.getAttribute("data-rule");
      el.classList.toggle("is-met", RULES[key] ? RULES[key](value) : false);
    });
  }

  function formValid() {
    return meetsAll(passwordInput.value) && passwordInput.value === confirmInput.value;
  }

  function refreshSubmit() {
    var ok = formValid();
    submit.disabled = !ok;
    submit.classList.toggle("is-enabled", ok);
  }

  function onInput() {
    if (errorEl) errorEl.textContent = "";
    confirmInput.closest("[data-input]").classList.remove("is-invalid");
    updateRules();
    refreshSubmit();
  }

  passwordInput.addEventListener("input", onInput);
  confirmInput.addEventListener("input", onInput);

  // show / hide password toggles
  hero.querySelectorAll("[data-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var input = document.getElementById(btn.getAttribute("data-toggle"));
      if (!input) return;
      var show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.setAttribute("aria-pressed", show ? "true" : "false");
      btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
      var img = btn.querySelector("img");
      if (img) img.src = show ? "assets/icons/fi_eye-off-Black.svg" : "assets/icons/fi_eye-Black.svg";
    });
  });

  // -------------------------------------------------------------------
  // 3) Submit to Supabase update password
  // -------------------------------------------------------------------
  function setError(message) {
    if (errorEl) errorEl.textContent = message || "";
  }

  async function updatePassword(password) {
    var response;
    try {
      response = await fetch(SUPABASE_URL + "/auth/v1/user", {
        method: "PUT",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: "Bearer " + recoveryToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: password })
      });
    } catch (e) {
      throw new Error("Check your internet connection and try again.");
    }

    var data = null;
    var text = await response.text();
    if (text) { try { data = JSON.parse(text); } catch (e) { data = null; } }

    if (!response.ok) {
      var msg = (data && (data.msg || data.message || data.error_description)) || "";
      if (response.status === 401 || response.status === 403 || /expired|invalid|jwt/i.test(msg)) {
        throw new Error("EXPIRED");
      }
      if (/different from the old password|should be different/i.test(msg)) {
        throw new Error("Your new password must be different from your old password.");
      }
      throw new Error(msg || "Could not reset your password. Please try again.");
    }
    return data;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    setError("");

    if (!meetsAll(passwordInput.value)) {
      setError("Your password does not meet all the requirements.");
      return;
    }
    if (passwordInput.value !== confirmInput.value) {
      confirmInput.closest("[data-input]").classList.add("is-invalid");
      setError("Passwords do not match.");
      return;
    }
    if (!recoveryToken) {
      hero.setAttribute("data-state", "invalid");
      return;
    }

    submit.disabled = true;
    submit.classList.add("is-busy");
    submit.textContent = "Resetting...";

    try {
      await updatePassword(passwordInput.value);
      hero.setAttribute("data-state", "success");
    } catch (err) {
      if (err && err.message === "EXPIRED") {
        if (invalidMessage) {
          invalidMessage.textContent = "This password reset link has expired. Please request a new one from the Luzora extension.";
        }
        hero.setAttribute("data-state", "invalid");
        return;
      }
      setError((err && err.message) || "Could not reset your password. Please try again.");
      submit.classList.remove("is-busy");
      submit.textContent = "Reset Password";
      refreshSubmit();
    }
  });

  // boot
  initState();
  updateRules();
  refreshSubmit();
})();
