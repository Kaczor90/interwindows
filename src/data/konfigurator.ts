// Konfigurator okien (/konfigurator/) – dane opcji. PROTOTYP.
//
// Zasady:
// - Wszystko z `tbc: true` (i komentarzem „do potwierdzenia”) czeka na potwierdzenie przez Inter Windows / DAKO.
//   Pełna lista: docs/konfigurator-wymagania.md §7.
// - Wymiary graniczne (`limits`) i szerokości profili (`faces`) to WARTOŚCI PROTOTYPOWE – służą do rysunku
//   i podstawowej walidacji. Nie są danymi producenta i nie mogą trafić do oferty.
// - Bez cen. Bez współczynników Uw/Ug (nie mamy ich od producenta – patrz src/data/oferta.ts).
// - Fakty o systemach pochodzą wyłącznie z src/data/oferta.ts.
// Plik jest importowany przez stronę (render opcji w HTML) i przez skrypt przeglądarki (src/scripts/konfigurator.ts).

export type ProductType = 'okno' | 'balkonowe' | 'hst';
export type SystemId = 'pcv' | 'alu' | 'drewno';
/** fix = szyba stała w ramie; r = rozwierne; ru = rozwierno-uchylne; u = uchylne; s = przesuwne (HST).
 *  -l / -p: zawiasy po lewej / prawej stronie (dla przesuwnych: kierunek przesuwu), WIDOK OD WEWNĄTRZ. */
export type Opening = 'fix' | 'r-l' | 'r-p' | 'ru-l' | 'ru-p' | 'u' | 's-l' | 's-p';

export interface Choice<T extends string | number = string> {
  id: T;
  label: string;
  desc?: string;
  /** czeka na potwierdzenie (true) albo krótki opis, co trzeba potwierdzić */
  tbc?: boolean | string;
}

// ---------------------------------------------------------------- kroki

export const steps = [
  { id: 'typ', label: 'Typ', title: 'Co planujesz?' },
  { id: 'ksztalt', label: 'Kształt', title: 'Kształt i podział' },
  { id: 'wymiary', label: 'Wymiary', title: 'Wymiary' },
  { id: 'system', label: 'System', title: 'Materiał i system' },
  { id: 'kolor', label: 'Kolor', title: 'Kolor od zewnątrz i od wewnątrz' },
  { id: 'szyby', label: 'Szyby', title: 'Szyby i szprosy' },
  { id: 'okucia', label: 'Okucia', title: 'Okucia i klamka' },
  { id: 'dodatki', label: 'Dodatki', title: 'Rolety, moskitiery, parapety' },
  { id: 'montaz', label: 'Montaż', title: 'Montaż' },
  { id: 'projekt', label: 'Projekt', title: 'Twój projekt' },
  { id: 'wysylka', label: 'Wysyłka', title: 'Podsumowanie i pomiar' },
] as const;
export type StepId = (typeof steps)[number]['id'];

// ---------------------------------------------------------------- krok 1: co planujesz

export const productTypes: (Choice<ProductType> & { noun: string })[] = [
  { id: 'okno', label: 'Okno', noun: 'okno', desc: 'Jedno lub kilka skrzydeł, także z naświetlem.' },
  { id: 'balkonowe', label: 'Drzwi balkonowe', noun: 'drzwi balkonowe', desc: 'Wyjście na balkon lub taras, otwierane jak okno.' },
  {
    id: 'hst',
    label: 'Drzwi przesuwne HST',
    noun: 'drzwi przesuwne HST',
    desc: 'Podnoszono-przesuwne: duże przeszklenie i niski próg.',
    // do potwierdzenia: czy Inter Windows sprzedaje i montuje HST (docs/do-uzupelnienia.md – drzwi tarasowe)
    tbc: 'dostępność do potwierdzenia',
  },
];

/** kontekst całego projektu (nie pojedynczej pozycji) */
export const contexts: Choice<'nowy' | 'wymiana'>[] = [
  { id: 'nowy', label: 'Nowy dom', desc: 'Budowa, stan surowy.' },
  { id: 'wymiana', label: 'Wymiana okien', desc: 'Zamieszkały dom lub mieszkanie.' },
];

