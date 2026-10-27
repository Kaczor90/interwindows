# Do uzupełnienia – lista dla klienta i zespołu

Stan na 27.10.2026. Jedna lista wszystkiego, czego brakuje albo co trzeba potwierdzić przed publikacją strony www.interwindows.pl.
Każdy agent i osoba z zespołu dopisuje swoje punkty **w osobnej sekcji na końcu** (nagłówek `## …`), żeby nic się nie zgubiło.

Oznaczenia: **[PILNE]** blokuje publikację · **[TREŚĆ]** wpływa na teksty · **[ZDJĘCIE]** podmiana grafiki · **[SEO]** wizytówka, katalogi, pomiar.

---

## 1. Dane firmy i NAP

- [ ] **[PILNE] Kod pocztowy: 09-400 czy 09-401?** Wizytówka Google pokazuje **09-401**, a rejestr VAT i dotychczasowa strona **09-400**. Na stronie zostawiliśmy 09-400 (zgodnie z planem SEO). Trzeba ujednolicić wszędzie (wizytówka, strona, katalogi), bo NAP musi być identyczny. Plik: `src/data/site.ts` (`address.postalCode`).
- [ ] **Godziny pracy biura** – na stronie są godziny z wizytówki Google (pn.–pt. 8:00–16:00, sob. 8:00–13:00): **godziny z wizytówki Google – potwierdzić**. Wyświetlają się w stopce, na `/kontakt/`, w formularzu i w danych strukturalnych (JSON-LD). Plik: `src/data/site.ts` (`hours`, `hoursRows`, `openingHours`).
- [ ] Czy przy ul. Przemysłowej 22 jest ekspozycja (salon) i czy można przyjść bez umawiania? Dziś strona mówi tylko „Biuro sprzedaży” i radzi umówić spotkanie telefonicznie (SEO §7 pkt 4, marka §8 pkt 6).
- [ ] Forma nazwy w NAP: „Inter Windows” (przyjęta) czy „InterWindows” (SEO §7 pkt 12).
- [ ] Role osób kontaktowych: kim są Paweł Majchrzak, Bartosz Bezdziek (na stronie: „Współwłaściciel”) i **Kacper Dylewski** (rola nieznana, na `/kontakt/` bez podpisu). Który wspólnik odpowiada za doradztwo, a który za montaż (tekst „Jeden z nas… drugi…” na `/o-firmie/`). (marka §8 pkt 5, treści §12 pkt 2)
- [ ] Który numer obsługuje WhatsApp (ikona na starej stronie prowadziła do `tel:`)? Jeśli żaden – pomijamy.
- [ ] Dostęp do wizytówki Google (właściciel/menedżer), Google Search Console, GA4 (SEO §7 pkt 11). Link do wizytówki (CID) jest już w `site.ts` i w JSON-LD (`hasMap`, `sameAs`).

## 2. Wyróżnik „własne ekipy” i proces montażu

- [ ] **[PILNE] Liczba ekip i monterów, ich imiona, role, staż i zdjęcia** (z pisemną zgodą każdej osoby). Dziś karty „Poznaj naszych montażystów” to placeholdery (patrz sekcja 6). Plik: `src/data/ekipa.ts`. (SEO §7 pkt 5)
- [ ] **[PILNE] Gwarancja na montaż** – ile lat i na jakich warunkach. Krok 05 procesu ma dziś dopisek „okres do uzupełnienia” i znacznik „do potwierdzenia”. Plik: `src/data/montaz.ts`.
- [ ] Kroki procesu oznaczone na stronie „do potwierdzenia” (`src/data/montaz.ts`, pole `confirmed`):
  - krok 02 „Przygotowanie i demontaż”: zabezpieczanie podłóg i mebli, demontaż, **wywóz starej stolarki** („nie zostaje na Twojej posesji”),
  - krok 04 „Odbiór z protokołem”: czy jest protokół odbioru, kto go podpisuje (brygadzista i klient), instruktaż, sprzątanie,
  - krok 05 „Gwarancja na montaż”: jw.; czy przyjeżdża ta sama ekipa do regulacji.
  Po potwierdzeniu wystarczy zmienić `confirmed: false` na `true` (znacznik zniknie).
