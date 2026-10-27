import type { APIRoute } from 'astro';
import { site } from '../data/site';

// Production: allow everything (noindex pages must stay crawlable so robots can see the tag;
// AI crawlers are not blocked – docs/seo-plan.md §5.4). Preview (PUBLIC_PREVIEW=true): block all.
export const GET: APIRoute = () => {
  const isPreview = import.meta.env.PUBLIC_PREVIEW === 'true';
  const body = isPreview
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${site.productionUrl}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