// ---------------------------------------------------------------- krok 2: kształt i podział

export const openings: Record<Opening, { label: string; short: string; hinge?: 'l' | 'p'; tilt?: boolean; slide?: 'l' | 'p' }> = {
  fix: { label: 'stałe (szyba w ramie)', short: 'stałe' },
  'r-l': { label: 'rozwierne lewe', short: 'rozwierne L', hinge: 'l' },
  'r-p': { label: 'rozwierne prawe', short: 'rozwierne P', hinge: 'p' },
  'ru-l': { label: 'rozwierno-uchylne lewe', short: 'rozw.-uchylne L', hinge: 'l', tilt: true },
  'ru-p': { label: 'rozwierno-uchylne prawe', short: 'rozw.-uchylne P', hinge: 'p', tilt: true },
  u: { label: 'uchylne', short: 'uchylne', tilt: true },
  's-l': { label: 'przesuwne w lewo', short: 'przesuwne ←', slide: 'l' },
  's-p': { label: 'przesuwne w prawo', short: 'przesuwne →', slide: 'p' },
};

/** Kolejność przełączania po kliknięciu skrzydła na rysunku = lista dozwolonych typów otwierania.
 *  Do potwierdzenia: nazewnictwo L/P według konwencji DAKO (przyjęto: zawiasy po lewej patrząc od wewnątrz). */
export const openingCycle: Record<'okno' | 'balkonowe' | 'hst' | 'naswietle', Opening[]> = {
  okno: ['fix', 'r-l', 'r-p', 'ru-l', 'ru-p', 'u'],
  balkonowe: ['fix', 'r-l', 'r-p', 'ru-l', 'ru-p'],
  hst: ['fix', 's-l', 's-p'],
  naswietle: ['fix', 'u'],
};

export interface Template {
  id: string;
  label: string;
  type: ProductType;
  /** rzędy od góry; h = udział w wysokości, cols = udziały szerokości pól; transom = naświetle */
  rows: { h: number; cols: number[]; transom?: boolean }[];
  /** domyślne otwieranie pól: rzędy od góry, w rzędzie od lewej (widok od wewnątrz) */
  openings: Opening[];
  /** domyślne proporcje rysunku (mm) */
  size: { w: number; h: number };
  /** PROTOTYP – do potwierdzenia dla każdego systemu: [min, max] w mm */
  limits: { w: [number, number]; h: [number, number] };
  tbc?: boolean | string;
}

export const templates: Template[] = [
  { id: 'okno-1', label: '1-skrzydłowe', type: 'okno', rows: [{ h: 1, cols: [1] }], openings: ['ru-l'], size: { w: 900, h: 1200 }, limits: { w: [400, 1400], h: [400, 2000] } },
  { id: 'okno-2', label: '2-skrzydłowe', type: 'okno', rows: [{ h: 1, cols: [1, 1] }], openings: ['r-l', 'ru-p'], size: { w: 1500, h: 1400 }, limits: { w: [800, 2600], h: [500, 2200] } },
  { id: 'okno-3', label: '3-skrzydłowe', type: 'okno', rows: [{ h: 1, cols: [1, 1, 1] }], openings: ['ru-l', 'fix', 'ru-p'], size: { w: 2200, h: 1400 }, limits: { w: [1200, 3600], h: [500, 2200] } },
  { id: 'okno-fix', label: 'Fix + skrzydło', type: 'okno', rows: [{ h: 1, cols: [1.25, 1] }], openings: ['fix', 'ru-p'], size: { w: 1800, h: 1500 }, limits: { w: [800, 3000], h: [500, 2400] } },
  {
    id: 'okno-naswietle',
    label: 'Z naświetlem górnym',
    type: 'okno',
    rows: [{ h: 0.32, cols: [1], transom: true }, { h: 0.68, cols: [1, 1] }],
    openings: ['u', 'r-l', 'ru-p'],
    size: { w: 1500, h: 2000 },
    limits: { w: [700, 2600], h: [1200, 2800] },
  },
  { id: 'balkon-1', label: 'Balkonowe 1-skrzydłowe', type: 'balkonowe', rows: [{ h: 1, cols: [1] }], openings: ['ru-l'], size: { w: 900, h: 2200 }, limits: { w: [700, 1200], h: [1900, 2500] } },
  { id: 'balkon-2', label: 'Balkonowe 2-skrzydłowe', type: 'balkonowe', rows: [{ h: 1, cols: [1, 1] }], openings: ['r-l', 'ru-p'], size: { w: 1600, h: 2200 }, limits: { w: [1200, 2400], h: [1900, 2500] } },
  // HST – cała grupa do potwierdzenia (systemy, schematy, wymiary graniczne)
  { id: 'hst-2', label: 'HST – 2 części', type: 'hst', rows: [{ h: 1, cols: [1, 1] }], openings: ['fix', 's-l'], size: { w: 3200, h: 2250 }, limits: { w: [2000, 6000], h: [1900, 2700] }, tbc: true },
  { id: 'hst-4', label: 'HST – 4 części', type: 'hst', rows: [{ h: 1, cols: [1, 1, 1, 1] }], openings: ['fix', 's-l', 's-p', 'fix'], size: { w: 5600, h: 2250 }, limits: { w: [3600, 9000], h: [1900, 2700] }, tbc: true },
];

