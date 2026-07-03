// =====================================================================
// Luzora - Data Deletion request form
// Validates the form, drives the custom "what to delete" dropdown, and on
// submit sends a verification email. The request becomes actionable only
// after the user opens the verification link.
// =====================================================================
(function () {
  "use strict";

  var form = document.getElementById("del-form");
  if (!form) return;

  var email = document.getElementById("del-email");
  var reason = document.getElementById("del-reason");
  var agree = document.getElementById("del-agree");
  var scopeInput = document.getElementById("del-scope");
  var submit = document.getElementById("del-submit");
  var modal = document.getElementById("del-modal");
  var error = document.createElement("p");
  error.className = "del-error";
  error.setAttribute("role", "alert");
  submit.insertAdjacentElement("beforebegin", error);

  // ---- custom dropdown ----
  var selectRoot = form.querySelector("[data-select]");
  var trigger = form.querySelector("[data-select-trigger]");
  var valueEl = form.querySelector("[data-select-value]");
  var options = form.querySelectorAll(".del-select__option");

  function closeSelect() {
    selectRoot.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
  }

  trigger.addEventListener("click", function () {
    var open = selectRoot.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  options.forEach(function (opt) {
    opt.addEventListener("click", function () {
      scopeInput.value = opt.getAttribute("data-value");
      valueEl.textContent = opt.textContent;
      trigger.classList.add("has-value");
      options.forEach(function (o) { o.classList.remove("is-active"); });
      opt.classList.add("is-active");
      closeSelect();
      refresh();
    });
  });

  document.addEventListener("click", function (e) {
    if (!selectRoot.contains(e.target)) closeSelect();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSelect();
  });

  // ---- validation ----
  function valid() {
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email.value || "").trim());
    var scopeOk = Boolean(scopeInput.value);
    var reasonOk = (reason.value || "").trim().length > 10;
    return emailOk && scopeOk && reasonOk && agree.checked;
  }

  function refresh() {
    var ok = valid();
    submit.disabled = !ok;
    submit.classList.toggle("is-enabled", ok);
  }

  [email, reason].forEach(function (el) { el.addEventListener("input", refresh); });
  agree.addEventListener("change", refresh);

  // ---- submit ----
  async function sendRequest(payload) {
    var response = await fetch("/api/data-deletion-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    var data = null;
    try {
      data = await response.json();
    } catch (err) {}

    if (response.ok && data && data.ok) return data;

    var message = data && data.message || "Could not send the verification email.";
    throw new Error(message);
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!valid()) { refresh(); return; }

    submit.disabled = true;
    submit.classList.add("is-busy");
    submit.textContent = "Sending...";
    error.textContent = "";

    var payload = {
      email: email.value.trim(),
      scope: scopeInput.value,
      reason: reason.value.trim(),
      page_url: window.location.href,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null
    };

    try {
      await sendRequest(payload);
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      form.reset();
      scopeInput.value = "";
      valueEl.textContent = "Select an option";
      trigger.classList.remove("has-value");
      options.forEach(function (o) { o.classList.remove("is-active"); });
    } catch (err) {
      error.textContent = err && err.message ? err.message : "Could not send the verification email.";
    } finally {
      submit.classList.remove("is-busy");
      submit.textContent = "Delete Data";
      refresh();
    }
  });

  refresh();
})();
