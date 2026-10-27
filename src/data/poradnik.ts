// Guide articles (/poradnik/<slug>/) – the 4 P1 topics from docs/seo-plan.md §3.5 / §4.4.
// Rendered by src/pages/poradnik/[slug].astro, listed by src/pages/poradnik/index.astro.
//
// Text fields accept the rich() markup: [label](/path/) and **bold**.
// Rules for content: no invented prices, statistics or claims about the company. Things the client
// has not confirmed are left out or marked with `tbc` (renders a "do potwierdzenia" tag) and listed
// in docs/do-uzupelnienia.md ("Podstrony SEO i poradnik").
// Header images are AI illustrations (src/data/ai-zdjecia.ts) – never captioned as own work.

export type Block =
  | string
  | { h3: string }
  | { ul: string[] }
  | { ol: string[] }
  | { table: { caption?: string; head: string[]; rows: string[][] } }
  /** own realization photo (file from src/data/realizacje-zdjecia.ts) with a caption */
  | { photo: string; caption: string }
  /** highlighted box; tbc = waits for the client's confirmation */
  | { note: string; title?: string; tbc?: boolean };

export interface ArticleSection {
  id: string;
  h2: string;
  blocks: Block[];
}

export interface Link {
  label: string;
  href: string;
}

export interface Article {
  slug: string;
  /** topic tag shown on cards (plan §4.3: Okna · Drzwi · Osłony · Montaż · Finanse) */
  tag: string;
  seo: { title: string; description: string };
  h1: string;
  lead: string;
  /** AI illustration file name (src/data/ai-zdjecia.ts) */
  image: string;
  published: string;
  updated: string;
  sections: ArticleSection[];
  /** sales pages this article supports (plan §4.4 "Linkuje do") */
  links: (Link & { icon: string })[];
  cta: { title: string; text: string; primary: Link; secondary?: Link };
}

const PUBLISHED = '2026-10-27';

