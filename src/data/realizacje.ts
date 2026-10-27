// Project pages /realizacje/{slug}/ and the hub /realizacje/ (docs/seo-plan.md §3.4, §4.2).
//
// Source of every fact below: the company's own Facebook posts (_tresci/facebook/realizacje-fb.md,
// projects P1–P8) and the photos themselves. Nothing is added from outside the posts: no towns,
// sizes, counts or systems that the posts do not mention. Open points are listed per project in
// docs/realizacje-do-potwierdzenia.md – `town` stays undefined until the client confirms it.
//
// Photos:
//   - new files: public/img/realizacje/projekty/<name>.webp (max 1600 px) + <name>-800.webp,
//     made by scripts/realizacje-projekty.mjs (sizes: scripts/realizacje-projekty-rozmiary.json);
//   - reused files from src/data/realizacje-zdjecia.ts (public/img/realizacje/), via fromManifest().
// Privacy: licence plates and one person's face are blurred in the new files (list in the script).
import { photoByFile, photoSrc, zdjecia, type PhotoTag, type RealizacjaZdjecie } from './realizacje-zdjecia';

/** Filter chips on /realizacje/ (product groups, not indexed URLs). */
export type FilterKey = 'okna' | 'drzwi' | 'tarasowe' | 'bramy' | 'oslony';

export const filters: { key: FilterKey; label: string }[] = [
  { key: 'okna', label: 'Okna i przeszklenia' },
  { key: 'drzwi', label: 'Drzwi' },
  { key: 'tarasowe', label: 'Drzwi tarasowe i HST' },
  { key: 'bramy', label: 'Bramy garażowe' },
  { key: 'oslony', label: 'Rolety i żaluzje' },
];

/** How loose album photos (tags from realizacje-zdjecia.ts) map onto the filter chips. */
const tagFilters: Partial<Record<PhotoTag, FilterKey>> = {
  okna: 'okna',
  przeszklenia: 'okna',
  'drzwi-zewnetrzne': 'drzwi',
  'drzwi-wewnetrzne': 'drzwi',
  'drzwi-tarasowe': 'tarasowe',
  'bramy-garazowe': 'bramy',
};

export interface ProjectPhoto {
  /** 1600 px file (root path); the 800 px file sits next to it with the -800 suffix */
  src: string;
  width: number;
  height: number;
  alt: string;
  /** stage shown as a small label */
  phase?: 'przed' | 'w-trakcie' | 'po';
  /** before/after pair id – a "przed" and a "po" photo with the same id are shown side by side */
  pair?: string;
  /** internal: album number or Facebook file the photo comes from */
  source: string;
  /** CSS object-position when the photo is cropped (cover in the hero and on cards), e.g. 'center 15%' */
  position?: string;
}

export interface Product {
  name: string;
  /** brand or system named in the post */
  brand?: string;
  /** offer category slug (src/data/oferta.ts) – the product links there */
  category?: string;
}

export interface Realizacja {
  /** ASCII slug: {produkt}-{typ obiektu}[-{miejscowość}] – no town unless it is confirmed */
  slug: string;
  /** H1 – template from SEO §4.2: {Produkt} – {typ obiektu}, {Miejscowość} */
  title: string;
  /** shorter title for cards */
  cardTitle: string;
  seo: { title: string; description: string };
  /** only when confirmed by the client (or named in the post) */
  town?: string;
  buildingType: string;
  /** month of the Facebook post, 'YYYY-MM' */
  date: string;
  postDate: string;
  /** date of the original photos (Google Photos album), if we have them – i.e. when the work was done */
  photosDate?: string;
  products: Product[];
  /** brands / systems named in the post */
  systems: string[];
  /** extra equipment or materials named in the post */
  equipment?: string[];
  filters: FilterKey[];
  /** main offer category: preselected in the quote form, first `about` in JSON-LD */
  mainCategory: string;
  scope: string[];
  lead: string;
  highlights: string[];
  challenge: string[];
  solution: string[];
  result: string[];
  cover: ProjectPhoto;
  photos: ProjectPhoto[];
  /** Facebook post the facts come from */
  fbPost: string;
  /** Open Graph image 1200×630 (scripts/realizacje-projekty.mjs) */
  og: string;
}

const PROJ = '/img/realizacje/projekty';
const fb = (id: string) => `https://www.facebook.com/permalink.php?id=61580449427158&story_fbid=${id}`;

/** New photo from public/img/realizacje/projekty/ */
const p = (name: string, width: number, height: number, alt: string, source: string, extra: Partial<ProjectPhoto> = {}): ProjectPhoto => ({
  src: `${PROJ}/${name}.webp`,
  width,
  height,
  alt,
  source,
  ...extra,
});

/** Photo already processed by scripts/images.mjs (manifest src/data/realizacje-zdjecia.ts) */
const fromManifest = (file: string, extra: Partial<ProjectPhoto> = {}): ProjectPhoto => {
  const z = photoByFile(file);
  if (!z) throw new Error(`realizacje.ts: brak zdjęcia ${file} w realizacje-zdjecia.ts`);
  return { src: photoSrc(z), width: z.width, height: z.height, alt: z.alt, source: `album nr ${z.albumNo}`, ...extra };
};

// ---------- P1: witryna 330 kg ----------
const p1Cover = fromManifest('montaz-szyby-minidzwig-przyssawka-01', {
  alt: 'Mini żuraw Hoeflon C4 osadza witrynę o wadze 330 kg w otworze budynku',
  phase: 'w-trakcie',
});

