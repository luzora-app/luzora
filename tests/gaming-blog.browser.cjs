const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const sharp = require('sharp');
const { chromium } = require('playwright');
const handler = require('../api/blog-article');
const root = path.resolve(__dirname, '..');
const slug = 'stop-gaming-from-taking-over-your-life';
const title = '4 Practical Ways to Stop Gaming From Taking Over Your Life';
const expected = fs.readFileSync(path.join(root, 'content/gaming-guide.md'), 'utf8')
  .replace(/^# .*\r?\n/, '').replace(/^\d\. /gm, '').replace(/^## /gm, '').replace(/^> /gm, '')
  .replace(/^- /gm, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  .replace(/\s+/g, ' ').trim();
const mime = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.webp':'image/webp', '.png':'image/png', '.svg':'image/svg+xml', '.woff2':'font/woff2' };
const server = http.createServer((req,res) => {
  const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if(name.startsWith('/blog/')) {
    res.status = n => {res.statusCode=n;return res;};res.send = body => res.end(body);
    handler({query:{slug:name.slice(6)}},res);return;
  }
  if(name.startsWith('/api/')){res.setHeader('Content-Type','application/json');res.end('{}');return;}
  let file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
  if(!path.extname(file))file+='.html';
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.statusCode=404;res.end();return;}
  res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));
});
(async()=>{
  const cover=path.join(root,'assets/images/blog/gaming/cover.webp');
  assert.equal((await sharp(cover).metadata()).hasAlpha,true);
  const stats=await sharp(cover).stats();
  assert.equal(stats.channels[3].min,0);assert.equal(stats.channels[3].max,255);
  assert(fs.statSync(cover).size<150000);
  assert(fs.statSync(path.join(root,'assets/images/blog/doomscrolling/cover.webp')).size<100000);
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const origin=`http://127.0.0.1:${server.address().port}`;
  const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
  const errors=[];
  try{
    for(const javaScriptEnabled of [false,true]){
      const context=await browser.newContext({javaScriptEnabled});
      await context.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());
      const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
      for(const width of [1440,390,320]){
        await page.setViewportSize({width,height:1000});
        assert.equal((await page.goto(origin+'/blog/'+slug)).status(),200);
        assert.equal(await page.locator('h1').innerText(),title);
        const body=await page.locator('[data-article-body]').evaluate(el=>[...el.querySelectorAll('p,h2,li')].map(x=>x.textContent).join(' '));
        assert.equal(body.replace(/\s+/g,' ').trim(),expected,'Article wording must exactly match the recovered draft');
        assert.equal(await page.locator('[data-article-body] h2').count(),6);
        assert.equal(await page.locator('[data-article-body] a').count(),4);
        assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://www.luzora.app/blog/'+slug);
        assert.match(await page.locator('meta[property="og:image"]').getAttribute('content'),/gaming\/cover.webp$/);
        const graph=JSON.parse(await page.locator('script[type="application/ld+json"]').last().textContent());
        assert(graph['@graph'].some(x=>x['@type']==='BlogPosting'&&x.headline===title&&x.articleBody.includes('Set a final-match time.')));
        assert(await page.locator('.article-cover-image img').evaluate(img=>img.complete&&img.naturalWidth===1731));
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
        if(javaScriptEnabled&&width!==320){await page.locator('.article-cover-image').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,`outputs/gaming-${width}.png`)});}
      }
      await page.goto(origin+'/blog');
      assert(await page.locator(`a[href="/blog/${slug}"]`).count()>0);
      if(javaScriptEnabled){await page.locator('[data-blog-filter="Guides"]').click();assert(await page.locator(`a[href="/blog/${slug}"]`).count()>0);}
      await page.goto(origin+'/blog/stop-doomscrolling-when-you-have-real-work-to-do');
      assert.match(await page.locator('.article-cover-image img').getAttribute('src'),/doomscrolling\/cover.webp/);
      assert(await page.locator('.article-cover-image img').evaluate(i=>i.complete&&i.naturalWidth>0));
      assert.equal((await page.goto(origin+'/blog/nonexistent-gaming-test')).status(),404);
      await context.close();
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: unchanged draft, SSR/client, 3 widths, metadata, research links, listing, previous article, real WebP alpha and missing-route 404.');
  }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