export const defaultTemplate: Record<ProductType, string> = { okno: 'okno-2', balkonowe: 'balkon-1', hst: 'hst-2' };

// ---------------------------------------------------------------- krok 4: system

export interface System extends Choice<SystemId> {
  name: string;
  line: string;
  points: string[];
  /** szerokości widoczne na rysunku (mm) – wartości poglądowe, nie dane producenta */
  faces: { frame: number; sash: number; mullion: number };
}

export const systems: System[] = [
  {
    id: 'pcv',
    label: 'PVC',
    name: 'DAKO DPQ-82',
    line: 'profil VEKA Softline 82 MD',
    desc: 'Okno, które proponujemy najczęściej. Profil o głębokości 82 mm, z kilkoma komorami i uszczelką środkową (MD), w klasie A, czyli z grubszymi ściankami zewnętrznymi.',
    points: ['najczęstszy wybór do domów jednorodzinnych', 'okleiny drewnopodobne i kolory gładkie', 'mamy też okna PCV Sonarol i All Windows Group'],
    faces: { frame: 62, sash: 78, mullion: 84 },
  },
  {
    id: 'alu',
    label: 'Aluminium',
    name: 'Aluprof z oferty DAKO',
    line: 'np. linie DA-77 i DA-70N',
    desc: 'Sztywny profil pozwala na węższą ramę i duże tafle szkła: przeszklenia od podłogi do stropu, okna narożne, fixy. Profile mają przekładki termiczne. Konkretną linię dobieramy do projektu.',
    points: ['duże przeszklenia i wąska rama', 'kolory z palety RAL, inne od środka i od zewnątrz', 'linię i jej parametry potwierdzamy w ofercie'],
    faces: { frame: 52, sash: 64, mullion: 72 },
  },
  {
    id: 'drewno',
    label: 'Drewno',
    name: 'DAKO drewno i drewno-aluminium',
    line: 'np. DDF-68, DDR-68, DDA-78',
    desc: 'Naturalny materiał i klasyczne proporcje. Wersja drewniano-aluminiowa ma od zewnątrz nakładkę z aluminium, która chroni drewno przed deszczem i słońcem.',
    points: ['domy o klasycznej bryle, rezydencje, kamienice', 'lakier kryjący lub transparentny', 'okresowa pielęgnacja powłoki'],
    faces: { frame: 68, sash: 82, mullion: 92 },
  },
];

// ---------------------------------------------------------------- krok 5: kolor

export interface Finish {
  id: string;
  label: string;
  /** kod koloru – tylko tam, gdzie znamy go z materiałów projektu */
  code?: string;
  kind: 'gladki' | 'okleina' | 'lakier';
  /** kolor na rysunku (przybliżony, ekranowy) */
  hex: string;
  /** kolor słojów – okleiny drewnopodobne rysowane jako delikatny wzór */
  grain?: string;
  systems: SystemId[];
}

/** Cała paleta do potwierdzenia dla każdego systemu (dostępność, kody, okleina jedno- czy dwustronna, dopłaty).
 *  Na stronie pokazujemy jeden zbiorczy znacznik „do potwierdzenia”. */