// ---------- P2: kamienica, Płock ----------
const p2Cover = p('drzwi-drewniane-kamienica-plock-front', 1200, 1600, 'Zielone dwuskrzydłowe drzwi drewniane z płycinami i łukowym naświetlem w ponad stuletniej kamienicy w Płocku', 'album nr 342', { phase: 'po', position: 'center 12%' });

// ---------- P3: dom szkieletowy ----------
const p3After1 = fromManifest('czarny-dom-drewniany-biale-okna-szprosy', {
  alt: 'Czarny dom szkieletowy z białymi oknami PCV ze szprosami i tarasem z desek',
  phase: 'po',
  pair: 'p3-a',
});

// ---------- P5: dom parterowy zimą ----------
const p5Cover = p('dom-parterowy-zima-front', 1600, 1200, 'Dom parterowy zimą: brama garażowa, drzwi wejściowe i okna w kolorze antracytu', 'album nr 358', { phase: 'po' });

// ---------- P6: wymiana bez remontu ----------
const p6After = p('wymiana-bez-remontu-po-szczyt', 789, 1052, 'Ten sam dom po wymianie: nowe okna PCV i antracytowe drzwi wejściowe', 'FB 2026-02-03 zdj. 2', { phase: 'po', pair: 'p6' });

// ---------- P7: okna drewnopodobne ----------
const p7Cover = p('okna-drewnopodobne-okno-narozne', 789, 1052, 'Okno narożne w okleinie drewnopodobnej na parterze domu w budowie', 'FB 2026-07-05 zdj. 6', { position: 'center 60%' });

// ---------- P8: DAKO / HST ----------
const p8Cover = p('okna-dako-hst-dom-widok-ogolny', 833, 1044, 'Dom parterowy z oknami DAKO w kolorze antracytu i dużymi przeszkleniami', 'FB 2026-08-09 zdj. 4');

