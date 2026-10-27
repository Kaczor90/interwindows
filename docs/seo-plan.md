# Plan SEO lokalnego – Inter Windows (Płock)

Wersja 1.0 · 27.10.2026 · dotyczy nowej strony statycznej (Astro, `trailingSlash: 'always'`, adresy katalogowe `/okna/`) budowanej na bazie projektu Profil.

---

## 0. Najważniejsze decyzje w skrócie

| Decyzja | Uzasadnienie |
|---|---|
| **Nie tworzymy `/okna-plock/` ani innych duplikatów „produkt + Płock".** Płock jest wpisany w title/H1/treść stron kategorii i usług. | Firma ma siedzibę w Płocku, więc intencję „okna Płock" obsługują wizytówka Google (local pack), strona główna i strona kategorii. Osobna strona `/okna-plock/` obok `/okna/` celowałaby w tę samą intencję. Skutek: kanibalizacja i rozproszenie linków. Takich stron potrzebują firmy spoza miasta (np. Darte-montaż z Gostynina) i sieci franczyzowe, nam nie są potrzebne. |
| **Jeden hub `/obszar-dzialania/` (P1) i strony miejscowości tylko tam, gdzie jest własny popyt i prawdziwe realizacje:** Gostynin (P1*, warunkowo), Sierpc (P2), Gąbin ze Słubicami (P2). | Podmiejskie gminy (Stara Biała, Słupno, Radzanowo, Łąck, Bielsk) nie mają własnych zapytań: mieszkańcy wpisują „okna Płock". Strony dla nich byłyby doorway pages. Obsługuje je hub i realizacje z nazwą miejscowości. |
| **Realizacje jako osobne podstrony z nazwą miejscowości** (`/realizacje/okna-aluminiowe-stara-biala/`). | To jedyne naturalne i unikalne źródło treści lokalnych. Stąd biorą się long-taile („okna aluminiowe Stara Biała") i materiał na strony miejscowości. |
| **Wyróżnik „własne ekipy, nigdy podwykonawcy" musi mieć dowody na stronie.** | Bezpośredni konkurent, Płocka Fabryka Okien (ul. Maszewska 15), deklaruje dokładnie to samo („Własny montaż — bez podwykonawców"). Wygrywa ten, kto pokaże ludzi z imienia, ich staż, protokół odbioru, gwarancję na montaż i przegląd po pierwszej zimie. |
| **Kanoniczny host: `https://www.interwindows.pl`.** | Dziś działa i `www`, i wersja bez `www` (oba zwracają 200, czyli duplikat). Google ma w indeksie wersję `www`. |
| **Nazwa w NAP: „Inter Windows"** (prawnie: Inter Windows Bartosz Bezdziek, Paweł Majchrzak spółka cywilna). | Musi się zgadzać z wizytówką Google i rejestrami. Logo może mieć zapis „InterWindows", ale tekstowy NAP, schema i katalogi mają mieć jedną formę. **Do potwierdzenia z zespołem i klientem.** |

---

## 1. Punkt wyjścia

### 1.1 Obecna strona interwindows.pl (stan na 27.10.2026)

| Element | Stan | Wniosek |
|---|---|---|
| Struktura | One-page (`/` i `/index.html`), sekcje na kotwicach `#about`, `#services`, `#projects`, `#testimonials`, `#contact` | Brak podstron, więc nie ma czego pozycjonować poza stroną główną. Każda nowa podstrona to czysty zysk. |
| Title | „Okna, Drzwi, Rolety Płock – Sprzedaż i Montaż \| Inter Windows s.c." | Google kojarzy już markę z Płockiem. |
| Meta description | wymienia Płock, Gostynin, Słubice, Gąbin | Te miejscowości mają też opinie na stronie. To potwierdza wybór stron lokalnych. |
| Host | `http://` → 301 → `https://`, ale `https://interwindows.pl/` i `https://www.interwindows.pl/` oba zwracają 200 | Duplikat. Naprawić w `.htaccess` (sekcja 5.1). |
| `/index.html` | 200 (duplikat `/`) | 301 do `/`. |
| Formularz | POST do `assets/phpscripts/contact.php` | Stary endpoint przekierować (5.1). |
| robots.txt, sitemap.xml | brak (404) | Dodać. |
| Schema, canonical | brak (jest tylko og:title, og:image) | Dodać. |
| Dane kontaktowe | adres/telefony częściowo jako obrazek (`namiary.png`), e-mail jako „biuro(małpa)interwindows.pl" | NAP musi być tekstem i linkiem `tel:` / `mailto:`. |
| Serwer | LiteSpeed (obsługuje `.htaccess` jak Apache) | Reguły z projektu Profil zadziałają. |
| Historia | brak w Wayback Machine, brak starszych adresów | Lista przekierowań jest krótka (5.1). |

### 1.2 Faktyczna oferta (podstawa architektury)

| Grupa | Co sprzedają / montują | Uwagi dla SEO |
|---|---|---|
| Okna PCV | DAKO DPQ-82 na profilu Veka Softline 82 MD klasy A. Także Sonarol, All Windows Group | „Veka Softline 82 MD opinie" i „DAKO DPQ-82 opinie" mają własny popyt, więc warto zrobić stronę produktu (P2). |
| Okna aluminiowe | systemy Aluprof (w ofercie DAKO: DA-77, DA-70N; **potwierdzić**) | Segment premium: duże przeszklenia, narożniki. |
| Okna drewniane | DAKO (DDF-68, DDR-68, DDA-78 drewno-alu) | Kamienice i Stare Miasto w Płocku jako unikalny wątek lokalny. |
| Drzwi tarasowe | w ofercie DAKO: HST, SmartMove (uchylno-przesuwne), DA-SkyLine, harmonijkowe | **Potwierdzić**, czy Inter Windows je sprzedaje i montuje (obecna strona o nich milczy). |
| Drzwi zewnętrzne | Wikęd, Erkado, Doorsystem, Barański, Gerda, Dallas (+ aluminiowe DAKO) | |
| Drzwi wewnętrzne | DRE, Porta, Erkado, Lagrus, Pol-Skone, Barański, Dallas | Niższa marża, ale realny popyt lokalny („z montażem", „na wymiar"). |
| Rolety zewnętrzne, żaluzje fasadowe | DAKO; Fart Produkt, Fill, Medos, Romex | Żaluzje fasadowe pasują do segmentu premium. |
| Bramy garażowe | DAKO (segmentowe Thermo 60 / Standard 40, rolowane) | |
| Moskitiery, rolety wewnętrzne, pergole, parapety | wymienione na stronie, bez szczegółów | Strony P2 po doprecyzowaniu oferty. |
| Usługi | bezpłatny pomiar i wycena, doradztwo, „mistrzowski montaż" | Ciepły montaż nie jest dziś nigdzie wymieniony. **Potwierdzić technologię.** |
| Liczby | 20 lat doświadczenia, 650+ projektów, 500+ klientów, autoryzowany partner DAKO | Użyć w treści i w opisie wizytówki. |

### 1.3 Konkurencja i to, co dziś rankuje

Obserwacje z wyszukiwarki i podpowiedzi Google (bez geolokalizacji z Płocka, więc po starcie trzeba je zweryfikować w Google Search Console i ręcznie, w trybie incognito, z lokalizacją Płock).

