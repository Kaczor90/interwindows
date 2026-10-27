// Client reviews: only real ones, quoted verbatim (wording, spelling and punctuation as the authors wrote them).
//
// Sources, checked 27.10.2026:
//  • Google Business Profile "Inter Windows s.c. Bartosz Bezdziek, Paweł Majchrzak"
//    (site.googleMapsUrl = https://maps.google.com/?cid=52966961919073747): 9 reviews, all 5/5, no owner replies.
//    One of them (Łukasz D., ~01.2026) is a rating without any text, so it is not listed here.
//  • The old interwindows.pl (_tresci/tresci.md §7.7): its 6 testimonials are the SAME Google reviews
//    (same authors and wording; the old site had lightly edited Luiza D.'s text and dropped the „…” quotes).
//    They appear here once, as source 'google', with Google's wording; `town` comes from the old site.
//
// Privacy: authors are published as first name + surname initial ("Anna Ś.").
// `date` is approximate ('YYYY-MM'), worked out from Google's relative dates ("6 miesięcy temu") on 27.10.2026.
// `product` is set only when the review itself names the product.
// Order = display priority (`<Testimonials limit={n} />` keeps the first n).
// Do NOT put these into JSON-LD (no aggregateRating / Review on the company's own site – docs/seo-plan.md §5.3).

export type OpiniaZrodlo = 'google' | 'strona';

export interface Opinia {
  /** review text, verbatim */
  text: string;
  /** first name + surname initial */
  author: string;
  town?: string;
  /** product named in the review (okna, drzwi, rolety…) */
  product?: string;
  /** 'google' = Google Business Profile, 'strona' = published only on the old interwindows.pl */
  source: OpiniaZrodlo;
  /** approximate, 'YYYY-MM' */
  date?: string;
}

export const opinie: Opinia[] = [
  {
    text: 'Z pełnym przekonaniem polecam firmę Inter Windows. Od pierwszego kontaktu aż po zakończenie prac wszystko przebiegało sprawnie i profesjonalnie. Ekipa była punktualna, dobrze zorganizowana, a montaż wykonany bardzo starannie i czysto. Okna zostały idealnie dopasowane, a wszelkie pytania były na bieżąco wyjaśniane. Widać doświadczenie i dbałość o szczegóły. Jestem bardzo zadowolona z efektu końcowego i z pewnością skorzystałabym z usług tej firmy ponownie.',
    author: 'Anna Ś.',
    town: 'Słubice',
    product: 'okna',
    source: 'google',
    date: '2026-01',
  },
  {
    text: 'Fachowe doradztwo, produkt naprawdę godny polecenia i perfekcyjny montaż!',
    author: 'Martyna W.',
    source: 'google',
    date: '2026-08',
  },
  {
    text: '„Profesjonalna obsługa i doradztwo. Montaż okien wykonany dokładnie i bez pośpiechu.”',
    author: 'Włodzimierz S.',
    town: 'Płock',
    product: 'okna',
    source: 'google',
    date: '2026-01',
  },
  {
    text: 'Super kompetencja! Doradztwo na najwyższym poziomie. Panowie są terminowi, słowni, mają konkurencyjne ceny. Polecam serdecznie',
    author: 'Luiza D.',
    town: 'Gąbin',
    source: 'google',
    date: '2026-04',
  },
  {
    text: '„Dobry kontakt, konkretne ustalenia i solidny montaż. Polecam Inter Windows.”',
    // Google display name "Przemyslaw eR"; the old site signed it "Przemysław"
    author: 'Przemysław',
    town: 'Gąbin',
    source: 'google',
    date: '2026-01',
  },
  {
    text: 'Dobra jakość! Dostawa i montaż w ustalonym terminie! Polecam!',
    author: 'Tomasz G.',
    town: 'Płock',
    source: 'google',
    date: '2026-04',
  },
  {
    text: 'Polecam, wszystko zgodnie z ustaleniami!',
    author: 'Paweł K.',
    town: 'Gostynin',
    source: 'google',
    date: '2026-03',
  },
  {
    text: 'Polecam!',
    author: 'Paweł H.',
    source: 'google',
    date: '2026-03',
  },
];
