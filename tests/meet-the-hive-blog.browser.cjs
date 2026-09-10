const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const sharp = require('sharp');
const { chromium } = require('playwright');
const handler = require('../api/blog-article');

const root = path.resolve(__dirname, '..');
const slug = 'meet-the-hive-how-participation-and-value-work';
const title = 'Meet the Hive: How Participation and Value Work';
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
  const preview = path.join(root, 'assets/images/blog/meet-the-hive/preview.webp');
  const cover = path.join(root, 'assets/images/blog/meet-the-hive/cover.webp');
  const previewMetadata = await sharp(preview).metadata();
  const previewStats = await sharp(preview).stats();
  const coverMetadata = await sharp(cover).metadata();

  assert.deepEqual([previewMetadata.width, previewMetadata.height, previewMetadata.hasAlpha], [1536, 768, true]);
  assert.equal(previewStats.channels[3].min, 0);
  assert.equal(previewStats.channels[3].max, 255);
  assert.deepEqual([coverMetadata.width, coverMetadata.height, coverMetadata.hasAlpha], [1536, 1024, false]);
  assert(fs.statSync(preview).size < 160000);
  assert(fs.statSync(cover).size < 250000);

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

      for (const width of [1440, 768, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.equal((await page.goto(`${origin}/blog/${slug}`)).status(), 200);
        assert.equal(await page.locator('h1').innerText(), title);
        assert.equal(await page.locator('[data-article-body] h2').count(), 8);
        const body = await page.locator('[data-article-body]').innerText();
        assert.match(body, /Hive Points, or HP, are Luzora’s measure of participation and contribution/);
        assert.match(body, /Create value for yourself\. Create value for another person/);
        assert.doesNotMatch(body, /Daily XP/i);
        assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://www.luzora.app/blog/${slug}`);
        assert.match(await page.locator('meta[property="og:image"]').getAttribute('content'), /meet-the-hive\/cover.webp$/);
        const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').last().textContent());
        assert(graph['@graph'].some(item => item['@type'] === 'BlogPosting' && item.headline === title));
        assert(await page.locator('.article-cover-image img').evaluate(image => image.complete && image.naturalWidth === 1536));
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
        if (javaScriptEnabled && (width === 1440 || width === 390)) {
          const sections = page.locator('[data-article-section]');
          for (let index = 0; index < await sections.count(); index += 1) {
            await sections.nth(index).scrollIntoViewIfNeeded();
            await page.waitForTimeout(80);
          }
          assert(await sections.evaluateAll(nodes => nodes.every(node => node.classList.contains('is-revealed'))));
          await page.evaluate(() => scrollTo(0, 0));
          await page.screenshot({ path: path.join(root, `outputs/meet-the-hive-${width}.png`), fullPage: true });
        }
      }

      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${origin}/blog`);
      assert(await page.locator(`a[href="/blog/${slug}"]`).count() > 0);
      if (javaScriptEnabled) {
        await page.screenshot({ path: path.join(root, 'outputs/meet-the-hive-blog-index.png'), fullPage: true });
        await page.locator('[data-blog-filter="Announcements"]').click();
        assert(await page.locator(`a[href="/blog/${slug}"]`).count() > 0);
      }
      await context.close();
    }
    assert.deepEqual(errors, []);
    console.log('PASS: Hive article assets, SSR/client rendering, metadata, fallback listing, filters and responsive widths.');
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
