# Do uzupełnienia – lista dla Inter Windows

Stan na 27.10.2026. Jedna lista wszystkiego, czego brakuje albo co trzeba potwierdzić, zanim strona www.interwindows.pl
zastąpi obecną. Podgląd: https://kaczor90.github.io/interwindows/ (nieindeksowany, formularz tylko pokazuje komunikat).

**Jak czytać:**

- **[BLOKUJE]** – bez tego nie publikujemy strony (na stronie widać dziś zastępczy tekst, znacznik albo dane niezgodne z wizytówką).
- **[PO STARCIE]** – można uzupełnić po publikacji; strona wygląda poprawnie bez tego.
- Na stronie część zdań ma czerwony znacznik **„do potwierdzenia”**. Każdy taki punkt przed startem trzeba
  **potwierdzić albo usunąć** – inaczej znacznik zobaczą klienci. Po potwierdzeniu wystarczy zmienić w pliku
  `tbc: true` / `confirmed: false` na `false` / `true` (znacznik znika). Dziś jest ich 39 (`src/data/montaz.ts`,
  `src/data/konfigurator.ts`, `src/pages/montaz-okien.astro`, `src/pages/wymiana-okien.astro`, `/obszar-dzialania/`, poradnik).
- Odpowiedzi najlepiej wpisywać wprost pod punktem albo wysłać mailem z numerem punktu.

---

## 1. Dane firmy i NAP (nazwa, adres, telefon)

NAP musi być identyczny na stronie, w wizytówce Google, na Facebooku i w katalogach. Dane na stronie: `src/data/site.ts`.

- [ ] **[BLOKUJE] Kod pocztowy: 09-400 czy 09-401?** Wizytówka Google ma **09-401**, rejestr VAT, GoWork i strona **09-400**.
  Na stronie jest 09-400. Sprawdźcie w wyszukiwarce kodów Poczty Polskiej i poprawcie wizytówkę (zmiana może wywołać
  ponowną weryfikację – zróbcie ją razem ze zmianą nazwy, patrz `docs/wizytowka-google-plan.md` §3.5).
- [ ] **[BLOKUJE] Facebook: zdjęcie w tle pokazuje inny adres – ul. Pniewskiego 42, 09-410 Płock** (wizytówka wspólnika).
  Czy to aktualny adres? Jeśli nie – podmienić zdjęcie w tle na realizację lub ekipę (`docs/facebook-analiza.md`).
- [ ] **[BLOKUJE] Facebook: e-mail pawel@… zamiast biuro@interwindows.pl.** Na stronie jest wszędzie biuro@. Ujednolicić na FB.
- [ ] **[BLOKUJE] Forma nazwy: „Inter Windows” (ze spacją) czy „InterWindows”.** Strona używa wszędzie „Inter Windows”
  (pisownia „InterWindows” tylko jako nazwa alternatywna w danych strukturalnych). Tak samo trzeba nazwać wizytówkę i FB.
- [ ] **[BLOKUJE] Godziny pracy biura** – na stronie są godziny z wizytówki Google: pn.–pt. 8:00–16:00, sob. 8:00–13:00.
  Potwierdzić. Widać je w stopce, na `/kontakt/`, przy formularzu i w danych dla Google (`site.ts`: `hours`, `hoursRows`, `openingHours`).
- [ ] **[BLOKUJE] Osoby na `/kontakt/`:** Paweł Majchrzak (697 886 093), Bartosz Bezdziek (606 643 641), Kacper Dylewski (797 566 365).
  Czy wszyscy trzej zgadzają się na publikację imienia, nazwiska i numeru? Jaka jest rola Kacpra Dylewskiego (dziś bez podpisu)?
  Wiemy już, że Bartosz Bezdziek prowadzi montaże – czy Paweł Majchrzak odpowiada za doradztwo i sprzedaż (tekst na `/o-firmie/`)?
