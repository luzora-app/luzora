(function () {
  "use strict";

  var CONSENT_COOKIE = "luzora_referral_consent";
  var REFERRAL_COOKIE = "luzora_extension_ref";
  var BROWSER_ID_COOKIE = "luzora_referral_browser";
  var CONSENT_MAX_AGE = 31536000;
  var REFERRAL_MAX_AGE = 2592000;

  function readCode() {
    var fromPath = "";
    var match = window.location.pathname.match(/\/r\/([^/?#]+)/i);
    if (match) fromPath = match[1];
    if (!fromPath) {
      var params = new URLSearchParams(window.location.search);
      fromPath = params.get("u") || params.get("code") || params.get("ref") || "";
    }
    try { fromPath = decodeURIComponent(fromPath); } catch (error) { /* keep raw value */ }
    var normalized = fromPath.trim().toLowerCase();
    return /^[a-z0-9_]{3,24}$/.test(normalized) ? normalized : "";
  }

  function cookieDomain() {
    var host = window.location.hostname || "";
    return host === "luzora.app" || host.endsWith(".luzora.app") ? "; Domain=luzora.app" : "";
  }

  function writeCookie(name, value, maxAge) {
    var secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = name + "=" + encodeURIComponent(value) + cookieDomain()
      + "; Path=/; Max-Age=" + maxAge + "; SameSite=Lax" + secure;
  }

  function clearCookie(name) {
    var secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = name + "=; Path=/; Max-Age=0; SameSite=Lax" + cookieDomain() + secure;
  }

  function readCookie(name) {
    var prefix = name + "=";
    var item = document.cookie.split(";").map(function (cookie) { return cookie.trim(); })
      .find(function (cookie) { return cookie.indexOf(prefix) === 0; });
    if (!item) return "";
    try { return decodeURIComponent(item.slice(prefix.length)); } catch (error) { return ""; }
  }

  function setChoice(choice, code) {
    writeCookie(CONSENT_COOKIE, choice, CONSENT_MAX_AGE);
    if (choice === "accepted" && code) {
      writeCookie(REFERRAL_COOKIE, code, REFERRAL_MAX_AGE);
      document.dispatchEvent(new CustomEvent("luzora:referral-consent"));
    } else {
      clearCookie(REFERRAL_COOKIE);
      clearCookie(BROWSER_ID_COOKIE);
    }
  }

  var code = readCode();
  var hero = document.querySelector(".invite-hero");
  var referrer = document.getElementById("invite-from");
  var consentWrap = document.getElementById("invite-consent-wrap");
  var consentCard = document.getElementById("invite-consent-card");
  var consentTitle = document.getElementById("invite-consent-title");
  var privacyLink = document.querySelector(".invite-privacy-link");
  var actionWrap = document.getElementById("invite-action-wrap");
  var reward = document.getElementById("invite-reward");
  var downloadLink = document.getElementById("invite-download-link");
  var helpButton = document.getElementById("invite-help");
  var details = document.getElementById("invite-consent-details");
  var changeButton = document.getElementById("invite-choice-change");
  var status = document.getElementById("invite-consent-status");
  var choice = readCookie(CONSENT_COOKIE);

  if (code) {
    if (referrer) referrer.textContent = "@" + code;
    if (consentTitle) consentTitle.textContent = "Keep @" + code + "'s invite connected?";
    document.title = "@" + code + " invited you to Luzora";
  } else if (hero) {
    hero.classList.add("is-generic");
    document.title = "You're invited to Luzora";
  }

  function showInstall(referralAccepted) {
    if (hero) hero.classList.add("has-referral-choice");
    if (consentCard) consentCard.hidden = true;
    if (privacyLink) privacyLink.hidden = true;
    if (actionWrap) actionWrap.hidden = false;
    if (reward) reward.hidden = !referralAccepted;
    if (consentWrap) consentWrap.hidden = false;
    if (changeButton) changeButton.hidden = !code;
    if (downloadLink) downloadLink.href = "https://chromewebstore.google.com/detail/luzora/fllkdopncjmakhohbepbhnnmgoodjhif";
  }

  if (!code) {
    if (consentWrap) consentWrap.hidden = true;
    if (actionWrap) actionWrap.hidden = false;
    if (reward) reward.hidden = true;
  } else if (choice === "accepted") {
    writeCookie(REFERRAL_COOKIE, code, REFERRAL_MAX_AGE);
    showInstall(true);
  } else if (choice === "declined") {
    clearCookie(REFERRAL_COOKIE);
    clearCookie(BROWSER_ID_COOKIE);
    showInstall(false);
  } else {
    // Remove referral cookies created by older versions until the visitor chooses.
    clearCookie(REFERRAL_COOKIE);
    clearCookie(BROWSER_ID_COOKIE);
    if (consentWrap) consentWrap.hidden = false;
    if (consentCard) consentCard.hidden = false;
    if (privacyLink) privacyLink.hidden = false;
    if (hero) hero.classList.remove("has-referral-choice");
    if (actionWrap) actionWrap.hidden = true;
    if (reward) reward.hidden = true;
    if (changeButton) changeButton.hidden = true;
  }

  if (helpButton && details) {
    helpButton.addEventListener("click", function () {
      var expanded = helpButton.getAttribute("aria-expanded") === "true";
      helpButton.setAttribute("aria-expanded", String(!expanded));
      details.hidden = expanded;
    });
  }

  document.querySelectorAll("[data-referral-choice]").forEach(function (button) {
    button.addEventListener("click", function () {
      var selected = button.getAttribute("data-referral-choice");
      if (selected !== "accepted" && selected !== "declined") return;
      setChoice(selected, code);
      showInstall(selected === "accepted");
      if (status) status.textContent = selected === "accepted"
        ? "Referral tracking accepted. Install Luzora to continue."
        : "You can install Luzora without referral tracking.";
      if (downloadLink) downloadLink.focus({ preventScroll: true });
    });
  });

  if (changeButton) {
    changeButton.addEventListener("click", function () {
      clearCookie(CONSENT_COOKIE);
      clearCookie(REFERRAL_COOKIE);
      clearCookie(BROWSER_ID_COOKIE);
      document.dispatchEvent(new CustomEvent("luzora:referral-consent-withdrawn"));
      if (hero) hero.classList.remove("has-referral-choice");
      if (consentCard) consentCard.hidden = false;
      if (privacyLink) privacyLink.hidden = false;
      if (actionWrap) actionWrap.hidden = true;
      if (reward) reward.hidden = true;
      changeButton.hidden = true;
      if (details) details.hidden = true;
      if (helpButton) helpButton.setAttribute("aria-expanded", "false");
      if (status) status.textContent = "Choose whether to allow referral tracking.";
      document.querySelector("[data-referral-choice]")?.focus();
    });
  }
})();
