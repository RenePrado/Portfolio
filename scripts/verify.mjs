// Verification harness — run against `npm run preview` (default :4173).
//   node scripts/verify.mjs
// Captures screenshots to docs/screenshots/, checks horizontal overflow,
// console errors, theme persistence, inspect mode, reduced motion, no-JS.

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'docs/screenshots');
const BASE = process.env.BASE_URL || 'http://localhost:4173';

const widths = [360, 390, 768, 1024, 1440, 1920];
const results = { overflow: [], consoleErrors: [], checks: [] };

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

async function newPage({ width = 1440, height = 900, theme, reducedMotion, js = true } = {}) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: reducedMotion ? 'reduce' : 'no-preference',
    javaScriptEnabled: js,
    permissions: ['clipboard-read', 'clipboard-write']
  });
  if (theme) {
    await context.addInitScript((t) => {
      try {
        localStorage.setItem('theme', t);
      } catch {
        /* storage unavailable in this context */
      }
    }, theme);
  }
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`);
  });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  return { context, page, errors };
}

async function checkOverflow(page, label) {
  const res = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth
  }));
  const ok = res.scrollW <= res.clientW + 1;
  results.overflow.push({ label, ok, ...res });
  return ok;
}

// ---- 1. Screenshots + overflow at all widths, both themes ----
for (const theme of ['light', 'dark']) {
  for (const w of widths) {
    const { context, page, errors } = await newPage({ width: w, theme });
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await checkOverflow(page, `${theme}@${w}`);
    results.consoleErrors.push(...errors.map((e) => `${theme}@${w} ${e}`));
    await page.screenshot({ path: join(OUT, `${theme}-${w}.png`), fullPage: true });
    await context.close();
  }
}

// ---- 2. Hero / inspect overlay at desktop widths ----
for (const w of [1024, 1440, 1920]) {
  const { context, page } = await newPage({ width: w, theme: 'light' });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.keyboard.press('g');
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(OUT, `inspect-${w}.png`) });
  await context.close();
}

// ---- 3. Interaction checks (1440 light) ----
{
  const { context, page, errors: pageErrors } = await newPage({ width: 1440, theme: 'light' });
  await page.goto(BASE, { waitUntil: 'networkidle' });

  // theme toggle flips data-theme
  const before = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.getByRole('button', { name: /switch to dark theme/i }).click();
  const after = await page.evaluate(() => document.documentElement.dataset.theme);
  results.checks.push({ name: 'theme toggle', pass: before === 'light' && after === 'dark' });

  // inspect toggle via button
  const inspBtn = page.locator('.inspect-toggle');
  const inspVisible = await inspBtn.isVisible();
  await inspBtn.click();
  const inspOn = await page.evaluate(() => document.documentElement.dataset.inspect === 'on');
  results.checks.push({ name: 'inspect toggle', pass: inspVisible && inspOn });
  await page.keyboard.press('g');
  const inspOff = await page.evaluate(() => !document.documentElement.dataset.inspect);
  results.checks.push({ name: 'inspect G shortcut off', pass: inspOff });

  // copy email
  await page.getByRole('button', { name: /copy email/i }).click();
  await page.waitForTimeout(200);
  const live = await page.locator('[aria-live="polite"]').textContent();
  results.checks.push({ name: 'copy email announces', pass: /copied/i.test(live || '') });

  // mobile menu at 390
  results.consoleErrors.push(
    ...pageErrors.map((e) => `interactions ${e}`)
  );
  await context.close();
}
{
  const { context, page } = await newPage({ width: 390, theme: 'light' });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /open menu/i }).click();
  const menuVisible = await page.locator('#mobile-menu.is-open').isVisible();
  await page.keyboard.press('Escape');
  const menuClosed = !(await page.locator('#mobile-menu.is-open').count());
  results.checks.push({ name: 'mobile menu open+Esc', pass: menuVisible && menuClosed });
  results.consoleErrors.push(...(await page.evaluate(() => window.__errs || [])));
  await context.close();
}

// ---- 4. Reduced motion: no reveal-hidden content ----
{
  const { context, page } = await newPage({ width: 1440, theme: 'light', reducedMotion: true });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const hidden = await page.evaluate(() => {
    const els = document.querySelectorAll('[data-reveal]');
    return [...els].filter((el) => getComputedStyle(el).opacity === '0').length;
  });
  results.checks.push({ name: 'reduced-motion content visible', pass: hidden === 0 });
  await context.close();
}

// ---- 5. JS disabled: content readable ----
{
  const { context, page } = await newPage({ width: 1440, theme: 'light', js: false });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const text = await page.evaluate(() => document.body.innerText.length);
  const nameVisible = await page.evaluate(() =>
    document.body.innerText.includes('Rene Angelo Prado')
  );
  results.checks.push({ name: 'no-JS content present', pass: text > 2000 && nameVisible });
  await page.screenshot({ path: join(OUT, 'nojs-1440.png'), fullPage: true });
  await context.close();
}

// ---- 6. Theme flash check: hard reload keeps dark ----
{
  const { context, page } = await newPage({ width: 1440, theme: 'dark' });
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  const early = await page.evaluate(() => document.documentElement.dataset.theme);
  results.checks.push({ name: 'dark theme pre-paint', pass: early === 'dark' });
  await context.close();
}

await browser.close();

console.log('\n=== VERIFICATION RESULTS ===');
console.log('Overflow:', results.overflow.every((o) => o.ok) ? 'ALL OK' : results.overflow.filter((o) => !o.ok));
console.log('Checks:', results.checks.map((c) => `${c.pass ? 'PASS' : 'FAIL'} ${c.name}`).join('\n        '));
const errs = results.consoleErrors.filter(Boolean);
console.log('Console errors/warnings:', errs.length ? errs : 'none');