- [ ] Czy ekipy robią **ciepły (warstwowy) montaż** i montaż w warstwie ocieplenia? Materiały (taśmy, systemy), szkolenia, certyfikaty (SEO §7 pkt 1). Od tego zależy strona `/cieply-montaz-okien/`.
- [ ] **Sprzęt do dużych przeszkleń** (minidźwig gąsienicowy, przyssawka próżniowa ze zdjęć): własny czy wynajmowany? Strona pisze neutralnie „osadzamy z minidźwigiem i przyssawką próżniową”, bez „własny”.
- [ ] Przegląd po pierwszej zimie (propozycja z SEO §6.3) – czy firma chce to oferować?
- [ ] Zapis w umowie „montaż wykonują wyłącznie pracownicy Inter Windows” (propozycja z analizy konkurencji §5) – czy jest/będzie?

## 3. Oferta – do potwierdzenia (z SEO §7 i z treści stron kategorii)

- [ ] Systemy aluminiowe: DAKO DA-77, DA-70N czy bezpośrednio Aluprof? (strona `/okna-aluminiowe/`, SEO §7 pkt 3)
- [ ] Okna drewniane: DAKO DDF-68, DDR-68, DDA-78; czy oferujecie **drewno-aluminium**? Warunki pielęgnacji i serwisu okien drewnianych. (`/okna-drewniane/`)
- [ ] **Drzwi tarasowe:** HST, SmartMove, SkyLine, harmonijkowe – co sprzedajecie i montujecie? Którzy producenci (na stronie wpisano DAKO, Sonarol, All Windows Group)? Są realizacje? (SEO §7 pkt 2, `/drzwi-tarasowe/`)
- [ ] Okna PCV: potwierdzić opis profilu VEKA Softline 82 MD („klasa A”, „82 mm”, „MD = uszczelka środkowa”) i dostępność okuć/szyb w klasie RC2.
- [ ] Bramy garażowe DAKO: linie Thermo 60 / Standard 40, bramy rolowane, napędy i sterowanie z telefonu.
- [ ] Rolety: sterowanie DAKO Smart Home; czy moskitiery są zintegrowane z roletami.
- [ ] Żaluzje fasadowe: lamele Z90 / C80 u waszych dostawców.
- [ ] Drzwi zewnętrzne: aluminiowe drzwi DAKO; drzwi do mieszkań w blokach (w tym demontaż starych).
- [ ] Drzwi wewnętrzne: **bezprzylgowe i ukryte**, przesuwne – czy w ofercie? (na stronie jest sekcja i ilustracja AI)
- [ ] „Antracyt i złoty dąb to kolory, które najczęściej widać na naszych montażach” (`/okna-pcv/`) – potwierdzić.
- [ ] Moskitiery, rolety wewnętrzne, pergole, parapety: szczegóły oferty i producenci (dziś tylko wzmianka w menu i na stronie głównej; strony P2 `/moskitiery/`, `/pergole/`, `/parapety/` po doprecyzowaniu). (SEO §7 pkt 9)
- [ ] Okna dachowe – czy w ofercie? (dziś nie)
- [ ] Serwis okien innych firm? (SEO §7 pkt 10)
- [ ] **Ceny:** zgoda na widełki „od … zł” na stronach i w poradniku. Dziś sekcje „Ile kosztują…” opisują tylko, od czego zależy cena (SEO §7 pkt 8).
- [ ] Wizualizacje drzwi/okien przed montażem (grafika z albumu „Tak mogą wyglądać Twoje drzwi…”) – czy to stała usługa?

## 4. Liczby, opinie, zgody

- [ ] **Liczby 500+ klientów i 650+ projektów** ze starej strony – czy dotyczą samej spółki, czy też pracy u producentów? **Na nowej stronie ich nie ma** do czasu potwierdzenia. (treści §5, marka §8 pkt 4)
- [ ] „20 lat doświadczenia” – na stronie zawsze jako doświadczenie założycieli, nie wiek firmy. Potwierdzić, że dotyczy obu wspólników.
- [ ] **Opinie klientów** (6 z dotychczasowej strony, cytowane bez zmian): źródło (Google, Facebook, ankieta?) i zgody autorów. Na stronie podpis „imię + inicjał nazwiska + miejscowość” i dopisek o źródle. Plik: `src/data/opinie.ts`. (treści §7.7, marka §8 pkt 7)
- [ ] Wizytówka Google ma 9 opinii (5,0) – strona tylko linkuje „Opinie w Google”, **bez gwiazdek i bez aggregateRating** (zasady Google). Można poprosić autorów o zgodę na zacytowanie wybranych opinii.
- [ ] Zgoda DAKO na użycie logo „autoryzowany partner” i ewentualnie zdjęć producenta; najlepiej oficjalny plik wektorowy logo DAKO. Zdjęć DAKO ze znakiem „© DAKO” nie używamy nigdzie.
- [ ] Oficjalne pliki logo pozostałych producentów (dziś logotypy z dotychczasowej strony, niskiej jakości: Doorsystem, Barański).
- [ ] Zgody klientów na zdjęcia realizacji (tylko miejscowość, bez adresu) – punkt w protokole odbioru (SEO §3.4).

