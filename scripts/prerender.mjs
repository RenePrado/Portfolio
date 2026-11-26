// Prerender — renders <App/> to static HTML and injects it into
// dist/index.html so content is readable with JavaScript disabled.
// React's createRoot().render() replaces the snapshot on load.
// Run automatically after `vite build` (see package.json "build").

import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const entry = join(root, 'scripts/prerender-entry.jsx');
const outfile = join(root, 'scripts/.prerender-bundle.mjs');
const distHtml = join(root, 'dist/index.html');

await build({
  entryPoints: [entry],
  bundle: true,
  format: 'esm',
  platform: 'node',
  jsx: 'automatic',
  outfile,
  external: ['react', 'react-dom', 'react-dom/*', 'react/jsx-runtime'],
  logLevel: 'silent'
});

const { default: App } = await import(pathToFileURL(outfile).href);
const html = renderToString(createElement(App));

const template = await readFile(distHtml, 'utf8');
const re = /<!--app-->[\s\S]*?<!--\/app-->/;
if (!re.test(template)) {
  throw new Error('dist/index.html: prerender markers not found');
}
await writeFile(distHtml, template.replace(re, `<!--app-->${html}<!--/app-->`));
console.log(`prerender: injected ${html.length} bytes of static HTML`);