- [ ] **[PO STARCIE] WhatsApp:** Facebook podaje WhatsApp pod numerem **606 643 641** (Bartosz). Czy pokazać go na stronie
  (np. przycisk przy telefonie)? Dziś strona go nie pokazuje.
- [ ] **[PO STARCIE] Salon / ekspozycja** przy ul. Przemysłowej 22: czy można przyjść bez umawiania? Dziś strona pisze
  „Biuro sprzedaży” i radzi umówić się telefonicznie.
- [ ] **[PO STARCIE] Dostęp do wizytówki Google, Google Search Console i GA4** (właściciel/menedżer) – plan prac: `docs/wizytowka-google-plan.md`.
- [ ] **[PO STARCIE] Facebook:** czy https://www.facebook.com/profile.php?id=61580449427158 to docelowy adres (warto ustawić nazwę użytkownika)?

## 2. Ekipa i montaż

- [ ] **[BLOKUJE] Monterzy 2 i 3 to FIKCYJNE DANE PRZYKŁADOWE** („Marek W., monter – brygadzista, 14 lat” i „Tomasz K.,
  monter stolarki, 8 lat”) wpisane na prośbę klienta, żeby pokazać układ. **Podmienić przed startem** na prawdziwe imiona
  (lub imię + inicjał), role i staż. Plik: `src/data/ekipa.ts` (pole `fictional: true`). Karty są na stronie głównej,
  `/montaz-okien/` i `/o-firmie/`.
- [ ] **[BLOKUJE] Pisemna zgoda (RODO) każdej z trzech osób** na publikację imienia i wizerunku – także Bartosza Bezdzieka,
  którego zdjęcie jest już na stronie (`public/img/ekipa/monter-1.webp`).
- [ ] **[BLOKUJE] Staż Bartosza Bezdzieka:** karta mówi „20 lat doświadczenia w branży” (z dotychczasowej strony, gdzie „20 lat”
  dotyczy obu wspólników). Potwierdzić albo podać właściwą liczbę.
- [ ] **[BLOKUJE] Gwarancja na montaż** – ile lat i na jakich warunkach. Krok 05 procesu i karta na `/montaz-okien/` mają dziś
  „okres do uzupełnienia” (`src/data/montaz.ts`, `src/pages/montaz-okien.astro`).
- [ ] **[BLOKUJE] Demontaż i wywóz starej stolarki** („stara stolarka wyjeżdża z nami, nie zostaje na posesji”), zabezpieczanie
  podłóg i mebli, sprzątanie po pracy – potwierdzić (krok 02, `/montaz-okien/` „Jak chronimy dom”, `/wymiana-okien/`).
  Po potwierdzeniu wrócimy też do słowa „utylizacja” w opisie `/wymiana-okien/` dla Google.
- [ ] **[BLOKUJE] Odbiór z protokołem:** czy jest protokół odbioru, kto go podpisuje (brygadzista i klient), czy jest instruktaż
  obsługi (krok 04 i `/montaz-okien/`).
- [ ] **[BLOKUJE] Ile ekip?** Firma ma trzech monterów. Strona mówi „własne ekipy montażowe” (liczba mnoga, także w tytułach dla Google).
  Jeśli pracuje jedna ekipa, zmienimy na „własna ekipa”.
- [ ] **[PO STARCIE] Ciepły (warstwowy) montaż i montaż w warstwie ocieplenia** – czy ekipy go wykonują, z jakich materiałów
  (taśmy, pianki, konsole; post z realizacji wspomina „szczelny montaż w systemie Soudal”). Strona `/cieply-montaz-okien/` jest
  gotowa, ale **ukryta**: nie ma jej w menu, stopce ani w sitemap.xml i ma `noindex`. Po potwierdzeniu wystarczy jedna zmiana:
  `features.cieplyMontaz = true` w `src/data/site.ts` (strona i wszystkie linki do niej włączą się same), uzupełnić sekcję
  „Materiały” i przywrócić opis z planu SEO. Na `/montaz-okien/` usuniemy wtedy znacznik w sekcji „Metody montażu”.
