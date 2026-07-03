(function () {
  "use strict";

  var root = document.getElementById("delete-confirmation");
  if (!root) return;

  var title = root.querySelector("[data-confirm-title]");
  var text = root.querySelector("[data-confirm-text]");
  var primary = root.querySelector("[data-confirm-primary]");
  var secondary = root.querySelector("[data-confirm-secondary]");

  function setCopy(nextTitle, nextText) {
    if (title) title.textContent = nextTitle;
    if (text) text.textContent = nextText;
  }

  function setActions(showPrimary) {
    if (primary) primary.style.display = showPrimary ? "" : "none";
    if (secondary) secondary.textContent = showPrimary ? "Go Home" : "Go Home";
  }

  async function confirmRequest(token) {
    var response = await fetch("/api/data-deletion-confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token })
    });

    var data = null;
    try {
      data = await response.json();
    } catch (error) {}

    if (response.ok && data && data.ok) {
      return data;
    }

    var message = data && data.message || "Could not verify this deletion request.";
    throw new Error(message);
  }

  async function start() {
    var token = new URLSearchParams(window.location.search).get("token") || "";

    if (!token) {
      setCopy(
        "Deletion link required",
        "Please open the verification link from your email to confirm a data deletion request."
      );
      setActions(false);
      return;
    }

    setCopy("Verifying your request", "Please wait while we confirm that this deletion request came from you.");
    setActions(false);

    try {
      var result = await confirmRequest(token);
      setCopy(
        result.already_confirmed ? "Data deletion request already confirmed" : "Data deletion request confirmed",
        "You successfully verified your request, we will work on your request immediately. We are legally required to delete your data within 45 days. Your account still remains so, data created from here on will not be deleted. You'll get an email notification when your data is finally deleted."
      );
      setActions(true);

      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch (error) {
      setCopy(
        "Could not verify this request",
        error && error.message ? error.message : "Please submit a new data deletion request."
      );
      setActions(false);
    }
  }

  start();
})();
