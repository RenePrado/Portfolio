// verify-v3b — DOM order, resume links, reduced motion, no-JS, print, console.
import { chromium } from 'playwright';

const BASE = 'http://localhost:4173/';
const browser = await chromium.launch();

// Section order + landmarks + resume link count
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const info = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('main > section')].map((s) => s.id);
    const resumeLinks = [...document.querySelectorAll('a')].filter((a) =>
      a.href.includes('Resume.pdf') || a.textContent.includes('Résumé')
    ).map((a) => `${a.textContent.trim().slice(0, 30)} -> ${a.getAttribute('href')}`);
    const landmarks = {
      header: !!document.querySelector('header'),
      nav: !!document.querySelector('nav'),
      main: !!document.querySelector('main'),
      footer: !!document.querySelector('footer'),
      sectionsLabelled: [...document.querySelectorAll('main section')].every((s) => s.getAttribute('aria-labelledby'))
    };
    return { ids, resumeLinks, landmarks };
  });
  console.log('SECTIONS:', info.ids.join(' -> '));
  console.log('LANDMARKS:', JSON.stringify(info.landmarks));
  console.log('RESUME LINKS:', JSON.stringify(info.resumeLinks, null, 1));
  console.log('CONSOLE ERRORS:', errors.length ? errors : 'none');
  await page.close();
}

// Reduced motion: no animations/transitions running
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const anim = await page.evaluate(() => {
    const running = document.getAnimations().filter((a) => a.playState === 'running');
    const transitions = getComputedStyle(document.querySelector('.btn')).transitionDuration;
    return { runningAnims: running.length, btnTransition: transitions };
  });
  console.log('REDUCED MOTION:', JSON.stringify(anim));
  await ctx.close();
}

// No-JS: prerendered HTML contains content
{
  const res = await fetch(BASE);
  const html = await res.text();
  const has = {
    name: html.includes('Rene Angelo'),
    work: html.includes('Selected work'),
    experience: html.includes('Experience'),
    profile: html.includes('Profile'),
    contact: html.includes('reneangeloprado50'),
    noOwnerNote: !html.includes('Owner note') && !html.includes('OPEN_ITEMS'),
    noScreenshotLabel: !html.includes('Screenshot coming')
  };
  console.log('NO-JS/PRERENDER:', JSON.stringify(has));
}

// Print to PDF — page count
{
  const page = await browser.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const pdf = await page.pdf({ format: 'A4', printBackground: false });
  const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log('PRINT pages:', pages, `(${(pdf.length / 1024).toFixed(0)}KB)`);
  await page.close();
}

await browser.close();