- [ ] **[PO STARCIE] Sprzęt do dużych przeszkleń** (minidźwig, przyssawka próżniowa, mini żuraw Hoeflon C4): własny czy wynajmowany?
  Jeśli własny – warto to napisać.
- [ ] **[PO STARCIE] Przegląd po pierwszej zimie** – czy firma chce go oferować (karta na `/montaz-okien/`).
- [ ] **[PO STARCIE] Zapis w umowie** „montaż wykonują wyłącznie pracownicy Inter Windows” – czy jest lub będzie (ramka „Jak to sprawdzić”).
- [ ] **[PO STARCIE] Wymiana okien:** orientacyjne czasy („kilka godzin na okno, mieszkanie w jeden dzień, dom w 1–kilka dni”),
  zakres obróbek ościeży (tynk, płyta, listwy, malowanie) i parapetów (`/wymiana-okien/`).

## 3. Oferta i technika

Strony kategorii: dane w `src/data/oferta.ts`.

- [ ] **[BLOKUJE] Drzwi tarasowe:** HST jest potwierdzone postem z realizacji (`/realizacje/okna-dako-hst-dom-parterowy/`).
  Czy sprzedajecie i montujecie też PSK, SmartMove, SkyLine i drzwi harmonijkowe? Producenci (na stronie: DAKO, Sonarol,
  All Windows Group)? Konfigurator pokazuje HST z dopiskiem „dostępność do potwierdzenia” – po odpowiedzi go zdejmiemy.
- [ ] **[BLOKUJE] Drzwi wewnętrzne bezprzylgowe i ukryte, drzwi przesuwne** – czy są w ofercie? Na `/drzwi-wewnetrzne/` jest
  o nich sekcja z ilustracją. Jeśli nie – usuwamy sekcję.
- [ ] **[PO STARCIE] Okna aluminiowe:** DAKO DA-77, DA-70N czy bezpośrednio Aluprof? (`/okna-aluminiowe/`)
- [ ] **[PO STARCIE] Okna drewniane:** DAKO DDF-68, DDR-68, DDA-78; czy jest drewno-aluminium; pielęgnacja i serwis (`/okna-drewniane/`).
- [ ] **[PO STARCIE] Okna PCV:** opis profilu VEKA Softline 82 MD („klasa A”, „82 mm”, „MD = uszczelka środkowa”), okucia i szyby RC2;
  zdanie „antracyt i złoty dąb najczęściej widać na naszych montażach” (`/okna-pcv/`).
- [ ] **[PO STARCIE] Bramy DAKO:** linie Thermo 60 / Standard 40, bramy rolowane, napędy i sterowanie z telefonu.
- [ ] **[PO STARCIE] Rolety:** sterowanie DAKO Smart Home; moskitiery zintegrowane z roletami.
- [ ] **[PO STARCIE] Żaluzje fasadowe:** lamele Z90 / C80 u waszych dostawców (też w poradniku).
- [ ] **[PO STARCIE] Drzwi zewnętrzne:** aluminiowe DAKO; drzwi do mieszkań w blokach (z demontażem starych).
- [ ] **[PO STARCIE] Moskitiery, rolety wewnętrzne, pergole, parapety** – szczegóły i producenci (dziś tylko wzmianka; ewentualne
  podstrony `/moskitiery/`, `/pergole/`, `/parapety/`). Okna dachowe – czy w ofercie? Serwis okien innych firm?
- [ ] **[PO STARCIE] Wizualizacje drzwi przed montażem** (grafika „Tak mogą wyglądać Twoje drzwi…”) – czy to stała usługa?
- [ ] **[PO STARCIE] Obszar działania** (`/obszar-dzialania/`, `src/data/obszar.ts`): odległości i czasy dojazdu są z map (zaokrąglone) –
  sprawdzić; czy jeździcie do Raciąża i Płońska; czy pomiar jest bezpłatny także poza Płockiem, dopłaty za dojazd, maksymalny
  zasięg, typowy termin pomiaru (karta ma znacznik).

