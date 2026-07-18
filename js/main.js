// Trigger the staggered hero reveal once the page is painted.
(function () {
  "use strict";

  var NEWSLETTER_ENDPOINT = "/api/newsletter";
  var GOOGLE_ANALYTICS_ID = "G-XXXXXXXXXX";
  var VERCEL_ANALYTICS_SCRIPT_PATH = "/_vercel/insights/script.js";

  function initAuthRedirectFallback() {
    var path = window.location.pathname.replace(/\/+$/, "").toLowerCase();
    var isHome = path === "" || path === "/index.html";
    var hash = window.location.hash || "";
    var search = window.location.search || "";
    var raw = hash ? hash.slice(1) : search.slice(1);

    if (!isHome || !raw) return false;

    var params = new URLSearchParams(raw);
    var hasAuthPayload =
      params.has("access_token") ||
      params.has("refresh_token") ||
      params.has("error") ||
      params.has("error_code") ||
      params.has("error_description");

    if (!hasAuthPayload) return false;

    var type = (params.get("type") || "").toLowerCase();
    var target = "/email-verified";

    if (params.has("error") || params.has("error_code") || params.has("error_description")) {
      target = "/link-expired";
    } else if (type === "recovery") {
      target = "/reset-password";
    }

    window.location.replace(target + (hash || search));
    return true;
  }

  function renderNav() {
    var mount = document.querySelector("[data-site-nav]");
    if (!mount) return;

    var path = window.location.pathname.replace(/\/+$/, "").toLowerCase();
    var isHome = path === "" || path === "/index.html";
    var homeHref = isHome ? "#hero" : "/#hero";
    var featuresHref = isHome ? "#features" : "/#features";
    var faqHref = isHome ? "#faq" : "/#faq";

    mount.outerHTML =
      '<header class="nav" id="nav">' +
        '<div class="nav__inner">' +
          '<a class="nav__logo" href="' + homeHref + '" aria-label="Luzora home">' +
            '<img src="/assets/icons/Logo.svg" height="40" alt="Luzora" />' +
          '</a>' +
          '<nav class="nav__links" aria-label="Primary">' +
            '<a href="' + featuresHref + '">Features</a>' +
            '<a href="' + faqHref + '">FAQs</a>' +
            '<a href="/manifesto">Manifesto</a>' +
            '<a href="/blog">Blog</a>' +
          '</nav>' +
          '<a class="nav__cta" href="/manifesto">' +
            '<img src="/assets/icons/fi_feather-Black.svg" width="20" height="20" alt="" aria-hidden="true" />' +
            '<span>Sign the manifesto</span>' +
          '</a>' +
          '<button class="nav__toggle" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-menu">' +
            '<span class="nav__toggle-bar"></span>' +
            '<span class="nav__toggle-bar"></span>' +
            '<span class="nav__toggle-bar"></span>' +
          '</button>' +
        '</div>' +
        '<div class="nav__menu" id="nav-menu">' +
          '<a href="' + featuresHref + '">Features</a>' +
          '<a href="' + faqHref + '">FAQs</a>' +
          '<a href="/manifesto">Manifesto</a>' +
          '<a href="/blog">Blog</a>' +
          '<a class="nav__cta nav__cta--menu" href="/manifesto">' +
            '<img src="/assets/icons/fi_feather-Black.svg" width="20" height="20" alt="" aria-hidden="true" />' +
            '<span>Sign the manifesto</span>' +
          '</a>' +
        '</div>' +
      '</header>';
  }

  function initWordReveal() {
    var title = document.querySelector(".what-luzora__title");
    if (!title || title.dataset.wordsSplit === "1") return;

    var words = title.textContent.trim().split(/\s+/);
    title.textContent = "";
    words.forEach(function (word, i) {
      var span = document.createElement("span");
      span.className = "wl-word";
      span.style.setProperty("--wi", i);
      span.textContent = word;
      title.appendChild(span);
      if (i < words.length - 1) {
        title.appendChild(document.createTextNode(" "));
      }
    });
    title.dataset.wordsSplit = "1";
  }

  function initScrollReveal() {
    var items = document.querySelectorAll("[data-reveal-scroll]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("in-view");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initFaq() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var head = item.querySelector(".faq-item__head");
      if (!head) return;
      head.addEventListener("click", function () {
        var isOpen = item.classList.toggle("open");
        head.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });
  }

  function initCopy() {
    var buttons = document.querySelectorAll(".faq__copy");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-copy") || "";

        function flash() {
          btn.classList.add("copied");
          setTimeout(function () {
            btn.classList.remove("copied");
          }, 1600);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(flash, flash);
        } else {
          var ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); } catch (e) {}
          document.body.removeChild(ta);
          flash();
        }
      });
    });
  }

  function initNewsletter() {
    var form = document.querySelector(".newsletter__form");
    if (!form) return;
    var note = document.querySelector(".newsletter__note");
    var input = form.querySelector(".newsletter__input");
    var button = form.querySelector(".newsletter__btn");
    var defaultNote = note ? note.textContent : "";

    function setLoading(isLoading) {
      if (!button) return;
      button.disabled = isLoading;
      button.textContent = isLoading ? "Subscribing..." : "Subscribe";
    }

    async function saveSubscriber(email) {
      var response = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          source: "website",
          page_url: window.location.href,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null
        })
      });

      var data = null;
      try {
        data = await response.json();
      } catch (error) {}

      if (response.ok && data && data.ok) {
        return { ok: true, duplicate: Boolean(data.duplicate) };
      }

      var message = data && (data.message || data.details || data.hint || data.code) || "";
      throw new Error(message || "Could not subscribe right now.");
    }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var value = (input && input.value ? input.value : "").trim();
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (!note) return;
      if (!valid) {
        note.textContent = "Please enter a valid email address.";
        note.classList.remove("is-success");
        if (input) input.focus();
        return;
      }

      setLoading(true);
      note.textContent = "Subscribing...";
      note.classList.remove("is-success");

      try {
        var result = await saveSubscriber(value);
        note.textContent = result.duplicate
          ? "You're already on the list."
          : "Thanks for subscribing!";
        note.classList.add("is-success");
        form.reset();

        setTimeout(function () {
          note.textContent = defaultNote;
          note.classList.remove("is-success");
        }, 4000);
      } catch (error) {
        if (window.console && console.error) {
          console.error("Newsletter subscription failed:", error);
        }
        note.textContent = "Subscription failed. Please try again.";
        note.classList.remove("is-success");
      } finally {
        setLoading(false);
      }
    });
  }

  function initInstallComingSoon() {
    var triggers = document.querySelectorAll("[data-install-coming-soon]");
    if (!triggers.length) return;

    var lastTrigger = null;
    var modal = document.createElement("div");
    modal.className = "install-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "install-modal-title");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML =
      '<div class="install-modal__backdrop" data-install-modal-close></div>' +
      '<div class="install-modal__panel" role="document">' +
        '<button class="install-modal__close" type="button" aria-label="Close" data-install-modal-close>' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
        '</button>' +
        '<span class="install-modal__badge" aria-hidden="true">' +
          '<img src="/assets/icons/Logo Icon.svg" alt="" />' +
        '</span>' +
        '<div class="install-modal__copy">' +
          '<h2 class="install-modal__title" id="install-modal-title">Installation is coming soon.</h2>' +
          '<p class="install-modal__text">Luzora is almost ready for the Chrome, Edge and Opera web stores. We are finishing the listings so installation is smooth when you arrive.</p>' +
          '<p class="install-modal__text">Want a note the moment it is live? <a class="install-modal__link" href="#newsletter" data-install-subscribe>Subscribe</a> to the newsletter and we will let you know first.</p>' +
        '</div>' +
        '<div class="install-modal__actions">' +
          '<a class="install-modal__primary" href="#newsletter" data-install-subscribe>Subscribe</a>' +
          '<button class="install-modal__secondary" type="button" data-install-modal-close>Not now</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    function openModal(trigger) {
      lastTrigger = trigger;
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("install-modal-open");
      var closeButton = modal.querySelector(".install-modal__close");
      if (closeButton) closeButton.focus();
    }

    function closeModal() {
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("install-modal-open");
      if (lastTrigger && lastTrigger.focus) lastTrigger.focus();
    }

    function goToNewsletter(e) {
      e.preventDefault();
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("install-modal-open");

      var newsletter = document.getElementById("newsletter");
      if (!newsletter) {
        window.location.href = "/#newsletter";
        return;
      }

      newsletter.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () {
        var input = newsletter.querySelector(".newsletter__input");
        if (input) input.focus();
      }, 450);
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        openModal(trigger);
      });
    });

    modal.querySelectorAll("[data-install-modal-close]").forEach(function (button) {
      button.addEventListener("click", closeModal);
    });

    modal.querySelectorAll("[data-install-subscribe]").forEach(function (link) {
      link.addEventListener("click", goToNewsletter);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    });
  }

  function initGoogleAnalytics() {
    var tagId = GOOGLE_ANALYTICS_ID;
    var hasRealTagId = /^G-[A-Z0-9]+$/i.test(tagId) && tagId !== "G-XXXXXXXXXX";
    if (!hasRealTagId) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted"
    });

    window.gtag("js", new Date());
    window.gtag("config", tagId, {
      anonymize_ip: true,
      send_page_view: true
    });

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(tagId);
    document.head.appendChild(script);
  }

  function initVercelAnalytics() {
    var host = window.location.hostname || "";
    var isHosted = host === "luzora.app" ||
      host.endsWith(".luzora.app") ||
      host.endsWith(".vercel.app");

    if (!isHosted || window.__luzoraVercelAnalyticsLoaded) return;
    window.__luzoraVercelAnalyticsLoaded = true;

    window.va = window.va || function () {
      (window.vaq = window.vaq || []).push(arguments);
    };

    var script = document.createElement("script");
    script.defer = true;
    script.src = VERCEL_ANALYTICS_SCRIPT_PATH;
    document.head.appendChild(script);
  }

  function initNav() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var toggle = nav.querySelector(".nav__toggle");
    var menu = nav.querySelector(".nav__menu");

    // shrink/raise on scroll
    function onScroll() {
      if (window.scrollY > 10) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function closeMenu() {
      nav.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // close after choosing a link
    if (menu) {
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", closeMenu);
      });
    }

    // close on outside click / escape
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  function initImageProtection() {
    function canProtectImage(img) {
      return !img.closest("[data-downloadable-image]");
    }

    function protectImage(img) {
      if (!canProtectImage(img)) return;
      img.setAttribute("draggable", "false");
      img.setAttribute("oncontextmenu", "return false;");
    }

    document.querySelectorAll("img").forEach(protectImage);

    document.addEventListener("dragstart", function (e) {
      var img = e.target && e.target.closest && e.target.closest("img");
      if (img && canProtectImage(img)) {
        e.preventDefault();
      }
    }, true);

    document.addEventListener("contextmenu", function (e) {
      var img = e.target && e.target.closest && e.target.closest("img");
      if (img && canProtectImage(img)) {
        e.preventDefault();
      }
    }, true);

    if ("MutationObserver" in window) {
      new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (!node || node.nodeType !== 1) return;
            if (node.matches && node.matches("img")) protectImage(node);
            if (node.querySelectorAll) node.querySelectorAll("img").forEach(protectImage);
          });
        });
      }).observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  function initBeeCursor() {
    if (document.documentElement.dataset.beeCursor === "off") return;
    if (!window.matchMedia) return;

    var isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    var isHoverless = window.matchMedia("(hover: none)").matches;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarsePointer || isHoverless) return;

    var root = document.documentElement;
    var canvas = document.createElement("canvas");
    var cursor = document.createElement("div");
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var assetBase = window.location.protocol === "file:"
      ? "assets/icons/bee-cursor/"
      : "/assets/icons/bee-cursor/";

    canvas.className = "bee-cursor-trail";
    canvas.setAttribute("aria-hidden", "true");

    cursor.className = "bee-cursor";
    cursor.setAttribute("aria-hidden", "true");
    cursor.style.display = "none";

    document.body.appendChild(canvas);
    document.body.appendChild(cursor);
    root.classList.add("has-bee-cursor");

    var dpr = 1;
    var targetX = -100;
    var targetY = -100;
    var currentX = -100;
    var currentY = -100;
    var lastX = -100;
    var lastY = -100;
    var angle = 0;
    var renderedAngle = 0;
    var frame = 0;
    var trailFrame = 0;
    var idleTimer = 0;
    var idleStartedAt = 0;
    var clickBlinkUntil = 0;
    var clickBlinkFrame = 0;
    var points = [];
    var trailDuration = reducedMotion ? 900 : 1400;
    var isCursorVisible = false;
    var isCursorSuspended = false;
    var isCursorIdle = false;
    var cursorImages = {
      moving: loadCursorImage("bee-cursor-moving.svg"),
      staticBody: loadCursorImage("Bee-cursor-static-body.svg"),
      eyeOpen: loadCursorImage("bee-eye-open.svg"),
      eyeClosed: loadCursorImage("bee-eye-closed.svg")
    };

    function loadCursorImage(filename) {
      var image = new Image();
      image.ready = false;
      image.onload = function () {
        image.ready = true;
        requestTrailUpdate();
      };
      image.onerror = function () {
        image.ready = false;
        requestTrailUpdate();
      };
      image.src = assetBase + filename;
      return image;
    }

    function resizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(window.innerWidth * dpr);
      canvas.height = Math.ceil(window.innerHeight * dpr);
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function isTypingTarget(target) {
      return target && target.closest && target.closest("input, textarea, select, [contenteditable='true']");
    }

    function setVisible(isVisible) {
      isCursorVisible = isVisible;
      cursor.classList.toggle("is-visible", isVisible);
      if (isVisible) requestTrailUpdate();
    }

    function setIdle(isIdle) {
      if (isIdle && !isCursorIdle) idleStartedAt = performance.now();
      isCursorIdle = isIdle;
      cursor.classList.toggle("is-idle", isIdle);
      requestTrailUpdate();
    }

    function smoothAngle(current, target, amount) {
      var delta = ((target - current + 540) % 360) - 180;
      return current + delta * amount;
    }

    function updateCursor() {
      frame = 0;
      currentX += (targetX - currentX) * (reducedMotion ? 1 : 0.26);
      currentY += (targetY - currentY) * (reducedMotion ? 1 : 0.26);
      renderedAngle = smoothAngle(renderedAngle, angle, reducedMotion ? 1 : 0.18);

      if (
        Math.abs(targetX - currentX) > 0.15 ||
        Math.abs(targetY - currentY) > 0.15 ||
        Math.abs(((angle - renderedAngle + 540) % 360) - 180) > 0.35
      ) {
        frame = requestAnimationFrame(updateCursor);
      }
    }

    function requestCursorUpdate() {
      if (!frame) frame = requestAnimationFrame(updateCursor);
    }

    function drawTrail() {
      trailFrame = 0;
      var now = performance.now();
      points = points.filter(function (point) {
        return now - point.time < trailDuration;
      });

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (points.length > 1) {
        drawSmoothDashedTrail(now);
      }

      if (isCursorVisible && !isCursorSuspended) {
        drawCanvasCursor();
      }

      if (points.length || isCursorVisible) trailFrame = requestAnimationFrame(drawTrail);
    }

    function drawSmoothDashedTrail(now) {
      var first = points[0];
      var last = points[points.length - 1];
      var gradient = ctx.createLinearGradient(first.x, first.y, last.x, last.y);
      var alpha = reducedMotion ? 0.2 : 0.34;

      gradient.addColorStop(0, "rgba(21, 20, 17, 0)");
      gradient.addColorStop(0.24, "rgba(21, 20, 17, " + (alpha * 0.55) + ")");
      gradient.addColorStop(1, "rgba(21, 20, 17, " + alpha + ")");

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.setLineDash([5, 11]);
      ctx.lineDashOffset = reducedMotion ? 0 : -now / 90;
      ctx.strokeStyle = gradient;
      ctx.lineWidth = reducedMotion ? 2 : 2.6;
      ctx.beginPath();
      ctx.moveTo(first.x, first.y);

      if (points.length === 2) {
        ctx.lineTo(last.x, last.y);
      } else {
        for (var i = 1; i < points.length - 1; i += 1) {
          var current = points[i];
          var next = points[i + 1];
          var midX = (current.x + next.x) / 2;
          var midY = (current.y + next.y) / 2;
          ctx.quadraticCurveTo(current.x, current.y, midX, midY);
        }
        ctx.quadraticCurveTo(points[points.length - 2].x, points[points.length - 2].y, last.x, last.y);
      }

      ctx.stroke();
      ctx.restore();
    }

    function drawCanvasCursor() {
      var x = currentX;
      var y = currentY;
      if (x < -50 || y < -50) return;

      var now = performance.now();
      var isClickBlinking = now < clickBlinkUntil;
      var shouldDrawStatic = isCursorIdle || isClickBlinking;
      var idleRamp = isCursorIdle && !reducedMotion ? Math.min(1, (now - idleStartedAt) / 420) : 0;
      var hoverY = idleRamp ? Math.sin(now / 300) * 7 * idleRamp : 0;
      var hoverX = idleRamp ? Math.sin(now / 720) * 1.8 * idleRamp : 0;
      var hoverTilt = idleRamp ? Math.sin(now / 560) * 0.16 * idleRamp : 0;
      var hoverScale = idleRamp ? 1 + Math.sin(now / 430) * 0.025 * idleRamp : 1;

      ctx.save();
      ctx.translate(x + hoverX, y + hoverY);
      ctx.rotate(shouldDrawStatic ? hoverTilt : (renderedAngle + 90) * Math.PI / 180);
      ctx.scale(hoverScale, hoverScale);

      if (shouldDrawStatic && drawStaticCursorImage(now, isClickBlinking)) {
        ctx.restore();
        return;
      }

      if (!isCursorIdle && cursorImages.moving.ready) {
        ctx.drawImage(cursorImages.moving, -21, -20, 42, 40);
        ctx.restore();
        return;
      }

      ctx.rotate(-0.18);
      ctx.shadowColor = "rgba(122, 100, 12, 0.28)";
      ctx.shadowBlur = 9;
      ctx.shadowOffsetY = 3;

      ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
      ctx.strokeStyle = "rgba(21, 20, 17, 0.42)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(-13, -2, 9, 13, -0.78, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(13, -2, 9, 13, 0.78, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = "#FFD52B";
      ctx.strokeStyle = "#151411";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.ellipse(0, 1, 13, 17, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#151411";
      ctx.fillRect(-8, -5, 16, 3);
      ctx.fillRect(-8, 4, 16, 3);

      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(-5, -15);
      ctx.quadraticCurveTo(-9, -24, -14, -20);
      ctx.moveTo(5, -15);
      ctx.quadraticCurveTo(9, -24, 14, -20);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-14, -20, 2.2, 0, Math.PI * 2);
      ctx.arc(14, -20, 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function drawStaticCursorImage(now, isClickBlinking) {
      if (!cursorImages.staticBody.ready) return false;

      ctx.shadowColor = "rgba(122, 100, 12, 0.26)";
      ctx.shadowBlur = 7;
      ctx.shadowOffsetY = 3;
      ctx.drawImage(cursorImages.staticBody, -21, -20, 42, 40);
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      var blinkPhase = Math.floor(now / 1400) % 5;
      var eyeImage = isClickBlinking || blinkPhase === 4 ? cursorImages.eyeClosed : cursorImages.eyeOpen;
      if (eyeImage.ready) {
        ctx.drawImage(eyeImage, -7, -13, 14, 10);
      }

      return true;
    }

    function requestTrailUpdate() {
      if (!trailFrame) trailFrame = requestAnimationFrame(drawTrail);
    }

    function blinkOnPress(event) {
      if (event.pointerType && event.pointerType !== "mouse") return;
      if (!isCursorVisible || isCursorSuspended) return;

      clickBlinkUntil = performance.now() + 150;
      requestTrailUpdate();

      if (clickBlinkFrame) window.clearTimeout(clickBlinkFrame);
      clickBlinkFrame = window.setTimeout(function () {
        clickBlinkFrame = 0;
        requestTrailUpdate();
      }, 170);
    }

    function suspendCursor() {
      isCursorSuspended = true;
      cursor.classList.add("is-suspended");
      setIdle(true);
    }

    function resumeCursor() {
      isCursorSuspended = false;
      cursor.classList.remove("is-suspended");
    }

    function onPointerMove(event) {
      if (event.pointerType && event.pointerType !== "mouse") return;

      if (isTypingTarget(event.target)) {
        suspendCursor();
        return;
      }

      resumeCursor();
      setVisible(true);
      setIdle(false);

      targetX = event.clientX;
      targetY = event.clientY;

      var dx = targetX - lastX;
      var dy = targetY - lastY;
      if (Math.abs(dx) + Math.abs(dy) > 0.5) {
        angle = Math.atan2(dy, dx) * 180 / Math.PI;
        lastX = targetX;
        lastY = targetY;
        points.push({ x: targetX, y: targetY, time: performance.now() });
        if (points.length > 80) points.shift();
        requestTrailUpdate();
      }

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(function () {
        setIdle(true);
      }, 190);
      requestCursorUpdate();
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", blinkOnPress, { passive: true });
    document.addEventListener("pointerleave", function () {
      setVisible(false);
    });
    document.addEventListener("pointerenter", function () {
      setVisible(true);
    });
  }

  function initWeightedScroll() {
    if (document.documentElement.dataset.weightedScroll === "off") return;

    var isCoarsePointer = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    if (isCoarsePointer) return;

    var root = document.documentElement;
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var ease = reducedMotion ? 0.16 : 0.038;
    var wheelScale = reducedMotion ? 0.85 : 0.95;
    var currentY = window.scrollY || 0;
    var targetY = currentY;
    var frame = 0;
    var isAnimating = false;
    var isProgrammatic = false;

    function maxScrollY() {
      return Math.max(0, root.scrollHeight - window.innerHeight);
    }

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function deltaToPixels(event) {
      if (event.deltaMode === 1) return event.deltaY * 18;
      if (event.deltaMode === 2) return event.deltaY * window.innerHeight;
      return event.deltaY;
    }

    function canNativeScroll(element, deltaY) {
      var node = element;
      while (node && node !== document.body && node !== root) {
        if (node.nodeType === 1) {
          var style = window.getComputedStyle(node);
          var overflowY = style.overflowY;
          var canScroll = /(auto|scroll|overlay)/.test(overflowY) && node.scrollHeight > node.clientHeight + 1;
          if (canScroll) {
            var atTop = node.scrollTop <= 0;
            var atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
            if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return true;
          }
        }
        node = node.parentNode;
      }
      return false;
    }

    function shouldIgnoreWheel(event, deltaY) {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return true;
      if (document.body.classList.contains("install-modal-open")) return true;
      if (event.target && event.target.closest) {
        if (event.target.closest("input, textarea, select, [data-native-scroll]")) return true;
      }
      return canNativeScroll(event.target, deltaY);
    }

    function setScrollInstantly(y) {
      var previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      isProgrammatic = true;
      window.scrollTo(0, y);
      isProgrammatic = false;
      root.style.scrollBehavior = previousBehavior;
    }

    function stopAnimation() {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      isAnimating = false;
    }

    function tick() {
      var distance = targetY - currentY;
      currentY += distance * ease;

      if (Math.abs(distance) < 0.35) {
        currentY = targetY;
        setScrollInstantly(currentY);
        stopAnimation();
        return;
      }

      setScrollInstantly(currentY);
      frame = requestAnimationFrame(tick);
    }

    function startAnimation() {
      if (isAnimating) return;
      isAnimating = true;
      frame = requestAnimationFrame(tick);
    }

    window.luzoraSmoothScrollTo = function (y) {
      currentY = window.scrollY || 0;
      targetY = clamp(y, 0, maxScrollY());
      startAnimation();
    };

    window.addEventListener("wheel", function (event) {
      var deltaY = deltaToPixels(event);
      if (!deltaY || shouldIgnoreWheel(event, deltaY)) return;

      event.preventDefault();
      targetY = clamp(targetY + deltaY * wheelScale, 0, maxScrollY());
      startAnimation();
    }, { passive: false });

    window.addEventListener("scroll", function () {
      if (isProgrammatic || isAnimating) return;
      currentY = window.scrollY || 0;
      targetY = currentY;
      stopAnimation();
    }, { passive: true });

    window.addEventListener("resize", function () {
      targetY = clamp(targetY, 0, maxScrollY());
      currentY = clamp(window.scrollY || 0, 0, maxScrollY());
    }, { passive: true });
  }

  function start() {
    if (initAuthRedirectFallback()) return;

    renderNav();
    initGoogleAnalytics();
    initVercelAnalytics();

    // Next frame so initial styles are committed before animating.
    requestAnimationFrame(function () {
      document.body.classList.add("is-ready");
    });
    initWordReveal();
    initScrollReveal();
    initFaq();
    initCopy();
    initNewsletter();
    initNav();
    initInstallComingSoon();
    initImageProtection();
    initBeeCursor();
    initWeightedScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
