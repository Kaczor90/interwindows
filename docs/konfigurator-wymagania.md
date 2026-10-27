# Konfigurator okien – od prototypu do wersji produkcyjnej

Dokument dla właścicieli Inter Windows i dla programisty, który będzie rozwijał konfigurator.
Stan na 27.10.2026. Prototyp działa pod adresem `/konfigurator/`. Założenia projektowe pochodzą
z `docs/konkurencja-i-konfiguratory.md` §3–4, teksty SEO z `docs/seo-plan.md`.

Najważniejsze w skrócie:

- Prototyp prowadzi przez cały proces: typ, kształt, wymiary, system, kolor, szyby, okucia, dodatki,
  montaż, lista pozycji i formularz „Umów konsultację i pomiar”. Nie pokazuje cen.
- Prawie wszystkie dane produktowe są **przykładowe** i oznaczone „do potwierdzenia”. Pełna lista jest w §7.
  Bez tych danych od Inter Windows (lub DAKO) konfigurator nie powinien trafić na produkcję.
- Zanim publicznie ruszy pierwsza wersja (MVP), trzeba jeszcze zrobić 4 rzeczy:
  1. potwierdzić dane produktowe,
  2. wysyłać pocztę przez SMTP,
  3. dołączać do maila obrazek rysunku,
  4. dopisać do polityki prywatności informacje o konfiguratorze.

---

## 0. Co już jest (prototyp)

| Element | Plik |
| --- | --- |
| Strona (SEO, wstęp, „Jak to działa”, blok o montażu, FAQ) | `src/pages/konfigurator.astro` |
| Dane opcji (typy, szablony, limity, systemy, kolory, szyby, okucia, dodatki, montaż) | `src/data/konfigurator.ts` |
| Markup kroków i style | `src/components/konfigurator/Configurator.astro`, `OptionGroup.astro`, `RequestForm.astro` |
| Rysunek SVG (czyste funkcje, działają też przy budowaniu strony) | `src/components/konfigurator/rysunek.ts` |
| Opisy tekstowe (podsumowanie, treść maila) | `src/components/konfigurator/opis.ts` |
| Logika w przeglądarce (stan, kroki, lista, link, formularz) | `src/scripts/konfigurator.ts` (tylko na tej stronie, ok. 16 kB gzip) |
| Odbiór formularza | `public/kontakt.php` (pole `konfiguracja`, limit podniesiony do 60 000 znaków) |
| Zrzuty ekranu | `docs/konfigurator-zrzuty/` |

Jak to działa:

- **Kroki:** 1. Typ i inwestycja → 2. Kształt i otwieranie → 3. Wymiary (domyślnie „poda technik”) → 4. System →
  5. Kolor zewn./wewn. → 6. Szyby i szprosy → 7. Okucia → 8. Dodatki → 9. Montaż („Montują wyłącznie nasi monterzy –
  bez podwykonawców”) → 10. Projekt (lista pozycji: dodaj, duplikuj, edytuj, usuń, ilość) → 11. Podsumowanie i formularz.
- **Rysunek:** SVG generowany z danych. Zachowuje proporcje, pokazuje ramę, słupki, skrzydła i symbole otwierania
  (konwencja europejska: linia ciągła od wewnątrz, przerywana z zewnątrz). Widać na nim klamki i zawiasy (od wewnątrz),
  szprosy, roletę lub żaluzję z prowadnicami, moskitierę, parapety, linie wymiarowe z wartościami, a przy drzwiach
  sylwetkę 180 cm dla skali. Ma przełącznik „od wewnątrz / z zewnątrz”, a okleiny drewnopodobne są delikatnym wzorem.
  Kliknięcie skrzydła albo Enter/spacja na nim zmienia sposób otwierania. To samo da się wybrać z list w kroku 2.
- **Stan:** zapisuje się w `localStorage`. Bez niego konfigurator też działa. Link „Skopiuj link do projektu”
  (`#p=…`, skompresowany JSON) odtwarza projekt na innym urządzeniu.
- **Wysyłka:** POST do `kontakt.php`, tym samym kontraktem co formularz wyceny. Temat to `[Konfigurator]`, a pole
  `topic` ma postać „Konfigurator: N pozycji, M szt.”. Pole `konfiguracja` zawiera czytelne zestawienie pozycji,
  preferowaną porę kontaktu, link do projektu i jedną linię `JSON: {...}` do archiwum lub importu.
  W podglądzie (`PUBLIC_PREVIEW=true`) formularz pokazuje tylko komunikat, tak jak główny formularz wyceny.