/** Order = order on the hub (best case studies first). */
export const realizacje: Realizacja[] = [
  {
    slug: 'witryna-330-kg-mini-dzwig',
    title: 'Witryna 330 kg – montaż mini żurawiem',
    cardTitle: 'Witryna 330 kg osadzona mini żurawiem',
    seo: {
      title: 'Witryna 330 kg montowana mini żurawiem | Inter Windows',
      description:
        'Witryna o wadze 330 kg osadzona mini żurawiem Hoeflon C4: przygotowanie otworu, precyzyjne osadzenie i uszczelnienie. Systemy Veka, Wiśniowski i Wikęd.',
    },
    buildingType: 'Budynek parterowy w stanie surowym',
    date: '2026-01',
    postDate: '2026-01-14',
    photosDate: '2025-12-01',
    products: [
      { name: 'Witryna o wadze 330 kg', brand: 'VEKA', category: 'okna-pcv' },
      { name: 'Brama garażowa segmentowa', brand: 'Wiśniowski', category: 'bramy-garazowe' },
      { name: 'Drzwi wejściowe', brand: 'Wikęd', category: 'drzwi-zewnetrzne' },
    ],
    systems: ['Veka', 'Wiśniowski', 'Wikęd'],
    equipment: ['Mini żuraw Hoeflon C4 z przyssawką próżniową'],
    filters: ['okna', 'drzwi', 'bramy'],
    mainCategory: 'okna-pcv',
    scope: ['Przygotowanie otworu', 'Osadzenie witryny o wadze 330 kg mini żurawiem', 'Finalne uszczelnienie', 'Brama garażowa i drzwi wejściowe w tym samym budynku'],
    lead: 'Witrynę o wadze 330 kg osadziliśmy przy pomocy mini żurawia Hoeflon C4. Montaż objął przygotowanie otworu, precyzyjne osadzenie konstrukcji i finalne uszczelnienie.',
    highlights: ['Witryna o wadze 330 kg', 'Mini żuraw Hoeflon C4', 'Systemy Veka, Wiśniowski, Wikęd', 'Montaż w grudniu, przy śniegu'],
    challenge: [
      'Konstrukcja ważyła 330 kg, więc ręczne podnoszenie i ustawianie jej w otworze nie wchodziło w grę.',
      'Montaż przypadł na początek grudnia: zdjęcia z budowy pokazują śnieg i rozmiękły grunt wokół budynku.',
    ],
    solution: [
      'Na budowę przyjechał mini żuraw Hoeflon C4: kompaktowa maszyna na gąsienicach, z rozkładanymi podporami, wysięgnikiem i przyssawką próżniową. Wysięgnik podał witrynę w przygotowany otwór, a ekipa precyzyjnie ją osadziła.',
      'Na koniec połączenie konstrukcji z murem zostało uszczelnione.',
    ],
    result: [
      'Witryna jest osadzona, a w tym samym budynku zamontowaliśmy też bramę garażową i drzwi wejściowe. W realizacji zastosowaliśmy systemy Veka, Wiśniowski i Wikęd.',
    ],
    cover: p1Cover,
    photos: [
      fromManifest('dostawa-przeszklen-samochod', { alt: 'Dostawa dużego przeszklenia na stojaku samochodu, konstrukcja zabezpieczona folią', phase: 'przed' }),
      p('witryna-budynek-otwor-przed-montazem', 1600, 1200, 'Budynek parterowy w stanie surowym przed montażem stolarki, widok od frontu', 'album nr 326', { phase: 'przed' }),
      p('witryna-otwor-przed-montazem-widok-z-wnetrza', 1600, 1200, 'Widok z wnętrza budynku przez pusty otwór na przeszklenie czekające na samochodzie', 'album nr 325', { phase: 'przed' }),
      p('witryna-mini-zuraw-hoeflon-c4-rozladunek', 1200, 1600, 'Rozładunek mini żurawia Hoeflon C4 z lawety na zaśnieżonej budowie', 'album nr 327, rozmyta tablica rejestracyjna', { phase: 'w-trakcie' }),
      p1Cover,
      p('witryna-mini-zuraw-osadzanie-tafli', 1600, 1200, 'Mini żuraw z rozłożonymi podporami przy osadzaniu witryny w ścianie budynku', 'album nr 329', { phase: 'w-trakcie' }),
      fromManifest('montaz-szyby-minidzwig-przyssawka-02', { alt: 'Mini żuraw Hoeflon C4 z przyssawką próżniową przy zamontowanej witrynie', phase: 'w-trakcie' }),
      p('witryna-budynek-po-montazu', 1600, 1200, 'Budynek parterowy po montażu witryny i okien', 'album nr 337', { phase: 'po' }),
      p('witryna-budynek-przeszklenie-narozne', 1200, 1600, 'Duże przeszklenie w narożniku budynku po montażu', 'album nr 336', { phase: 'po' }),
      p('witryna-budynek-okno-i-brama-antracyt', 1600, 1200, 'Wysokie okno i brama garażowa w kolorze antracytu w tym samym budynku', 'album nr 332', { phase: 'po' }),
      p('witryna-budynek-brama-segmentowa-antracyt', 1600, 1200, 'Brama garażowa segmentowa w kolorze antracytu po montażu', 'album nr 333', { phase: 'po' }),
      p('witryna-budynek-drzwi-wejsciowe-antracyt', 1200, 1600, 'Drzwi wejściowe w kolorze antracytu z doświetlem bocznym', 'album nr 338', { phase: 'po' }),
    ],
    fbPost: fb('pfbid0MKURWvtrbZ5jdjW3MTCLGfdEHsMqcaBYoHPqciiD4Q2Dv55RdVwqogyfPBFCDQFtl'),
    og: `${PROJ}/og/witryna-330-kg-mini-dzwig.jpg`,
  },
  {
    slug: 'drzwi-drewniane-kamienica-plock',
    title: 'Drzwi drewniane 350 × 140 cm – kamienica, Płock',
    cardTitle: 'Drzwi drewniane 350 × 140 cm w stuletniej kamienicy',
    seo: {
      title: 'Drzwi drewniane w kamienicy, Płock | Inter Windows',
      description:
        'Montaż drzwi drewnianych 350 × 140 cm w ponad stuletniej kamienicy w Płocku: klasyczny charakter budynku, detal i precyzyjne osadzenie. Zdjęcia.',
    },
    town: 'Płock',
    buildingType: 'Kamienica, ponad 100 lat',
    date: '2026-01',
    postDate: '2026-01-16',
    photosDate: '2025-12-23',
    products: [{ name: 'Drzwi zewnętrzne drewniane, dwuskrzydłowe, z łukowym naświetlem', category: 'drzwi-zewnetrzne' }],
    systems: [],
    filters: ['drzwi'],
    mainCategory: 'drzwi-zewnetrzne',
    scope: ['Drzwi drewniane 350 × 140 cm', 'Montaż w istniejącym otworze kamienicy', 'Zachowanie klasycznego charakteru budynku'],
    lead: 'Drzwi drewniane o wymiarach 350 × 140 cm w ponad stuletniej kamienicy w Płocku. Budynek miał zachować klasyczny charakter, dlatego przy montażu liczyły się detal, geometria i precyzyjne osadzenie.',
    highlights: ['Drzwi 350 × 140 cm', 'Kamienica ponad stuletnia', 'Łukowe naświetle i płyciny', 'Klasyczny charakter zachowany'],
    challenge: [
      'Stuletnia kamienica ma swoje proporcje i detale: wysokie wejście zamknięte łukiem i kamienne obramienie otworu. Nowe drzwi miały się w ten charakter wpisać, a nie z nim konkurować.',
      'Przy wysokości 350 cm każda odchyłka od pionu i każda nierówna szczelina między skrzydłami byłaby od razu widoczna.',
    ],
    solution: [
      'Dwuskrzydłowe drzwi drewniane z płycinami i łukowym naświetlem osadziliśmy w istniejącym otworze kamienicy. Przy montażu pilnowaliśmy geometrii skrzydeł i ościeżnicy oraz dokładnego osadzenia w murze.',
    ],
    result: [
      'Wejście do kamienicy zachowało klasyczny wygląd: zielone drzwi dwuskrzydłowe z płycinami i łukowym naświetlem w kamiennym obramieniu.',
    ],
    cover: p2Cover,
    photos: [
      p2Cover,
      p('drzwi-drewniane-kamienica-plock-01', 1200, 1600, 'Łukowe naświetle nad drzwiami drewnianymi w ponad stuletniej kamienicy', 'album nr 339 (IMG_4279), rozmyta postać za szybą naświetla', { phase: 'po' }),
      fromManifest('zielone-drzwi-lukowe-kamienica-02', { alt: 'Drzwi drewniane 350 × 140 cm w kamiennym obramieniu kamienicy, ujęcie z boku', phase: 'po' }),
      p('drzwi-drewniane-kamienica-plock-od-wewnatrz', 1200, 1600, 'Drzwi drewniane w kamienicy widziane od wewnątrz, w ceglanym ościeżu', 'album nr 340', { phase: 'po' }),
    ],
    fbPost: fb('pfbid0HsjCNFV4cHUMX8dYk6JoKvhULs7mVqCPM7Czb5cWJ3j3krEXrQdSa5zvpPSmZKFpl'),
    og: `${PROJ}/og/drzwi-drewniane-kamienica-plock.jpg`,
  },
  {
    slug: 'wymiana-okien-i-drzwi-bez-remontu',
    title: 'Wymiana okien i drzwi – zamieszkany dom, bez remontu',
    cardTitle: 'Wymiana okien i drzwi w zamieszkanym domu, bez remontu',
    seo: {
      title: 'Wymiana okien i drzwi bez remontu | Inter Windows',
      description:
        'Wymiana okien i drzwi w zamieszkanym domu: demontaż starej stolarki, montaż nowej bez ingerencji w konstrukcję i bez remontu. Zdjęcia przed i po.',
    },
    buildingType: 'Dom jednorodzinny, zamieszkany',
    date: '2026-02',
    postDate: '2026-02-03',
    products: [
      { name: 'Okna PCV', brand: 'VEKA (etykiety na profilach)', category: 'okna-pcv' },
      { name: 'Drzwi wejściowe w kolorze antracytu z przeszkleniem', category: 'drzwi-zewnetrzne' },
      { name: 'Drzwi tarasowe', category: 'drzwi-tarasowe' },
    ],
    systems: ['VEKA'],
    filters: ['okna', 'drzwi', 'tarasowe'],
    mainCategory: 'okna-pcv',
    scope: ['Demontaż starej stolarki', 'Montaż nowych okien', 'Montaż drzwi wejściowych i tarasowych', 'Bez ingerencji w konstrukcję budynku'],
    lead: 'Nie każda wymiana okien i drzwi oznacza generalny remont. W zamieszkanym domu zdemontowaliśmy starą stolarkę i zamontowaliśmy nowe okna oraz drzwi bez ingerencji w konstrukcję budynku.',
    highlights: ['Dom zamieszkany w trakcie prac', 'Bez ingerencji w konstrukcję', 'Bez remontu po wymianie', 'Zdjęcia przed i po'],
    challenge: [
      'Dom był zamieszkany, a elewacja i wnętrza wykończone. Stolarkę trzeba było wymienić tak, żeby po pracach nie był potrzebny remont.',
    ],
    solution: [
      'Ekipa zdemontowała stare okna i drzwi, a nowe osadziła bez ingerencji w konstrukcję budynku. Prace poszły szybko i czysto.',
    ],
    result: [
      'Nowe okna PCV, antracytowe drzwi wejściowe z przeszkleniem i drzwi tarasowe. Po wymianie nie trzeba było robić remontu.',
    ],
    cover: p6After,
    photos: [
      p('wymiana-bez-remontu-przed-szczyt', 789, 785, 'Dom przed wymianą: stare okna i stare drzwi wejściowe', 'FB 2026-02-03 zdj. 1, przycięte (bez napisu z posta)', { phase: 'przed', pair: 'p6' }),
      p6After,
      p('wymiana-bez-remontu-drzwi-wejsciowe-antracyt', 789, 1052, 'Nowe drzwi wejściowe w kolorze antracytu z przeszkleniem i nowe okno obok', 'FB 2026-02-03 zdj. 3', { phase: 'po' }),
      p('wymiana-bez-remontu-okna-sciana-boczna', 789, 1052, 'Nowe okna PCV w bocznej ścianie zamieszkanego domu', 'FB 2026-02-03 zdj. 4', { phase: 'po' }),
      p('wymiana-bez-remontu-drzwi-tarasowe', 789, 1052, 'Nowe drzwi tarasowe z folią ochronną na ramach, na zadaszonym tarasie', 'FB 2026-02-03 zdj. 5', { phase: 'po' }),
      p('wymiana-bez-remontu-elewacja-ogrodowa', 679, 1052, 'Elewacja od strony ogrodu z nowymi oknami PCV', 'FB 2026-02-03 zdj. 6, przycięte z lewej', { phase: 'po' }),
    ],
    fbPost: fb('pfbid0xCvE7xd9RhkvpYJ42Q4ZGfp6v9Ph7AKVSEPQ1BQ7DP8Wni8QPbgQpnfdUmNwWsoHl'),
    og: `${PROJ}/og/wymiana-okien-i-drzwi-bez-remontu.jpg`,
  },
  {
    slug: 'okna-ze-szprosami-dom-szkieletowy',
    title: 'Okna ze szprosami – dom szkieletowy',
    cardTitle: 'Okna ze szprosami i klamki retro w domu szkieletowym',
    seo: {
      title: 'Okna PCV ze szprosami w domu szkieletowym | Inter Windows',
      description:
        'Dom szkieletowy od surowej konstrukcji z płyt OSB do wykończonego budynku: białe okna PCV ze szprosami i klamki w stylu retro. Zdjęcia przed i po montażu.',
    },
    buildingType: 'Dom szkieletowy',
    date: '2026-01',
    postDate: '2026-01-19',
    photosDate: '2025-09-06',
    products: [
      { name: 'Okna PCV ze szprosami', category: 'okna-pcv' },
      { name: 'Klamki w stylu retro' },
    ],
    systems: [],
    filters: ['okna'],
    mainCategory: 'okna-pcv',
    scope: ['Okna PCV ze szprosami, także w drzwiach balkonowych', 'Klamki w stylu retro', 'Montaż w domu o konstrukcji szkieletowej'],
    lead: 'Dom szkieletowy pokazany od surowej konstrukcji z płyt OSB do wykończonego budynku. Białe okna PCV ze szprosami i klamki w stylu retro dały mu klasykę w nowoczesnym wydaniu.',
    highlights: ['Okna PCV ze szprosami', 'Klamki w stylu retro', 'Dom szkieletowy', 'Zdjęcia przed i po'],
    challenge: [
      'Dom ma prostą, tradycyjną bryłę, a na zdjęciach „po” widać ciemną elewację z desek. Do takiej architektury pasuje klasyczny podział okien, a nie jedna gładka tafla szkła.',
    ],
    solution: [
      'Zamontowaliśmy białe okna PCV ze szprosami, także w dwuskrzydłowych drzwiach balkonowych od strony tarasu. Okna i drzwi dostały klamki w stylu retro.',
    ],
    result: [
      'Białe okna ze szprosami mocno odcinają się od czarnej elewacji, a klamki retro podtrzymują klasyczny styl także od środka. Klasyka w nowoczesnym wydaniu.',
    ],
    cover: p3After1,
    photos: [
      p('dom-szkieletowy-przed-montazem-01', 1001, 762, 'Dom szkieletowy w stanie surowym, ściany z płyt OSB, przed montażem okien', 'FB 2026-01-19 zdj. 1', { phase: 'przed', pair: 'p3-a' }),
      p3After1,
      p('dom-szkieletowy-przed-montazem-02', 1001, 762, 'Dom szkieletowy z płyt OSB z rusztowaniem, dłuższa ściana przed montażem okien', 'FB 2026-01-19 zdj. 2', { phase: 'przed', pair: 'p3-b' }),
      p('dom-szkieletowy-po-okna-szprosy-taras', 1600, 1200, 'Białe okna i drzwi balkonowe ze szprosami w czarnej elewacji z desek, widok od tarasu', 'album nr 257', { phase: 'po', pair: 'p3-b' }),
      fromManifest('okno-biale-szprosy-widok-z-wnetrza', { alt: 'Białe okno dwuskrzydłowe ze szprosami od wewnątrz, za szybą las', phase: 'po' }),
      p('dom-szkieletowy-drzwi-balkonowe-szprosy-widok-na-taras', 1200, 1600, 'Dwuskrzydłowe drzwi balkonowe ze szprosami z widokiem na taras', 'album nr 254', { phase: 'po' }),
      p('dom-szkieletowy-drzwi-balkonowe-szprosy-wnetrze', 1200, 1600, 'Otwarte drzwi balkonowe ze szprosami w jasnym wnętrzu domu szkieletowego', 'album nr 253', { phase: 'po' }),
      p('dom-szkieletowy-klamki-retro-detal', 1200, 1600, 'Klamki w stylu retro na białych drzwiach balkonowych, zbliżenie', 'album nr 255', { phase: 'po' }),
      fromManifest('okno-biale-szprosy-klamka-detal', { alt: 'Klamka w stylu retro na białym oknie ze szprosami', phase: 'po' }),
    ],
    fbPost: fb('pfbid0K3SPhuRLCMUWvr1pQE4W7zAh717HAmWeYKyDLn4Xm44nPYsRoF5LwmksyPBUCDuSl'),
    og: `${PROJ}/og/okna-ze-szprosami-dom-szkieletowy.jpg`,
  },
  {
    slug: 'okna-dako-hst-dom-parterowy',
    title: 'Okna DAKO z drzwiami HST – dom parterowy',
    cardTitle: 'Okna DAKO, drzwi HST, brama i rolety w domu parterowym',
    seo: {
      title: 'Okna DAKO i drzwi HST w domu parterowym | Inter Windows',
      description:
        'Od pomiaru po montaż: okna DAKO na profilu VEKA z systemem HST, drzwi Erkado i Wikęd, brama Wiśniowski, rolety zewnętrzne i szczelny montaż Soudal.',
    },
    buildingType: 'Dom parterowy w stanie surowym',
    date: '2026-08',
    postDate: '2026-08-09',
    products: [
      { name: 'Okna na profilu VEKA', brand: 'DAKO', category: 'okna-pcv' },
      { name: 'Drzwi podnoszono-przesuwne HST', brand: 'DAKO / VEKA', category: 'drzwi-tarasowe' },
      { name: 'Drzwi', brand: 'Erkado, Wikęd', category: 'drzwi-zewnetrzne' },
      { name: 'Brama garażowa', brand: 'Wiśniowski', category: 'bramy-garazowe' },
      { name: 'Rolety zewnętrzne', category: 'rolety-zewnetrzne' },
    ],
    systems: ['DAKO', 'VEKA', 'HST', 'Erkado', 'Wikęd', 'Wiśniowski', 'Soudal'],
    equipment: ['Szczelny montaż w systemie Soudal'],
    filters: ['okna', 'tarasowe', 'drzwi', 'bramy', 'oslony'],
    mainCategory: 'okna-pcv',
    scope: ['Pomiar i doradztwo', 'Dobór stolarki', 'Okna i drzwi HST', 'Drzwi, brama garażowa i rolety zewnętrzne', 'Szczelny montaż w systemie Soudal'],
    lead: 'Od pomiaru aż po ostatni detal: klient dostał pełną obsługę – pomiar, doradztwo, dobór stolarki i montaż. Okna DAKO na profilu VEKA z systemem HST, drzwi Erkado i Wikęd, brama Wiśniowski i rolety zewnętrzne.',
    highlights: ['Okna DAKO na profilu VEKA', 'Drzwi podnoszono-przesuwne HST', 'Drzwi Erkado i Wikęd', 'Brama Wiśniowski i rolety zewnętrzne'],
    challenge: [
      'W jednym domu spotkały się okna, drzwi HST, drzwi, brama garażowa i rolety zewnętrzne od kilku producentów. Wszystko trzeba było dobrać do siebie i zamontować szczelnie.',
    ],
    solution: [
      'Całość poprowadziliśmy sami: pomiar, doradztwo i dobór stolarki, a potem montaż. Okna i drzwi HST osadziliśmy szczelnie w systemie Soudal, zamontowaliśmy też drzwi, bramę garażową Wiśniowski i rolety zewnętrzne.',
    ],
    result: [
      'Dom parterowy z kompletem stolarki od jednej firmy: okna DAKO na profilu VEKA w kolorze antracytu, drzwi HST, drzwi Erkado i Wikęd, brama i rolety.',
    ],
    cover: p8Cover,
    photos: [
      p8Cover,
      p('okna-dako-hst-naroznik-duze-przeszklenia', 833, 1044, 'Narożnik domu z dużymi przeszkleniami w kolorze antracytu', 'FB 2026-08-09 zdj. 6', { phase: 'po' }),
      p('okna-dako-hst-okna-pod-okapem', 833, 1044, 'Okna i duże przeszklenie pod drewnianym okapem dachu', 'FB 2026-08-09 zdj. 3', { phase: 'po' }),
      p('okna-dako-hst-naroznik-okna', 833, 1044, 'Narożne okna w domu parterowym w stanie surowym', 'FB 2026-08-09 zdj. 5', { phase: 'po' }),
      p('okna-dako-hst-okno-i-drzwi-wejsciowe', 833, 1044, 'Wysokie okno i drzwi wejściowe w kolorze antracytu, taśma VEKA na ramie', 'FB 2026-08-09 zdj. 9', { phase: 'po' }),
      p('okna-dako-hst-roleta-zewnetrzna', 1080, 1352, 'Roleta zewnętrzna częściowo opuszczona na oknie w kolorze antracytu', 'FB 2026-08-13 zdj. 1 (= zdj. 10 z posta 09.08)', { phase: 'po' }),
      p('okna-dako-hst-dom-niebo', 833, 1044, 'Dom parterowy z oknami w kolorze antracytu na tle błękitnego nieba', 'FB 2026-08-09 zdj. 8', { phase: 'po' }),
      p('okna-dako-hst-dom-z-busem-ekipy', 833, 1044, 'Dom parterowy, przed nim bus ekipy Inter Windows', 'FB 2026-08-09 zdj. 1, rozmyta tablica', { phase: 'po' }),
      p('okna-dako-hst-dom-i-bus', 833, 1044, 'Dom parterowy po montażu okien, obok bus ekipy Inter Windows', 'FB 2026-08-09 zdj. 7, rozmyta tablica', { phase: 'po' }),
      p('okna-dako-hst-bus-przy-budowie', 833, 1044, 'Bus z logo Inter Windows przy ścianie z nowymi oknami', 'FB 2026-08-09 zdj. 2, rozmyta tablica', { phase: 'po' }),
    ],
    fbPost: fb('pfbid0W3Si3tahjQwh2sbo3cFKockVzVTqUYpG7hgwVbm1NMvy28Ds4yhQjYra1WVpb13rl'),
    og: `${PROJ}/og/okna-dako-hst-dom-parterowy.jpg`,
  },
  {
    slug: 'okna-drzwi-brama-dom-parterowy',
    title: 'Okna, drzwi i brama garażowa – dom parterowy',
    cardTitle: 'Okna, drzwi i brama garażowa w domu parterowym',
    seo: {
      title: 'Okna, drzwi i brama w domu parterowym | Inter Windows',
      description:
        'Pomiar, doradztwo, dostawa i montaż okien, drzwi i bramy garażowej w domu parterowym w stanie surowym. Jedna ekipa, jeden kontakt. Zdjęcia z montażu zimą.',
    },
    buildingType: 'Dom parterowy w stanie surowym',
    date: '2026-01',
    postDate: '2026-01-29',
    photosDate: '2026-01-28',
    products: [
      { name: 'Okna', category: 'okna' },
      { name: 'Drzwi', category: 'drzwi-zewnetrzne' },
      { name: 'Brama garażowa segmentowa', category: 'bramy-garazowe' },
    ],
    systems: [],
    filters: ['okna', 'drzwi', 'bramy'],
    mainCategory: 'okna',
    scope: ['Pomiar', 'Doradztwo', 'Dostawa', 'Montaż okien, drzwi i bramy garażowej'],
    lead: 'Inwestor powierzył nam pomiar, doradztwo, dostawę i montaż okien, drzwi oraz bramy garażowej. Standardowy montaż przygotował budynek do kolejnych etapów prac.',
    highlights: ['Okna, drzwi i brama garażowa', 'Pomiar, doradztwo, dostawa i montaż', 'Jedna ekipa, jeden kontakt', 'Montaż zimą'],
    challenge: [
      'Zakres obejmował trzy rodzaje stolarki: okna, drzwi i bramę garażową. Prace przypadły na koniec stycznia, kiedy działka była pod śniegiem.',
    ],
    solution: [
      'Całość poprowadziliśmy od pomiaru i doradztwa, przez dostawę, po montaż. Zastosowaliśmy montaż standardowy, który przygotował budynek do kolejnych etapów budowy.',
    ],
    result: [
      'Budynek ma zamontowane okna i drzwi w kolorze antracytu oraz antracytową bramę segmentową. Jedna ekipa, jeden kontakt, pełna odpowiedzialność za całość.',
    ],
    cover: p5Cover,
    photos: [
      p5Cover,
      p('dom-parterowy-zima-widok-ogolny', 1200, 1600, 'Dom parterowy w stanie surowym na zaśnieżonej działce po montażu stolarki', 'album nr 344', { phase: 'po' }),
      p('dom-parterowy-zima-drzwi-tarasowe-przesuwne', 1600, 1200, 'Przesuwne drzwi tarasowe i okna w ścianie z bloczków silikatowych', 'album nr 349', { phase: 'po' }),
      p('dom-parterowy-zima-naroznik-okna', 1200, 1600, 'Narożnik domu parterowego z nowymi oknami, za domem sosny', 'album nr 343', { phase: 'po' }),
      p('dom-parterowy-zima-sciana-boczna-okna', 1600, 1200, 'Boczna ściana domu z rzędem okien w kolorze antracytu', 'album nr 352', { phase: 'po' }),
      p('dom-parterowy-zima-okno-antracyt', 1600, 1200, 'Okno w kolorze antracytu w ścianie z bloczków silikatowych', 'album nr 353', { phase: 'po' }),
      p('dom-parterowy-zima-brama-i-wejscie', 1600, 1200, 'Brama garażowa segmentowa i wejście pod zadaszeniem', 'album nr 355', { phase: 'po' }),
      p('dom-parterowy-zima-drzwi-wejsciowe-antracyt', 1200, 1600, 'Drzwi wejściowe w kolorze antracytu z pionowym przeszkleniem obok bramy garażowej', 'album nr 356', { phase: 'po' }),
      p('dom-parterowy-zima-brama-segmentowa-antracyt', 1200, 1600, 'Brama garażowa segmentowa w kolorze antracytu, zbliżenie', 'album nr 357', { phase: 'po' }),
    ],
    fbPost: fb('pfbid01DDeYe5cY5SANQjtidpQGLTWu7DeAtKK3vFE89kkre4efn4pG1brrYP6KDka4LzCl'),
    og: `${PROJ}/og/okna-drzwi-brama-dom-parterowy.jpg`,
  },
  {
    slug: 'okna-drewnopodobne-zaluzje-fasadowe',
    title: 'Okna drewnopodobne i żaluzje fasadowe – dom jednorodzinny',
    cardTitle: 'Okna drewnopodobne, brama 5 m i żaluzje fasadowe',
    seo: {
      title: 'Okna drewnopodobne VEKA i żaluzje fasadowe | Inter Windows',
      description:
        'Okna VEKA w okleinie drewnopodobnej osadzone na taśmach Illbruck, brama Wiśniowski szerokości 5 m i żaluzje fasadowe, także na oknie narożnym. Zdjęcia.',
    },
    buildingType: 'Dom jednorodzinny w budowie',
    date: '2026-07',
    postDate: '2026-07-05',
    products: [
      { name: 'Okna na profilu VEKA w okleinie drewnopodobnej', brand: 'VEKA', category: 'okna-pcv' },
      { name: 'Brama garażowa szer. 5 m w okleinie drewnopodobnej', brand: 'Wiśniowski', category: 'bramy-garazowe' },
      { name: 'Żaluzje fasadowe, także na oknie narożnym', category: 'zaluzje-fasadowe' },
    ],
    systems: ['VEKA', 'Illbruck', 'Wiśniowski'],
    equipment: ['Szczelny montaż na taśmach Illbruck'],
    filters: ['okna', 'bramy', 'oslony'],
    mainCategory: 'okna-pcv',
    scope: ['Okna w okleinie drewnopodobnej, w tym okno narożne', 'Szczelny montaż na taśmach Illbruck', 'Brama garażowa o szerokości 5 m', 'Żaluzje fasadowe, również na oknie narożnym'],
    lead: 'Okna na profilu VEKA w okleinie drewnopodobnej, szczelnie zamontowane na taśmach Illbruck. Do tego brama garażowa Wiśniowski o szerokości 5 m i żaluzje fasadowe – także na narożnym oknie.',
    highlights: ['Okna VEKA w okleinie drewnopodobnej', 'Montaż na taśmach Illbruck', 'Brama Wiśniowski szer. 5 m', 'Żaluzje fasadowe na oknie narożnym'],
    challenge: [
      'Dom ma duże okno narożne i szeroką bramę garażową. Okna i brama miały pasować do siebie wykończeniem, a żaluzje fasadowe miały osłaniać także okno narożne.',
    ],
    solution: [
      'Okna VEKA zamontowaliśmy szczelnie na taśmach Illbruck. Bramę Wiśniowski o szerokości 5 m dobraliśmy w okleinie drewnopodobnej, a nad oknami, także nad narożnym, zamontowaliśmy żaluzje fasadowe.',
    ],
    result: [
      'Okna i brama w drewnopodobnej okleinie tworzą spójną całość, a żaluzje fasadowe pozwalają regulować ilość światła wpadającego do pomieszczeń.',
    ],
    cover: p7Cover,
    photos: [
      p('okna-drewnopodobne-dom-widok-ogolny', 789, 1052, 'Dom w budowie z oknami w okleinie drewnopodobnej, w tym oknem narożnym na parterze', 'FB 2026-07-05 zdj. 1', { phase: 'po' }),
      p7Cover,
      p('okna-drewnopodobne-okno-z-kaseta-zaluzji', 1080, 1352, 'Duże okno w okleinie drewnopodobnej z kasetą żaluzji fasadowej nad nim', 'FB 2026-08-13 zdj. 3 (= zdj. 7 z posta 05.07)', { phase: 'po' }),
      p('okna-drewnopodobne-zaluzja-fasadowa-opuszczona', 1080, 1352, 'Opuszczona żaluzja fasadowa z ciemnymi lamelami na dużym oknie', 'FB 2026-08-13 zdj. 2 (= zdj. 9 z posta 05.07)', { phase: 'po' }),
      p('okna-drewnopodobne-okno-narozne-zaluzje-od-wewnatrz', 789, 1052, 'Okno narożne od wewnątrz, za szybą lamele żaluzji fasadowej', 'FB 2026-07-05 zdj. 10, rozmyta postać w tle', { phase: 'po' }),
      p('okna-drewnopodobne-brama-garazowa-5-m', 789, 1052, 'Brama garażowa Wiśniowski szerokości 5 m w okleinie drewnopodobnej', 'FB 2026-07-05 zdj. 3', { phase: 'po' }),
      p('okna-drewnopodobne-brama-garazowa-od-wewnatrz', 1001, 762, 'Brama garażowa segmentowa widziana od wewnątrz garażu', 'FB 2026-07-05 zdj. 4', { phase: 'po' }),
      p('okna-drewnopodobne-sciana-z-drzwiami-tarasowymi', 789, 1052, 'Ściana domu z dużym przeszkleniem i oknami w okleinie drewnopodobnej', 'FB 2026-07-05 zdj. 2', { phase: 'po' }),
    ],
    fbPost: fb('pfbid02Dd8YXQPnv9xAsuPW164KV5NUJdW78zhAwGYRvrBdfwJgJsj43GRNqNq8RUHUocnel'),
    og: `${PROJ}/og/okna-drewnopodobne-zaluzje-fasadowe.jpg`,
  },
];