export const FINISHES_TBC = true;
export const finishes: Finish[] = [
  { id: 'bialy', label: 'Biały', kind: 'gladki', hex: '#f6f6f3', systems: ['pcv', 'alu', 'drewno'] },
  { id: 'szary-7035', label: 'Jasnoszary', code: 'RAL 7035', kind: 'gladki', hex: '#c9ccc8', systems: ['pcv', 'alu', 'drewno'] },
  { id: 'antracyt', label: 'Antracyt', code: 'RAL 7016', kind: 'gladki', hex: '#383e42', systems: ['pcv', 'alu', 'drewno'] },
  { id: 'czarny', label: 'Czarny', code: 'RAL 9005', kind: 'gladki', hex: '#18181a', systems: ['pcv', 'alu', 'drewno'] },
  { id: 'zloty-dab', label: 'Złoty dąb', kind: 'okleina', hex: '#b67c3e', grain: '#7a4b1f', systems: ['pcv', 'alu'] },
  { id: 'orzech', label: 'Orzech', kind: 'okleina', hex: '#6f4529', grain: '#3e2412', systems: ['pcv', 'alu', 'drewno'] },
  { id: 'winchester', label: 'Winchester', kind: 'okleina', hex: '#a8733f', grain: '#6e4420', systems: ['pcv'] },
  { id: 'dab-natural', label: 'Dąb, lakier transparentny', kind: 'lakier', hex: '#c69c64', grain: '#8c6435', systems: ['drewno'] },
];

// ---------------------------------------------------------------- krok 6: szyby

export const panes: Choice<2 | 3>[] = [
  { id: 3, label: 'Pakiet 3-szybowy', desc: 'Standard w domach energooszczędnych, ogrzewanych przez cały rok.' },
  { id: 2, label: 'Pakiet 2-szybowy', desc: 'Pomieszczenia nieogrzewane i budynki gospodarcze.' },
];

export const glassToggles: (Choice<'warmEdge' | 'acoustic' | 'matte'>)[] = [
  { id: 'warmEdge', label: 'Ciepła ramka', desc: 'Dystans z tworzywa lub stali zamiast aluminium. Mniejsze ryzyko roszenia przy ramie zimą.', tbc: 'standard w pakiecie – do potwierdzenia' },
  { id: 'acoustic', label: 'Szyba akustyczna', desc: 'Od strony ruchliwej ulicy.' },
  { id: 'matte', label: 'Szyba matowa', desc: 'Np. łazienka lub okno od strony sąsiada.', tbc: true },
];

export const safetyGlass: Choice<'none' | 'p2' | 'p4'>[] = [
  { id: 'none', label: 'Bez szyby bezpiecznej' },
  { id: 'p2', label: 'Bezpieczna P2A', desc: 'Szkło laminowane: po stłuczeniu zostaje w ramie. Parter, drzwi balkonowe, duże tafle.', tbc: true },
  { id: 'p4', label: 'Antywłamaniowa P4A', desc: 'Większa odporność na wybicie. Zwykle część okna w klasie RC2.', tbc: true },
];

export const barKinds: Choice<'none' | 'wiedenskie' | 'miedzyszybowe'>[] = [
  { id: 'none', label: 'Bez szprosów' },
  { id: 'wiedenskie', label: 'Szprosy wiedeńskie', desc: 'Naklejone na szybę z obu stron. Wyglądają jak szyba dzielona.', tbc: true },
  { id: 'miedzyszybowe', label: 'Szprosy międzyszybowe', desc: 'Wewnątrz pakietu szyb. Gładka szyba z obu stron, łatwe mycie.', tbc: true },
];
/** maksymalna liczba szprosów pionowych / poziomych w polu (prototyp) */
export const BARS_MAX = 4;

// ---------------------------------------------------------------- krok 7: okucia

export const hinges: Choice<'standard' | 'ukryte'>[] = [
  { id: 'standard', label: 'Zawiasy standardowe', desc: 'Nakładki zawiasów widoczne od strony pokoju.' },
  { id: 'ukryte', label: 'Zawiasy ukryte', desc: 'Schowane w profilu, okno ma czyste linie. Zależy od systemu i układu skrzydeł.', tbc: true },
];