| Gracz | Typ | Co rankuje / co widać | Słabość, którą wykorzystujemy |
|---|---|---|---|
| oferteo.pl, kb.pl, cenauslug.pl, krs-online.com.pl | agregatory i cenniki | Dominują w wynikach organicznych dla „okna PCV Płock", „wymiana okien Płock", „bramy garażowe Płock", „drzwi zewnętrzne Płock" (strony typu `/okna-pcv/plock`, `/cenniki/miejskie/montaz-okien/plock/`) | Lokalne firmy prawie nie mają dobrych podstron, więc próg wejścia jest niski. Agregaty wygrywają tylko z braku konkurencji. Profil na Oferteo daje dodatkową widoczność. |
| Płocka Fabryka Okien (plockafabrykaokien.pl) | producent z Płocka (Decco/Procural) | One-page, brak podstron i poradnika. Deklaruje własny montaż bez podwykonawców, salon, wycenę w 24 h, ocenę 5.0 w Google | Ten sam wyróżnik. My mamy podstrony, realizacje z miejscowościami, poradnik i dowody (ludzie, protokół, gwarancja). |
| RMP (rmpskepe.com.pl/okna-plock/) | lokalna landing page | Szablon z „Płock" w każdym nagłówku, ok. 600–700 słów, bez unikalnych treści | Pokazuje, że nawet słaba strona `/okna-plock/` jest widoczna. Nasze kategorie będą mocniejsze. |
| Darte-montaż (Gostynin) | firma z Gostynina | Strony miast: Okna/Drzwi/Rolety/Bramy × Płock/Kutno | Szablony z podmienianym miastem. Dla Gostynina to lokalny konkurent. |
| BNO System, Enter House, Via Decora, Majster, Radex, DREAMS, KIM okna, MS okna, Gaja (okna, drzwi, parapety) | lokalne firmy z Płocka | Część pojawia się w podpowiedziach Google („kim okna płock", „gaja okna płock", „ms okna plock"). To sygnał zapytań brandowych i silnych wizytówek. | Nazwy z podpowiedzi są niezweryfikowane. Przeanalizować ich wizytówki (kategorie, liczba opinii). |
| serwis-okna.pl, abakus-okna.com.pl | sieci / producenci | Programowe strony miast (`/okna/plock/`, `/siec-sprzedazy/okna-plock/`) | Słabe sygnały lokalne (brak adresu w Płocku). |

**Ważna obserwacja:** podpowiedzi „okna płock cennik", „okna płock najwyżej oceniane", „okna płock producent" i „okna płock i okolice" mówią, czego szuka klient: ceny, opinii i lokalności. Strony muszą odpowiadać na pytanie o cenę (widełki), pokazywać opinie i realizacje z okolicy. Nie podajemy się za producenta, bo nim nie jesteśmy. Jesteśmy autoryzowanym partnerem DAKO.

---

## 2. Badanie słów kluczowych

### 2.1 Metoda i skala

- Źródła: Google Autocomplete (`hl=pl`, 100+ zapytań bazowych), analiza wyników i stron konkurencji, wielkość rynku. Płock ma ponad 110 tys. mieszkańców, a z powiatami płockim, gostynińskim i sierpeckim region liczy ok. 300 tys. osób (szacunek).
- **Popyt to szacunek jakościowy, a nie dane z narzędzi płatnych.** Skala dla fraz lokalnych: **wysoki** ≈ 300+ wyszukań/mies., **średni** ≈ 50–300, **niski** ≈ 10–50, **b. niski** < 10. Frazy ogólnopolskie oznaczone „(PL)" mają skalę krajową.
- Po starcie zweryfikować w Google Search Console (wyświetlenia) i ewentualnie w Planerze słów kluczowych Google Ads (wystarczy konto z minimalną kampanią).

### 2.2 Frazy komercyjne – Płock

| Fraza (i warianty z podpowiedzi) | Intencja | Popyt (szac.) | Docelowy URL | Uwagi |
|---|---|---|---|---|
| okna Płock (okna płock cennik, okna płock i okolice, okna płock najwyżej oceniane) | transakcyjna, lokalna | wysoki | `/` (główna) + wsparcie `/okna/` | Najważniejsza fraza. Local pack decyduje o połowie ruchu, więc wizytówka Google jest tu kluczowa. |
| okna i drzwi Płock | transakcyjna | średni | `/` | |
| okna na wymiar Płock, okna Płock cennik | transakcyjna, cenowa | średni | `/okna/` | Sekcja z widełkami cen i link do konfiguratora. |
| okna PCV Płock (okna plastikowe Płock, okna pcv w płocku, okna pcv płock cennik) | transakcyjna | średni | `/okna-pcv/` | |
| okna aluminiowe Płock (płock aluminium) | transakcyjna | niski–średni | `/okna-aluminiowe/` | Segment premium, wysoka wartość leada. |
| okna drewniane Płock | transakcyjna | niski | `/okna-drewniane/` | |
| montaż okien Płock (montaz okien plock) | usługowa | średni | `/montaz-okien/` | Strona wyróżnika (własne ekipy). |
| wymiana okien Płock (wymiana okien cena Płock) | usługowa, cenowa | średni | `/wymiana-okien/` | Dziś rankują tu cenniki kb.pl. |
| ciepły montaż okien Płock | usługowa | niski | `/cieply-montaz-okien/` | Mało wyszukań, ale świadomy i zamożny klient. |
| drzwi zewnętrzne Płock (drzwi zewnętrzne z montażem płock) | transakcyjna | średni | `/drzwi-zewnetrzne/` | „Drzwi Płock" bez dopisku pomijamy: dominują Drzwi Płockie (zabytek katedry). |
| drzwi wejściowe Płock (do domu, do mieszkania) | transakcyjna | niski–średni | `/drzwi-zewnetrzne/` | H2 „Drzwi do mieszkania w bloku". |
| drzwi tarasowe Płock, drzwi balkonowe Płock | transakcyjna | niski | `/drzwi-tarasowe/` | |
| drzwi przesuwne HST/HS Płock | transakcyjna | niski | `/drzwi-tarasowe/` (P2: `/drzwi-tarasowe/hst/`) | |
| drzwi wewnętrzne Płock (z montażem, na wymiar, z ościeżnicą) | transakcyjna | średni | `/drzwi-wewnetrzne/` | |
| rolety zewnętrzne Płock (rolety antywłamaniowe płock, naprawa) | transakcyjna | średni | `/rolety-zewnetrzne/` | „Rolety Płock" ma mieszaną intencję (sklepy z roletami wewnętrznymi). |
| żaluzje fasadowe Płock, żaluzje zewnętrzne Płock | transakcyjna | niski | `/zaluzje-fasadowe/` | Wysoka wartość, słaba konkurencja. |
| bramy garażowe Płock (i okolice, segmentowe) | transakcyjna | średni | `/bramy-garazowe/` | W podpowiedziach są marki Wiśniowski i Hörmann, ich nie celujemy. |
| moskitiery Płock (na wymiar, cennik) | transakcyjna, sezonowa | niski–średni | sekcja na `/rolety-zewnetrzne/`, P2 `/moskitiery/` | Niska wartość, ale łatwa. |
| parapety Płock (wewnętrzne, zewnętrzne, konglomerat) | transakcyjna | niski–średni | P2 `/parapety/` | |
| pergole Płock (tarasowe, bioklimatyczne) | transakcyjna, sezonowa | niski | P2 `/pergole/` | Pergola bioklimatyczna to produkt premium. |
| serwis / regulacja / naprawa okien Płock | usługowa | niski | P2 `/serwis-okien/` | Tylko jeśli serwisują okna innych firm. |
| salon okien Płock, okna premium Płock, okna DAKO Płock | nawigacyjna, wizerunkowa | b. niski | `/`, `/kontakt/`, `/o-firmie/` | Frazy wizerunkowe, nie ruchowe. „Premium" ma wynikać z treści, nie z upychania słowa. |
| Inter Windows Płock | brandowa | niski | `/` | „inter windows" bez „Płock" zaśmiecają wyniki o Microsoft Windows i foncie Inter, więc „Płock" musi być w title strony głównej. |

### 2.3 Frazy lokalne – miejscowości wokół Płocka

Odległości drogowe od ul. Przemysłowej 22 (OSRM/OpenStreetMap, zaokrąglone, do weryfikacji). „Własny popyt" ocenia się po tym, czy Google podpowiada warianty „okna {miejscowość}".

| Miejscowość (gmina / powiat) | Dojazd | Własny popyt „okna …" | Dowody (opinie, meta) | Decyzja |
|---|---|---|---|---|
| Stara Biała (pow. płocki) | 10 km / 15 min | brak podpowiedzi | – | hub + realizacje |
| Słupno (pow. płocki) | 14 km / 19 min | b. niski | – | hub + realizacje |
| Radzanowo (pow. płocki) | 16 km / 21 min | brak | – | hub + realizacje |
| Bielsk (pow. płocki) | 17 km / 19 min | myli się z Bielskiem Podlaskim i Bielsko-Białą | – | hub + realizacje |
| Łąck (pow. płocki) | 19 km / 19 min | brak | – | hub + realizacje |
| Brudzeń Duży (pow. płocki) | 21 km / 26 min | brak | – | hub + realizacje |
| Nowy Duninów (pow. płocki) | 22 km / 30 min | brak | – | hub + realizacje |
| Staroźreby (pow. płocki) | 23 km / 26 min | brak | – | hub + realizacje |
| **Gąbin** (pow. płocki) | 23 km / 27 min | b. niski („okna drzwi gąbin", „okna plastikowe gąbin") | 2 opinie na obecnej stronie, wpis w meta | **P2: strona Gąbin + gm. Słubice** (gdy spełni warunki z 3.3) |
| Bodzanów (pow. płocki) | 28 km / 39 min | brak | – | hub |
| **Gostynin** (pow. gostyniński) | 31 km / 32 min | niski–średni (wiele podpowiedzi: okna PCV, aluminiowe, drzwi, rolety, bramy) | opinia na stronie, wpis w meta | **P1\*: strona Gostynin** (warunkowo) |
| Drobin (pow. płocki) | 32 km / 33 min | b. niski | – | hub |
| Słubice (pow. płocki) | 33 km / 36 min | b. niski | opinia na stronie, wpis w meta | na stronie Gąbinia |
| **Sierpc** (pow. sierpecki) | 37 km / 43 min | niski–średni (bardzo dużo podpowiedzi: okna, drzwi, rolety, bramy) | brak | **P2: strona Sierpc** (po zebraniu realizacji) |
| Wyszogród (pow. płocki) | 41 km / 42 min | b. niski | – | hub |
| Raciąż (pow. płoński) | 43 km / 45 min | b. niski | – | hub |
| Płońsk | 51 km / 58 min | średni, ale osobny rynek z własnymi firmami | brak | nie teraz (ewentualnie P2, jeśli pojawią się realizacje) |
| Włocławek, Kutno, Lipno, Sochaczew | 52–65 km / ok. 1 h | wysoki (Włocławek), ale inne rynki, inne województwa i silna lokalna konkurencja | brak | **nie celujemy** |

Dzielnice i osiedla Płocka (Podolszyce, Winiary, Radziwie, Borowiczki, Imielnica, Ciechomice, Trzepowo, Stare Miasto itd.) nie dostają osobnych stron. Mogą pojawiać się w realizacjach („Wymiana okien – dom na Ciechomicach").

### 2.4 Frazy informacyjne (poradnik i sekcje FAQ)

| Fraza / klaster | Popyt (szac.) | Docelowy URL |
|---|---|---|
| ile kosztuje wymiana okien (w domu, w bloku, na 3-szybowe), wymiana okien cena 2026, cena robocizny | wysoki (PL) | `/poradnik/ile-kosztuje-wymiana-okien/` |
| ciepły montaż okien (na czym polega, czy warto, cena za mb, wady i zalety, w starym domu) | wysoki (PL) | `/cieply-montaz-okien/` (strona usługowa obsługuje też „na czym polega"; osobnego artykułu nie robimy, żeby uniknąć kanibalizacji) |
| montaż okien w warstwie ocieplenia (czy warto, cena) | średni (PL) | `/poradnik/montaz-okien-w-warstwie-ocieplenia/` |
| okna aluminiowe czy PCV (która cieplejsze, różnica w cenie), okna drewniane czy PCV | średni (PL) | `/poradnik/okna-aluminiowe-czy-pcv/` |
| HST czy PSK, okna HS co to, drzwi HST cena | średni (PL) | `/poradnik/drzwi-tarasowe-hst-czy-psk/` |
| żaluzje fasadowe czy rolety zewnętrzne (co tańsze, opinie), rolety podtynkowe czy nadstawne | średni (PL) | `/poradnik/zaluzje-fasadowe-czy-rolety-zewnetrzne/` |
| okna do domu pasywnego (jakie, cena), okna energooszczędne (współczynnik U) | średni (PL) | `/poradnik/okna-do-domu-pasywnego/` |
| dotacja na wymianę okien 2026, Czyste Powietrze okna (wymagania), ulga termomodernizacyjna okna | wysoki (PL), sezonowy | `/poradnik/dofinansowanie-wymiany-okien/` (aktualizacja co roku) |
| jakie drzwi zewnętrzne do domu (drewniane czy metalowe, od strony południowej) | średni (PL) | `/poradnik/jakie-drzwi-zewnetrzne-wybrac/` |
| jaka brama garażowa (najcieplejsza, segmentowa czy uchylna, na dwa samochody) | średni (PL) | `/poradnik/jaka-brama-garazowa-wybrac/` |
| kiedy wymieniać okna, montaż okien zimą | niski–średni (PL) | `/poradnik/kiedy-wymieniac-okna/` |
| okna antywłamaniowe RC2 (czy warto, cena) | średni (PL) | `/poradnik/okna-antywlamaniowe-rc2/` |
| wymiana okien w kamienicy, okna w strefie konserwatorskiej | niski, ale lokalnie unikalny | `/poradnik/wymiana-okien-w-kamienicy-plock/` |
| okna Veka Softline 82 MD opinie, DAKO DPQ-82 opinie | niski–średni (PL) | P2 `/okna-pcv/dako-dpq-82/` |
| konfigurator okien, wycena okien online | średni (PL) | `/konfigurator/` |

### 2.5 Frazy, których świadomie nie celujemy

„drzwi Płock" bez dopisku (Drzwi Płockie), „okna Płock producent" (nie jesteśmy producentem), „okna dachowe Płock" (brak w ofercie; **potwierdzić**), marki bram (Wiśniowski, Hörmann), „okna używane / OLX / tanie okna Płock" (sprzeczne z pozycjonowaniem premium), Włocławek, Kutno i Płońsk (na start).

---

## 3. Architektura serwisu

### 3.1 Mapa URL

Legenda: **P1** = na start, **P1\*** = na start pod warunkiem (opis w kolumnie), **P2** = później. Wszystkie slugi w ASCII, z końcowym ukośnikiem.

| URL | Priorytet | Typ / szablon | Źródło danych | Rola |
|---|---|---|---|---|
| `/` | P1 | `index.astro` | `site.ts`, `oferta.ts`, `realizacje.ts` | „okna (i drzwi) Płock", marka, wejście z wizytówki Google |
| `/okna/` | P1 | kategoria-hub | `oferta.ts` | rodzaje okien, ceny, wybór materiału |
| `/okna-pcv/` | P1 | kategoria (`parent: okna`) | `oferta.ts` | okna PCV Płock |
| `/okna-aluminiowe/` | P1 | kategoria (`parent: okna`) | `oferta.ts` | okna aluminiowe Płock, premium |
| `/okna-drewniane/` | P1 | kategoria (`parent: okna`) | `oferta.ts` | drewno i drewno-alu |
| `/drzwi-tarasowe/` | P1 | kategoria | `oferta.ts` | HST, przesuwne, SkyLine (**potwierdzić ofertę**) |
| `/drzwi-zewnetrzne/` | P1 | kategoria | `oferta.ts` | drzwi wejściowe |
| `/drzwi-wewnetrzne/` | P1 | kategoria | `oferta.ts` | drzwi wewnętrzne z montażem |
| `/rolety-zewnetrzne/` | P1 | kategoria | `oferta.ts` | rolety + sekcja moskitier |
| `/zaluzje-fasadowe/` | P1 | kategoria | `oferta.ts` | żaluzje fasadowe |
| `/bramy-garazowe/` | P1 | kategoria | `oferta.ts` | bramy |
| `/montaz-okien/` | P1 | usługa (własny plik `.astro`) | treść ręczna + `site.ts` (ekipy) | **strona wyróżnika**: własne ekipy |
| `/wymiana-okien/` | P1 | usługa | treść ręczna | wymiana w domu i mieszkaniu |
| `/cieply-montaz-okien/` | P1\* | usługa | treść ręczna | warunek: ekipy faktycznie robią montaż warstwowy. Jeśli nie, treść trafia do `/montaz-okien/`, a strony nie publikujemy. |
| `/obszar-dzialania/` | P1 | hub lokalny | `lokalizacje.ts`, `realizacje.ts` | gminy, czasy dojazdu, realizacje według miejscowości |
| `/obszar-dzialania/gostynin/` | P1\* | strona miejscowości | `lokalizacje.ts` | warunek: co najmniej 3 realizacje ze zdjęciami i 1 opinia z regionu przed startem. Inaczej P2. |
| `/obszar-dzialania/sierpc/` | P2 | strona miejscowości | `lokalizacje.ts` | gdy spełni warunki |
| `/obszar-dzialania/gabin/` | P2 | strona miejscowości (Gąbin + gm. Słubice) | `lokalizacje.ts` | gdy spełni warunki |
| `/realizacje/` | P1 | lista z filtrem po stronie klienta (bez indeksowanych URL-i filtrów) | `realizacje.ts` | dowód społeczny |
| `/realizacje/{slug}/` | P1 (min. 6 na start, docelowo 2–4 nowe miesięcznie) | szablon realizacji | `realizacje.ts` | long-tail „{produkt} {miejscowość}" |
| `/poradnik/` | P1 | lista artykułów | kolekcja `poradnik` | hub wiedzy |
| `/poradnik/{slug}/` | P1: 4 artykuły, P2: 8 kolejnych | artykuł | `src/content/poradnik/*.md` | frazy informacyjne, linki do stron sprzedażowych |
| `/o-firmie/` | P1 | statyczna | `site.ts` | historia, właściciele, **ekipy** (`#ekipy`), opinie (`#opinie`) |
| `/kontakt/` | P1 | statyczna + formularz PHP | `site.ts` | NAP, doradcy, formularz pomiaru |
| `/konfigurator/` | P1 | wyspa JS + statyczny tekst SEO | – | wstępna wycena |
| `/polityka-prywatnosci/` | P1 | statyczna | – | indeksowana, poza głównym linkowaniem |
| `/dziekujemy/` | P1 (jeśli formularz przekierowuje) | statyczna, **noindex** | – | pomiar konwersji |
| `/parapety/`, `/pergole/`, `/moskitiery/` | P2 | kategoria | `oferta.ts` | po doprecyzowaniu oferty |
| `/serwis-okien/` | P2 | usługa | – | tylko jeśli serwisują okna innych firm |
| `/okna-pcv/dako-dpq-82/` | P2 | produkt | `oferta.ts` (produkty) | „DPQ-82 / Veka Softline 82 MD opinie" |
| `/drzwi-tarasowe/hst/` | P2 | produkt | `oferta.ts` | „drzwi HST cena, wymiary" |

**Nie tworzymy:** `/okna-plock/`, `/drzwi-plock/` itp. (duplikaty), stron dla gmin bez popytu i realizacji, stron dzielnic Płocka, `/oferta/` jako pustego huba (strona główna pełni tę rolę; okruszki „Oferta" mogą linkować do `/#oferta`, jak w Profilu, ale w BreadcrumbList pomijamy ten poziom), indeksowanych stron filtrów realizacji ani stanów konfiguratora.

### 3.2 Dlaczego Płock w kategoriach, a nie `/okna-plock/`

1. **Jedna intencja, jeden URL.** „Okna PCV Płock" i „okna PCV" dla użytkownika z Płocka to dla Google prawie ta sama intencja. Wyniki i tak są lokalizowane. Dwie strony konkurowałyby ze sobą.
2. **Sygnały lokalne płyną z wizytówki i NAP, nie z adresu URL.** Adres w Płocku, schema z `geo`/`areaServed`, opinie z nazwami miejscowości i realizacje z Płocka dają więcej niż słowo w slugu.
3. **Kategorie mają lokalną treść, a nie tylko słowo „Płock":** blok „Realizacje w Płocku i okolicach" (3 karty z `realizacje.ts` filtrowane po produkcie), ceny z lokalnych realizacji, a w drewnianych także Stare Miasto i konserwator.
4. **Zgodność z architekturą Profil:** `[slug].astro` generuje kategorie z `oferta.ts`. Wystarczy rozszerzyć dane o pola SEO.

### 3.3 Strony miejscowości – kryteria i szablon (ochrona przed doorway pages)

**Warunki publikacji** (flaga `published` w `lokalizacje.ts`; sitemap i linki tylko dla opublikowanych):

| Warunek | Minimum |
|---|---|
| Realizacje z tej miejscowości lub gminy (osobne wpisy w `realizacje.ts` ze zdjęciami) | 3 |
| Prawdziwa opinia klienta z regionu (Google lub pisemna zgoda) | 1 |
| Unikalny tekst (nie podmiana nazwy miasta) | ≥ 60% treści różnej od pozostałych stron miejscowości; ≥ 500 słów |
| Fakty lokalne sprawdzone przez człowieka | dystans i czas dojazdu, gminy obsługiwane z tej strony, lokalne uwarunkowania |
| Własny popyt na frazy „okna/drzwi/rolety {miejscowość}" | widoczne podpowiedzi lub wyświetlenia w GSC |

**Szablon strony miejscowości** (`src/pages/obszar-dzialania/[slug].astro`):

| Blok | Treść | Skąd unikalność | Wymagany |
|---|---|---|---|
| H1 + lead | „Okna i drzwi z montażem – Gostynin i okolice". 2–3 zdania o tym, co robimy w regionie. | ręcznie pisany lead | tak |
| Dojazd i terminy | dystans i czas z ul. Przemysłowej, termin pomiaru („zwykle w ciągu X dni roboczych"), czy dojazd jest bezpłatny | dane z `lokalizacje.ts` | tak |
| Realizacje w okolicy | min. 3 karty (zdjęcie, miejscowość, produkt, link) | `realizacje.ts` filtrowane po `gmina`/`powiat` | tak |
| Głos sąsiada | 1–3 opinie z miejscowości (imię, miejscowość, źródło) | prawdziwe opinie | tak |
| Lokalny kontekst budowlany | np. Gostynin: stare budownictwo do termomodernizacji, nowe domy na obrzeżach, kamienice w centrum. Sierpc: domy z lat 70–90. Gąbin i Słubice: budynki w pobliżu Wisły, dużo modernizacji. **Pisze osoba znająca teren.** | wiedza ekip i doradców | tak |
| Dofinansowanie w gminie | gdzie działa punkt konsultacyjny programu Czyste Powietrze, programy gminne (sprawdzić przed publikacją, z datą aktualizacji) | dane gminne | zalecany |
| Gminy i miejscowości obsługiwane z tej strony | np. Gostynin: gm. Gostynin, Pacyna, Sanniki, Szczawin Kościelny (naturalnie w zdaniu, bez listy słów kluczowych) | `lokalizacje.ts` | tak |
| Opiekun regionu | imię, zdjęcie i telefon doradcy obsługującego region (np. Kacper Dylewski) | `site.ts` | zalecany |
| Mini-FAQ (2–4) | pytania z tej okolicy („Czy przyjedziecie na pomiar do Sannik?", „Ile trwa montaż w domu za miastem?") | z rozmów z klientami | zalecany |
| Mapa | statyczna mapa trasy z Płocka (obrazek + link do Map Google, bez iframe) | generowana raz | zalecany |
| Linki | do kategorii użytych w realizacjach z regionu, do `/montaz-okien/` i `/obszar-dzialania/` | | tak |
| CTA | „Zadzwoń do opiekuna regionu" + formularz z preselekcją miejscowości | | tak |

**Hub `/obszar-dzialania/`** zawiera tabelę gmin z sekcji 2.3 (miejscowość, dojazd, liczba realizacji, link do realizacji lub do strony miejscowości, jeśli istnieje), statyczną mapę zasięgu (ok. 45 km / 45 min) i opis pracy poza Płockiem. W stopce każdej strony jest tylko link do huba, a nie lista miejscowości.

### 3.4 Realizacje

- Slug: `{glowny-produkt}-{miejscowosc}[-{wyroznik}]`, np. `/realizacje/okna-aluminiowe-stara-biala/`, `/realizacje/drzwi-hst-gostynin/`, `/realizacje/wymiana-okien-plock-podolszyce/`.
- Model danych (`realizacje.ts`): `slug, title, town, gmina, powiat, locationSlug?, products: string[]` (slugi kategorii), `systems, buildingType, year, scope, challenge, solution, crew` (imiona monterów, za zgodą), `durationDays, photos: {src, alt}[], review?: {author, text, source}, published`.
- **Prywatność:** tylko miejscowość lub osiedle, nigdy dokładny adres ani numer domu. Pisemna zgoda klienta na zdjęcia (punkt w protokole odbioru, sekcja 6.3).
- Każda realizacja linkuje do kategorii użytych produktów i do strony miejscowości (albo huba). Kategorie i strony miejscowości pokazują 3 powiązane realizacje.

### 3.5 Poradnik – 12 tematów

| # | Slug | Temat | Priorytet |
|---|---|---|---|
| 1 | `ile-kosztuje-wymiana-okien` | Ile kosztuje wymiana okien w 2026 roku, z widełkami z realizacji w Płocku | P1 |
| 2 | `okna-aluminiowe-czy-pcv` | Aluminium czy PCV: porównanie od praktyków | P1 |
| 3 | `drzwi-tarasowe-hst-czy-psk` | HST, PSK, SkyLine czy harmonijkowe | P1 |
| 4 | `zaluzje-fasadowe-czy-rolety-zewnetrzne` | Żaluzje fasadowe czy rolety | P1 |
| 5 | `okna-do-domu-pasywnego` | Parametry okien do domu pasywnego i energooszczędnego | P2 |
| 6 | `dofinansowanie-wymiany-okien` | Czyste Powietrze, ulga termomodernizacyjna, programy lokalne (aktualizacja co roku) | P2 |
| 7 | `montaz-okien-w-warstwie-ocieplenia` | Montaż na konsolach: kiedy ma sens | P2 |
| 8 | `jakie-drzwi-zewnetrzne-wybrac` | Dobór drzwi wejściowych | P2 |
| 9 | `jaka-brama-garazowa-wybrac` | Segmentowa, rolowana czy uchylna; ciepła brama | P2 |
| 10 | `kiedy-wymieniac-okna` | Sygnały zużycia, sezon, montaż zimą | P2 |
| 11 | `okna-antywlamaniowe-rc2` | RC2, P4, okucia, co realnie chroni | P2 |
| 12 | `wymiana-okien-w-kamienicy-plock` | Kamienice i strefa ochrony konserwatorskiej w Płocku (wymagania zweryfikować u Miejskiego Konserwatora Zabytków) | P2 |

Zasady: autor z imienia i nazwiska (np. Paweł Majchrzak, 20 lat w branży) z krótkim biogramem i linkiem do `/o-firmie/`, własne zdjęcia z montaży zamiast stockowych, data publikacji i aktualizacji. Każdy artykuł linkuje do 1–2 stron sprzedażowych i do konfiguratora lub kontaktu. Tempo: 2 artykuły miesięcznie po starcie.

### 3.6 Wpięcie w architekturę Profil

| Plik | Zmiana względem Profil |
|---|---|
| `src/data/site.ts` | `productionUrl: 'https://www.interwindows.pl'`, `name: 'Inter Windows'`, `legalName`, `nip: '774-329-92-99'`, `geo: { lat: 52.5657, lng: 19.7002 }` (z pinezki na obecnej stronie, sprawdzić w GBP), `hours` (**do uzupełnienia**), `phones[]` (główny + doradcy), `email`, `sameAs[]` (Instagram, wizytówka Google, Facebook), `areaServed[]`, `crews[]` (ekipy: imiona, staż, zdjęcia). |
| `src/data/oferta.ts` | Do `Category` dodać `seo: { title, description, h1 }`, `parent?`, `faq?: {q, a}[]`, `sections?: {h2, body}[]` (treść SEO poza siatką produktów), `related: string[]`, `updated: string`. |
| `src/pages/[slug].astro` | Zostaje dla kategorii. Dodać: okruszki z `parent`, bloki „Realizacje w Płocku i okolicach", FAQ, sekcje H2 z `sections`. |
| `src/pages/montaz-okien.astro`, `wymiana-okien.astro`, `cieply-montaz-okien.astro` | Osobne pliki (treść ręczna, unikalna). |
| `src/data/lokalizacje.ts` + `src/pages/obszar-dzialania/index.astro` + `[slug].astro` | `getStaticPaths` tylko dla `published: true`. |
| `src/data/realizacje.ts` + `src/pages/realizacje/index.astro` + `[slug].astro` | |
| `src/content/poradnik/*.md` (kolekcja treści) + `src/pages/poradnik/index.astro` + `[slug].astro` | Frontmatter: `title, seoTitle, description, h1, author, published, updated, cover, related`. |
| `src/lib/schema.ts` (nowy) | Funkcje `business()`, `website()`, `breadcrumbs()`, `service()`, `faq()`, `article()`. |
| `src/layouts/Base.astro` | Sekcja 5.2. |
| `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts` | Sekcja 5.4. |
| `public/.htaccess` | Sekcja 5.1. |

---

## 4. Specyfikacja on-page

### 4.1 Zasady

- Title i meta podane niżej są **gotowymi tekstami** (sprawdzone skryptem: title ≤ 60 znaków, meta ≤ 155). `Base.astro` ma ich używać 1:1, bez doklejania „| Inter Windows". Marka jest wpisana tam, gdzie się mieści.
- Jeden H1 na stronę. H2 według planu. Fraza główna występuje w title, H1, pierwszym akapicie i jednym H2, a dalej piszemy naturalnie. Bez list miejscowości w treści i bez powtarzania „Płock" w każdym nagłówku.
- Każda strona sprzedażowa ma: blok realizacji, blok „Dlaczego własna ekipa" (krótki, z linkiem do `/montaz-okien/`), FAQ (3–6 pytań), CTA nad zgięciem i na końcu, telefon klikalny w nagłówku.
- Ton premium: konkret, parametry, ludzie z imienia. Bez „najlepsze ceny", „tanio" i wykrzykników.
- Elementy do potwierdzenia z klientem (systemy DAKO, HST, ciepły montaż) są oznaczone w tabelach. W razie braku potwierdzenia trzeba poprawić tekst przed publikacją.

### 4.2 Title, meta description, H1

| URL | P | Title (≤ 60) | Meta description (≤ 155) | H1 |
|---|---|---|---|---|
| `/` | P1 | Okna i drzwi Płock – montaż własną ekipą \| Inter Windows | Okna PCV, aluminiowe i drewniane, drzwi, rolety i bramy dla wymagających. Płock i okolice, montaż wyłącznie naszą ekipą, bez podwykonawców. | Okna i drzwi w Płocku montowane wyłącznie przez naszą ekipę |
| `/okna/` | P1 | Okna na wymiar w Płocku – PCV, aluminium i drewno | Okna PCV, aluminiowe i drewniane DAKO dobrane do domu i budżetu. Sprawdź, od czego zależy cena, skonfiguruj okno online i umów bezpłatny pomiar. | Okna na wymiar – Płock i okolice |
| `/okna-pcv/` | P1 | Okna PCV Płock – DAKO DPQ-82 na profilu Veka \| Inter Windows | Energooszczędne okna PCV DAKO DPQ-82 na profilu Veka Softline 82 MD klasy A. Dobór szyb, pomiar i montaż własną ekipą w Płocku i okolicach. | Okna PCV w Płocku – ciepłe, ciche i dopasowane do domu |
| `/okna-aluminiowe/` | P1 | Okna aluminiowe Płock – systemy Aluprof \| Inter Windows | Smukłe okna aluminiowe na systemach Aluprof: duże przeszklenia, narożniki, kolory RAL. Doradztwo, pomiar i montaż własną ekipą w Płocku. | Okna aluminiowe w Płocku – smukła rama, dużo światła |
| `/okna-drewniane/` | P1 | Okna drewniane Płock – drewno i drewno-alu \| Inter Windows | Okna drewniane i drewniano-aluminiowe DAKO do nowych domów, rezydencji i kamienic. Doradztwo w wyborze wykończenia, pomiar i montaż w Płocku. | Okna drewniane w Płocku – naturalny materiał, nowoczesne parametry |
| `/drzwi-tarasowe/` | P1 | Drzwi tarasowe Płock – HST, przesuwne, SkyLine | Drzwi podnoszono-przesuwne HST, uchylno-przesuwne i minimalistyczne SkyLine. Wielkie przeszklenia z niskim progiem, montaż własną ekipą. | Drzwi tarasowe i przesuwne w Płocku |
| `/drzwi-zewnetrzne/` | P1 | Drzwi zewnętrzne Płock – wejściowe z montażem | Drzwi wejściowe do domu: aluminiowe, stalowe i drewniane od Wikęd, Gerda, Erkado i DAKO. Dobór, pomiar i montaż własną ekipą w Płocku. | Drzwi zewnętrzne do domu – Płock i okolice |
| `/drzwi-wewnetrzne/` | P1 | Drzwi wewnętrzne Płock – DRE, Porta, Erkado z montażem | Drzwi wewnętrzne DRE, Porta, Erkado, Lagrus, Pol-Skone i Barański, także bezprzylgowe i ukryte. Pomiar i montaż w Płocku i okolicach. | Drzwi wewnętrzne z montażem w Płocku |
| `/rolety-zewnetrzne/` | P1 | Rolety zewnętrzne Płock – podtynkowe i nadstawne | Rolety zewnętrzne DAKO podtynkowe, nadstawne i elewacyjne, z napędem i sterowaniem Smart Home. Do tego moskitiery. Montaż w Płocku i okolicy. | Rolety zewnętrzne w Płocku |
| `/zaluzje-fasadowe/` | P1 | Żaluzje fasadowe Płock – projekt i montaż \| Inter Windows | Żaluzje fasadowe DAKO podtynkowe i samonośne: pełna kontrola światła i chłodniejszy dom latem. Projekt, pomiar i montaż w Płocku i okolicach. | Żaluzje fasadowe w Płocku |
| `/bramy-garazowe/` | P1 | Bramy garażowe Płock – segmentowe z napędem \| Inter Windows | Bramy garażowe segmentowe DAKO Thermo i Standard oraz rolowane, z napędem i drzwiami bocznymi. Kolor dobrany do stolarki, montaż w Płocku. | Bramy garażowe w Płocku |
| `/montaz-okien/` | P1 | Montaż okien Płock – własne ekipy, bez podwykonawców | Okna montują u nas wyłącznie nasi monterzy, nigdy podwykonawcy. Montaż tradycyjny, warstwowy i w warstwie ocieplenia, odbiór z protokołem. | Montaż okien w Płocku – zawsze naszą ekipą |
| `/wymiana-okien/` | P1 | Wymiana okien Płock – demontaż, montaż, obróbki | Wymieniamy okna w domach i mieszkaniach w Płocku i okolicy: demontaż, utylizacja, montaż, obróbki i parapety. Sprawnie, czysto, własną ekipą. | Wymiana okien w Płocku – sprawnie i bez bałaganu |
| `/cieply-montaz-okien/` | P1\* | Ciepły montaż okien Płock – montaż warstwowy | Ciepły, warstwowy montaż okien: taśmy, izolacja i szczelne połączenie z murem. Wykonujemy go własną ekipą w Płocku i okolicach. Sprawdź, czy warto. | Ciepły montaż okien w Płocku |
| `/obszar-dzialania/` | P1 | Obszar działania – Płock i okolice \| Inter Windows | Montujemy okna i drzwi w Płocku oraz w gminach powiatu płockiego, gostynińskiego i sierpeckiego. Sprawdź czasy dojazdu i realizacje w okolicy. | Gdzie pracujemy – Płock i okolice |
| `/obszar-dzialania/gostynin/` | P1\* | Okna i drzwi Gostynin – montaż ekipą Inter Windows | Okna, drzwi, rolety i bramy z montażem w Gostyninie i okolicy. Pomiar u Ciebie, realizacje z regionu, własna ekipa z Płocka – ok. 30 minut drogi. | Okna i drzwi z montażem – Gostynin i okolice |
| `/obszar-dzialania/sierpc/` | P2 | Okna i drzwi Sierpc – montaż ekipą Inter Windows | Okna, drzwi, rolety i bramy z montażem w Sierpcu i okolicy. Bezpłatny pomiar na miejscu, realizacje z regionu i własna ekipa montażowa. | Okna i drzwi z montażem – Sierpc i okolice |
| `/obszar-dzialania/gabin/` | P2 | Okna i drzwi Gąbin i Słubice – montaż \| Inter Windows | Okna, drzwi i rolety z montażem w Gąbinie, gminie Słubice i okolicy. Realizacje z regionu, opinie sąsiadów i własna ekipa z Płocka. | Okna i drzwi z montażem – Gąbin, Słubice i okolice |
| `/realizacje/` | P1 | Realizacje – okna i drzwi w Płocku i okolicy \| Inter Windows | Domy w Płocku i okolicznych gminach, w których montowaliśmy okna, drzwi tarasowe, rolety i bramy. Zdjęcia, zastosowane systemy i opis prac. | Nasze realizacje |
| `/realizacje/{slug}/` | P1 | {Produkt} w {typ obiektu}, {Miejscowość} \| Inter Windows *(np. „Okna aluminiowe w domu, Stara Biała \| Inter Windows")* | {Zakres} w {miejscowość}: {system}, {liczba} konstrukcji, {wyzwanie}. Zdjęcia i opis montażu wykonanego przez naszą ekipę. | {Produkt} – {typ obiektu}, {Miejscowość} |
| `/poradnik/` | P1 | Poradnik – okna, drzwi i montaż od praktyków \| Inter Windows | Ceny, porównania i wskazówki montażowe od ludzi, którzy od 20 lat dobierają i montują okna. Konkretnie, na przykładach z naszych realizacji. | Poradnik Inter Windows |
| `/o-firmie/` | P1 | O nas – 20 lat w oknach, własne ekipy \| Inter Windows | Dwóch ekspertów z 20-letnim doświadczeniem i własne ekipy montażowe. Autoryzowany partner DAKO w Płocku. Poznaj ludzi, którzy przyjadą do Ciebie. | Inter Windows – doradztwo i montaż w jednych rękach |
| `/kontakt/` | P1 | Kontakt – Płock, ul. Przemysłowa 22 \| Inter Windows | Inter Windows, ul. Przemysłowa 22, 09-400 Płock, tel. 697 886 093. Umów bezpłatny pomiar lub spotkanie z doradcą w biurze sprzedaży. | Kontakt i bezpłatny pomiar |
| `/konfigurator/` | P1 | Konfigurator okien – wstępna wycena online \| Inter Windows | Skonfiguruj okno: wymiary, podział, kolor, szyby i dodatki. Wyślij projekt, a doradca z Płocka przygotuje dokładną wycenę i umówi pomiar. | Konfigurator okien |
| `/parapety/` | P2 | Parapety Płock – wewnętrzne i zewnętrzne z montażem | Parapety wewnętrzne z konglomeratu, kamienia i PCV oraz zewnętrzne aluminiowe i stalowe. Montaż razem z oknami lub osobno, w Płocku i okolicy. | Parapety wewnętrzne i zewnętrzne |
| `/pergole/` | P2 | Pergole tarasowe Płock – aluminiowe i bioklimatyczne | Pergole aluminiowe i bioklimatyczne z ruchomymi lamelami, oświetleniem i screenami. Projekt dopasowany do tarasu i montaż w Płocku i okolicy. | Pergole tarasowe w Płocku |
| `/moskitiery/` | P2 | Moskitiery na wymiar Płock – ramkowe, przesuwne, plisowane | Moskitiery na wymiar do okien, drzwi tarasowych i HST: ramkowe, przesuwne, plisowane i rolowane. Pomiar i montaż w Płocku i okolicach. | Moskitiery na wymiar |
| `/serwis-okien/` | P2 | Serwis i regulacja okien Płock \| Inter Windows | Regulacja okien i drzwi, wymiana uszczelek, okuć i szyb, przeglądy pogwarancyjne. Serwis wykonują ci sami monterzy, którzy montują nasze okna. | Serwis i regulacja okien w Płocku |
| `/okna-pcv/dako-dpq-82/` | P2 | Okna DAKO DPQ-82 (Veka Softline 82 MD) – opinia montera | DAKO DPQ-82 na profilu Veka Softline 82 MD: parametry, pakiety szyb, kolory i nasze doświadczenia z montażu. Dla kogo to okno i ile kosztuje. | Okna DAKO DPQ-82 na profilu Veka Softline 82 MD |
| `/drzwi-tarasowe/hst/` | P2 | Drzwi HST podnoszono-przesuwne – ceny, wymiary, montaż | Drzwi HST w PCV i aluminium: maksymalne wymiary, próg, szczelność i montaż ciężkich skrzydeł. Ceny przykładowych zestawów i realizacje. | Drzwi podnoszono-przesuwne HST |

### 4.3 Słowa kluczowe, struktura H2, linkowanie i CTA

| URL | Fraza główna | Frazy wspierające | Plan treści (H2) | Linki wychodzące → / przychodzące ← | CTA |
|---|---|---|---|---|---|
| `/` | okna Płock; okna i drzwi Płock | okna Płock i okolice, stolarka okienna Płock, Inter Windows Płock, partner DAKO Płock | Okna, drzwi i osłony dla domu na lata (kafle kategorii) · Własne ekipy montażowe, nigdy podwykonawcy · Od pomiaru do odbioru w 5 krokach · Realizacje z Płocka i okolic · Co mówią klienci · Partnerzy: DAKO, Veka, Aluprof, Wikęd, Gerda… · Gdzie pracujemy · Z poradnika | → wszystkie kategorie P1, `/montaz-okien/`, `/realizacje/` (3 karty), `/obszar-dzialania/`, `/konfigurator/`, `/kontakt/`, 3 artykuły. ← logo na każdej stronie, wizytówka Google (URL witryny) | Umów bezpłatny pomiar · Skonfiguruj okno · tel. |
| `/okna/` | okna na wymiar Płock; okna Płock cennik | rodzaje okien, okna do domu, okna energooszczędne, okna trzyszybowe | PCV, aluminium czy drewno: porównanie (tabela) · Okna PCV · Okna aluminiowe · Okna drewniane i drewniano-aluminiowe · Ile kosztują okna w Płocku i od czego zależy cena (widełki) · Szyby, okucia, kolory · Montaż i wymiana · Realizacje · FAQ | → 3 podkategorie, `/drzwi-tarasowe/`, `/montaz-okien/`, `/wymiana-okien/`, `/cieply-montaz-okien/`, `/konfigurator/`, poradnik #1 i #2. ← główna, menu, poradnik, realizacje | Skonfiguruj okno · Umów pomiar |
| `/okna-pcv/` | okna PCV Płock | okna plastikowe Płock, okna PCV cennik, Veka Softline 82 MD, DAKO DPQ-82, okna trzyszybowe | DAKO DPQ-82 na profilu Veka Softline 82 MD · Inne systemy PCV (Sonarol, All Windows) · Pakiety szyb i parametry (Uw, Ug, ciepła ramka) · Kolory i okleiny · Okucia i bezpieczeństwo (RC2) · Ile kosztują okna PCV · Montaż własną ekipą · Realizacje z oknami PCV · FAQ | → `/okna/`, `/cieply-montaz-okien/`, `/wymiana-okien/`, `/rolety-zewnetrzne/`, `/konfigurator/`, poradnik #5 i #11, P2 `/okna-pcv/dako-dpq-82/`. ← `/okna/`, główna, realizacje z tagiem PCV, poradnik | Skonfiguruj okno PCV |
| `/okna-aluminiowe/` | okna aluminiowe Płock | okna aluminiowe do domu, okna aluminiowe cena, Aluprof, okna wielkoformatowe, okna narożne | Kiedy aluminium wygrywa z PCV · Systemy DAKO na profilach Aluprof (DA-77, DA-70N, **potwierdzić**) · Duże przeszklenia, narożniki i fixy · Kolory RAL, struktury, okucia ukryte · Montaż ciężkich konstrukcji: sprzęt i ekipa · Cena okien aluminiowych · Realizacje · FAQ | → `/drzwi-tarasowe/`, `/zaluzje-fasadowe/`, `/cieply-montaz-okien/`, poradnik #2, `/konfigurator/`. ← `/okna/`, główna, poradnik #2, realizacje | Umów konsultację (z projektem domu) |
| `/okna-drewniane/` | okna drewniane Płock | okna drewniano-aluminiowe, okna drewniane czy PCV, okna do kamienicy, okna w strefie konserwatorskiej | Systemy DAKO DDF-68, DDR-68, DDA-78 · Gatunki drewna, lakiery, kolory · Drewno-aluminium · Okna do kamienic i budynków zabytkowych w Płocku · Pielęgnacja i serwis · Montaż · Realizacje · FAQ | → `/okna/`, `/cieply-montaz-okien/`, poradnik #12. ← `/okna/`, główna, poradnik #2 i #12 | Umów pomiar |
| `/drzwi-tarasowe/` | drzwi tarasowe Płock | drzwi przesuwne HST/HS Płock, drzwi balkonowe Płock, okna przesuwne tarasowe, HST czy PSK | HST, uchylno-przesuwne, SkyLine, harmonijkowe: porównanie · PCV czy aluminium · Niski próg i szczelność · Maksymalne wymiary i statyka · Montaż dużych skrzydeł · Ceny · Realizacje · FAQ | → poradnik #3, `/zaluzje-fasadowe/`, `/rolety-zewnetrzne/` (moskitiery), P2 `/drzwi-tarasowe/hst/`, `/pergole/`. ← główna, `/okna-aluminiowe/`, `/okna-pcv/`, poradnik #3 | Wyślij rzut tarasu / Umów pomiar |
| `/drzwi-zewnetrzne/` | drzwi zewnętrzne Płock; drzwi wejściowe Płock | drzwi zewnętrzne z montażem, drzwi do mieszkania, drzwi antywłamaniowe, drzwi aluminiowe, czytnik linii papilarnych | Producenci i linie · Aluminium, stal czy drewno · Bezpieczeństwo: klasa RC, zamki, elektronika · Ciepło, próg i strona świata · Drzwi do mieszkania w bloku · Montaż własną ekipą · Ceny · FAQ | → poradnik #8, `/bramy-garazowe/` (spójny design), `/drzwi-wewnetrzne/`. ← główna, poradnik #8, `/bramy-garazowe/` | Umów pomiar · Zaproś doradcę |
| `/drzwi-wewnetrzne/` | drzwi wewnętrzne Płock | z montażem, na wymiar, bezprzylgowe, ukryte, ościeżnica regulowana | Producenci · Drzwi bezprzylgowe i ukryte · Ościeżnice · Pomiar i montaż · Ceny · FAQ | → `/drzwi-zewnetrzne/`, `/kontakt/`. ← główna, `/drzwi-zewnetrzne/` | Umów pomiar |
| `/rolety-zewnetrzne/` | rolety zewnętrzne Płock | rolety Płock, rolety antywłamaniowe, rolety podtynkowe, rolety z napędem, moskitiery Płock | Podtynkowe, nadstawne, elewacyjne · Kiedy planować: budowa czy dom zamieszkały · Napędy, sterowanie, DAKO Smart Home · Bezpieczeństwo i ochrona przed upałem · Moskitiery · Montaż · Ceny · FAQ | → `/zaluzje-fasadowe/`, poradnik #4, `/okna-pcv/`. ← główna, strony okien, poradnik #4 | Umów pomiar |
| `/zaluzje-fasadowe/` | żaluzje fasadowe Płock | żaluzje zewnętrzne Płock, żaluzje fasadowe cena, Z90 czy C80, podtynkowe | Typy: podtynkowe, samonośne, nadstawne · Lamele Z90 i C80 · Na jakim etapie budowy zaplanować · Sterowanie i czujniki pogodowe · Żaluzje czy rolety · Ceny · Realizacje · FAQ | → `/rolety-zewnetrzne/`, poradnik #4, `/okna-aluminiowe/`, `/drzwi-tarasowe/`. ← główna, `/okna-aluminiowe/`, `/drzwi-tarasowe/` | Umów konsultację na etapie projektu |
| `/bramy-garazowe/` | bramy garażowe Płock | bramy segmentowe Płock, brama z napędem, bramy garażowe Płock i okolice, najcieplejsza brama | Segmentowe Thermo 60 i Standard 40 · Rolowane · Napędy i sterowanie z telefonu · Drzwi boczne i spójny design z drzwiami wejściowymi · Przygotowanie otworu i montaż · Ceny · FAQ | → `/drzwi-zewnetrzne/`, poradnik #9. ← główna, `/drzwi-zewnetrzne/` | Umów pomiar |
| `/montaz-okien/` | montaż okien Płock | monterzy okien Płock, montaż okien z gwarancją, montaż drzwi Płock, montaż okien Płock i okolice | Dlaczego nigdy nie oddajemy montażu podwykonawcom · Poznaj nasze ekipy (imiona, staż, zdjęcia) · Metody: tradycyjna, ciepły montaż, w warstwie ocieplenia · Montaż krok po kroku · Jak chronimy dom w czasie prac · Odbiór z protokołem, gwarancja na montaż, przegląd po pierwszej zimie · Montaż drzwi, bram i rolet · FAQ | → `/cieply-montaz-okien/`, `/wymiana-okien/`, `/o-firmie/#ekipy`, `/realizacje/`, kategorie. ← wszystkie kategorie, główna, strony miejscowości | Umów pomiar |
| `/wymiana-okien/` | wymiana okien Płock | wymiana okien cena, w domu, w bloku, ile kosztuje wymiana okien, z dofinansowaniem | Kiedy wymiana się opłaca · Co obejmuje usługa · Dzień montażu krok po kroku · Wymiana okien w mieszkaniu w bloku · Ile kosztuje wymiana okien w Płocku · Dofinansowanie i ulga termomodernizacyjna · Realizacje · FAQ | → poradnik #1, #6, #10, `/cieply-montaz-okien/`, `/okna-pcv/`, `/konfigurator/`, P2 `/parapety/`. ← główna, `/okna/`, poradnik #1 i #10 | Umów pomiar |
| `/cieply-montaz-okien/` | ciepły montaż okien Płock | ciepły montaż okien na czym polega, czy warto, cena za mb, montaż warstwowy, taśmy paroszczelne | Na czym polega: trzy warstwy uszczelnienia · Kiedy ma największy sens · Materiały i systemy, których używamy (**potwierdzić**) · Ciepły montaż przy wymianie okien w starszym domu · Montaż w warstwie ocieplenia · Ile kosztuje · FAQ | → `/montaz-okien/`, poradnik #5 i #7, `/okna-pcv/`. ← strony okien, `/montaz-okien/`, `/wymiana-okien/`, poradnik | Umów pomiar |
| `/obszar-dzialania/` | okna Płock i okolice | montaż okien powiat płocki, nazwy gmin z sekcji 2.3 (w tabeli, nie w treści ciągłej) | Mapa i czasy dojazdu z Płocka · Gminy, w których pracujemy (tabela) · Realizacje według miejscowości · Jak pracujemy poza Płockiem · FAQ | → opublikowane strony miejscowości, realizacje, `/kontakt/`. ← stopka (każda strona), główna, strony miejscowości, realizacje | Sprawdź termin pomiaru w Twojej okolicy |
| `/obszar-dzialania/gostynin/` (i inne miejscowości) | okna Gostynin | drzwi zewnętrzne Gostynin, rolety zewnętrzne Gostynin, bramy garażowe Gostynin, okna PCV/aluminiowe Gostynin | Według szablonu z 3.3: Dojazd i terminy · Realizacje w Gostyninie i okolicy · Opinie klientów z regionu · Domy w okolicy i co w nich zmieniamy · Dofinansowanie w gminie · Gminy, które obsługujemy (Gostynin, Pacyna, Sanniki, Szczawin Kościelny) · FAQ | → realizacje z regionu, kategorie z tych realizacji, `/montaz-okien/`, `/obszar-dzialania/`. ← `/obszar-dzialania/`, realizacje z tej gminy | Zadzwoń do opiekuna regionu |
| `/realizacje/` | realizacje okna Płock | realizacje drzwi tarasowe, nazwy miejscowości | Filtry (produkt, miejscowość) · Siatka realizacji · CTA | → każda realizacja. ← główna, kategorie, strony miejscowości, menu | Chcesz podobny efekt? Umów pomiar |
| `/realizacje/{slug}/` | {produkt} {miejscowość} | system, typ budynku | Zakres i założenia · Wyzwanie · Rozwiązanie i zastosowane produkty · Montaż: ekipa, czas, metoda · Galeria · Opinia klienta · Podobne realizacje | → kategorie użytych produktów, strona miejscowości lub hub, `/kontakt/`. ← `/realizacje/`, kategorie, strony miejscowości | Podobny projekt? Umów pomiar |
| `/poradnik/` | poradnik okna | – | Lista artykułów według tematów (Okna · Drzwi · Osłony · Montaż · Finanse) | → artykuły. ← menu lub stopka, główna (3 najnowsze) | – |
| `/o-firmie/` | Inter Windows Płock | firma okienna Płock, autoryzowany partner DAKO, własne ekipy montażowe | Nasza historia · Dwóch właścicieli: doradztwo i montaż pod osobistą kontrolą · Nasze ekipy (`#ekipy`) · Partnerzy i certyfikaty · Opinie klientów (`#opinie`) · Dane firmy | → `/montaz-okien/`, `/realizacje/`, `/kontakt/`. ← stopka, główna, `/montaz-okien/`, biogramy autorów | Poznajmy się: umów spotkanie |
| `/kontakt/` | Inter Windows kontakt | biuro okien Płock, salon okien Płock | Biuro sprzedaży i godziny · Doradcy: Paweł Majchrzak, Kacper Dylewski, Bartosz Bezdziek · Umów bezpłatny pomiar (formularz) · Dojazd · Dane rejestrowe | → `/obszar-dzialania/`, `/konfigurator/`. ← każda strona (nagłówek i stopka) | Wyślij formularz · Zadzwoń |
| `/konfigurator/` | konfigurator okien | wycena okien online, okna na wymiar online | Statyczny HTML wokół aplikacji: Jak działa konfigurator · Co się dzieje po wysłaniu projektu · Dlaczego i tak przyjedziemy na pomiar · FAQ | → `/okna-pcv/`, `/okna-aluminiowe/`, `/kontakt/`. ← główna, strony okien, `/wymiana-okien/`, CTA w nagłówku | Wyślij konfigurację |
| P2: `/parapety/`, `/pergole/`, `/moskitiery/`, `/serwis-okien/`, `/okna-pcv/dako-dpq-82/`, `/drzwi-tarasowe/hst/` | jak w tytułach | – | Schemat kategorii: rodzaje · materiały/parametry · montaż · ceny · realizacje · FAQ | → kategoria nadrzędna, poradnik. ← kategoria nadrzędna | Umów pomiar |

### 4.4 Poradnik – title, meta, H1, linki

| Slug | P | Title (≤ 60) | Meta description (≤ 155) | H1 | Fraza główna | Linkuje do |
|---|---|---|---|---|---|---|
| `ile-kosztuje-wymiana-okien` | P1 | Ile kosztuje wymiana okien w 2026? Ceny z Płocka | Realne koszty wymiany okien w domu i mieszkaniu: okna, montaż, obróbki, parapety. Widełki cen z naszych realizacji w Płocku i okolicach. | Ile kosztuje wymiana okien w 2026 roku? | ile kosztuje wymiana okien | `/wymiana-okien/`, `/konfigurator/`, `/okna-pcv/` |
| `okna-aluminiowe-czy-pcv` | P1 | Okna aluminiowe czy PCV? Porównanie od praktyków | Aluminium czy PCV: ciepło, wygląd, trwałość, cena. Porównujemy oba materiały na przykładach domów, w których montowaliśmy okna. | Okna aluminiowe czy PCV – co wybrać do domu? | okna aluminiowe czy pcv | `/okna-aluminiowe/`, `/okna-pcv/` |
| `drzwi-tarasowe-hst-czy-psk` | P1 | HST czy PSK? Jakie drzwi tarasowe wybrać | Drzwi HST, PSK, SkyLine czy harmonijkowe? Różnice w wygodzie, progu, szczelności i cenie. Pomagamy dobrać system do tarasu i budżetu. | HST czy PSK – jakie drzwi tarasowe wybrać? | hst czy psk | `/drzwi-tarasowe/` |
| `zaluzje-fasadowe-czy-rolety-zewnetrzne` | P1 | Żaluzje fasadowe czy rolety zewnętrzne? Porównanie | Żaluzje fasadowe czy rolety: kontrola światła, ochrona przed upałem, bezpieczeństwo, wygląd i cena. Kiedy co wybrać i kiedy to zaplanować. | Żaluzje fasadowe czy rolety zewnętrzne? | żaluzje fasadowe czy rolety | `/zaluzje-fasadowe/`, `/rolety-zewnetrzne/` |
| `okna-do-domu-pasywnego` | P2 | Okna do domu pasywnego i energooszczędnego | Jakie parametry powinny mieć okna do domu pasywnego i energooszczędnego: Uw, Ug, ciepła ramka, montaż. Wyjaśniamy bez marketingowych skrótów. | Okna do domu pasywnego – jakie parametry wybrać? | okna do domu pasywnego | `/okna-pcv/`, `/cieply-montaz-okien/` |
| `dofinansowanie-wymiany-okien` | P2 | Dofinansowanie wymiany okien 2026 – programy i ulga | Czyste Powietrze, ulga termomodernizacyjna i programy lokalne: kto może dostać dopłatę do okien, jakie wymagania muszą spełnić okna. | Dofinansowanie wymiany okien w 2026 roku | dotacja na wymianę okien | `/wymiana-okien/` |
| `montaz-okien-w-warstwie-ocieplenia` | P2 | Montaż okien w warstwie ocieplenia – kiedy ma sens | Montaż okien na konsolach w warstwie ocieplenia: zalety, ograniczenia, koszty i błędy, które widzimy na budowach. Poradnik montera. | Montaż okien w warstwie ocieplenia – kiedy warto? | montaż okien w warstwie ocieplenia | `/cieply-montaz-okien/`, `/montaz-okien/` |
| `jakie-drzwi-zewnetrzne-wybrac` | P2 | Jakie drzwi zewnętrzne do domu wybrać? Poradnik | Aluminium, stal czy drewno? Klasa antywłamaniowa, ciepło, próg, zamki elektroniczne i strona świata. Jak dobrać drzwi wejściowe do domu. | Jakie drzwi zewnętrzne do domu wybrać? | jakie drzwi zewnętrzne do domu | `/drzwi-zewnetrzne/` |
| `jaka-brama-garazowa-wybrac` | P2 | Jaka brama garażowa? Segmentowa, rolowana, ciepła | Brama segmentowa, rolowana czy uchylna? Izolacyjność, napęd, wymiary otworu i spójność z elewacją. Wskazówki przed zakupem bramy. | Jaka brama garażowa będzie najlepsza? | jaka brama garażowa | `/bramy-garazowe/` |
| `kiedy-wymieniac-okna` | P2 | Kiedy wymieniać okna? Sygnały, sezon i montaż zimą | Po czym poznać, że okna wymagają wymiany, kiedy najlepiej zamówić nowe i czy montaż zimą ma sens. Doświadczenia z naszych montaży. | Kiedy wymienić okna – i czy można to zrobić zimą? | kiedy wymieniać okna | `/wymiana-okien/` |
| `okna-antywlamaniowe-rc2` | P2 | Okna antywłamaniowe RC2 – co dają i czy warto? | Klasa RC2, szyby P4, klamki z kluczem, okucia grzybkowe. Co realnie chroni dom przed włamaniem i ile kosztuje podniesienie bezpieczeństwa. | Okna antywłamaniowe RC2 – czy warto dopłacić? | okna antywłamaniowe | `/okna-pcv/`, `/rolety-zewnetrzne/` |
| `wymiana-okien-w-kamienicy-plock` | P2 | Wymiana okien w kamienicy w Płocku – konserwator | Okna w kamienicy i strefie ochrony konserwatorskiej w Płocku: kiedy potrzebna zgoda, jakie okna przejdą uzgodnienia i jak przygotować projekt. | Wymiana okien w kamienicy i strefie konserwatorskiej | wymiana okien w kamienicy | `/okna-drewniane/`, `/wymiana-okien/` |

### 4.5 Reguły linkowania wewnętrznego

| Z | Do | Jak |
|---|---|---|
| Każda strona | `/`, `/kontakt/`, `/obszar-dzialania/`, `/o-firmie/`, kategorie P1 | menu i stopka (stopka z pełnym NAP) |
| Kategoria | 3 realizacje z tym produktem, `/montaz-okien/`, 1–2 artykuły, kategorie powiązane (`related`) | bloki „Realizacje", „Zobacz też", akapit o montażu |
| Realizacja | kategorie użytych produktów, strona miejscowości lub hub | linki w opisie i w „Zastosowane produkty" |
| Strona miejscowości | realizacje z regionu, kategorie, `/montaz-okien/` | bloki szablonu |
| Artykuł | 1–2 strony sprzedażowe (anchor opisowy, np. „okna aluminiowe na systemach Aluprof"), konfigurator | w treści, nie tylko w ramce na końcu |
| Okruszki | rodzic → dziecko | wszystkie strony poza główną, zgodnie z BreadcrumbList |

Anchory opisowe, bez „kliknij tutaj". Nie linkujemy z każdej strony do każdej strony miejscowości.

---

## 5. Techniczne SEO – checklista dla buildu Astro

### 5.1 Host, przekierowania 301 i `.htaccess`

**Obecne adresy interwindows.pl i ich nowe odpowiedniki:**

| Obecny URL | Status dziś | Nowy cel | Reguła |
|---|---|---|---|
| `http://interwindows.pl/*`, `http://www.interwindows.pl/*` | 301 → https | `https://www.interwindows.pl/*` | jeden skok, reguła 1 |
| `https://interwindows.pl/*` | **200 (duplikat)** | `https://www.interwindows.pl/*` | reguła 1 |
| `/index.html` | 200 (duplikat) | `/` | reguła 2 |
| `/assets/phpscripts/contact.php` | endpoint formularza | `/kontakt/` | reguła 3 |
| `/assets/…` (CSS, JS, obrazy starego one-page'a) | 200 | 410 Gone | reguła 4 (nowy build używa `/_astro/` i `/img/`, więc **nie tworzyć** katalogu `public/assets/`) |
| `/#about`, `/#services`, `/#projects`, `/#testimonials`, `/#contact` | kotwice (serwer ich nie widzi) | `/o-firmie/`, `/okna/`, `/realizacje/`, `/o-firmie/#opinie`, `/kontakt/` | opcjonalny skrypt na stronie głównej (niżej), np. dla starych linków z bio na Instagramie |

```apache
# public/.htaccess – wersja produkcyjna (nie wgrywać na hosting podglądowy)
RewriteEngine On

# 1) jeden kanoniczny host: https + www w jednym przekierowaniu
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} !^www\.interwindows\.pl$ [NC]
RewriteRule ^ https://www.interwindows.pl%{REQUEST_URI} [L,R=301]

# 2) /index.html i /katalog/index.html -> adres z ukośnikiem (tylko żądania z zewnątrz)
RewriteCond %{THE_REQUEST} \s/+(.*/)?index\.html[?\s] [NC]
RewriteRule ^(.*/)?index\.html$ /$1 [L,R=301,NC]

# 3) stary formularz one-page
RewriteRule ^assets/phpscripts/contact\.php$ /kontakt/ [L,R=301,NC]

# 4) zasoby starej strony
RewriteRule ^assets/ - [G,NC]

# brak duplikatów bez ukośnika: dla katalogów Apache/LiteSpeed sam robi 301 /okna -> /okna/ (DirectorySlash On)

ErrorDocument 404 /404.html
ErrorDocument 410 /404.html

<IfModule mod_headers.c>
  # włączyć po sprawdzeniu, że https działa na obu hostach
  Header always set Strict-Transport-Security "max-age=31536000"
  <FilesMatch "\.php$">
    Header set X-Robots-Tag "noindex, nofollow"
  </FilesMatch>
</IfModule>
# + bloki mod_deflate / mod_expires z projektu Profil bez zmian
```

```html
<!-- opcjonalnie tylko w index.astro: stare kotwice one-page -> nowe podstrony -->
<script is:inline>
  const m = { '#about': '/o-firmie/', '#services': '/okna/', '#projects': '/realizacje/', '#testimonials': '/o-firmie/#opinie', '#contact': '/kontakt/' };
  if (m[location.hash]) location.replace(m[location.hash]);
</script>
```

(Jeśli nowa strona główna używa tych samych kotwic, na przykład `#kontakt`, skrypt trzeba uzgodnić z frontendem.)

### 5.2 `Base.astro`: meta, canonical, OG

| Element | Wymaganie |
|---|---|
| `<title>` | prop `title` używany 1:1 (teksty z 4.2). Fallback: `Inter Windows – okna i drzwi z montażem, Płock`. Usunąć automatyczne `${title} \| ${site.name}` z Profilu. |
| `<meta name="description">` | z 4.2, unikalny na każdej stronie |
| canonical | jak w Profilu: zawsze `site.productionUrl` + ścieżka z końcowym `/`, bez parametrów (`?utm`, `?miasto=`, stany konfiguratora) |
| robots | domyślnie `index, follow, max-image-preview:large`; `noindex` dla `/dziekujemy/`, 404 i całego podglądu (`PUBLIC_PREVIEW`, jak w Profilu) |
| OG / Twitter | `og:type` (`website` lub `article` w poradniku), `og:title`, `og:description`, `og:url` = canonical, `og:image` 1200×630 per strona (zdjęcie z realizacji, nie logo), `og:image:alt`, `og:locale=pl_PL`, `twitter:card=summary_large_image` |
| Język | `<html lang="pl">`. Hreflang niepotrzebny (jedna wersja językowa). |
| Nowe propsy | `title, description, image, ogType, noindex, breadcrumbs: {name, path}[], schema: object[]` |
| Nagłówki | dokładnie jeden `<h1>` na stronę (pilnować w komponentach hero) |
| Okruszki | widoczne okruszki i BreadcrumbList z tego samego źródła (`breadcrumbs`) |

### 5.3 Dane strukturalne (JSON-LD)

| Typ strony | JSON-LD |
|---|---|
| Wszystkie (globalnie w `Base.astro`) | `HomeAndConstructionBusiness` (`@id: https://www.interwindows.pl/#firma`) i `WebSite` (`@id: …/#witryna`, `name: "Inter Windows"`, `alternateName: "InterWindows"`, pod nazwę witryny w wynikach Google) w jednym `@graph` |
| Kategorie i usługi | `BreadcrumbList` + `Service` (`serviceType`, `provider: {@id: #firma}`, `areaServed`, `url`). `FAQPage` tylko gdy FAQ jest widoczne na stronie. **Nie** `Product` bez cen i ofert (ostrzeżenia w GSC). |
| Strony miejscowości | `BreadcrumbList` + `Service` z `areaServed: {"@type": "City", "name": "Gostynin"}` + `FAQPage`. **Nie tworzyć** drugiego LocalBusiness z adresem w Gostyninie. |
| Realizacja | `BreadcrumbList` + `CreativeWork` (`name`, `image[]`, `contentLocation: {"@type": "Place", "name": "Stara Biała"}`, `about` → Service kategorii, `creator: {@id: #firma}`) |
| Artykuł | `BreadcrumbList` + `BlogPosting` (`headline`, `image`, `datePublished`, `dateModified`, `author: Person` z `url` do `/o-firmie/#…`, `publisher: {@id: #firma}`) |
| Kontakt / O firmie | `ContactPage` / `AboutPage` z `mainEntity: {@id: #firma}`; na `/o-firmie/` `Person` dla właścicieli |
| Opinie | **bez `aggregateRating` i `review` na LocalBusiness z własnej strony.** Google ignoruje „self-serving reviews" i może to uznać za nadużycie. Gwiazdki mają pochodzić z wizytówki Google. |
| FAQPage – uwaga | Od 2023 r. Google pokazuje rozszerzone wyniki FAQ prawie wyłącznie dla serwisów rządowych i medycznych. Znacznik zostawiamy dla porządku semantyki i asystentów AI, ale bez oczekiwania na rich results. |

Przykład globalnego `@graph` (godziny i URL wizytówki do uzupełnienia):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.interwindows.pl/#firma",
      "name": "Inter Windows",
      "legalName": "Inter Windows Bartosz Bezdziek, Paweł Majchrzak spółka cywilna",
      "url": "https://www.interwindows.pl/",
      "logo": "https://www.interwindows.pl/img/logo.png",
      "image": "https://www.interwindows.pl/og.jpg",
      "description": "Okna, drzwi, rolety, żaluzje fasadowe i bramy garażowe z montażem wykonywanym wyłącznie przez własne ekipy. Autoryzowany partner DAKO w Płocku.",
      "telephone": "+48697886093",
      "email": "biuro@interwindows.pl",
      "vatID": "PL7743299299",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ul. Przemysłowa 22",
        "postalCode": "09-400",
        "addressLocality": "Płock",
        "addressRegion": "mazowieckie",
        "addressCountry": "PL"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 52.5657, "longitude": 19.7002 },
      "hasMap": "https://maps.google.com/?cid=UZUPELNIC",
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "UZUPELNIC", "closes": "UZUPELNIC" }
      ],
      "areaServed": [
        { "@type": "City", "name": "Płock" },
        { "@type": "AdministrativeArea", "name": "powiat płocki" },
        { "@type": "AdministrativeArea", "name": "powiat gostyniński" },
        { "@type": "AdministrativeArea", "name": "powiat sierpecki" }
      ],
      "founder": [
        { "@type": "Person", "name": "Paweł Majchrzak" },
        { "@type": "Person", "name": "Bartosz Bezdziek" }
      ],
      "sameAs": ["https://www.instagram.com/inter_windows", "URL_WIZYTOWKI_GOOGLE", "URL_FACEBOOK_JESLI_JEST"]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.interwindows.pl/#witryna",
      "url": "https://www.interwindows.pl/",
      "name": "Inter Windows",
      "alternateName": "InterWindows",
      "inLanguage": "pl-PL",
      "publisher": { "@id": "https://www.interwindows.pl/#firma" }
    }
  ]
}
```

Walidacja: Rich Results Test i validator.schema.org dla każdego szablonu przed startem.

### 5.4 Sitemap i robots

- `src/pages/sitemap.xml.ts`: lista budowana z danych (`oferta.ts`, usługi, `lokalizacje.ts` z `published`, `realizacje.ts`, kolekcja `poradnik`) zamiast ręcznej tablicy z Profilu. Do każdego adresu `<lastmod>` z pola `updated`. **Bez** stron noindex (`/dziekujemy/`, 404). Adresy z `site.productionUrl` (w podglądzie i tak obowiązuje noindex).
- `src/pages/robots.txt.ts` (przełączany przez `PUBLIC_PREVIEW`):
  - produkcja: `User-agent: *` / `Allow: /` / `Sitemap: https://www.interwindows.pl/sitemap.xml`. Nie blokować stron z noindex, bo robot musi zobaczyć znacznik. Nie blokować botów AI (widoczność w odpowiedziach asystentów pomaga firmie lokalnej).
  - podgląd: `Disallow: /`.
- Po starcie: Google Search Console (właściwość domeny, przesłanie sitemapy, prośba o indeksację kluczowych URL-i) i Bing Webmaster Tools (import z GSC; indeks Binga zasila też część asystentów AI).

### 5.5 Spójność NAP

| Pole | Jedna obowiązująca forma |
|---|---|
| Nazwa | Inter Windows (pełna nazwa prawna tylko w danych rejestrowych na `/kontakt/` i w polityce prywatności) |
| Adres | ul. Przemysłowa 22, 09-400 Płock |
| Telefon główny | +48 697 886 093 (w schema, wizytówce, stopce i katalogach). Pozostali doradcy tylko na `/kontakt/` i stronach miejscowości. |
| E-mail | biuro@interwindows.pl (tekst + `mailto:`, bez „(małpa)"; przed spamem chroni formularz) |
| WWW | https://www.interwindows.pl/ |

NAP jako **tekst** (nie obrazek jak obecne `namiary.png`) w stopce każdej strony, na `/kontakt/`, w schema, w wizytówce Google i we wszystkich katalogach. Telefon jako `tel:+48697886093`.

### 5.6 Obrazy

- Nazwy plików ASCII, opisowe, bez polskich znaków: `okna-aluminiowe-antracyt-dom-stara-biala-01.webp`, `montaz-okna-ekipa-inter-windows-01.webp` (zamiast `DAKO_okno_PVC-26.webp`, `IMG_2034.jpg`). Pipeline `scripts/images.mjs` z Profilu może nazwy normalizować.
- `alt` opisuje to, co widać, w kontekście: „Okna aluminiowe w kolorze antracytu w domu jednorodzinnym w Starej Białej". Jedna miejscowość lub produkt w alt, bez list słów. Zdjęcia dekoracyjne: `alt=""`.
- WebP lub AVIF, `srcset` 480/960/1600, zawsze `width`/`height`. Hero ≤ 200 KB. `loading="lazy"` poniżej zgięcia, nigdy dla LCP.
- Zdjęcia własne z realizacji i z ekipą zamiast materiałów producenta (zdjęć DAKO używa każdy dealer).

### 5.7 Core Web Vitals

Cel (mobile, dane CrUX po starcie): LCP < 2,5 s (dążyć do < 1,8 s), INP < 200 ms, CLS < 0,1. PageSpeed Insights mobile ≥ 90 na wszystkich szablonach.

| Ryzyko | Zalecenie |
|---|---|
| Slider w hero (obecna strona: Swiper + jQuery + Bootstrap) | jedno zdjęcie hero, `fetchpriority="high"`, bez slidera |
| Animacje „reveal" z Profilu | **nie stosować na H1 ani hero**: element LCP z `opacity: 0` opóźnia LCP. Treść musi być widoczna bez JS (Profil dodaje klasę `.js`, zachować). |
| Fonty (obecnie Poppins w 18 odmianach z Google Fonts) | self-hosting woff2, **subset latin-ext** (ą, ę, ł, ż…), maks. 2 rodziny i 4 odmiany, `font-display: swap`, preload głównej odmiany, fallback z `size-adjust` przeciw CLS |
| Mapa Google | decyzja klienta 27.10.2026: osadzona mapa (iframe bez klucza API, `GoogleMap.astro`) tylko poniżej zgięcia, `loading="lazy"`, w pudełku o stałym `aspect-ratio` (bez CLS), z linkiem „Otwórz w Mapach Google"; opisana w polityce prywatności |
| Konfigurator | wyspa Astro (`client:visible` lub `client:load`) tylko na `/konfigurator/`, kod dzielony. Tekst SEO renderowany statycznie. Inne strony linkują do konfiguratora, nie osadzają go. |
| Skrypty zewnętrzne | GA4 przez Consent Mode v2 po zgodzie, bez widgetów czatu i osadzeń Instagrama (statyczne miniatury z linkiem) |
| Baner cookies | nakładka u dołu ekranu, która nie przesuwa treści (CLS) |
| Kompresja i cache | bloki `mod_deflate` / `mod_expires` z Profilu, Brotli jeśli LiteSpeed go obsługuje |

### 5.8 Slugi i URL-e

- Wyłącznie ASCII, małe litery, myślniki: ą→a, ć→c, ę→e, ł→l, ń→n, ó→o, ś→s, ź/ż→z. Funkcja `groupId` z Profilu robi to poprawnie (osobne `ł→l` przed `normalize('NFD')`). Wydzielić ją do `src/lib/slug.ts` i używać wszędzie.
- Zawsze końcowy ukośnik (`trailingSlash: 'always'`, `build.format: 'directory'`), linki wewnętrzne pisane z `/` na końcu.
- Bez dat w slugach poradnika (rok tylko w title i treści, aktualizowany co roku).

### 5.9 Pozostałe

- 404: strona `404.astro` z linkami do kategorii, prawdziwy status 404 (ErrorDocument).
- Formularz PHP: endpoint z nagłówkiem `X-Robots-Tag: noindex`, przekierowanie na `/dziekujemy/` (noindex) albo komunikat w miejscu, zdarzenie konwersji w GA4. Pole „Miejscowość" w formularzu pozwala mierzyć zasięg geograficzny leadów.
- Pomiar: zdarzenia `click_tel`, `click_email`, `form_submit`, `configurator_submit`. UTM w linku z wizytówki (`?utm_source=google&utm_medium=organic&utm_campaign=gbp`), który canonical i tak czyści.
- Opinie na stronie: przy sekcji opinii informacja o źródle i weryfikacji (np. „Opinie pochodzą z wizytówki Google / od klientów, u których wykonaliśmy montaż"). Tego wymaga ustawa o przeciwdziałaniu nieuczciwym praktykom rynkowym po wdrożeniu dyrektywy Omnibus.

### 5.10 Lista kontrolna przed startem

- [ ] `site`/`productionUrl` = `https://www.interwindows.pl`, `.htaccess` produkcyjny wgrany, przekierowania z 5.1 przetestowane (curl: `-I` dla każdego wiersza tabeli)
- [ ] Każdy URL P1 ma unikalny title, meta i H1 z 4.2. Jeden H1.
- [ ] Canonical i `og:url` absolutne, produkcyjne, z ukośnikiem
- [ ] JSON-LD przechodzi Rich Results Test (globalny `@graph`, BreadcrumbList, Service, BlogPosting)
- [ ] `sitemap.xml` zawiera tylko strony 200 i indeksowalne; `robots.txt` wskazuje sitemapę
- [ ] NAP w stopce jako tekst, identyczny z wizytówką Google
- [ ] Wszystkie obrazy mają `alt`, `width`, `height`; nazwy ASCII
- [ ] PSI mobile ≥ 90 dla: główna, kategoria, realizacja, artykuł, konfigurator
- [ ] Podgląd/staging: `noindex` + `Disallow: /`; produkcja: bez noindex (sprawdzić po wdrożeniu!)
- [ ] GSC: weryfikacja domeny, sitemap, inspekcja głównej i 5 kategorii; Bing Webmaster Tools
- [ ] Link na wizytówce Google zaktualizowany (`https://www.interwindows.pl/?utm_…`)

---

## 6. Off-site i lokalnie – najważniejsze działania

### 6.1 Profil firmy w Google (GBP)

| Obszar | Zalecenie |
|---|---|
| Nazwa | zgodna z rzeczywistą nazwą: „Inter Windows" (obecnie „Inter Windows s.c. Bartosz Bezdziek, Paweł Majchrzak", warto skrócić do nazwy używanej na szyldzie). **Bez słów kluczowych** typu „okna Płock" w nazwie, bo grozi to zawieszeniem profilu. |
| Kategoria główna | „Dostawca okien" (EN: *Window supplier*); dokładną polską nazwę wybrać z listy w panelu. Alternatywa do rozważenia: „Usługa montażu okien" (*Window installation service*). Zmieniać najwyżej raz, po 8 tygodniach obserwacji wyników. |
| Kategorie dodatkowe | Usługa montażu okien · Dostawca drzwi (*Door supplier*) · Dostawca bram garażowych (*Garage door supplier*) · Sklep z roletami / żaluzjami (*Blinds shop*) · ewentualnie Montaż drzwi lub Wykonawca (sprawdzić dostępność w panelu) |
| Adres i obszar | adres widoczny, jeśli klienci mogą przyjść do biura (**potwierdzić godziny**). Obszar obsługi: Płock + do 20 gmin i miast z sekcji 2.3 (Stara Biała, Słupno, Radzanowo, Łąck, Bielsk, Brudzeń Duży, Gąbin, Słubice, Gostynin, Sierpc, Drobin, Bodzanów, Wyszogród…). |
| Usługi | pomiar i wycena (bezpłatnie), montaż okien, ciepły montaż (jeśli wykonywany), wymiana okien, montaż drzwi, rolet, żaluzji fasadowych, bram. Każda z 1–2 zdaniami opisu. |
| Produkty | 8–12 kart (DPQ-82, okna aluminiowe, HST, drzwi wejściowe, żaluzje fasadowe, brama Thermo…) ze zdjęciem i linkiem do odpowiedniej kategorii |
| Opis (750 znaków) | 20 lat doświadczenia, dwóch właścicieli, własne ekipy bez podwykonawców, autoryzowany partner DAKO, Płock i okolice. Bez wykrzykników i bez list słów. |
| Zdjęcia | szyld i wejście do biura (weryfikacja i zaufanie), wnętrze biura, ekipa przy pracy (stroje, auta firmowe), przed i po, 3–5 zdjęć z każdej realizacji, krótkie filmy 20–30 s. Min. 4 nowe zdjęcia miesięcznie. |
| Posty | 2 razy w miesiącu: „Realizacja: okna aluminiowe w Starej Białej" z linkiem do podstrony realizacji. Sezonowe: rolety i żaluzje (wiosna), montaż przed zimą (wrzesień), dofinansowania (przy zmianach programów). |
| Wiadomości i rezerwacje | przycisk „Umów pomiar" → `/kontakt/?utm…` |
| Odpowiedzi na opinie | wszystkie w ciągu 48 h, podpisane imieniem właściciela, z naturalnym odniesieniem do ekipy i miejscowości |

### 6.2 Kluczowe katalogi i cytowania (identyczny NAP)

| Miejsce | Priorytet | Uwagi |
|---|---|---|
| Google Business Profile | 1 | podstawa local pack |
| DAKO „Gdzie kupić?" (dako.eu/pl/gdzie-kupic) | 1 | wpis autoryzowanego partnera z linkiem do strony: najcenniejszy link branżowy |
| Bing Places, Apple Business Connect (Mapy Apple) | 1 | Apple Maps ma znaczenie dla zamożniejszych klientów z iPhone'ami |
| Facebook (strona firmowa), Instagram (jest) | 1 | dane w `sameAs`, posty z realizacjami |
| Panorama Firm, PKT.pl, Aleo.com, Firmy.net, Cylex | 2 | podstawowe polskie katalogi NAP |
| Oferteo.pl (profil z opiniami) | 2 | Oferteo rankuje na „okna PCV Płock", „drzwi Płock", więc profil tam to dodatkowa widoczność |
| Homebook.pl (profil wykonawcy) | 2 | platforma wnętrz i architektury, publiczność premium |
| Lokatory dealerów producentów: Wikęd, Gerda, Erkado, DRE, Porta, Barański, Aluprof | 2 | poprosić o wpis z linkiem |
| Lokalne media: Portal Płock, PetroNews, Tygodnik Płocki | 3 | artykuł o firmie („dwóch ekspertów po 20 latach…") lub opis ciekawej realizacji |
| Lokalni partnerzy: architekci, biura projektowe, deweloperzy domów, firmy budowlane | 3 | wzajemne polecenia i linki ze stron partnerów |

### 6.3 Opinie: proces oparty na własnej ekipie

Każdy montaż robi nasza ekipa, więc to ekipa (a nie anonimowy podwykonawca) kończy proces i prosi o opinię. Tego konkurent z podwykonawcami nie skopiuje.

| Etap | Działanie |
|---|---|
| Pomiar | Doradca mówi klientowi, kto przyjedzie na montaż (imiona), i zapowiada protokół odbioru. |
| Dzień montażu | Brygadzista prowadzi **odbiór z protokołem** (szczelność, regulacja, sprzątanie, instrukcja użytkowania) i zostawia kartę „Twoja ekipa: {imiona}" z kodem QR do opinii Google i kartą gwarancyjną. W protokole jest zgoda klienta na zdjęcia do realizacji (tylko miejscowość, bez adresu). |
| 24–48 h po montażu | SMS lub e-mail od właściciela: podziękowanie, 2–3 zdjęcia z montażu zrobione przez ekipę, link do opinii. Prośba o kilka słów: co montowaliśmy i jak pracowała ekipa (bez narzucania treści). |
| Publikacja | Zdjęcia trafiają do realizacji na stronie (`realizacje.ts`) i do posta w wizytówce. Opinia (za zgodą) do realizacji i na stronę miejscowości. Powstaje obieg: opinia → realizacja → strona lokalna → post. |
| Po pierwszej zimie | Bezpłatny przegląd i regulacja przez tę samą ekipę. Premium, pokazuje odpowiedzialność za montaż i daje drugi kontakt (polecenia, aktualizacja opinii, zdjęcia „po roku"). |
| Kampania startowa | Jednorazowa prośba (SMS/e-mail) do klientów z ostatnich 24 miesięcy: wszystkich, nie tylko zadowolonych. |

Zasady: bez nagród i rabatów za opinie, bez „gatingu" (wysyłania linku tylko zadowolonym). Zakazują tego zasady Google, a w Polsce także przepisy o nieuczciwych praktykach rynkowych. Cel orientacyjny: 4–6 nowych opinii miesięcznie, średnia ≥ 4,8, odpowiedź na każdą.

---

## 7. Do potwierdzenia z klientem

| # | Pytanie | Wpływa na |
|---|---|---|
| 1 | Czy ekipy robią ciepły (warstwowy) montaż i montaż w warstwie ocieplenia? Jakie materiały i systemy (taśmy, np. illbruck / Soudal / Tremco)? Szkolenia, certyfikaty? | `/cieply-montaz-okien/`, `/montaz-okien/` |
| 2 | Czy sprzedajecie i montujecie drzwi HST / SmartMove / SkyLine (DAKO)? Są realizacje? | `/drzwi-tarasowe/` |
| 3 | Jakie systemy aluminiowe (DAKO DA-77, DA-70N czy bezpośrednio Aluprof)? Systemy drewniane? | treści kategorii, title `/okna-aluminiowe/` |
| 4 | Godziny otwarcia biura; czy przy Przemysłowej 22 jest ekspozycja i czy klienci mogą przyjść bez umawiania? | NAP, schema, wizytówka Google, `/kontakt/` |
| 5 | Ile ekip i monterów, imiona i zdjęcia (zgody), gwarancja na montaż (ile lat)? | `/montaz-okien/`, `/o-firmie/` |
| 6 | Lista realizacji z 2–3 lat z miejscowościami i zgodami (min. 6 na start; min. 3 z regionu Gostynina dla strony P1\*) | `/realizacje/`, strony miejscowości |
| 7 | Maksymalny zasięg, dopłaty za dojazd, typowy termin pomiaru | `/obszar-dzialania/`, strony miejscowości |
| 8 | Czy konfigurator pokazuje ceny orientacyjne? Zgoda na widełki cen na stronach („od … zł") | `/okna/`, `/konfigurator/`, poradnik #1 |
| 9 | Szczegóły oferty: parapety, pergole, moskitiery, rolety wewnętrzne | strony P2 |
| 10 | Czy serwisujecie okna innych firm? | P2 `/serwis-okien/` |
| 11 | Dostęp do wizytówki Google (właściciel/menedżer), Facebook (czy istnieje), GSC/GA4 | sekcja 6, pomiar |
| 12 | Forma nazwy marki: „Inter Windows" czy „InterWindows" w NAP | NAP, schema, katalogi |

---

## 8. Pomiar i harmonogram

| Okres | Działania |
|---|---|
| Start (P1) | wszystkie strony P1, 6+ realizacji, 4 artykuły, przekierowania, GSC i Bing, aktualizacja wizytówki (link, kategorie, usługi, produkty, zdjęcia) |
| Miesiące 1–2 | katalogi z 6.2 (priorytety 1–2), kampania opinii, 2 posty i 2 realizacje miesięcznie |
| Miesiące 2–4 | 2 artykuły miesięcznie (P2), strony miejscowości po spełnieniu warunków (Gostynin → Gąbin/Słubice → Sierpc), strony P2 oferty po potwierdzeniu |
| Miesiące 4–6 | strony produktów (DPQ-82, HST), przegląd GSC: frazy z wyświetleniami i bez kliknięć → poprawki title i meta; ewentualny test kategorii głównej w wizytówce |

KPI (raport miesięczny): wyświetlenia i kliknięcia w GSC dla ok. 30 fraz z sekcji 2, widoczność w local pack (siatka punktów wokół Płocka oraz Gostynin i Sierpc; ręcznie lub narzędziem typu grid-rank), połączenia i kliknięcia „trasa" z wizytówki, liczba formularzy i konfiguracji, liczba i średnia opinii, liczba leadów spoza Płocka (pole „Miejscowość" w formularzu).
