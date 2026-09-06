/**
 * Writes public/robots.txt and public/sitemap.xml from the project list, so a
 * project added to src/data/site.js cannot be left out of the sitemap.
 *
 * Runs as `prebuild`, which means the generated files land in public/ before
 * Vite copies that directory into dist/.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { site, projects } from '../src/data/site.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const origin = site.origin.replace(/\/$/, '');

const routes = ['/', ...projects.items.map((project) => `/projects/${project.id}`)];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) =>
    [
      '  <url>',
      `    <loc>${origin}${route}</loc>`,
      // The homepage is the entry point and changes most often.
      `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>`,
      '  </url>',
    ].join('\n'),
  ),
  '</urlset>',
  '',
].join('\n');

const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${origin}/sitemap.xml`, ''].join('\n');

writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap);
writeFileSync(join(root, 'public', 'robots.txt'), robots);

console.log(`SEO files written for ${origin} (${routes.length} routes)`);