## 5. Marka i logo

- [ ] Akceptacja **poziomego układu logo** w nagłówku (`_tresci/logo/logo-poziome-propozycja.png`) albo decyzja o profesjonalnej wektoryzacji sygnetu (favicon poniżej 32 px jest mało czytelny). (marka §8 pkt 2)
- [ ] **Wybór motywu kolorystycznego: „profil” (granat + bordowy akcent, jak w Profil) czy „mono” (czarno-biały jak logo).** Oba są gotowe; przełącza się jedną linijką (`theme` w `src/data/site.ts`), a w przeglądarce do porównania: `?motyw=mono` / `?motyw=profil`. Zrzuty: `docs/podglad-palet/` (profil-hero, mono-hero, …-montaz, …-kategoria, …-hero-mobile). Domyślnie aktywny: profil. Złoto/mosiądz odrzucone.
- [x] Typografia: decyzja klienta 27.10.2026 – tylko Plus Jakarta Sans.
- [ ] Czy zmienić bordowy akcent na inny, żeby odróżnić się od Profil? (jedna linijka w CSS)
- [ ] Facebook: profil https://www.facebook.com/profile.php?id=61580449427158 jest podlinkowany – czy to docelowy adres (warto ustawić nazwę użytkownika strony)?

## 6. Placeholdery na stronie (do podmiany)

Każdy placeholder ma szare kreskowanie, ikonę i podpis „… – do podmiany / do uzupełnienia”.

| Gdzie | Co jest potrzebne | Plik |
|---|---|---|
| Strona główna `/#ekipy`, `/o-firmie/#ekipy` – karty „Poznaj naszych montażystów” (4 szt.) | portret każdego montażysty (pion 4:5, min. 800×1000 px, jednolite tło lub plac budowy), imię i nazwisko, rola, staż | `src/data/ekipa.ts` (`photo`, `name`, `role`, `experience`), zdjęcia do `public/img/ekipa/` |
| `/o-firmie/#wlasciciele` – 2 karty właścicieli | portrety Pawła Majchrzaka i Bartosza Bezdzieka (4:5) | `src/pages/o-firmie.astro` |
| `/okna-drewniane/`, `/rolety-zewnetrzne/`, `/zaluzje-fasadowe/` – blok „Realizacje w Płocku i okolicach” | po 3–4 zdjęcia własnych realizacji z tymi produktami (dziś po 4 placeholdery) | tagi w `src/data/realizacje-zdjecia.ts` |
| Strona główna – krok 05 „Gwarancja na montaż” | okres gwarancji (tekst) | `src/data/montaz.ts` |

Zalecana sesja zdjęciowa: 3–5 wykończonych realizacji + reportaż z montażu z ekipą (marka §7).

## 7. Obrazy AI – podmienić na zdjęcie własne

Ilustracje wygenerowane AI (`_tresci/ai/`, opis w `_tresci/ai/INDEX.md`) są poglądowe – nie pokazują realizacji Inter Windows ani ich monterów. Alty opisują tylko scenę. W stopce jest zdanie „część ilustracji ma charakter poglądowy”. **Nigdy na `/realizacje/` i w kartach ekipy.**

