const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const sharp = require('sharp');
const { chromium } = require('playwright');
const handler = require('../api/blog-article');

const root = path.resolve(__dirname, '..');
const slug = 'finish-online-course-on-time';
const title = 'Found a New Course? 5 Ways to Stay on Track and Finish It on Time';
const mime = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.webp':'image/webp', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2' };

const server = http.createServer((req, res) => {
  const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (name.startsWith('/blog/')) {
    res.status = code => { res.statusCode = code; return res; };
    res.send = body => res.end(body);
    handler({ query: { slug: name.slice(6) } }, res);
    return;
  }
  if (name.startsWith('/api/')) { res.setHeader('Content-Type', 'application/json'); res.end('{}'); return; }
  let file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
  if (!path.extname(file)) file += '.html';
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.statusCode = 404; res.end(); return; }
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});

(async () => {
  const card = path.join(root, 'assets/images/blog/course-completion/card.webp');
  const og = path.join(root, 'assets/images/blog/course-completion/og.webp');
  const cover = path.join(root, 'assets/images/blog/course-completion/cover.webp');
  const cardMetadata = await sharp(card).metadata();
  const cardStats = await sharp(card).stats();
  assert.deepEqual([cardMetadata.width, cardMetadata.height, cardMetadata.hasAlpha], [1536, 768, true]);
  assert.equal(cardStats.channels[3].min, 0);
  assert.equal(cardStats.channels[3].max, 255);
  const ogMetadata = await sharp(og).metadata();
  assert.deepEqual([ogMetadata.width, ogMetadata.height, ogMetadata.hasAlpha], [1200, 630, false]);
  const coverMetadata = await sharp(cover).metadata();
  assert.deepEqual([coverMetadata.width, coverMetadata.height, coverMetadata.hasAlpha], [1536, 1024, false]);
  assert(fs.statSync(card).size < 160000);
  assert(fs.statSync(og).size < 100000);
  assert(fs.statSync(cover).size < 120000);

  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  const errors = [];
  try {
    for (const javaScriptEnabled of [false, true]) {
      const context = await browser.newContext({ javaScriptEnabled });
      await context.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      for (const width of [1440, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.equal((await page.goto(`${origin}/blog/${slug}`)).status(), 200);
        assert.equal(await page.locator('h1').innerText(), title);
        assert.equal(await page.locator('[data-article-body] h2').count(), 7);
        assert.equal(await page.locator('[data-article-body] a').count(), 4);
        const body = await page.locator('[data-article-body]').innerText();
        assert.match(body, /Buying a course can feel suspiciously similar to making progress/);
        assert.match(body, /Luzora is being built for that gap between deciding and doing/);
        assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://www.luzora.app/blog/${slug}`);
        assert.match(await page.locator('meta[property="og:image"]').getAttribute('content'), /course-completion\/og.webp$/);
        const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').last().textContent());
        assert(graph['@graph'].some(item => item['@type'] === 'BlogPosting' && item.headline === title));
        assert(graph['@graph'].some(item => item['@type'] === 'FAQPage' && item.mainEntity.length === 3));
        assert(await page.locator('.article-cover-image img').evaluate(image => image.complete && image.naturalWidth === 1536));
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      }
      await page.goto(`${origin}/blog`);
      if (javaScriptEnabled) {
        assert(await page.locator(`a[href="/blog/${slug}"]`).count() > 0);
        await page.locator('[data-blog-filter="Guides"]').click();
        assert(await page.locator(`a[href="/blog/${slug}"]`).count() > 0);
      }
      await context.close();
    }
    assert.deepEqual(errors, []);
    console.log('PASS: course article, three WebP variants, SSR/client rendering, metadata, FAQ schema, listing, filters and responsive widths.');
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
