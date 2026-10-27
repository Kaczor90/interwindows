// Installation process shown by src/components/ProcessSteps.astro (home page, can be reused on /montaz-okien/).
// confirmed: false → the step describes the planned standard from docs/seo-plan.md §6.3 and
// docs/konkurencja-i-konfiguratory.md §5, but the client has not confirmed it yet. Such steps render
// a small "do potwierdzenia" tag until the flag is switched to true (list in docs/do-uzupelnienia.md).

export interface Step {
  title: string;
  text: string;
  /** short, concrete proof line shown under the text */
  proof?: string;
  icon: string;
  /** optional picture shown above the step (own photo or AI illustration – see docs/do-uzupelnienia.md) */
  image?: { src: string; alt: string; width: number; height: number; ai?: boolean };
  confirmed: boolean;
}

export const montazSteps: Step[] = [
  {
    title: 'Pomiar u Ciebie',
    text: 'Przyjeżdżamy na budowę albo do domu i mierzymy każdy otwór. Na miejscu omawiamy sposób osadzenia, parapety i obróbki, zanim cokolwiek zamówimy.',
    proof: 'Pomiar i wycena są bezpłatne i niezobowiązujące.',
    icon: 'pomiar',
    image: { src: '/img/ai/ai-montaz-pomiar.webp', alt: 'Pomiar otworu okiennego dalmierzem laserowym w domu w trakcie budowy', width: 1600, height: 1073, ai: true },
    confirmed: true,
  },
  {
    title: 'Przygotowanie i demontaż',
    text: 'W dniu montażu zabezpieczamy podłogi i meble, ostrożnie wyjmujemy stare okna lub drzwi i przygotowujemy ościeża pod nowe konstrukcje.',
    proof: 'Stara stolarka wyjeżdża z nami – nie zostaje na Twojej posesji.',
    icon: 'demontaz',
    image: { src: '/img/realizacje/szyby-wielkoformatowe-na-stojakach-zima.webp', alt: 'Wielkoformatowe szyby na stojakach przed montażem', width: 1600, height: 1200 },
    confirmed: false,
  },
  {
    title: 'Montaż naszą ekipą',
    text: 'Okna, drzwi i bramy osadzają monterzy z naszego zespołu. Nie zlecamy montażu podwykonawcom, także przy dużych przeszkleniach i bramach garażowych.',
    proof: 'Montaż wykonuje wyłącznie zespół Inter Windows.',
    icon: 'montaz',
    image: { src: '/img/ai/ai-montaz-tasma.webp', alt: 'Dłonie montażysty dociskają taśmę paroizolacyjną na styku ramy okna z murem', width: 1600, height: 1064, ai: true },
    confirmed: true,
  },
  {
    title: 'Odbiór z protokołem',
    text: 'Razem sprawdzamy szczelność, regulację skrzydeł i działanie okuć. Pokazujemy, jak dbać o okna, sprzątamy po sobie i spisujemy protokół odbioru.',
    proof: 'Protokół podpisuje brygadzista i Ty.',
    icon: 'odbior',
    image: { src: '/img/ai/ai-montaz-odbior.webp', alt: 'Nowe okno w kolorze antracytu w czystym pokoju; na parapecie podkładka z kartką i długopis', width: 1293, height: 1600, ai: true },
    confirmed: false,
  },
  {
    title: 'Gwarancja na montaż',
    text: 'Za montaż odpowiadamy sami, osobno od gwarancji producenta. Jeśli coś wymaga regulacji, przyjeżdża ekipa, która montowała Twoje okna.',
    proof: 'Gwarancja na montaż: okres do uzupełnienia.',
    icon: 'gwarancja',
    image: { src: '/img/ai/ai-montaz-poziomowanie.webp', alt: 'Sprawdzanie pionu ramy okna poziomicą; widoczna stalowa kotwa i kliny montażowe', width: 1286, height: 1600, ai: true },
    confirmed: false,
  },
];
