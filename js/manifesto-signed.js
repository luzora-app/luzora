// Public Luzora manifesto signature cards.
(function () {
  "use strict";

  var SUPABASE_URL = "https://wtunedbjhpxnmlsvssiw.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_z2T50qlQe_r07Ay1Gy7c5w_Hg3euo0W";
  var UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  var PNG_FRAME_URL = "/assets/brand-kit/other%20assets/Private/card-frame.png";

  var loading = document.querySelector("[data-signed-loading]");
  var errorState = document.querySelector("[data-signed-error]");
  var content = document.querySelector("[data-signed-content]");
  var card = document.querySelector("[data-signed-card]");
  var nameElement = document.querySelector("[data-signer-name]");
  var numberElement = document.querySelector("[data-signer-number]");
  var shareButton = document.querySelector("[data-share-card]");
  var downloadButton = document.querySelector("[data-download-card]");
  var statusElement = document.querySelector("[data-action-status]");
  var signer = null;
  var statusTimer = 0;

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

  function fitName(name) {
    var length = name.length;
    if (length > 19) nameElement.style.fontSize = "14px";
    else if (length > 15) nameElement.style.fontSize = "16px";
    else if (length > 11) nameElement.style.fontSize = "18px";
  }

  function render(data) {
    signer = {
      username: String(data.username || "LuzoraBee"),
      signerNumber: String(data.signer_number || "1"),
      shareUrl: data.share_url || window.location.href.split("?")[0]
    };

    nameElement.textContent = signer.username;
    numberElement.textContent = signer.signerNumber;
    fitName(signer.username);
    document.title = signer.username + " signed the Luzora Manifesto";
    loading.hidden = true;
    errorState.hidden = true;
    content.hidden = false;
    window.requestAnimationFrame(function () { content.classList.add("is-ready"); });
  }

  async function loadSigner() {
    if (isLocalPreview()) {
      var params = new URLSearchParams(window.location.search);
      render({
        username: params.get("name") || "VMorgan",
        signer_number: params.get("number") || "1232",
        share_url: "https://luzora.app/manifesto/s/00000000-0000-4000-8000-000000000000"
      });
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
    } catch (error) {
      showError();
    }
  }

  function setStatus(message) {
    window.clearTimeout(statusTimer);
    statusElement.textContent = message || "";
    if (message) statusTimer = window.setTimeout(function () { statusElement.textContent = ""; }, 3200);
  }

  function safeFilename(value) {
    return value.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "signer";
  }

  function loadImage(url) {
    return new Promise(function (resolve, reject) {
      var image = new Image();
      image.onload = function () { resolve(image); };
      image.onerror = reject;
      image.src = url;
    });
  }

  function fitCanvasText(context, text, maxWidth, startSize, minimumSize) {
    var size = startSize;
    do {
      context.font = "700 " + size + "px 'DM Sans', Arial, sans-serif";
      if (context.measureText(text).width <= maxWidth) return size;
      size -= 2;
    } while (size >= minimumSize);
    return minimumSize;
  }

  async function makeCardBlob() {
    if (!signer) throw new Error("signer_not_ready");
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    var frame = await loadImage(PNG_FRAME_URL);
    var canvas = document.createElement("canvas");
    canvas.width = frame.naturalWidth || 1400;
    canvas.height = frame.naturalHeight || 1767;
    var context = canvas.getContext("2d");
    context.drawImage(frame, 0, 0, canvas.width, canvas.height);

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#FFD52B";
    fitCanvasText(context, signer.signerNumber, 370, 88, 48);
    context.fillText(signer.signerNumber, 1044, 214);

    var nameSize = fitCanvasText(context, signer.username, 650, 74, 38);
    context.font = "700 " + nameSize + "px 'DM Sans', Arial, sans-serif";
    var textWidth = context.measureText(signer.username).width;
    var pillWidth = Math.max(390, Math.min(740, textWidth + 110));
    var pillHeight = Math.max(118, nameSize + 54);
    var pillX = (canvas.width - pillWidth) / 2;
    var pillY = 612;
    context.fillStyle = "#0E0E0C";
    context.fillRect(pillX, pillY, pillWidth, pillHeight);
    context.fillStyle = "#FFD52B";
    context.fillText(signer.username, canvas.width / 2, pillY + pillHeight / 2 + 2);

    return new Promise(function (resolve, reject) {
      canvas.toBlob(function (blob) {
        if (blob) resolve(blob);
        else reject(new Error("card_render_failed"));
      }, "image/png", 1);
    });
  }

  async function downloadCard() {
    downloadButton.disabled = true;
    setStatus("Preparing your card...");
    try {
      var blob = await makeCardBlob();
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = "luzora-" + safeFilename(signer.username) + "-manifesto-" + signer.signerNumber + ".png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      setStatus("Card downloaded.");
    } catch (error) {
      setStatus("The card could not be downloaded. Please try again.");
    } finally {
      downloadButton.disabled = false;
    }
  }

  async function shareCard() {
    shareButton.disabled = true;
    setStatus("Preparing your card...");
    var shareText = signer.username + " is CONSISTENT. Luzora manifesto signer #" + signer.signerNumber + ". #ShowUp";
    try {
      var blob = await makeCardBlob();
      var file = new File([blob], "luzora-" + safeFilename(signer.username) + "-manifesto-" + signer.signerNumber + ".png", { type: "image/png" });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ title: "Luzora Manifesto", text: shareText, url: signer.shareUrl, files: [file] });
        setStatus("Card shared.");
      } else if (navigator.share) {
        await navigator.share({ title: "Luzora Manifesto", text: shareText, url: signer.shareUrl });
        setStatus("Signature shared.");
      } else {
        await navigator.clipboard.writeText(signer.shareUrl);
        setStatus("Signature link copied.");
      }
    } catch (error) {
      if (error && error.name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(signer.shareUrl);
          setStatus("Signature link copied.");
        } catch (copyError) {
          setStatus("Sharing is unavailable in this browser.");
        }
      } else {
        setStatus("");
      }
    } finally {
      shareButton.disabled = false;
    }
  }

  function setupCardMotion() {
    if (!card) return;
    var pointerId = null;
    var startX = 0;
    var startY = 0;
    var frameRequest = 0;
    var pendingX = 0;
    var pendingY = 0;

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
  }

  if (shareButton) shareButton.addEventListener("click", shareCard);
  if (downloadButton) downloadButton.addEventListener("click", downloadCard);
  setupCardMotion();
  loadSigner();
})();
