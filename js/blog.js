(function () {
  "use strict";

  var ARTICLES = [
    {
      slug: "hive-report-01-luzora-goes-public",
      title: "The Hive Report #01: Luzora Goes Public, Gets Smarter, and Learns From You",
      dek: "Luzora stepped into the public eye, shipped v1.0.4, introduced Smart Return, and learned what real users need from the browser.",
      metaDescription: "The first Hive Report covers Luzora's public launch, v1.0.4, Smart Return, community feedback, fixes, and the people helping shape the product.",
      category: "Announcements",
      date: "July 26, 2026",
      readTime: "12 min read",
      author: "Luzora Team",
      cardImage: "/assets/brand-kit/social/hive-report-01.png",
      cardImageAlt: "Worker Bee surrounded by Luzora product updates, Smart Return, referral, and task editing cards",
      lead: [
        "Hello, you. Welcome to our first Hive Report. 🐝",
        "Every week, we will share what happened inside the Luzora hive. You will see what we shipped, what we fixed, what we learned, and how your feedback is helping us build a better product.",
        "This was a big week.",
        "Luzora stepped into the public eye, launched version 1.0.4, opened applications for private testing, and introduced the Manifesto to the world.",
        "We also spoke with people across trading, education, design, development, and Web3. Those conversations helped us understand one thing even more clearly:",
        "People constantly find important things online, but returning to them and following through is still harder than it should be.",
        "That is the problem Luzora is here to solve.",
        "If you signed the Manifesto, shared a post, replied to us, tested the extension, or told us about your workflow, you helped shape this week.",
        "Thank you. Now, let us show you what the hive has been working on."
      ],
      sections: [
        {
          id: "luzora-stepped-into-the-public-eye",
          title: "Luzora stepped into the public eye",
          body: [
            "This week, we officially introduced Luzora and invited people to join us early.",
            "We launched the Luzora Manifesto, opened beta access applications, and started welcoming our first private testers.",
            "Every Manifesto signer now receives a unique referral link, a personalized public page, and a downloadable Manifesto card they can proudly share."
          ],
          listType: "ul",
          listIntro: "We also added:",
          list: [
            "Live referral counts",
            "Referral attribution",
            "Share and copy actions",
            "Social verification activities",
            "Personalized Manifesto cards",
            "Better referral messaging",
            "A smoother welcome experience",
            "New mascot, product, and promotional assets"
          ],
          afterList: [
            "We also published “Referral System Is Live: Invite Your Hive” to explain how referrals work and how early supporters can help the community grow.",
            "The website received several improvements too. We updated metadata, canonical URLs, structured data, keyboard shortcut information, and search visibility.",
            "The hive now has a stronger front door."
          ]
        },
        {
          id: "luzora-v1-0-4-arrived",
          title: "Luzora v1.0.4 arrived",
          body: [
            "While Luzora was making noise in public, the extension was becoming much smarter behind the scenes.",
            "Version 1.0.4 shipped to the Web Store with major improvements to task creation, scheduling, reminders, navigation, and reliability.",
            "Luzora can now understand more natural ways of describing when work should happen."
          ],
          listType: "ul",
          listIntro: "Examples include:",
          list: [
            "Every 3 hours",
            "Monday to Friday at 3 PM",
            "Remind me 10 minutes before",
            "10 minutes after completion",
            "Come back in 30 seconds"
          ],
          afterList: [
            "We added live countdowns for seconds, minutes, and hours. We also introduced multiple reminders for important events and support for schedules based on when a task was last completed.",
            "Task creation received plenty of love too.",
            "You can now create multiple tasks more smoothly, edit tasks across an entire project, use faster keyboard controls, and work with cleaner project fields, folders, task chips, and notification messages.",
            "Luzora also became better at recognising websites, favicons, links, projects, and the real identity of the page you are using."
          ]
        },
        {
          id: "meet-smart-return",
          title: "Meet Smart Return",
          body: [
            "One of our favourite updates this week started with a conversation.",
            "During a product review, forex trader Vito showed us how he uses TradingView.",
            "He might analyse EURUSD, draw his setup, and decide to return in two hours. At the same time, he could be monitoring TRXUSDT and need to return in ten minutes.",
            "Saving the TradingView URL was not enough. Several charts can appear to share the same address, even when the selected pair, interval, layout, and analysis are different.",
            "Vito did not simply need to remember that he had a task.",
            "He needed to return to the exact chart where the task began.",
            "That insight inspired Smart Return.",
            "Luzora can now remember important TradingView context, including the selected pair, chart layout, and interval. When the reminder arrives, Luzora brings the user back to the intended analysis.",
            "We also created a reusable adapter structure so other websites and tools can receive similar contextual support in the future.",
            "One conversation uncovered an entirely new layer of the product.",
            "This is exactly why we are involving real people early."
          ]
        },
        {
          id: "what-we-fixed-on-the-website",
          title: "What we fixed on the website",
          body: [
            "Launching publicly helped us catch places where a technically successful action could still feel broken to the person using it.",
            "The Manifesto flow was our biggest example.",
            "Sometimes a signature was saved successfully, but the public card was not ready immediately. The database said everything worked. The person waiting for their card saw something very different.",
            "We rebuilt the experience to recover missing card information, keep checking while the card is being prepared, and only complete the journey when the result is ready to view."
          ],
          listType: "ul",
          listIntro: "We also:",
          list: [
            "Restored Manifesto card sharing and downloads",
            "Added better recovery and retry handling",
            "Improved copy link and copy email support across browsers",
            "Standardized our contact email as hello@luzora.app",
            "Improved the signed Manifesto layout",
            "Clarified referral messaging",
            "Added correct 404 and noindex handling for missing articles",
            "Corrected the verified data deletion timeline to no later than 30 days"
          ],
          afterList: [
            "The lesson was simple:",
            "A database success message is not the same thing as a successful human experience."
          ]
        },
        {
          id: "what-we-fixed-inside-the-extension",
          title: "What we fixed inside the extension",
          body: [
            "Reminders are only useful when people can trust them, so reliability received serious attention this week."
          ],
          listType: "ul",
          listIntro: "We fixed cases where:",
          list: [
            "Deleted tasks continued to send reminders",
            "Completed tasks still triggered notifications",
            "Missed recurring reminders fired repeatedly",
            "Browser sleep caused reminder failures",
            "Extension restarts interrupted scheduled reminders",
            "Ambiguous times such as “at 2” selected the wrong future time",
            "Daily recurrence was assumed incorrectly",
            "Timed completion history grew when only daily history was needed"
          ],
          afterList: [
            "We also improved cross device notification coordination. The active or most recently active browser can now take responsibility for delivering notifications, reducing duplicates across devices.",
            "Task links and projects became more accurate too.",
            "We fixed Google Meet being identified only as Google, prevented project links from replacing task specific links, and improved how Luzora recognises page identity.",
            "Folders also received attention. Hidden content now stays hidden when a folder is collapsed, and editing, renaming, hovering, and focusing feel more reliable.",
            "Finally, we improved remote synchronization, expired refresh token handling, missing database field recovery, and noisy offline alerts.",
            "Not every fix is flashy, but these are the improvements that make Luzora feel dependable every day."
          ]
        },
        {
          id: "context-is-the-final-boss",
          title: "Context is the final boss",
          body: [
            "One of our biggest product lessons this week came from natural language.",
            "Understanding individual words is not enough.",
            "Consider this sentence:",
            "“Every week, Monday to Friday, at 3 PM.”",
            "“Every week” is not one task. “Monday to Friday” is not another. “At 3 PM” is not a separate reminder.",
            "Together, they describe one complete schedule.",
            "Luzora must understand the whole sentence before deciding what is an action, date, time, recurrence, reminder, project, or link.",
            "That idea became one of our guiding rules this week:",
            "Context is the final boss.",
            "The better Luzora understands the full intention, the less work you have to do."
          ]
        },
        {
          id: "built-from-your-feedback",
          title: "Built from your feedback",
          body: [
            "Smart Return was not the only idea shaped by conversations this week."
          ],
          listIntro: "Your feedback also inspired:",
          listType: "ul",
          list: [
            "Better multi device reminders",
            "Project wide task editing",
            "Faster keyboard controls",
            "Appointment workflow ideas",
            "More contextual support for web applications"
          ],
          afterList: [
            "We are learning that the best feature ideas often begin with someone describing a small frustration from their normal day.",
            "Our job is to listen carefully, find the real problem underneath it, and build something useful.",
            "One of those conversations was with TimX, a senior product designer with about nine years of experience.",
            "After installing Luzora and trying it himself, he told us, “If you need any validation of Luzora importance, take my words as that validation.”",
            "Luzora exceeded his expectations. He was especially impressed by how naturally it understood his task descriptions, and he told us, “I will pay to use this.”",
            "His feedback also led to a practical improvement. You can now edit folder names directly from the Tasks page without leaving the workflow."
          ]
        },
        {
          id: "who-we-spoke-with",
          title: "Who we spoke with",
          body: [
            "This week, we connected with people whose work happens heavily inside the browser.",
            "Vito is an experienced forex trader. He helped us understand chart monitoring workflows and inspired Smart Return.",
            "Favour is a teacher and UI/UX designer. She is helping us explore online teaching, education, and design workflows.",
            "Mowo is a frontend developer. He is giving us insight into how Luzora can support developers working across documentation, deployments, tasks, and browser tools.",
            "Sanera is an active Web3 community member. She clearly explained how Luzora can help with testnets, governance, research, trading routines, and community events.",
            "TimX is a senior product designer with about nine years of experience. His first hand experience validated Luzora's importance, highlighted the strength of its natural language understanding, and helped us improve folder editing from the Tasks page.",
            "They work in different fields, but the problem is familiar.",
            "They find something important online. They intend to return. Other things demand their attention. The page disappears into browser history, bookmarks, open tabs, or memory.",
            "Luzora helps them come back and show up."
          ]
        },
        {
          id: "the-hive-is-getting-noticed",
          title: "The hive is getting noticed",
          body: [
            "Our first public week produced encouraging early results.",
            "The official beta and Manifesto announcement reached 2.1K views and received 14 replies.",
            "The founder's introduction to Luzora reached 2.2K views, with 15 likes, 4 reposts, and 6 bookmarks.",
            "Sanera's independent post about Luzora's value for Web3 users reached 9.2K views, with 41 replies and 44 likes.",
            "Together, these highlighted posts generated at least:"
          ],
          listType: "ul",
          list: [
            "13.5K displayed views",
            "57 replies",
            "63 likes",
            "5 reposts",
            "6 bookmarks"
          ],
          afterList: [
            "The official Luzora X account is now verified too. We ended the week with 63 followers and 29 posts.",
            "These are early numbers, but they tell us something important.",
            "The problem resonates.",
            "People understand what Luzora is trying to solve, and they want to see where it goes."
          ]
        },
        {
          id: "what-happens-next",
          title: "What happens next",
          body: [
            "This week gave us a stronger product, a growing community, and a clearer direction.",
            "Now we keep listening.",
            "We will continue bringing private testers into the hive, improving how Luzora understands tasks, strengthening reminder reliability, and expanding Smart Return to more browser based workflows.",
            "We will also keep sharing the process with you.",
            "The wins. The bugs. The lessons. The ideas that came from a single conversation and became something real.",
            "Luzora is being built to help you return to what matters and follow through.",
            "One webpage at a time.",
            "One task at a time.",
            "One week at a time.",
            "Thank you for being here this early. The hive is only getting started. 🐝",
            "[Apply for private testing and join the community](https://www.luzora.app).",
            "Keep buzzing. Keep showing up."
          ],
          cta: {
            label: "Sign the Luzora Manifesto",
            href: "/manifesto"
          }
        }
      ]
    },
    {
      slug: "referral-system-is-live-invite-your-hive",
      title: "Referral System Is Live: Invite Your Hive",
      dek: "You can now share your unique Luzora referral link, invite others to sign the Manifesto, and watch your Hive grow.",
      metaDescription: "The Luzora referral system is live. Sign the Manifesto, share your unique referral link, and invite your community to join the Hive.",
      category: "Announcements",
      date: "July 21, 2026",
      readTime: "4 min read",
      author: "Luzora Team",
      cardImage: "/assets/brand-kit/social/referral-system-article-preview.png",
      cardImageAlt: "Elite Bee offering a Luzora invite beside the words Invite Your Hive",
      lead: [
        "Consistency may begin with one person, but it grows stronger when people show up together.",
        "Today, we are making that easier.",
        "The Luzora referral system is now live. Everyone who signs the Luzora Manifesto receives a unique referral link they can share with friends, teammates, and their wider community.",
        "When someone signs through your link, they become part of your Hive."
      ],
      sections: [
        {
          id: "your-invitation-to-the-hive",
          title: "Your invitation to the Hive",
          body: [
            "The Luzora Manifesto is a commitment to something simple:"
          ],
          listType: "ul",
          list: [
            "To return to what matters.",
            "To follow through on the small tasks that move life forward.",
            "To keep showing up, even when motivation changes."
          ],
          afterList: [
            "Thousands of important activities happen inside the browser. We start courses, save research, discover opportunities, open applications, find useful tools, and promise ourselves that we will return later.",
            "Too often, later never comes.",
            "Luzora is being built to change that. It turns webpages into scheduled or recurring tasks, helping you return with a clear purpose at the right time.",
            "Now, you can invite others to make that commitment with you."
          ]
        },
        {
          id: "how-the-referral-system-works",
          title: "How the referral system works",
          body: [],
          listIntro: "Getting started takes only a few steps:",
          list: [
            "Visit the [Luzora Manifesto](/manifesto).",
            "Sign the Manifesto and claim your unique Hive name.",
            "Open your signed Manifesto card.",
            "Select Share link or Copy link.",
            "Send your referral link to your community."
          ],
          afterList: [
            "When someone opens your link and signs the Manifesto, your referral count increases.",
            "You can return to your signed Manifesto card at any time to see how many Bees you have invited."
          ]
        },
        {
          id: "your-referrals-stay-connected",
          title: "Your referrals stay connected",
          body: [
            "Every referral link contains your unique Hive name. This lets Luzora remember who sent the invitation.",
            "When someone signs through your link, the referral is recorded immediately. If they create their Luzora account using the same email address, the referral remains connected when Luzora launches.",
            "They get their own Hive identity, and your growing community stays connected to you.",
            "No codes to enter. No complicated steps. Just share your link and invite people to join."
          ]
        },
        {
          id: "who-should-you-invite",
          title: "Who should you invite?",
          body: [],
          listIntro: "Invite the people who are always trying to return to something important online.",
          listType: "ul",
          list: [
            "A student working through an online course",
            "A developer keeping up with documentation",
            "A job seeker returning to applications and job boards",
            "A creator managing publishing routines",
            "A researcher reviewing saved papers",
            "A designer following project feedback",
            "A Web3 user tracking governance and community activities",
            "A friend who has far too many tabs open"
          ],
          afterList: [
            "If their browser is part of the task, Luzora is being built for them."
          ]
        },
        {
          id: "share-with-purpose",
          title: "Share with purpose",
          body: [
            "A referral is more than a number.",
            "It is an invitation to build better follow-through together. It is a way to bring people into Luzora early and give them a place in the Hive before the public launch.",
            "You do not need a huge audience. Start with one person who would genuinely benefit from remembering what to do on a webpage and returning when it matters.",
            "One thoughtful invitation is worth more than a hundred empty clicks."
          ]
        },
        {
          id: "private-testing-begins-july-28",
          title: "Private testing begins July 28",
          body: [
            "Luzora's private test begins July 28.",
            "Selected testers will get the chance to use Luzora before beta access, share feedback, help uncover issues, and shape what comes next. Active participants can also earn the Founding bee role.",
            "If you want to help build Luzora with us, [learn more about private testing](/blog/help-shape-luzora-private-testing-is-opening)."
          ]
        },
        {
          id: "invite-your-hive",
          title: "Invite your Hive",
          body: [
            "Your referral link is ready.",
            "Sign the Manifesto, claim your Hive name, and invite the people you want beside you when Luzora launches."
          ],
          cta: {
            label: "Sign the Luzora Manifesto",
            href: "/manifesto"
          }
        }
      ]
    },
    {
      slug: "help-shape-luzora-private-testing-is-opening",
      title: "Help shape Luzora: Private testing is opening",
      dek: "We are inviting a small group of early users to test Luzora, give honest feedback, and help shape the browser extension before launch.",
      category: "Announcements",
      date: "July 18, 2026",
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
            "This stage is about building with real users, not guessing in silence.",
            "The Hive opens for private testing on July 28, 2026. Applications are open now and close on July 26, 2026.",
            "Apply now for a chance to test Luzora early, earn the Founding bee role, and help shape what comes before beta access."
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
            "Have access to a browser that supports extensions.",
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
            "The Founding bee badge gives you access to the private test channel, where you will find the test guide, setup instructions, feedback threads, and updates from the Luzora team.",
            "Applications are open now and close on July 26, 2026. Selected testers will be contacted before private testing begins on July 28, 2026."
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
    var lead = article.lead ? '<div class="article-lead" data-article-section>' + article.lead.map(function (paragraph) {
      return "<p>" + renderInline(paragraph) + "</p>";
    }).join("") + "</div>" : "";

    return lead + article.sections.map(function (section) {
      var paragraphs = section.body.map(function (paragraph) {
        return "<p>" + renderInline(paragraph) + "</p>";
      }).join("");
      var listIntro = section.listIntro ? '<p class="article-list-intro">' + renderInline(section.listIntro) + "</p>" : "";
      var listTag = section.listType === "ul" ? "ul" : "ol";
      var list = section.list ? "<" + listTag + ">" + section.list.map(function (item) {
        return "<li>" + renderInline(item) + "</li>";
      }).join("") + "</" + listTag + ">" : "";
      var afterList = section.afterList ? section.afterList.map(function (paragraph) {
        return "<p>" + renderInline(paragraph) + "</p>";
      }).join("") : "";
      var cta = section.cta ? '<p class="article-cta"><a href="' + escapeHtml(section.cta.href) + '">' + escapeHtml(section.cta.label) + "</a></p>" : "";
      var callout = section.callout ? '<p class="article-callout">' + renderInline(section.callout) + "</p>" : "";
      return '<section class="article-section" id="' + section.id + '" data-article-section><h2>' + escapeHtml(section.title) + "</h2>" + paragraphs + listIntro + list + afterList + cta + callout + "</section>";
    }).join("");
  }

  function updateArticleMetadata(article) {
    var description = article.metaDescription || article.dek;
    var canonicalUrl = "https://www.luzora.app" + getArticleUrl(article);
    var imageUrl = new URL(article.cardImage || CARD_IMAGE, "https://www.luzora.app").href;

    function setMeta(selector, value) {
      var meta = document.querySelector(selector);
      if (meta) meta.setAttribute("content", value);
    }

    document.title = article.title + " | The Hive Journal";
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', article.title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:image"]', imageUrl);
    setMeta('meta[name="twitter:title"]', article.title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', imageUrl);

    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", canonicalUrl);
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

    function animateScrollTo(y) {
      var start = window.scrollY || window.pageYOffset || 0;
      var distance = y - start;
      var duration = 900;
      var startedAt = null;
      var root = document.documentElement;
      var previousBehavior = root.style.scrollBehavior;

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      root.style.scrollBehavior = "auto";

      requestAnimationFrame(function step(timestamp) {
        if (!startedAt) startedAt = timestamp;
        var progress = Math.min((timestamp - startedAt) / duration, 1);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          root.style.scrollBehavior = previousBehavior;
        }
      });
    }

    button.addEventListener("click", function () {
      var top = target.getBoundingClientRect().top + window.pageYOffset - 120;
      var y = Math.max(top, 0);
      if (typeof window.luzoraSmoothScrollTo === "function") {
        window.luzoraSmoothScrollTo(y);
      } else {
        animateScrollTo(y);
      }
    });

    function setButtonVisibility() {
      var rect = target.getBoundingClientRect();
      var isAtSection = rect.top <= window.innerHeight * 0.45 && rect.bottom >= 120;
      var hasPassedSection = rect.bottom < 120;
      button.classList.toggle("is-hidden", isAtSection);
      button.classList.toggle("is-past-target", hasPassedSection);
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

    updateArticleMetadata(article);
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
