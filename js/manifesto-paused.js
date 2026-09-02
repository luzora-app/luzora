/* Signing paused, pending Hive Manifesto 2.0.
   Temporary. Delete this file, its <script>, css/manifesto-paused.css and the
   .mp-veil block in manifesto.html when signing reopens. */

(function () {
  "use strict";

  var veil = document.querySelector("[data-manifesto-paused]");
  if (!veil) return;

  var form = veil.querySelector("[data-mp-form]");
  var input = veil.querySelector("#mp-email");
  var submit = veil.querySelector("[data-mp-submit]");
  var errorEl = veil.querySelector("[data-mp-error]");
  var formPanel = veil.querySelector('[data-mp-panel="form"]');
  var donePanel = veil.querySelector('[data-mp-panel="done"]');
  var doneTitle = veil.querySelector("[data-mp-done-title]");
  var doneBody = veil.querySelector("[data-mp-done-body]");

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var sending = false;

  // A blur is only paint. Without this the signing form underneath is still
  // tabbable, still submittable, and still fully usable by anyone who does not
  // use a mouse. inert takes the whole page out of the tab order and out of
  // the accessibility tree, which is what "disabled" has to mean.
  function sealNode(node) {
    if (!node || node === veil) return;
    if (node.nodeType !== 1 || node.tagName === "SCRIPT") return;
    if (node.hasAttribute("inert")) return;
    node.setAttribute("inert", "");
    node.setAttribute("aria-hidden", "true");
  }

  function sealPageBehind() {
    var nodes = document.body.children;
    for (var i = 0; i < nodes.length; i += 1) sealNode(nodes[i]);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  // main.js injects the nav and the bee toggle after this file runs, so a
  // single pass at load leaves them tabbable behind the veil. Watching means
  // anything added later is sealed too, whenever it arrives.
  function watchForLateNodes() {
    if (typeof MutationObserver !== "function") return;
    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i += 1) {
        var added = records[i].addedNodes;
        for (var j = 0; j < added.length; j += 1) sealNode(added[j]);
      }
    }).observe(document.body, { childList: true });
  }

  function showError(message) {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.hidden = false;
    if (input) input.classList.add("is-invalid");
  }

  function clearError() {
    if (!errorEl) return;
    errorEl.hidden = true;
    errorEl.textContent = "";
    if (input) input.classList.remove("is-invalid");
  }

  function showDone(duplicate) {
    if (duplicate) {
      if (doneTitle) doneTitle.textContent = "You're already on the list";
      if (doneBody) {
        doneBody.textContent =
          "This address is already down for the Hive Manifesto 2.0. We'll email you the moment it's live.";
      }
    }

    if (formPanel) formPanel.hidden = true;
    if (donePanel) {
      donePanel.hidden = false;
      // Move focus into the panel that replaced the form, so a screen reader
      // lands on the outcome rather than staying on a button that is gone.
      donePanel.setAttribute("tabindex", "-1");
      donePanel.focus();
    }
  }

  function setSending(state) {
    sending = state;
    if (!submit) return;
    submit.disabled = state;
    submit.setAttribute("aria-busy", String(state));
    submit.textContent = state ? "Adding you…" : "Notify me";
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (sending) return;

      var email = String(input && input.value ? input.value : "").trim();

      if (!email) {
        showError("Enter your email address.");
        if (input) input.focus();
        return;
      }

      if (!EMAIL_RE.test(email)) {
        showError("That does not look like an email address.");
        if (input) input.focus();
        return;
      }

      clearError();
      setSending(true);

      // Same endpoint the newsletter uses, so one address lands in Supabase and
      // Resend through a path that is already proven, rather than a second
      // subscribe route that can drift from it.
      fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          source: "manifesto_paused",
          page_url: window.location.href,
          referrer: document.referrer || null
        })
      })
        .then(function (response) {
          return response
            .json()
            .catch(function () {
              return {};
            })
            .then(function (data) {
              return { ok: response.ok, data: data || {} };
            });
        })
        .then(function (result) {
          if (!result.ok || result.data.ok !== true) {
            showError(result.data.message || "That did not go through. Please try again.");
            setSending(false);
            return;
          }
          showDone(Boolean(result.data.duplicate));
        })
        .catch(function () {
          showError("You appear to be offline. Please try again.");
          setSending(false);
        });
    });
  }

  if (input) {
    input.addEventListener("input", clearError);
  }

  sealPageBehind();
  watchForLateNodes();
  document.addEventListener("DOMContentLoaded", sealPageBehind);
  window.addEventListener("load", sealPageBehind);

  // Not autofocused on load: on a phone that opens the keyboard immediately and
  // hides the message the person came to read.
})();
