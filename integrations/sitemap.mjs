// Builds dist/sitemap.xml after `astro build` from the pages that were actually generated.
//
// - Every HTML page is included automatically – new pages (also dynamic routes such as
//   /realizacje/[slug]/) need no registry entry.
// - A page is left out when it was rendered with <Base noindex> (Base.astro marks it with
//   <html data-noindex>). That is the only switch: noindex in the page = not in the sitemap.
// - 404 pages are always left out.
// - <lastmod> comes from <meta property="og:updated_time"> (Base prop `updated`), if present.
// - URLs always use the production origin (docs/seo-plan.md §5.4); preview builds are noindex anyway.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

/** @param {{ origin: string }} options */
export default function sitemap({ origin }) {
  return {
    name: 'interwindows-sitemap',
    hooks: {
      'astro:build:done': ({ dir, pages, logger }) => {
        const out = fileURLToPath(dir);
        const entries = [];
        let skipped = 0;

        for (const { pathname } of pages) {
          if (/(^|\/)404\/?$/.test(pathname) || pathname.endsWith('.xml') || pathname.endsWith('.txt')) continue;
          const candidates = [join(out, pathname, 'index.html'), join(out, `${pathname.replace(/\/$/, '')}.html`)];
          const file = candidates.find((f) => existsSync(f));
          if (!file) continue;

          const html = readFileSync(file, 'utf8');
          const htmlTag = html.match(/<html[^>]*>/i)?.[0] ?? '';
          if (/\sdata-noindex/.test(htmlTag)) {
            skipped++;
            continue;
          }
          const lastmod = html.match(/<meta property="og:updated_time" content="([^"]+)"/)?.[1];
          const path = `/${pathname}`.replace(/\/+/g, '/');
          entries.push({ loc: new URL(path, origin).toString(), lastmod });
        }

        entries.sort((a, b) => a.loc.localeCompare(b.loc));
        const body = entries
          .map((e) => `  <url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`)
          .join('\n');
        writeFileSync(
          join(out, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
        );
        logger.info(`sitemap.xml: ${entries.length} adresów (pominięte noindex: ${skipped})`);
      },
    },
  };
}
