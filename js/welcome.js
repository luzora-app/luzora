(function () {
  var confirmButton = document.querySelector("[data-confirm-pin]");
  var modal = document.querySelector("[data-success-modal]");
  var closeTargets = document.querySelectorAll("[data-success-close]");
  var doneButton = document.querySelector("[data-success-done]");
  var previousFocus = null;

  function persistWelcomeState() {
    try {
      window.localStorage.setItem("luzora_welcome_pinned", "true");
      window.localStorage.setItem("luzora_welcome_pinned_at", new Date().toISOString());
    } catch (error) {
      // The page can still complete when storage is unavailable.
    }
  }

  function openModal() {
    if (!modal) return;
    previousFocus = document.activeElement;
    persistWelcomeState();
    modal.hidden = false;
    document.body.classList.add("welcome-modal-open");
    if (doneButton) doneButton.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("welcome-modal-open");
    if (previousFocus && previousFocus.focus) previousFocus.focus();
  }

  if (confirmButton) {
    confirmButton.addEventListener("click", openModal);
  }

  closeTargets.forEach(function (target) {
    target.addEventListener("click", closeModal);
  });

  if (doneButton) {
    doneButton.addEventListener("click", function () {
      window.location.assign("/");
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && !modal.hidden) {
      closeModal();
    }
  });
})();
