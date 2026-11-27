// Dark-first redesign verification — overflow, nav, theme, sheet, screenshots.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:4173/';
const OUT = 'docs/screenshots/v3';
mkdirSync(OUT, { recursive: true });

const widths = [320, 390, 768, 1024, 1440, 1920];
const results = [];

const browser = await chromium.launch();

// 1) Overflow + theme default at all widths (dark default)
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const m = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    innerW: window.innerWidth,
    theme: document.documentElement.dataset.theme,
    bg: getComputedStyle(document.body).backgroundColor
  }));
  results.push({ w, ...m, overflow: m.scrollW > m.innerW });
  await page.close();
}
console.log('OVERFLOW/ THEME:');
for (const r of results) console.log(`  ${r.w}px scrollW=${r.scrollW} innerW=${r.innerW} theme=${r.theme} bg=${r.bg} overflow=${r.overflow}`);

// 2) Nav table at breakpoints
const navWidths = [390, 639, 640, 768, 1023, 1024, 1440];
console.log('\nNAV:');
for (const w of navWidths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const vis = await page.evaluate(() => {
    const q = (s) => {
      const el = document.querySelector(s);
      if (!el) return 'absent';
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return cs.display !== 'none' && r.width > 0 ? 'Y' : 'n';
    };
    return {
      brand: q('.site-header__brand'),
      links: q('.site-nav'),
      resume: q('.site-nav__link--resume'),
      themeNav: q('.site-nav .icon-btn'),
      menuBtn: q('.site-header__menu-btn'),
      sheet: q('.mobile-sheet')
    };
  });
  console.log(`  ${w}px`, JSON.stringify(vis));
  await page.close();
}

// 3) Email overflow at 320px
{
  const page = await browser.newPage({ viewport: { width: 320, height: 800 } });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.locator('#contact').scrollIntoViewIfNeeded();
  const email = await page.evaluate(() => {
    const el = document.querySelector('.contact__email');
    const r = el.getBoundingClientRect();
    return { w: Math.round(r.width), scrollW: el.scrollWidth, docW: document.documentElement.scrollWidth };
  });
  console.log('\nEMAIL @320:', JSON.stringify(email));
  await page.close();
}

// 4) Theme toggle + persistence
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const before = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.locator('.site-nav .icon-btn').click();
  const after = await page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    stored: localStorage.getItem('theme')
  }));
  await page.reload({ waitUntil: 'networkidle' });
  const persisted = await page.evaluate(() => document.documentElement.dataset.theme);
  console.log(`\nTHEME: before=${before} after=${after.theme} stored=${after.stored} persisted=${persisted}`);
  await ctx.close();
}

// 5) Mobile sheet: open, focus trap, Esc close
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.locator('.site-header__menu-btn').click();
  const sheet = await page.evaluate(() => {
    const s = document.querySelector('.mobile-sheet');
    const r = s.getBoundingClientRect();
    return { open: !!s, top: r.top, h: Math.round(r.height), focused: document.activeElement.textContent.trim() };
  });
  // Tab through to test trap wraps
  for (let i = 0; i < 8; i++) await page.keyboard.press('Tab');
  const trap = await page.evaluate(() => document.activeElement.closest('.mobile-sheet') !== null);
  await page.keyboard.press('Escape');
  const closed = await page.evaluate(() => !document.querySelector('.mobile-sheet'));
  console.log(`\nSHEET:`, JSON.stringify(sheet), 'trapInside=', trap, 'escClosed=', closed);
  await page.close();
}

// 6) Scrollspy: scroll to #experience, check active link
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.locator('#experience').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const active = await page.evaluate(() => document.querySelector('.site-nav__link.is-active')?.textContent);
  const headerScrolled = await page.evaluate(() => document.querySelector('.site-header').classList.contains('is-scrolled'));
  console.log(`\nSCROLLSPY active="${active}" headerScrolled=${headerScrolled}`);
  await page.close();
}

// 7) Screenshots both themes at 1440/768/390 (full page)
for (const theme of ['dark', 'light']) {
  for (const w of [1440, 768, 390]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(`${BASE}?theme=${theme}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/after-${w}-${theme}-top.png` });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/after-${w}-${theme}-bottom.png` });
    await page.close();
  }
}
console.log('\nScreenshots written to', OUT);

await browser.close();
