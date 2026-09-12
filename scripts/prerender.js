/**
 * Build-time prerendering.
 *
 * Renders every public route of the app to static HTML so that crawlers
 * (Google, Bing, AI assistants) and users get the full page — title,
 * canonical, description, JSON-LD and content — in the first response
 * instead of an empty SPA shell that depends on JavaScript execution.
 *
 * Reads: dist/index.html (client template) and dist-ssr (server bundle).
 * Writes: dist/<route>.html for every route, plus dist/404.html.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, process.env.PRERENDER_DIST || 'dist');
const ssrDir = path.join(root, process.env.PRERENDER_SSR || 'dist-ssr');

const findEntry = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const hit = findEntry(full);
      if (hit) return hit;
    } else if (/^entry-server.*\.js$/.test(entry.name)) {
      return full;
    }
  }
  return null;
};

const entryFile = findEntry(ssrDir);
if (!entryFile) {
  console.error('❌ prerender: could not find the SSR entry in dist-ssr');
  process.exit(1);
}

const { render, getPrerenderRoutes } = await import(pathToFileURL(entryFile).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  console.error('❌ prerender: dist/index.html has no empty #root mount point');
  process.exit(1);
}

const NOT_FOUND_URL = '/__not_found__';
const routes = getPrerenderRoutes();

const renderRoute = (url) => {
  const { html, helmet } = render(url);
  const head = ['title', 'meta', 'link', 'script']
    .map((key) => helmet[key]?.toString() ?? '')
    .filter(Boolean)
    .join('\n    ');
  return template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('</head>', `    ${head}\n  </head>`);
};

let count = 0;
for (const route of routes) {
  const outFile = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}.html`;
  const outPath = path.join(dist, outFile);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, renderRoute(route));
  count += 1;
}
fs.writeFileSync(path.join(dist, '404.html'), renderRoute(NOT_FOUND_URL));

// Uppercase-suffix variants (/ecode/553A, /ecode/160C) show up in Search
// Console. Vercel cannot lowercase in a redirect rule, so emit tiny alias
// pages with an instant meta refresh, which Google treats as a permanent
// redirect, plus a canonical to the real page.
let aliases = 0;
for (const route of routes) {
  const m = route.match(/^\/ecode\/(\d{3,4})([a-z])$/);
  if (!m) continue;
  const upper = `/ecode/${m[1]}${m[2].toUpperCase()}`;
  const target = `https://www.ecodehalalcheck.com${route}`;
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${route}"><link rel="canonical" href="${target}"><title>Redirecting to ${target}</title></head><body><a href="${route}">${target}</a></body></html>\n`;
  fs.writeFileSync(path.join(dist, `${upper.replace(/^\//, '')}.html`), html);
  aliases += 1;
}

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`✅ Prerendered ${count} routes + 404.html (+${aliases} uppercase alias redirects)`);
