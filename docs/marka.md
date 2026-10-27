# InterWindows – marka, paleta, typografia, ton

Wersja 1, 27.10.2026. Kierunek: marka premium dla zamożniejszych klientów. Główny wyróżnik: **montaż wyłącznie własnymi ekipami, bez podwykonawców**.
Źródła faktów: `_tresci/tresci.md`. Pliki logo: `_tresci/logo/`. Podgląd palety: `_tresci/paleta-podglad.png`.

> ### Decyzje klienta 27.10.2026 (obowiązują, mają pierwszeństwo przed resztą dokumentu)
> 1. **Paleta jak w Profil:** ink #141824, granat #1e3466 (kolor marki), bordowy akcent #9b2c33 tylko w drobnych elementach (kółko przy eyebrow, markery list, cienkie linie, okręgi w stopce i pasie CTA), tła #f0f2f5 / #f7f8fa, ciemne #12151e. Akcent zdefiniowany w jednym miejscu (`--accent` w `src/styles/global.css`), żeby można go było później podmienić. W ciemnych sekcjach jasny akcent `--accent-on-dark` (#c9d3e6; szampan #d6c29c to wariant jedną linijką).
> 1a. **Dwa motywy do porównania** (ten sam układ i krój): „profil” (jak wyżej, domyślny) i „mono” – czarno-biały jak logo, inspirowany rebrokers.pl (#000, tekst #514e4f, pomocniczy #6e6e6e zamiast zmierzonego #999 ze względu na kontrast, tła #fefdf9 / #f4f3ef, linie #ededed / #e3e3e0, ciemne sekcje #151515, bez akcentu kolorystycznego). Przełącznik: `theme` w `src/data/site.ts`; podgląd `?motyw=mono`; zrzuty w `docs/podglad-palet/`.
> 2. **Złoto / mosiądz odrzucone.** Sekcje 2–4 poniżej (paleta „antracyt i mosiądz”, akcent, tabela kontrastów) są **archiwalne**.
> 3. **Tylko Plus Jakarta Sans**, nagłówki jak w Profil (waga 400, ciasne ujemne światło). Instrument Serif odrzucony (§5).
> 4. **Hero strony głównej jak w Profil:** tekst po lewej (eyebrow, H1, telefon + „Bezpłatna wycena”, krótkie notki z linkami), po prawej slider ze zdjęciami realizacji i podpisami, pod spodem jasny blok tła.
> 5. Sekcja „Własne ekipy montażowe” na stronie głównej (ciemna, zdjęcie w tle z nakładką) jest wzorcem nastroju dla innych ciemnych sekcji.

## Decyzje w skrócie (wersja 1 – częściowo nieaktualne, patrz ramka wyżej)

1. **Logo bazowe** to obecne logo monochromatyczne (grafitowe okno 3D + „INTER WINDOWS”). Stare niebieskie logo i niebieski kolor strony (#285E9E) odchodzą.
2. **Paleta: „antracyt i mosiądz”.** Baza pochodzi z logo: czerń #131418, antracyt w odcieniu ram okiennych i ciepła biel tła logo. Akcentem jest szczotkowany mosiądz **#B08D57**, używany oszczędnie.
3. **Typografia.** Zostaje Plus Jakarta Sans (tekst, UI). Do nagłówków dochodzi szeryf display **Instrument Serif**.
4. **Ton:** spokojny ekspert, konkret, odpowiedzialność zamiast ceny.
5. **Zdjęcia:** prawdziwe realizacje własnych ekip, wykończone, w dobrym świetle. Zdjęcia DAKO wyłącznie pomocniczo.

---

## 1. Logo

### 1.1 Co mamy

| Wersja | Gdzie występuje | Plik źródłowy (największy) | Status |
|---|---|---|---|
| **Aktualne, monochromatyczne** | nagłówek strony, favicon, apple-touch-icon, album realizacji 2026 | `_tresci/logo/oryginaly/IMG_4292_logo-z-albumu-realizacje.jpg` (1284×1273, z hasłem); `logo-szare.png` (320×309) | **obowiązuje** |
| Starsze, niebieskie (płaskie) | tylko jako plik `assets/images/logo.png` na serwerze, strona go nie wyświetla | `_tresci/logo/oryginaly/logo.png` (387×146) | wycofane / archiwum |

### 1.2 Kolory zmierzone programowo
Pomiar w Node.js i sharp: mediana pikseli „wewnętrznych” (bez krawędzi antyaliasingu) oraz histogram.

| Kolor | HEX | Gdzie |
|---|---|---|
| Czerń logo | **#131418** (w JPG z albumu #141417) | napis INTER WINDOWS, przednia ściana ramy okna |
| Grafit cieniowania | **#585857** (średnio #6A6A6A) | boczne ścianki ramy, skrzydło |
| Jasne szarości gradientu | ok. **#ACACAD** | szyby skrzydła, rzucany cień |
| „Papier”, tło logo | **#F7F6F5** (apple-touch-icon: #F8F6F5) | tło pliku źródłowego, ciepła biel |
| Starsze logo – niebieski | #035E9F | „INTER” i sygnet w starym logo |
| Starsze logo – szary | #6C6C6C | „WINDOWS” w starym logo |
| Obecna strona – niebieski | #285E9E | `--theme-color` w CSS (nagłówki) |

### 1.3 Opis
- **Sygnet:** prostopadłościenna rama okna w perspektywie 3/4 ze skrzydłem uchylonym na zewnątrz. Skrzydło ma jeden poziomy szczebel. Sygnet jest renderowany fotorealistycznie (cieniowanie 3D, miękki cień rzucany w prawo i w dół) i wygląda na grafikę generowaną albo renderowaną, a nie na rysunek wektorowy. Kolory: czerń, grafit, gradient szarości.
- **Napis:** „INTER” złożony bardzo grubym, zwartym groteskiem w wersalikach. „WINDOWS” tym samym krojem, mniejszym stopniem. Dwa wiersze wyrównane do lewej i prawej krawędzi (blok). Kroju nie da się jednoznacznie zidentyfikować: to neutralny, gruby grotesk z okrągłym „O” i ostrymi wierzchołkami „W”.
- **Hasło** (tylko w wersji z albumu): „okna – drzwi – bramy – rolety”, humanistyczny bezszeryfowy krój, małe litery. **Myślniki i odstępy są w nim niespójne.** Na stronie hasło trzeba składać zwykłym tekstem, np. „okna · drzwi · bramy · rolety”.
- **Format:** pionowy, blokowy, prawie kwadratowy (ok. 1:1). W nagłówku o wysokości 76–92 px jest nieczytelny, stąd propozycja układu poziomego (pkt 1.5).

### 1.4 Ciemne tła
- **Oryginał na ciemnym tle nie działa:** czarny napis i czarna rama znikają.
- Dlatego powstała **wersja biała** (`logo-white.png`). Kolor zamieniłem przez luminancję na biel i usunąłem rzucany cień, bo w bieli wyglądałby jak mgła. Napis wychodzi idealnie. W sygnecie cieniowanie się odwraca, więc okno wygląda jak podświetlone. Na ciemnych tłach (#131418, #2F353A) prezentuje się czysto, co widać w `_tresci/paleta-podglad.png`.
- **Poniżej ok. 32 px** sygnet 3D traci czytelność (favicon). Zalecenie: zlecić **profesjonalne przerysowanie sygnetu w wektorze** jako wersję płaską lub liniową, przy okazji rozwiązując favicon, hasło i układ poziomy. Do tego czasu używamy PNG.

### 1.5 Pliki gotowe do użycia (`_tresci/logo/`)

| Plik | px | Do czego |
|---|---|---|
| `logo.png` | 784×758 | Logo bez hasła, przezroczyste, na **jasne** tła. Przycięte, wierne oryginałowi na białym tle |
| `logo-white.png` | 784×758 | Logo bez hasła, białe, na **ciemne** tła i zdjęcia z ciemnym overlayem |
| `logo-z-haslem.png`, `logo-white-z-haslem.png` | 788×882 | Jak wyżej, z hasłem (stopka, materiały) |
| `sygnet.png`, `sygnet-white.png` | 360×399, 270×379 | Sam sygnet (np. znak wodny sekcji, avatar) |
| `logo-poziome-propozycja.png`, `…-white.png` | 1161×348, 1095×348 | **Propozycja** do nagłówka: sygnet po lewej, dwuwierszowy napis po prawej, złożone z oryginalnych elementów bez przerysowywania. W nagłówku ok. 44–52 px wysokości. **Wymaga akceptacji klienta** |
| `logo-napis.svg`, `logo-napis-white.svg` | wektor | Sam napis INTER WINDOWS. Obrys automatyczny (potrace) z pliku 1284 px, zgodność z rastrem ok. 99,5% pikseli |
| `logo-napis-z-haslem.svg`, `…-white.svg` | wektor | Napis z hasłem (z oryginalnymi, niespójnymi myślnikami) |

**Pełnego `logo.svg` nie zrobiłem.** Sygnet to render 3D z gradientami i miękkim cieniem, a ręczny obrys nie byłby wierny. Wektorowy jest tylko napis.

### 1.6 Zasady użycia
- Pole ochronne: wysokość litery „I” z „INTER” z każdej strony.
- Minimalna szerokość: wersja pionowa 120 px, pozioma 150 px.
- Logo występuje tylko w czerni #131418 albo w bieli. **Nigdy w mosiądzu, w kolorze ani z gradientem.**
- Na zdjęciach tylko wersja biała, na overlayu ink 40–60%.

---

## 2. Paleta „antracyt i mosiądz” (ARCHIWUM – odrzucone 27.10.2026)

**Uzasadnienie.** Obecne logo jest monochromatyczne, więc bazę stanowią czerń logo, antracyt i ciepła biel tła logo. Antracyt (bliski RAL 7016) to najczęściej wybierany kolor stolarki w segmencie premium i dominuje na zdjęciach realizacji firmy. Ciepła biel (#F7F6F5 z logo) odróżnia markę od zimnych, „sklepowych” białych tła. Ciepło i rozpoznawalność daje dopiero akcent: mosiądz, jak okucia i klamki premium.

### 2.1 Tokeny (gotowe do `global.css`)

```css
:root {
  /* paleta: czerń z logo, antracyt jako kolor marki, ciepła biel tła logo, mosiądz tylko jako akcent */
  --ink: #131418;          /* czerń logo: nagłówki, główne przyciski, ciemne sekcje */
  --ink-2: #25272D;        /* drugi poziom ciemnego: karty na ciemnym, hover przycisku ink */
  --brand: #2F353A;        /* antracyt (≈ RAL 7016): kolor marki, powierzchnie, stopka, pasek górny */
  --brand-700: #1F2327;    /* głęboki antracyt: hover na --brand, nakładki na zdjęcia */
  --accent: #B08D57;       /* szczotkowany mosiądz: linie, numery, ikony, hover; tylko małe powierzchnie */
  --accent-600: #82633A;   /* ciemny mosiądz/brąz: akcent jako TEKST na jasnych tłach (eyebrow, linki) */
  --accent-300: #D6C29C;   /* szampan: akcent jako drobny TEKST i włoskowate linie na ciemnych tłach */
  --text: #3B3D43;         /* tekst podstawowy (grafit) */
  --muted: #686B72;        /* tekst pomocniczy na jasnych tłach */
  --muted-on-dark: #A3A7AE;/* tekst pomocniczy na ciemnych tłach */
  --line: #E6E2DC;         /* delikatne linie, obramowania kart */
  --line-strong: #CCC6BC;  /* mocniejsze separatory (dekoracyjne) */
  --line-input: #8A867F;   /* obramowanie pól formularza (≥ 3:1) */
  --bg: #FFFFFF;
  --bg-soft: #F2EFEA;      /* ciepły kamień: sekcje naprzemienne, karty procesu */
  --bg-softer: #F8F6F3;    /* ciepła biel tła logo: tło strony / sekcji „papierowych” */
  --dark: #0F1013;         /* najciemniejsza sekcja (stopka, hero bez zdjęcia) */

  /* aliasy zgodności z komponentami z projektu Profil */
  --navy: var(--brand);
  --navy-700: var(--brand-700);
  --red: var(--accent);

  --radius: 2px;
  --shadow: 0 30px 60px -36px rgba(19, 20, 24, .38);
}
```

### 2.2 Mapowanie z tokenów Profil

| Token Profil | Wartość Profil | Rola | Token InterWindows | HEX |
|---|---|---|---|---|
| `--ink` | #141824 | prawie czerń | `--ink` | **#131418** |
| `--ink-2` | #252b3b | drugi ciemny | `--ink-2` | **#25272D** |
| `--navy` | #1e3466 | kolor marki | `--brand` | **#2F353A** |
| `--navy-700` | #182a52 | głęboki wariant marki | `--brand-700` | **#1F2327** |
| `--red` | #9b2c33 | akcent | `--accent` | **#B08D57** |
| – | – | akcent jako tekst na jasnym | `--accent-600` (nowy) | **#82633A** |
| – | – | akcent jako tekst i linia na ciemnym | `--accent-300` (nowy) | **#D6C29C** |
| `--text` | #3e4453 | tekst | `--text` | **#3B3D43** |
| `--muted` | #747b8b | tekst pomocniczy | `--muted` | **#686B72** |
| – | – | pomocniczy na ciemnym | `--muted-on-dark` (nowy) | **#A3A7AE** |
| `--line` | #e7e9ee | linia | `--line` | **#E6E2DC** |
| `--line-strong` | #cdd2db | mocna linia | `--line-strong` | **#CCC6BC** |
| – | – | obramowanie inputów | `--line-input` (nowy) | **#8A867F** |
| `--bg` | #ffffff | tło | `--bg` | **#FFFFFF** |
| `--bg-soft` | #f0f2f5 | tło miękkie | `--bg-soft` | **#F2EFEA** |
| `--bg-softer` | #f7f8fa | tło najjaśniejsze | `--bg-softer` | **#F8F6F3** |
| `--dark` | #12151e | ciemna sekcja | `--dark` | **#0F1013** |

Neutralne tony Profil są chłodne i niebieskawe. Tu są ciepłe (kamień, papier), żeby pasowały do mosiądzu i do okleiny złoty dąb, która często występuje w realizacjach.

### 2.3 Proporcje
Jasne tła (`--bg`, `--bg-softer`, `--bg-soft`) zajmują ok. 60–65% powierzchni, ciemne (`--ink`, `--brand`, `--dark`, zdjęcia) ok. 30–35%, a **akcent najwyżej 3–5%**. Rytm sekcji: jasna, kamień, ciemna, jasna. Na stronę wystarczą jedna albo dwie ciemne sekcje plus stopka.

### 2.4 Co z niebieskim
Proponuję go wycofać: nie ma go w obecnym logo, a z mosiądzem tworzy klimat „korporacyjny/bankowy” zamiast „architektonicznego”. **Wariant B** na wypadek, gdyby klient chciał zachować ciągłość z niebieskim: podmienić wyłącznie `--brand: #0E3A5F` i `--brand-700: #0A2A45` (głęboki granat wyprowadzony ze starego #035E9F). Reszta palety i mosiądz zostają bez zmian. Kontrasty w wariancie B: biały na #0E3A5F 11,74; mosiądz na #0E3A5F 3,80 (tylko duży tekst / UI); mosiądz na #0A2A45 4,75 (AA).

---

## 3. Akcent: szczotkowany mosiądz #B08D57 (ARCHIWUM – odrzucone 27.10.2026)

**Wybór:** mosiądz szczotkowany **#B08D57** (rgb 176/141/87). To ciepłe, przygaszone złoto, nie żółte.

**Dlaczego mosiądz, a nie inne opcje:**
- **Szampan (#D6C29C)** jest elegancki, ale na białym ma za mały kontrast (1,74:1) i ginie. Zostaje jako `--accent-300` do drobnych napisów i linii na ciemnych tłach.
- **Brąz (#82633A)** jest szlachetny, ale ciemny i bez blasku. Na ciemnym tle prawie nie świeci. Zostaje jako `--accent-600` do tekstu na jasnych tłach.
- **Mosiądz** łączy obie zalety: na czerni logo daje 5,95:1 (czytelny tekst), na białym 3,09:1 (wystarcza dla ikon, grafik i dużych cyfr). Do tego nawiązuje do okuć, klamek i pochwytów, czyli do świata produktu. Dobrze współgra z grafitem logo (ciepły i zimny neutral) i z okleiną złoty dąb na zdjęciach realizacji.
- **Odrzucone:** bordo (jak w Profil, kojarzy się z konkurencją i z drugim projektem), butelkowa zieleń (do monochromu za „brytyjsko-klubowa”), miedź (zbyt pomarańczowa obok elewacji z ceramiki na zdjęciach), błękit stalowy (bez ciepła, zlewa się z antracytem).

**Gdzie używać:**
- cienkie linie 1–2 px: kreska pod eyebrow, separatory sekcji, obramowanie przycisku drugorzędnego na ciemnym, linia osi czasu w procesie;
- numery kroków procesu („01–05”) i liczby w statystykach (duże cyfry szeryfem);
- ikony liniowe (stroke 1,5 px), małe znaczniki, aktywny punkt menu;
- hover: podkreślenie linków, zmiana obramowania kart, strzałka „→”;
- **przycisk główny na ciemnych sekcjach**: wypełnienie `--accent`, tekst `--ink` (5,95:1); hover `--accent-300`.

**Gdzie NIE używać:**
- **dużych powierzchni**: tła sekcji, pełne pasy, duże bloki koloru;
- **tekstu na jasnych tłach** (`--bg` 3,09:1, `--bg-soft` 2,70:1, `--bg-softer` 2,87:1). Tu zawsze `--accent-600`;
- **białego tekstu na mosiądzu** (3,09:1);
- tekstu ciągłego w akapitach, nawet na ciemnym (tylko etykiety i liczby);
- efektów „złota”: gradientów, tekstur folii, połysków, cieni;
- logo.

Focus ring: na jasnych tłach `--accent-600` (2 px, offset 2 px), na ciemnych `--accent-300`.

---

## 4. Kontrast WCAG 2.x (ARCHIWUM – dotyczy palety antracyt i mosiądz)

Wartości policzone wzorem WCAG z luminancji względnej. AA dla zwykłego tekstu wymaga 4,5:1, dla dużego tekstu i elementów UI 3:1.

| Pierwszy plan | Tło | Kontrast | Ocena / zastosowanie |
|---|---|---|---|
| `--text` #3B3D43 | `--bg` #FFF | 10,86 | AAA, tekst |
| `--text` | `--bg-soft` #F2EFEA | 9,47 | AAA |
| `--ink` #131418 | `--bg` | 18,41 | AAA, nagłówki |
| `--ink` | `--bg-softer` #F8F6F3 | 17,06 | AAA |
| `--muted` #686B72 | `--bg` | 5,34 | AA |
| `--muted` | `--bg-soft` | 4,65 | AA |
| `--muted` | `--bg-softer` | 4,95 | AA |
| biały | `--ink` | 18,41 | AAA, przycisk główny na jasnym |
| biały | `--brand` #2F353A | 12,42 | AAA |
| biały | `--brand-700` #1F2327 | 15,81 | AAA |
| biały | `--dark` #0F1013 | 19,02 | AAA |
| `--muted-on-dark` #A3A7AE | `--ink` | 7,62 | AAA |
| `--muted-on-dark` | `--brand` | 5,14 | AA |
| `--accent` #B08D57 | `--ink` | 5,95 | AA, etykiety, liczby, linki na ciemnym |
| `--accent` | `--dark` | 6,15 | AA |
| `--accent` | `--brand-700` | 5,12 | AA |
| `--accent` | `--ink-2` | 4,83 | AA |
| `--accent` | `--brand` | 4,02 | tylko duży tekst / UI (na `--brand` drobny tekst w `--accent-300`) |
| `--accent-300` #D6C29C | `--ink` | 10,57 | AAA |
| `--accent-300` | `--brand` | 7,13 | AAA |
| `--ink` | `--accent` | 5,95 | AA, tekst na przycisku mosiężnym |
| biały | `--accent` | 3,09 | **NIE dla tekstu** (tylko ≥24 px bold) |
| `--accent` | `--bg` | 3,09 | **NIE dla tekstu**; ikony, grafiki, cyfry ≥24 px OK |
| `--accent` | `--bg-soft` | 2,70 | **NIE** (także nie dla ikon informacyjnych; tylko dekoracyjne linie) |
| `--accent` | `--bg-softer` | 2,87 | **NIE** (tylko dekoracyjne linie) |
| `--accent-600` #82633A | `--bg` | 5,53 | AA, akcent jako tekst na jasnym |
| `--accent-600` | `--bg-soft` | 4,82 | AA |
| `--accent-600` | `--bg-softer` | 5,13 | AA |
| `--line-input` #8A867F | `--bg` | 3,62 | ≥3:1, obramowanie pól formularza |
| `--line-strong` #CCC6BC | `--bg` | 1,70 | tylko dekoracyjnie (nie jako jedyna granica kontrolki) |

Dla porównania: stary niebieski #035E9F na białym ma 6,76, obecny #285E9E na białym 6,59.

---

## 5. Typografia

> **Decyzja klienta 27.10.2026: tylko Plus Jakarta Sans, jak w Profil; Instrument Serif odrzucony.** Nagłówki H1/H2 w Plus Jakarta Sans 400 z ciasnym, ujemnym światłem (skala jak w `global.css` Profil), duże liczby w wadze 300. Wyróżnienie w nagłówku (`<em>`) to ten sam krój w kolorze `--accent-600` (na ciemnym `--accent-300`), bez kursywy. Premium budują odstępy, paleta i mosiężne detale. Poniższa analiza szeryfu zostaje jako archiwum.

**Tekst i UI: zostaje Plus Jakarta Sans.** Jest czytelna, nowoczesna, ma pełne polskie znaki (latin-ext) i wagi 200–800. Geometryczno-humanistyczny charakter pasuje do groteskowego napisu w logo. Dzięki temu można przenieść komponenty z Profil bez zmian.

**Nagłówki: szeryf display Instrument Serif.** Zwarty, kontrastowy, współczesny krój o charakterze „pracowni architektonicznej” i magazynu wnętrzarskiego. Daje premium bez pompatyczności. Ma polskie znaki (latin-ext) i kursywę do wyróżnień. Ograniczenie: istnieje tylko waga 400, więc nadaje się wyłącznie do dużych stopni (H1, H2, liczby, cytaty) i nie wolno go sztucznie pogrubiać.

| Rola | Pakiet npm (sprawdzony w rejestrze npm i API Fontsource, v5.3.0) | Polskie znaki |
|---|---|---|
| Tekst, UI, H3–H6 | **`@fontsource-variable/plus-jakarta-sans`** (bez zmian względem Profil) | tak (latin-ext) |
| H1, H2, liczby, cytaty | **`@fontsource/instrument-serif`** (400 + italic) | tak (latin-ext) |
| Alternatywa, jeśli potrzeba więcej wag szeryfu | `@fontsource-variable/newsreader` (wagi 200–800, oś opsz) | tak (latin-ext) |

Odradzam: Playfair Display (nadużywany, „ślubny”), Cormorant Garamond (zbyt cienki na ekranach), Fraunces (zbyt „miękki”, wręcz zabawny jak na tę markę).

```css
@import '@fontsource-variable/plus-jakarta-sans';
@import '@fontsource/instrument-serif/400.css';
@import '@fontsource/instrument-serif/400-italic.css';

:root {
  --font: 'Plus Jakarta Sans Variable', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Instrument Serif', 'Times New Roman', Georgia, serif;
}
h1, h2, .display, .stat-number { font-family: var(--font-display); font-weight: 400; font-synthesis: none; letter-spacing: -0.01em; }
```

Proponowana skala:
- H1: `clamp(2.75rem, 5.5vw, 4.75rem)`, interlinia 1,04;
- H2: `clamp(2rem, 3.6vw, 3.25rem)`, interlinia 1,1;
- H3: Plus Jakarta 600, 1,25–1,375 rem;
- eyebrow: Plus Jakarta 600, 0,75 rem, wersaliki, tracking 0,18 em, kolor `--accent-600` (na ciemnym `--accent-300`) z kreską 40 px w `--accent`;
- tekst: 1,0625 rem, interlinia 1,7, kolor `--text`.

Kursywę Instrument Serif warto stosować do jednego słowa lub frazy w nagłówku („montujemy *sami*”). Test polskich znaków: „Zażółć gęślą jaźń”.

---

## 6. Ton komunikacji

**Kim jesteśmy w tekstach:** dwóch fachowców i ich zespół. Mówimy spokojnie, konkretnie i po imieniu, jak ekspert, który nie musi nikogo przekonywać krzykiem. Bierzemy odpowiedzialność („odpowiadamy”, „sprawdzamy”, „montujemy”), zamiast obiecywać („najlepsi”, „gwarantujemy satysfakcję”).

| Tak | Nie |
|---|---|
| Krótkie zdania, czasowniki, fakty (liczba ekip, etapy, czas) | Wykrzykniki, „super”, „rewelacyjne”, „najlepsze na rynku” |
| „własny zespół montażowy”, „ten sam zespół od pomiaru do odbioru”, „jedna odpowiedzialność” | „tanio”, „promocja”, „bez przepłacania”, „przystępne ceny”, „konkurencyjne ceny” |
| Precyzja, szczelność, dobór, detal, spokój, porządek na budowie | Żargon bez wyjaśnienia (Uw, ciepły montaż) bez jednego zdania „co to daje” |
| Mówienie o wartości i ryzyku („źle osadzone okno traci parametry”) | Kolokwializmy („zjedliśmy zęby”) |
| Forma „Ty”/„Państwo” stosowana konsekwentnie (proponuję „Ty”, spokojnie) | Mieszanie form, CAPS LOCK |

**Zastrzeżenie:** wyróżnik „wyłącznie własne ekipy, bez podwykonawców” pochodzi z briefu i na obecnej stronie nie pada wprost. Przed publikacją trzeba z klientem potwierdzić, czy dotyczy wszystkich kategorii (okna, drzwi, bramy, rolety, żaluzje, pergole), ile jest ekip i czy sprzęt do dużych przeszkleń jest własny. Nie piszemy „20 lat na rynku”, tylko „20 lat doświadczenia” (spółka istnieje od 2024/2025).

**Propozycje nagłówków i haseł (wokół własnych ekip):**
1. **Montujemy sami. Bez podwykonawców, bez wyjątków.**
2. **Ten sam zespół od pomiaru do odbioru.**
3. **Okno jest tak dobre, jak jego montaż. Dlatego nie oddajemy go nikomu.**
4. **Precyzji nie da się zlecić.**
5. **Wiesz, kto wejdzie na Twoją budowę. Bo to zawsze my.**
6. **Jedna firma, jeden zespół, jedna odpowiedzialność.**
7. **Każdy montaż podpisujemy własnym nazwiskiem.** (Nawiązanie do spółki cywilnej z nazwiskami wspólników. Dobre do sekcji „O nas”.)
8. **Doradzamy, mierzymy i montujemy osobiście.** (Spokojny podtytuł hero.)

Przykładowy hero: eyebrow „WŁASNE EKIPY MONTAŻOWE”, H1 „Montujemy sami. *Bez podwykonawców.*”, lead „Okna, drzwi i bramy z montażem wykonanym wyłącznie przez nasz zespół, od pierwszego pomiaru po odbiór. Płock i okolice.”, przyciski „Umów bezpłatny pomiar” i „Zobacz realizacje”.

---

## 7. Fotografia

**Kierunek:** prawdziwe realizacje własnych ekip, pokazane jak w magazynie architektonicznym. Wykończone domy, miękkie światło (złota godzina, pochmurny dzień bez ostrych cieni), proste piony, spokojne kadry. Kluczowy jest **motyw „widok z wnętrza”**: rama okna kadruje krajobraz. Do tego **detale** (narożnik bez słupka, klamka, uszczelka, styk z parapetem) i **ludzie przy pracy** (ręce montażysty, poziomica, robot do szyb). Te ostatnie są wizualnym dowodem wyróżnika. Kolorystyka zdjęć: chłodne szarości i antracyt, ciepłe drewno, zieleń. Unikać przesyconego nieba HDR.

**Zasady techniczne:** obiektyw 24–35 mm zamiast ultraszerokiego 0,5×. Korekta perspektywy (piony pionowo). Bez placów budowy na pierwszym planie przy zdjęciach wizerunkowych. Zdjęcia procesu mogą być „robocze”, ale ostre i uporządkowane. Na stronie zdjęcia z overlayem w `--ink` (40–60%), bez filtrów kolorystycznych.

**Ocena istniejących zdjęć** (szczegóły w `_tresci/obrazy/INDEX.md`):

| Grupa | Ocena | Komentarz |
|---|---|---|
| Slider DAKO (`slides/DAKO_*.webp`, 2000–5487 px) | WARUNKOWO | Bardzo dobra jakość, ale to zdjęcia producenta ze znakiem „© DAKO”, a nie realizacje firmy. Mogą ilustrować kategorie produktów (za zgodą DAKO, bez usuwania znaku), nie mogą udawać realizacji. Strona budowana na wyróżniku „nasze ekipy” nie powinna mieć ich w hero |
| `INTERWINDOWS_o_nas.webp` | WARUNKOWO | Mimo nazwy to zdjęcie DAKO. Nie używać w sekcji „O nas” |
| Karty DAKO (`products/DAKO_*`, 750–940 px) | WARUNKOWO | Tylko miniatury kategorii |
| `products/oknaDrew.jpg`, `products/drzwiZewn.jpg` | WARUNKOWO | Prawdopodobnie własne, ale mała rozdzielczość (ok. 900 px) |
| `products/zaluzjezewn.webp`, `section-bg.jpg`, `namiary.png`, ikony SVG | NIE | Za małe, nie na temat (blok wielorodzinny) albo zbędne |
| Album – **TAK**: 94, 95, 142, 204, 206, 207, 220, 235, 236, 251, 252, 256, 276, 280, 328, 330, 339, 341, 360, 368, 369, 374, 419, 421, 425 | TAK | Najmocniejsze: **256** (czarny dom ze szprosami), **339/341** (zabytkowe zielone drzwi), **95/204/206** (widok z wnętrza), **328/330/419** (montaż szyb robotem, dowód kompetencji ekip), **421/425** (narożne przeszklenia), **368/369/374** (wykończona elewacja, złoty dąb). Przed publikacją: prostowanie perspektywy, kadr, korekta koloru |
| Album – pozostałe stany surowe | WARUNKOWO | Dobre do galerii „z budowy” i sekcji procesu, nie do hero |

**Rekomendacja:** jedna profesjonalna sesja (1–2 dni) z 3–5 **wykończonymi** realizacjami: dom z dużymi przeszkleniami, dom w stylu klasycznym ze szprosami, realizacja z bramą i drzwiami w jednym kolorze, wnętrze z drzwiami wewnętrznymi. Do tego reportaż z montażu: portret ekipy, ręce, narzędzia, robot do szyb, porządek po montażu. Zdjęcia zespołu w ciemnej, jednolitej odzieży z logo wzmocnią komunikat „to nasi ludzie”, ale tylko jeśli tak jest naprawdę.

---

## 8. Do potwierdzenia z klientem

1. Akceptacja palety „antracyt i mosiądz” oraz wycofania niebieskiego (albo wariant B).
2. Akceptacja poziomego układu logo i ewentualne zlecenie wektoryzacji sygnetu.
3. Zakres wyróżnika „własne ekipy”: kategorie, liczba ekip, sprzęt własny czy wynajmowany.
4. Liczby 500+ / 650+: czy dotyczą samej spółki.
5. Role osób (Majchrzak, Bezdziek, Dylewski) i ich zdjęcia.
6. Gwarancje, certyfikaty (status partnera DAKO), godziny pracy, czy przy Przemysłowej 22 jest ekspozycja.
7. Zgoda DAKO na zdjęcia producenta oraz zgody autorów referencji i ich źródło.