/** kolory klamek – dostępność w systemach do potwierdzenia */
export const HANDLES_TBC = true;
export const handles: (Choice & { hex: string })[] = [
  { id: 'biala', label: 'Biała', hex: '#f3f3f1' },
  { id: 'srebrna', label: 'Srebrna', hex: '#c4c8cd' },
  { id: 'tytan', label: 'Tytan', hex: '#8b8e92' },
  { id: 'czarna', label: 'Czarna', hex: '#1c1c1e' },
  { id: 'zlota', label: 'Złota', hex: '#c8a04a' },
];

export const security: Choice<'none' | 'rc1n' | 'rc2'>[] = [
  { id: 'none', label: 'Okucia standardowe', desc: 'Okucia obwiedniowe systemu, zamykające skrzydło w kilku punktach.' },
  { id: 'rc1n', label: 'Antywłamaniowe RC1N', desc: 'Wzmocnione okucia i zaczepy.', tbc: true },
  { id: 'rc2', label: 'Antywłamaniowe RC2', desc: 'Wzmocnione okucia, klamka z zamkiem lub przyciskiem i szyba P4A.', tbc: true },
];

// ---------------------------------------------------------------- krok 8: dodatki

export type Shading = 'none' | 'roleta-nadstawna' | 'roleta-podtynkowa' | 'roleta-elewacyjna' | 'zaluzja';
export const shadings: Choice<Shading>[] = [
  { id: 'none', label: 'Bez osłony zewnętrznej' },
  { id: 'roleta-nadstawna', label: 'Roleta nadstawna', desc: 'Skrzynka na oknie, montowana razem z nim. Najlepiej zamówić z nowymi oknami.' },
  { id: 'roleta-podtynkowa', label: 'Roleta podtynkowa', desc: 'Skrzynka schowana w nadprożu pod tynkiem. Planuje się ją na etapie budowy.' },
  { id: 'roleta-elewacyjna', label: 'Roleta elewacyjna', desc: 'Skrzynka na elewacji. Dobra przy wymianie, bez ingerencji w okno.' },
  { id: 'zaluzja', label: 'Żaluzja fasadowa', desc: 'Lamele regulują światło bez zaciemniania wnętrza. Duże przeszklenia od południa i zachodu.' },
];

export const drives: Choice<'reczny' | 'elektryczny'>[] = [
  { id: 'reczny', label: 'Napęd ręczny', desc: 'Korba lub taśma.' },
  { id: 'elektryczny', label: 'Napęd elektryczny', desc: 'Przełącznik lub pilot. Zasilanie zaplanujemy przy pomiarze.' },
];

export type Screen = 'none' | 'ramkowa' | 'drzwiowa' | 'przesuwna';
/** typy moskitier dla rodzajów produktu – do potwierdzenia */
export const screens: (Choice<Screen> & { types: ProductType[] })[] = [
  { id: 'none', label: 'Bez moskitiery', types: ['okno', 'balkonowe', 'hst'] },
  { id: 'ramkowa', label: 'Moskitiera ramkowa', desc: 'Lekka rama z siatką, zdejmowana na zimę.', types: ['okno'] },
  { id: 'drzwiowa', label: 'Moskitiera drzwiowa lub plisowana', desc: 'Otwierana jak drzwi albo składana w harmonijkę.', types: ['balkonowe', 'hst'], tbc: true },
  { id: 'przesuwna', label: 'Moskitiera przesuwna', desc: 'Przesuwa się razem z wyjściem na taras.', types: ['hst'], tbc: true },
];

/** parapety – tylko dla okien (drzwi mają próg). Materiały (konglomerat, PCV, kamień, stal, aluminium) – do potwierdzenia */
export const sills: Choice<'sillIn' | 'sillOut'>[] = [
  { id: 'sillIn', label: 'Parapet wewnętrzny', desc: 'Materiał dobierzemy przy pomiarze.', tbc: true },
  { id: 'sillOut', label: 'Parapet zewnętrzny', desc: 'Stalowy lub aluminiowy, w kolorze elewacji lub okna.', tbc: true },
];

// ---------------------------------------------------------------- krok 9: montaż