| Plik (`public/img/ai/`) | Gdzie użyty | Na co podmienić |
|---|---|---|
| `ai-montaz-ekipa-dojazd` | strona główna, tło sekcji „Własne ekipy montażowe” (pod ciemną nakładką) | prawdziwe zdjęcie ekipy/auta przed domem klienta |
| `ai-montaz-osadzanie` | strona główna, sekcja „Własne ekipy montażowe” (duże zdjęcie) | zdjęcie montażystów przy osadzaniu okna |
| `ai-montaz-pomiar` | strona główna, krok 01 „Pomiar u Ciebie” | zdjęcie z pomiaru |
| `ai-montaz-tasma` | strona główna, krok 03 „Montaż naszą ekipą” | detal uszczelniania z montażu |
| `ai-montaz-odbior` | strona główna, krok 04 „Odbiór z protokołem” | zdjęcie z odbioru / czystego wnętrza po montażu |
| `ai-montaz-poziomowanie` | strona główna, krok 05 „Gwarancja na montaż” | detal poziomowania/kotwienia z montażu |
| `ai-konfigurator-profil-probki` | strona główna: slajd 4 w hero i zapowiedź konfiguratora; `/okna-pcv/` sekcja „Kolory i okleiny” | zdjęcie próbnika kolorów / narożnika profilu z biura |
| `ai-przeszklenia-salon` | `/okna-aluminiowe/` hero; `/okna/` sekcja „Okna aluminiowe” | wykończona realizacja z dużym przeszkleniem |
| `ai-hst-taras` | `/drzwi-tarasowe/` hero | realizacja drzwi HST / przesuwnych |
| `ai-okna-drewniane-willa` | `/okna-drewniane/` hero | realizacja okien drewnianych |
| `ai-rolety-zewnetrzne` | `/rolety-zewnetrzne/` hero | realizacja rolet |
| `ai-zaluzje-fasadowe` | `/zaluzje-fasadowe/` hero | realizacja żaluzji fasadowych |
| `ai-drzwi-wewnetrzne-bezprzylgowe` | `/drzwi-wewnetrzne/` sekcja „Drzwi bezprzylgowe i ukryte” | realizacja drzwi bezprzylgowych (jeśli są w ofercie) |
| `ai-poradnik-okno-zima`, `ai-poradnik-salon-probki`, `ai-poradnik-dom-zmierzch` | przygotowane dla poradnika (inny agent) | – |

## 8. Zdjęcia realizacji (`public/img/realizacje/`)

- [ ] Dla każdego zdjęcia z `src/data/realizacje-zdjecia.ts`: miejscowość (lub osiedle), zakres prac, system/materiał, rok. Dziś opisy mówią tylko, co widać. Bez tego zdjęcia nie mogą trafić do podstron `/realizacje/{slug}/` z nazwą miejscowości.
- [ ] Materiał okien na zdjęciach użytych w hero kategorii: `okno-trojdzielne-zloty-dab-elewacja-01` (`/okna-pcv/` – czy to PCV?), `przeszklenie-szczytowe-zloty-dab-01` (`/okna/`), `drzwi-zewnetrzne-orzech-wejscie-wykonczone`, `drzwi-wewnetrzne-dab-korytarz`, `bramy-segmentowe-antracyt-elewacja-terakota-01`.
- [ ] Zielone łukowe drzwi w kamienicy (slajd 5 w hero) – potwierdzić, że to wasza realizacja i czy można podać miejscowość.
- [ ] Obróbka najlepszych zdjęć (prostowanie perspektywy, kadr, kolor) albo sesja profesjonalna.

## 9. Formularz, prawo, technika

- [ ] Hosting: PHP z funkcją `mail()` i skrzynka `formularz@interwindows.pl` (nadawca wiadomości; zmniejsza ryzyko spamu) – plik `public/kontakt.php`.
- [ ] Polityka prywatności (`/polityka-prywatnosci/`): akceptacja treści, w tym **okresu przechowywania danych z zapytań (wpisano 12 miesięcy)** i nazwy firmy hostingowej. Po dodaniu GA4/Consent Mode – aktualizacja polityki i baner cookies.
- [ ] Przed startem: `.htaccess` produkcyjny (www + https), test przekierowań z SEO §5.1, GSC i Bing Webmaster Tools (SEO §5.10).
- [ ] Lista realizacji z 2–3 lat z miejscowościami i zgodami (min. 6 na start) – dla `/realizacje/` i stron miejscowości (SEO §7 pkt 6).
- [ ] Maksymalny zasięg, dopłaty za dojazd, typowy termin pomiaru – dla `/obszar-dzialania/` (SEO §7 pkt 7).

---

<!-- Kolejne sekcje dopisują inne części projektu (montaż, realizacje, obszar działania, poradnik, konfigurator). -->

## Montaż okien (`/montaz-okien/`, `/wymiana-okien/`, `/cieply-montaz-okien/`)

_(do uzupełnienia przez autora tych stron)_

## Realizacje (`/realizacje/`)

_(do uzupełnienia)_

## Obszar działania (`/obszar-dzialania/`)

_(do uzupełnienia)_

## Poradnik (`/poradnik/`)

_(do uzupełnienia)_

## Konfigurator (`/konfigurator/`)

_(do uzupełnienia)_