export const articles: Article[] = [
  // ------------------------------------------------------------------ 1. KOSZT WYMIANY
  {
    slug: 'ile-kosztuje-wymiana-okien',
    tag: 'Koszty',
    seo: {
      // plan §4.4: "Ile kosztuje wymiana okien w 2026? Ceny z Płocka" – changed until the client
      // approves publishing price ranges (docs/do-uzupelnienia.md)
      title: 'Ile kosztuje wymiana okien w 2026? Od czego zależy cena',
      description:
        'Z czego składa się koszt wymiany okien w domu i mieszkaniu: okna, montaż, obróbki i parapety. Jak czytać wyceny i porównywać oferty.',
    },
    h1: 'Ile kosztuje wymiana okien w 2026 roku?',
    lead: 'Na koszt wymiany okien składa się więcej niż cena ram i szyb. Wyjaśniamy, z czego składa się wycena, które decyzje podnoszą cenę najbardziej i jak porównać oferty, żeby w dniu montażu nie było niespodzianek.',
    image: 'ai-poradnik-okno-zima',
    published: PUBLISHED,
    updated: PUBLISHED,
    sections: [
      {
        id: 'skladniki',
        h2: 'Z czego składa się koszt wymiany okien',
        blocks: [
          'Wycena wymiany okien ma zwykle cztery części. Porównując oferty, sprawdź, czy każda obejmuje wszystkie cztery. Różnica w cenie często bierze się z tego, czego w ofercie po prostu nie ma.',
          {
            ol: [
              '**Okna**: profile, szyby, okucia, kolor i dodatki, takie jak nawiewniki czy klamki z kluczykiem.',
              '**Montaż**: osadzenie, kotwienie i uszczelnienie styku okna z murem. Jego koszt zależy od metody i od tego, ile pracy wymaga każdy otwór.',
              '**Prace towarzyszące**: demontaż starych okien i ich wywóz, obróbki ościeży od wewnątrz i od zewnątrz, parapety.',
              '**Osłony**: rolety zewnętrzne, moskitiery, żaluzje. Nie zawsze są częścią wymiany, ale łatwiej i taniej zaplanować je razem z oknami.',
            ],
          },
          'Proporcje między tymi częściami zmieniają się z projektem. Przy kilku typowych oknach PCV montaż i prace towarzyszące to wyraźna część rachunku. Przy dużych przeszkleniach najwięcej kosztuje sama konstrukcja i szkło.',
          {
            title: 'Przykładowe koszty z naszych realizacji',
            note: 'Orientacyjne kwoty dla kilku typowych zleceń z Płocka i okolic: mieszkania w bloku, domu jednorodzinnego i domu z dużymi przeszkleniami.',
            tbc: true,
          },
        ],
      },
      {
        id: 'cena-okna',
        h2: 'Co najbardziej wpływa na cenę samego okna',
        blocks: [
          'Dwa okna o tym samym wymiarze mogą kosztować zupełnie inaczej. Na cenę pracują przede wszystkim te decyzje.',
          { h3: 'Wymiar, kształt i podział' },
          'Większe okno to więcej profilu i szkła, ale cena nie rośnie proporcjonalnie do powierzchni. Każde dodatkowe skrzydło oznacza kolejny komplet okuć, słupek i uszczelki, więc okno dwuskrzydłowe kosztuje więcej niż jednoskrzydłowe tej samej wielkości. Najtańsze są pola stałe, czyli przeszklenia bez skrzydła. Okna łukowe, trapezowe i inne nietypowe kształty wymagają osobnej produkcji i są droższe.',
          { h3: 'Materiał i system profili' },
          'PCV jest zwykle najtańszym materiałem, aluminium i drewno kosztują więcej. W obrębie jednego materiału różnice robi system: głębokość profilu, liczba komór, uszczelki i wzmocnienia. Porównanie materiałów opisujemy w artykule [okna aluminiowe czy PCV](/poradnik/okna-aluminiowe-czy-pcv/).',
          { h3: 'Pakiet szyb' },
          'Pakiet trzyszybowy kosztuje więcej niż dwuszybowy, ale w domu ogrzewanym przez cały rok jest dziś rozsądnym standardem. Dopłaty pojawiają się przy szybach akustycznych, bezpiecznych (klejonych) i przeciwsłonecznych. Szyba to największa część okna i to przez nią ucieka najwięcej ciepła, więc zwykle nie jest to dobre miejsce na oszczędności.',
          { h3: 'Kolor i okleina' },
          'Białe okno PCV jest najtańsze. Okleina drewnopodobna albo kolor, na przykład antracyt, podnoszą cenę, a okleina dwustronna, od elewacji i od wnętrza, podnosi ją bardziej niż jednostronna. W bloku kolor od zewnątrz często narzuca regulamin budynku.',
          { h3: 'Okucia i dodatki' },
          'Okucia antywyważeniowe, klamki z kluczykiem, ukryte zawiasy, mikrowentylacja i nawiewniki to pojedyncze dopłaty, które przy kilkunastu oknach składają się na odczuwalną kwotę. Warto wybierać je świadomie: bezpieczniejsze okucia na parterze, nawiewniki tam, gdzie dom ma wentylację grawitacyjną.',
        ],
      },
      {
        id: 'montaz',
        h2: 'Ile kosztuje montaż i od czego to zależy',
        blocks: [
          'Montaż wycenia się od sztuki albo od metra bieżącego obwodu okna. Na jego koszt wpływają:',
          {
            ul: [
              '**metoda osadzenia**: montaż tradycyjny na piankę jest najprostszy, [ciepły montaż](/cieply-montaz-okien/) z taśmami wymaga droższych materiałów i więcej pracy, a przy montażu w warstwie ocieplenia dochodzą konsole lub ramy montażowe,',
              '**stan ościeży**: po wyjęciu starych okien ościeża trzeba często wyrównać i uzupełnić,',
              '**wielkość i waga okien**: duże przeszklenia i drzwi tarasowe wymagają więcej rąk do pracy albo sprzętu do podnoszenia szkła,',
              '**dostęp**: piętro bez windy, praca od strony elewacji na wysokości, rusztowanie.',
            ],
          },
          'Na montażu najmniej opłaca się oszczędzać. Okno o dobrych parametrach osadzone na samą piankę, bez zabezpieczenia przed wilgocią, po kilku sezonach może przewiewać i zawilgacać ościeże. Dlatego w wycenie sprawdź też metodę i materiały montażowe.',
          'U nas okna montuje wyłącznie nasza ekipa, a sposób osadzenia ustalamy na pomiarze. Jak pracujemy, opisujemy na stronie [montaż okien w Płocku](/montaz-okien/).',
        ],
      },
      {
        id: 'ukryte-koszty',
        h2: 'Koszty, o których łatwo zapomnieć',
        blocks: [
          'Najwięcej nieporozumień budzą pozycje, których nie widać na zdjęciu okna. Zapytaj o nie, zanim podpiszesz zamówienie.',
          {
            ul: [
              '**Obróbki ościeży.** Po wyjęciu starej ramy tynk przy oknie zwykle się kruszy. Trzeba go uzupełnić albo zakryć listwą lub płytą, a potem pomalować. Sprawdź, czy oferta to obejmuje i do jakiego etapu.',
              '**Parapety.** Stary parapet wewnętrzny nie zawsze pasuje do nowego okna, a zewnętrzny często trzeba wymienić, bo nowa rama ma inną głębokość.',
              '**Demontaż i wywóz.** Stare okna to sporo odpadów. Ustal, czy wykonawca je zabiera, czy zostają na posesji.',
              '**Rolety i skrzynki.** Jeśli nad oknem jest stara skrzynka rolety, trzeba zdecydować, czy zostaje, czy wymieniasz ją razem z oknem.',
              '**Nawiewniki.** Nowe okna są szczelne. W domu i mieszkaniu z wentylacją grawitacyjną potrzebują nawiewników albo mikrowentylacji, inaczej rośnie wilgotność.',
              '**Malowanie.** Nawet przy starannie zabezpieczonym wnętrzu ściany przy oknach zwykle trzeba odświeżyć. Ta praca najczęściej zostaje po stronie właściciela.',
            ],
          },
          { h3: 'Stawka VAT' },
          'Okna kupione razem z montażem w domu jednorodzinnym do 300 m² albo w mieszkaniu do 150 m² są zwykle objęte stawką VAT 8%. Same okna, bez usługi montażu, kosztują z VAT 23%. Porównując oferty, upewnij się, że wszystkie podają kwoty brutto z tą samą stawką.',
        ],
      },
      {
        id: 'dom-czy-mieszkanie',
        h2: 'Wymiana okien w domu i w mieszkaniu: czym się różni',
        blocks: [
          'W mieszkaniu w bloku okna mają zwykle typowe wymiary i podobny podział, a sama wymiana idzie szybko. Ograniczenia wynikają z regulaminu wspólnoty lub spółdzielni, który może określać kolor i podział okien od zewnątrz, oraz z logistyki: wniesienia okien na piętro i pracy od strony elewacji.',
          'W domu jednorodzinnym okien jest więcej i są bardziej zróżnicowane: okna balkonowe, drzwi tarasowe, okna na poddaszu, czasem przeszklenia od podłogi do sufitu. Częściej pojawia się też pytanie o metodę montażu, szczególnie gdy wymiana idzie w parze z ociepleniem elewacji. Wtedy warto zaplanować obie prace razem, bo okno osadzone pod przyszłe ocieplenie wymaga innego przygotowania niż okno w nieocieplonym murze.',
          'Jak wygląda sama usługa krok po kroku, opisujemy na stronie [wymiana okien w Płocku](/wymiana-okien/).',
        ],
      },
      {
        id: 'porownanie-ofert',
        h2: 'Jak porównać oferty',
        blocks: [
          'Najniższa kwota rzadko oznacza najtańszą wymianę. Żeby porównanie miało sens, oferty muszą opisywać to samo. Sprawdź w każdej z nich:',
          {
            ol: [
              'system profili i współczynnik **Uw** całego okna, a nie tylko **Ug** samej szyby,',
              'pakiet szyb: liczbę szyb, rodzaj ramki międzyszybowej, szyby specjalne,',
              'okucia i dodatki: zabezpieczenia, mikrowentylację, nawiewniki,',
              'metodę montażu i materiały: piankę, taśmy, ewentualnie konsole,',
              'zakres prac: demontaż, wywóz, obróbki, parapety, sprzątanie,',
              'kto montuje: ekipa firmy, która sprzedaje okna, czy podwykonawca,',
              'warunki gwarancji, osobno na okna i na montaż,',
              'termin dostawy i montażu.',
            ],
          },
          'Jeśli jedna oferta jest wyraźnie tańsza, często brakuje w niej którejś z tych pozycji albo zakłada słabszy pakiet szyb lub prostszy montaż. To nie musi być zły wybór, ale powinien być świadomy.',
          'Punktem odniesienia dla parametrów są warunki techniczne: w nowych budynkach okna w pomieszczeniach ogrzewanych muszą mieć Uw nie wyższe niż 0,9 W/(m²·K). Do tego wymagania odwołuje się też program Czyste Powietrze.',
        ],
      },
      {
        id: 'jak-obnizyc-koszt',
        h2: 'Jak obniżyć koszt, nie oszczędzając na montażu',
        blocks: [
          {
            ul: [
              '**Zaplanuj wszystko naraz.** Okna, parapety, rolety i obróbki wycenione razem dają pełny obraz kosztów i jeden termin prac.',
              '**Ogranicz liczbę skrzydeł.** Tam, gdzie okna się nie otwiera, na przykład w wysokich przeszkleniach, pole stałe jest tańsze i ma mniej ramy.',
              '**Oszczędzaj na dodatkach, nie na szybie.** Okleina od strony wnętrza to kwestia gustu. Pakiet szyb przekłada się na rachunki za ogrzewanie przez wiele lat.',
              '**Sprawdź dofinansowanie.** Właściciele domów jednorodzinnych mogą odliczyć wydatki na okna w uldze termomodernizacyjnej w PIT, a wymianę stolarki obejmuje też program Czyste Powietrze. Zasady i limity się zmieniają, dlatego sprawdź je w urzędzie skarbowym albo w gminnym punkcie konsultacyjnym programu, zanim podpiszesz umowę.',
            ],
          },
          'Wstępny projekt okien przygotujesz w [konfiguratorze okien](/konfigurator/): wybierzesz typ, wymiary, podział, kolor i szyby, a doradca przygotuje na tej podstawie wycenę. W większości domów jednorodzinnych dobrze sprawdzają się okna PCV, takie jak [DAKO DPQ-82 na profilu VEKA Softline 82 MD](/okna-pcv/). Jeśli wolisz zacząć od rozmowy, [umów bezpłatny pomiar](/kontakt/#wycena).',
        ],
      },
    ],
    links: [
      { label: 'Wymiana okien w Płocku', href: '/wymiana-okien/', icon: 'demontaz' },
      { label: 'Konfigurator okien', href: '/konfigurator/', icon: 'konfigurator' },
      { label: 'Okna PCV', href: '/okna-pcv/', icon: 'okna-pcv' },
    ],
    cta: {
      title: 'Policzmy koszt wymiany w Twoim domu',
      text: 'Wycenę okien razem z montażem przygotujemy po bezpłatnym pomiarze. Możesz też zacząć od projektu w konfiguratorze.',
      primary: { label: 'Umów bezpłatny pomiar', href: '/kontakt/#wycena' },
      secondary: { label: 'Otwórz konfigurator', href: '/konfigurator/' },
    },
  },

  // ------------------------------------------------------------------ 2. ALUMINIUM CZY PCV
  {
    slug: 'okna-aluminiowe-czy-pcv',
    tag: 'Okna',
    seo: {
      title: 'Okna aluminiowe czy PCV? Porównanie od praktyków',
      description:
        'Aluminium czy PCV: ciepło, wygląd, trwałość, cena. Porównujemy oba materiały na przykładach domów, w których montowaliśmy okna.',
    },
    h1: 'Okna aluminiowe czy PCV – co wybrać do domu?',
    lead: 'Aluminium kojarzy się z nowoczesną architekturą i dużymi przeszkleniami, PCV z dobrą izolacją w rozsądnej cenie. Oba skojarzenia są trafne, ale to dopiero początek wyboru. Porównujemy materiały punkt po punkcie: ciepło, wygląd, trwałość, cenę i montaż.',
    image: 'ai-poradnik-salon-probki',
    published: PUBLISHED,
    updated: PUBLISHED,
    sections: [
      {
        id: 'w-skrocie',
        h2: 'Krótka odpowiedź',
        blocks: [
          'Do większości domów jednorodzinnych dobre okna PCV w zupełności wystarczą: dobrze izolują, są łatwe w pielęgnacji i kosztują mniej. Aluminium wybiera się wtedy, gdy przeszklenia mają być duże, rama smukła, a architektura domu opiera się na szkle: przy oknach narożnych, wysokich przeszkleniach stałych, drzwiach przesuwnych i fasadach. Często najlepszym rozwiązaniem jest połączenie obu materiałów.',
          {
            table: {
              caption: 'PCV i aluminium w skrócie',
              head: ['', 'PCV', 'Aluminium'],
              rows: [
                ['Izolacyjność', 'Bardzo dobra już w typowych systemach', 'Dobra w profilach z przekładką termiczną; najcieplejsze systemy są wyraźnie droższe'],
                ['Smukłość ramy', 'Szersze profile, zwłaszcza przy dużych skrzydłach', 'Wąskie profile, więcej szkła w tym samym otworze'],
                ['Duże przeszklenia', 'Możliwe, z ograniczeniami wymiarów i ciężaru skrzydeł', 'Naturalny wybór dla dużych tafli, narożników i fasad'],
                ['Kolory', 'Biel, okleiny drewnopodobne i kolory gładkie', 'Praktycznie dowolny kolor z palety RAL, także struktury'],
                ['Pielęgnacja', 'Mycie, smarowanie okuć, kontrola uszczelek', 'Mycie, smarowanie okuć, kontrola uszczelek'],
                ['Cena', 'Niższa przy tych samych wymiarach', 'Wyższa przy porównywalnych wymiarach i parametrach'],
              ],
            },
          },
        ],
      },
      {
        id: 'cieplo',
        h2: 'Ciepło: czy aluminium jest zimniejsze?',
        blocks: [
          'Samo aluminium bardzo dobrze przewodzi ciepło, dlatego okna aluminiowe do domów mają profile z przekładką termiczną: pasem tworzywa, który oddziela część zewnętrzną profilu od wewnętrznej. Od szerokości i budowy przekładki zależy, jak ciepłe będzie okno. Systemy przeznaczone do domów energooszczędnych mają bardzo dobre parametry, ale zwykle są to linie z wyższej półki cenowej.',
          'PCV przewodzi ciepło słabo, a wielokomorowy profil dodatkowo izoluje. Dlatego dobre okno PCV z pakietem trzyszybowym osiąga dobre parametry cieplne przy niższej cenie.',
          'W obu przypadkach o wyniku decyduje całe okno, a nie sam materiał ramy. Porównuj współczynnik **Uw**, który opisuje całe okno; **Ug** dotyczy samej szyby. W nowych budynkach warunki techniczne wymagają, by okna w pomieszczeniach ogrzewanych miały Uw nie wyższe niż 0,9 W/(m²·K). Spełnić to można zarówno w PCV, jak i w aluminium.',
          'Duże znaczenie ma też ciepła ramka międzyszybowa i [sposób montażu](/cieply-montaz-okien/). Nawet bardzo ciepłe okno straci część parametrów, jeśli styk ramy z murem będzie nieszczelny.',
        ],
      },
      {
        id: 'wyglad',
        h2: 'Wygląd i wielkość przeszkleń',
        blocks: [
          'Tu przewaga aluminium jest wyraźna. Jest sztywniejsze od PCV, więc przy tej samej wielkości okna profil może być węższy, a skrzydła większe i cięższe. Dlatego aluminium wybiera się do przeszkleń od podłogi do sufitu, okien narożnych i dużych drzwi przesuwnych, czyli tam, gdzie rama ma zejść na drugi plan.',
          'PCV też pozwala budować spore okna i drzwi tarasowe, ale profile są szersze, a duże skrzydła wymagają stalowych wzmocnień w środku. Przy bardzo dużych taflach dochodzi się do granic, powyżej których producent nie dopuszcza danej konstrukcji.',
          {
            photo: 'przeszklenie-narozne-antracyt-widok-z-wnetrza',
            caption: 'Narożne przeszklenie w kolorze antracytu z jednej z naszych realizacji. Przy takich konstrukcjach o materiale decydują wymiary tafli, statyka i oczekiwana smukłość ramy.',
          },
          'Druga różnica to kolor. Aluminium maluje się proszkowo na praktycznie dowolny kolor z palety RAL, także w strukturze matowej lub drobnoziarnistej. PCV ma biel, okleiny drewnopodobne i coraz więcej kolorów gładkich, w tym popularny antracyt. Ciemne okleiny na dużych oknach PCV mocniej nagrzewają się w słońcu, dlatego producenci mogą ograniczać wymiary takich konstrukcji.',
        ],
      },
      {
        id: 'trwalosc',
        h2: 'Trwałość i pielęgnacja',
        blocks: [
          'Oba materiały są trwałe i nie wymagają malowania. Powłoka proszkowa na aluminium dobrze znosi słońce i deszcz, okleiny na PCV są odporne na promieniowanie UV.',
          'Pielęgnacja jest w obu przypadkach podobna: mycie ram łagodnym środkiem, kontrola uszczelek, smarowanie okuć raz w roku i w razie potrzeby regulacja skrzydeł. Z czasem zużywają się przede wszystkim uszczelki i okucia, a nie same profile, i te elementy można wymienić.',
          'Przy dużych i ciężkich skrzydłach przewaga aluminium wynika z jego sztywności: rama mniej pracuje pod ciężarem szkła i dłużej zachowuje regulację.',
        ],
      },
      {
        id: 'cena',
        h2: 'Cena',
        blocks: [
          'Przy porównywalnych wymiarach i parametrach cieplnych okna aluminiowe kosztują wyraźnie więcej niż PCV. Dlatego rzadko wybiera się aluminium do całego domu tylko dla zasady. Częściej trafia tam, gdzie jego zalety widać najbardziej: do dużych przeszkleń salonu, drzwi tarasowych i okien narożnych.',
          'Różnicę w cenie warto policzyć dla konkretnego projektu, bo zależy od systemu, koloru i wielkości okien. Wstępną konfigurację przygotujesz w [konfiguratorze okien](/konfigurator/), a koszty wymiany w całym domu opisujemy w artykule [ile kosztuje wymiana okien](/poradnik/ile-kosztuje-wymiana-okien/).',
        ],
      },
      {
        id: 'kiedy-co',
        h2: 'Kiedy wybrać PCV, a kiedy aluminium',
        blocks: [
          { h3: 'PCV, gdy:' },
          {
            ul: [
              'większość okien ma typowe wymiary i podziały,',
              'zależy Ci na dobrej izolacji w rozsądnej cenie,',
              'wymieniasz okna w domu lub mieszkaniu i chcesz zachować klasyczny wygląd,',
              'wybierasz biel albo okleinę drewnopodobną.',
            ],
          },
          { h3: 'Aluminium, gdy:' },
          {
            ul: [
              'projekt przewiduje przeszklenia od podłogi do sufitu, narożniki lub fasadę,',
              'chcesz wąskich ram i jak najwięcej szkła,',
              'planujesz duże drzwi przesuwne,',
              'kolor okien ma pasować do konkretnego koloru RAL na elewacji, na przykład do blacharki albo bramy garażowej.',
            ],
          },
          'W PCV podstawą naszej oferty są [okna DAKO DPQ-82 na profilu VEKA Softline 82 MD](/okna-pcv/), w aluminium [okna na systemach Aluprof](/okna-aluminiowe/). Pracujemy też na konstrukcjach Sonarol i All Windows Group.',
        ],
      },
      {
        id: 'polaczenie',
        h2: 'Czy można łączyć oba materiały w jednym domu?',
        blocks: [
          'Tak, i często to najlepsze rozwiązanie. Przykładowy układ to okna PCV w sypialniach, łazienkach i pomieszczeniach gospodarczych, a aluminium w salonie, przy tarasie i w przeszkleniu klatki schodowej.',
          'Żeby elewacja była spójna, trzeba dopasować kolory. Okleina na PCV i lakier na aluminium w tym samym kolorze mogą wyglądać nieco inaczej, zwłaszcza w pełnym słońcu. Dlatego kolory warto porównać na próbkach obu materiałów, a nie na ekranie.',
          'Podobnie z podziałami. Okna z różnych materiałów mają różne szerokości profili, więc przy oknach widocznych obok siebie dobrze zaplanować podziały tak, żeby linie słupków i ślemion się zgadzały.',
        ],
      },
      {
        id: 'montaz',
        h2: 'Montaż: na co zwrócić uwagę',
        blocks: [
          'Duże okna aluminiowe są ciężkie. Skrzydła z pakietem trzyszybowym nie da się bezpiecznie osadzić samymi rękami, dlatego przy dużych taflach używa się minidźwigu lub manipulatora z przyssawką próżniową. Równie ważne jest nadproże: nad szerokim otworem nie może się uginać, bo zablokuje przesuwne skrzydło.',
          {
            photo: 'montaz-szyby-minidzwig-przyssawka-01',
            caption: 'Z naszej budowy: duża tafla szkła osadzana minidźwigiem z przyssawką próżniową.',
          },
          'Niezależnie od materiału okno trzeba osadzić tak, by styk z murem był szczelny i chroniony przed wilgocią. U nas robi to zawsze nasza ekipa, bez podwykonawców. Więcej na stronie [montaż okien](/montaz-okien/).',
        ],
      },
    ],
    links: [
      { label: 'Okna aluminiowe', href: '/okna-aluminiowe/', icon: 'okna-aluminiowe' },
      { label: 'Okna PCV', href: '/okna-pcv/', icon: 'okna-pcv' },
      { label: 'Konfigurator okien', href: '/konfigurator/', icon: 'konfigurator' },
    ],
    cta: {
      title: 'Dobierzmy materiał do Twojego domu',
      text: 'Na bezpłatnym pomiarze obejrzymy otwory i projekt i doradzimy, gdzie wystarczy PCV, a gdzie warto postawić na aluminium.',
      primary: { label: 'Umów bezpłatny pomiar', href: '/kontakt/#wycena' },
      secondary: { label: 'Otwórz konfigurator', href: '/konfigurator/' },
    },
  },

  // ------------------------------------------------------------------ 3. HST CZY PSK
  {
    slug: 'drzwi-tarasowe-hst-czy-psk',
    tag: 'Drzwi',
    seo: {
      title: 'HST czy PSK? Jakie drzwi tarasowe wybrać',
      description:
        'Drzwi HST, PSK, SkyLine czy harmonijkowe? Różnice w wygodzie, progu, szczelności i cenie. Pomagamy dobrać system do tarasu i budżetu.',
    },
    h1: 'HST czy PSK – jakie drzwi tarasowe wybrać?',
    lead: 'Drzwi tarasowe wybiera się na lata, a różnice między systemami wychodzą przy codziennym używaniu: przy przesuwaniu skrzydła, wietrzeniu i przechodzeniu przez próg. Wyjaśniamy, czym różnią się drzwi HST i PSK, kiedy warto dopłacić do HST i kiedy rozważyć SkyLine albo harmonijkę.',
    image: 'ai-hst-taras',
    published: PUBLISHED,
    updated: PUBLISHED,
    sections: [
      {
        id: 'roznica',
        h2: 'Różnica w skrócie',
        blocks: [
          '**HST**, czyli drzwi podnoszono-przesuwne, mają skrzydło, które po obrocie klamki unosi się na wózki jezdne i przesuwa wzdłuż ściany. Pozwalają na bardzo szerokie otwarcie, duże i ciężkie skrzydła oraz niski próg.',
          '**PSK**, czyli drzwi uchylno-przesuwne, działają jak okno z dodatkową funkcją: skrzydło można uchylić do wietrzenia albo odsunąć od ramy i przesunąć równolegle do ściany. Konstrukcja jest prostsza i tańsza, ale skrzydła są mniejsze, a próg wyższy.',
          'Jeśli otwór ma kilka metrów szerokości, a na taras wychodzisz codziennie, zwykle lepszym wyborem jest HST. Przy średnim otworze, ograniczonym budżecie i potrzebie wietrzenia przez uchył rozsądnym wyborem bywa PSK.',
        ],
      },
      {
        id: 'hst',
        h2: 'Jak działa HST',
        blocks: [
          'W pozycji zamkniętej skrzydło HST spoczywa na uszczelkach. Obrót klamki podnosi je na wózki jezdne i wtedy skrzydło przesuwa się lekko mimo dużej wagi. Po zamknięciu klamka opuszcza je z powrotem na uszczelki, co daje dobrą szczelność.',
          'Najczęstsze układy to jedno skrzydło przesuwne i jedno pole stałe albo cztery pola: dwa skrzydła przesuwne w środku i dwa stałe po bokach. Drzwi HST buduje się w PCV i w aluminium. Aluminium pozwala na węższe profile i większe skrzydła.',
          'Najważniejsza zaleta to próg. W HST może być niski, niemal na poziomie posadzki, co ułatwia wychodzenie na taras, przejazd wózka czy robota sprzątającego. Trzeba go jednak zaplanować przed wylewkami, o czym piszemy niżej.',
          'Wady to wyższa cena i brak klasycznego uchyłu. Do wietrzenia skrzydło lekko się rozsuwa, a część okuć ma do tego blokowaną pozycję wentylacyjną.',
        ],
      },
      {
        id: 'psk',
        h2: 'Jak działa PSK',
        blocks: [
          'Drzwi PSK mają okucie, które pozwala skrzydło uchylić jak w oknie albo wysunąć je z ramy i przesunąć przed polem stałym. W pozycji zamkniętej skrzydło jest dociśnięte do ramy jak w zwykłym oknie, więc szczelność jest dobra.',
          'Ograniczeniem jest wielkość i waga skrzydła. Okucie przesuwa skrzydło, ale go nie unosi, dlatego PSK stosuje się przy średnich otworach. Próg ma wysokość zwykłej ramy okiennej, więc wychodząc na taras, trzeba go przekroczyć.',
          'Zaletą jest cena i wygoda wietrzenia: uchył działa tak samo jak w pozostałych oknach. Odsunięte skrzydło stoi kilka centymetrów przed polem stałym, od strony pokoju. Warto o tym pamiętać, planując zasłony i meble tuż przy drzwiach.',
          'W ofercie DAKO drzwi uchylno-przesuwne występują pod nazwą SmartMove. Dostępność konkretnego systemu i jego wymiary potwierdzamy przy wycenie.',
        ],
      },
      {
        id: 'porownanie',
        h2: 'Porównanie: wygoda, próg, szczelność i cena',
        blocks: [
          {
            table: {
              caption: 'Drzwi HST i PSK – porównanie',
              head: ['', 'HST (podnoszono-przesuwne)', 'PSK (uchylno-przesuwne)'],
              rows: [
                ['Otwieranie', 'Podniesienie i przesunięcie skrzydła', 'Uchył albo odsunięcie i przesunięcie skrzydła'],
                ['Szerokość otwarcia', 'Bardzo duża, także w układach czteropolowych', 'Średnia, zwykle jedno skrzydło przesuwne'],
                ['Skrzydła', 'Duże i ciężkie', 'Mniejsze i lżejsze'],
                ['Próg', 'Niski, możliwy niemal na poziomie posadzki', 'Wyższy, jak w oknie balkonowym'],
                ['Wietrzenie', 'Lekkie rozsunięcie lub pozycja wentylacyjna', 'Klasyczny uchył'],
                ['Szczelność', 'Dobra po opuszczeniu skrzydła na uszczelki', 'Dobra, jak w oknie rozwierno-uchylnym'],
                ['Cena', 'Wyższa', 'Niższa'],
              ],
            },
          },
          'Parametry konkretnych systemów, takie jak maksymalne wymiary skrzydeł, współczynnik Uw czy klasa szczelności, podaje producent i to od nich zależy ostateczny wybór. Graniczne wymiary wybranego systemu podajemy w ofercie.',
        ],
      },
      {
        id: 'skyline-harmonijka',
        h2: 'A może SkyLine albo drzwi harmonijkowe?',
        blocks: [
          'Poza HST i PSK są jeszcze dwa rozwiązania, które warto znać przy nowoczesnych domach.',
          '**SkyLine** to aluminiowy system przesuwny DAKO z bardzo wąskimi profilami. Rama niemal znika, a przeszklenie wygląda jak szklana ściana. To wybór do wnętrz, w których szkło ma dominować, i do większego budżetu.',
          '**Drzwi harmonijkowe** mają kilka skrzydeł, które przy otwieraniu składają się jak harmonia. Otwierają prawie całą szerokość otworu, więc salon łączy się z tarasem. W zamian złożony pakiet skrzydeł zajmuje miejsce przy ościeżu, a w zamkniętych drzwiach widać więcej ram niż w HST.',
        ],
      },
      {
        id: 'jak-wybrac',
        h2: 'Jak wybrać system do swojego tarasu',
        blocks: [
          'Zanim porównasz ceny, odpowiedz sobie na kilka pytań.',
          {
            ol: [
              '**Jak szeroki jest otwór?** Przy kilku metrach szerokości HST lub harmonijka dadzą szerokie przejście, PSK otworzy tylko część.',
              '**Jak często będziesz wychodzić na taras?** Przy codziennym używaniu lekkość przesuwu i niski próg robią dużą różnicę.',
              '**Czy próg ma być niski?** Jeśli w domu są małe dzieci, starsi domownicy, wózek albo robot sprzątający, wybierz HST.',
              '**Jak chcesz wietrzyć?** Jeśli zależy Ci na uchyle, PSK zachowuje się jak zwykłe okno.',
              '**Jaki masz budżet?** PSK jest tańsze. HST kosztuje więcej, ale przy dużym otworze daje wygodę, której PSK nie zapewni.',
              '**Od której strony świata jest taras?** Duże przeszklenie od południa lub zachodu warto od razu połączyć z [żaluzjami fasadowymi](/zaluzje-fasadowe/) albo [roletami zewnętrznymi](/rolety-zewnetrzne/).',
            ],
          },
        ],
      },
      {
        id: 'bezpieczenstwo-i-dodatki',
        h2: 'Bezpieczeństwo i dodatki',
        blocks: [
          'Duże przeszklenie na parterze jest dla włamywacza łatwym celem, więc zabezpieczenia warto ustalić od razu, razem z systemem. W drzwiach przesuwnych liczą się okucia z elementami antywyważeniowymi i szyba bezpieczna, klejona, w pakiecie szybowym. Jeśli chcesz wychodzić z domu przez taras, zapytaj o klamkę i zamek z wkładką od strony zewnętrznej.',
          'Przy drzwiach tarasowych przydaje się też moskitiera. Do drzwi przesuwnych stosuje się moskitiery przesuwne albo plisowane, które nie blokują wyjścia na taras. Najlepiej zmierzyć je razem z drzwiami, tak samo jak roletę czy żaluzję nad przeszkleniem.',
        ],
      },
      {
        id: 'montaz-i-prog',
        h2: 'Montaż i próg: co ustalić przed wylewkami',
        blocks: [
          'Wiele problemów z drzwiami tarasowymi zaczyna się od zbyt późnej decyzji o progu. Niski próg HST leży niemal na poziomie posadzki, więc jego wysokość trzeba zgrać z grubością wylewki, izolacji i podłogi, a po stronie tarasu zaplanować spadek i odprowadzenie wody. Dlatego drzwi tarasowe najlepiej zamówić w stanie surowym, przed wylewkami.',
          'Drugi warunek to podparcie. Próg drzwi przesuwnych musi mieć stabilne, nośne podparcie na całej długości. Źle podparty ugina się pod ciężarem skrzydła, a wtedy skrzydło chodzi ciężko i traci szczelność. Nad otworem liczy się nadproże, które przy szerokich drzwiach nie może się uginać.',
          {
            photo: 'drzwi-przesuwne-tarasowe-antracyt',
            caption: 'Z naszych montaży: duże przesuwne drzwi tarasowe w kolorze antracytu, w budynku w stanie surowym.',
          },
          'Ciężkie skrzydła osadza się przy użyciu sprzętu do podnoszenia szkła. U nas drzwi tarasowe, tak jak okna, montuje wyłącznie nasza ekipa. Szczegóły znajdziesz na stronie [drzwi tarasowe i przesuwne](/drzwi-tarasowe/).',
        ],
      },
    ],
    links: [
      { label: 'Drzwi tarasowe i przesuwne', href: '/drzwi-tarasowe/', icon: 'drzwi-tarasowe' },
      { label: 'Żaluzje fasadowe', href: '/zaluzje-fasadowe/', icon: 'zaluzje-fasadowe' },
    ],
    cta: {
      title: 'Planujesz drzwi tarasowe?',
      text: 'Wyślij nam rzut tarasu lub projekt domu albo umów pomiar. Doradzimy system i ustalimy poziom progu, zanim zaczniesz wylewki.',
      primary: { label: 'Umów bezpłatny pomiar', href: '/kontakt/#wycena' },
      secondary: { label: 'Zobacz drzwi tarasowe', href: '/drzwi-tarasowe/' },
    },
  },

  // ------------------------------------------------------------------ 4. ŻALUZJE CZY ROLETY
  {
    slug: 'zaluzje-fasadowe-czy-rolety-zewnetrzne',
    tag: 'Osłony',
    seo: {
      title: 'Żaluzje fasadowe czy rolety zewnętrzne? Porównanie',
      description:
        'Żaluzje fasadowe czy rolety: kontrola światła, ochrona przed upałem, bezpieczeństwo, wygląd i cena. Kiedy co wybrać i kiedy to zaplanować.',
    },
    h1: 'Żaluzje fasadowe czy rolety zewnętrzne?',
    lead: 'Żaluzje fasadowe i rolety zewnętrzne zatrzymują słońce na zewnątrz, zanim ciepło dotrze do szyby. Działają jednak inaczej i do czego innego nadają się najlepiej. Porównujemy je pod kątem światła, upału, bezpieczeństwa, wyglądu i ceny i podpowiadamy, kiedy zaplanować każde z nich.',
    image: 'ai-poradnik-dom-zmierzch',
    published: PUBLISHED,
    updated: PUBLISHED,
    sections: [
      {
        id: 'roznice',
        h2: 'Czym się różnią',
        blocks: [
          '**Roleta zewnętrzna** to pancerz z poziomych profili aluminiowych, który zwija się w skrzynce nad oknem. Opuszczona zasłania okno w całości: daje cień, zaciemnienie i dodatkową przeszkodę dla włamywacza.',
          '**Żaluzja fasadowa** składa się z aluminiowych lamel, które po opuszczeniu można obracać. Nie trzeba więc wybierać między słońcem a ciemnością: lamele ustawione pod kątem zatrzymują bezpośrednie promienie, a wpuszczają światło dzienne.',
          'W skrócie: roleta służy do zasłaniania i zaciemniania, żaluzja do regulowania światła.',
        ],
      },
      {
        id: 'swiatlo',
        h2: 'Kontrola światła',
        blocks: [
          'To główna zaleta żaluzji. Kąt lamel ustawiasz według pory dnia: rano możesz je otworzyć prawie poziomo, w południe przymknąć tak, żeby słońce nie padało na podłogę i ekran telewizora, a w pokoju nadal było jasno. Z automatyką lamele mogą same podążać za słońcem.',
          'Roleta ma w praktyce dwa stany: podniesiona albo opuszczona. Pośrednie położenia dają cień w części okna, a szczeliny w pancerzu przepuszczają trochę światła, ale pokoju w pełnym słońcu nie rozjaśnisz bez wpuszczenia upału.',
          'Lamele żaluzji mają różne profile. Najczęściej spotyka się **Z90**, z uszczelką, która lepiej zaciemnia, oraz **C80**, o zaokrąglonym kształcie, prostsze i zwykle tańsze. Dostępne profile zależą od producenta i systemu.',
        ],
      },
      {
        id: 'upal',
        h2: 'Ochrona przed upałem',
        blocks: [
          'Oba rozwiązania działają skutecznie, bo zatrzymują słońce przed szybą. Osłona wewnętrzna, na przykład roleta materiałowa, zatrzymuje światło dopiero za szybą, więc ciepło zostaje w pokoju. Dlatego przy dużych przeszkleniach od południa i zachodu osłona zewnętrzna to najprostszy sposób na chłodniejsze wnętrza.',
          'Różnica jest w tym, co dzieje się w środku. Opuszczona roleta zostawia pokój w półmroku. Żaluzja z przymkniętymi lamelami chroni przed upałem, a pokój pozostaje jasny. W salonie z dużym przeszkleniem, w którym spędzasz dzień, często to przesądza o wyborze żaluzji.',
        ],
      },
      {
        id: 'zaciemnienie',
        h2: 'Zaciemnienie, prywatność i sen',
        blocks: [
          'W sypialni i pokoju dziecka liczy się zaciemnienie. Roleta opuszczona do końca daje niemal pełną ciemność, czego żaluzja nie zapewni nawet przy domkniętych lamelach.',
          'Żaluzje sprawdzają się za to tam, gdzie w dzień chcesz zachować prywatność, nie odcinając się całkowicie od widoku i światła.',
        ],
      },
      {
        id: 'bezpieczenstwo',
        h2: 'Bezpieczeństwo',
        blocks: [
          'Roleta zewnętrzna z aluminiowym pancerzem i blokadą przed podnoszeniem utrudnia dostęp do okna, szczególnie na parterze. Są też rolety o podwyższonej odporności na włamanie, z profili ekstrudowanych.',
          'Żaluzje fasadowe nie są zabezpieczeniem antywłamaniowym, ich lamele służą do sterowania światłem. Jeśli okno na parterze ma mieć żaluzję, a bezpieczeństwo jest ważne, lepiej zadbać o okucia antywyważeniowe i szybę bezpieczną w samym oknie.',
        ],
      },
      {
        id: 'pogoda',
        h2: 'Wiatr, deszcz i zima',
        blocks: [
          'Żaluzje są wrażliwsze na wiatr. Przy silnych podmuchach trzeba je podnieść, dlatego zwykle montuje się je z napędem i czujnikiem wiatru, który robi to sam. Przy wietrze i deszczu lamele bywają słyszalne, a przy oblodzeniu lepiej ich nie opuszczać.',
          'Rolety lepiej znoszą wiatr i niepogodę. Opuszczone zimą tworzą dodatkową warstwę powietrza przed szybą, choć nie zastąpią ciepłego okna. Przy mrozie pancerz może przymarznąć do parapetu, więc przy napędzie elektrycznym przydaje się zabezpieczenie przed przeciążeniem.',
        ],
      },
      {
        id: 'wyglad',
        h2: 'Wygląd elewacji',
        blocks: [
          'Żaluzje fasadowe pasują do nowoczesnej architektury: prowadnice i lamele stają się elementem elewacji, zwłaszcza gdy kolor jest dobrany do ram okien.',
          'Rolety podtynkowe po podniesieniu są prawie niewidoczne, bo skrzynka chowa się w nadprożu lub w ociepleniu. Rolety nadstawne montuje się na oknie, a elewacyjne na ścianie, i ich skrzynki pozostają widoczne.',
        ],
      },
      {
        id: 'sterowanie',
        h2: 'Napęd i sterowanie',
        blocks: [
          'Roletę można obsługiwać korbką, taśmą albo silnikiem. Żaluzje fasadowe najczęściej mają napęd elektryczny, bo ręczne obracanie lamel kilka razy dziennie szybko przestaje być wygodne.',
          'Przy kilku oknach warto pomyśleć o sterowaniu grupowym: jednym przyciskiem opuszczasz wszystkie osłony od południa albo w całym domu. Czujniki słońca i wiatru pozwalają osłonom reagować na pogodę także wtedy, gdy nikogo nie ma w domu. Sterowanie z telefonu jest wygodne, ale dobrze, żeby każda osłona miała też zwykły przełącznik na ścianie.',
          'Napęd i sposób sterowania dobiera się razem z osłoną, bo od nich zależy, jakie przewody trzeba doprowadzić i gdzie umieścić przełączniki.',
        ],
      },
      {
        id: 'cena',
        h2: 'Cena i eksploatacja',
        blocks: [
          'Żaluzje fasadowe kosztują zwykle więcej niż rolety tej samej wielkości, a w pełni pokazują swoje możliwości dopiero z automatyką: napędem, czujnikami wiatru i słońca. Rolety mogą mieć napęd ręczny albo elektryczny, a sterowanie da się rozbudować później.',
          'W obu przypadkach napęd elektryczny oznacza przewód doprowadzony do każdej osłony. Najłatwiej przygotować go na etapie budowy, przed tynkami.',
        ],
      },
      {
        id: 'kiedy-zaplanowac',
        h2: 'Kiedy zaplanować: na budowie czy w domu zamieszkałym',
        blocks: [
          'Najlepszy moment to etap projektu albo stanu surowego. Wersje podtynkowe, zarówno żaluzji, jak i rolet, potrzebują miejsca na skrzynkę w nadprożu lub w warstwie ocieplenia, a napędy przewodów w ścianie. Po wykonaniu elewacji montaż podtynkowy oznacza kucie i poprawki ocieplenia.',
          'W domu zamieszkałym zostają rozwiązania montowane na gotowej elewacji: rolety elewacyjne lub nadstawne, które można zamontować przy wymianie okien, oraz żaluzje w wersji samonośnej, z widoczną lub osłoniętą skrzynką.',
          'Jeśli dopiero wybierasz okna, zaplanuj osłony razem z nimi. Kolor prowadnic i lamel dobierzesz wtedy do ram, a skrzynki do sposobu montażu okien.',
        ],
      },
      {
        id: 'co-wybrac',
        h2: 'Co wybrać: podsumowanie',
        blocks: [
          { h3: 'Żaluzje fasadowe, gdy:' },
          {
            ul: [
              'chcesz regulować światło, a nie tylko je odcinać,',
              'masz duże przeszklenia od południa lub zachodu w pomieszczeniach dziennych,',
              'planujesz automatykę i sterowanie zależne od pogody,',
              'osłony mają być częścią architektury domu.',
            ],
          },
          { h3: 'Rolety zewnętrzne, gdy:' },
          {
            ul: [
              'zależy Ci na zaciemnieniu sypialni,',
              'ważne jest dodatkowe zabezpieczenie okien na parterze,',
              'szukasz rozwiązania tańszego i odpornego na pogodę,',
              'wymieniasz okna w zamieszkałym domu i chcesz dołożyć osłony.',
            ],
          },
          'W wielu domach najlepiej sprawdza się połączenie: żaluzje w salonie i przy tarasie, rolety w sypialniach. Więcej o produktach przeczytasz na stronach [żaluzje fasadowe](/zaluzje-fasadowe/) i [rolety zewnętrzne](/rolety-zewnetrzne/). Do rolet można też dobrać moskitiery.',
        ],
      },
    ],
    links: [
      { label: 'Żaluzje fasadowe', href: '/zaluzje-fasadowe/', icon: 'zaluzje-fasadowe' },
      { label: 'Rolety zewnętrzne', href: '/rolety-zewnetrzne/', icon: 'rolety-zewnetrzne' },
    ],
    cta: {
      title: 'Zaplanuj osłony razem z oknami',
      text: 'Najlepiej na etapie projektu albo stanu surowego. Doradzimy, gdzie żaluzje, a gdzie rolety, i zmierzymy otwory.',
      primary: { label: 'Umów bezpłatny pomiar', href: '/kontakt/#wycena' },
      secondary: { label: 'Zobacz żaluzje fasadowe', href: '/zaluzje-fasadowe/' },
    },
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

/** plain text of an article (for word count / reading time) */
const strip = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
const blockText = (b: Block): string => {
  if (typeof b === 'string') return b;
  if ('h3' in b) return b.h3;
  if ('ul' in b) return b.ul.join(' ');
  if ('ol' in b) return b.ol.join(' ');
  if ('table' in b) return [b.table.caption ?? '', ...b.table.head, ...b.table.rows.flat()].join(' ');
  if ('photo' in b) return b.caption;
  return `${b.title ?? ''} ${b.note}`;
};
export const wordCount = (a: Article) =>
  [a.h1, a.lead, ...a.sections.flatMap((s) => [s.h2, ...s.blocks.map(blockText)])]
    .map(strip)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
/** reading time in minutes (≈ 200 words per minute) */
export const readingTime = (a: Article) => Math.max(1, Math.round(wordCount(a) / 200));

/** keeps a spaced dash at the end of the line ("Okna aluminiowe czy PCV – co…") instead of starting the next one */
export const nbDash = (s: string) => s.replace(/ – /g, ' – ');

/** "27 października 2026" */
export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
