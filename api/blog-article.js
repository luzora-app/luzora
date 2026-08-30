const fs = require("fs");
const path = require("path");

const ARTICLES = {
  "how-to-get-work-done-when-you-have-too-much-to-do": {
    title: "4 Ways to Get Real Work Done When You Already Have Too Much to Do",
    description: "Discover four practical ways to get real work done when you have too much to do: reset the overload, start smaller, protect focus, and negotiate trade-offs.",
    dek: "Four practical ways to stop reacting, decide what matters, and make meaningful progress without working yourself into the ground.",
    image: "https://www.luzora.app/assets/images/blog/overloaded-work/cover.png?v=20260830-textless",
    dateLabel: "August 30, 2026",
    readTime: "7 min read",
    datePublished: "2026-08-30T09:00:00+01:00",
    dateModified: "2026-08-30T09:00:00+01:00",
    articleSection: "Guides",
    keywords: ["feeling overwhelmed", "too much to do", "prioritizing work", "time management", "focus", "workload management"],
    bodyHtml: `
      <div class="article-lead is-revealed" data-article-section>
        <p>It is 9:07 in the morning. You open your laptop with good intentions, see three messages marked urgent, remember the report you did not finish yesterday, and notice the tab for the course you promised yourself you would continue.</p>
        <p>So you answer one message. Then another. You check the report, jump into a meeting, return to your inbox, and spend the rest of the day moving quickly. By evening, you are tired—but the work that mattered most is still waiting.</p>
        <p>If that feels familiar, the problem is probably not laziness. You are trying to make decisions while carrying too many open commitments in your head.</p>
        <p>When you already have too much to do, the answer is not to become faster at doing everything. It is to reduce the number of things competing for this moment, choose one useful result, and make starting it easy.</p>
      </div>
      <section class="article-section is-revealed" id="quick-answer" data-article-section>
        <h2>The short answer</h2>
        <p>When you have too much to do, stop reacting for 20 minutes. Write down every open commitment, separate real consequences from noise, remove or renegotiate work that does not fit, choose one meaningful outcome for today, and give it a protected place on your calendar. Then define the first action so clearly that you can begin without another decision.</p>
        <p>That small reset will not make the workload disappear. It will stop the workload from deciding your day for you.</p>
        <p class="article-callout">You do not need to finish everything today. You need to know what deserves today.</p>
      </section>
      <section class="article-section is-revealed" id="why-busy-days-produce-so-little" data-article-section>
        <h2>Why a busy day can still produce so little</h2>
        <p>An overloaded day makes every request feel equally important. It is not. Research on the <a href="https://academic.oup.com/jcr/article-abstract/45/3/673/4847790" target="_blank" rel="noopener noreferrer">mere urgency effect</a> found that people often choose urgent tasks over more important ones—even when the urgent task has a smaller payoff.</p>
        <p>Switching constantly has a cost too. When you leave one unfinished task for another, part of your attention can remain stuck on the first one. Researchers call this <a href="https://www.sciencedirect.com/science/article/pii/S0749597809000399" target="_blank" rel="noopener noreferrer">attention residue</a>. In ordinary language: your hands have moved to the next task, but a piece of your mind has not.</p>
        <p>This is why doing a little of twelve things can feel exhausting while creating very little progress. The goal is not to squeeze more activity into the day. It is to create fewer, cleaner decisions.</p>
      </section>
      <section class="article-section is-revealed" id="the-20-minute-overload-reset" data-article-section>
        <h2>1. Reset the overload before you do more</h2>
        <p>Imagine pausing that frantic morning before answering the next message. Take a sheet of paper, open a plain note, or use whatever task tool you already trust. Set a timer for 20 minutes.</p>
        <p class="article-list-intro">Then work through these four steps:</p>
        <ol>
          <li>Capture for five minutes. Write down every promise, task, worry, follow-up, and half-finished job. Do not organise yet. Your first job is to stop using your memory as a storage room.</li>
          <li>Question the list for five minutes. For each item, ask: What happens if this waits? Who is affected? Is the deadline real, assumed, or self-imposed? A task with no meaningful consequence may not deserve today.</li>
          <li>Match the work to reality for five minutes. Look at the hours you actually have after meetings, care work, meals, and rest. If the work does not fit, choose what to delay, decline, delegate, shorten, or renegotiate. A crowded calendar cannot be repaired by optimism.</li>
          <li>Choose today's win for five minutes. Complete this sentence: If only one useful thing moves forward today, it will be ____. Pick an outcome, not a vague activity. “Send the proposal” is clearer than “work on proposal.”</li>
        </ol>
        <p>Planning also helps your mind release unfinished work. In one set of studies, making a specific plan reduced the mental interference caused by uncompleted goals. You can read the <a href="https://pubmed.ncbi.nlm.nih.gov/21688924/" target="_blank" rel="noopener noreferrer">research on plan-making and unfinished goals</a> if you want to explore why this works.</p>
      </section>
      <section class="article-section is-revealed" id="make-the-first-step-almost-too-easy" data-article-section>
        <h2>2. Make the first step almost too easy</h2>
        <p>A task such as “finish the presentation” still asks your brain to solve several problems before it can begin. Which file? Which section? What does finished mean? That uncertainty creates friction.</p>
        <p>Shrink the entry point until it looks almost boring: “Open the client deck and write the three slide headings.” Once you begin, the next step is easier to see.</p>
        <p>Now give the action a time and place: “At 10:00, after this call, I will close my inbox, open the client deck, and write the three headings.” Psychologists call this an implementation intention. A large review of the evidence found that these <a href="https://www.socmot.uni-konstanz.de/publications/implementation-intentions-and-goal-achievement-meta-analysis-effects-and-processes" target="_blank" rel="noopener noreferrer">if-then plans can improve goal achievement</a>.</p>
        <p>You are not trying to feel motivated first. You are removing the decisions that normally stand between you and the start.</p>
      </section>
      <section class="article-section is-revealed" id="build-a-short-runway-for-focus" data-article-section>
        <h2>3. Build a short runway for focused work</h2>
        <p>You do not need a perfect two-hour morning routine. Start with one protected block of 25 to 45 minutes.</p>
        <p>Put the block on your calendar. Open only what the task needs. Silence the one interruption most likely to pull you away. Keep a small “not now” note nearby; when another thought appears, park it there instead of following it.</p>
        <p>If you must stop before the work is done, leave yourself a return note: “Next: compare the two price options and write the recommendation.” Research suggests that a <a href="https://pubsonline.informs.org/doi/abs/10.1287/orsc.2017.1184" target="_blank" rel="noopener noreferrer">ready-to-resume plan</a> can make it easier to switch away without carrying as much unfinished work into the next task.</p>
        <p>The point is not heroic concentration. It is making your return cheap. When the right file, page, and next action are easy to find, you spend less energy reconstructing your intention.</p>
      </section>
      <section class="article-section is-revealed" id="protect-your-plan-with-a-simple-script" data-article-section>
        <h2>4. Protect your plan by making trade-offs visible</h2>
        <p>New work will still arrive. Instead of accepting it silently and hoping the day stretches, make the trade-off visible.</p>
        <p>Try saying: “I can take this on. I am currently finishing the proposal for 3 PM. Which should come first?” Or: “I cannot finish both well today. I can send a shorter version by 4 PM or the complete version tomorrow morning. Which is more useful?”</p>
        <p>That is not being difficult. It is honest planning. When everything is called a priority, ask the person assigning the work to choose the consequence with you.</p>
        <p class="article-callout">A new yes should come with a clear decision about what moves.</p>
      </section>
      <section class="article-section is-revealed" id="when-the-problem-is-bigger-than-productivity" data-article-section>
        <h2>When the problem is bigger than productivity</h2>
        <p>Sometimes the list is not disorganised; it is simply too large. No morning routine can make one person sustainably do the work of three.</p>
        <p>If you regularly work late, cannot recover after rest, miss important tasks despite careful planning, or face more fixed commitments than available hours, treat that as a capacity problem. Bring evidence to the conversation: the work requested, the time available, the likely trade-offs, and your recommendation about what should pause.</p>
        <p>A useful sentence is: “Here is what fits this week, here is what does not, and here is the order I recommend.” Productivity should help you use your capacity well. It should not teach you to ignore your limits.</p>
      </section>
      <section class="article-section is-revealed" id="a-gentler-way-to-end-the-day" data-article-section>
        <h2>A gentler way to end the day</h2>
        <p>At the end of the day, do not judge yourself by the number of boxes you touched. Ask three questions: What moved? What did I learn? What is the next visible action for tomorrow?</p>
        <p>Then close the loop. Record the next step, save the place where the work continues, and let the rest of the list wait in a system you trust.</p>
        <p>Tomorrow may still be full. But it will not have to begin with twelve competing voices. It can begin with one clear return.</p>
        <p class="article-callout">Less reacting. Fewer open loops. One meaningful piece of progress at a time.</p>
      </section>
      <section class="article-section is-revealed" id="common-questions" data-article-section>
        <h2>Common questions when you feel overwhelmed</h2>
        <p>Where should I start when everything feels important? Start with consequences. Choose the task whose delay creates the most meaningful harm—or whose completion unlocks the most useful progress.</p>
        <p>How many priorities should I have today? Keep one main outcome and, if capacity allows, one or two smaller commitments. A list of ten priorities is still just a list.</p>
        <p>What if urgent requests keep interrupting me? Ask who is affected, what the real deadline is, and what should move if you accept the request. Genuine emergencies survive those questions; manufactured urgency usually becomes negotiable.</p>
      </section>`
  },
  "meet-luzora-return-to-what-matters": {
    title: "Meet Luzora: The tool that brings you back to what matters",
    description: "Meet Luzora, the tool that helps you return to the right place at the right time, follow through on what matters, and build consistency with The Hive.",
    image: "https://www.luzora.app/assets/images/blog/introducing-luzora/cover.webp",
    datePublished: "2026-08-24T12:00:00+01:00",
    dateModified: "2026-08-24T12:00:00+01:00"
  },
  "luzora-v1-0-6-faster-safer-smarter": {
    title: "Luzora v1.0.6 is live: Faster, safer, and smarter",
    description: "See what is new in Luzora v1.0.6, including Dynamic Context Preview, faster Home loading, task search, safe bulk deletion, stronger sync, smarter capture, and more reliable reminders.",
    image: "https://www.luzora.app/assets/brand-kit/social/open-graph/luzora-v1-0-6-product-update-og.png",
    datePublished: "2026-08-11T12:00:00+01:00",
    dateModified: "2026-08-11T12:00:00+01:00"
  },
  "luzora-v1-0-5-return-to-the-right-page": {
    title: "Luzora v1.0.5: Return to the Right Page at the Right Time",
    description: "See what is new in Luzora v1.0.5, including Smart Return, Auto Return, live countdowns, multiple reminders, improved scheduling, and more reliable browser tasks.",
    image: "https://www.luzora.app/assets/brand-kit/social/luzora-v1-0-5-product-update.png",
    datePublished: "2026-08-01T12:00:00+01:00",
    dateModified: "2026-08-01T12:00:00+01:00"
  },
  "hive-report-01-luzora-goes-public": {
    title: "The Hive Report #01: Luzora Goes Public, Gets Smarter, and Learns From You",
    description: "The first Hive Report covers Luzora's public launch, v1.0.4, Smart Return, community feedback, fixes, and the people helping shape the product.",
    image: "https://www.luzora.app/assets/brand-kit/social/hive-report-01.png?v=20260726-transparent",
    datePublished: "2026-07-26T18:00:00+01:00",
    dateModified: "2026-07-26T18:00:00+01:00"
  },
  "referral-system-is-live-invite-your-hive": {
    title: "Referral System Is Live: Invite Your Hive",
    description: "The Luzora referral system is live. Sign the Manifesto, share your unique referral link, and invite your community to join the Hive.",
    image: "https://www.luzora.app/assets/brand-kit/social/referral-system-article-preview.png",
    datePublished: "2026-07-21T09:00:00+01:00",
    dateModified: "2026-07-21T09:00:00+01:00"
  },
  "help-shape-luzora-private-testing-is-opening": {
    title: "Help shape Luzora: Private testing is opening",
    description: "We are inviting a small group of early users to test Luzora, give honest feedback, and help shape the browser extension before launch.",
    image: "https://www.luzora.app/assets/brand-kit/other%20assets/worker-bee-in-private-test.avif",
    datePublished: "2026-07-18T09:00:00+01:00",
    dateModified: "2026-07-18T09:00:00+01:00"
  }
};

