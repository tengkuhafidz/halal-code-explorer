/**
 * Post-build guard: fails the build if prerendered pages are missing the
 * head tags and content that search engines depend on. This is the
 * regression that silently shipped in Aug 2026 (every page carried the
 * homepage title and canonical); never again.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ORIGIN = 'https://www.ecodehalalcheck.com';

const count = (html, re) => (html.match(re) || []).length;
const attr = (html, re) => (html.match(re) || [])[1];

const checks = [
  { file: 'index.html', canonical: `${ORIGIN}/`, titleIncludes: 'Halal Check', h1Includes: 'Halal', ldMin: 3 },
  { file: 'all-ecodes.html', canonical: `${ORIGIN}/all-ecodes`, titleIncludes: 'All E-Codes', h1Includes: 'All E-Codes', ldMin: 1 },
  { file: 'categories.html', canonical: `${ORIGIN}/categories`, titleIncludes: 'Categories', h1Includes: 'category', ldMin: 0 },
  { file: 'category/emulsifiers.html', canonical: `${ORIGIN}/category/emulsifiers`, titleIncludes: 'Emulsifiers', h1Includes: 'Emulsifiers', ldMin: 2 },
  { file: 'ecode/622.html', canonical: `${ORIGIN}/ecode/622`, titleIncludes: 'E622', h1Includes: 'E622', ldMin: 2, bodyIncludes: ['Monopotassium Glutamate', 'Doubtful'] },
  { file: 'ecode/440a.html', canonical: `${ORIGIN}/ecode/440a`, titleIncludes: 'Pectin', h1Includes: 'Pectin', ldMin: 2, bodyIncludes: ['E440a', 'Halal'] },
  { file: 'ecode/100.html', canonical: `${ORIGIN}/ecode/100`, titleIncludes: 'E100', h1Includes: 'E100', ldMin: 2 },
  { file: '404.html', noindex: true, titleIncludes: '404', h1Includes: 'Page Not Found' },
];

const failures = [];
for (const c of checks) {
  const file = path.join(dist, c.file);
  if (!fs.existsSync(file)) { failures.push(`${c.file}: missing`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const problems = [];
  const titles = count(html, /<title[^>]*>/g);
  const title = attr(html, /<title[^>]*>([^<]*)<\/title>/) || '';
  if (titles !== 1) problems.push(`expected 1 <title>, found ${titles}`);
  if (!title.includes(c.titleIncludes)) problems.push(`title "${title}" lacks "${c.titleIncludes}"`);
  const canonicals = html.match(/<link[^>]*rel="canonical"[^>]*>/g) || [];
  if (c.canonical) {
    if (canonicals.length !== 1) problems.push(`expected 1 canonical, found ${canonicals.length}`);
    else if (!canonicals[0].includes(`href="${c.canonical}"`)) problems.push(`canonical is ${canonicals[0]}`);
    if (count(html, /<meta[^>]*name="description"[^>]*>/g) !== 1) problems.push('expected exactly 1 meta description');
    if (/<meta[^>]*name="robots"[^>]*noindex/.test(html)) problems.push('unexpected noindex');
  }
  if (c.noindex) {
    if (!/<meta[^>]*name="robots"[^>]*noindex/.test(html)) problems.push('404 page lacks noindex');
    if (canonicals.length) problems.push('404 page must not have a canonical');
  }
  const ld = count(html, /application\/ld\+json/g);
  if (c.ldMin && ld < c.ldMin) problems.push(`expected ≥${c.ldMin} JSON-LD blocks, found ${ld}`);
  const h1s = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/g) || [];
  const h1Text = h1s.map((h) => h.replace(/<[^>]+>/g, '')).join(' | ');
  if (h1s.length !== 1) problems.push(`expected exactly 1 <h1>, found ${h1s.length} (${h1Text})`);
  if (!h1Text.toLowerCase().includes(c.h1Includes.toLowerCase())) problems.push(`h1 "${h1Text}" lacks "${c.h1Includes}"`);
  if (/<div id="root"><\/div>/.test(html)) problems.push('empty #root — page was not prerendered');
  for (const needle of c.bodyIncludes || []) {
    if (!html.includes(needle)) problems.push(`body lacks "${needle}"`);
  }
  if (problems.length) failures.push(`${c.file}:\n    - ${problems.join('\n    - ')}`);
}

const ecodeFiles = fs.existsSync(path.join(dist, 'ecode')) ? fs.readdirSync(path.join(dist, 'ecode')).filter((f) => f.endsWith('.html')).length : 0;
if (ecodeFiles < 290) failures.push(`only ${ecodeFiles} E-code pages were prerendered`);

if (failures.length) {
  console.error('❌ verify-prerender failed:\n  ' + failures.join('\n  '));
  process.exit(1);
}
console.log(`✅ verify-prerender passed (${ecodeFiles} E-code pages)`);
