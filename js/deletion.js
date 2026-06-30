// =====================================================================
// Luzora - Data Deletion request form
// Validates the form, drives the custom "what to delete" dropdown, and on
// submit shows the "Verify your request" modal. The real request should be
// POSTed to a backend that emails a verification link (which lands on
// /delete-confirmed). Hook that up where marked TODO.
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
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!valid()) { refresh(); return; }

    submit.disabled = true;
    submit.classList.add("is-busy");
    submit.textContent = "Sending...";

    // TODO: POST { email, scope, reason } to the deletion endpoint, which
    // emails a verification link. For now we just show the verify modal.
    var payload = {
      email: email.value.trim(),
      scope: scopeInput.value,
      reason: reason.value.trim()
    };
    void payload;

    setTimeout(function () {
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      submit.classList.remove("is-busy");
      submit.textContent = "Delete Data";
      refresh();
    }, 400);
  });

  refresh();
})();