const templatePath = path.join(process.cwd(), "blog-article.html");

function escapeAttribute(value) {
  return String(value).replace(/[&<>"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  })[character]);
}

function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

module.exports = function handler(request, response) {
  const rawSlug = Array.isArray(request.query.slug) ? request.query.slug[0] : request.query.slug;
  const slug = typeof rawSlug === "string" ? rawSlug : "";

  if (!Object.prototype.hasOwnProperty.call(ARTICLES, slug)) {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("X-Robots-Tag", "noindex");
    response.status(404).send("<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta name=\"robots\" content=\"noindex\"><title>Article not found | Luzora</title></head><body><main><h1>Article not found</h1><p>This Luzora Journal article does not exist.</p><p><a href=\"/blog\">Return to The Hive Journal</a></p></main></body></html>");
    return;
  }

  const article = ARTICLES[slug];
  const title = escapeAttribute(article.title);
  const description = escapeAttribute(article.description);
  const image = escapeAttribute(article.image);
  const canonical = `https://www.luzora.app/blog/${slug}`;
  const articleBody = stripHtml(article.bodyHtml);
  const articleStructuredData = serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    mainEntityOfPage: canonical,
    headline: article.title,
    description: article.description,
    image: [article.image],
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    articleSection: article.articleSection,
    keywords: article.keywords,
    articleBody: articleBody || undefined,
    wordCount: articleBody ? articleBody.split(/\s+/).length : undefined,
    author: {
      "@type": "Organization",
      name: "Luzora Team",
      url: "https://www.luzora.app/"
    },
    publisher: {
      "@id": "https://www.luzora.app/#organization"
    },
    isPartOf: {
      "@id": "https://www.luzora.app/blog#blog"
    },
    inLanguage: "en-US"
  });

  let html = fs.readFileSync(templatePath, "utf8");
  html = html
    .replace("<title>Luzora Journal Article</title>", `<title>${title} | Luzora</title>`)
    .replace('<link rel="canonical" href="https://www.luzora.app/blog" />', `<link rel="canonical" href="${canonical}" />`)
    .replace('<meta name="description" content="Read the latest Luzora article from The Hive Journal." />', `<meta name="description" content="${description}" />`)
    .replace('<meta property="og:title" content="Luzora Journal Article" />', `<meta property="og:title" content="${title}" />`)
    .replace('<meta property="og:description" content="Read the latest Luzora article from The Hive Journal." />', `<meta property="og:description" content="${description}" />`)
    .replace('<meta property="og:url" content="https://www.luzora.app/blog" />', `<meta property="og:url" content="${canonical}" />`)
    .replace('<meta property="og:image" content="https://www.luzora.app/assets/images/og-image.png" />', `<meta property="og:image" content="${image}" />`)
    .replace('<meta property="article:published_time" content="2026-07-21T09:00:00+01:00" />', `<meta property="article:published_time" content="${article.datePublished}" />`)
    .replace('<meta name="twitter:title" content="Luzora Journal Article" />', `<meta name="twitter:title" content="${title}" />`)
    .replace('<meta name="twitter:description" content="Read the latest Luzora article from The Hive Journal." />', `<meta name="twitter:description" content="${description}" />`)
    .replace('<meta name="twitter:image" content="https://www.luzora.app/assets/images/og-image.png" />', `<meta name="twitter:image" content="${image}" />`)
    .replace('<span data-article-breadcrumb>Blog title</span>', `<span data-article-breadcrumb>${title}</span>`)
    .replace('<h1 data-article-title>Welcome to Luzora Field Notes</h1>', `<h1 data-article-title>${title}</h1>`)
    .replace('<p data-article-dek>Stay up to date with the latest announcements, and news from Luzora.</p>', `<p data-article-dek>${escapeAttribute(article.dek || article.description)}</p>`)
    .replace('<span data-article-date>May 18, 2026</span>', `<span data-article-date>${escapeAttribute(article.dateLabel || "")}</span>`)
    .replace('<span data-article-read>5 min read</span>', `<span data-article-read>${escapeAttribute(article.readTime || "")}</span>`)
    .replace('<div class="article-body" data-article-body></div>', `<div class="article-body" data-article-body>${article.bodyHtml || ""}</div>`)
    .replace("<!-- ARTICLE_STRUCTURED_DATA -->", `<script type="application/ld+json">${articleStructuredData}</script>`);

  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  response.status(200).send(html);
};