- **Dostępność:** natywne grupy radio i checkbox, widoczny fokus, `aria-live` z opisem rysunku, przewijany pasek
  kroków, przyklejony dolny pasek „Wstecz / Dalej” na telefonie. Bez przewijania w poziomie od 360 px.
  Uwzględnia `prefers-reduced-motion`. Działa w obu motywach (`?motyw=mono`).
- **Zdarzenia dla analityki:** `window` dostaje `CustomEvent('konfigurator')` z `detail.event`:
  `start`, `step` (z nazwą i numerem kroku), `add`, `copy-link`, `submit`, `sent`. Na razie nic ich nie odbiera (§4.6).

Znane ograniczenia prototypu:

- Szerokości profili i proporcje podziału są poglądowe. Pola dzielą szerokość po równo albo według stałej proporcji,
  nie da się wpisać wymiaru pojedynczego skrzydła.
- Okno 2-skrzydłowe jest tylko ze słupkiem stałym. Brakuje słupka ruchomego, okien narożnych, łuków i skosów,
  drzwi wejściowych, PSK/SmartMove i harmonijkowych.
- Szprosy mają ten sam układ we wszystkich polach. Nie ma pola „inny kolor RAL”.
- Mail jest zwykłym tekstem, bez rysunku (§4.2). Klient nie dostaje automatycznej kopii.
- Kopiowanie linku w części przeglądarek wymaga ręcznego Ctrl+C. Pokazujemy wtedy pole z zaznaczonym linkiem.
- Bez JavaScriptu pokazujemy komunikat z telefonem i linkiem do formularza kontaktowego.
- Testy lokalne: Astro 7 pozwala na jeden serwer deweloperski na projekt, więc prototyp testowano na wspólnym
  `localhost:4331`. Testy objęły 1440 i 375/360 px, oba motywy, 3 pozycje (okno, kopia, HST), link,
  blokadę `localStorage` i dane formularza.
- Widżet „Paleta: Profil / Mono” (podgląd motywów, spoza konfiguratora) na telefonie zasłania lewy przycisk
  „Wstecz” w dolnym pasku. Przed publikacją trzeba go usunąć albo przesunąć.

---

## 1. Dane produktowe od Inter Windows / DAKO

Konfigurator jest tak dobry, jak jego dane. Potrzebujemy ich **w jednej tabeli** (arkusz wystarczy). Programista
przeniesie je do `src/data/konfigurator.ts` (docelowo do JSON, §4.4).

### 1.1 Systemy, które naprawdę sprzedajecie przez stronę

- Które systemy pokazujemy klientom w konfiguratorze? Propozycja: tylko te, które realnie polecacie.
  - PVC: DAKO DPQ-82 na VEKA Softline 82 MD. Czy także Sonarol lub All Windows Group, a jeśli tak, to które linie?
  - Aluminium: które linie Aluprof (DA-77, DA-70N, inne)?
  - Drewno i drewno-aluminium: DDF-68, DDR-68, DDA-78? Czy drewno ma być w konfiguratorze, czy tylko jako zapytanie?
- Dla każdego systemu prosimy o 3–4 parametry do karty, wyłącznie z kart producenta: głębokość profilu,
  Uw okna referencyjnego z danym pakietem, liczba uszczelek, maksymalne wymiary. **Bez tych danych nie pokazujemy
  żadnych liczb Uw/Ug.**
- Drzwi przesuwne HST (i ewentualnie PSK/SmartMove, SkyLine): czy je sprzedajecie i montujecie? W jakich systemach?
  Jakie schematy (A: fix + przesuw, C: fix + 2 przesuwy + fix, inne)?

### 1.2 Wymiary graniczne i dozwolone otwieranie

Dla każdego systemu i kształtu potrzebujemy:

- min./maks. szerokość i wysokość całej konstrukcji oraz pojedynczego skrzydła (osobno dla rozwiernego,
  rozwierno-uchylnego i uchylnego),
- maksymalną powierzchnię lub wagę skrzydła (szczególnie przy pakiecie 3-szybowym i HST),
- dozwolone typy otwierania dla każdego pola (np. czy drzwi balkonowe mogą być uchylne, czy naświetle bywa rozwierne),
- **konwencję L/P**, czyli jak DAKO nazywa „okno lewe”. Prototyp przyjmuje zawiasy po lewej, patrząc od wewnątrz.
- warianty, których brakuje w prototypie, a które sprzedajecie: słupek ruchomy, okna z doświetlem bocznym,
  balkonowe + okno, okna narożne, łuki i skosy.

### 1.3 Kolory i okleiny

