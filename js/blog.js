(function () {
  "use strict";

  var ARTICLES = [
    {
      slug: "help-shape-luzora-private-testing-is-opening",
      title: "Help shape Luzora: Private testing is opening",
      dek: "We are inviting a small group of early users to test Luzora, give honest feedback, and help shape the browser extension before launch.",
      category: "Announcements",
      date: "July 14, 2026",
      readTime: "5 min read",
      author: "Luzora Team",
      cardImage: "/assets/brand-kit/other%20assets/worker-bee-in-private-test.avif",
      cardImageAlt: "Worker Bee preparing Luzora private testing",
      sections: [
        {
          id: "what-luzora-is",
          title: "What Luzora is",
          body: [
            "Luzora is a browser extension that helps you turn any webpage into a recurring task. Instead of saving a link and hoping you remember why it mattered, you can save the page, add what you need to do, set when you want to return, and let Luzora bring it back at the right time.",
            "It is for students, researchers, designers, developers, job seekers, Web3 users, creators, and anyone whose work happens across websites.",
            "If the page is part of the task, Luzora helps you come back to it with purpose."
          ]
        },
        {
          id: "private-testing-is-opening",
          title: "We are opening private testing",
          body: [
            "Before Luzora goes public, we want to test it with people who care about consistency, focus, and finishing the small things that quietly move life forward.",
            "The private test is not just about finding bugs, although bug reports are very welcome. It is about learning how Luzora fits into real browsing habits.",
            "We want to understand where Luzora feels useful, where the experience feels confusing, what reminders people actually create, what workflows Luzora should support better, what needs to be clearer before public launch, and what features should come next.",
            "This stage is about building with real users, not guessing in silence."
          ]
        },
        {
          id: "who-we-are-looking-for",
          title: "Who we are looking for",
          body: [
            "We are looking for people who actively use their browser to get things done across work, study, research, building, investing, creating, or everyday follow-ups.",
            "You do not need to be technical. You only need to use the web often, have access to an extension-supported browser, and be willing to test Luzora in real life."
          ],
          list: [
            "Use a laptop browser regularly to work, study, build, apply, research, trade, design, or manage tasks.",
            "Have access to a browser on laptop, tablet, or mobile that supports browser extensions.",
            "Save tabs because you plan to come back later.",
            "Use bookmarks but rarely revisit them.",
            "Work across tools like Notion, Gmail, GitHub, Canva, ChatGPT, YouTube, job boards, dashboards, Web3 apps, or research sites.",
            "Want a simple way to remember what to do on a specific webpage.",
            "Are willing to test early software and give honest feedback.",
            "Care about building better habits around follow-through."
          ]
        },
        {
          id: "how-to-join",
          title: "How to join the private test",
          body: [],
          listIntro: "Access to the private test will happen in these steps:",
          list: [
            "Sign the [Luzora manifesto](/manifesto).",
            "Apply to join the [Luzora Discord](https://discord.gg/VJFFJnfHZ) and submit the application form.",
            "Wait for our review and email response.",
            "If approved, join the private test channel with the Founding bee badge."
          ],
          afterList: [
            "The Founding bee badge gives you access to the private test channel, where you will find the test guide, setup instructions, feedback threads, and updates from the Luzora team."
          ]
        },
        {
          id: "what-we-expect",
          title: "What we expect from testers",
          body: [
            "Private testers are encouraged to use Luzora consistently during the test period.",
            "You do not need to be perfect. You do not need to send feedback every day. But we do want testers who are willing to actually use the product, try it in different situations, and tell us what works and what does not.",
            "To retain the Founding bee badge, testers should stay active during the test period by using Luzora, joining product discussions, reporting bugs, sharing ideas, or giving feedback when possible.",
            "The goal is simple: help us make Luzora better before the public launch."
          ]
        },
        {
          id: "why-feedback-matters",
          title: "Why your feedback matters",
          body: [
            "Luzora is still early, and early feedback has a special kind of power.",
            "A small comment can change how onboarding works. A bug report can prevent frustration for thousands of future users. A real use case can shape an entire feature. A thoughtful suggestion can help Luzora become simpler, clearer, and more useful.",
            "Your ideas, bug reports, questions, and honest reactions will help guide the next phase of Luzora's journey.",
            "We are building Luzora for people who want to return to what matters and actually follow through. If that sounds like you, we would love to have you in the Hive."
          ],
          callout: "Consistency is gold here. Come help us build it."
        }
      ]
    }
  ];

  var CARD_IMAGE = "/assets/brand-kit/logos/symbol/luzora-logo-yellow.svg";
  var CALENDAR_ICON = "/assets/icons/Interface essential/Calendar-Black.svg";
  var CLOCK_ICON = "/assets/icons/fi_clock-Black.svg";
  var SHARE_ICON = "/assets/icons/fi_share-2-Black.svg";

  function getArticleUrl(article) {
    return "/blog/" + article.slug;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char];
    });
  }

  function renderInline(value) {
    var source = String(value);
    var output = "";
    var pattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)/g;
    var lastIndex = 0;
    var match;
    while ((match = pattern.exec(source)) !== null) {
      output += escapeHtml(source.slice(lastIndex, match.index));
      var label = escapeHtml(match[1]);
      var href = escapeHtml(match[2]);
      var isExternal = /^https?:\/\//.test(match[2]);
      var opensNewTab = isExternal || match[2] === "/manifesto";
      output += '<a href="' + href + '"' + (opensNewTab ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + label + "</a>";
      lastIndex = pattern.lastIndex;
    }
    output += escapeHtml(source.slice(lastIndex));
    return output.replace(/\bFounding bee\b/g, '<span class="founding-bee-badge">@Founding bee</span>');
  }

  function articleFromPath() {
    var params = new URLSearchParams(window.location.search);
    var querySlug = params.get("slug");
    var path = window.location.pathname.replace(/\/+$/, "");
    var slug = querySlug || path.split("/").filter(Boolean).pop();
    if (slug === "blog-article.html") slug = ARTICLES[0].slug;
    return ARTICLES.find(function (article) { return article.slug === slug; }) || ARTICLES[0];
  }

  function cardTemplate(article, compact) {
    var articleUrl = getArticleUrl(article);
    var cardImage = article.cardImage || CARD_IMAGE;
    var cardImageAlt = article.cardImageAlt || "";
    var hasCustomImage = Boolean(article.cardImage);
    return (
      '<article class="blog-card" data-blog-reveal data-category="' + escapeHtml(article.category) + '">' +
        '<a class="blog-card__image' + (hasCustomImage ? " blog-card__image--custom" : "") + '" href="' + articleUrl + '" aria-label="Read ' + escapeHtml(article.title) + '"><img src="' + cardImage + '" alt="' + escapeHtml(cardImageAlt) + '" /></a>' +
        '<div class="blog-card__body">' +
          '<span class="blog-pill">' + escapeHtml(article.category) + '</span>' +
          '<h3><a class="blog-card__title-link" href="' + articleUrl + '">' + escapeHtml(article.title) + '</a></h3>' +
          '<p>' + escapeHtml(article.dek) + '</p>' +
          '<div class="blog-card__meta">' +
            '<span><img src="' + CALENDAR_ICON + '" alt="" />' + escapeHtml(article.date) + '</span>' +
            '<span><img src="' + CLOCK_ICON + '" alt="" />' + escapeHtml(article.readTime.replace(" read", "")) + '</span>' +
            (compact ? "" : '<button class="blog-card__share" type="button" data-card-share data-share-url="' + articleUrl + '" data-share-title="' + escapeHtml(article.title) + '" data-share-text="' + escapeHtml(article.dek) + '" aria-label="Share ' + escapeHtml(article.title) + '"><img src="' + SHARE_ICON + '" alt="" aria-hidden="true" /><span class="blog-card__share-tip" role="tooltip">Share</span></button>') +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function initCardShareButtons(root) {
    var buttons = Array.from((root || document).querySelectorAll("[data-card-share]"));
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var url = new URL(button.getAttribute("data-share-url"), window.location.origin).href;
        var title = button.getAttribute("data-share-title") || document.title;
        var text = button.getAttribute("data-share-text") || "";

        function markCopied() {
          button.classList.add("is-copied");
          var tip = button.querySelector(".blog-card__share-tip");
          if (tip) tip.textContent = "Copied";
          setTimeout(function () {
            button.classList.remove("is-copied");
            if (tip) tip.textContent = "Share";
          }, 1400);
        }

        if (navigator.share) {
          navigator.share({ title: title, text: text, url: url }).catch(function () {});
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(markCopied, markCopied);
        } else {
          markCopied();
        }
      });
    });
  }

  function revealCards() {
    var cards = Array.from(document.querySelectorAll("[data-blog-reveal]"));
    if (!cards.length) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (card) { card.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    cards.forEach(function (card, index) {
      card.style.transitionDelay = Math.min(index * 70, 280) + "ms";
      observer.observe(card);
    });
  }

  function initBlogIndex() {
    var list = document.querySelector("[data-blog-list]");
    if (!list) return;

    var empty = document.querySelector("[data-blog-empty]");
    var searchWrap = document.querySelector("[data-blog-search]");
    var searchInput = document.querySelector("[data-blog-search-input]");
    var activeCategory = "Announcements";
    var query = "";

    function render() {
      var filtered = ARTICLES.filter(function (article) {
        var inCategory = article.category === activeCategory;
        var haystack = (article.title + " " + article.dek + " " + article.category).toLowerCase();
        return inCategory && haystack.indexOf(query.toLowerCase()) !== -1;
      });
      list.innerHTML = filtered.map(function (article) { return cardTemplate(article); }).join("");
      if (empty) empty.hidden = filtered.length > 0;
      revealCards();
      initCardShareButtons(list);
    }

    document.querySelectorAll("[data-blog-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        activeCategory = button.getAttribute("data-blog-filter");
        document.querySelectorAll("[data-blog-filter]").forEach(function (item) {
          item.classList.toggle("is-active", item === button);
        });
        render();
      });
    });

    var searchToggle = document.querySelector("[data-blog-search-toggle]");
    if (searchToggle && searchWrap && searchInput) {
      searchToggle.addEventListener("click", function () {
        searchWrap.hidden = !searchWrap.hidden;
        if (!searchWrap.hidden) searchInput.focus();
      });
      searchInput.addEventListener("input", function () {
        query = searchInput.value.trim();
        render();
      });
    }

    var reset = document.querySelector("[data-blog-reset]");
    if (reset) {
      reset.addEventListener("click", function () {
        activeCategory = "Announcements";
        query = "";
        if (searchInput) searchInput.value = "";
        document.querySelectorAll("[data-blog-filter]").forEach(function (item) {
          item.classList.toggle("is-active", item.getAttribute("data-blog-filter") === "Announcements");
        });
        render();
      });
    }

    render();
  }

  function renderArticleBody(article) {
    return article.sections.map(function (section) {
      var paragraphs = section.body.map(function (paragraph) {
        return "<p>" + renderInline(paragraph) + "</p>";
      }).join("");
      var listIntro = section.listIntro ? '<p class="article-list-intro">' + renderInline(section.listIntro) + "</p>" : "";
      var list = section.list ? "<ol>" + section.list.map(function (item) {
        return "<li>" + renderInline(item) + "</li>";
      }).join("") + "</ol>" : "";
      var afterList = section.afterList ? section.afterList.map(function (paragraph) {
        return "<p>" + renderInline(paragraph) + "</p>";
      }).join("") : "";
      var callout = section.callout ? '<p class="article-callout">' + renderInline(section.callout) + "</p>" : "";
      return '<section class="article-section" id="' + section.id + '" data-article-section><h2>' + escapeHtml(section.title) + "</h2>" + paragraphs + listIntro + list + afterList + callout + "</section>";
    }).join("");
  }

  function initArticleReveals() {
    var sections = Array.from(document.querySelectorAll("[data-article-section]"));
    if (!sections.length) return;
    if (!("IntersectionObserver" in window)) {
      sections.forEach(function (section) { section.classList.add("is-revealed"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10%", threshold: 0.08 });
    sections.forEach(function (section) { observer.observe(section); });
  }

  function initShareButtons(article) {
    var share = document.querySelector("[data-share-article]");
    function copyLink() {
      var url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url);
      }
    }
    if (share) {
      share.addEventListener("click", function () {
        if (navigator.share) {
          navigator.share({ title: article.title, text: article.dek, url: window.location.href }).catch(function () {});
        } else {
          copyLink();
        }
      });
    }
  }

  function initPrivateTestJump(article) {
    var button = document.querySelector("[data-private-test-jump]");
    if (!button) return;

    var target = document.getElementById("how-to-join");
    if (!target || article.slug !== "help-shape-luzora-private-testing-is-opening") {
      button.hidden = true;
      return;
    }

    button.hidden = false;

    button.addEventListener("click", function () {
      var top = target.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    });

    function setButtonVisibility() {
      var rect = target.getBoundingClientRect();
      var isAtSection = rect.top <= window.innerHeight * 0.45 && rect.bottom >= 120;
      button.classList.toggle("is-hidden", isAtSection);
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          button.classList.toggle("is-hidden", entry.isIntersecting);
        });
      }, { rootMargin: "-12% 0px -52%", threshold: 0.01 });
      observer.observe(target);
    }

    setButtonVisibility();
    window.addEventListener("scroll", setButtonVisibility, { passive: true });
    window.addEventListener("resize", setButtonVisibility);
  }

  function initArticlePage() {
    var body = document.querySelector("[data-article-body]");
    if (!body) return;
    var article = articleFromPath();

    document.title = article.title + " | The Hive Journal";
    var title = document.querySelector("[data-article-title]");
    var dek = document.querySelector("[data-article-dek]");
    var breadcrumb = document.querySelector("[data-article-breadcrumb]");
    var date = document.querySelector("[data-article-date]");
    var read = document.querySelector("[data-article-read]");
    var author = document.querySelector("[data-article-author]");
    if (title) title.textContent = article.title;
    if (dek) dek.textContent = article.dek;
    if (breadcrumb) breadcrumb.textContent = article.title;
    if (date) date.textContent = article.date;
    if (read) read.textContent = article.readTime;
    if (author) author.textContent = article.author;

    body.innerHTML = renderArticleBody(article);

    var related = ARTICLES.filter(function (item) { return item.slug !== article.slug; }).slice(0, 3);
    var relatedList = document.querySelector("[data-related-list]");
    var relatedSection = document.querySelector(".article-related");
    if (relatedList) relatedList.innerHTML = related.map(function (item) { return cardTemplate(item, true); }).join("");
    if (relatedSection) relatedSection.hidden = related.length === 0;

    initArticleReveals();
    revealCards();
    initShareButtons(article);
    initPrivateTestJump(article);
  }

  function start() {
    initBlogIndex();
    initArticlePage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