/** Non-breaking spaces in numbers with units and in 'a × b' (so '330 kg' or '350 × 140 cm' never wrap). */
const NB = String.fromCharCode(160);
export const nbsp = (s: string) => s.replace(/(\d) (?=(kg|cm|m)\b)/g, `$1${NB}`).replace(/ × /g, `${NB}×${NB}`);

export const realizacjaBySlug = (slug: string) => realizacje.find((r) => r.slug === slug);

/** 800 px variant of a 1600 px file */
export const small = (src: string) => src.replace(/\.webp$/, '-800.webp');
export const smallSizeOf = (ph: Pick<ProjectPhoto, 'width' | 'height'>) => {
  const k = Math.min(1, 800 / Math.max(ph.width, ph.height));
  return { width: Math.round(ph.width * k), height: Math.round(ph.height * k) };
};

const MONTHS = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
/** '2025-12-01' or '2025-12' → 'grudzień 2025' */
export const monthYear = (d: string) => {
  const [y, m] = d.split('-');
  return `${MONTHS[Number(m) - 1]} ${y}`;
};

/** When the work was done: date of the original photos if we have them, otherwise the month of the post. */
export const workMonth = (r: Realizacja) => monthYear(r.photosDate ?? r.date);

/** Photos from the album manifest that do not belong to any project (the hub's loose gallery). */
export const loosePhotos = (): (RealizacjaZdjecie & { filterKeys: FilterKey[] })[] => {
  const used = new Set(realizacje.flatMap((r) => r.photos.map((ph) => ph.src)));
  // IMG_4279 is used in a privacy-blurred copy (projekty/drzwi-drewniane-kamienica-plock-01) – keep the original out
  const replaced = new Set(['zielone-drzwi-lukowe-kamienica-01']);
  return zdjecia
    .filter((z) => z.publish && !used.has(photoSrc(z)) && !replaced.has(z.file))
    .map((z) => ({
      ...z,
      filterKeys: [...new Set(z.tags.map((t) => tagFilters[t]).filter((k): k is FilterKey => !!k))],
    }));
};

/** Projects sharing the most filter groups with `r` (same order as the hub on ties). */
export const relatedTo = (r: Realizacja, count = 3) =>
  realizacje
    .filter((o) => o.slug !== r.slug)
    .map((o, i) => ({ o, i, score: o.filters.filter((f) => r.filters.includes(f)).length }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, count)
    .map((x) => x.o);
