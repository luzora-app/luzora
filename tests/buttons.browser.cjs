/* Run with NODE_PATH pointing at a Playwright installation: node tests/buttons.browser.cjs */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const pages = fs.readdirSync(root).filter(name => name.endsWith('.html'));
// These are interactive swatch/option/accordion widgets, not action buttons.
const widgets = '.faq-item__head, .color-card, .scale-card, .del-select__trigger, .del-select__option, .m-step-pill';
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (name.startsWith('/api/')) { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end('{}'); return; }
  if (name === '/') name = '/index.html';
  let file = path.resolve(root, '.' + name);
  if (!path.extname(file)) file += '.html';
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    await page.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
    const problems = [];
    const unmappedLinks = new Set();
    let checked = 0;
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const name of pages) {
        await page.goto(`${origin}/${name}`, { waitUntil: 'load' });
        const result = await page.evaluate(widgets => {
          const buttons = [...document.querySelectorAll('.lz-btn')];
          return {
            sheets: [...document.styleSheets].some(s => s.href?.includes('/css/buttons.css')),
            missing: [...document.querySelectorAll('button')].filter(b => !b.matches('.lz-btn') && !b.matches(widgets)).map(b => b.className),
            invalid: buttons.filter(b => !/lz-btn--(sm|md|lg)\b/.test(b.className) || !/lz-btn--mode-/.test(b.className)).map(b => b.className),
            overflow: buttons.filter(b => { const r = b.getBoundingClientRect(); return r.width && r.height && getComputedStyle(b).visibility !== 'hidden' && (r.left < -1 || r.right > innerWidth + 1); }).map(b => b.className),
            count: buttons.length,
            links: [...document.querySelectorAll('a:not(.lz-btn)')].filter(a => { const s = getComputedStyle(a); return parseFloat(s.borderRadius) > 0 && s.backgroundColor !== 'rgba(0, 0, 0, 0)' && !a.closest('.nav__menu, .download-menu') && !a.matches('.blog-card__image, .brand-toc__link'); }).map(a => a.className)
          };
        }, widgets);
        checked += result.count;
        result.links.forEach(c => unmappedLinks.add(`${name}: ${c}`));
        if (!result.sheets || result.missing.length || result.invalid.length || result.overflow.length) problems.push({ width, name, ...result });
      }
    }
    console.log(JSON.stringify({ pages: pages.length, viewports: 4, buttonInstances: checked, problems }, null, 2));
    assert.deepEqual([...unmappedLinks], [], 'Button-shaped links must use the shared model too');
    assert.deepEqual(problems, [], 'Every page action must use the model without viewport overflow');
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(origin);
    const hero = page.locator('.hero__cta').first();
    const styles = () => hero.evaluate(b => { const s = getComputedStyle(b); return { bg: s.backgroundColor, height: s.height, shadow: s.boxShadow }; });
    assert.equal((await styles()).bg, 'rgb(255, 213, 43)');
    assert.equal((await styles()).height, '56px');
    assert.match((await styles()).shadow, /inset/);
    await hero.hover(); await page.waitForTimeout(160);
    assert.equal((await styles()).bg, 'rgb(255, 221, 85)');
    await hero.hover(); await page.mouse.down(); await page.waitForTimeout(200);
    assert.equal(await hero.evaluate(b => b.matches(':active')), true);
    assert.equal((await styles()).shadow, 'none');
    await page.mouse.move(0, 0); await page.mouse.up();
    await hero.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
    assert.equal(await hero.evaluate(b => getComputedStyle(b).outlineStyle), 'solid');
    await hero.evaluate(b => b.setAttribute('aria-disabled', 'true'));
    await page.waitForTimeout(160);
    assert.equal((await styles()).shadow, 'none');
    await hero.evaluate(b => b.removeAttribute('aria-disabled'));
    let release;
    await page.route('**/api/newsletter', async route => { await new Promise(resolve => { release = resolve; }); await route.fulfill({ json: { ok: true } }); });
    await page.locator('.newsletter__input').fill('button-test@example.com');
    await page.locator('.newsletter__btn').click();
    await page.waitForFunction(() => document.querySelector('.newsletter__btn').getAttribute('aria-busy') === 'true');
    assert.equal(await page.locator('.newsletter__btn').isDisabled(), true);
    assert.equal(await page.locator('.newsletter__btn').evaluate(b => getComputedStyle(b, '::before').animationName), 'lz-button-spin');
    assert.equal(await page.locator('.nav__toggle').isDisabled(), false);
    while (!release) await page.waitForTimeout(10);
    release();
    await page.waitForFunction(() => document.querySelector('.newsletter__btn').getAttribute('aria-busy') === 'false');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(origin);
    await page.locator('.nav__toggle').click();
    assert.equal(await page.locator('.nav__toggle').getAttribute('aria-expanded'), 'true');
    await page.locator('.nav__toggle').click();
    fs.mkdirSync(path.join(root, 'outputs/button-qa'), { recursive: true });
    await page.waitForTimeout(1600);
    await page.screenshot({ path: path.join(root, 'outputs/button-qa/home-mobile.png'), animations: 'disabled' });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(origin);
    await page.waitForTimeout(1600);
    await page.screenshot({ path: path.join(root, 'outputs/button-qa/home-desktop.png'), animations: 'disabled' });
    await page.goto(`${origin}/download.html`);
    await page.locator('[data-install-coming-soon]').first().click();
    assert.equal(await page.locator('.install-modal').getAttribute('aria-hidden'), 'false');
    await page.screenshot({ path: path.join(root, 'outputs/button-qa/install-modal.png'), animations: 'disabled' });
    await page.locator('.install-modal__secondary').click();
    assert.equal(await page.locator('.install-modal').getAttribute('aria-hidden'), 'true');
    await page.goto(`${origin}/blog.html`);
    await page.locator('.blog-category').nth(1).click();
    assert.equal(await page.locator('.blog-category').nth(1).evaluate(b => b.classList.contains('is-active')), true);
    await page.locator('.blog-category').first().click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(root, 'outputs/button-qa/blog-desktop.png'), animations: 'disabled' });
    await page.goto(`${origin}/brand.html`);
    await page.locator('.asset-download').first().click();
    assert.equal(await page.locator('[data-download-menu]').first().isVisible(), true);
    console.log('PASS: appearance, hover, pressed, disabled, keyboard focus, loading isolation, navigation and modal actions');
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
