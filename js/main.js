// Trigger the staggered hero reveal once the page is painted.
(function () {
  "use strict";

  var SUPABASE_URL = "https://wtunedbjhpxnmlsvssiw.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_z2T50qlQe_r07Ay1Gy7c5w_Hg3euo0W";
  var GOOGLE_ANALYTICS_ID = "G-XXXXXXXXXX";
  var VERCEL_ANALYTICS_SCRIPT_PATH = "/_vercel/insights/script.js";

  function renderNav() {
    var mount = document.querySelector("[data-site-nav]");
    if (!mount) return;

    var path = window.location.pathname.split("/").pop().toLowerCase();
    var isHome = path === "" || path === "index.html";
    var isDownload = path === "download.html";

    var homeHref = isHome ? "#hero" : "index.html#hero";
    var featuresHref = isHome ? "#features" : "index.html#features";
    var faqHref = isHome ? "#faq" : "index.html#faq";
    var downloadHref = isDownload ? "#dl-top" : "download.html";
    var installHref = isHome ? "#install" : downloadHref;

    mount.outerHTML =
      '<header class="nav" id="nav">' +
        '<div class="nav__inner">' +
          '<a class="nav__logo" href="' + homeHref + '" aria-label="Luzora home">' +
            '<img src="assets/icons/Logo.svg" height="40" alt="Luzora" />' +
          '</a>' +
          '<nav class="nav__links" aria-label="Primary">' +
            '<a href="' + featuresHref + '">Features</a>' +
            '<a href="' + featuresHref + '">Bolt</a>' +
            '<a href="' + faqHref + '">FAQs</a>' +
            '<a href="' + downloadHref + '">Download</a>' +
          '</nav>' +
          '<a class="nav__cta" href="' + installHref + '" data-install-coming-soon>' +
            '<img src="assets/icons/Download-White.svg" width="18" height="18" alt="" aria-hidden="true" />' +
            '<span>Install Extension</span>' +
          '</a>' +
          '<button class="nav__toggle" type="button" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-menu">' +
            '<span class="nav__toggle-bar"></span>' +
            '<span class="nav__toggle-bar"></span>' +
            '<span class="nav__toggle-bar"></span>' +
          '</button>' +
        '</div>' +
        '<div class="nav__menu" id="nav-menu">' +
          '<a href="' + featuresHref + '">Features</a>' +
          '<a href="' + featuresHref + '">Bolt</a>' +
          '<a href="' + faqHref + '">FAQs</a>' +
          '<a href="' + downloadHref + '">Download</a>' +
          '<a class="nav__cta nav__cta--menu" href="' + installHref + '" data-install-coming-soon>' +
            '<img src="assets/icons/Download-White.svg" width="18" height="18" alt="" aria-hidden="true" />' +
            '<span>Install Extension</span>' +
          '</a>' +
        '</div>' +
      '</header>';
  }

  function initScrollReveal() {
    var items = document.querySelectorAll("[data-reveal-scroll]");
    if (!items.length) return;

    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
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
      var response = await fetch(SUPABASE_URL + "/rest/v1/newsletter_subscribers", {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: "Bearer " + SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          email: email,
          source: "website",
          page_url: window.location.href,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null
        })
      });

      if (response.ok) return { ok: true };

      var message = "";
      try {
        var data = await response.json();
        message = data && (data.message || data.details || data.hint || data.code) || "";
      } catch (error) {}

      if (response.status === 409 || /duplicate|unique/i.test(message)) {
        return { ok: true, duplicate: true };
      }

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
          '<img src="assets/icons/Logo Icon.svg" alt="" />' +
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
        window.location.href = "index.html#newsletter";
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
    function protectImage(img) {
      img.setAttribute("draggable", "false");
      img.setAttribute("oncontextmenu", "return false;");
    }

    document.querySelectorAll("img").forEach(protectImage);

    document.addEventListener("dragstart", function (e) {
      if (e.target && e.target.closest && e.target.closest("img")) {
        e.preventDefault();
      }
    }, true);

    document.addEventListener("contextmenu", function (e) {
      if (e.target && e.target.closest && e.target.closest("img")) {
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

  function start() {
    renderNav();
    initGoogleAnalytics();
    initVercelAnalytics();

    // Next frame so initial styles are committed before animating.
    requestAnimationFrame(function () {
      document.body.classList.add("is-ready");
    });
    initScrollReveal();
    initFaq();
    initCopy();
    initNewsletter();
    initNav();
    initInstallComingSoon();
    initImageProtection();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
