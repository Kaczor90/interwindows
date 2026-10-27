import { defineConfig } from 'astro/config';
import sitemap from './integrations/sitemap.mjs';
import typografia from './integrations/typografia.mjs';

// Production URL with www (docs/seo-plan.md §5.1). Used for canonical links, sitemap and schema.
const PRODUCTION_URL = 'https://www.interwindows.pl';

// Defaults build the production site for www.interwindows.pl.
// The GitHub Pages workflow sets SITE_URL, BASE_PATH and PUBLIC_PREVIEW=true to publish a noindex
// preview in a subfolder.
export default defineConfig({
  site: process.env.SITE_URL || PRODUCTION_URL,
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [typografia(), sitemap({ origin: PRODUCTION_URL })],
  devToolbar: { enabled: false },
});
