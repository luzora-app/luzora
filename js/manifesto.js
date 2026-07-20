// The Luzora Manifesto signing flow.
(function () {
  "use strict";

  var NAME_RE = /^[A-Za-z0-9_]{3,24}$/;
  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  var X_HANDLE_RE = /^@?[A-Za-z0-9_]{1,15}$/;
  var UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  var SHARE_URL_RE = /^https?:\/\/[^/\s]+\/manifesto\/s\/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  var NAME_CHECK_DELAY = 1000;
  var LUZORA_X_URL = "https://x.com/LuzoraHQ";
  var RETWEET_URL = "https://x.com/intent/retweet?tweet_id=2078934615356547126";
  var COMMENT_URL = "https://x.com/intent/post?in_reply_to=2079215775215227310";
  var QUOTE_TEXT = [
    "I'm signing the Luzora Manifesto with a commitment to be consistent.",
    "",
    "@luzorahq - The consistency layer for your browser",
    "",
    "luzora.app",
    "",
    "https://x.com/LuzoraHQ/status/2079215775215227310"
  ].join("\n");
  var QUOTE_URL = "https://x.com/intent/post?text=" + encodeURIComponent(QUOTE_TEXT);
  var SOCIAL_ACTION_DELAY = 3000;
  var SOCIAL_VERIFY_DELAY = 3000;
  var SOCIAL_TASKS = {
    follow: { url: LUZORA_X_URL, completeLabel: "Followed" },
    retweet: { url: RETWEET_URL, completeLabel: "Retweeted" },
    quote: { url: QUOTE_URL, completeLabel: "Quoted" },
    comment: { url: COMMENT_URL, completeLabel: "Commented" }
  };

  document.querySelectorAll(".m-list li").forEach(function (item, index) {
    item.style.setProperty("--i", index);
  });

  var manifestoScroll = document.querySelector("[data-manifesto-scroll]");

  function setupManifestoScrollTilt() {
    if (!manifestoScroll) return;

    var activePointer = null;

    function setTilt(event) {
      var rect = manifestoScroll.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      var localX = event.clientX - rect.left;
      var localY = event.clientY - rect.top;
      var x = localX / rect.width - 0.5;
      var y = localY / rect.height - 0.5;
      var tiltY = Math.max(-8, Math.min(8, x * 11));
      var tiltX = Math.max(-7, Math.min(7, -y * 9));

      manifestoScroll.style.setProperty("--tilt-y", tiltY.toFixed(2) + "deg");
      manifestoScroll.style.setProperty("--tilt-x", tiltX.toFixed(2) + "deg");
      manifestoScroll.classList.add("is-tilting");
    }

    function resetTilt() {
      activePointer = null;
      manifestoScroll.classList.remove("is-tilting");
      manifestoScroll.style.setProperty("--tilt-y", "0deg");
      manifestoScroll.style.setProperty("--tilt-x", "0deg");
    }

    manifestoScroll.addEventListener("pointerenter", setTilt);
    manifestoScroll.addEventListener("pointermove", function (event) {
      if (activePointer === null || activePointer === event.pointerId) setTilt(event);
    });
    manifestoScroll.addEventListener("pointerleave", function () {
      if (activePointer === null) resetTilt();
    });
    manifestoScroll.addEventListener("pointerdown", function (event) {
      activePointer = event.pointerId;
      manifestoScroll.setPointerCapture(event.pointerId);
      setTilt(event);
    });
    manifestoScroll.addEventListener("pointerup", resetTilt);
    manifestoScroll.addEventListener("pointercancel", resetTilt);
    manifestoScroll.addEventListener("lostpointercapture", resetTilt);
  }

  setupManifestoScrollTilt();

  window.requestAnimationFrame(function () {
    document.querySelectorAll("[data-anim]").forEach(function (element) {
      element.classList.add("is-in");
    });
  });

  var overlay = document.getElementById("m-overlay");
  var nameInput = document.getElementById("m-name");
  var emailInput = document.getElementById("m-email");
  var proceedButton = document.getElementById("m-proceed");
  var submit = document.getElementById("m-submit");
  var stepOneError = document.getElementById("m-step-one-error");
  var errorElement = document.getElementById("m-form-error");
  var nameHint = document.getElementById("m-name-hint");
  var nameCheck = document.querySelector("[data-name-check]");
  var form = document.getElementById("m-form");
  var xHandleInput = document.getElementById("m-x-handle");
  var stepButtons = Array.prototype.slice.call(document.querySelectorAll("[data-step-go]"));
  var stepPanels = Array.prototype.slice.call(document.querySelectorAll("[data-step-panel]"));
  var socialButtons = Array.prototype.slice.call(document.querySelectorAll("[data-social-task]"));
  var state = {
    currentStep: "1",
    checkedName: "",
    nameStatus: "idle",
    nameTimer: 0,
    checkToken: 0,
    follow: false,
    retweet: false,
    quote: false,
    comment: false
  };

  if (!overlay || !nameInput || !emailInput || !form) return;

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

  function cleanName(value) {
    return value.replace(/\s+/g, "").replace(/[^A-Za-z0-9_]/g, "").slice(0, 24);
  }

  function cleanHandle(value) {
    return value.replace(/\s+/g, "").replace(/^@+/, "").replace(/[^A-Za-z0-9_]/g, "").slice(0, 15);
  }

  function setError(element, message) {
    if (!element) return;
    element.textContent = message || "";
    element.hidden = !message;
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, ms);
    });
  }

  function manifestoCardPath(publicId) {
    return "/manifesto/s/" + encodeURIComponent(publicId);
  }

  function publicCardUrlFromData(data) {
    var shareUrl = String(data && data.share_url || "").trim();
    if (SHARE_URL_RE.test(shareUrl)) return shareUrl;

    var publicId = String(data && data.public_id || "").trim();
    return UUID_RE.test(publicId) ? manifestoCardPath(publicId) : "";
  }

  async function waitForManifestoCardLink(name, email) {
    var index = 0;

    while (true) {
      try {
        var response = await fetch("/api/manifesto-card-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name, email: email }),
          cache: "no-store"
        });
        var data = null;
        var responseText = await response.text();
        if (responseText) {
          try { data = JSON.parse(responseText); } catch (error) { data = null; }
        }

        if (response.ok) {
          var cardUrl = publicCardUrlFromData(data);
          if (cardUrl) return cardUrl;
        }
      } catch (error) {}

      await wait(index < 8 ? 750 : 1500);
      index += 1;
    }
  }

  function setNameStatus(status, message) {
    state.nameStatus = status;
    if (nameCheck) {
      nameCheck.classList.remove("is-checking", "is-available", "is-unavailable");
      if (status === "checking") nameCheck.classList.add("is-checking");
      if (status === "available") nameCheck.classList.add("is-available");
      if (status === "unavailable" || status === "error") nameCheck.classList.add("is-unavailable");
      nameCheck.tabIndex = status === "unavailable" || status === "error" ? 0 : -1;
    }
    if (nameHint) {
      nameHint.textContent = message || "Letters, numbers and underscores. This becomes your Hive name.";
      nameHint.classList.toggle("is-success", status === "available");
      nameHint.classList.toggle("is-error", status === "unavailable" || status === "error");
    }
    refreshControls();
  }

  function isStepOneValid() {
    var name = nameInput.value.trim();
    return (
      NAME_RE.test(name) &&
      EMAIL_RE.test(emailInput.value.trim()) &&
      state.nameStatus === "available" &&
      state.checkedName.toLowerCase() === name.toLowerCase()
    );
  }

  function isStepTwoValid() {
    return (
      isStepOneValid() &&
      state.follow &&
      state.retweet &&
      state.quote &&
      state.comment &&
      X_HANDLE_RE.test(xHandleInput.value.trim())
    );
  }

  function refreshControls() {
    var stepOneValid = isStepOneValid();
    if (proceedButton) proceedButton.disabled = !stepOneValid;
    if (submit) submit.disabled = !isStepTwoValid();
    stepButtons.forEach(function (button) {
      if (button.getAttribute("data-step-go") === "2") button.disabled = !stepOneValid;
    });
  }

  function setStep(step) {
    state.currentStep = step;
    stepButtons.forEach(function (button) {
      var buttonStep = button.getAttribute("data-step-go");
      var active = buttonStep === step;
      var complete = Number(buttonStep) < Number(step);
      button.classList.toggle("is-active", active);
      button.classList.toggle("is-complete", complete);
      if (active) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    stepPanels.forEach(function (panel) {
      var active = panel.getAttribute("data-step-panel") === step;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    setError(stepOneError, "");
    setError(errorElement, "");
    refreshControls();
  }

  async function checkNameAvailability(name, token) {
    setNameStatus("checking", "Checking...");
    try {
      var response = await fetch("/api/manifesto-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name })
      });
      var data = await response.json();
      if (token !== state.checkToken || nameInput.value.trim().toLowerCase() !== name.toLowerCase()) return;
      if (!response.ok || !data || data.ok === false) {
        setNameStatus("error", "We could not check this name. Try again.");
        return;
      }
      if (data.available) {
        state.checkedName = name;
        setNameStatus("available", "Name available");
      } else {
        state.checkedName = "";
        setNameStatus("unavailable", "This Hive name is already reserved.");
      }
    } catch (error) {
      if (token !== state.checkToken) return;
      setNameStatus("error", "We could not check this name. Try again.");
    }
  }

  function scheduleNameCheck() {
    window.clearTimeout(state.nameTimer);
    state.checkedName = "";
    var name = nameInput.value.trim();
    if (!name) {
      setNameStatus("idle", "Letters, numbers and underscores. This becomes your Hive name.");
      return;
    }
    if (!NAME_RE.test(name)) {
      setNameStatus("unavailable", "Use 3 to 24 letters, numbers or underscores. No spaces.");
      return;
    }
    setNameStatus("idle", "Letters, numbers and underscores. This becomes your Hive name.");
    state.nameTimer = window.setTimeout(function () {
      state.checkToken += 1;
      checkNameAvailability(name, state.checkToken);
    }, NAME_CHECK_DELAY);
  }

  function clearNameField() {
    window.clearTimeout(state.nameTimer);
    state.checkedName = "";
    state.checkToken += 1;
    nameInput.value = "";
    setError(stepOneError, "");
    setNameStatus("idle", "Letters, numbers and underscores. This becomes your Hive name.");
    nameInput.focus();
  }

  function updateTaskButton(button, phase, labelText) {
    var label = button.querySelector("span");
    button.setAttribute("data-task-phase", phase);
    button.classList.toggle("is-action-waiting", phase === "waiting");
    button.classList.toggle("is-verify", phase === "verify" || phase === "verifying");
    button.classList.toggle("is-loading", phase === "waiting" || phase === "verifying");
    button.classList.toggle("is-confirmed", phase === "confirmed");
    button.disabled = phase === "waiting" || phase === "verifying" || phase === "confirmed";
    if (label) label.textContent = labelText;
  }

  function handleTaskAction(button, type) {
    var task = SOCIAL_TASKS[type];
    var phase = button.getAttribute("data-task-phase") || "action";
    if (!task || phase === "waiting" || phase === "verifying" || phase === "confirmed") return;

    if (phase === "action") {
      window.open(task.url, "_blank", "noopener,noreferrer");
      updateTaskButton(button, "waiting", button.querySelector("span").textContent);

      window.setTimeout(function () {
        updateTaskButton(button, "verify", "Verify");
      }, SOCIAL_ACTION_DELAY);
      return;
    }

    updateTaskButton(button, "verifying", "Verifying...");

    window.setTimeout(function () {
      updateTaskButton(button, "confirmed", task.completeLabel);
      button.setAttribute("aria-pressed", "true");
      state[type] = true;
      setError(errorElement, "");
      refreshControls();
    }, SOCIAL_VERIFY_DELAY);
  }

  nameInput.addEventListener("input", function () {
    var cleaned = cleanName(nameInput.value);
    if (cleaned !== nameInput.value) nameInput.value = cleaned;
    setError(stepOneError, "");
    scheduleNameCheck();
  });

  if (nameCheck) {
    nameCheck.addEventListener("click", function () {
      if (nameCheck.classList.contains("is-unavailable")) clearNameField();
    });

    nameCheck.addEventListener("keydown", function (event) {
      if (!nameCheck.classList.contains("is-unavailable")) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        clearNameField();
      }
    });
  }

  emailInput.addEventListener("input", function () {
    setError(stepOneError, "");
    refreshControls();
  });

  if (xHandleInput) {
    xHandleInput.addEventListener("input", function () {
      var cleaned = cleanHandle(xHandleInput.value);
      if (cleaned !== xHandleInput.value) xHandleInput.value = cleaned;
      setError(errorElement, "");
      refreshControls();
    });
  }

  if (proceedButton) {
    proceedButton.addEventListener("click", function () {
      if (!isStepOneValid()) {
        setError(stepOneError, "Enter an available Hive name and a valid email address.");
        return;
      }
      setStep("2");
      if (xHandleInput) window.setTimeout(function () { xHandleInput.focus(); }, 60);
    });
  }

  stepButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var step = button.getAttribute("data-step-go");
      if (step === "2" && !isStepOneValid()) return;
      setStep(step);
    });
  });

  socialButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      handleTaskAction(button, button.getAttribute("data-social-task"));
    });
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var xHandle = cleanHandle(xHandleInput.value.trim());

    if (!isStepOneValid()) {
      setStep("1");
      setError(stepOneError, "Enter an available Hive name and a valid email address.");
      return;
    }

    if (!state.follow || !state.retweet || !state.quote || !state.comment) {
      setError(errorElement, "Complete and verify all X tasks before signing the manifesto.");
      return;
    }

    if (!X_HANDLE_RE.test(xHandle)) {
      setError(errorElement, "Enter a valid X handle.");
      return;
    }

    setError(errorElement, "");
    submit.disabled = true;
    overlay.setAttribute("data-state", "loading");

    var startedAt = Date.now();

    function afterMinimumLoad(callback) {
      window.setTimeout(callback, Math.max(0, 900 - (Date.now() - startedAt)));
    }

    function returnToForm(message, markName) {
      afterMinimumLoad(function () {
        overlay.setAttribute("data-state", "form");
        setStep(markName ? "1" : "2");
        if (markName) setNameStatus("unavailable", message);
        else setError(errorElement, message);
        submit.disabled = false;
        refreshControls();
      });
    }

    function redirectToPublicCard(cardUrl) {
      afterMinimumLoad(function () {
        window.location.assign(cardUrl);
      });
    }

    async function recoverAndRedirectToPublicCard() {
      var recoveredCardUrl = await waitForManifestoCardLink(name, email);
      redirectToPublicCard(recoveredCardUrl);
      return true;
    }

    try {
      var response = await fetch("/api/manifesto-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          xHandle: xHandle,
          followConfirmed: state.follow,
          retweetConfirmed: state.retweet
        })
      });

      var data = null;
      var responseText = await response.text();
      if (responseText) {
        try { data = JSON.parse(responseText); } catch (error) { data = null; }
      }

      if (!response.ok) {
        if (data && (data.reason === "card_missing" || data.reason === "card_pending")) {
          if (await recoverAndRedirectToPublicCard()) return;
          returnToForm("Your signature was saved, but we could not open your public card yet. Please refresh and try again.", false);
          return;
        }

        throw new Error("request_failed");
      }

      if (data && data.ok) {
        var publicCardUrl = publicCardUrlFromData(data);
        if (!publicCardUrl) {
          if (await recoverAndRedirectToPublicCard()) return;
          returnToForm("Your signature was saved, but we could not open your public card yet. Please refresh and try again.", false);
          return;
        }

        redirectToPublicCard(publicCardUrl);
        return;
      }

      var reason = data && data.reason;
      if (reason === "card_pending") {
        if (await recoverAndRedirectToPublicCard()) return;
      } else if (reason === "name_taken") returnToForm("That Hive name is already reserved. Try another.", true);
      else if (reason === "email_taken") returnToForm("That email has already signed the manifesto.", false);
      else if (reason === "invalid_name") returnToForm("Use 3 to 24 letters, numbers or underscores. No spaces.", true);
      else if (reason === "invalid_email") returnToForm("Enter a valid email address.", false);
      else if (reason === "invalid_x_handle") returnToForm("Enter a valid X handle.", false);
      else if (reason === "social_tasks_incomplete") returnToForm("Complete the X tasks before signing the manifesto.", false);
      else returnToForm("Could not sign right now. Please try again.", false);
    } catch (error) {
      returnToForm("Could not sign right now. Check your connection and try again.", false);
    }
  });

  setNameStatus("idle", "Letters, numbers and underscores. This becomes your Hive name.");
  refreshControls();
})();
