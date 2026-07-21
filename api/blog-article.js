const fs = require("fs");
const path = require("path");

const ARTICLES = {
  "referral-system-is-live-invite-your-hive": {
    title: "Referral System Is Live: Invite Your Hive",
    description: "The Luzora referral system is live. Sign the Manifesto, share your unique referral link, and invite your community to join the Hive.",
    image: "https://luzora.app/assets/brand-kit/social/referral-system-article-preview.png"
  },
  "help-shape-luzora-private-testing-is-opening": {
    title: "Help shape Luzora: Private testing is opening",
    description: "We are inviting a small group of early users to test Luzora, give honest feedback, and help shape the browser extension before launch.",
    image: "https://luzora.app/assets/brand-kit/other%20assets/worker-bee-in-private-test.avif"
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

module.exports = function handler(request, response) {
  const rawSlug = Array.isArray(request.query.slug) ? request.query.slug[0] : request.query.slug;
  const slug = ARTICLES[rawSlug] ? rawSlug : "referral-system-is-live-invite-your-hive";
  const article = ARTICLES[slug];
  const title = escapeAttribute(article.title);
  const description = escapeAttribute(article.description);
  const image = escapeAttribute(article.image);
  const canonical = `https://luzora.app/blog/${slug}`;

  let html = fs.readFileSync(templatePath, "utf8");
  html = html
    .replace("<title>Luzora Journal Article</title>", `<title>${title} | The Hive Journal</title>`)
    .replace('<link rel="canonical" href="https://luzora.app/blog" />', `<link rel="canonical" href="${canonical}" />`)
    .replace('<meta name="description" content="Read the latest Luzora article from The Hive Journal." />', `<meta name="description" content="${description}" />`)
    .replace('<meta property="og:title" content="Luzora Journal Article" />', `<meta property="og:title" content="${title}" />`)
    .replace('<meta property="og:description" content="Read the latest Luzora article from The Hive Journal." />', `<meta property="og:description" content="${description}" />`)
    .replace('<meta property="og:image" content="https://luzora.app/assets/images/og-image.png" />', `<meta property="og:image" content="${image}" />`)
    .replace('<meta name="twitter:title" content="Luzora Journal Article" />', `<meta name="twitter:title" content="${title}" />`)
    .replace('<meta name="twitter:description" content="Read the latest Luzora article from The Hive Journal." />', `<meta name="twitter:description" content="${description}" />`)
    .replace('<meta name="twitter:image" content="https://luzora.app/assets/images/og-image.png" />', `<meta name="twitter:image" content="${image}" />`);

  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  response.status(200).send(html);
};
