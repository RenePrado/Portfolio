// Reproduction harness for review findings — run against `npm run preview`.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL || 'http://localhost:4173';
const OUT = 'docs/screenshots/repro';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  colorScheme: 'dark',
  permissions: ['clipboard-read', 'clipboard-write']
});
await context.addInitScript(() => {
  try { localStorage.setItem('theme', 'dark'); } catch { /* ignore */ }
});
const page = await context.newPage();
page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE ERR:', m.text()); });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

// --- Item 5: project row column alignment ---
const cols = await page.evaluate(() => {
  const rows = [...document.querySelectorAll('.project-row')];
  const pick = (row, sel) => {
    const el = row.querySelector(sel);
    return el ? Math.round(el.getBoundingClientRect().left) : null;
  };
  return rows.map((r) => ({
    index: pick(r, '.project-row__index'),
    title: pick(r, '.project-row__title'),
    dates: pick(r, '.project-row__dates'),
    tech: pick(r, '.project-row__tech'),
    contribution: pick(r, '.project-row__contribution'),
    links: pick(r, '.project-row__links')
  }));
});
console.log('ROW COLUMNS:', JSON.stringify(cols, null, 1));

// dates wrap?
const dateWrap = await page.evaluate(() =>
  [...document.querySelectorAll('.project-row__dates')].map((d) => ({
    text: d.textContent.trim(),
    h: Math.round(d.getBoundingClientRect().height)
  }))
);
console.log('DATE HEIGHTS:', JSON.stringify(dateWrap));

// --- Item 6: preview plate state on hover ---
const row1 = page.locator('.project-row').first();
await row1.hover();
await page.waitForTimeout(700);
const plate = await page.evaluate(() => {
  const p = document.querySelector('.preview-plate');
  const r = p.getBoundingClientRect();
  const row = document.querySelector('.project-row').getBoundingClientRect();
  return {
    on: p.classList.contains('is-on'),
    plateRect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
    rowRect: { x: Math.round(row.x), y: Math.round(row.y), w: Math.round(row.width), h: Math.round(row.height) },
    overlapsRow: !(r.right < row.x || r.left > row.right || r.bottom < row.y || r.top > row.bottom),
    caption: p.querySelector('.fig-frame__caption')?.textContent,
    pendingText: p.querySelector('.fig-frame__pending')?.innerText,
    cropPos: [...p.querySelectorAll('.crop')].map((c) => {
      const cr = c.getBoundingClientRect(); const fr = p.querySelector('.fig-frame__media').getBoundingClientRect();
      return { dx: Math.round(cr.x - fr.x), dy: Math.round(cr.y - fr.y) };
    })
  };
});
console.log('PLATE:', JSON.stringify(plate, null, 1));
await page.screenshot({ path: `${OUT}/plate-hover.png` });
await page.mouse.move(10, 10);
await page.waitForTimeout(400);

// --- Item 7: contact icon wrap + phone + email numerals ---
const contact = await page.evaluate(() => {
  const email = document.querySelector('.contact__email');
  const cs = getComputedStyle(email);
  const rows = [...document.querySelectorAll('.contact__rows li')].map((li) => ({
    text: li.innerText.replace(/\n/g, ' | '),
    h: Math.round(li.getBoundingClientRect().height)
  }));
  const iconWrap = [...document.querySelectorAll('.contact__rows a')].map((a) => {
    const r = a.getBoundingClientRect();
    const svg = a.querySelector('svg')?.getBoundingClientRect();
    return svg ? { linkH: Math.round(r.height), svgTop: Math.round(svg.top - r.top), sameLine: svg.top >= r.top && svg.top < r.top + r.height } : null;
  });
  return {
    emailFontVariant: cs.fontVariantNumeric,
    emailFontFamily: cs.fontFamily.slice(0, 60),
    rows, iconWrap
  };
});
console.log('CONTACT:', JSON.stringify(contact, null, 1));

// --- Item 8: portrait blend ---
const portrait = await page.evaluate(() => {
  const img = document.querySelector('.hero__frame img');
  const media = document.querySelector('.hero__frame__media, .fig-frame__media');
  const fig = document.querySelector('.hero__frame');
  return {
    imgBlend: getComputedStyle(img).mixBlendMode,
    mediaBg: getComputedStyle(media).backgroundColor,
    figBg: getComputedStyle(fig).backgroundColor,
    bodyBg: getComputedStyle(document.body).backgroundColor
  };
});
console.log('PORTRAIT:', JSON.stringify(portrait));
await page.locator('.hero__figure').screenshot({ path: `${OUT}/portrait.png` });

// --- Item 9: section heads ---
const heads = await page.evaluate(() =>
  [...document.querySelectorAll('.section-head')].map((h) => ({
    html: h.innerHTML.slice(0, 200)
  }))
);
console.log('SECTION HEADS count:', heads.length);

// --- Item 11: left edges ---
const edges = await page.evaluate(() => {
  const sels = ['.section-head', '.about__col', '.project-row__main', '.journey__list', '.stack', '.contact'];
  return sels.map((s) => {
    const el = document.querySelector(s);
    return el ? { sel: s, left: Math.round(el.getBoundingClientRect().left) } : { sel: s, left: null };
  });
});
console.log('LEFT EDGES:', JSON.stringify(edges));

// --- Item 12/13: type + punctuation audit ---
const audit = await page.evaluate(() => {
  const out = { uppercase: [], smallText: [] };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const t = n.textContent;
    if (/—|·/.test(t)) out.uppercase.push(t.trim().slice(0, 60));
  }
  return out;
});
console.log('PUNCT NODES:', JSON.stringify(audit.uppercase.slice(0, 40), null, 1));

await page.screenshot({ path: `${OUT}/full-1440-dark.png`, fullPage: true });
await browser.close();
console.log('DONE');