- Listy kolorów **dla każdego systemu osobno**, z kodami producenta (np. Renolit, RAL), dostępnością jedno- lub
  dwustronną, kolorem rdzenia i uszczelek oraz ewentualnymi ograniczeniami (ciemne kolory a wymiary).
- Które kolory są w standardzie, a które za dopłatą (nawet jeśli nie pokazujemy cen, można je oznaczyć
  „za dopłatą”)?
- Aluminium: czy dopuszczamy „dowolny kolor RAL” z polem na kod?
- Drewno: gatunki (sosna, meranti, dąb) i lakiery (kryjące RAL, transparentne – nazwy z wzornika).

### 1.4 Szyby

- Pakiety standardowe: czy w standardzie jest pakiet 3-szybowy z ciepłą ramką? Jaki kolor ramki?
- Pakiety dodatkowe: akustyczne (klasa lub Rw), bezpieczne (P2A, P4A, inne), przeciwsłoneczne, matowe i ornamentowe
  (jakie wzory).
- Ug i g każdego pakietu (do opisów, jeśli zdecydujecie się je pokazywać).
- Szprosy: wiedeńskie i międzyszybowe – szerokości, kolory, maksymalna liczba podziałów. Czy jest też szpros
  konstrukcyjny?

### 1.5 Okucia i klamki

- Producent okuć w DPQ-82 i pozostałych systemach, standard (mikrowentylacja, blokada błędnego położenia).
- Zawiasy ukryte: w których systemach i dla jakich wymiarów?
- RC1N / RC2: czy oferujecie i w jakim zestawie (okucia, klamka z kluczykiem lub przyciskiem, szyba P4A)?
- Klamki: modele i kolory (biała, srebrna, tytan, czarna, złota – do potwierdzenia), klamka z kluczykiem,
  klamka drzwi balkonowych z dwóch stron.

### 1.6 Dodatki

- Rolety: nadstawne, podtynkowe, elewacyjne – czyje (DAKO, Fart Produkt, Fill, Medos, Romex), z jakimi
  ograniczeniami wymiarów, w jakich kolorach i z jakimi napędami (ręczny, elektryczny, Smart Home)?
- Żaluzje fasadowe: producent, typy lamel (C80, Z90…), napędy.
- Moskitiery: ramkowe, drzwiowe, plisowane, przesuwne – do jakich produktów?
- Parapety wewnętrzne i zewnętrzne: materiały i kolory. Czy wyceniacie je razem z oknami?

### 1.7 Montaż i usługi

- Czy ekipy wykonują **ciepły (warstwowy) montaż** i **montaż w warstwie ocieplenia**? Jakie materiały, systemy
  i szkolenia (to samo pytanie jest w `docs/do-uzupelnienia.md`)?
- Czy demontaż i wywóz starych okien, obróbki wewnętrzne i parapety są w ofercie? Jak je nazywacie?

---

## 2. Decyzje biznesowe

### 2.1 Pokazywać ceny czy nie?

Rekomendacja z analizy konkurencji: **nie pokazywać cen w konfiguratorze**. Ewentualnie pokazać orientacyjne
przedziały dla 3–4 typowych scenariuszy w treści stron (np. „okno 2-skrzydłowe 150×140 z montażem: zwykle X–Y zł”).

| Za cenami | Przeciw cenom |
| --- | --- |
| Klient od razu wie, czy mieści się w budżecie, mniej „pustych” leadów | Cena bez pomiaru, montażu, obróbek i logistyki dużych tafli jest myląca: zaniżona albo odstraszająca |
| Część konkurencji (sklepy, producenci) pokazuje ceny | Cennik w JavaScripcie jest publiczny, także dla konkurencji |
| Dobre dla prostych produktów (moskitiery, parapety) | Każda zmiana cennika DAKO, VEKA czy Aluprof, dopłat lub kursu oznacza aktualizację danych na stronie |
| | Stawka VAT zależy od rodzaju budynku i usługi – do ustalenia z księgowością, łatwo o błąd |
| | Pozycjonowanie premium: konsultacja i pomiar zamiast koszyka |

Jeśli zdecydujecie się na ceny, potrzebne są:

- dostęp do cennika dealerskiego DAKO (lub eksport z programu ofertowego) i zasady marży,
- decyzja, kto i jak często aktualizuje ceny,
- liczenie po stronie serwera (PHP), żeby nie publikować cennika – strona dostaje tylko przedział „od–do”,
- dopisek „cena orientacyjna, ostateczna po pomiarze”.

### 2.2 Obsługa zapytań (leadów)

- **Kto odbiera** zapytania z konfiguratora: Paweł Majchrzak, Bartosz Bezdziek, Kacper Dylewski, wszyscy?
  Na jaki adres mają trafiać (dziś `biuro@interwindows.pl`)?
