// Image pipeline — dev-only (sharp is a devDependency, never shipped).
//   node scripts/optimize-images.mjs
// Generates responsive portrait variants + the OG image into public/.

import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'assets-src/Prado.jpg');
const OUT = join(root, 'public/assets/portrait');

const widths = [480, 800];

await mkdir(OUT, { recursive: true });

for (const width of widths) {
  const base = sharp(SRC).resize({ width, withoutEnlargement: true });
  await base
    .clone()
    .avif({ quality: 55, effort: 6 })
    .toFile(join(OUT, `portrait-${width}.avif`));
  await base
    .clone()
    .webp({ quality: 78 })
    .toFile(join(OUT, `portrait-${width}.webp`));
  await base
    .clone()
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, `portrait-${width}.jpg`));
  console.log(`portrait-${width}: avif/webp/jpg written`);
}

// OG image — spec-sheet styled card rasterized from SVG (system serif only,
// so it stays dependency-free).
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f5f0e8"/>
  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="#ddd2bf"/>
  <text x="72" y="120" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="22" letter-spacing="6" fill="#5c5046">PORTFOLIO — INDEX</text>
  <text x="72" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="96" font-weight="600" fill="#1c1814">Rene Angelo Prado</text>
  <text x="72" y="370" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="26" letter-spacing="4" fill="#9c4f16">FRONT-END DEVELOPER</text>
  <text x="72" y="430" font-family="Georgia, serif" font-size="30" fill="#5c5046">Quezon City, Philippines</text>
  <line x1="72" y1="500" x2="1128" y2="500" stroke="#ddd2bf"/>
  <text x="72" y="560" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="20" letter-spacing="3" fill="#5c5046">RENELANGELOPRADO50@GMAIL.COM — GITHUB.COM/RENEPRADO</text>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .png({ compressionLevel: 9 })
  .toFile(join(root, 'public/og.png'));
console.log('og.png written (1200×630)');
