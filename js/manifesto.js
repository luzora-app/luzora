// The Luzora Manifesto - sign flow (reserve a name) + consistency card.
(function () {
  "use strict";

  var SUPABASE_URL = "https://wtunedbjhpxnmlsvssiw.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_z2T50qlQe_r07Ay1Gy7c5w_Hg3euo0W";
  var SITE = "https://luzora-pi.vercel.app";
  var NAME_RE = /^[A-Za-z0-9_]{3,24}$/;
  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  // --- reveal ---
  var paper = document.querySelector(".m-paper");
  document.querySelectorAll(".m-list li").forEach(function (li, i) {
    li.style.setProperty("--i", i);
  });
  window.requestAnimationFrame(function () {
    document.querySelectorAll("[data-anim]").forEach(function (el) { el.classList.add("is-in"); });
  });

  // --- modal open / close ---
  var overlay = document.getElementById("m-overlay");
  var nameInput = document.getElementById("m-name");
  var emailInput = document.getElementById("m-email");
  var submit = document.getElementById("m-submit");
  var errorEl = document.getElementById("m-form-error");
  var nameHint = document.getElementById("m-name-hint");
  var form = document.getElementById("m-form");
  var lastName = "";

  function openModal() {
    overlay.hidden = false;
    overlay.setAttribute("data-state", "form");
    document.body.style.overflow = "hidden";
    window.setTimeout(function () { if (nameInput) nameInput.focus(); }, 60);
  }
  function closeModal() {
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-sign-open]").forEach(function (btn) {
    btn.addEventListener("click", openModal);
  });
  document.querySelectorAll("[data-sign-close]").forEach(function (btn) {
    btn.addEventListener("click", closeModal);
  });
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) closeModal();
  });

  // --- validation ---
  function setError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg || "";
    errorEl.hidden = !msg;
  }
  function refresh() {
    var nameOk = NAME_RE.test(nameInput.value.trim());
    var emailOk = EMAIL_RE.test(emailInput.value.trim());
    submit.disabled = !(nameOk && emailOk);
  }

  nameInput.addEventListener("input", function () {
    // no spaces, keep it clean as they type
    var cleaned = nameInput.value.replace(/\s+/g, "");
    if (cleaned !== nameInput.value) nameInput.value = cleaned;
    nameHint.classList.remove("is-error");
    setError("");
    refresh();
  });
  emailInput.addEventListener("input", function () { setError(""); refresh(); });

  // --- submit ---
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    if (!NAME_RE.test(name)) {
      nameHint.classList.add("is-error");
      setError("Use 3 to 24 letters, numbers or underscores. No spaces.");
      return;
    }
    if (!EMAIL_RE.test(email)) { setError("Enter a valid email address."); return; }

    setError("");
    submit.disabled = true;
    overlay.setAttribute("data-state", "loading");

    var startedAt = Date.now();
    function afterMinLoad(cb) {
      window.setTimeout(cb, Math.max(0, 750 - (Date.now() - startedAt)));
    }
    function backToForm(msg, markName) {
      afterMinLoad(function () {
        overlay.setAttribute("data-state", "form");
        if (markName) nameHint.classList.add("is-error");
        setError(msg);
        submit.disabled = false;
        submit.textContent = "Sign the manifesto";
        refresh();
      });
    }

    try {
      var res = await fetch(SUPABASE_URL + "/rest/v1/rpc/sign_manifesto", {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: "Bearer " + SUPABASE_ANON_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ p_name: name, p_email: email })
      });
      var data = null;
      var text = await res.text();
      if (text) { try { data = JSON.parse(text); } catch (err) { data = null; } }
      if (!res.ok) throw new Error("request_failed");

      if (data && data.ok) {
        lastName = data.username || name;
        document.getElementById("m-card-name").textContent = lastName;
        afterMinLoad(function () { overlay.setAttribute("data-state", "success"); });
      } else {
        var reason = data && data.reason;
        if (reason === "name_taken") backToForm("That name is already reserved. Try another.", true);
        else if (reason === "invalid_name") backToForm("Use 3 to 24 letters, numbers or underscores. No spaces.", true);
        else if (reason === "invalid_email") backToForm("Enter a valid email address.", false);
        else backToForm("Could not sign right now. Please try again.", false);
      }
    } catch (err) {
      backToForm("Could not sign right now. Check your connection and try again.", false);
    }
  });

  // --- share on X: render the consistency card to a PNG ---
  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = reject;
      img.src = src;
    });
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  async function buildCardBlob(name) {
    var W = 1200, H = 680;
    var canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFD52B";
    roundRect(ctx, 0, 0, W, H, 48);
    ctx.fill();

    try {
      await document.fonts.load("700 54px Figtree");
      await document.fonts.load("italic 30px 'DM Sans'");
      await document.fonts.ready;
    } catch (e) { /* fall back to system fonts */ }

    ctx.fillStyle = "#151411";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.font = "700 54px Figtree, sans-serif";
    ctx.fillText(name + " is", W / 2, H * 0.36);

    try {
      var word = await loadImage("/assets/icons/CONSISTENT.svg");
      var ratio = word.naturalWidth && word.naturalHeight ? word.naturalHeight / word.naturalWidth : 77 / 482;
      var ww = W * 0.82;
      var wh = ww * ratio;
      ctx.drawImage(word, (W - ww) / 2, H * 0.45, ww, wh);
    } catch (e) { /* skip wordmark if it fails */ }

    try {
      var logo = await loadImage("/assets/icons/Logo Icon.svg");
      ctx.drawImage(logo, 44, H - 44 - 52, 52, 52);
    } catch (e) { /* skip logo */ }

    ctx.font = "italic 30px 'DM Sans', sans-serif";
    ctx.fillStyle = "#151411";
    ctx.textAlign = "right";
    ctx.fillText("#ShowUp", W - 44, H - 52);

    return new Promise(function (resolve) { canvas.toBlob(function (b) { resolve(b); }, "image/png"); });
  }

  var shareBtn = document.querySelector("[data-share]");
  if (shareBtn) {
    shareBtn.addEventListener("click", async function () {
      var name = lastName || "You";
      var text = (lastName ? lastName + " is" : "I am") + " CONSISTENT. I signed the Luzora manifesto and promised to show up. 🐝 #ShowUp";
      var shareUrl = SITE + "/manifesto";

      shareBtn.disabled = true;
      shareBtn.textContent = "Preparing...";
      var blob = null;
      try { blob = await buildCardBlob(name); } catch (e) { blob = null; }
      shareBtn.disabled = false;
      shareBtn.textContent = "Share it";

      if (blob) {
        var file = new File([blob], "luzora-" + name.toLowerCase().replace(/[^a-z0-9_]/g, "") + "-consistent.png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({ files: [file], text: text, url: shareUrl });
            return;
          } catch (e) {
            if (e && e.name === "AbortError") return;
          }
        }
        // Desktop: copy the card to the clipboard so it can be pasted straight
        // into the X composer (X does not allow pre-attaching media via a URL).
        var copied = false;
        try {
          if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
            await navigator.clipboard.write([new window.ClipboardItem({ "image/png": blob })]);
            copied = true;
          }
        } catch (e) { copied = false; }

        if (!copied) {
          var link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = file.name;
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.setTimeout(function () { URL.revokeObjectURL(link.href); }, 5000);
        }

        shareBtn.textContent = copied ? "Copied! Paste it in your post" : "Card downloaded";
        window.setTimeout(function () { shareBtn.textContent = "Share it"; }, 3500);
      }

      window.open(
        "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(shareUrl),
        "_blank",
        "noopener"
      );
    });
  }

  // --- magnetic hover: visible manifesto paper and share card ---
  var reduceTilt = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceTilt) {
    var tiltTargets = [
      { el: document.querySelector(".m-paper"), maxRotate: 5, maxMove: 6 },
      { el: document.getElementById("m-card"), maxRotate: 16, maxMove: 13 }
    ];

    function initMagneticHover(targetConfig) {
      var targetEl = targetConfig.el;
      if (!targetEl) return;

      var maxRotate = targetConfig.maxRotate;
      var maxMove = targetConfig.maxMove;
      var raf = 0;
      var target = {
        rx: 0,
        ry: 0,
        tx: 0,
        ty: 0,
        mx: 50,
        my: 50
      };

      function applyTilt() {
        raf = 0;
        targetEl.style.setProperty("--rx", target.rx.toFixed(2) + "deg");
        targetEl.style.setProperty("--ry", target.ry.toFixed(2) + "deg");
        targetEl.style.setProperty("--tx", target.tx.toFixed(2) + "px");
        targetEl.style.setProperty("--ty", target.ty.toFixed(2) + "px");
        targetEl.style.setProperty("--mx", target.mx.toFixed(2) + "%");
        targetEl.style.setProperty("--my", target.my.toFixed(2) + "%");
      }

      function scheduleTilt() {
        if (!raf) raf = window.requestAnimationFrame(applyTilt);
      }

      function setTilt(e) {
        var rect = targetEl.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        var x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        var y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        var px = x - 0.5;
        var py = y - 0.5;

        target.ry = px * maxRotate;
        target.rx = -py * maxRotate;
        target.tx = px * maxMove;
        target.ty = py * maxMove;
        target.mx = x * 100;
        target.my = y * 100;
        scheduleTilt();
      }

      function resetTilt() {
        targetEl.classList.remove("is-hovered");
        target.rx = 0;
        target.ry = 0;
        target.tx = 0;
        target.ty = 0;
        target.mx = 50;
        target.my = 50;
        scheduleTilt();
      }

      targetEl.addEventListener("pointerenter", function (e) {
        if (e.pointerType === "touch") return;
        targetEl.classList.add("is-hovered");
        setTilt(e);
      });
      targetEl.addEventListener("pointermove", function (e) {
        if (e.pointerType === "touch" && !targetEl.classList.contains("is-hovered")) return;
        targetEl.classList.add("is-hovered");
        setTilt(e);
      });
      targetEl.addEventListener("pointerdown", function (e) {
        targetEl.classList.add("is-hovered");
        setTilt(e);
      });
      targetEl.addEventListener("pointerup", resetTilt);
      targetEl.addEventListener("pointercancel", resetTilt);
      targetEl.addEventListener("pointerleave", resetTilt);
    }

    tiltTargets.forEach(initMagneticHover);
  }
})();
