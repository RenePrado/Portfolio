// Reproduction/verification harness — run against `npm run preview`.
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
    detail: pick(r, '.project-row__detail'),
    objective: pick(r, '.project-row__objective'),
    tech: pick(r, '.project-row__tech'),
    links: pick(r, '.project-row__links')
  }));
});
console.log('ROW COLUMNS:', JSON.stringify(cols));

const dateWrap = await page.evaluate(() =>
  [...document.querySelectorAll('.project-row__dates')].map((d) => ({
    text: d.textContent.trim(),
    h: Math.round(d.getBoundingClientRect().height)
  }))
);
console.log('DATE HEIGHTS:', JSON.stringify(dateWrap));

// --- Item 6: preview plate (only exists when project has image or DEV) ---
const plateCount = await page.locator('.preview-plate').count();
console.log('PLATES IN PROD BUILD:', plateCount);
const pendingText = await page.locator('.fig-frame__pending').count();
console.log('PENDING PLACEHOLDERS IN PROD:', pendingText);

// --- Item 7: contact ---
const contact = await page.evaluate(() => {
  const email = document.querySelector('.contact__email');
  const cs = getComputedStyle(email);
  const rows = [...document.querySelectorAll('.contact__rows li')].map((li) => ({
    text: li.innerText.replace(/\n/g, ' | '),
    h: Math.round(li.getBoundingClientRect().height)
  }));
  const iconWrap = [...document.querySelectorAll('.contact__ext')].map((a) => {
    const r = a.getBoundingClientRect();
    const svg = a.querySelector('svg')?.getBoundingClientRect();
    const span = a.querySelector('.contact__ext-text')?.getBoundingClientRect();
    return svg && span ? {
      sameLine: Math.abs(svg.top - span.top) < span.height,
      iconRightOfText: svg.left >= span.right - 2
    } : null;
  });
  return { emailFontVariant: cs.fontVariantNumeric, rows, iconWrap };
});
console.log('CONTACT:', JSON.stringify(contact, null, 1));

// phone reveal interaction
await page.getByRole('button', { name: /show phone number/i }).click();
await page.waitForTimeout(200);
const phoneLink = await page.evaluate(() => {
  const a = document.querySelector('.contact__rows a[href^="tel:"]');
  return a ? { text: a.textContent.trim(), focused: document.activeElement === a } : null;
});
console.log('PHONE REVEAL:', JSON.stringify(phoneLink));

// --- Item 8: portrait mat ---
const portrait = await page.evaluate(() => {
  const media = document.querySelector('.hero__frame .fig-frame__media');
  const img = document.querySelector('.hero__frame img');
  const cs = getComputedStyle(media);
  return {
    mediaBg: cs.backgroundColor,
    mediaPadding: cs.padding,
    imgBorder: getComputedStyle(img).border,
    imgBlend: getComputedStyle(img).mixBlendMode
  };
});
console.log('PORTRAIT:', JSON.stringify(portrait));
await page.locator('.hero__figure').screenshot({ path: `${OUT}/portrait-after.png` });

// --- Item 11: left edges ---
const edges = await page.evaluate(() => {
  const sels = ['.section-head', '.about__col', '.project-row__detail', '.journey__list', '.stack', '.contact'];
  return sels.map((s) => {
    const el = document.querySelector(s);
    return el ? { sel: s, left: Math.round(el.getBoundingClientRect().left) } : { sel: s, left: null };
  });
});
console.log('LEFT EDGES:', JSON.stringify(edges));

await page.screenshot({ path: `${OUT}/full-1440-dark.png`, fullPage: true });
await browser.close();
console.log('DONE');