- **Czas odpowiedzi**, który możemy obiecać na stronie (np. „oddzwonimy w ciągu 1 dnia roboczego”).
  Dziś strona celowo niczego nie obiecuje.
- **Gdzie trafiają leady:** sama skrzynka, arkusz (Google Sheets, Excel) czy CRM? Prosty wariant: PHP dopisuje wiersz
  do pliku CSV albo wysyła do arkusza Google przez Apps Script. Lepszy wariant: CRM z API (np. Pipedrive, Bitrix24).
- **Autoodpowiedź do klienta** z kopią zestawienia i linkiem do projektu: czy chcecie? Kto ją podpisuje?
- **Statusy:** nowy → kontakt → pomiar umówiony → oferta → zamówienie. Przydadzą się do oceny skuteczności
  konfiguratora.

### 2.3 Rezerwacja terminu pomiaru

Trzy poziomy:

1. **Dziś:** pole „Kiedy najlepiej zadzwonić?” (pora dnia).
2. **Prosto:** 2–3 preferowane dni pomiaru do wyboru w formularzu, doradca potwierdza telefonicznie. Rekomendacja na MVP.
3. **Kalendarz na żywo** (np. harmonogram terminów Google lub inne narzędzie do rezerwacji). Wymaga planowania
   tras i dostępności pomiarowców, zewnętrznego narzędzia i jego oceny pod kątem RODO. Ma sens dopiero przy dużej
   liczbie zapytań.

Pytania: jak daleko jeździcie na pomiar, w które dni, czy pomiar jest zawsze bezpłatny (strona tak mówi)?

---

## 3. Materiały graficzne

- **Tekstury oklein:** skany lub próbki w wysokiej rozdzielczości (złoty dąb, orzech, winchester i inne
  z listy §1.3). Na rysunku wystarczy mały kafel (ok. 200×200 px). Na kartach wyboru wystarczą próbki.
  Kolory na ekranie i tak będą przybliżone.
- **Klamki:** zdjęcia na neutralnym tle, każdy model i kolor (do kart w kroku 7).
- **Zdjęcia produktów z realizacji** dopasowane do systemu i koloru, np. „antracyt na DPQ-82”, „HST z żaluzją”.
  Pokazywane obok rysunku jako inspiracja. Zdjęć DAKO ze znakiem „© DAKO” nie używamy (README).
- **Przekroje profili** (rysunki techniczne z kart producenta), jeśli wolno je publikować.
- Opcjonalnie zdjęcie próbnika kolorów z biura zamiast obecnej ilustracji AI (`docs/do-uzupelnienia.md`).

---

## 4. Wymagania techniczne

### 4.1 Niezawodna poczta (SMTP zamiast `mail()`)

`kontakt.php` używa funkcji `mail()`. Na hostingu współdzielonym takie wiadomości często trafiają do spamu albo
giną bez śladu. Rekomendacja:

- **Wysyłka przez SMTP** z uwierzytelnieniem na skrzynce w domenie (np. `formularz@interwindows.pl`).
  Biblioteka PHPMailer (wystarczy dołączyć kilka plików, bez Composera) albo usługa transakcyjna z umową
  powierzenia danych.
- **SPF, DKIM i DMARC** dla domeny `interwindows.pl`: do sprawdzenia u dostawcy hostingu.
- **Kopia awaryjna:** zapis każdego zgłoszenia do pliku (poza katalogiem publicznym) lub do bazy, żeby żadne
  zapytanie nie zginęło, gdy poczta zawiedzie.
- **Test** wysyłki na Gmail, Outlook i Onet po wdrożeniu.

### 4.2 Rysunek w mailu i dla klienta (PNG / PDF)

Gmail i wiele programów pocztowych **nie wyświetla SVG**. Plan:

- **PNG w przeglądarce:** SVG → `<canvas>` → `toBlob('image/png')` dla każdej pozycji. Wysyłamy jako załączniki
  w `multipart/form-data`, a PHP dołącza je do maila (MIME). Rysunek używa dziś zmiennych CSS motywu, więc do
  eksportu potrzebny jest wariant z wpisanymi kolorami. Wystarczy prosta funkcja w `rysunek.ts`.
- **Limity:** maks. 30 pozycji, PNG ok. 800 px, kontrola rozmiaru w PHP.
- **PDF dla klienta:**
  - najtaniej: widok „Drukuj / zapisz jako PDF” (arkusz stylów do druku dla kroku Podsumowanie),
  - pełniej: PDF generowany w PHP (FPDF/TCPDF – do sprawdzenia, czy hosting na to pozwala), z logo, zestawieniem
    i rysunkami, wysyłany w autoodpowiedzi.
