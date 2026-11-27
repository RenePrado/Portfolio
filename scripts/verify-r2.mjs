// Round-2 verification — run against `npm run preview` (default :4173).
// Screenshots → docs/screenshots/review-r2/ ; prints measured evidence.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'docs/screenshots/review-r2');
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

// ---- 2. Nav breakpoint table ----
console.log('\n== NAV BREAKPOINT TABLE ==');
for (const w of [767, 768, 1023, 1024, 1920]) {
  const { context, page } = await newPage({ width: w });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const r = await page.evaluate(() => {
    const vis = (el) => {
      if (!el) return 'absent';
      const cs = getComputedStyle(el);
      const rc = el.getBoundingClientRect();
      return cs.display !== 'none' && rc.width > 0 ? 'Y' : 'n';
    };
    return {
      hamburger: vis(document.querySelector('.site-header__actions-mobile button')),
      inlineLinks: vis(document.querySelector('.site-nav')),
      rail: vis(document.querySelector('.index-rail')),
      grid: vis(document.querySelector('.inspect-toggle')),
      theme: vis(document.querySelector('.site-header__actions-mobile .icon-btn, .site-header__actions-desktop .icon-btn'))
    };
  });
  console.log(`@${w}: ${JSON.stringify(r)}`);
  await context.close();
}

// ---- 3. Edge alignment with rail (>=1024) ----
console.log('\n== EDGE ALIGNMENT ==');
for (const w of [1024, 1280, 1440, 1920]) {
  const { context, page } = await newPage({ width: w });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const r = await page.evaluate(() => {
    const left = (s) => Math.round(document.querySelector(s)?.getBoundingClientRect().left ?? -1);
    const rail = document.querySelector('.index-rail').getBoundingClientRect();
    return {
      rail: [Math.round(rail.left), Math.round(rail.right)],
      brand: left('.site-header__brand'),
      head: left('.section-head'),
      footer: left('.site-footer__copy'),
      projIdx: left('.project-row__index')
    };
  });
  console.log(`@${w}: ${JSON.stringify(r)}`);
  await context.close();
}

// ---- 4. Keyboard walkthrough (1440) ----
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
  console.log('focus ring:', JSON.stringify(focusVisible));

  await page.keyboard.press('Tab');
  const skip = await page.evaluate(() => ({
    text: document.activeElement.textContent.trim(),
    cls: document.activeElement.className
  }));
  console.log('first Tab →', JSON.stringify(skip));

  // G shortcut toggles inspect at >=768
  await page.keyboard.press('g');
  const insp = await page.evaluate(() => document.documentElement.dataset.inspect === 'on');
  await page.keyboard.press('g');
  console.log('G shortcut inspect on/off:', insp, !insp);

  // Grid toggle button itself
  await page.getByRole('button', { name: /layout grid/i }).click();
  const insp2 = await page.evaluate(() => document.documentElement.dataset.inspect === 'on');
  await page.getByRole('button', { name: /layout grid/i }).click();
  console.log('Grid button toggles inspect:', insp2);

  // theme toggle
  const themeBtn = page.getByRole('button', { name: /switch to dark theme/i }).first();
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

  // footer links focusable
  const footLinks = await page.evaluate(() =>
    [...document.querySelectorAll('.site-footer__list a')].map((a) => a.textContent.trim())
  );
  console.log('footer links:', JSON.stringify(footLinks));

  // rail link focus
  const railLink = page.locator('.index-rail__link').first();
  await railLink.focus();
  const rl = await page.evaluate(() => ({
    cls: document.activeElement.className,
    outline: getComputedStyle(document.activeElement).outlineStyle
  }));
  console.log('rail link focus:', JSON.stringify(rl));
  await context.close();
}

// mobile menu Esc + resume link
{
  const { context, page } = await newPage({ width: 390 });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /open menu/i }).click();
  const open = await page.locator('#mobile-menu.is-open').count();
  const menuLinks = await page.evaluate(() =>
    [...document.querySelectorAll('.mobile-menu__link')].map((a) => a.textContent.trim())
  );
  await page.keyboard.press('Escape');
  const closed = !(await page.locator('#mobile-menu.is-open').count());
  console.log('mobile menu open/Esc:', open === 1 && closed, '| links:', JSON.stringify(menuLinks));
  await context.close();
}

// G shortcut disabled below 768
{
  const { context, page } = await newPage({ width: 767 });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.keyboard.press('g');
  const on = await page.evaluate(() => document.documentElement.dataset.inspect === 'on');
  console.log('G at 767px inspect on:', on, '(expect false)');
  await context.close();
}

// ---- 5. Reduced motion ----
{
  const { context, page } = await newPage({ width: 1440, theme: 'dark', reducedMotion: true });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const hidden = await page.evaluate(() => {
    const els = document.querySelectorAll('[data-reveal], .reveal');
    return [...els].filter((el) => getComputedStyle(el).opacity === '0').length;
  });
  const plate = await page.evaluate(() => {
    const el = document.querySelector('.preview-plate');
    return el ? getComputedStyle(el).transitionDuration : 'n/a';
  });
  console.log('reduced-motion hidden elements:', hidden, '| plate transition:', plate);
  await context.close();
}

// ---- 6. JS disabled ----
{
  const { context, page } = await newPage({ width: 1440, theme: 'light', js: false });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const hasContent = await page.evaluate(() =>
    document.body.innerText.includes('Fish Freshness Detector') &&
    document.body.innerText.includes('Experience and education')
  );
  console.log('no-JS key content present:', hasContent);
  await page.screenshot({ path: join(OUT, 'nojs-1440.png'), fullPage: true });
  await context.close();
}

// ---- 7. Print → PDF page count ----
{
  const { context, page } = await newPage({ width: 1440 });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log('print PDF bytes:', pdf.length, '| approx pages:', pages);
  const { writeFile } = await import('node:fs/promises');
  await writeFile(join(OUT, 'print.pdf'), pdf);
  await context.close();
}

// ---- 8. Dev-only placeholder check ----
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
