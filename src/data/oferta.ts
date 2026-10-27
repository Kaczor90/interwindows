// Offer categories (P1 product pages). Each entry generates one page via src/pages/[slug].astro.
// Text fields marked "rich" accept a tiny markup: [label](/path/) for internal links and **bold**.
// Internal links are written as root paths with a trailing slash – rich() adds the base path.
// SEO texts (seo.title, seo.description, seo.h1) come 1:1 from docs/seo-plan.md §4.2.

export interface Faq {
  q: string;
  /** rich */
  a: string;
}

export interface Section {
  /** anchor id; defaults to a slug of h2 */
  id?: string;
  h2: string;
  /** rich paragraphs */
  body?: string[];
  /** rich bullet points */
  bullets?: string[];
  /** cards: systems, types, steps */
  items?: { title: string; text: string; tag?: string }[];
  /** comparison table */
  table?: { caption?: string; head: string[]; rows: string[][] };
  /** links shown under the section (internal: root paths) */
  links?: { label: string; href: string }[];
  /** optional illustration under the text (own photo or AI illustration from src/data/ai-zdjecia.ts) */
  image?: { src: string; alt: string; width: number; height: number };
}

export type MenuGroup = 'okna' | 'drzwi' | 'oslony' | 'bramy';

export interface Category {
  slug: string;
  /** slug of the parent category (okna-pcv → okna); used for breadcrumbs and the hub */
  parent?: string;
  /** short name for menus, cards and breadcrumbs, e.g. "Okna PCV" */
  title: string;
  menuGroup: MenuGroup;
  /** 1–2 sentences for offer tiles on the home page and "Zobacz też" */
  short: string;
  seo: { title: string; description: string; h1: string };
  /** rich – hero lead, contains the main phrase */
  lead: string;
  /** own realization photo (/img/realizacje/<name>.webp); omitted → on-brand placeholder */
  heroImage?: string;
  heroAlt?: string;
  /** 3–4 short verified facts shown under the hero */
  highlights?: string[];
  /** producers offered in this category (from _tresci/tresci.md) */
  brands?: string[];
  sections: Section[];
  faq?: Faq[];
  /** slugs of related categories or root paths of other pages */
  related: string[];
  /** tags from src/data/realizacje-zdjecia.ts used for the "Z naszych montaży" photo strip */
  photoTags?: string[];
  /** primary CTA in hero and at the end */
  cta: 'konfigurator' | 'pomiar' | 'konsultacja';
  /** schema.org Service.serviceType */
  serviceType: string;
  /** YYYY-MM-DD, sitemap lastmod */
  updated: string;
}

const UPDATED = '2026-10-27';

const OWN_CREW_FAQ = (what: string): Faq => ({
  q: `Kto montuje ${what}?`,
  a: 'Wyłącznie nasza ekipa. Nie przekazujemy montażu podwykonawcom, więc za dobór, pomiar i montaż odpowiada jedna firma. Jak pracują nasi monterzy, opisujemy na stronie [montaż okien](/montaz-okien/).',
});

