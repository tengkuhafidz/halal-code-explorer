#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Read the built HTML file
const htmlPath = join(process.cwd(), 'dist', 'index.html');
let html = readFileSync(htmlPath, 'utf8');

// Replace render-blocking CSS with preload + async loading
html = html.replace(
  /<link rel="stylesheet" crossorigin href="([^"]+\.css)"/g,
  '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\'stylesheet\'" crossorigin>\n    <noscript><link rel="stylesheet" crossorigin href="$1"></noscript'
);

// Only optimize CSS loading - keep normal JavaScript behavior
console.log('✅ Build optimized - CSS converted to async loading');

// Write the optimized HTML back
writeFileSync(htmlPath, html);