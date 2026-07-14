(function () {
  "use strict";

  function buildIconMenus() {
    document.querySelectorAll(".asset-card--icon[data-icon]").forEach(function (card) {
      if (card.querySelector("[data-download-menu]")) return;
      var icon = card.getAttribute("data-icon");
      var root = "assets/brand-kit/logos/icons/luzora-icon-" + icon;
      var menu = document.createElement("div");
      menu.className = "download-menu";
      menu.setAttribute("data-download-menu", "");
      menu.innerHTML =
        '<a href="' + root + '-max.png" download>PNG</a>' +
        '<a href="' + root + '-32.svg" download>SVG</a>' +
        '<div class="download-menu__sizes">' +
          '<a href="' + root + '-16.svg" download>16px</a>' +
          '<a href="' + root + '-24.svg" download>24px</a>' +
          '<a href="' + root + '-32.svg" download>32px</a>' +
        '</div>' +
        '<a class="download-menu__all" href="#" data-download-all>Download all</a>';
      card.appendChild(menu);
    });
  }

  function downloadAssetMenu(menu) {
    var seen = new Set();
    var links = Array.from(menu.querySelectorAll("a[href][download]")).filter(function (link) {
      if (link.matches("[data-download-all], .download-menu__all")) return false;
      if (seen.has(link.href)) return false;
      seen.add(link.href);
      return true;
    });
    links.forEach(function (link, index) {
      window.setTimeout(function () {
        var anchor = document.createElement("a");
        anchor.href = link.href;
        anchor.download = link.getAttribute("download") || "";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }, index * 120);
    });
    window.setTimeout(function () { closeDownloadMenus(); }, links.length * 120 + 80);
  }

  function closeDownloadMenus(exceptCard) {
    document.querySelectorAll(".asset-card.is-menu-open").forEach(function (card) {
      if (card === exceptCard) return;
      card.classList.remove("is-menu-open");
      var toggle = card.querySelector("[data-download-toggle]");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  }

  function initDownloadMenus() {
    buildIconMenus();

    document.querySelectorAll("[data-download-toggle]").forEach(function (toggle) {
      var card = toggle.closest(".asset-card");
      var menu = card && card.querySelector("[data-download-menu]");
      if (!card || !menu) return;

      var menuId = "download-menu-" + Math.random().toString(36).slice(2, 9);
      menu.id = menuId;
      toggle.setAttribute("aria-controls", menuId);

      toggle.addEventListener("click", function (event) {
        event.stopPropagation();
        var willOpen = !card.classList.contains("is-menu-open");
        closeDownloadMenus(card);
        card.classList.toggle("is-menu-open", willOpen);
        toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });

      menu.addEventListener("click", function (event) {
        event.stopPropagation();
        var downloadAll = event.target.closest("[data-download-all], .download-menu__all");
        if (downloadAll) {
          event.preventDefault();
          downloadAssetMenu(menu);
          return;
        }
        if (event.target.closest("a")) {
          setTimeout(function () { closeDownloadMenus(); }, 0);
        }
      });
    });

    document.addEventListener("click", function () { closeDownloadMenus(); });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeDownloadMenus();
    });
  }

  function initSectionNavigation() {
    var toc = document.querySelector("[data-brand-toc]");
    var links = Array.from(document.querySelectorAll(".brand-toc__link"));
    var sections = Array.from(document.querySelectorAll("[data-brand-section]"));
    var progressMarker = toc.querySelector(".brand-toc__progress-marker");
    if (!toc || !links.length || !sections.length) return;

    var activeId = "";
    var scrollAnimation = 0;
    var savedScrollBehavior = "";
    var isControllingScroll = false;

    function easeInOutCubic(progress) {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    }

    function getDocumentTop(element) {
      var top = 0;
      var current = element;
      while (current) {
        top += current.offsetTop;
        current = current.offsetParent;
      }
      return top;
    }

    function stopScrollAnimation() {
      if (!scrollAnimation) return;
      cancelAnimationFrame(scrollAnimation);
      scrollAnimation = 0;
      restoreNativeScrollBehavior();
    }

    function disableNativeScrollBehavior() {
      if (isControllingScroll) return;
      isControllingScroll = true;
      savedScrollBehavior = document.documentElement.style.scrollBehavior || "";
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.scrollBehavior = "auto";
    }

    function restoreNativeScrollBehavior() {
      if (!isControllingScroll) return;
      document.documentElement.style.scrollBehavior = savedScrollBehavior;
      document.body.style.scrollBehavior = "";
      isControllingScroll = false;
    }

    function setScrollTop(top) {
      try {
        window.scrollTo({ top: top, left: 0, behavior: "instant" });
      } catch (error) {
        window.scrollTo(0, top);
      }
    }

    function animateToSection(target) {
      var offset = window.innerWidth <= 980 ? 205 : 145;
      var startY = window.scrollY;
      var endY = Math.max(0, getDocumentTop(target) - offset);
      var distance = endY - startY;

      stopScrollAnimation();
      if (Math.abs(distance) < 2) {
        disableNativeScrollBehavior();
        setScrollTop(endY);
        restoreNativeScrollBehavior();
        updateActiveSection();
        return;
      }

      disableNativeScrollBehavior();
      var duration = Math.min(1100, Math.max(480, Math.abs(distance) * 0.42));
      var startedAt = performance.now();

      function step(now) {
        var progress = Math.min(1, (now - startedAt) / duration);
        setScrollTop(startY + distance * easeInOutCubic(progress));
        updateActiveSection();
        if (progress < 1) {
          scrollAnimation = requestAnimationFrame(step);
        } else {
          scrollAnimation = 0;
          setScrollTop(endY);
          restoreNativeScrollBehavior();
          updateActiveSection();
          setActive(target.id, true);
        }
      }

      scrollAnimation = requestAnimationFrame(step);
    }

    function setActive(id, shouldCenter) {
      if (!id || id === activeId) return;
      activeId = id;
      links.forEach(function (link) {
        var isActive = link.getAttribute("href") === "#" + id;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "true");
          if (shouldCenter && window.innerWidth <= 980) {
            link.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          }
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    function updateActiveSection() {
      var offset = window.innerWidth <= 980 ? 205 : 145;
      var current = sections[0];
      sections.forEach(function (section) {
        if (window.scrollY >= getDocumentTop(section) - offset - 1) current = section;
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12) {
        current = sections[sections.length - 1];
      }
      setActive(current.id, true);

      if (progressMarker && window.innerWidth > 980) {
        var sectionStops = sections.map(function (section) {
          return getDocumentTop(section) - offset;
        });
        var markerTargets = links.map(function (link) {
          return link.offsetTop + (link.offsetHeight - progressMarker.offsetHeight) / 2;
        });
        var markerY = markerTargets[0];

        if (window.scrollY >= sectionStops[sectionStops.length - 1]) {
          markerY = markerTargets[markerTargets.length - 1];
        } else if (window.scrollY > sectionStops[0]) {
          for (var index = 0; index < sectionStops.length - 1; index += 1) {
            var segmentStart = sectionStops[index];
            var segmentEnd = sectionStops[index + 1];
            if (window.scrollY <= segmentEnd) {
              var segmentLength = Math.max(1, segmentEnd - segmentStart);
              var segmentProgress = (window.scrollY - segmentStart) / segmentLength;
              var targetStart = markerTargets[index];
              var targetEnd = markerTargets[index + 1];
              markerY = targetStart + (targetEnd - targetStart) * segmentProgress;
              break;
            }
          }
        }

        progressMarker.style.transform = "translateY(" + markerY.toFixed(2) + "px)";
      }
    }

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        updateActiveSection();
        ticking = false;
      });
    }, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var id = link.getAttribute("href").slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        setActive(id, false);
        animateToSection(target);
        history.replaceState(null, "", "#" + id);
      });
    });

    updateActiveSection();
  }

  function initSectionReveals() {
    var sections = Array.from(document.querySelectorAll("[data-brand-section]"));
    if (!sections.length) return;

    if (!("IntersectionObserver" in window)) {
      sections.forEach(function (section) { section.classList.add("is-revealed"); });
      return;
    }

    document.body.classList.add("has-brand-reveals");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10%", threshold: 0.08 });

    requestAnimationFrame(function () {
      sections.forEach(function (section) { observer.observe(section); });
    });
  }

  function writeClipboard(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value);
    }
    var input = document.createElement("textarea");
    input.value = value;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    try { document.execCommand("copy"); } catch (error) {}
    document.body.removeChild(input);
    return Promise.resolve();
  }

  function initColorCopy() {
    var status = document.querySelector("[data-copy-status]");
    var timer;
    document.querySelectorAll("[data-copy-color]").forEach(function (button) {
      button.addEventListener("click", function () {
        var color = button.getAttribute("data-copy-color");
        writeClipboard(color).then(function () {
          if (!status) return;
          clearTimeout(timer);
          status.textContent = color + " copied";
          status.classList.add("is-visible");
          timer = setTimeout(function () { status.classList.remove("is-visible"); }, 1500);
        });
      });
    });
  }

  function start() {
    initDownloadMenus();
    initSectionNavigation();
    initSectionReveals();
    initColorCopy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
