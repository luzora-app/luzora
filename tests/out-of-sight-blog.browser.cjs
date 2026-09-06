const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const sharp = require('sharp');
const { chromium } = require('playwright');
const handler = require('../api/blog-article');

const root = path.resolve(__dirname, '..');
const slug = 'out-of-sight-out-of-mind';
const title = 'Out of Sight, Out of Mind: Your Productivity Tool Should Bring the Task Back to You';
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  if (pathname.startsWith('/blog/')) {
    response.status = (code) => { response.statusCode = code; return response; };
    response.send = (body) => response.end(body);
    handler({ query: { slug: pathname.slice(6) } }, response);
    return;
  }
  if (pathname.startsWith('/api/')) {
    response.setHeader('Content-Type', 'application/json');
    response.end('{}');
    return;
  }
  let file = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
  if (!path.extname(file)) file += '.html';
  if (!file.startsWith(`${root}${path.sep}`) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.statusCode = 404;
    response.end();
    return;
  }
  response.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  response.end(fs.readFileSync(file));
});

(async () => {
  const cover = path.join(root, 'assets/images/blog/out-of-sight/cover.webp');
  const og = path.join(root, 'assets/images/blog/out-of-sight/og.webp');
  const coverMetadata = await sharp(cover).metadata();
  const ogMetadata = await sharp(og).metadata();
  assert.equal(coverMetadata.hasAlpha, true);
  assert.equal(ogMetadata.hasAlpha, false);
  assert.deepEqual([ogMetadata.width, ogMetadata.height], [1200, 630]);

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  const errors = [];
  try {
    for (const width of [1440, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 } });
      page.on('pageerror', (error) => errors.push(error.message));
      await page.route('**/*', (route) => route.request().url().startsWith(origin) ? route.continue() : route.abort());
      assert.equal((await page.goto(`${origin}/blog/${slug}`)).status(), 200);
      assert.equal(await page.locator('h1').innerText(), title);
      assert.equal(await page.locator('[data-article-body] h2').count(), 8);
      assert.equal(await page.locator('[data-article-body] a').count(), 2);
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://www.luzora.app/blog/${slug}`);
      assert.match(await page.locator('meta[property="og:image"]').getAttribute('content'), /out-of-sight\/og\.webp$/);
      assert.doesNotMatch(await page.locator('[data-article-body]').innerText(), /—/);
      assert(await page.locator('.article-cover-image img').evaluate((image) => image.complete && image.naturalWidth === 1536));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await page.close();
    }

    const listing = await browser.newPage();
    await listing.route('**/*', (route) => route.request().url().startsWith(origin) ? route.continue() : route.abort());
    await listing.goto(`${origin}/blog`);
    assert(await listing.locator(`a[href="/blog/${slug}"]`).count() > 0);
    await listing.locator('[data-blog-filter="Productivity"]').click();
    assert(await listing.locator(`a[href="/blog/${slug}"]`).count() > 0);
    await listing.close();

    assert.deepEqual(errors, []);
    console.log('PASS: out-of-sight article, responsive layouts, sources, images, metadata, listing and copy.');
  } finally {
    await browser.close();
    server.close();
  }
})().catch((error) => {
  console.error(error);
  server.close();
  process.exitCode = 1;
});
