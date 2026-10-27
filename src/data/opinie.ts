// Client reviews published on the current interwindows.pl (source: _tresci/tresci.md §7.7), quoted verbatim.
// Source (Google / Facebook / survey) and the authors' consent are NOT confirmed – see docs/do-uzupelnienia.md.
// Until confirmed, pages show first name + surname initial and the note `sourceNote`.
// Do NOT add these to JSON-LD (no aggregateRating/review on own site – docs/seo-plan.md §5.3).

export interface Opinia {
  author: string;
  town: string;
  text: string;
  /** shortlisted for the home page (tone fits the premium positioning) */
  featured?: boolean;
}

export const sourceNote = 'Opinie klientów opublikowane wcześniej na stronie interwindows.pl, cytowane bez zmian.';

export const opinie: Opinia[] = [
  {
    author: 'Anna Ślepecka',
    town: 'Słubice',
    text: 'Z pełnym przekonaniem polecam firmę Inter Windows. Od pierwszego kontaktu aż po zakończenie prac wszystko przebiegało sprawnie i profesjonalnie. Ekipa była punktualna, dobrze zorganizowana, a montaż wykonany bardzo starannie i czysto. Okna zostały idealnie dopasowane, a wszelkie pytania były na bieżąco wyjaśniane. Widać doświadczenie i dbałość o szczegóły. Jestem bardzo zadowolona z efektu końcowego i z pewnością skorzystałabym z usług tej firmy ponownie.',
    featured: true,
  },
  { author: 'Włodzimierz Skosogorienko', town: 'Płock', text: 'Profesjonalna obsługa i doradztwo. Montaż okien wykonany dokładnie i bez pośpiechu.', featured: true },
  { author: 'Przemysław', town: 'Gąbin', text: 'Dobry kontakt, konkretne ustalenia i solidny montaż. Polecam Inter Windows.', featured: true },
  { author: 'Paweł Kępczyński', town: 'Gostynin', text: 'Polecam, wszystko zgodnie z ustaleniami!' },
  { author: 'Luiza Dylan', town: 'Gąbin', text: 'Super kompetencja! Doradztwo na najwyższym poziomie. Panowie są terminowi, słowni i mają konkurencyjne ceny. Polecam serdecznie!' },
  { author: 'Tomasz Grodzicki', town: 'Płock', text: 'Dobra jakość! Dostawa i montaż w ustalonym terminie! Polecam!' },
];

/** "Anna Ślepecka" → "Anna Ś." (single names stay as they are) */
export const displayName = (author: string) => {
  const [first, ...rest] = author.split(' ');
  return rest.length ? `${first} ${rest[rest.length - 1][0]}.` : first;
};
