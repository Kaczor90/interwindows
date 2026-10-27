// Company data (NAP) – one source for header, footer, contact page, form and JSON-LD.
// Forms of name, address and phone follow docs/seo-plan.md §5.5. Facts come from _tresci/tresci.md.
// Empty strings/arrays = not known yet: such fields are not rendered (see docs/do-uzupelnienia.md).

/** Colour theme of the whole site – THE one place to switch palettes (see src/styles/global.css):
 *  'profil' = navy palette, UI label „Granat” (ink, navy, burgundy accent) · 'mono' = black & white like the logo. */
export const theme: 'profil' | 'mono' = 'profil';

/** Features that wait for the client's confirmation (docs/do-uzupelnienia.md). */
export const features = {
  /** Warm (layered) installation done by the crews – NOT confirmed yet.
   *  false: /cieply-montaz-okien/ is built with noindex (so it is left out of sitemap.xml) and is NOT linked from
   *  the menu, footer, related-link lists or texts (rich() renders such links as plain text).
   *  true:  the page is indexed and linked everywhere. Also restore its meta description (see the page file). */
  cieplyMontaz: false,
};

/** Pages that exist but must not be linked while their feature flag is off. */
export const unlinkedPaths: string[] = features.cieplyMontaz ? [] : ['/cieply-montaz-okien/'];
/** false for internal links to a page from `unlinkedPaths` (anchors and query strings ignored). */
export const isLinked = (href: string) => !unlinkedPaths.includes(href.split(/[#?]/)[0]);

export const site = {
  /** name used in NAP, schema and texts */
  name: 'Inter Windows',
  /** spelling used in the logo; schema alternateName */
  alternateName: 'InterWindows',
  /** short legal form used in the footer copyright */
  shortLegalName: 'Inter Windows s.c.',
  /** full legal name – only on /kontakt/, in the privacy policy and in schema */
  legalName: 'Inter Windows Bartosz Bezdziek, Paweł Majchrzak spółka cywilna',
  nip: '774-329-92-99',
  regon: '542108829',
  vatId: 'PL7743299299',

  productionUrl: 'https://www.interwindows.pl',
  /** fallback <title> (docs/seo-plan.md §5.2) */
  defaultTitle: 'Inter Windows – okna i drzwi z montażem, Płock',
  description:
    'Okna PCV, aluminiowe i drewniane, drzwi, rolety i bramy dla wymagających. Płock i okolice, montaż wyłącznie naszą ekipą, bez podwykonawców.',
  /** schema.org description (docs/seo-plan.md §5.3) */
  schemaDescription:
    'Okna, drzwi, rolety, żaluzje fasadowe i bramy garażowe z montażem wykonywanym wyłącznie przez własne ekipy. Autoryzowany partner DAKO w Płocku.',
  slogan: 'okna · drzwi · bramy · rolety',
  footerAbout:
    'Doradzamy, mierzymy i montujemy okna, drzwi, rolety i bramy. Montaż wykonuje wyłącznie nasza ekipa, nigdy podwykonawcy.',

  /** main phone (NAP) */
  phone: '697 886 093',
  phoneHref: 'tel:+48697886093',
  phoneE164: '+48697886093',
  email: 'biuro@interwindows.pl',

  address: {
    /** label used on the current site; whether there is a showroom is not confirmed */
    place: 'Biuro sprzedaży',
    street: 'ul. Przemysłowa 22',
    postalCode: '09-400',
    city: 'Płock',
    region: 'mazowieckie',
    country: 'PL',
    mapQuery: 'Inter Windows, Przemysłowa 22, 09-400 Płock',
  },
  /** from the Google Maps pin on the current site – verify in Google Business Profile */
  geo: { lat: 52.5657, lng: 19.7002 },

  /** opening hours from the Google Business Profile (27.10.2026) – to be confirmed by the client.
   *  Empty string = not rendered. */
  hours: 'pon.–pt. 8:00–16:00, sob. 8:00–13:00',
  /** the same hours as rows for the contact page */
  hoursRows: [
    { label: 'Poniedziałek – piątek', value: '8:00–16:00' },
    { label: 'Sobota', value: '8:00–13:00' },
  ],
  /** schema.org openingHoursSpecification entries */
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '16:00' },
    { days: ['Saturday'], opens: '08:00', closes: '13:00' },
  ] as { days: string[]; opens: string; closes: string }[],
  /** showroom / exhibition at the office – unknown, keep null until confirmed */
  showroom: null as null | string,
  /** Google Business Profile / Maps link (stable CID) – schema hasMap + sameAs, map and route links.
   *  NOTE: the profile shows postal code 09-401; the site keeps 09-400 (VAT register) – to resolve. */
  googleMapsUrl: 'https://maps.google.com/?cid=52966961919073747',

  instagram: 'https://www.instagram.com/inter_windows',
  facebook: 'https://www.facebook.com/profile.php?id=61580449427158',

  founders: ['Paweł Majchrzak', 'Bartosz Bezdziek'],

  /** used in schema.org areaServed (docs/seo-plan.md §5.3) */
  areaServed: [
    { type: 'City', name: 'Płock' },
    { type: 'AdministrativeArea', name: 'powiat płocki' },
    { type: 'AdministrativeArea', name: 'powiat gostyniński' },
    { type: 'AdministrativeArea', name: 'powiat sierpecki' },
  ],
  /** towns named on the current site (meta description, reviews) */
  towns: ['Płock', 'Gostynin', 'Gąbin', 'Słubice'],
};

/** Advisers listed on the current site. Roles are unknown – do not invent them (docs/do-uzupelnienia.md). */
export const people: { name: string; phone: string; phoneHref: string; role: string }[] = [
  { name: 'Paweł Majchrzak', phone: '697 886 093', phoneHref: 'tel:+48697886093', role: '' },
  { name: 'Bartosz Bezdziek', phone: '606 643 641', phoneHref: 'tel:+48606643641', role: '' },
  { name: 'Kacper Dylewski', phone: '797 566 365', phoneHref: 'tel:+48797566365', role: '' },
];

export const social = [
  { label: 'Instagram', href: site.instagram, icon: 'instagram' },
  { label: 'Facebook', href: site.facebook, icon: 'facebook' },
];

/** Main navigation. "Oferta" renders the category dropdown from src/data/oferta.ts. */
export const nav: { label: string; href: string; kind?: 'offer' | 'cta' }[] = [
  { label: 'Oferta', href: '/okna/', kind: 'offer' },
  { label: 'Montaż', href: '/montaz-okien/' },
  { label: 'Realizacje', href: '/realizacje/' },
  { label: 'O firmie', href: '/o-firmie/' },
  { label: 'Kontakt', href: '/kontakt/' },
  { label: 'Konfigurator', href: '/konfigurator/', kind: 'cta' },
];

/** Service pages built by other parts of the project – linked from nav, footer and home. */
export const servicePages = [
  { label: 'Montaż okien', href: '/montaz-okien/' },
  { label: 'Wymiana okien', href: '/wymiana-okien/' },
  { label: 'Ciepły montaż okien', href: '/cieply-montaz-okien/' },
  { label: 'Konfigurator okien', href: '/konfigurator/' },
].filter((p) => isLinked(p.href));
