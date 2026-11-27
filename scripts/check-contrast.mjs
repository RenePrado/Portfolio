// Contrast gate — fails if any text/background pair used in the design is
// below WCAG AA (4.5:1 normal text, 3:1 large text & UI boundaries).
// Reads the same token values the site uses; run: node scripts/check-contrast.mjs

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(root, 'src/styles/tokens.css'), 'utf8').replace(
  /\/\*[\s\S]*?\*\//g,
  ''
);

function block(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, 's');
  const m = css.match(re);
  if (!m) throw new Error(`token block not found: ${selector}`);
  const out = {};
  for (const line of m[1].split(';')) {
    const [k, v] = line.split(':').map((s) => s.trim());
    if (k && v) out[k] = v;
  }
  return out;
}

const themes = {
  dark: { ...block(':root') },
  light: { ...block(":root[data-theme='light']") }
};

function lum(hex) {
  const c = hex.replace('#', '');
  const f = (i) => {
    const v = parseInt(c.substr(i, 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(0) + 0.7152 * f(2) + 0.0722 * f(4);
}

function ratio(a, b) {
  const l1 = lum(a);
  const l2 = lum(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

// [foreground token, background token, min ratio, label]
const pairs = [
  ['--ink', '--paper', 4.5, 'body/headings on page'],
  ['--ink', '--surface', 4.5, 'body text on surface'],
  ['--muted', '--paper', 4.5, 'muted text on page'],
  ['--muted', '--surface', 4.5, 'muted text on surface'],
  ['--accent', '--paper', 4.5, 'accent links/numerals on page'],
  ['--accent', '--surface', 4.5, 'accent links/numerals on surface'],
  ['--paper', '--ink', 4.5, 'primary button text'],
  ['--on-accent', '--accent', 4.5, 'selection text on accent'],
  ['--accent', '--paper', 3.0, 'focus ring vs page (UI)'],
  ['--accent', '--surface', 3.0, 'focus ring vs surface (UI)'],
  ['--line-strong', '--paper', 1.0, 'hairline visible (info only)']
];

let failures = 0;
for (const [theme, t] of Object.entries(themes)) {
  console.log(`\n${theme.toUpperCase()} theme`);
  for (const [fg, bg, min, label] of pairs) {
    const a = t[fg];
    const b = t[bg];
    if (!a || !b) {
      console.log(`  MISSING  ${fg} on ${bg} — ${label}`);
      failures++;
      continue;
    }
    const r = ratio(a, b);
    const ok = r >= min;
    if (!ok) failures++;
    console.log(
      `  ${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  ${fg} ${a} on ${bg} ${b}  (${label}, min ${min}:1)`
    );
  }
}

if (failures) {
  console.error(`\n${failures} contrast check(s) failed.`);
  process.exit(1);
}
console.log('\nAll contrast checks passed.');
