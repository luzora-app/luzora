const fs = require("fs");
const path = require("path");

const ARTICLES = {
  "hive-report-01-luzora-goes-public": {
    title: "The Hive Report #01: Luzora Goes Public, Gets Smarter, and Learns From You",
    description: "The first Hive Report covers Luzora's public launch, v1.0.4, Smart Return, community feedback, fixes, and the people helping shape the product.",
    image: "https://www.luzora.app/assets/brand-kit/social/hive-report-01.png",
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
    .replace("<!-- ARTICLE_STRUCTURED_DATA -->", `<script type="application/ld+json">${articleStructuredData}</script>`);

  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  response.status(200).send(html);
};
