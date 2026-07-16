// The Luzora Manifesto signing flow.
(function () {
  "use strict";

  var SUPABASE_URL = "https://wtunedbjhpxnmlsvssiw.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_z2T50qlQe_r07Ay1Gy7c5w_Hg3euo0W";
  var NAME_RE = /^[A-Za-z0-9_]{3,24}$/;
  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  var UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  document.querySelectorAll(".m-list li").forEach(function (item, index) {
    item.style.setProperty("--i", index);
  });

  window.requestAnimationFrame(function () {
    document.querySelectorAll("[data-anim]").forEach(function (element) {
      element.classList.add("is-in");
    });
  });

  var overlay = document.getElementById("m-overlay");
  var nameInput = document.getElementById("m-name");
  var emailInput = document.getElementById("m-email");
  var submit = document.getElementById("m-submit");
  var errorElement = document.getElementById("m-form-error");
  var nameHint = document.getElementById("m-name-hint");
  var form = document.getElementById("m-form");
  var followButton = document.querySelector("[data-follow-x]");
  var followLabel = document.querySelector("[data-follow-label]");
  var followConfirmed = false;

  function openModal() {
    overlay.hidden = false;
    overlay.setAttribute("data-state", "form");
    document.body.style.overflow = "hidden";
    window.setTimeout(function () {
      if (nameInput) nameInput.focus();
    }, 60);
  }

  function closeModal() {
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-sign-open]").forEach(function (button) {
    button.addEventListener("click", openModal);
  });

  document.querySelectorAll("[data-sign-close]").forEach(function (button) {
    button.addEventListener("click", closeModal);
  });

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) closeModal();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !overlay.hidden) closeModal();
  });

  function setError(message) {
    if (!errorElement) return;
    errorElement.textContent = message || "";
    errorElement.hidden = !message;
  }

  function refreshSubmitState() {
    var nameIsValid = NAME_RE.test(nameInput.value.trim());
    var emailIsValid = EMAIL_RE.test(emailInput.value.trim());
    submit.disabled = !(nameIsValid && emailIsValid && followConfirmed);
  }

  nameInput.addEventListener("input", function () {
    var cleaned = nameInput.value.replace(/\s+/g, "");
    if (cleaned !== nameInput.value) nameInput.value = cleaned;
    nameHint.classList.remove("is-error");
    setError("");
    refreshSubmitState();
  });

  emailInput.addEventListener("input", function () {
    setError("");
    refreshSubmitState();
  });

  if (followButton) {
    followButton.addEventListener("click", function () {
      if (followConfirmed) return;
      if (followLabel) followLabel.textContent = "Checking...";

      window.setTimeout(function () {
        followConfirmed = true;
        followButton.classList.add("is-followed");
        followButton.setAttribute("aria-pressed", "true");
        if (followLabel) followLabel.textContent = "Followed";
        refreshSubmitState();
      }, 5000);
    });
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();

    if (!NAME_RE.test(name)) {
      nameHint.classList.add("is-error");
      setError("Use 3 to 24 letters, numbers or underscores. No spaces.");
      return;
    }

    if (!EMAIL_RE.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!followConfirmed) {
      setError("Follow Luzora on X before signing the manifesto.");
      return;
    }

    setError("");
    submit.disabled = true;
    overlay.setAttribute("data-state", "loading");

    var startedAt = Date.now();

    function afterMinimumLoad(callback) {
      window.setTimeout(callback, Math.max(0, 900 - (Date.now() - startedAt)));
    }

    function returnToForm(message, markName) {
      afterMinimumLoad(function () {
        overlay.setAttribute("data-state", "form");
        if (markName) nameHint.classList.add("is-error");
        setError(message);
        submit.disabled = false;
        refreshSubmitState();
      });
    }

    try {
      var response = await fetch(SUPABASE_URL + "/rest/v1/rpc/sign_manifesto", {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: "Bearer " + SUPABASE_ANON_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ p_name: name, p_email: email })
      });

      var data = null;
      var responseText = await response.text();
      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (error) {
          data = null;
        }
      }

      if (!response.ok) throw new Error("request_failed");

      if (data && data.ok) {
        if (!UUID_RE.test(String(data.public_id || ""))) {
          returnToForm("Your signature was saved, but its public card could not be created. Please contact Luzora support.", false);
          return;
        }

        afterMinimumLoad(function () {
          window.location.assign("/manifesto/s/" + encodeURIComponent(data.public_id));
        });
        return;
      }

      var reason = data && data.reason;
      if (reason === "name_taken") returnToForm("That name is already reserved. Try another.", true);
      else if (reason === "email_taken") returnToForm("That email has already signed the manifesto.", false);
      else if (reason === "invalid_name") returnToForm("Use 3 to 24 letters, numbers or underscores. No spaces.", true);
      else if (reason === "invalid_email") returnToForm("Enter a valid email address.", false);
      else returnToForm("Could not sign right now. Please try again.", false);
    } catch (error) {
      returnToForm("Could not sign right now. Check your connection and try again.", false);
    }
  });
})();
