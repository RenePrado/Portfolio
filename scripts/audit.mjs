// DOM audit — numeric checks that substitute for visual review where the
// environment can't render images: font loading, grid alignment between the
// Inspect overlay and real layout, image loading, heading order.
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:4173';
const browser = await chromium.launch();
const out = [];
const ok = (name, pass, detail = '') =>
  out.push(`${pass ? 'PASS' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`);

for (const w of [1024, 1440, 1920]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.keyboard.press('g');
  await page.waitForTimeout(200);

  // Inspect overlay columns vs hero grid columns
  const align = await page.evaluate(() => {
    const overlay = [...document.querySelectorAll('.inspect-overlay .col')];
    const grid = document.querySelector('.hero__grid');
    const gr = grid.getBoundingClientRect();
    const cs = getComputedStyle(grid);
    const cols = cs.gridTemplateColumns.split(' ').map(parseFloat);
    const gap = parseFloat(cs.columnGap);
    // compute expected column lefts
    const expected = [];
    let x = gr.left;
    for (let i = 0; i < 12; i++) {
      expected.push(x);
      x += cols[i] + gap;
    }
    const actual = overlay.map((c) => c.getBoundingClientRect().left);
    const maxDiff = Math.max(...expected.map((e, i) => Math.abs(e - actual[i])));
    return { maxDiff, gridWidth: gr.width };
  });
  ok(`inspect grid aligns @${w}`, align.maxDiff < 1.5, `maxDiff=${align.maxDiff.toFixed(2)}px`);

  // fonts actually loaded
  const fonts = await page.evaluate(() => ({
    display: getComputedStyle(document.querySelector('.hero__name')).fontFamily.slice(0, 30),
    body: getComputedStyle(document.body).fontFamily.slice(0, 30),
    mono: getComputedStyle(document.querySelector('.section-index, .hero__role')).fontFamily.slice(0, 30),
    nameSize: getComputedStyle(document.querySelector('.hero__name')).fontSize
  }));
  ok(`Fraunces loaded @${w}`, /Fraunces/.test(fonts.display), fonts.display);
  ok(`Inter loaded @${w}`, /Inter/.test(fonts.body), fonts.body);
  ok(`JetBrains Mono loaded @${w}`, /JetBrains/.test(fonts.mono), fonts.mono);

  // portrait image actually decoded
  const img = await page.evaluate(() => {
    const im = document.querySelector('.hero__frame img');
    return im ? { w: im.naturalWidth, complete: im.complete } : null;
  });
  ok(`portrait decoded @${w}`, !!img && img.complete && img.w > 0, JSON.stringify(img));

  // heading order
  const heads = await page.evaluate(() =>
    [...document.querySelectorAll('h1,h2,h3')].map((h) => h.tagName).join(',')
  );
  ok(`one h1 @${w}`, (heads.match(/H1/g) || []).length === 1, heads.slice(0, 60));

  await page.context().close();
}

// focus visibility: tab to first link, check outline
{
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    const cs = getComputedStyle(el);
    return { tag: el.tagName, cls: el.className.slice(0, 40), outline: cs.outlineStyle, w: cs.outlineWidth };
  });
  ok('focus-visible ring on skip link', focused.outline !== 'none' && focused.w !== '0px', JSON.stringify(focused));
  await page.context().close();
}

await browser.close();
console.log(out.join('\n'));