- Link „wróć do projektu” jest już w treści maila.

### 4.3 Zapisywanie projektów na serwerze

Dziś projekt żyje w przeglądarce i w linku, a link jest długi (ok. 600 znaków dla 3 pozycji). Docelowo:

- PHP zapisuje projekt jako plik JSON (lub rekord w bazie MySQL, jeśli hosting ją ma) z losowym ID.
  Wtedy link jest krótki: `/konfigurator/#p=abc123`.
- Projekt jest powiązany ze zgłoszeniem, więc doradca otwiera dokładnie to, co klient wysłał. Można dodać
  prosty, chroniony hasłem podgląd listy projektów.
- Retencja, np. 12 miesięcy dla projektów bez zamówienia, potem automatyczne usuwanie (§4.4).
- Wersjonowanie schematu: dane mają pole `v: 1`. Każda zmiana listy opcji wymaga migracji starych linków.
  Nieznane wartości prototyp już zamienia na domyślne.

### 4.4 Dane w JSON zamiast w kodzie

`src/data/konfigurator.ts` to dziś TypeScript. Po potwierdzeniu danych warto przenieść je do pliku JSON
(np. `src/data/konfigurator.json`) z prostą walidacją przy budowaniu strony. Wtedy zmiana koloru czy limitu
nie wymaga programisty, tylko edycji pliku i przebudowy.

### 4.5 RODO

- **Zgoda w formularzu** jest dziś taka sama jak w formularzu wyceny, rozszerzona o „projekt” i „umówienie pomiaru”.
  Do potwierdzenia przez Was lub prawnika:
  - podstawa prawna (w praktyce przetwarzanie przed zawarciem umowy na żądanie klienta; zgoda tylko tam, gdzie
    potrzebna),
  - informacja o administratorze, celu, okresie przechowywania i prawach,
  - link do polityki prywatności.
- **Polityka prywatności** powinna opisać:
  - konfigurator: jakie dane, w jakim celu, jak długo, kto ma dostęp,
  - zapis projektu w `localStorage`: technicznie niezbędny do działania funkcji, o którą prosi użytkownik,
    bez celów marketingowych,
  - link z danymi projektu,
  - dostawcę poczty lub CRM, jeśli powierzamy mu dane.
- **Okres przechowywania** zapytań i projektów: ustalić, np. 12 miesięcy bez zamówienia.
- Dane osobowe trafiają tylko do maila i ewentualnego CRM. Link do projektu nie zawiera danych osobowych.

### 4.6 Ochrona przed spamem

Już działają: pułapka (pole `website`), minimalny czas wypełnienia (3 s), walidacja telefonu i zgody w PHP.
Do dodania:

- limit wysyłek z jednego IP (np. 5 na godzinę, licznik w pliku),
- odrzucanie wiadomości z linkami w polu „Wiadomość”,
- limit rozmiaru i walidacja pola `konfiguracja` po stronie serwera, np. czy linia JSON da się sparsować,
- dopiero przy realnym problemie: niewidoczna weryfikacja (np. Cloudflare Turnstile) zamiast CAPTCHA.

### 4.7 Analityka

Prototyp wysyła zdarzenia `konfigurator` (§0). Do podpięcia:

- **Narzędzie:** analityka bez cookies (np. Plausible lub Matomo bez cookies), ewentualnie GA4 po zgodzie
  (Consent Mode v2 – `docs/seo-plan.md`).
- **Lejek:** start → każdy krok (`step` z numerem) → `add` (kolejna pozycja) → `copy-link` → `submit` → `sent`.
  Pokaże, gdzie klienci odpadają.
- **Raport miesięczny:** liczba projektów, średnia liczba pozycji, najczęstsze systemy i kolory (to też wiedza
  zakupowa), odsetek wysłanych.

### 4.8 Ograniczenia hostingu

- Hosting serwuje statyczne pliki i PHP (LiteSpeed/Apache), bez Node.js. Wszystko po stronie serwera musi być
  w PHP. Do sprawdzenia:
  - wersja PHP (zalecana 8.1+),
  - czy jest MySQL,
  - limity `mail()` i SMTP,
  - czy działa cron (do czyszczenia starych projektów),
  - limity uploadu (rysunki PNG, ewentualnie rzut domu jako załącznik).
- Podgląd na GitHub Pages nie obsługuje PHP: formularz pokazuje tam tylko komunikat (już zrobione).
- `.htaccess`: `kontakt.php` i katalog z projektami nie mogą być indeksowane ani dostępne do listowania.

---

## 5. Research: narzędzia DAKO dla dealerów

