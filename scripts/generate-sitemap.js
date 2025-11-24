import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the eCodeService.ts file
const eCodeServicePath = path.join(__dirname, '../src/services/eCodeService.ts');
const content = fs.readFileSync(eCodeServicePath, 'utf8');

// Extract all E-codes
const eCodePattern = /"E-Code":\s*"(E\d+)"/g;
const eCodes = [];
let match;

while ((match = eCodePattern.exec(content)) !== null) {
  eCodes.push(match[1]);
}

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.ecodehalalcheck.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.ecodehalalcheck.com/all-ecodes</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
${eCodes.map(code => `  <url>
    <loc>https://www.ecodehalalcheck.com/ecode/${code.substring(1)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

// Write to public directory
fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log(`✅ Generated sitemap with ${eCodes.length} E-codes`);