## 4. Zdjęcia

- [ ] **[BLOKUJE] Zdjęcia monterów 2 i 3** (pion 4:5, min. 1200×1500 px, plac budowy lub jednolite tło, ta sama odzież) – do
  `public/img/ekipa/` i `src/data/ekipa.ts`. Najlepiej jedna sesja z Bartoszem, żeby trzy portrety wyglądały spójnie.
- [ ] **[BLOKUJE] Portret Pawła Majchrzaka** (`/o-firmie/`, karta właściciela – dziś zastępcze tło). Portret Bartosza już jest.
- [ ] **[PO STARCIE] Ilustracje AI do podmiany na własne zdjęcia.** Są poglądowe (w stopce: „część ilustracji ma charakter poglądowy”),
  nigdy na `/realizacje/` ani w kartach ekipy. Pliki w `public/img/ai/`, opisy w `src/data/ai-zdjecia.ts`:

  | Ilustracja | Gdzie | Na co podmienić |
  |---|---|---|
  | `ai-montaz-ekipa-dojazd` | strona główna – tło sekcji „Własne ekipy montażowe”; tło nagłówka `/montaz-okien/` | ekipa i bus przed domem klienta |
  | `ai-montaz-osadzanie` | strona główna – duże zdjęcie w sekcji „Własne ekipy” | montażyści przy osadzaniu okna |
  | `ai-montaz-pomiar`, `ai-montaz-tasma`, `ai-montaz-odbior`, `ai-montaz-poziomowanie` | kroki 01, 03, 04, 05 procesu (strona główna, `/montaz-okien/`), `/cieply-montaz-okien/` | pomiar, uszczelnianie, odbiór, kotwienie – z własnych montaży |
  | `ai-konfigurator-profil-probki` | strona główna (slajd 4 i zapowiedź konfiguratora), `/okna-pcv/` „Kolory i okleiny” | próbnik kolorów / narożnik profilu z biura |
  | `ai-przeszklenia-salon` | `/okna/`, `/okna-aluminiowe/` | wykończona realizacja z dużym przeszkleniem |
  | `ai-hst-taras` | `/drzwi-tarasowe/`, poradnik „HST czy PSK” | realizacja HST |
  | `ai-okna-drewniane-willa` | `/okna-drewniane/` | realizacja okien drewnianych |
  | `ai-rolety-zewnetrzne`, `ai-zaluzje-fasadowe` | `/rolety-zewnetrzne/`, `/zaluzje-fasadowe/` | własne realizacje rolet i żaluzji |
  | `ai-drzwi-wewnetrzne-bezprzylgowe` | `/drzwi-wewnetrzne/` | realizacja drzwi bezprzylgowych (jeśli w ofercie) |
  | `ai-poradnik-okno-zima`, `ai-poradnik-salon-probki`, `ai-poradnik-dom-zmierzch` | nagłówki artykułów poradnika i `/poradnik/` | własne zdjęcia |
- [ ] **[PO STARCIE] Oryginały zdjęć z telefonów** zamiast kopii z Facebooka (686–1080 px): realizacje P3, P6, P7, P8 i zdjęcia „przed” –
  lista w `docs/realizacje-do-potwierdzenia.md`.
- [ ] **[PO STARCIE] Brakujące zdjęcia na stronach kategorii:** `/okna-drewniane/`, `/rolety-zewnetrzne/`, `/zaluzje-fasadowe/` – blok
  „Realizacje w Płocku i okolicach” ma po kilka pól zastępczych (3–4 zdjęcia z tymi produktami).
- [ ] **[PO STARCIE] Materiał okien na zdjęciach w nagłówkach kategorii** (np. czy `okno-trojdzielne-zloty-dab-elewacja-01` na `/okna-pcv/`
  to PCV): `przeszklenie-szczytowe-zloty-dab-01`, `drzwi-zewnetrzne-orzech-wejscie-wykonczone`, `drzwi-wewnetrzne-dab-korytarz`,
  `bramy-segmentowe-antracyt-elewacja-terakota-01`.