Krótki przegląd z 27.10.2026, na podstawie publicznych stron (bez logowania):

- **Strefa B2B DAKO** (`dako.eu/pl/strefa-b2b`) linkuje do kilku zamkniętych serwisów:
  - e-PAM (`dako.e-pam.pl`),
  - Partner DAKO (`partner.dako.eu` – sama strona logowania),
  - DAKO Extranet,
  - sklepu marketingowego.

  Publicznie nie widać, co zawierają. Jako autoryzowany partner macie (lub możecie mieć) do nich dostęp.
- **Konfigurator na stronie DAKO:** materiały linii **HarmonyLine** wspominają konfigurator online do komponowania
  okien, drzwi, rolet i bram (kolory, materiały, dekory), dostępny przez kod z broszury. Nie znaleźliśmy publicznie
  opisanego konfiguratora okien z danymi technicznymi, wersji do osadzenia (iframe) ani eksportu danych dla dealerów.
- **Wirtualny showroom 360°** (`showroom.dako.eu`) można podlinkować jako inspirację.
- **Aluprof** ma konfigurator żaluzji fasadowych dla partnerów handlowych (za logowaniem): składa ofertę
  z kompatybilnych elementów i przekazuje zamówienie. To narzędzie wewnętrzne, nie dla klienta końcowego.

Wniosek: **trzeba zapytać opiekuna handlowego DAKO**, bo to może oszczędzić dużo pracy:

1. Czy w e-PAM, Partner DAKO lub Extranecie jest program ofertowy lub konfigurator i czy da się z niego
   wyeksportować dane: systemy, wymiary graniczne, kolory z kodami, pakiety szyb, cennik dealerski?
2. Czy DAKO udostępnia dealerom konfigurator do osadzenia na stronie (iframe), API albo plik z danymi (CSV, XML, JSON)?
3. Czy możemy używać zdjęć produktów, tekstur oklein i rysunków technicznych DAKO na stronie i w konfiguratorze,
   i na jakich warunkach?
4. Czy DAKO ma gotowe opisy systemów i wartości Uw dla okien referencyjnych, które wolno publikować?

Nawet jeśli DAKO ma własny konfigurator, rekomendujemy **zostać przy własnym**. Analiza konkurencji pokazała,
że iframe’y z innych domen są wolne, wyglądają obco i prowadzą do sklepu zamiast do pomiaru. Dane od DAKO
posłużyłyby wtedy jako źródło dla naszego konfiguratora.

---

## 6. Plan wdrożenia

Szacunki to dni pracy programisty przy założeniu, że dane z §1 przychodzą w uporządkowanym arkuszu.
Czas oczekiwania na dane i decyzje nie jest wliczony.

| Etap | Zakres | Szacunek |
| --- | --- | --- |
| **0. Prototyp** (gotowe) | Pełny przepływ, rysunek SVG, lista pozycji, link, formularz do `kontakt.php`, bez cen | – |
| **1. MVP do publikacji** | Dane z §1 w `konfigurator.ts`/JSON, usunięcie lub potwierdzenie pozycji „do potwierdzenia” (znaczniki na stronie znikają), konwencja L/P, SMTP + SPF/DKIM, PNG rysunków w mailu, zapis zgłoszeń do pliku, limit IP, preferowane dni pomiaru, polityka prywatności, analityka lejka, test na urządzeniach | 4–6 dni |
| **2. Obsługa leadów** | Autoodpowiedź do klienta z zestawieniem, PDF (druk lub PHP), zapis projektów na serwerze i krótkie linki, eksport do arkusza lub CRM, prosty panel z listą projektów, retencja (cron) | 5–8 dni |
| **3. Rozbudowa produktu** | Słupek ruchomy, doświetla boczne, wymiary pojedynczych pól, szprosy per pole, „inny RAL”, PSK/SmartMove, zdjęcia klamek i oklein, galeria realizacji dopasowana do wyboru | 5–10 dni |
| **4. Opcje (po decyzji)** | Ceny orientacyjne liczone w PHP z cennika (+ proces aktualizacji), „Zobacz na swoim domu” (zdjęcie elewacji z nałożonym rysunkiem), kalendarz pomiarów | 8–20 dni |

Kolejność ma znaczenie: etap 1 jest warunkiem publikacji. Etapy 2–4 można robić niezależnie.

---

## 7. Wartości „do potwierdzenia” w `src/data/konfigurator.ts`

Wszystko poniżej jest przykładowe. W kodzie oznaczają to pole `tbc`, stałe `*_TBC` albo komentarze
„do potwierdzenia” / „PROTOTYP”.

