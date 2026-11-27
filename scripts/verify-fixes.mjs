// Post-fix verification — run against `npm run preview` (default :4173).
// Screenshots → docs/screenshots/review/ ; prints measured evidence.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'docs/screenshots/review');
const BASE = process.env.BASE_URL || 'http://localhost:4173';
mkdirSync(OUT, { recursive: true });

const widths = [375, 430, 768, 1024, 1280, 1440, 1920];
const browser = await chromium.launch();
const consoleErrors = [];

async function newPage({ width = 1440, height = 900, theme, reducedMotion, js = true } = {}) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: reducedMotion ? 'reduce' : 'no-preference',
    javaScriptEnabled: js,
    permissions: ['clipboard-read', 'clipboard-write']
  });
  if (theme) {
    await context.addInitScript((t) => {
      try { localStorage.setItem('theme', t); } catch { /* ignore */ }
    }, theme);
  }
  const page = await context.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(`${width}px ${theme}: ${m.text()}`);
  });
  page.on('pageerror', (e) => consoleErrors.push(`${width}px ${theme} pageerror: ${e.message}`));
  return { context, page };
}

// ---- 1. Screenshots + overflow, both themes, all widths ----
console.log('== OVERFLOW / SCREENSHOTS ==');
for (const theme of ['light', 'dark']) {
  for (const w of widths) {
    const { context, page } = await newPage({ width: w, theme });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const res = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth
    }));
    console.log(`${theme}@${w}: scrollWidth=${res.scrollW} innerWidth=${res.innerW} ${res.scrollW <= res.innerW + 1 ? 'OK' : 'OVERFLOW!'}`);
    await page.screenshot({ path: join(OUT, `${theme}-${w}.png`), fullPage: true });
    await context.close();
  }
}

// ---- 2. Column alignment at desktop widths ----
console.log('\n== PROJECT COLUMN LEFT EDGES ==');
for (const w of [1024, 1280, 1440, 1920]) {
  const { context, page } = await newPage({ width: w, theme: 'dark' });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const cols = await page.evaluate(() => {
    const pick = (row, sel) => {
      const el = row.querySelector(sel);
      return el ? Math.round(el.getBoundingClientRect().left) : null;
    };
    return [...document.querySelectorAll('.project-row')].map((r) => ({
      i: pick(r, '.project-row__index'),
      t: pick(r, '.project-row__title'),
      d: pick(r, '.project-row__detail'),
      o: pick(r, '.project-row__objective'),
      l: pick(r, '.project-row__links')
    }));
  });
  console.log(`@${w}:`, JSON.stringify(cols));
  await context.close();
}

// ---- 3. Keyboard walkthrough (1440) ----
console.log('\n== KEYBOARD WALKTHROUGH ==');
{
  const { context, page } = await newPage({ width: 1440, theme: 'light' });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const focusVisible = await page.evaluate(() => {
    const el = document.querySelector('.site-nav__link, .index-rail__link, a.btn');
    el?.focus();
    const cs = getComputedStyle(el);
    return { outline: cs.outlineStyle, width: cs.outlineWidth };
  });
  console.log('focus ring on nav:', JSON.stringify(focusVisible));

  // skip link
  await page.keyboard.press('Tab');
  const skip = await page.evaluate(() => ({
    text: document.activeElement.textContent.trim(),
    cls: document.activeElement.className
  }));
  console.log('first Tab →', JSON.stringify(skip));

  // G shortcut toggles inspect
  await page.keyboard.press('g');
  const insp = await page.evaluate(() => document.documentElement.dataset.inspect === 'on');
  await page.keyboard.press('g');
  console.log('G shortcut inspect on/off:', insp, !insp);

  // theme toggle via keyboard
  const themeBtn = page.getByRole('button', { name: /switch to dark theme/i });
  await themeBtn.focus();
  await page.keyboard.press('Enter');
  const t = await page.evaluate(() => document.documentElement.dataset.theme);
  console.log('theme toggle →', t);

  // copy email
  await page.getByRole('button', { name: /copy email/i }).click();
  await page.waitForTimeout(150);
  const live = await page.locator('[aria-live="polite"]').textContent();
  console.log('copy email live region:', JSON.stringify(live));

  // phone reveal
  await page.getByRole('button', { name: /show phone number/i }).click();
  await page.waitForTimeout(150);
  const phone = await page.evaluate(() => {
    const a = document.querySelector('a[href^="tel:"]');
    return { text: a?.textContent.trim(), focused: document.activeElement === a };
  });
  console.log('phone reveal:', JSON.stringify(phone));

  // project link focus
  const liveLink = page.locator('.project-row__link').first();
  if (await liveLink.count()) {
    await liveLink.focus();
    const fl = await page.evaluate(() => document.activeElement.className);
    console.log('project link focused:', fl);
  }
  await context.close();
}

// mobile menu Esc
{
  const { context, page } = await newPage({ width: 390, theme: 'light' });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /open menu/i }).click();
  const open = await page.locator('#mobile-menu.is-open').count();
  await page.keyboard.press('Escape');
  const closed = !(await page.locator('#mobile-menu.is-open').count());
  console.log('mobile menu open/Esc:', open === 1 && closed);
  await context.close();
}

// ---- 4. Reduced motion ----
{
  const { context, page } = await newPage({ width: 1440, theme: 'dark', reducedMotion: true });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const hidden = await page.evaluate(() => {
    const els = document.querySelectorAll('[data-reveal], .reveal');
    return [...els].filter((el) => getComputedStyle(el).opacity === '0').length;
  });
  const transitions = await page.evaluate(() => {
    const el = document.querySelector('.btn, .project-row, .u-draw');
    return el ? getComputedStyle(el).transitionDuration : 'n/a';
  });
  console.log('reduced-motion hidden elements:', hidden, '| sample transitionDuration:', transitions);
  await context.close();
}

// ---- 5. JS disabled ----
{
  const { context, page } = await newPage({ width: 1440, theme: 'light', js: false });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const text = await page.evaluate(() => document.body.innerText.length);
  const hasContent = await page.evaluate(() =>
    document.body.innerText.includes('Fish Freshness Detector') &&
    document.body.innerText.includes('Experience and education')
  );
  console.log('no-JS text length:', text, '| key content present:', hasContent);
  await page.screenshot({ path: join(OUT, 'nojs-1440.png'), fullPage: true });
  await context.close();
}

// ---- 6. Print → PDF page count ----
{
  const { context, page } = await newPage({ width: 1440, theme: 'light' });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log('print PDF bytes:', pdf.length, '| approx pages:', pages);
  const { writeFile } = await import('node:fs/promises');
  await writeFile(join(OUT, 'print.pdf'), pdf);
  await context.close();
}

// ---- 7. Dev-only placeholder check ----
{
  const { context, page } = await newPage({ width: 1440, theme: 'dark' });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const pending = await page.locator('.fig-frame__pending').count();
  const ownerNote = await page.evaluate(() => document.body.innerText.includes('Owner note'));
  console.log('prod: pending placeholders =', pending, '| owner note present =', ownerNote);
  await context.close();
}

await browser.close();
console.log('\nCONSOLE ERRORS:', consoleErrors.length ? consoleErrors : 'none');
console.log('DONE');
