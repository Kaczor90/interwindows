// JSON-LD builders (docs/seo-plan.md §5.3). Every page gets businessGraph() from Base.astro;
// pages add their own objects through <Base schema={[...]}>, components like Breadcrumbs and Faq
// output their own <script type="application/ld+json">.
import { site } from '../data/site';
import { plain } from './rich';

export const BUSINESS_ID = `${site.productionUrl}/#firma`;
export const WEBSITE_ID = `${site.productionUrl}/#witryna`;

/** Absolute production URL for a root path ('/okna/' → 'https://www.interwindows.pl/okna/'). */
export const abs = (path: string) => new URL(path, site.productionUrl).toString();

export const business = () => ({
  '@type': 'HomeAndConstructionBusiness',
  '@id': BUSINESS_ID,
  name: site.name,
  alternateName: site.alternateName,
  legalName: site.legalName,
  url: abs('/'),
  logo: abs('/img/logo-schema.png'),
  image: abs('/og.jpg'),
  description: site.schemaDescription,
  telephone: site.phoneE164,
  email: site.email,
  vatID: site.vatId,
  taxID: site.nip,
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  ...(site.googleMapsUrl ? { hasMap: site.googleMapsUrl } : {}),
  ...(site.openingHours.length
    ? {
        openingHoursSpecification: site.openingHours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
      }
    : {}),
  areaServed: site.areaServed.map((a) => ({ '@type': a.type, name: a.name })),
  founder: site.founders.map((name) => ({ '@type': 'Person', name })),
  sameAs: [site.instagram, site.facebook, site.googleMapsUrl].filter(Boolean),
});

export const website = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: abs('/'),
  name: site.name,
  alternateName: site.alternateName,
  inLanguage: 'pl-PL',
  publisher: { '@id': BUSINESS_ID },
});

export const businessGraph = () => ({ '@context': 'https://schema.org', '@graph': [business(), website()] });

export interface Crumb {
  name: string;
  /** root path with trailing slash; omit for the current page */
  path?: string;
}

/** BreadcrumbList. The last item may have no path (current page) – it gets `currentPath`. */
export const breadcrumbs = (items: Crumb[], currentPath: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.path ?? currentPath),
  })),
});

export const service = (o: { name: string; serviceType: string; path: string; description?: string; areaServed?: { type: string; name: string }[] }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: o.name,
  serviceType: o.serviceType,
  url: abs(o.path),
  ...(o.description ? { description: o.description } : {}),
  provider: { '@id': BUSINESS_ID },
  areaServed: (o.areaServed ?? site.areaServed).map((a) => ({ '@type': a.type, name: a.name })),
});

export const faq = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
  })),
});

export const article = (o: {
  headline: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: { name: string; url?: string };
  description?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: o.headline,
  url: abs(o.path),
  mainEntityOfPage: abs(o.path),
  image: abs(o.image),
  datePublished: o.datePublished,
  dateModified: o.dateModified ?? o.datePublished,
  ...(o.description ? { description: o.description } : {}),
  author: { '@type': 'Person', name: o.author.name, ...(o.author.url ? { url: abs(o.author.url) } : {}) },
  publisher: { '@id': BUSINESS_ID },
  inLanguage: 'pl-PL',
});

/** ContactPage / AboutPage wrapper pointing at the business entity. */
export const webPage = (type: 'ContactPage' | 'AboutPage', path: string, name: string) => ({
  '@context': 'https://schema.org',
  '@type': type,
  name,
  url: abs(path),
  mainEntity: { '@id': BUSINESS_ID },
  isPartOf: { '@id': WEBSITE_ID },
});