### Typy i kontekst

- `productTypes.hst`: drzwi przesuwne HST – czy sprzedajecie i montujecie (na stronie: „dostępność do potwierdzenia”).
- `contexts`: nowy dom / wymiana – OK, do akceptacji.

### Otwieranie

- `openings` i `openingCycle`: nazewnictwo L/P (przyjęto: zawiasy po lewej, patrząc od wewnątrz).
- Dozwolone typy otwierania:
  - okno: stałe, rozwierne L/P, rozwierno-uchylne L/P, uchylne,
  - drzwi balkonowe: bez uchylnego,
  - naświetle: tylko stałe lub uchylne,
  - HST: stałe lub przesuwne w lewo/prawo.

### Szablony i limity wymiarów (`templates[].limits`, mm – wartości prototypowe)

| Szablon | Szerokość | Wysokość | Domyślne otwieranie |
| --- | --- | --- | --- |
| 1-skrzydłowe | 400–1400 | 400–2000 | rozwierno-uchylne L |
| 2-skrzydłowe (słupek stały) | 800–2600 | 500–2200 | rozwierne L + rozwierno-uchylne P |
| 3-skrzydłowe | 1200–3600 | 500–2200 | RU L + stałe + RU P |
| Fix + skrzydło (proporcja 1,25 : 1) | 800–3000 | 500–2400 | stałe + RU P |
| Z naświetlem górnym (naświetle 32% wysokości) | 700–2600 | 1200–2800 | uchylne + R L + RU P |
| Balkonowe 1-skrzydłowe | 700–1200 | 1900–2500 | RU L |
| Balkonowe 2-skrzydłowe | 1200–2400 | 1900–2500 | R L + RU P |
| HST – 2 części (`tbc`) | 2000–6000 | 1900–2700 | stałe + przesuwne w lewo |
| HST – 4 części (`tbc`) | 3600–9000 | 1900–2700 | stałe + przesuw L + przesuw P + stałe |

Domyślne proporcje rysunków (`size`) i proporcje pól są tylko poglądowe.

### Systemy (`systems`)

- PVC: DAKO DPQ-82, profil VEKA Softline 82 MD. Opis według `oferta.ts`. Czy pokazać też Sonarol i All Windows Group?
- Aluminium: Aluprof z oferty DAKO, „np. linie DA-77 i DA-70N” – które linie naprawdę?
- Drewno: DAKO drewno i drewno-aluminium, „np. DDF-68, DDR-68, DDA-78” – które naprawdę?
- `faces` (szerokości ramy, skrzydła i słupka na rysunku: PVC 62/78/84, alu 52/64/72, drewno 68/82/92 mm) –
  wartości poglądowe. Najlepiej zastąpić je widokami z kart producenta.

### Kolory (`finishes`, cała lista `FINISHES_TBC`)

- Biały (kod nieznany), Jasnoszary RAL 7035, Antracyt RAL 7016, Czarny RAL 9005: wszystkie systemy.
- Złoty dąb: PVC i aluminium (czy alu ma dekor drewnopodobny?).
- Orzech: PVC, aluminium, drewno.
- Winchester: tylko PVC.
- Dąb, lakier transparentny: tylko drewno.
- Kolory ekranowe (`hex`, `grain`) są przybliżone. Do ustalenia: okleina jedno- czy dwustronna, kolor rdzenia,
  dopłaty.

### Szyby

- `panes`: 3-szybowy (domyślny) i 2-szybowy, opisy według `oferta.ts`.
- `glassToggles.warmEdge`: ciepła ramka, domyślnie włączona („standard w pakiecie – do potwierdzenia”).
- `glassToggles.acoustic`: szyba akustyczna (klasa, Rw).
- `glassToggles.matte`: szyba matowa (`tbc`).
- `safetyGlass`: P2A, P4A (`tbc`).
- `barKinds`: wiedeńskie, międzyszybowe (`tbc`). `BARS_MAX = 4` (maks. szprosów pionowych i poziomych w polu).
  Szerokości na rysunku: 26 i 16 mm.

### Okucia

- `hinges.ukryte`: zawiasy ukryte (`tbc`).
- `handles` (`HANDLES_TBC`): biała, srebrna, tytan, czarna, złota.
- `security`: RC1N, RC2 (`tbc`). Opis standardowych okuć: „okucia obwiedniowe systemu” – do potwierdzenia.

### Dodatki

- `shadings`: roleta nadstawna, podtynkowa, elewacyjna, żaluzja fasadowa. Która osłona do którego produktu
  (np. nadstawna przy HST)? Wysokości skrzynek na rysunku (190, 210, 180, 150 mm) są poglądowe.