export const mountings: Choice<'standard' | 'cieply' | 'ocieplenie' | 'doradztwo'>[] = [
  { id: 'doradztwo', label: 'Doradźcie mi', desc: 'Sposób osadzenia dobierzemy po obejrzeniu otworu.' },
  { id: 'standard', label: 'Montaż standardowy', desc: 'Kotwy lub dyble, pianka i uszczelnienie obwodu ramy.' },
  // do potwierdzenia: czy ekipy wykonują ciepły montaż i montaż w warstwie ocieplenia (docs/do-uzupelnienia.md)
  { id: 'cieply', label: 'Ciepły montaż (warstwowy)', desc: 'Taśmy paroszczelne od środka i paroprzepuszczalne od zewnątrz uszczelniają styk ramy z murem.', tbc: true },
  { id: 'ocieplenie', label: 'Montaż w warstwie ocieplenia', desc: 'Okno wysunięte w warstwę izolacji na konsolach lub ramie montażowej. Domy energooszczędne.', tbc: true },
];

/** usługa dla całego projektu, pokazywana przy wymianie okien – do potwierdzenia */
export const removal: Choice<'demontaz'> = { id: 'demontaz', label: 'Demontaż i wywóz starych okien', tbc: true };

export const OWN_CREW_NOTE = 'Montują wyłącznie nasi monterzy – bez podwykonawców.';

// ---------------------------------------------------------------- krok 11: formularz

export const contactTimes = ['Dowolna pora', 'Rano (8:00–12:00)', 'Po południu (12:00–16:00)', 'W sobotę (8:00–13:00)'];

/** limity projektu (prototyp) */
export const MAX_ITEMS = 30;
export const MAX_QTY = 99;

// ---------------------------------------------------------------- stan

export interface Item {
  id: string;
  name: string;
  type: ProductType;
  template: string;
  openings: Opening[];
  sizeMode: 'pomiar' | 'wlasne';
  w: number;
  h: number;
  system: SystemId;
  colorOut: string;
  colorIn: string;
  glass: { pane: 2 | 3; warmEdge: boolean; acoustic: boolean; matte: boolean; safety: 'none' | 'p2' | 'p4' };
  bars: { kind: 'none' | 'wiedenskie' | 'miedzyszybowe'; v: number; h: number };
  hardware: { hinges: 'standard' | 'ukryte'; handle: string; rc: 'none' | 'rc1n' | 'rc2' };
  extras: { shading: Shading; drive: 'reczny' | 'elektryczny'; screen: Screen; sillIn: boolean; sillOut: boolean };
  mount: 'standard' | 'cieply' | 'ocieplenie' | 'doradztwo';
  qty: number;
}

export interface Project {
  v: 1;
  context: '' | 'nowy' | 'wymiana';
  demontaz: boolean;
  items: Item[];
  current: number;
}

export const uid = () => Math.random().toString(36).slice(2, 9);

export const templateById = (id: string) => templates.find((t) => t.id === id) ?? templates[1];
export const systemById = (id: string) => systems.find((s) => s.id === id) ?? systems[0];
export const finishById = (id: string) => finishes.find((f) => f.id === id) ?? finishes[0];
export const handleById = (id: string) => handles.find((h) => h.id === id) ?? handles[0];

export function defaultItem(type: ProductType = 'okno'): Item {
  const tpl = templateById(defaultTemplate[type]);
  return {
    id: uid(),
    name: '',
    type,
    template: tpl.id,
    openings: [...tpl.openings],
    sizeMode: 'pomiar',
    w: tpl.size.w,
    h: tpl.size.h,
    system: 'pcv',
    colorOut: 'bialy',
    colorIn: 'bialy',
    glass: { pane: 3, warmEdge: true, acoustic: false, matte: false, safety: 'none' },
    bars: { kind: 'none', v: 1, h: 1 },
    hardware: { hinges: 'standard', handle: 'biala', rc: 'none' },
    extras: { shading: 'none', drive: 'reczny', screen: 'none', sillIn: false, sillOut: false },
    mount: 'doradztwo',
    qty: 1,
  };
}

export const newProject = (): Project => ({ v: 1, context: '', demontaz: false, items: [defaultItem()], current: 0 });