export const categories: Category[] = [
  // ---------------------------------------------------------------- OKNA (hub)
  {
    slug: 'okna',
    title: 'Okna',
    menuGroup: 'okna',
    short: 'Okna PCV, aluminiowe i drewniane dobrane do domu, jego stylu i budżetu. Pomagamy wybrać materiał, mierzymy i montujemy własną ekipą.',
    seo: {
      title: 'Okna na wymiar w Płocku – PCV, aluminium i drewno',
      description:
        'Okna PCV, aluminiowe i drewniane DAKO dobrane do domu i budżetu. Sprawdź, od czego zależy cena, skonfiguruj okno online i umów bezpłatny pomiar.',
      h1: 'Okna na wymiar – Płock i okolice',
    },
    lead: 'Dobieramy **okna na wymiar** do domów w Płocku i okolicach: PCV, aluminiowe i drewniane, w systemach DAKO i innych sprawdzonych producentów. Doradzamy, mierzymy i montujemy własną ekipą, bez podwykonawców.',
    heroImage: '/img/realizacje/przeszklenie-szczytowe-zloty-dab-01.webp',
    heroAlt: 'Duże przeszklenie szczytowe w kolorze złotego dębu pod drewnianym okapem domu w budowie',
    highlights: ['Autoryzowany partner DAKO', 'Okna PCV, aluminiowe i drewniane', 'Bezpłatny pomiar i wycena', 'Montaż wyłącznie własną ekipą'],
    brands: ['DAKO', 'VEKA', 'Aluprof', 'Sonarol', 'All Windows Group'],
    sections: [
      {
        id: 'porownanie',
        h2: 'PCV, aluminium czy drewno: porównanie',
        body: [
          'Materiał ramy decyduje o wyglądzie okna, jego wadze, pielęgnacji i o tym, jak duże przeszklenie da się zbudować. Nie ma jednego najlepszego wyboru. Jest wybór dopasowany do bryły domu, stylu wnętrz i tego, ile uwagi chcesz poświęcać oknom po latach.',
          'Poniższe zestawienie to punkt wyjścia do rozmowy. Konkretne systemy, pakiety szyb i parametry omawiamy przy wycenie, na podstawie kart producentów.',
        ],
        table: {
          caption: 'Porównanie materiałów okiennych',
          head: ['', 'PCV', 'Aluminium', 'Drewno i drewno-aluminium'],
          rows: [
            ['Wygląd', 'Klasyczna rama, biel, okleiny drewnopodobne i kolory gładkie', 'Smukły profil, dużo szkła, kolory z palety RAL', 'Naturalne usłojenie, lakier kryjący lub transparentny'],
            ['Typowe zastosowanie', 'Domy jednorodzinne, mieszkania, wymiana okien', 'Duże przeszklenia, okna narożne, nowoczesna architektura', 'Domy o klasycznej bryle, rezydencje, kamienice'],
            ['Pielęgnacja', 'Mycie i okresowe smarowanie okuć', 'Mycie i kontrola uszczelek', 'Okresowe odświeżanie powłoki; z nakładką aluminiową rzadziej'],
            ['Kiedy wybrać', 'Gdy zależy Ci na dobrej izolacji i łatwej pielęgnacji', 'Gdy chcesz dużych tafli szkła i wąskiej ramy', 'Gdy budynek wymaga naturalnego materiału lub uzgodnień z konserwatorem'],
          ],
        },
        links: [{ label: 'Okna aluminiowe czy PCV – porównanie w poradniku', href: '/poradnik/okna-aluminiowe-czy-pcv/' }],
      },
      {
        id: 'okna-pcv',
        h2: 'Okna PCV',
        body: [
          'Najczęściej wybierane okna w domach jednorodzinnych. Jako autoryzowany partner DAKO proponujemy przede wszystkim okno **DAKO DPQ-82** na profilu **VEKA Softline 82 MD**: głęboki, wielokomorowy profil, który dobrze trzyma ciepło i wycisza wnętrze. Mamy też okna PCV firm Sonarol i All Windows Group.',
          'Pakiety szyb, kolory i okucia opisujemy na stronie [okna PCV](/okna-pcv/).',
        ],
      },
      {
        id: 'okna-aluminiowe',
        h2: 'Okna aluminiowe',
        // AI illustration
        image: { src: '/img/ai/ai-przeszklenia-salon.webp', alt: 'Salon z dużym przeszkleniem narożnym w ramach w kolorze antracytu, z widokiem na ogród z brzozami', width: 1600, height: 896 },
        body: [
          'Aluminium pozwala zbudować duże, stabilne konstrukcje przy wąskiej ramie. Dlatego sięga się po nie przy przeszkleniach od podłogi do stropu, oknach narożnych i fasadach. Pracujemy na systemach **Aluprof** z oferty DAKO oraz na konstrukcjach Sonarol i All Windows Group.',
          'Więcej o tym, kiedy aluminium ma przewagę, przeczytasz na stronie [okna aluminiowe](/okna-aluminiowe/). Duże przesuwne przeszklenia opisujemy osobno w zakładce [drzwi tarasowe](/drzwi-tarasowe/).',
        ],
      },
      {
        id: 'okna-drewniane',
        h2: 'Okna drewniane i drewniano-aluminiowe',
        body: [
          'Drewno wybierają osoby, którym zależy na naturalnym materiale i klasycznych proporcjach okna. Wersja drewniano-aluminiowa ma od zewnątrz nakładkę z aluminium, która chroni drewno przed deszczem i słońcem. Proponujemy okna drewniane DAKO oraz rozwiązania Sonarol i All Windows Group.',
          'To dobry wybór także do kamienic i budynków, w których okna uzgadnia się z konserwatorem. Zobacz [okna drewniane](/okna-drewniane/).',
        ],
      },
      {
        id: 'ceny',
        h2: 'Ile kosztują okna w Płocku i od czego zależy cena',
        body: [
          'Cena okna to suma kilku decyzji. Dwa okna o tym samym wymiarze mogą kosztować zupełnie inaczej, bo różnią się systemem, szybą, kolorem i sposobem montażu. Dlatego nie publikujemy cennika z jedną liczbą, która nie odpowiadałaby Twojemu projektowi.',
          'Po bezpłatnym pomiarze przygotowujemy niezobowiązującą wycenę okien razem z montażem. Wstępny projekt możesz przygotować sam w [konfiguratorze okien](/konfigurator/), a koszty wymiany omawiamy w poradniku [ile kosztuje wymiana okien](/poradnik/ile-kosztuje-wymiana-okien/).',
        ],
        bullets: [
          'materiał i system profili',
          'wymiary, kształt i podział na skrzydła',
          'pakiet szyb: liczba szyb, szkło bezpieczne, akustyczne lub przeciwsłoneczne',
          'kolor lub okleina oraz rodzaj okuć',
          'zakres prac: demontaż, montaż, obróbki, parapety',
        ],
      },
      {
        id: 'szyby-okucia-kolory',
        h2: 'Szyby, okucia, kolory',
        body: [
          'Szyba to największa część okna, więc pakiet szybowy w dużym stopniu decyduje o tym, ile ciepła ucieka z domu. Do domu ogrzewanego przez cały rok zwykle wybiera się pakiet trzyszybowy z ciepłą ramką. Od strony ruchliwej ulicy warto pomyśleć o szybie akustycznej, a na parterze o szkle bezpiecznym.',
          'Okucia odpowiadają za wygodę i bezpieczeństwo: sposób otwierania, mikrowentylację i elementy antywyważeniowe. Kolor wybierasz z palety oklein i barw gładkich producenta, także inny od strony wnętrza i elewacji.',
        ],
      },
      {
        id: 'montaz-i-wymiana',
        h2: 'Montaż i wymiana',
        body: [
          'Nawet najlepiej dobrane okno straci parametry, jeśli zostanie źle osadzone. Dlatego okna montują u nas wyłącznie nasi monterzy. Jak wygląda ich praca, pokazujemy na stronie [montaż okien](/montaz-okien/).',
          'Jeśli wymieniasz okna w domu lub mieszkaniu, zajrzyj na stronę [wymiana okien](/wymiana-okien/). W nowym domu warto rozważyć [ciepły montaż okien](/cieply-montaz-okien/), który uszczelnia styk ramy z murem warstwami.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy pomiar i wycena są płatne?',
        a: 'Nie. Pomiar u Ciebie i wycena są bezpłatne i do niczego nie zobowiązują. Po pomiarze dostajesz ofertę obejmującą okna i montaż, a decyzję podejmujesz we własnym tempie.',
      },
      OWN_CREW_FAQ('okna'),
      {
        q: 'PCV, aluminium czy drewno – co wybrać do domu?',
        a: 'Do większości domów jednorodzinnych w zupełności wystarczą dobre okna PCV. Aluminium wybiera się przy dużych przeszkleniach i wąskiej ramie, drewno przy klasycznej architekturze i w budynkach zabytkowych. Materiały można łączyć, na przykład PCV w większości okien i aluminium w przeszkleniach tarasowych.',
      },
      {
        q: 'Czy mogę sam przygotować projekt okien?',
        a: 'Tak. W [konfiguratorze okien](/konfigurator/) wybierzesz typ, wymiary, podział, kolor i szyby. Projekt trafi do doradcy, który przygotuje wycenę i umówi pomiar. Wymiary z konfiguratora traktujemy jako wstępne, ostateczne ustalamy na miejscu.',
      },
    ],
    related: ['okna-pcv', 'okna-aluminiowe', 'okna-drewniane', 'drzwi-tarasowe', '/montaz-okien/'],
    photoTags: ['okna'],
    cta: 'konfigurator',
    serviceType: 'Sprzedaż i montaż okien',
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- OKNA PCV
  {
    slug: 'okna-pcv',
    parent: 'okna',
    title: 'Okna PCV',
    menuGroup: 'okna',
    short: 'Okna DAKO DPQ-82 na profilu VEKA Softline 82 MD oraz systemy Sonarol i All Windows Group. Dobór szyb, kolorów i okuć.',
    seo: {
      title: 'Okna PCV Płock – DAKO DPQ-82 na profilu Veka | Inter Windows',
      description:
        'Energooszczędne okna PCV DAKO DPQ-82 na profilu Veka Softline 82 MD klasy A. Dobór szyb, pomiar i montaż własną ekipą w Płocku i okolicach.',
      h1: 'Okna PCV w Płocku – ciepłe, ciche i dopasowane do domu',
    },
    lead: 'Proponujemy **okna PCV** DAKO DPQ-82 na profilu VEKA Softline 82 MD oraz systemy innych sprawdzonych producentów. Dobieramy szyby, kolor i okucia do Twojego domu, a pomiar i montaż w Płocku i okolicach wykonuje nasza ekipa.',
    heroImage: '/img/realizacje/okno-trojdzielne-zloty-dab-elewacja-01.webp',
    heroAlt: 'Okno trójdzielne w okleinie złoty dąb z parapetem na wykończonej, białej elewacji',
    highlights: ['Autoryzowany partner DAKO', 'DAKO DPQ-82 na profilu VEKA Softline 82 MD', 'Bezpłatny pomiar i wycena', 'Montaż wyłącznie własną ekipą'],
    brands: ['DAKO', 'VEKA', 'Sonarol', 'All Windows Group'],
    sections: [
      {
        id: 'dako-dpq-82',
        h2: 'DAKO DPQ-82 na profilu VEKA Softline 82 MD',
        body: [
          'To okno, które proponujemy najczęściej. DAKO, polski producent stolarki, którego jesteśmy autoryzowanym partnerem, buduje je na profilu VEKA Softline 82 MD. Profil ma głębokość 82 mm i kilka komór, a głębsza rama mieści grubsze pakiety szyb i lepiej izoluje.',
          'Oznaczenie MD to system z uszczelką środkową, która dodatkowo uszczelnia okno i poprawia izolację akustyczną. Profil jest wykonany w klasie A, czyli z grubszymi ściankami zewnętrznymi, co przekłada się na sztywność i trwałość okna. Porównanie z innymi materiałami znajdziesz na stronie [okna na wymiar](/okna/).',
        ],
      },
      {
        id: 'inne-systemy',
        h2: 'Inne systemy PCV: Sonarol i All Windows Group',
        body: [
          'Nie każdy projekt wymaga tego samego okna. Dlatego oprócz DAKO mamy w ofercie okna PCV firm Sonarol i All Windows Group. Sięgamy po nie, gdy budynek albo założenia projektu wymagają innego rozwiązania, na przykład innego kształtu profilu lub koloru.',
          'Przy wycenie pokazujemy różnice między systemami wprost: co dostajesz w każdym z nich i za co dopłacasz.',
        ],
      },
      {
        id: 'szyby-i-parametry',
        h2: 'Pakiety szyb i parametry: Uw, Ug, ciepła ramka',
        body: [
          '**Ug** opisuje, ile ciepła ucieka przez samą szybę. **Uw** dotyczy całego okna: szyby, ramy i połączenia między nimi. Im niższa wartość, tym cieplejsze okno. O komforcie w domu decyduje Uw, a nie najlepszy wynik samej szyby, który często pojawia się w reklamach.',
          '**Ciepła ramka** to dystans między szybami z tworzywa lub stali nierdzewnej zamiast aluminium. Ogranicza wychładzanie krawędzi szyby, a więc ryzyko roszenia przy ramie zimą. Parametry konkretnego zestawu podajemy w ofercie na podstawie danych producenta.',
        ],
        bullets: [
          'pakiet dwuszybowy: pomieszczenia nieogrzewane i budynki gospodarcze',
          'pakiet trzyszybowy: standard w domach energooszczędnych',
          'szyba akustyczna: od strony ruchliwej ulicy',
          'szyba bezpieczna (laminowana): parter, drzwi balkonowe, duże tafle',
          'szyba przeciwsłoneczna: duże przeszklenia od południa i zachodu',
        ],
      },
      {
        id: 'kolory-i-okleiny',
        h2: 'Kolory i okleiny',
        // AI illustration (cross-section is generic, not the VEKA profile)
        image: { src: '/img/ai/ai-konfigurator-profil-probki.webp', alt: 'Narożnik profilu okiennego PCV w przekroju i próbki kolorów: antracyt, złoty dąb i biel', width: 1600, height: 1073 },
        body: [
          'Okno PCV nie musi być białe. Okleiny drewnopodobne, takie jak złoty dąb czy orzech, oraz kolory gładkie, w tym antracyt, pozwalają dopasować okno do elewacji, bramy i drzwi wejściowych. Okleinę można nałożyć z jednej strony albo z obu, więc od środka okno może pozostać białe.',
          'Antracyt i złoty dąb to kolory, które najczęściej widać na naszych montażach. Pełną paletę dla wybranego systemu pokażemy przy wycenie.',
        ],
      },
      {
        id: 'okucia-i-bezpieczenstwo',
        h2: 'Okucia i bezpieczeństwo (RC2)',
        body: [
          'Okucia obwiedniowe zamykają skrzydło w kilku punktach na całym obwodzie. Grzybkowe trzpienie, które wchodzą w stalowe zaczepy, utrudniają podważenie skrzydła. Wiele systemów ma też w standardzie mikrowentylację i blokadę błędnego położenia klamki.',
          'Okno w klasie **RC2** ma wzmocnione okucia, klamkę z zamkiem lub przyciskiem i szybę bezpieczną. Taki zestaw ma sens na parterze, przy drzwiach balkonowych i w domach stojących na uboczu. Czy wybrany system jest dostępny w RC2, sprawdzamy przy wycenie. Dodatkową ochronę dają [rolety zewnętrzne](/rolety-zewnetrzne/).',
        ],
      },
      {
        id: 'ceny',
        h2: 'Ile kosztują okna PCV',
        body: [
          'Na cenę okna PCV najbardziej wpływają system profili, wymiary i podział, pakiet szyb, okleina oraz okucia. Do tego dochodzi zakres prac: demontaż starych okien, montaż, obróbki i parapety.',
          'Wycenę przygotowujemy bezpłatnie po pomiarze. Jeśli chcesz najpierw sprawdzić, jak zmienia się projekt, skorzystaj z [konfiguratora okien](/konfigurator/). Przy wymianie okien w zamieszkanym domu zajrzyj na stronę [wymiana okien](/wymiana-okien/), a przy nowym domu na [ciepły montaż okien](/cieply-montaz-okien/).',
        ],
      },
    ],
    faq: [
      {
        q: 'Czym okno DAKO DPQ-82 różni się od innych okien PCV?',
        a: 'Przede wszystkim profilem. VEKA Softline 82 MD ma głębokość 82 mm i uszczelkę środkową, co poprawia izolacyjność i szczelność. Duże znaczenie mają też pakiet szyb i okucia, dlatego przy wycenie porównujemy kompletne okna, a nie same profile.',
      },
      {
        q: 'Dwie czy trzy szyby?',
        a: 'W domu ogrzewanym przez cały rok zwykle wybiera się pakiet trzyszybowy z ciepłą ramką. Dwie szyby mają sens w pomieszczeniach nieogrzewanych. Ostateczny wybór zależy od strony świata, wielkości okna i wymagań projektu.',
      },
      {
        q: 'Czy okleina na oknie PCV jest trwała?',
        a: 'Okleiny stosowane na profilach okiennych są przeznaczone do pracy na zewnątrz i nie wymagają malowania. Wystarczy mycie łagodnym środkiem. Ciemne okleiny mocniej nagrzewają się w słońcu, dlatego dobór wzmocnień profilu uwzględnia kolor okna.',
      },
      OWN_CREW_FAQ('okna PCV'),
    ],
    related: ['okna', 'okna-aluminiowe', 'rolety-zewnetrzne', '/wymiana-okien/', '/cieply-montaz-okien/'],
    photoTags: ['okna'],
    cta: 'konfigurator',
    serviceType: 'Sprzedaż i montaż okien PCV',
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- OKNA ALUMINIOWE
  {
    slug: 'okna-aluminiowe',
    parent: 'okna',
    title: 'Okna aluminiowe',
    menuGroup: 'okna',
    short: 'Smukłe okna aluminiowe na systemach Aluprof: duże przeszklenia, okna narożne i fasady w kolorach z palety RAL.',
    seo: {
      title: 'Okna aluminiowe Płock – systemy Aluprof | Inter Windows',
      description:
        'Smukłe okna aluminiowe na systemach Aluprof: duże przeszklenia, narożniki, kolory RAL. Doradztwo, pomiar i montaż własną ekipą w Płocku.',
      h1: 'Okna aluminiowe w Płocku – smukła rama, dużo światła',
    },
    lead: 'Dobieramy i montujemy **okna aluminiowe** na systemach Aluprof z oferty DAKO. Wąska rama, duże tafle szkła i okna narożne dla domów w Płocku i okolicach, osadzane przez naszą ekipę.',
    // AI illustration – replace with an own photo (docs/do-uzupelnienia.md)
    heroImage: '/img/ai/ai-przeszklenia-salon.webp',
    heroAlt: 'Salon z dużym przeszkleniem narożnym w ramach w kolorze antracytu, z widokiem na ogród z brzozami',
    highlights: ['Systemy Aluprof z oferty DAKO', 'Autoryzowany partner DAKO', 'Bezpłatny pomiar i wycena', 'Montaż wyłącznie własną ekipą'],
    brands: ['DAKO', 'Aluprof', 'Sonarol', 'All Windows Group'],
    sections: [
      {
        id: 'aluminium-czy-pcv',
        h2: 'Kiedy aluminium wygrywa z PCV',
        body: [
          'Aluminium jest sztywniejsze od PCV, więc przy tej samej wielkości okna rama może być węższa. Z tego powodu wybiera się je do przeszkleń od podłogi do stropu, okien narożnych i dużych tafli stałych. Przy oknach typowej wielkości różnica w wyglądzie jest mniejsza, a o wyborze decydują styl domu i budżet.',
          'Nowoczesne profile aluminiowe mają przekładki termiczne, które oddzielają zewnętrzną i wewnętrzną część ramy. Dzięki nim aluminium nadaje się także do domów energooszczędnych. Szczegółowe porównanie znajdziesz w poradniku [okna aluminiowe czy PCV](/poradnik/okna-aluminiowe-czy-pcv/).',
        ],
      },
      {
        id: 'systemy-aluprof',
        h2: 'Systemy DAKO na profilach Aluprof',
        body: [
          'DAKO buduje okna aluminiowe na systemach Aluprof, polskiego producenta profili aluminiowych. W ofercie DAKO są m.in. linie DA-77 i DA-70N, które różnią się budową profilu, izolacyjnością i możliwościami konstrukcyjnymi.',
          'Konkretną linię dobieramy do projektu domu, wielkości przeszkleń i oczekiwanej izolacyjności. Dostępność wybranego systemu i jego parametry potwierdzamy w ofercie, na podstawie kart producenta. Mamy też konstrukcje aluminiowe firm Sonarol i All Windows Group.',
        ],
      },
      {
        id: 'duze-przeszklenia',
        h2: 'Duże przeszklenia, narożniki i fixy',
        body: [
          'Okno narożne bez słupka, tafla od podłogi do stropu czy pas szkła pod dachem najmocniej zmieniają wnętrze. Wymagają jednak dokładnego projektu: trzeba sprawdzić statykę, sposób łączenia elementów i to, jak tafla trafi na miejsce montażu.',
          '**Fix**, czyli okno nieotwierane, daje najwięcej szkła przy najwęższej ramie. Łączy się go ze skrzydłami otwieranymi albo z [drzwiami tarasowymi](/drzwi-tarasowe/). Przy dużych przeszkleniach od południa warto od razu zaplanować osłony, na przykład [żaluzje fasadowe](/zaluzje-fasadowe/).',
        ],
      },
      {
        id: 'kolory-i-okucia',
        h2: 'Kolory RAL, struktury, okucia ukryte',
        body: [
          'Profile aluminiowe lakieruje się proszkowo na kolory z palety RAL, także w wersji matowej lub strukturalnej. Najczęściej wybierany jest antracyt, ale od wewnątrz i na zewnątrz rama może mieć różne kolory.',
          'Okucia ukryte w profilu nie wystają poza ramę, więc okno ma czyste linie. Pasują do wnętrz, w których rama ma być jak najmniej widoczna. Czy dany system ma okucia ukryte w Twoim układzie skrzydeł, sprawdzamy przy wycenie.',
        ],
      },
      {
        id: 'montaz-ciezkich-konstrukcji',
        h2: 'Montaż ciężkich konstrukcji: sprzęt i ekipa',
        body: [
          'Duże tafle szkła ważą tyle, że nie wnosi się ich ręcznie. Do ich osadzenia używa się minidźwigu lub manipulatora z przyssawką próżniową, a monterzy muszą wiedzieć, jak przygotować otwór, podparcie i kotwienie ramy. Takie montaże, także zimą, widać na zdjęciach z naszych budów.',
          'Okna aluminiowe montuje nasza ekipa, bez podwykonawców. Przy dużych konstrukcjach warto rozważyć [ciepły montaż okien](/cieply-montaz-okien/), który szczelnie łączy ramę z murem.',
        ],
      },
      {
        id: 'ceny',
        h2: 'Cena okien aluminiowych',
        body: [
          'Okna aluminiowe są zwykle droższe od okien PCV podobnej wielkości. O cenie decydują system, wielkość tafli, liczba i typ skrzydeł, pakiet szyb, kolor oraz to, czy montaż wymaga sprzętu do podnoszenia szkła.',
          'Najdokładniejszą wycenę przygotujemy na podstawie projektu domu lub rzutu z wymiarami otworów. Umów konsultację, a po pomiarze dostaniesz bezpłatną ofertę z montażem. Wstępny układ okien możesz sprawdzić w [konfiguratorze](/konfigurator/).',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy okna aluminiowe są zimne?',
        a: 'Nie muszą być. Profile z przekładką termiczną izolują porównywalnie z dobrymi oknami PCV, choć wynik zależy od konkretnej linii i pakietu szyb. Przy wycenie podajemy parametry całego okna według danych producenta.',
      },
      {
        q: 'Czy da się zrobić okno narożne bez słupka?',
        a: 'Tak, w systemach aluminiowych to częste rozwiązanie. Wymaga jednak sprawdzenia statyki i dobrze przygotowanego nadproża. Przykłady narożnych przeszkleń znajdziesz w naszych [realizacjach](/realizacje/).',
      },
      {
        q: 'Kiedy zamówić okna aluminiowe przy budowie domu?',
        a: 'Najlepiej na etapie projektu lub stanu surowego, zanim powstaną nadproża. Wtedy można dopasować otwory do systemu i zaplanować osłony. Ostateczny pomiar wykonujemy, gdy otwory są gotowe.',
      },
      OWN_CREW_FAQ('duże przeszklenia'),
    ],
    related: ['okna', 'drzwi-tarasowe', 'zaluzje-fasadowe', 'okna-pcv', '/cieply-montaz-okien/'],
    photoTags: ['przeszklenia'],
    cta: 'konsultacja',
    serviceType: 'Sprzedaż i montaż okien aluminiowych',
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- OKNA DREWNIANE
  {
    slug: 'okna-drewniane',
    parent: 'okna',
    title: 'Okna drewniane',
    menuGroup: 'okna',
    short: 'Okna drewniane i drewniano-aluminiowe do nowych domów, rezydencji i kamienic. Naturalny materiał i klasyczne proporcje.',
    seo: {
      title: 'Okna drewniane Płock – drewno i drewno-alu | Inter Windows',
      description:
        'Okna drewniane i drewniano-aluminiowe DAKO do nowych domów, rezydencji i kamienic. Doradztwo w wyborze wykończenia, pomiar i montaż w Płocku.',
      h1: 'Okna drewniane w Płocku – naturalny materiał, nowoczesne parametry',
    },
    lead: 'Dobieramy **okna drewniane** i drewniano-aluminiowe do domów, rezydencji i kamienic w Płocku i okolicach. Pomagamy wybrać system i wykończenie, mierzymy i montujemy własną ekipą.',
    // AI illustration – replace with an own photo (docs/do-uzupelnienia.md)
    heroImage: '/img/ai/ai-okna-drewniane-willa.webp',
    heroAlt: 'Dębowe okno dwuskrzydłowe ze szprosami w jasnym pokoju z parkietem w jodełkę',
    highlights: ['Autoryzowany partner DAKO', 'Okna drewniane DAKO i innych producentów', 'Bezpłatny pomiar i wycena', 'Montaż wyłącznie własną ekipą'],
    brands: ['DAKO', 'Sonarol', 'All Windows Group'],
    sections: [
      {
        id: 'systemy-dako',
        h2: 'Systemy DAKO DDF-68, DDR-68, DDA-78',
        body: [
          'W ofercie DAKO są m.in. drewniane systemy DDF-68 i DDR-68 oraz drewniano-aluminiowy DDA-78. Różnią się kształtem profilu i charakterem ramy, a wersja drewniano-aluminiowa ma od zewnątrz nakładkę z aluminium.',
          'Który system pasuje do Twojego budynku, ustalamy na spotkaniu. Dostępność wybranej linii, parametry i kolory potwierdzamy w ofercie na podstawie kart producenta. Mamy też okna drewniane firm Sonarol i All Windows Group. Porównanie z PCV i aluminium znajdziesz na stronie [okna na wymiar](/okna/).',
        ],
      },
      {
        id: 'drewno-i-wykonczenie',
        h2: 'Gatunki drewna, lakiery, kolory',
        body: [
          'W oknach stosuje się przede wszystkim klejonkę z sosny, meranti lub dębu. Klejonka, czyli drewno sklejone z kilku warstw, mniej pracuje niż lite drewno i lepiej trzyma kształt. Gatunek wpływa na usłojenie, twardość i odcień okna.',
          'Drewno wykańcza się lakierem kryjącym w kolorze z palety RAL albo lakierem transparentnym, który zostawia widoczne usłojenie. Przy klasycznej architekturze dobrze wyglądają biel, szarości i ciepłe odcienie drewna. Listę gatunków i kolorów dla wybranego systemu pokażemy przy wycenie.',
        ],
      },
      {
        id: 'drewno-aluminium',
        h2: 'Drewno-aluminium',
        body: [
          'Okno drewniano-aluminiowe łączy dwa materiały. Od środka masz drewno, a od zewnątrz aluminiową nakładkę, która przyjmuje deszcz, słońce i mróz. Drewno nie jest wtedy wystawione na pogodę, więc rzadziej wymaga odnawiania.',
          'Kolor nakładki może być inny niż kolor drewna, na przykład antracyt na elewacji i dąb we wnętrzu. W nowym domu okna drewniane, tak jak każde inne, warto osadzić w technologii [ciepłego montażu](/cieply-montaz-okien/).',
        ],
      },
      {
        id: 'kamienice',
        h2: 'Okna do kamienic i budynków zabytkowych w Płocku',
        body: [
          'Część budynków na Starym Mieście w Płocku i w centrum znajduje się pod ochroną konserwatorską. Wymiana okien wymaga tam zwykle uzgodnienia z Miejskim Konserwatorem Zabytków, który może określić materiał, podziały, szprosy i kolor stolarki.',
          'Okna drewniane najłatwiej dopasować do historycznych wzorów. Jeśli masz już wytyczne konserwatora, przygotujemy ofertę zgodną z nimi. Pracowaliśmy w zabytkowej kamienicy: łukowe drzwi dwuskrzydłowe z naświetlem zobaczysz w [realizacjach](/realizacje/).',
        ],
      },
      {
        id: 'pielegnacja',
        h2: 'Pielęgnacja i serwis',
        body: [
          'Okno drewniane wymaga więcej uwagi niż okno PCV czy aluminiowe. Raz w roku warto obejrzeć powłokę od zewnątrz, zwłaszcza dolne części ramy i skrzydła. Drobne uszkodzenia lakieru najlepiej poprawić od razu, zanim woda dostanie się do drewna.',
          'Okucia, jak w każdym oknie, trzeba co jakiś czas przesmarować i w razie potrzeby wyregulować. Zakres opieki po montażu i warunki gwarancji producenta omawiamy przy zamówieniu.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy okna drewniane są trwałe?',
        a: 'Tak, jeśli są dobrze wykonane, osadzone i regularnie doglądane. Klejonka trzyma kształt, a współczesne powłoki chronią drewno przed wilgocią i promieniowaniem UV. Najmniej zabiegów wymaga wersja drewniano-aluminiowa, w której drewno od zewnątrz osłania nakładka.',
      },
      {
        q: 'Czy do kamienicy w strefie konserwatorskiej potrzebne jest pozwolenie?',
        a: 'W budynkach wpisanych do rejestru zabytków lub objętych ochroną konserwatorską wymiana okien zwykle wymaga uzgodnień. Zasady zależą od konkretnego budynku, dlatego przed zamówieniem zapytaj Miejskiego Konserwatora Zabytków w Płocku. Ofertę przygotujemy zgodnie z otrzymanymi wytycznymi.',
      },
      {
        q: 'Drewno czy PCV w okleinie drewnopodobnej?',
        a: 'Okleina dobrze oddaje kolor drewna i nie wymaga konserwacji. Drewno ma jednak naturalną fakturę i lepiej pasuje do budynków historycznych. Jeśli zależy Ci na autentycznym materiale albo wymaga tego konserwator, wybierz drewno. Okleiny opisujemy na stronie [okna PCV](/okna-pcv/).',
      },
      {
        q: 'Czy pomiar jest bezpłatny?',
        a: 'Tak. Przyjeżdżamy na pomiar, doradzamy wybór systemu i wykończenia, a potem przygotowujemy bezpłatną, niezobowiązującą wycenę. Okna montuje nasza ekipa, bez podwykonawców.',
      },
    ],
    related: ['okna', 'okna-pcv', 'drzwi-zewnetrzne', '/cieply-montaz-okien/'],
    photoTags: [],
    cta: 'pomiar',
    serviceType: 'Sprzedaż i montaż okien drewnianych',
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- DRZWI TARASOWE
  {
    slug: 'drzwi-tarasowe',
    title: 'Drzwi tarasowe',
    menuGroup: 'okna',
    short: 'Drzwi tarasowe przesuwne, podnoszono-przesuwne i uchylno-przesuwne. Duże przeszklenia z niskim progiem, dobrane do tarasu.',
    seo: {
      title: 'Drzwi tarasowe Płock – HST, przesuwne, SkyLine',
      description:
        'Drzwi podnoszono-przesuwne HST, uchylno-przesuwne i minimalistyczne SkyLine. Wielkie przeszklenia z niskim progiem, montaż własną ekipą.',
      h1: 'Drzwi tarasowe i przesuwne w Płocku',
    },
    lead: 'Dobieramy i montujemy **drzwi tarasowe** do domów w Płocku i okolicach: przesuwne, podnoszono-przesuwne i uchylne, w PCV lub aluminium. Duże przeszklenia wymagają precyzyjnego osadzenia, dlatego zawsze robi to nasza ekipa.',
    // AI illustration – replace with an own photo (docs/do-uzupelnienia.md)
    heroImage: '/img/ai/ai-hst-taras.webp',
    heroAlt: 'Otwarte drzwi tarasowe HST z niskim progiem, prowadzące z salonu na taras i do ogrodu',
    highlights: ['Autoryzowany partner DAKO', 'Bezpłatny pomiar i wycena', 'Montaż wyłącznie własną ekipą'],
    brands: ['DAKO', 'Sonarol', 'All Windows Group'],
    sections: [
      {
        id: 'rodzaje',
        h2: 'HST, uchylno-przesuwne, SkyLine, harmonijkowe: porównanie',
        body: [
          'Rodzaj drzwi tarasowych wybiera się według szerokości otworu, sposobu korzystania z tarasu i oczekiwanego progu. W ofercie DAKO są m.in. drzwi podnoszono-przesuwne HST, uchylno-przesuwne SmartMove, minimalistyczne SkyLine oraz drzwi harmonijkowe. Dostępność konkretnego systemu i jego wymiary potwierdzamy przy wycenie.',
        ],
        items: [
          {
            title: 'Podnoszono-przesuwne (HST)',
            text: 'Po obrocie klamki skrzydło unosi się i przesuwa lekko mimo dużej wagi. Pozwala na szerokie otwarcie i bardzo niski próg. Wybór do dużych otworów i codziennego wychodzenia na taras.',
          },
          {
            title: 'Uchylno-przesuwne',
            text: 'Skrzydło uchyla się jak okno albo odsuwa równolegle do ściany. Prostsza konstrukcja niż HST, dobra przy średnich otworach i tam, gdzie liczy się wietrzenie przez uchył.',
          },
          {
            title: 'SkyLine',
            text: 'Minimalistyczny system przesuwny z bardzo wąskimi profilami, w którym rama niemal znika. Dla wnętrz, w których szkło ma dominować nad ramą.',
          },
          {
            title: 'Harmonijkowe',
            text: 'Skrzydła składają się jak harmonia i otwierają prawie całą szerokość otworu. Dobre przy tarasach, które latem stają się przedłużeniem salonu.',
          },
        ],
        links: [{ label: 'HST czy PSK – jakie drzwi tarasowe wybrać', href: '/poradnik/drzwi-tarasowe-hst-czy-psk/' }],
      },
      {
        id: 'pcv-czy-aluminium',
        h2: 'PCV czy aluminium',
        body: [
          'Drzwi tarasowe z PCV dobrze izolują i są naturalnym wyborem, gdy pozostałe okna w domu też są z PCV. Aluminium jest sztywniejsze, więc przy tej samej wielkości przeszklenia pozwala na większe skrzydła i węższe profile.',
          'Kolor i okleinę dopasujemy do pozostałych okien, aby elewacja była spójna. Jeśli w domu mają być [okna aluminiowe](/okna-aluminiowe/), drzwi tarasowe najczęściej projektuje się w tym samym systemie. Przy oknach z PCV zobacz [okna PCV](/okna-pcv/).',
        ],
      },
      {
        id: 'prog-i-szczelnosc',
        h2: 'Niski próg i szczelność',
        body: [
          'Niski próg ułatwia wychodzenie na taras, przejazd wózkiem i sprzątanie. Wymaga jednak starannego przygotowania podłoża i odprowadzenia wody, bo próg leży niemal na poziomie posadzki. Szczegóły warto ustalić przed wylaniem posadzek i wykonaniem tarasu.',
          'Szczelność drzwi przesuwnych zależy od uszczelek, regulacji skrzydła i montażu. Źle podparty próg ugina się pod ciężarem skrzydła, a wtedy pojawiają się przewiew i opór przy przesuwaniu. Dlatego podparcie progu to jeden z najważniejszych etapów montażu.',
        ],
      },
      {
        id: 'wymiary-i-statyka',
        h2: 'Maksymalne wymiary i statyka',
        body: [
          'Maksymalna wielkość skrzydła zależy od systemu, materiału i pakietu szyb. Ogranicza ją ciężar szkła, nośność okuć i sztywność profili. Duże zestawy dzieli się na kilka pól: skrzydła przesuwne i nieruchome fixy.',
          'Równie ważny jest budynek. Nadproże nad szerokim otworem nie może się uginać, bo zablokuje skrzydło. Dlatego przy dużych drzwiach tarasowych prosimy o projekt lub rzut z wymiarami otworu. Graniczne wymiary dla wybranego systemu podajemy w ofercie.',
        ],
      },
      {
        id: 'montaz-duzych-skrzydel',
        h2: 'Montaż dużych skrzydeł',
        body: [
          'Skrzydło drzwi podnoszono-przesuwnych z pakietem trzyszybowym jest ciężkie i nie da się go bezpiecznie osadzić samymi rękami. Przy dużych taflach używa się minidźwigu lub manipulatora z przyssawką próżniową. Takie montaże widać na zdjęciach z naszych budów.',
          'Ekipa poziomuje i podpiera próg, kotwi ościeżnicę, osadza skrzydła i reguluje je tak, by przesuwały się lekko. Na koniec sprawdza działanie okuć i szczelność drzwi.',
        ],
      },
      {
        id: 'ceny',
        h2: 'Ceny',
        body: [
          'Cena drzwi tarasowych zależy przede wszystkim od systemu, wymiarów, liczby skrzydeł i pakietu szyb. Znaczenie mają też kolor, rodzaj progu, dodatkowe zabezpieczenia oraz to, czy montaż wymaga sprzętu do podnoszenia szkła.',
          'Wyślij nam rzut tarasu lub projekt domu albo umów pomiar. Po pomiarze przygotujemy bezpłatną, niezobowiązującą wycenę z montażem. Przy dużych przeszkleniach od południa warto od razu zaplanować [żaluzje fasadowe](/zaluzje-fasadowe/) lub [rolety zewnętrzne z moskitierą](/rolety-zewnetrzne/).',
        ],
      },
    ],
    faq: [
      {
        q: 'HST czy drzwi uchylno-przesuwne?',
        a: 'HST wybiera się do szerokich otworów i codziennego używania: skrzydło przesuwa się lekko mimo dużej wagi, a próg może być bardzo niski. Drzwi uchylno-przesuwne mają prostszą konstrukcję i pozwalają uchylić skrzydło jak okno. Więcej w poradniku [HST czy PSK](/poradnik/drzwi-tarasowe-hst-czy-psk/).',
      },
      {
        q: 'Czy do drzwi tarasowych można zamontować moskitierę?',
        a: 'Tak. Do drzwi przesuwnych stosuje się moskitiery przesuwne lub plisowane, które nie blokują wyjścia na taras. Moskitiery mamy w ofercie i najlepiej zmierzyć je razem z drzwiami. Zobacz [rolety zewnętrzne i moskitiery](/rolety-zewnetrzne/).',
      },
      {
        q: 'Na jakim etapie budowy zamówić drzwi tarasowe?',
        a: 'Najlepiej w stanie surowym, przed wylewkami i wykonaniem tarasu. Wtedy można dopasować poziom progu do posadzki i zaplanować odpływ wody. Ostateczny pomiar robimy, gdy otwór jest gotowy.',
      },
      OWN_CREW_FAQ('drzwi tarasowe'),
    ],
    related: ['okna-aluminiowe', 'okna-pcv', 'zaluzje-fasadowe', 'rolety-zewnetrzne'],
    photoTags: ['drzwi-tarasowe', 'przeszklenia'],
    cta: 'pomiar',
    serviceType: 'Sprzedaż i montaż drzwi tarasowych',
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- DRZWI ZEWNĘTRZNE
  {
    slug: 'drzwi-zewnetrzne',
    title: 'Drzwi zewnętrzne',
    menuGroup: 'drzwi',
    short: 'Drzwi wejściowe do domu i mieszkania: stalowe i drewniane od Wikęd, Erkado, Gerda, Barański, Doorsystem i Dallas.',
    seo: {
      title: 'Drzwi zewnętrzne Płock – wejściowe z montażem',
      description:
        'Drzwi wejściowe do domu: aluminiowe, stalowe i drewniane od Wikęd, Gerda, Erkado i DAKO. Dobór, pomiar i montaż własną ekipą w Płocku.',
      h1: 'Drzwi zewnętrzne do domu – Płock i okolice',
    },
    lead: 'Dobieramy **drzwi zewnętrzne** do domów i mieszkań w Płocku i okolicach: stalowe, drewniane i aluminiowe, od sprawdzonych producentów. Pomagamy wybrać model, zabezpieczenia i kolor, a montaż wykonuje nasza ekipa.',
    heroImage: '/img/realizacje/drzwi-zewnetrzne-orzech-wejscie-wykonczone.webp',
    heroAlt: 'Drzwi wejściowe w okleinie orzech z bocznym doświetleniem w wykończonym wejściu do domu',
    highlights: ['Wikęd, Erkado, Gerda, Barański, Doorsystem, Dallas', 'Drzwi stalowe i drewniane', 'Bezpłatny pomiar i wycena', 'Montaż wyłącznie własną ekipą'],
    brands: ['Wikęd', 'Erkado', 'Doorsystem', 'Barański', 'Gerda', 'Dallas'],
    sections: [
      {
        id: 'producenci',
        h2: 'Producenci i linie',
        body: [
          'Drzwi wejściowe zamawiamy u producentów, z którymi współpracujemy: Wikęd, Erkado, Doorsystem, Barański, Gerda i Dallas. Każdy z nich ma kilka linii, które różnią się konstrukcją skrzydła, izolacyjnością i zabezpieczeniami. W ofercie DAKO są też drzwi aluminiowe, które można dopasować do okien tego producenta.',
          'Nie musisz przeglądać dziesiątek katalogów. Opowiedz nam o domu i swoich oczekiwaniach, a wybierzemy modele pasujące do elewacji, strony świata i budżetu i zestawimy je w jednej ofercie.',
        ],
      },
      {
        id: 'materialy',
        h2: 'Aluminium, stal czy drewno',
        items: [
          {
            title: 'Stal',
            text: 'Częsty wybór do domów jednorodzinnych. Ocieplone stalowe skrzydło dobrze izoluje i jest odporne na uszkodzenia, a okleina lub lakier pozwalają dobrać wygląd do elewacji.',
          },
          {
            title: 'Drewno',
            text: 'Naturalny materiał o ciepłym charakterze, dobry do domów o klasycznej architekturze i budynków zabytkowych. Wymaga okresowej pielęgnacji powłoki.',
          },
          {
            title: 'Aluminium',
            text: 'Sztywne i odporne na pogodę. Pozwala na duże skrzydła, przeszklenia i długie pochwyty. Często wybierane razem z aluminiowymi oknami.',
          },
        ],
        body: [
          'O wyborze decydują styl domu, ekspozycja na słońce i deszcz oraz to, czy drzwi mają tworzyć całość z oknami i [bramą garażową](/bramy-garazowe/).',
        ],
      },
      {
        id: 'bezpieczenstwo',
        h2: 'Bezpieczeństwo: klasa RC, zamki, elektronika',
        body: [
          'Klasa odporności na włamanie, oznaczana jako **RC2**, **RC3** i wyżej, mówi, jak długo drzwi wytrzymują próbę sforsowania określonymi narzędziami. Do domu jednorodzinnego zwykle wystarcza RC2. W mieszkaniu zwraca się uwagę także na izolację akustyczną od klatki schodowej.',
          'Wkładka i zamki dodatkowe są tak samo ważne jak samo skrzydło. Coraz częściej wybierane są zamki elektroniczne: z czytnikiem linii papilarnych, kodem lub aplikacją w telefonie. Taki zamek trzeba zaplanować razem z zasilaniem, najlepiej przed tynkami.',
        ],
      },
      {
        id: 'cieplo-i-prog',
        h2: 'Ciepło, próg i strona świata',
        body: [
          'Drzwi wejściowe otwiera się wiele razy dziennie, a ich izolacyjność wpływa na komfort w wiatrołapie i na rachunki za ogrzewanie. Liczy się współczynnik U całych drzwi, a nie tylko grubość skrzydła, oraz ciepły próg, który ogranicza mostek termiczny przy posadzce.',
          'Strona świata też ma znaczenie. Ciemne drzwi od południa i zachodu mocno nagrzewają się w słońcu, co przy stali może powodować odkształcenia skrzydła. Producenci podają ograniczenia dla ciemnych kolorów, a my bierzemy je pod uwagę przy doborze.',
        ],
      },
      {
        id: 'drzwi-do-mieszkania',
        h2: 'Drzwi do mieszkania w bloku',
        body: [
          'Drzwi wejściowe dobieramy i montujemy także w mieszkaniach. Liczą się tu przede wszystkim bezpieczeństwo, wyciszenie od strony klatki schodowej i dopasowanie do istniejącego otworu. W blokach często trzeba też zachować wygląd ustalony przez spółdzielnię lub wspólnotę.',
          'Przy pomiarze sprawdzimy otwór i ościeżnicę, a przy wycenie uwzględnimy demontaż starych drzwi i wykończenie po montażu.',
        ],
      },
      {
        id: 'ceny',
        h2: 'Ceny',
        body: [
          'Na cenę drzwi zewnętrznych wpływają materiał i konstrukcja skrzydła, klasa odporności na włamanie, izolacyjność, przeszklenia i doświetla, rodzaj zamków oraz kolor i okucia. Do tego dochodzi zakres prac, na przykład demontaż starych drzwi i obróbka progu.',
          'Po bezpłatnym pomiarze przygotujemy niezobowiązującą wycenę z montażem. Jeśli planujesz też drzwi do pokoi, zobacz [drzwi wewnętrzne z montażem](/drzwi-wewnetrzne/).',
        ],
      },
    ],
    faq: [
      {
        q: 'Jakie drzwi zewnętrzne wybrać do domu?',
        a: 'Zacznij od bezpieczeństwa i izolacji, a potem dobierz wygląd. Do domu jednorodzinnego często wybiera się ocieplone drzwi stalowe w klasie RC2, a do domu o klasycznym charakterze drzwi drewniane. Kolor warto zgrać z oknami i bramą garażową.',
      },
      {
        q: 'Czy da się zamontować drzwi z czytnikiem linii papilarnych?',
        a: 'Tak, wielu producentów oferuje drzwi z zamkiem elektronicznym i czytnikiem. Trzeba wtedy doprowadzić zasilanie do ościeżnicy, więc najlepiej zaplanować to przed tynkami. Model i sposób zasilania ustalimy przy pomiarze.',
      },
      {
        q: 'Czy drzwi można dopasować kolorem do bramy garażowej?',
        a: 'W wielu przypadkach tak. Kolory takie jak antracyt czy złoty dąb są dostępne zarówno w drzwiach, jak i w bramach. Przy wycenie sprawdzamy, czy odcienie u obu producentów do siebie pasują. Zobacz [bramy garażowe](/bramy-garazowe/).',
      },
      {
        q: 'Czy pomiar drzwi jest bezpłatny?',
        a: 'Tak. Przyjeżdżamy na pomiar, sprawdzamy otwór i próg, doradzamy model i przygotowujemy bezpłatną, niezobowiązującą wycenę. Drzwi montuje nasza ekipa, bez podwykonawców.',
      },
    ],
    related: ['drzwi-wewnetrzne', 'bramy-garazowe', 'okna-pcv', 'drzwi-tarasowe'],
    photoTags: ['drzwi-zewnetrzne'],
    cta: 'pomiar',
    serviceType: 'Sprzedaż i montaż drzwi zewnętrznych',
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- DRZWI WEWNĘTRZNE
  {
    slug: 'drzwi-wewnetrzne',
    title: 'Drzwi wewnętrzne',
    menuGroup: 'drzwi',
    short: 'Drzwi wewnętrzne DRE, Porta, Erkado, Lagrus, Pol-Skone, Barański i Dallas z pomiarem, ościeżnicami i montażem.',
    seo: {
      title: 'Drzwi wewnętrzne Płock – DRE, Porta, Erkado z montażem',
      description:
        'Drzwi wewnętrzne DRE, Porta, Erkado, Lagrus, Pol-Skone i Barański, także bezprzylgowe i ukryte. Pomiar i montaż w Płocku i okolicach.',
      h1: 'Drzwi wewnętrzne z montażem w Płocku',
    },
    lead: 'Proponujemy **drzwi wewnętrzne** z montażem w Płocku i okolicach: modele DRE, Porta, Erkado, Lagrus, Pol-Skone, Barański i Dallas. Mierzymy otwory, dobieramy ościeżnice i montujemy własną ekipą.',
    heroImage: '/img/realizacje/drzwi-wewnetrzne-dab-korytarz.webp',
    heroAlt: 'Korytarz z kilkorgiem drzwi wewnętrznych w okleinie dąb z czarnymi akcentami',
    highlights: ['DRE, Porta, Erkado, Lagrus, Pol-Skone, Barański, Dallas', 'Bezpłatny pomiar i wycena', 'Montaż wyłącznie własną ekipą'],
    brands: ['DRE', 'Porta', 'Erkado', 'Lagrus', 'Pol-Skone', 'Barański', 'Dallas'],
    sections: [
      {
        id: 'producenci',
        h2: 'Producenci',
        body: [
          'Drzwi wewnętrzne wybieramy razem z Tobą z kolekcji siedmiu producentów: DRE, Porta, Erkado, Lagrus, Pol-Skone, Barański i Dallas. Różnią się stylistyką, konstrukcją skrzydeł, rodzajem wykończenia i dostępnymi ościeżnicami.',
          'Pomagamy zawęzić wybór do kilku modeli, które pasują do wnętrza i sposobu użytkowania. Inne drzwi sprawdzą się w łazience, inne w sypialni od strony głośnego korytarza. Kolor i wykończenie warto zgrać z podłogą i listwami.',
          'Przed pomiarem dobrze jest przemyśleć kilka rzeczy, które wpływają na wybór modelu i ościeżnicy:',
        ],
        bullets: [
          'kierunek otwierania i szerokość skrzydła w każdym pomieszczeniu',
          'skrzydło pełne czy przeszklone, na przykład w salonie lub przedpokoju bez okna',
          'wykończenie: okleina, lakier lub skrzydło do malowania',
          'zamek: na klucz, łazienkowy lub z wkładką do drzwi, które mają się zamykać',
          'drzwi przesuwne tam, gdzie brakuje miejsca na otwierane skrzydło',
        ],
      },
      {
        id: 'bezprzylgowe-i-ukryte',
        h2: 'Drzwi bezprzylgowe i ukryte',
        // AI illustration
        image: { src: '/img/ai/ai-drzwi-wewnetrzne-bezprzylgowe.webp', alt: 'Jasny korytarz z drzwiami wewnętrznymi bezprzylgowymi w kolorze ściany i czarnymi klamkami', width: 1293, height: 1600 },
        body: [
          'W drzwiach bezprzylgowych skrzydło licuje się z ościeżnicą, więc po zamknięciu tworzy z nią jedną płaszczyznę. Zawiasy są ukryte, a drzwi wyglądają spokojniej niż klasyczne skrzydło z przylgą. To dobry wybór do nowoczesnych i minimalistycznych wnętrz.',
          'W drzwiach ukrytych skrzydło licuje się ze ścianą i można je pomalować lub wykończyć tak jak ścianę. Wymagają dokładnego przygotowania otworu i współpracy z ekipą wykończeniową. Dostępność takich rozwiązań u wybranego producenta potwierdzamy przy wycenie.',
        ],
      },
      {
        id: 'oscieznice',
        h2: 'Ościeżnice',
        body: [
          'Ościeżnica regulowana obejmuje mur z obu stron i maskuje nierówności ściany. Ma zakres regulacji, więc dopasowuje się do grubości muru. Ościeżnica stała jest prostsza, ale wymaga dokładnie przygotowanego otworu. Przy drzwiach bezprzylgowych stosuje się zwykle ościeżnice systemowe danego producenta.',
          'Grubość ściany, wymiar otworu i poziom gotowej podłogi sprawdzamy przy pomiarze. Najlepiej, gdy tynki i posadzki są już wykonane, bo wtedy ościeżnica trafia na swoje miejsce bez poprawek.',
        ],
      },
      {
        id: 'ceny',
        h2: 'Ceny',
        body: [
          'Cena drzwi wewnętrznych zależy od konstrukcji skrzydła, rodzaju okleiny lub lakieru, przeszklenia, okuć i typu ościeżnicy. Drzwi bezprzylgowe i ukryte wymagają systemowych ościeżnic i dokładniejszego montażu.',
          'Po bezpłatnym pomiarze przygotujemy wycenę obejmującą drzwi, ościeżnice i montaż. Jeśli wymieniasz też drzwi wejściowe, zobacz [drzwi zewnętrzne](/drzwi-zewnetrzne/). Termin pomiaru najprościej ustalić przez [formularz kontaktowy](/kontakt/).',
        ],
      },
    ],
    faq: [
      {
        q: 'Kiedy zamówić drzwi wewnętrzne?',
        a: 'Pomiar najlepiej zrobić, gdy ściany są otynkowane, a posadzki wylane, bo wtedy wymiary otworów są ostateczne. Zamówienie składamy po pomiarze, a montaż planujemy po ułożeniu podłóg i malowaniu.',
      },
      {
        q: 'Czym różnią się drzwi przylgowe od bezprzylgowych?',
        a: 'W drzwiach przylgowych skrzydło nachodzi na ościeżnicę i widać zawiasy. W bezprzylgowych skrzydło licuje się z ościeżnicą, a zawiasy są ukryte. Efekt jest spokojniejszy, ale wymaga dokładniejszego montażu.',
      },
      {
        q: 'Czy drzwi do łazienki muszą mieć otwory wentylacyjne?',
        a: 'Zwykle tak. W pomieszczeniach z wentylacją grawitacyjną lub mechaniczną drzwi muszą zapewniać dopływ powietrza, na przykład przez tuleje lub podcięcie skrzydła. Odpowiedni wariant dobierzemy przy wycenie.',
      },
      OWN_CREW_FAQ('drzwi wewnętrzne'),
    ],
    related: ['drzwi-zewnetrzne', 'okna', '/kontakt/'],
    photoTags: ['drzwi-wewnetrzne'],
    cta: 'pomiar',
    serviceType: 'Sprzedaż i montaż drzwi wewnętrznych',
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- ROLETY ZEWNĘTRZNE
  {
    slug: 'rolety-zewnetrzne',
    title: 'Rolety zewnętrzne',
    menuGroup: 'oslony',
    short: 'Rolety zewnętrzne podtynkowe, nadstawne i elewacyjne z napędem ręcznym lub elektrycznym, a do tego moskitiery.',
    seo: {
      title: 'Rolety zewnętrzne Płock – podtynkowe i nadstawne',
      description:
        'Rolety zewnętrzne DAKO podtynkowe, nadstawne i elewacyjne, z napędem i sterowaniem Smart Home. Do tego moskitiery. Montaż w Płocku i okolicy.',
      h1: 'Rolety zewnętrzne w Płocku',
    },
    lead: 'Montujemy **rolety zewnętrzne** w Płocku i okolicach: podtynkowe, nadstawne i elewacyjne, z napędem ręcznym lub elektrycznym. Proponujemy rolety DAKO oraz Fart Produkt, Fill, Medos i Romex, a do tego moskitiery.',
    // AI illustration – replace with an own photo (docs/do-uzupelnienia.md)
    heroImage: '/img/ai/ai-rolety-zewnetrzne.webp',
    heroAlt: 'Parterowy dom z białą elewacją i roletą zewnętrzną w kolorze antracytu, opuszczoną do połowy okna',
    highlights: ['Rolety DAKO, Fart Produkt, Fill, Medos, Romex', 'Moskitiery w ofercie', 'Bezpłatny pomiar i wycena', 'Montaż wyłącznie własną ekipą'],
    brands: ['DAKO', 'Fart Produkt', 'Fill', 'Medos', 'Romex'],
    sections: [
      {
        id: 'rodzaje',
        h2: 'Podtynkowe, nadstawne, elewacyjne',
        body: [
          'Pancerz rolety, czyli zestaw aluminiowych profili, chroni okno przed słońcem, wiatrem i wzrokiem z zewnątrz. Różnice między systemami dotyczą głównie tego, gdzie chowa się skrzynka z pancerzem. Kolor pancerza i skrzynki dobierzemy do okien i elewacji.',
        ],
        items: [
          {
            title: 'Podtynkowe',
            text: 'Skrzynka chowa się w ociepleniu nad oknem i po otynkowaniu jest niewidoczna. Najczystszy efekt, ale wymagają zaplanowania na etapie budowy lub termomodernizacji.',
          },
          {
            title: 'Nadstawne',
            text: 'Skrzynka jest montowana razem z oknem, na jego górnej ramie. Od zewnątrz przykrywa ją ocieplenie, od środka widać klapę rewizyjną. Rozwiązanie dla nowych okien.',
          },
          {
            title: 'Elewacyjne',
            text: 'Skrzynka jest mocowana na elewacji lub we wnęce okiennej. Można ją zamontować w domu już zamieszkałym, bez wymiany okien i kucia ścian.',
          },
        ],
      },
      {
        id: 'kiedy-planowac',
        h2: 'Kiedy planować: budowa czy dom zamieszkały',
        body: [
          'Najwięcej możliwości daje etap budowy. Jeśli zaplanujesz rolety przed zamówieniem okien i ocieplenia, możesz wybrać system podtynkowy lub nadstawny, a przewody do napędów rozprowadzić w ścianach. Rolety nadstawne warto zamówić razem z nowymi [oknami PCV](/okna-pcv/).',
          'W domu zamieszkałym zwykle wybiera się rolety elewacyjne. Montaż nie wymaga ingerencji w okna ani w tynk wewnątrz. Przy pomiarze sprawdzimy, czy we wnęce jest miejsce na skrzynkę i jak doprowadzić zasilanie do napędu.',
        ],
      },
      {
        id: 'napedy-i-sterowanie',
        h2: 'Napędy, sterowanie, DAKO Smart Home',
        body: [
          'Roletą można sterować ręcznie, korbą lub taśmą, albo silnikiem z przełącznikiem ściennym i pilotem. Napęd elektryczny jest szczególnie wygodny przy dużych oknach i drzwiach tarasowych, gdzie pancerz jest ciężki.',
          'Rolety elektryczne można łączyć w grupy, sterować nimi z telefonu i ustawić harmonogram, na przykład opuszczanie o zmroku. W ofercie DAKO jest system DAKO Smart Home do sterowania osłonami. Czy wybrany zestaw z nim współpracuje, sprawdzamy przy doborze napędów.',
        ],
      },
      {
        id: 'bezpieczenstwo-i-upal',
        h2: 'Bezpieczeństwo i ochrona przed upałem',
        body: [
          'Opuszczona roleta utrudnia dostęp do okna i zasłania wnętrze. Większą odporność na podważenie dają blokady pancerza i profile ekstrudowane, sztywniejsze od standardowych, dlatego przy oknach na parterze warto o nie zapytać.',
          'Latem roleta zatrzymuje słońce przed szybą, a nie za nią, jak zasłona. Dzięki temu pokoje od południa i zachodu mniej się nagrzewają. Jeśli chcesz regulować ilość światła bez zaciemniania wnętrza, porównaj rolety z [żaluzjami fasadowymi](/zaluzje-fasadowe/).',
        ],
      },
      {
        id: 'moskitiery',
        h2: 'Moskitiery',
        body: [
          'Moskitierę dobiera się do rodzaju okna lub drzwi. W oknach najczęściej stosuje się moskitiery ramkowe, zakładane na sezon. Do drzwi balkonowych i tarasowych pasują moskitiery drzwiowe, przesuwne albo plisowane, które nie zabierają miejsca w przejściu.',
          'Wygodną opcją bywa moskitiera zintegrowana z roletą, która rozwija się w tych samych prowadnicach co pancerz. Moskitiery mamy w ofercie i mierzymy je razem z roletami lub oknami albo osobno.',
        ],
      },
      {
        id: 'ceny',
        h2: 'Ceny',
        body: [
          'Cena rolety zewnętrznej zależy od systemu montażu, wymiarów okna, rodzaju pancerza, koloru i napędu. Rolety podtynkowe i nadstawne planuje się razem z oknami, więc ich koszt warto ująć w jednej wycenie.',
          'Po bezpłatnym pomiarze przygotujemy wycenę rolet z montażem, a jeśli chcesz, także z moskitierami. Różnice między roletami a żaluzjami opisujemy w poradniku [żaluzje fasadowe czy rolety zewnętrzne](/poradnik/zaluzje-fasadowe-czy-rolety-zewnetrzne/).',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy rolety można zamontować w domu, w którym już mieszkam?',
        a: 'Tak. W takim przypadku zwykle wybiera się rolety elewacyjne montowane na fasadzie lub we wnęce okna. Nie wymagają wymiany okien ani kucia tynku wewnątrz. Przy napędzie elektrycznym trzeba doprowadzić zasilanie, co ustalamy przy pomiarze.',
      },
      {
        q: 'Podtynkowe czy nadstawne?',
        a: 'Po wykończeniu elewacji oba systemy są z zewnątrz niewidoczne. Skrzynka podtynkowa leży w ociepleniu, nadstawna na oknie, z klapą rewizyjną od środka. Wybór zależy od grubości ocieplenia, wysokości nadproża i tego, czy okna są już zamówione.',
      },
      {
        q: 'Czy roleta chroni przed włamaniem?',
        a: 'Utrudnia dostęp do okna, ale nie zastępuje dobrych okuć i szyb. Jeśli bezpieczeństwo jest ważne, wybierz pancerz z profili ekstrudowanych i blokady przeciw podnoszeniu. Najlepszy efekt daje połączenie rolet z oknami o podwyższonej odporności na włamanie.',
      },
      {
        q: 'Czy montujecie też moskitiery?',
        a: 'Tak, moskitiery mamy w ofercie. Rodzaj dobieramy do okna lub drzwi, a pomiar możemy zrobić razem z pomiarem rolet. Montaż, jak przy wszystkich naszych produktach, wykonuje nasza ekipa.',
      },
    ],
    related: ['zaluzje-fasadowe', 'okna-pcv', 'drzwi-tarasowe', 'bramy-garazowe'],
    photoTags: [],
    cta: 'pomiar',
    serviceType: 'Sprzedaż i montaż rolet zewnętrznych',
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- ŻALUZJE FASADOWE
  {
    slug: 'zaluzje-fasadowe',
    title: 'Żaluzje fasadowe',
    menuGroup: 'oslony',
    short: 'Żaluzje fasadowe podtynkowe i samonośne: regulacja światła lamelami i ochrona dużych przeszkleń przed przegrzewaniem.',
    seo: {
      title: 'Żaluzje fasadowe Płock – projekt i montaż | Inter Windows',
      description:
        'Żaluzje fasadowe DAKO podtynkowe i samonośne: pełna kontrola światła i chłodniejszy dom latem. Projekt, pomiar i montaż w Płocku i okolicach.',
      h1: 'Żaluzje fasadowe w Płocku',
    },
    lead: 'Planujemy i montujemy **żaluzje fasadowe** w Płocku i okolicach. Lamele ustawisz pod różnym kątem, więc wpuścisz światło, a zatrzymasz słońce i upał. Proponujemy żaluzje DAKO oraz Fart Produkt, Fill, Medos i Romex.',
    // AI illustration – replace with an own photo (docs/do-uzupelnienia.md)
    heroImage: '/img/ai/ai-zaluzje-fasadowe.webp',
    heroAlt: 'Żaluzje fasadowe w kolorze antracytu na dużych oknach białej elewacji domu jednorodzinnego',
    highlights: ['Żaluzje DAKO, Fart Produkt, Fill, Medos, Romex', 'Bezpłatny pomiar i wycena', 'Montaż wyłącznie własną ekipą'],
    brands: ['DAKO', 'Fart Produkt', 'Fill', 'Medos', 'Romex'],
    sections: [
      {
        id: 'rodzaje',
        h2: 'Typy: podtynkowe, samonośne, nadstawne',
        body: [
          'W każdym systemie lamele można całkowicie podnieść, opuścić i ustawić pod kątem. Różnice dotyczą sposobu montażu, który dobiera się do etapu budowy, grubości ocieplenia i wielkości przeszkleń.',
        ],
        items: [
          {
            title: 'Podtynkowe',
            text: 'Kaseta z pakietem lameli chowa się w ociepleniu nad oknem. Po wykończeniu elewacji widać tylko prowadnice. Trzeba je zaplanować na etapie budowy.',
          },
          {
            title: 'Samonośne',
            text: 'Żaluzja ma własną konstrukcję z prowadnicami, często z maskownicą kasety. Sprawdza się przy dużych przeszkleniach i tam, gdzie w ociepleniu nie ma miejsca na kasetę.',
          },
          {
            title: 'Nadstawne',
            text: 'Kaseta jest montowana na górnej ramie okna, podobnie jak w roletach nadstawnych. Rozwiązanie planowane razem z nowymi oknami.',
          },
        ],
      },
      {
        id: 'lamele',
        h2: 'Lamele Z90 i C80',
        body: [
          'Lamele różnią się kształtem przekroju. **Z90** mają profil w kształcie litery Z z uszczelką i po zamknięciu nachodzą na siebie, dzięki czemu dobrze zaciemniają pomieszczenie i pracują ciszej. **C80** mają łukowy przekrój i lżejszy wygląd. To klasyczny wybór, gdy żaluzja ma przede wszystkim regulować światło.',
          'Rodzaj lameli i kolor dobieramy do okien i elewacji. Dostępne warianty dla wybranego systemu omawiamy przy wycenie.',
        ],
      },
      {
        id: 'kiedy-planowac',
        h2: 'Na jakim etapie budowy zaplanować',
        body: [
          'Najlepiej na etapie projektu domu, najpóźniej przed zamówieniem okien. Żaluzje podtynkowe i nadstawne wymagają miejsca nad oknem, odpowiedniego nadproża i przewodów do silników. Później da się je dodać tylko w wersji samonośnej lub z widoczną kasetą.',
          'Jeśli masz projekt domu, przyślij go nam. Na konsultacji wskażemy okna, przy których żaluzje dadzą największy efekt, zwykle duże przeszklenia od południa i zachodu, i podpowiemy, co przekazać wykonawcy ocieplenia. Żaluzje najczęściej towarzyszą [oknom aluminiowym](/okna-aluminiowe/) i [drzwiom tarasowym](/drzwi-tarasowe/).',
        ],
      },
      {
        id: 'sterowanie',
        h2: 'Sterowanie i czujniki pogodowe',
        body: [
          'Żaluzje fasadowe mają zwykle napęd elektryczny. Sterujesz nimi przełącznikiem, pilotem lub aplikacją, możesz też zapisać ustawienia, na przykład „popołudnie latem” z lamelami pod kątem.',
          'Ważnym elementem jest czujnik wiatru. Lamele są wrażliwe na silne podmuchy, dlatego automatyka podnosi je, gdy wiatr przekroczy ustalony próg. Czujnik nasłonecznienia może z kolei opuszczać żaluzje, gdy słońce zaczyna nagrzewać wnętrze. W ofercie DAKO jest system DAKO Smart Home, który pozwala łączyć te funkcje.',
        ],
      },
      {
        id: 'zaluzje-czy-rolety',
        h2: 'Żaluzje czy rolety',
        body: [
          'Roleta zasłania okno pełnym pancerzem: zaciemnia całkowicie i utrudnia dostęp do okna. Żaluzja pozwala sterować światłem. Przy ustawionych lamelach w pokoju jest jasno, a słońce nie pada bezpośrednio na szybę.',
          'Wiele domów łączy oba rozwiązania: żaluzje przy dużych przeszkleniach w strefie dziennej, [rolety zewnętrzne](/rolety-zewnetrzne/) w sypialniach. Więcej w poradniku [żaluzje fasadowe czy rolety zewnętrzne](/poradnik/zaluzje-fasadowe-czy-rolety-zewnetrzne/).',
        ],
      },
      {
        id: 'ceny',
        h2: 'Ceny',
        body: [
          'Koszt żaluzji fasadowych zależy od liczby i szerokości okien, typu montażu, rodzaju lameli, koloru oraz automatyki: napędów, czujników i sterowania. Najwięcej zmienia to, czy żaluzje są zaplanowane w projekcie, czy dodawane do gotowej elewacji.',
          'Umów konsultację, najlepiej na etapie projektu. Po pomiarze przygotujemy bezpłatną, niezobowiązującą wycenę z montażem.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy żaluzje fasadowe można zamontować w gotowym domu?',
        a: 'Tak, ale wybór systemów jest mniejszy. Bez kucia elewacji można zamontować żaluzje samonośne lub z kasetą na elewacji. Wersja podtynkowa wymaga miejsca w ociepleniu, więc w gotowym domu zwykle się jej nie stosuje.',
      },
      {
        q: 'Czy żaluzje fasadowe hałasują przy wietrze?',
        a: 'Przy silnym wietrze lamele mogą pracować, dlatego stosuje się czujnik wiatru, który podnosi żaluzje, zanim podmuch je uszkodzi. Lamele Z90 z uszczelką pracują ciszej niż lżejsze profile. Dobór systemu omawiamy przy wycenie.',
      },
      {
        q: 'Żaluzje czy rolety – co lepiej chroni przed upałem?',
        a: 'Oba rozwiązania zatrzymują słońce przed szybą, więc działają skuteczniej niż osłony wewnętrzne. Roleta zaciemnia całkowicie, a żaluzja chroni przed słońcem bez rezygnacji ze światła dziennego. Przy dużych przeszkleniach w strefie dziennej częściej wybiera się żaluzje.',
      },
      OWN_CREW_FAQ('żaluzje fasadowe'),
    ],
    related: ['rolety-zewnetrzne', 'okna-aluminiowe', 'drzwi-tarasowe', '/poradnik/zaluzje-fasadowe-czy-rolety-zewnetrzne/'],
    photoTags: [],
    cta: 'konsultacja',
    serviceType: 'Sprzedaż i montaż żaluzji fasadowych',
    updated: UPDATED,
  },

  // ---------------------------------------------------------------- BRAMY GARAŻOWE
  {
    slug: 'bramy-garazowe',
    title: 'Bramy garażowe',
    menuGroup: 'bramy',
    short: 'Bramy segmentowe i rolowane DAKO z napędem, w kolorze dobranym do drzwi wejściowych i okien.',
    seo: {
      title: 'Bramy garażowe Płock – segmentowe z napędem | Inter Windows',
      description:
        'Bramy garażowe segmentowe DAKO Thermo i Standard oraz rolowane, z napędem i drzwiami bocznymi. Kolor dobrany do stolarki, montaż w Płocku.',
      h1: 'Bramy garażowe w Płocku',
    },
    lead: 'Montujemy **bramy garażowe** DAKO w Płocku i okolicach: segmentowe i rolowane, z napędem i sterowaniem z pilota lub telefonu. Kolor i przetłoczenia dobieramy tak, by brama tworzyła całość z drzwiami i oknami.',
    heroImage: '/img/realizacje/bramy-segmentowe-antracyt-elewacja-terakota-01.webp',
    heroAlt: 'Dwie bramy segmentowe w kolorze antracytu na elewacji w kolorze terakoty',
    highlights: ['Bramy garażowe DAKO', 'Autoryzowany partner DAKO', 'Bezpłatny pomiar i wycena', 'Montaż wyłącznie własną ekipą'],
    brands: ['DAKO'],
    sections: [
      {
        id: 'segmentowe',
        h2: 'Segmentowe Thermo 60 i Standard 40',
        body: [
          'Brama segmentowa składa się z poziomych paneli, które przy otwieraniu przesuwają się pod strop. Nie zajmuje miejsca przed garażem ani na ścianach, dlatego to najczęstszy wybór w domach jednorodzinnych. Na naszych montażach widać bramy segmentowe w antracycie, bieli i złotym dębie.',
          'W ofercie DAKO są m.in. bramy segmentowe Thermo 60 i Standard 40, które różnią się konstrukcją i izolacyjnością panelu. Wersję o lepszej izolacji warto rozważyć, gdy garaż jest w bryle domu lub jest ogrzewany. Parametry wybranej linii, wzory przetłoczeń i kolory pokażemy przy wycenie.',
        ],
      },
      {
        id: 'rolowane',
        h2: 'Rolowane',
        body: [
          'Brama rolowana zwija się w skrzynkę nad otworem, podobnie jak roleta okienna. Przydaje się tam, gdzie pod stropem garażu brakuje miejsca na prowadnice bramy segmentowej, na przykład przy niskim nadprożu albo instalacjach pod sufitem.',
          'Sprawdza się też w garażach wolnostojących i budynkach gospodarczych. Zwykle izoluje słabiej niż dobra brama segmentowa, dlatego do garażu w bryle domu częściej wybiera się bramę segmentową.',
        ],
      },
      {
        id: 'napedy',
        h2: 'Napędy i sterowanie z telefonu',
        body: [
          'Większość bram montuje się z napędem elektrycznym. Otwierasz je pilotem, przyciskiem w garażu albo z telefonu, jeśli napęd ma moduł sieciowy. Fotokomórki i czujnik przeszkody zatrzymują bramę, gdy coś znajdzie się w jej świetle.',
          'Napęd warto zgrać z resztą automatyki domu: bramą wjazdową, roletami i oświetleniem. W ofercie DAKO jest system DAKO Smart Home. Przy pomiarze sprawdzamy, gdzie doprowadzić zasilanie i czy w garażu jest miejsce na napęd i prowadnice.',
        ],
      },
      {
        id: 'drzwi-boczne',
        h2: 'Drzwi boczne i spójny design z drzwiami wejściowymi',
        body: [
          'Drzwi boczne w tym samym wzorze co brama pozwalają wejść do garażu bez otwierania całej bramy. To wygoda przy rowerach i narzędziach ogrodowych, a zimą mniej ciepła ucieka z garażu.',
          'Brama zajmuje dużą część elewacji, więc jej kolor powinien współgrać z oknami i [drzwiami zewnętrznymi](/drzwi-zewnetrzne/). Antracyt, złoty dąb czy biel można dobrać tak, by front domu był spójny. Kolory bramy, drzwi i okien zestawiamy w jednej ofercie.',
        ],
      },
      {
        id: 'ceny',
        h2: 'Ceny',
        body: [
          'Cena bramy garażowej zależy od wymiarów otworu, typu bramy, izolacyjności panelu, wzoru przetłoczeń, koloru oraz od napędu i dodatków, takich jak drzwi boczne, przeszklenia czy moduł do sterowania z telefonu.',
          'Po bezpłatnym pomiarze otworu i sprawdzeniu nadproża przygotujemy niezobowiązującą wycenę bramy z montażem. Jeśli wybierasz też drzwi wejściowe, zestawimy je w tej samej ofercie.',
        ],
      },
    ],
    faq: [
      {
        q: 'Jak przygotować otwór pod bramę segmentową?',
        a: 'Otwór powinien mieć równe ściany, wykonaną posadzkę lub przynajmniej ustalony jej poziom oraz miejsce nad otworem i pod stropem na prowadnice. Wymagane wymiary nadproża i przestrzeni bocznych sprawdzimy przy bezpłatnym pomiarze.',
      },
      {
        q: 'Brama segmentowa czy rolowana?',
        a: 'Do garażu w bryle domu zwykle wybiera się bramę segmentową, bo lepiej izoluje. Rolowana sprawdza się, gdy nad otworem lub pod stropem brakuje miejsca na prowadnice. Przy pomiarze powiemy, który typ zmieści się w Twoim garażu.',
      },
      {
        q: 'Czy bramę można otwierać telefonem?',
        a: 'Tak, jeśli napęd ma moduł sieciowy lub współpracuje z systemem automatyki domu. Brama otwiera się wtedy z aplikacji, a także z pilota i przycisku. Wariant sterowania wybierzemy przy wycenie.',
      },
      {
        q: 'Kto montuje bramy garażowe?',
        a: 'Nasza ekipa. Nie zlecamy montażu bram podwykonawcom. Monterzy osadzają prowadnice, ustawiają sprężyny, montują napęd i sprawdzają zabezpieczenia, zanim przekażą bramę do użytku.',
      },
    ],
    related: ['drzwi-zewnetrzne', 'rolety-zewnetrzne', 'okna-pcv'],
    photoTags: ['bramy-garazowe'],
    cta: 'pomiar',
    serviceType: 'Sprzedaż i montaż bram garażowych',
    updated: UPDATED,
  },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const childrenOf = (slug: string) => categories.filter((c) => c.parent === slug);