- `drives`: ręczny, elektryczny (Smart Home?).
- `screens`:
  - ramkowa – okna,
  - drzwiowa/plisowana – balkonowe i HST (`tbc`),
  - przesuwna – HST (`tbc`).
- `sills`: parapet wewnętrzny i zewnętrzny – materiały, kolory, czy w ofercie (`tbc`).

### Montaż

- `mountings.cieply`: ciepły montaż (warstwowy) – `tbc`.
- `mountings.ocieplenie`: montaż w warstwie ocieplenia – `tbc`.
- `mountings.standard`: opis „kotwy lub dyble, pianka i uszczelnienie obwodu” – do akceptacji.
- `removal`: demontaż i wywóz starych okien (`tbc`, pokazywany przy wymianie).
- `OWN_CREW_NOTE`: „Montują wyłącznie nasi monterzy – bez podwykonawców.” – zgodne z `_tresci`, do akceptacji
  brzmienia.

### Formularz i limity

- `contactTimes`: pory kontaktu oparte na godzinach z `site.ts` (godziny też są do potwierdzenia).
- `MAX_ITEMS = 30` (pozycji w projekcie), `MAX_QTY = 99` (sztuk w pozycji).
- `kontakt.php`: limit pola `konfiguracja` 60 000 znaków.

---

## 8. Pytania do klienta (do scalenia z `docs/do-uzupelnienia.md`)

1. **Zakres produktów w konfiguratorze:** które systemy PVC, aluminium i drewna pokazujemy? Czy sprzedajecie
   i montujecie drzwi HST (i PSK/SmartMove)? W jakich systemach?
2. **Wymiary graniczne i otwieranie:** limity dla każdego systemu i kształtu, dozwolone typy otwierania i konwencja
   L/P według DAKO. Najlepiej karty techniczne lub dane z programu ofertowego.
3. **Kolory, szyby, okucia:** listy kolorów z kodami dla każdego systemu, standardowy pakiet szyb (3 szyby + ciepła
   ramka?), dostępność P2A/P4A, RC1N/RC2, zawiasów ukrytych i kolorów klamek.
4. **Montaż i usługi:** czy ekipy wykonują ciepły montaż i montaż w warstwie ocieplenia? Czy demontaż i wywóz starych
   okien oraz parapety są w ofercie?
5. **Ceny i leady:** czy pokazujemy jakiekolwiek ceny (rekomendacja: nie)? Kto odbiera zapytania, w jakim czasie
   oddzwania, gdzie je zapisujemy (skrzynka, arkusz, CRM)? Czy wysyłać klientowi autoodpowiedź?
6. **Narzędzia DAKO:** czy macie dostęp do e-PAM, Partner DAKO lub Extranetu i czy jest tam program ofertowy lub
   eksport danych (systemy, kolory, cennik)? Czy DAKO pozwala używać swoich zdjęć i tekstur?
7. **Pomiar:** zasięg, dni pomiarów, czy pomiar jest zawsze bezpłatny? Czy w formularzu wystarczą preferowane dni?
8. **Hosting:** dane do SMTP (skrzynka nadawcy), wersja PHP, czy jest MySQL i cron, kto zarządza DNS (SPF, DKIM, DMARC)?
9. **RODO:** okres przechowywania zapytań i projektów, akceptacja treści zgody i zapisu w polityce prywatności.
10. **Materiały:** tekstury oklein, zdjęcia klamek, zdjęcia realizacji dopasowane do systemów i kolorów.

## Źródła (research §5, 27.10.2026)

- [DAKO – strona główna (Strefa B2B, showroom, do pobrania)](https://www.dako.eu/pl)
- [DAKO – Strefa B2B](https://www.dako.eu/pl/strefa-b2b)
- [Partner DAKO – logowanie](https://www.partner.dako.eu)
- [DAKO HarmonyLine – broszura (wzmianka o konfiguratorze online)](https://www.dako.eu/pl/do-pobrania/harmonyline/dnl/5.pdf)
- [e-architect: DAKO HarmonyLine i konfigurator kompozycji](https://www.e-architect.com/articles/dako-leading-producer-of-high-end-joinery-products)
- [DAKO: wsparcie partnerów (szkolenia, narzędzia ofertowe)](https://www.dako.eu/uk/blog/how-dako-supports-business-partners-with-effective-training-programs)
- [Murator: konfigurator żaluzji fasadowych Aluprof dla partnerów](https://muratordom.pl/budowa/okna/konfigurator-zaluzji-fasadowych-aluprof-nowy-wymiar-wygodnego-ofertowania-aa-wwgH-jpEZ-bgA9.html)
