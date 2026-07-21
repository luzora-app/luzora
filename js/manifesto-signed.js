// Public Luzora manifesto signature cards.
(function () {
  "use strict";

  var SUPABASE_URL = "https://wtunedbjhpxnmlsvssiw.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_z2T50qlQe_r07Ay1Gy7c5w_Hg3euo0W";
  var UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  var MANIFESTO_URL = "https://luzora.app/manifesto/";
  var CARD_DESIGN_WIDTH = 366;
  var CARD_DESIGN_HEIGHT = 460;
  var CARD_NAME_MAX_WIDTH = 261.31;
  var CARD_NAME_BASE_SIZE = 35.0726;
  var CARD_NAME_MIN_SIZE = 14;
  var CARD_NUMBER_MAX_WIDTH = 122;
  var CARD_NUMBER_BASE_SIZE = 24.4082;
  var CARD_NUMBER_MIN_SIZE = 14;
  var CARD_TEXT_SAFETY_MARGIN = 8;

  var loading = document.querySelector("[data-signed-loading]");
  var errorState = document.querySelector("[data-signed-error]");
  var content = document.querySelector("[data-signed-content]");
  var card = document.querySelector("[data-signed-card]");
  var nameElement = document.querySelector("[data-signer-name]");
  var numberElement = document.querySelector("[data-signer-number]");
  var shareButton = document.querySelector("[data-share-referral]");
  var copyButton = document.querySelector("[data-copy-referral]");
  var shareCardButton = document.querySelector("[data-share-card]");
  var downloadCardButton = document.querySelector("[data-download-card]");
  var referralCountElement = document.querySelector("[data-referral-count]");
  var referralLabelElement = document.querySelector("[data-referral-label]");
  var statusElement = document.querySelector("[data-action-status]");
  var cardStatusElement = document.querySelector("[data-card-action-status]");
  var signer = null;
  var statusTimer = 0;
  var cardStatusTimer = 0;
  var cachedCardBlob = null;
  var cardExportPromise = null;
  var cardDownloadUrl = "";
  var refreshCardFit = function () {};

  function getPublicId() {
    var parts = window.location.pathname.split("/").filter(Boolean);
    var routeIndex = parts.indexOf("s");
    if (routeIndex > 0 && parts[routeIndex - 1] === "manifesto") return parts[routeIndex + 1] || "";
    return new URLSearchParams(window.location.search).get("id") || "";
  }

  function isLocalPreview() {
    var params = new URLSearchParams(window.location.search);
    return params.get("preview") === "1" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:");
  }

  function showError() {
    loading.hidden = true;
    content.hidden = true;
    errorState.hidden = false;
  }

  function formatSignerNumber(value) {
    var numeric = Number(String(value || "").replace(/,/g, ""));
    if (!Number.isFinite(numeric) || numeric <= 0) return String(value || "1");
    return new Intl.NumberFormat("en-US").format(numeric);
  }

  function measureTextWidth(text, size) {
    var canvas = measureTextWidth.canvas || (measureTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = "700 " + size + "px Figtree, Arial, sans-serif";
    return context.measureText(text).width;
  }

  function fitCardText(element, text, baseSize, minimumSize, maximumWidth, propertyName) {
    var size = baseSize;
    var safeWidth = maximumWidth - CARD_TEXT_SAFETY_MARGIN;
    while (size > minimumSize && measureTextWidth(text, size) > safeWidth) size -= 1;
    element.style.setProperty(propertyName, Math.max(size, minimumSize) + "px");
  }

  function fitCardLabels() {
    fitCardText(nameElement, signer.username, CARD_NAME_BASE_SIZE, CARD_NAME_MIN_SIZE, CARD_NAME_MAX_WIDTH, "--signed-name-size");
    fitCardText(numberElement, signer.signerNumber, CARD_NUMBER_BASE_SIZE, CARD_NUMBER_MIN_SIZE, CARD_NUMBER_MAX_WIDTH, "--signed-number-size");
  }

  function render(data) {
    signer = {
      username: String(data.username || "LuzoraBee"),
      signerNumber: formatSignerNumber(data.signer_number || "1"),
      shareUrl: data.share_url || window.location.href.split("?")[0],
      referralUrl: "https://luzora.app/manifesto?ref=" + encodeURIComponent(String(data.username || "LuzoraBee").toLowerCase())
    };

    nameElement.textContent = signer.username;
    numberElement.textContent = signer.signerNumber;
    fitCardLabels();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitCardLabels);
    }
    document.title = signer.username + " signed the Luzora Manifesto";
    loading.hidden = true;
    errorState.hidden = true;
    content.hidden = false;
    window.requestAnimationFrame(function () {
      content.classList.add("is-ready");
      refreshCardFit();
      prepareCardExport().catch(function () {});
    });
  }

  function renderReferralCount(value) {
    var count = Math.max(0, Number(value) || 0);
    if (referralCountElement) referralCountElement.textContent = new Intl.NumberFormat("en-US").format(count);
    if (referralLabelElement) referralLabelElement.textContent = count === 1 ? "Bee" : "Bees";
  }

  async function loadReferralCount(publicId) {
    try {
      var response = await fetch("/api/manifesto-referral-count?id=" + encodeURIComponent(publicId), {
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("referral_count_failed");
      var data = await response.json();
      if (data && data.ok) renderReferralCount(data.count);
    } catch (error) {
      renderReferralCount(0);
    }
  }

  async function loadSigner() {
    if (isLocalPreview()) {
      var params = new URLSearchParams(window.location.search);
      render({
        username: params.get("name") || "VMorgan",
        signer_number: params.get("number") || "1232",
        share_url: "https://luzora.app/manifesto/s/00000000-0000-4000-8000-000000000000"
      });
      renderReferralCount(params.get("referrals") || "0");
      return;
    }

    var publicId = getPublicId();
    if (!UUID_RE.test(publicId)) {
      showError();
      return;
    }

    try {
      var response = await fetch(SUPABASE_URL + "/rest/v1/rpc/get_manifesto_signature", {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: "Bearer " + SUPABASE_ANON_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ p_public_id: publicId })
      });
      if (!response.ok) throw new Error("lookup_failed");
      var data = await response.json();
      if (!data || !data.ok) throw new Error("not_found");
      render(data);
      loadReferralCount(publicId);
    } catch (error) {
      showError();
    }
  }

  function setStatus(message) {
    window.clearTimeout(statusTimer);
    statusElement.textContent = message || "";
    if (message) statusTimer = window.setTimeout(function () { statusElement.textContent = ""; }, 3200);
  }

  function setCardStatus(message) {
    window.clearTimeout(cardStatusTimer);
    if (!cardStatusElement) return;
    cardStatusElement.textContent = message || "";
    if (message) cardStatusTimer = window.setTimeout(function () { cardStatusElement.textContent = ""; }, 4200);
  }

  function waitForImage(image) {
    if (image.complete && image.naturalWidth > 0) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", reject, { once: true });
    });
  }

  function getCardFileName() {
    var safeName = String(signer && signer.username || "LuzoraBee")
      .trim()
      .replace(/[^a-z0-9_-]+/gi, "-")
      .replace(/^-+|-+$/g, "") || "LuzoraBee";
    return "luzora-manifesto-" + safeName.toLowerCase() + ".png";
  }

  async function createCardBlob() {
    if (!signer || !card) throw new Error("card_unavailable");
    var frame = card.querySelector(".signed-card__frame");
    if (!frame) throw new Error("card_frame_unavailable");
    await waitForImage(frame);
    if (document.fonts && document.fonts.ready) await document.fonts.ready;

    var exportScale = 3;
    var canvas = document.createElement("canvas");
    canvas.width = CARD_DESIGN_WIDTH * exportScale;
    canvas.height = CARD_DESIGN_HEIGHT * exportScale;
    var context = canvas.getContext("2d");
    if (!context) throw new Error("canvas_unavailable");
    context.scale(exportScale, exportScale);
    context.drawImage(frame, 0, 0, CARD_DESIGN_WIDTH, CARD_DESIGN_HEIGHT);

    var numberSize = parseFloat(window.getComputedStyle(numberElement).fontSize) || CARD_NUMBER_BASE_SIZE;
    context.save();
    context.font = "700 " + numberSize + "px Figtree, Arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#ffd52b";
    context.fillText(signer.signerNumber, 271, 55.82, CARD_NUMBER_MAX_WIDTH - CARD_TEXT_SAFETY_MARGIN);
    context.restore();

    var nameSize = parseFloat(window.getComputedStyle(nameElement).fontSize) || CARD_NAME_BASE_SIZE;
    var nameGradient = context.createLinearGradient(52.5, 0, 313.5, 0);
    nameGradient.addColorStop(0, "#000000");
    nameGradient.addColorStop(0.42, "#000000");
    nameGradient.addColorStop(0.62, "#806a11");
    nameGradient.addColorStop(0.78, "#000000");
    nameGradient.addColorStop(1, "#000000");
    context.save();
    context.font = "700 " + nameSize + "px Figtree, Arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = nameGradient;
    context.fillText(signer.username, 183.18, 307.9, CARD_NAME_MAX_WIDTH - CARD_TEXT_SAFETY_MARGIN);
    context.restore();

    return new Promise(function (resolve, reject) {
      canvas.toBlob(function (blob) {
        if (blob) resolve(blob);
        else reject(new Error("card_export_failed"));
      }, "image/png");
    });
  }

  function prepareCardExport() {
    if (cachedCardBlob) return Promise.resolve(cachedCardBlob);
    if (cardExportPromise) return cardExportPromise;
    cardExportPromise = createCardBlob().then(function (blob) {
      cachedCardBlob = blob;
      if (shareCardButton) shareCardButton.disabled = false;
      if (downloadCardButton) {
        cardDownloadUrl = URL.createObjectURL(blob);
        downloadCardButton.href = cardDownloadUrl;
        downloadCardButton.download = getCardFileName();
        downloadCardButton.setAttribute("data-export-type", blob.type);
        downloadCardButton.setAttribute("data-export-size", String(blob.size));
        downloadCardButton.setAttribute("data-export-width", String(CARD_DESIGN_WIDTH * 3));
        downloadCardButton.setAttribute("data-export-height", String(CARD_DESIGN_HEIGHT * 3));
        downloadCardButton.setAttribute("aria-disabled", "false");
      }
      return blob;
    }).catch(function (error) {
      cardExportPromise = null;
      setCardStatus("The card image could not be prepared. Please reload and try again.");
      throw error;
    });
    return cardExportPromise;
  }

  function downloadBlob(blob) {
    var objectUrl = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = getCardFileName();
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(function () { URL.revokeObjectURL(objectUrl); }, 1000);
  }

  async function shareCard() {
    if (!signer || !shareCardButton) return;
    shareCardButton.disabled = true;
    try {
      var blob = cachedCardBlob || await prepareCardExport();
      var file = new File([blob], getCardFileName(), { type: "image/png" });
      var shareData = {
        files: [file],
        title: "I signed the Luzora Manifesto",
        text: "I signed the Luzora Manifesto and committed to showing up consistently."
      };

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share(shareData);
        setCardStatus("Manifesto card shared.");
      } else if (navigator.share) {
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: signer.shareUrl
        });
        setCardStatus("The public Manifesto card link was shared.");
      } else {
        downloadBlob(blob);
        setCardStatus("Sharing is unavailable here, so the card was downloaded instead.");
      }
    } catch (error) {
      if (error && error.name === "AbortError") {
        setCardStatus("");
      } else {
        setCardStatus("The card could not be shared. Please try again.");
      }
    } finally {
      shareCardButton.disabled = false;
    }
  }

  function getReferralShareText() {
    return "Join me in signing the Luzora Manifesto and take your first step toward consistency.";
  }

  async function copyReferralLink(successMessage) {
    if (!signer) return;
    if (copyButton) copyButton.disabled = true;
    try {
      if (!navigator.clipboard) throw new Error("clipboard_unavailable");
      await navigator.clipboard.writeText(signer.referralUrl);
      setStatus(successMessage || "Referral link copied.");
    } catch (error) {
      setStatus("The link could not be copied. Please try again.");
    } finally {
      if (copyButton) copyButton.disabled = false;
    }
  }

  async function shareReferralLink() {
    if (!signer) return;
    shareButton.disabled = true;
    try {
      if (!navigator.share) throw new Error("share_unavailable");
      await navigator.share({
        title: "Sign the Luzora Manifesto",
        text: getReferralShareText(),
        url: signer.referralUrl
      });
      setStatus("Referral link shared.");
    } catch (error) {
      if (error && error.name === "AbortError") {
        setStatus("");
        return;
      }
      await copyReferralLink("Sharing is unavailable here, so the link was copied.");
    } finally {
      shareButton.disabled = false;
    }
  }

  function setupCardMotion() {
    if (!card) return;
    var scene = card.parentElement;
    var pointerId = null;
    var startX = 0;
    var startY = 0;
    var frameRequest = 0;
    var pendingX = 0;
    var pendingY = 0;

    function updateCardFit() {
      if (!scene) return;
      var availableWidth = scene.clientWidth || CARD_DESIGN_WIDTH;
      var fitScale = Math.min(1, availableWidth / CARD_DESIGN_WIDTH);
      card.style.setProperty("--card-fit-scale", fitScale);
      scene.style.height = (CARD_DESIGN_HEIGHT * fitScale) + "px";
    }

    refreshCardFit = updateCardFit;

    function drawTilt() {
      frameRequest = 0;
      card.style.setProperty("--card-rx", pendingY + "deg");
      card.style.setProperty("--card-ry", pendingX + "deg");
    }

    function tilt(x, y) {
      pendingX = Math.max(-20, Math.min(20, x));
      pendingY = Math.max(-20, Math.min(20, y));
      if (!frameRequest) frameRequest = window.requestAnimationFrame(drawTilt);
    }

    function reset() {
      card.classList.remove("is-elevated", "is-dragging");
      card.style.setProperty("--card-rx", "0deg");
      card.style.setProperty("--card-ry", "0deg");
      card.style.setProperty("--shine-x", "50%");
      card.style.setProperty("--shine-y", "50%");
      pointerId = null;
    }

    function tiltFromPoint(clientX, clientY) {
      var rect = card.getBoundingClientRect();
      var x = (clientX - rect.left) / rect.width;
      var y = (clientY - rect.top) / rect.height;
      tilt((x - 0.5) * 24, (0.5 - y) * 24);
      card.style.setProperty("--shine-x", x * 100 + "%");
      card.style.setProperty("--shine-y", y * 100 + "%");
    }

    card.addEventListener("pointerenter", function (event) {
      if (event.pointerType === "mouse") {
        card.classList.add("is-elevated");
        tiltFromPoint(event.clientX, event.clientY);
      }
    });

    card.addEventListener("pointermove", function (event) {
      if (pointerId === event.pointerId) {
        var dragX = (event.clientX - startX) / 5;
        var dragY = (startY - event.clientY) / 5;
        tilt(dragX, dragY);
        card.style.setProperty("--shine-x", Math.max(0, Math.min(100, 50 + dragX * 2)) + "%");
        card.style.setProperty("--shine-y", Math.max(0, Math.min(100, 50 - dragY * 2)) + "%");
      } else if (event.pointerType === "mouse") {
        card.classList.add("is-elevated");
        tiltFromPoint(event.clientX, event.clientY);
      }
    });

    card.addEventListener("pointerdown", function (event) {
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      card.setPointerCapture(event.pointerId);
      card.classList.add("is-elevated", "is-dragging");
    });

    card.addEventListener("pointerup", function (event) {
      if (pointerId !== event.pointerId) return;
      if (card.hasPointerCapture(event.pointerId)) card.releasePointerCapture(event.pointerId);
      card.classList.remove("is-dragging");
      window.setTimeout(reset, event.pointerType === "touch" ? 420 : 120);
    });

    card.addEventListener("pointercancel", reset);
    card.addEventListener("pointerleave", function (event) {
      if (event.pointerType === "mouse" && pointerId === null) reset();
    });
    card.addEventListener("blur", reset);
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.toggle("is-elevated");
      }
    });

    updateCardFit();
    window.addEventListener("resize", updateCardFit, { passive: true });
  }

  if (shareButton) shareButton.addEventListener("click", shareReferralLink);
  if (copyButton) copyButton.addEventListener("click", function () { copyReferralLink(); });
  if (shareCardButton) shareCardButton.addEventListener("click", shareCard);
  if (downloadCardButton) downloadCardButton.addEventListener("click", function (event) {
    if (downloadCardButton.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
      setCardStatus("Preparing your Manifesto card...");
      return;
    }
    setCardStatus("Your Manifesto card was downloaded.");
  });
  window.addEventListener("pagehide", function () {
    if (cardDownloadUrl) URL.revokeObjectURL(cardDownloadUrl);
  }, { once: true });
  setupCardMotion();
  loadSigner();
})();
