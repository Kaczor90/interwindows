# www.interwindows.pl

Statyczna strona firmy **Inter Windows** (Płock): okna, drzwi, rolety, żaluzje fasadowe i bramy garażowe z montażem
wykonywanym wyłącznie przez własną ekipę. Zbudowana w [Astro](https://astro.build). Gotowa strona to czyste pliki
HTML/CSS + jeden skrypt PHP do formularzy. Fakty o firmie: wyłącznie `_tresci/tresci.md` (poza repozytorium).

**Przed startem:** lista braków i pytań do klienta – **`docs/do-uzupelnienia.md`** (punkty „[BLOKUJE]”).

## Praca lokalna

```bash
npm install
npm run dev -- --port 4331       # podgląd na http://localhost:4331 (konfiguracja „interwindows-dev” w .claude/launch.json)
npm run build                    # gotowa strona w dist/ (+ dist/sitemap.xml)
npm run preview -- --port 4332   # podgląd zbudowanej wersji (ten sam port co „interwindows-preview”)
node scripts/images.mjs          # zdjęcia z _tresci/ → public/img/ (realizacje z albumu, AI, logo, favicon, og.jpg)
node scripts/realizacje-projekty.mjs   # zdjęcia projektów /realizacje/{slug}/ (rozmycia twarzy i tablic) + obrazy OG
```

`_tresci/` (≈110 MB źródeł) nie trafia do repozytorium; zoptymalizowane pliki są w `public/img/`. Żaden skrypt nie działa
w trakcie `npm run dev` ani `build` – zdjęcia generuje się ręcznie powyższymi poleceniami.

Podgląd tak jak na GitHub Pages (w Git Bash dodaj `MSYS_NO_PATHCONV=1`, inaczej `/interwindows/` zamieni się w ścieżkę Windows):

```bash
SITE_URL=https://kaczor90.github.io BASE_PATH=/interwindows/ PUBLIC_PREVIEW=true npm run build
```

## Strony (34 pliki HTML, 31 adresów w sitemap.xml)

| Adres | Plik | Uwagi |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | slider, oferta, własne ekipy, proces, montażyści, konfigurator, 3 realizacje, opinie, producenci, obszar, poradnik, formularz |
| `/okna/` + 9 kategorii (`/okna-pcv/`, `/okna-aluminiowe/`, `/okna-drewniane/`, `/drzwi-tarasowe/`, `/drzwi-zewnetrzne/`, `/drzwi-wewnetrzne/`, `/rolety-zewnetrzne/`, `/zaluzje-fasadowe/`, `/bramy-garazowe/`) | `src/pages/[slug].astro` + `src/data/oferta.ts` | |
| `/montaz-okien/`, `/wymiana-okien/` | `src/pages/*.astro` | |
| `/cieply-montaz-okien/` | `src/pages/cieply-montaz-okien.astro` | **ukryta** do potwierdzenia: `noindex`, poza sitemap, bez linków (flaga `features.cieplyMontaz` w `site.ts`) |
| `/obszar-dzialania/` | `src/pages/obszar-dzialania/index.astro` + `src/data/obszar.ts` | |
| `/realizacje/` + 7 projektów `/realizacje/{slug}/` | `src/pages/realizacje/` + `src/data/realizacje.ts` | |
| `/poradnik/` + 4 artykuły | `src/pages/poradnik/` + `src/data/poradnik.ts` | |
| `/konfigurator/` | `src/pages/konfigurator.astro`, `src/components/konfigurator/`, `src/scripts/konfigurator.ts`, `src/data/konfigurator.ts` | jedyna strona z większym JS (~44 KB) |
| `/o-firmie/`, `/kontakt/`, `/polityka-prywatnosci/` | `src/pages/*.astro` | |
| `/dziekujemy/`, `404.html` | `src/pages/*.astro` | `noindex` |
| `robots.txt`, `sitemap.xml` | `src/pages/robots.txt.ts`, `integrations/sitemap.mjs` | |

## Gdzie co zmieniać

| Co | Plik |
| --- | --- |
| **Motyw kolorystyczny** (`'profil'` = „Granat” albo `'mono'`) – jedna linijka | `src/data/site.ts` → `theme` |
| **Funkcje czekające na potwierdzenie** (dziś: ciepły montaż) | `src/data/site.ts` → `features` |
| Kolory, typografia, odstępy (tokeny obu motywów) | `src/styles/global.css` (góra pliku) |
| Telefon, e-mail, adres (NAP), godziny, social, menu | `src/data/site.ts` |
| Kategorie oferty: SEO, treści, FAQ, zdjęcie hero | `src/data/oferta.ts` |
| Montażyści (3 karty: strona główna, `/montaz-okien/`, `/o-firmie/`) | `src/data/ekipa.ts` (zdjęcia: `public/img/ekipa/`) |
| Kroki montażu i ich znaczniki „do potwierdzenia” | `src/data/montaz.ts` |
| Producenci / logotypy | `src/data/partners.ts` |
| Opinie klientów | `src/data/opinie.ts` |
| Realizacje (projekty) / zdjęcia z albumu | `src/data/realizacje.ts` / `src/data/realizacje-zdjecia.ts` |
| Ilustracje AI (do podmiany) | `src/data/ai-zdjecia.ts` |
| Adres odbiorcy formularza | `public/kontakt.php` (stała `RECIPIENT`) |
| Przekierowania, HTTPS, www, cache | `public/.htaccess` |

### Przełącznik motywu (tylko dev i podgląd)

W `npm run dev` i w buildzie z `PUBLIC_PREVIEW=true` jest przełącznik „Motyw: Granat | Mono”: w stopce (zawsze), w menu
mobilnym oraz na komputerach ≥ 1280 px jako okrągły przycisk na dole lewego paska. Nigdy nie pływa nad treścią. Wybór
zapamiętuje localStorage i parametr `?motyw=mono` / `?motyw=profil`. Build produkcyjny nie ma przełącznika – używa tylko
`theme` z `site.ts`.

### Ukryte strony (flagi `features`)

`features.cieplyMontaz = false` → `/cieply-montaz-okien/` dostaje `noindex` (więc wypada z sitemap.xml), znika ze stopki
i list „Powiązane strony”, a linki w tekstach (`[etykieta](/cieply-montaz-okien/)` w plikach danych) renderują się jako
zwykły tekst (`isLinked()` w `site.ts`, obsługa w `src/lib/rich.ts`). `true` włącza wszystko naraz.

## SEO – jak działa

- **Title i meta** podawane do `<Base>` są używane 1:1 (bez doklejania marki) – teksty z `docs/seo-plan.md` §4.2.
  Title ≤ 60 znaków, description ≤ 155 (sprawdzone dla wszystkich stron).
- **Canonical / og:url** zawsze wskazują `https://www.interwindows.pl` + ścieżka z ukośnikiem, także z kopii podglądowej.
- **JSON-LD:** `Base.astro` dodaje na każdej stronie `@graph` z `HomeAndConstructionBusiness` i `WebSite` (`src/lib/schema.ts`).
  Strona dokłada własne obiekty propem `schema` (`service()`, `article()` – autor domyślnie organizacja, `webPage()`),
  a `Breadcrumbs` i `Faq` same wypisują `BreadcrumbList` i `FAQPage`.
- **sitemap.xml** tworzy `integrations/sitemap.mjs` po buildzie z faktycznie zbudowanych stron. `<lastmod>` = prop `updated`.
- **noindex:** `<Base noindex>` dodaje `noindex, follow` **i** usuwa stronę z sitemap.xml. Podgląd (`PUBLIC_PREVIEW`) ma
  `noindex, nofollow` na wszystkich stronach, a `robots.txt` – `Disallow: /`.
- **Typografia:** `integrations/typografia.mjs` po buildzie wstawia twarde spacje po jednoliterowych wyrazach (a, i, o, u, w, z),
  tylko w tekście (nie w atrybutach, skryptach, `<title>`). W `npm run dev` tego nie widać.

## Komponenty (`src/components/`)

| Komponent | Propsy | Do czego |
| --- | --- | --- |
| `PageHero` | `title` (H1), `breadcrumbs`, `lead?` (rich), `image?: {src, srcSmall?, alt, width, height}`, `placeholderLabel?`, `media?`, `highlights?`; slot = przyciski | nagłówek podstrony z okruszkami |
| `seo/DarkHero` | `title`, `titleEm?`, `eyebrow?`, `lead?`, `breadcrumbs`, `pledges?`, `bg`, `photo`, `proof?` | ciemny nagłówek `/montaz-okien/` |
| `Breadcrumbs` | `items: {name, path?}[]`, `schema?` | okruszki + JSON-LD |
| `Faq` | `items: {q, a}[]`, `title?`, `intro?`, `id?`, `schema?`, `bare?` | akordeon FAQ + FAQPage |
| `CtaBand` | `title`, `text?`, `primary`, `secondary?`, `tone?`, `wrap?`, `image?: {src, srcSmall?, width?, height?, smallWidth?}` | pas wezwania do działania |
| `QuoteForm` | `title?`, `lead?`, `preselect?`, `id?` (domyślnie `wycena`), `tone?` | formularz → `kontakt.php` → `/dziekujemy/` |
| `ProcessSteps` | `steps?`, `layout?`, `images?` | kroki montażu ze znacznikami „do potwierdzenia” |
| `CrewGrid` | `members?` (domyślnie `ekipa.ts`) | karty montażystów; zdjęcie tylko gdy plik istnieje (inaczej placeholder) |
| `GoogleMap` | `fill?`, `zoom?`, `class?` | mapa Google (iframe, lazy, szara do najechania) + link do profilu; zapytanie i zoom w `site.mapEmbed` |
| `Placeholder`, `PhotoStrip`, `InstallBlock`, `Brands`, `MapLink`, `GridLines`, `Icon`, `Testimonials`, `Rail`, `CtaBar`, `ThemeSwitch` | – | jak w komentarzach na górze plików |
| `realizacje/*` | `ProjectCard`, `ProjectGallery`, `FactsBox`, `CrewNote`, `Lightbox` | strony realizacji (karta `ProjectCard` także na stronie głównej) |

Pomocnicze (`src/lib/`): `url()` dodaje base path (linki zawsze pisz jako `/sciezka/`), `rich()` – `[etykieta](/sciezka/)` i
`**pogrubienie**` w tekstach z danych, `srcsetOf()` (`img.ts`) – srcset z **prawdziwymi** szerokościami plików
(pionowe zdjęcie 1200×1600 ma wersję 600 px, nie 800), `inPublic()` (`public-file.ts`) – czy plik jest w `public/`,
`plural()` / `count()` – odmiana liczebników („4 zdjęcia”, „10 zdjęć”), `schema.ts`, `slug.ts`.

Elementy pływające: `CtaBar` (telefony < 900 px) chowa się przy formularzu, stopce i elementach z `data-ctabar-avoid`
(konfigurator ma własny pasek „Wstecz | Dalej”); przycisk telefonu `.fab` (≥ 900 px) chowa się przy stopce i elementach
z `data-fab-avoid`. Przyciski z `data-quote-link` same przełączają się na `#wycena`, jeśli strona ma formularz.
CTA mają atrybuty `data-cta="…"` (pod analitykę).

Klasy CSS: `section`, `section--soft` (półprzezroczyste tło – linie siatki prześwitują), `section--tight`, `container`,
`section-head(--split)`, `lead`, `btn` (`--ghost`, `--light`, `--brand`, `--outline-dark`), `link-arrow`, `dark on-dark`,
`tiles/tile` (`tiles--4` dla 4 kafli), `cards/card`, `related`, `tbc`. Małe etykiety nad nagłówkami („eyebrow”) usunięto
z całej strony (decyzja klienta 27.10.2026) – zostały tylko w ciemnej sekcji „Własne ekipy montażowe” i w `DarkHero`.

**Linie siatki w tle** leżą pod całą treścią (`z-index:-1`); wszystko, co ma tło, je zasłania.

## Zdjęcia

- Realizacje z albumu: `scripts/images.mjs` (WebP 1600 px + 800 px, nazwy ASCII z tabeli `REALIZACJE`; zdjęcia z twarzą
  prywatnej osoby są w zbiorze `PRIVATE` i nie trafiają do `public/`). Opisy i tagi: `src/data/realizacje-zdjecia.ts`.
- Projekty realizacji: `scripts/realizacje-projekty.mjs` (rozmycia twarzy i tablic, kadrowanie, obrazy OG 1200×630).
- Ilustracje AI (`public/img/ai/`, prefiks `ai-`) – nigdy na `/realizacje/` ani w kartach ekipy. Zdjęć DAKO ze znakiem „© DAKO” nie używamy.
- Montażyści: `public/img/ekipa/<nazwa>.webp` 1200×1500 + `<nazwa>-600.webp` 600×750 (4:5).

## Dokumenty (`docs/`)

| Plik | Co zawiera |
| --- | --- |
| `do-uzupelnienia.md` | **jedna lista braków i pytań do klienta**, z podziałem na blokujące start i „po starcie” |
| `realizacje-do-potwierdzenia.md` | pytania do każdej z 7 realizacji, lista rozmytych zdjęć |
| `konfigurator-wymagania.md` | co jest w prototypie konfiguratora i czego trzeba do wersji docelowej (dane DAKO, ceny, SMTP, RODO) |
| `konfigurator-zrzuty/` | zrzuty prototypu konfiguratora |
| `seo-plan.md` | plan SEO lokalnego: słowa kluczowe, mapa adresów, title/meta/H1, SEO techniczne, przekierowania |
| `marka.md` | decyzje o marce: logo, paleta (archiwum wariantów), typografia, ton, zdjęcia |
| `konkurencja-i-konfiguratory.md` | analiza konkurencji i ich konfiguratorów |
| `wizytowka-google-plan.md`, `wizytowka-google-materialy.md` | plan i gotowe teksty do wizytówki Google |
| `facebook-analiza.md` | analiza profilu na Facebooku (m.in. niezgodny adres i e-mail) |
| `raport-widocznosci/` | raport widoczności firmy w internecie (PDF + źródło HTML) |
| `podglad-palet/` | zrzuty porównawcze motywów |
| `zrzuty-qa/` | zrzuty z kontroli jakości 27.10.2026 (strona główna w obu motywach, telefon, konfigurator, montaż) |

## Publikacja

1. `npm run build`
2. Wgraj **zawartość** `dist/` (razem z ukrytym `.htaccess`) na serwer domeny (LiteSpeed/Apache z PHP `mail()`).
   Formularze wysyłają na `biuro@interwindows.pl` z nadawcy `formularz@interwindows.pl` (skrzynka musi istnieć).
3. `.htaccess` przekierowuje na `https://www.interwindows.pl`, przenosi stare adresy one-page'a i ustawia cache.
4. W dniu startu: Google Search Console + Bing, wysłanie `sitemap.xml`, test przekierowań (`docs/seo-plan.md` §5.10).

## Podgląd na GitHub Pages

Push do `main` uruchamia `.github/workflows/pages.yml`, który publikuje podgląd pod https://kaczor90.github.io/interwindows/.
Podgląd ma `noindex, nofollow`, `robots.txt` z `Disallow: /`, canonical na www.interwindows.pl, przełącznik motywu,
a formularz pokazuje tylko komunikat (GitHub Pages nie obsługuje PHP). Jednorazowo: **Settings → Pages → Source: GitHub Actions**.
