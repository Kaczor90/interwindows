# www.interwindows.pl

Statyczna strona firmy **Inter Windows** (Płock): okna, drzwi, rolety, żaluzje fasadowe i bramy garażowe z montażem
wykonywanym wyłącznie przez własne ekipy. Zbudowana w [Astro](https://astro.build) na bazie projektu Profil.
Gotowa strona to czyste pliki HTML/CSS + jeden skrypt PHP do formularza.

Dokumenty projektu: `docs/seo-plan.md` (adresy, title/meta/H1, SEO techniczne), `docs/marka.md` (decyzje klienta: paleta,
typografia, ton), `docs/konkurencja-i-konfiguratory.md`, **`docs/do-uzupelnienia.md`** (lista braków i pytań do klienta –
dopisuj tam swoje punkty). Fakty o firmie: wyłącznie `_tresci/tresci.md`.

## Praca lokalna

```bash
npm install
npm run dev -- --port 4331       # podgląd na http://localhost:4331 (konfiguracja „interwindows-dev” w .claude/launch.json)
npm run build                    # gotowa strona w dist/ (+ dist/sitemap.xml)
npm run preview -- --port 4332   # podgląd zbudowanej wersji
node scripts/images.mjs          # przetworzenie zdjęć z _tresci/ do public/img/
```

`_tresci/` (≈110 MB źródeł) nie trafia do repozytorium. Zoptymalizowane pliki są w `public/img/`.

## Gdzie co zmieniać

| Co | Plik |
| --- | --- |
| **Motyw kolorystyczny** (`'profil'` albo `'mono'`) – jedna linijka | `src/data/site.ts` → `theme` |
| Kolory, typografia, odstępy (tokeny obu motywów) | `src/styles/global.css` (góra pliku) |
| Telefon, e-mail, adres (NAP), godziny, social, menu | `src/data/site.ts` |
| Kategorie oferty: SEO, treści, FAQ, zdjęcie hero | `src/data/oferta.ts` (strony generuje `src/pages/[slug].astro`) |
| Ekipa montażowa (karty „Poznaj naszych montażystów”) | `src/data/ekipa.ts` |
| Kroki montażu (strona główna, do użycia na `/montaz-okien/`) | `src/data/montaz.ts` |
| Producenci / logotypy | `src/data/partners.ts` |
| Opinie klientów | `src/data/opinie.ts` |
| Zdjęcia realizacji (48 plików, opisy, tagi) | `src/data/realizacje-zdjecia.ts` |
| Ilustracje AI (do podmiany) | `src/data/ai-zdjecia.ts` |
| Adres odbiorcy formularza | `public/kontakt.php` (stała `RECIPIENT`) |
| Przekierowania, HTTPS, www, cache | `public/.htaccess` |

Podgląd motywów w przeglądarce bez przebudowy: dopisz `?motyw=mono` albo `?motyw=profil` do adresu.
Zrzuty porównawcze: `docs/podglad-palet/`.

## SEO – jak działa

- **Title i meta** podawane do `<Base>` są używane 1:1 (bez doklejania marki) – teksty z `docs/seo-plan.md` §4.2.
- **Canonical / og:url** zawsze wskazują `https://www.interwindows.pl` + ścieżka z ukośnikiem, także z kopii podglądowej.
- **JSON-LD:** `Base.astro` dodaje na każdej stronie `@graph` z `HomeAndConstructionBusiness` i `WebSite` (`src/lib/schema.ts`).
  Strona dokłada własne obiekty propem `schema` (np. `service()`, `article()`, `webPage()`), a komponenty
  `Breadcrumbs` i `Faq` same wypisują `BreadcrumbList` i `FAQPage`.
- **sitemap.xml** tworzy integracja `integrations/sitemap.mjs` po `astro build` z **faktycznie zbudowanych stron** –
  każda nowa strona (także dynamiczna, np. `/realizacje/[slug]/`) trafia tam automatycznie, bez dopisywania do listy.
  `<lastmod>` pochodzi z propa `updated` w `<Base>`.
- **noindex:** `<Base noindex>` dodaje `<meta name="robots" content="noindex, follow">` **i** automatycznie usuwa stronę
  z `sitemap.xml` (znacznik `data-noindex` na `<html>`). Tak jest oznaczona `/dziekujemy/` i 404.
- **robots.txt** generuje `src/pages/robots.txt.ts` (produkcja: Allow + Sitemap; podgląd: `Disallow: /`).

## Komponenty (`src/components/`) – do ponownego użycia

| Komponent | Propsy | Do czego |
| --- | --- | --- |
| `PageHero` | `title` (H1), `breadcrumbs: {name, path?}[]`, `eyebrow?`, `lead?` (rich), `image?: {src, srcSmall?, alt, width, height}`, `placeholderLabel?`, `media?` (false = sam tekst), `highlights?: string[]`; slot = przyciski | nagłówek podstrony z okruszkami (+ BreadcrumbList) |
| `Breadcrumbs` | `items: {name, path?}[]`, `schema?` | okruszki + JSON-LD (Strona główna dodaje się sama) |
| `Faq` | `items: {q, a}[]`, `title?`, `eyebrow?`, `intro?`, `id?`, `schema?`, `bare?`, `class?` | akordeon FAQ + FAQPage JSON-LD |
| `CtaBand` | `title`, `text?`, `eyebrow?`, `primary: {label, href}`, `secondary?`, `tone?: 'dark' \| 'light'`, `wrap?` | pas wezwania do działania |
| `QuoteForm` | `title?`, `eyebrow?`, `lead?`, `preselect?` (slug kategorii), `id?` (domyślnie `wycena`), `tone?: 'soft' \| 'plain'` | formularz → `kontakt.php` → `/dziekujemy/` |
| `ProcessSteps` | `steps?` (domyślnie `montaz.ts`), `layout?: 'row' \| 'list'`, `images?` | kroki montażu z dowodami i znacznikiem „do potwierdzenia” |
| `CrewGrid` | `members?` (domyślnie `ekipa.ts`) | karty montażystów (placeholdery, dopóki brak zdjęć) |
| `Placeholder` | `label?`, `icon?: 'camera' \| 'person' \| 'image'`, `tone?: 'light' \| 'dark'`, `class?` | zamiennik brakującego zdjęcia (wypełnia rodzica – nadaj mu aspect-ratio) |
| `PhotoStrip` | `tags?`, `photos?`, `count?: 3 \| 4`, `exclude?`, `placeholderLabel?` | rząd zdjęć realizacji wg tagów z manifestu |
| `InstallBlock` | `product?`, `title?`, `wrap?` | blok „Montuje nasza ekipa” na końcu stron oferty |
| `Brands` | `eyebrow?`, `title?` | DAKO (autoryzowany partner) + logotypy producentów |
| `MapLink` | `href?`, `label?`, `note?` | statyczna „mapa” z linkiem do Map Google (bez iframe) |
| `GridLines` | `local?`, `tone?: 'light' \| 'dark'` | linie tła; w pełnej szerokości ciemnej sekcji: `<section class="dark has-lines"><GridLines local tone="dark" />` |
| `Icon` | `name`, `class?`, `label?` | ikony liniowe (kategorie: `okna-pcv`, `bramy-garazowe`…, proces: `pomiar`, `montaz`, `odbior`…, UI: `arrow`, `phone`…) |

Pomocnicze: `src/lib/url.ts` (`url()` dodaje base path – linki zawsze pisz jako `/sciezka/`), `src/lib/rich.ts`
(`rich()` – w tekstach z plików danych `[etykieta](/sciezka/)` i `**pogrubienie**`), `src/lib/slug.ts`, `src/lib/schema.ts`.

Klasy CSS warte znania: `section`, `section--soft` (półprzezroczyste tło – linie siatki prześwitują), `section--tight`,
`container`, `section-head(--split)`, `eyebrow`, `lead`, `btn` (`--ghost`, `--light`, `--brand`, `--outline-dark`),
`link-arrow`, `dark on-dark` (ciemna sekcja w nastroju sekcji „Własne ekipy” ze strony głównej), `tiles/tile`, `cards/card`, `related`, `tbc`.

**Linie siatki w tle** leżą pod całą treścią (`z-index:-1`); wszystko, co ma tło (zdjęcia, karty, przyciski, pola formularza,
nagłówek, ciemne sekcje), je zasłania. Pełnoszerokie jasne sekcje mają mieć **półprzezroczyste** tło (`--tint-soft`), a karty
i panele – pełne (`#fff`, `--bg-soft`).

## Zdjęcia

- Realizacje: `node scripts/images.mjs` zamienia wszystkie pliki z `_tresci/obrazy/realizacje/` na WebP (1600 px + wersja 800 px)
  o nazwach ASCII z tabeli `REALIZACJE` w skrypcie. Opisy, tagi i rozmiary: `src/data/realizacje-zdjecia.ts`.
- Ilustracje AI z `_tresci/ai/` trafiają do `public/img/ai/` (prefiks `ai-`). Nie używać na `/realizacje/` ani w kartach ekipy.
- Zdjęć DAKO ze znakiem „© DAKO” nie używamy.
- Skrypt robi też logo (nagłówek, stopka), favicon, apple-touch-icon, `og.jpg` i logotypy producentów.

## Publikacja

1. `npm run build`
2. Wgraj **zawartość** `dist/` (razem z ukrytym `.htaccess`) na serwer domeny (LiteSpeed/Apache z PHP `mail()`).
3. `.htaccess` przekierowuje na `https://www.interwindows.pl`, stare adresy one-page'a i ustawia cache.

## Podgląd na GitHub Pages

Push do `main` uruchamia `.github/workflows/pages.yml`, który publikuje podgląd pod `https://<login>.github.io/<repo>/`.
Podgląd ma `noindex`, `robots.txt` z `Disallow: /`, canonical na www.interwindows.pl, a formularz pokazuje tylko komunikat
(GitHub Pages nie obsługuje PHP). Jednorazowo: **Settings → Pages → Source: GitHub Actions**.