- [ ] **[PO STARCIE] Sesja zdjęciowa** 3–5 wykończonych realizacji + reportaż z montażu (`docs/marka.md` §7). Zdjęć DAKO ze znakiem
  „© DAKO” nie używamy.
- [ ] **[PO STARCIE] Logo:** zgoda DAKO na logo „autoryzowany partner” i oficjalny plik wektorowy; lepsze pliki logo Doorsystem i Barański.

Prywatność: twarz osoby widocznej przez szybę w zdjęciu zielonych drzwi (IMG_4279) jest rozmyta; nierozmyty plik usunięto ze strony
i skrypt `scripts/images.mjs` już go nie tworzy.

## 5. Realizacje

Szczegóły dla każdego z 7 projektów: **`docs/realizacje-do-potwierdzenia.md`**. W skrócie:

- [ ] **[BLOKUJE] Zgoda inwestorów na publikację zdjęć** (bez adresu, najwyżej miejscowość); przy kamienicy także wspólnoty/zarządcy;
  przy zamieszkanym domu (P6) – domowników. Na przyszłość: punkt o zgodzie w protokole odbioru.
- [ ] **[PO STARCIE] Miejscowości** (albo gmina/osiedle) – dziś tylko „Płock” przy kamienicy. Z miejscowością strony lepiej działają w Google.
- [ ] **[PO STARCIE] Systemy, modele i producenci** przy każdej realizacji (dziś to, co było w postach na FB; reszta ze znacznikiem).
- [ ] **[PO STARCIE] Terminy** (miesiąc wykonania) – sprawdzić; P4 można dodać, gdy wskażecie zdjęcia z tej budowy.

## 6. Opinie

- [ ] **[BLOKUJE] Zgoda autorów opinii** na zacytowanie na stronie z imieniem i pierwszą literą nazwiska (+ miejscowość):
  Anna Ś., Martyna W., Włodzimierz S., Luiza D., Przemysław, Tomasz G., Paweł K., Paweł H. To opinie z wizytówki Google
  (cytowane bez zmian, `src/data/opinie.ts`). Bez zgody danej osoby usuniemy jej opinię ze strony.
- Gwiazdek i średniej ocen z Google celowo nie pokazujemy (zasady Google dla danych strukturalnych) – strona linkuje „Opinie w Google”.

## 7. Konfigurator (`/konfigurator/`)

Prototyp działa (11 kroków, rysunek, wysyłka projektu do biura). Pełna lista pytań i plan wersji docelowej:
**`docs/konfigurator-wymagania.md`** (§1 dane produktowe, §2 decyzje, §8 pytania). Najważniejsze:

- [ ] **[BLOKUJE] Kto odbiera zapytania z konfiguratora i formularzy** i w jakim czasie oddzwania; czy wysyłać klientowi autoodpowiedź.
- [ ] **[PO STARCIE] Zakres produktów:** które systemy PCV, aluminium i drewna pokazujemy; HST/PSK (patrz pkt 3).
- [ ] **[PO STARCIE] Wymiary graniczne i otwieranie** dla każdego systemu (dziś wartości przykładowe), najlepiej z kart technicznych DAKO.
- [ ] **[PO STARCIE] Kolory, szyby, okucia:** listy z kodami, standardowy pakiet szyb, P2A/P4A, RC1N/RC2, zawiasy ukryte.
- [ ] **[PO STARCIE] Narzędzia DAKO:** dostęp do e-PAM / Partner DAKO / Extranetu i eksport danych.
- [ ] **[PO STARCIE] Pomiar:** w które dni, czy zawsze bezpłatny; czy w formularzu wystarczą preferowane dni.

## 8. Treści

- [ ] **[PO STARCIE] Widełki cen do artykułu „Ile kosztuje wymiana okien”** (ramka „Przykładowe koszty z naszych realizacji – do uzupełnienia”),
  np. okno 2-skrzydłowe ok. 150×140 cm z montażem: od … do … zł. Po dodaniu przywrócimy tytuł i opis z planu SEO
  („…Ceny z Płocka”). Ewentualnie te same widełki w sekcjach „Ile kosztują…” na stronach kategorii.
- [ ] **[PO STARCIE] Przegląd merytoryczny poradnika** przez właściciela (VAT 8%, ulga termomodernizacyjna, Czyste Powietrze,
  Uw ≤ 0,9) i autor artykułów – dziś „Inter Windows”; jeśli Paweł lub Bartosz się zgodzą, podpiszemy imieniem i nazwiskiem.
- [ ] **[PO STARCIE] Liczby 500+ klientów i 650+ projektów** ze starej strony – czy dotyczą samej spółki? Dziś ich nie ma na stronie.
- [ ] **[PO STARCIE] „20 lat doświadczenia”** – na stronie zawsze jako doświadczenie wspólników (nie wiek firmy). Potwierdzić dla obu.
- [ ] **[PO STARCIE] Polityka prywatności** (`/polityka-prywatnosci/`): okres przechowywania zapytań (wpisano 12 miesięcy), nazwa
  firmy hostingowej – akceptacja treści przed startem jest wskazana; po dodaniu GA4 – aktualizacja i baner cookies.

## 9. Decyzje

- [ ] **[BLOKUJE] Motyw kolorystyczny: „Granat” (granat + bordowy akcent) czy „Mono” (czarno-biały jak logo).** Oba są gotowe.
  Do porównania w podglądzie: przełącznik „Motyw” w stopce (na komputerze także okrągły przycisk na dole lewego paska) albo
  `?motyw=mono` / `?motyw=profil` w adresie. Wybór to jedna linijka: `theme` w `src/data/site.ts` (`'profil'` = Granat).
- [ ] **[BLOKUJE] Poziomy układ logo w nagłówku** (`_tresci/logo/logo-poziome-propozycja.png`) – akceptacja albo zlecenie wektoryzacji sygnetu.
- [ ] **[PO STARCIE] Ceny w konfiguratorze: pokazywać czy nie?** Rekomendacja: nie (argumenty: `docs/konfigurator-wymagania.md` §2.1);
  ewentualnie widełki dla kilku typowych przypadków w treści stron.
- [ ] **[PO STARCIE] Bordowy akcent** – zostawić czy zmienić na inny kolor (jedna wartość w `src/styles/global.css`).

## 10. Publikacja i technika

- [ ] **[BLOKUJE] Hosting z PHP i funkcją `mail()`** oraz skrzynka **formularz@interwindows.pl** (nadawca wiadomości z formularzy;
  odbiorca: biuro@). Plik `public/kontakt.php`. Docelowo lepiej SMTP (`docs/konfigurator-wymagania.md` §4.1) i rekordy SPF/DKIM/DMARC.
- [ ] **[BLOKUJE] Przekierowania ze starej strony** (`public/.htaccess`, plan SEO §5.1) – test po wgraniu; www + https.
- [ ] **[BLOKUJE] Google Search Console i Bing Webmaster Tools** – dodać domenę i wysłać `sitemap.xml` w dniu startu (SEO §5.10).
- [ ] **[PO STARCIE] GA4 z Consent Mode** – po decyzji o analityce (wtedy baner cookies i zmiana polityki prywatności).

---

Powiązane dokumenty: `docs/realizacje-do-potwierdzenia.md` (realizacje), `docs/konfigurator-wymagania.md` (konfigurator),
`docs/wizytowka-google-plan.md` i `docs/wizytowka-google-materialy.md` (wizytówka Google), `docs/facebook-analiza.md` (Facebook),
`docs/seo-plan.md` (SEO), `docs/marka.md` (marka). Opis plików: `README.md`.
