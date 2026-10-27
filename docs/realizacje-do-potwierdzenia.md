# Realizacje – do potwierdzenia z klientem

Stan: 27.10.2026. Dotyczy stron `/realizacje/` i `/realizacje/{slug}/` (dane: `src/data/realizacje.ts`).

Wszystkie opisy powstały **wyłącznie z faktów z postów na Facebooku** (`_tresci/facebook/realizacje-fb.md`) i z tego, co widać na zdjęciach. Nie dopisaliśmy miejscowości, liczby konstrukcji, czasu montażu ani systemów, których posty nie podają. Na stronach brakujące dane mają znacznik „do potwierdzenia” (klasa `.tbc`).

## Do potwierdzenia przy wszystkich realizacjach

1. **Zgoda inwestora na publikację zdjęć** (punkt w protokole odbioru, `docs/seo-plan.md` §6.3). Zdjęcia są już publiczne na FB, ale strona to osobna publikacja.
2. **Miejscowość** (albo osiedle lub gmina, nigdy adres). Bez niej slug nie ma miejscowości, a strony nie wesprą fraz „{produkt} {miejscowość}”. Po potwierdzeniu trzeba uzupełnić `town` i ewentualnie zmienić slug (wtedy dodać przekierowanie 301 ze starego adresu).
3. **Czy można podać zakres terytorialny** (gmina, powiat) do przyszłych stron miejscowości (`seo-plan.md` §3.3).
4. **Termin**: przy P1, P2, P3 i P5 podajemy miesiąc z daty zdjęć w albumie Google (czyli faktyczny czas montażu), przy P6, P7 i P8 miesiąc publikacji posta. Czy te terminy są prawidłowe?
5. **Ekipa**: czy podać imiona monterów, którzy robili montaż (za ich zgodą)? Model danych w planie SEO to przewiduje (`crew`).
6. **Opinia klienta**: jeśli inwestor zgodzi się na krótką opinię, dodamy ją do strony realizacji (bez znacznika `review` w JSON-LD).

## Zamazane i przycięte zdjęcia (prywatność)

Skrypt: `scripts/realizacje-projekty.mjs` (lista obszarów rozmycia na górze pliku).

| Plik źródłowy | Co zrobiono | Plik na stronie |
|---|---|---|
| album nr 327 | rozmyta tablica rejestracyjna lawety z mini żurawiem | `projekty/witryna-mini-zuraw-hoeflon-c4-rozladunek.webp` |
| `IMG_4279` (album nr 339) | rozmyta twarz osoby widocznej przez szybę łukowego naświetla | `projekty/drzwi-drewniane-kamienica-plock-01.webp` |
| `fb-2026-08-09-1`, `-2`, `-7` | rozmyta tablica rejestracyjna firmowego busa (w `-7` była czytelna) | `projekty/okna-dako-hst-dom-z-busem-ekipy.webp`, `…-bus-przy-budowie.webp`, `…-dom-i-bus.webp` |
| `fb-2026-07-05-10` | rozmyta mała sylwetka osoby za oknem narożnym | `projekty/okna-drewnopodobne-okno-narozne-zaluzje-od-wewnatrz.webp` |
| `fb-2026-02-03-1` | przycięty dół z napisem z posta („Nie każda wymiana…”) | `projekty/wymiana-bez-remontu-przed-szczyt.webp` |
| `fb-2026-02-03-6` | przycięty lewy brzeg (pranie na tarasie) | `projekty/wymiana-bez-remontu-elewacja-ogrodowa.webp` |

Numerów domów nie znaleziono na żadnym użytym zdjęciu.

**Uwaga dla istniejących plików** (nie zmieniałem ich, należą do `scripts/images.mjs`):
- `public/img/realizacje/zielone-drzwi-lukowe-kamienica-01.webp` (IMG_4279) pokazuje **osobę z profilu** za szybą naświetla. Ten plik jest dziś w sliderze strony głównej. Na stronie realizacji używam rozmytej kopii `public/img/realizacje/projekty/drzwi-drewniane-kamienica-plock-01.webp` (ten sam kadr, 1200×1600). Proponuję podmienić go też na stronie głównej albo dodać rozmycie w `scripts/images.mjs`.
- `public/img/realizacje/dostawa-przeszklen-samochod.webp` (IMG_4150): w tle są dwa auta z tablicami. W pliku 1600 px tablice są nieczytelne (ok. 10 px wysokości), więc zostawiłem go bez zmian.

## Projekty

### P1 – `/realizacje/witryna-330-kg-mini-dzwig/` (post 14.01.2026, zdjęcia z albumu nr 323–338, 01–03.12.2025)

- **Miejscowość**: brak (post: „Płock i okolice”).
- **Rodzaj budynku**: na stronie „budynek parterowy w stanie surowym”. Słowo „witryna” sugeruje lokal usługowy, ale na zdjęciach budynek wygląda jak dom z garażem. Co to za obiekt?
- **Produkty**: post wymienia systemy Veka, Wiśniowski i Wikęd. Przypisanie na stronie (witryna = VEKA, brama = Wiśniowski, drzwi = Wikęd) jest naszym wnioskiem ze zdjęć. Do potwierdzenia: model/system witryny (PCV czy aluminium? na ramie widać taśmę VEKA), wymiary witryny, model bramy i drzwi.
- **Mini żuraw Hoeflon C4**: własny czy wynajęty? Jeśli własny, warto to napisać (mocny dowód kompetencji ekipy).
- Czy przypisanie zdjęć z albumu nr 323–338 do tego posta jest prawidłowe (zrobione wzrokowo; brama i drzwi są z tej samej budowy i tych samych dni)?

### P2 – `/realizacje/drzwi-drewniane-kamienica-plock/` (post 16.01.2026, album nr 339–342, 23.12.2025)

- **Miejscowość**: Płock (z posta). Czy można podać ulicę lub okolicę (np. Stare Miasto)? Bez numeru.
- **Zgoda wspólnoty / zarządcy kamienicy** na zdjęcia elewacji.
- **Producent drzwi**, gatunek drewna, kolor (na zdjęciach zielony), czy było uzgodnienie z konserwatorem zabytków. To ostatnie byłoby cennym faktem do opisu i do `/okna-drewniane/`.
- Wymiar 350 × 140 cm: czy to wysokość × szerokość całości z naświetlem?

### P3 – `/realizacje/okna-ze-szprosami-dom-szkieletowy/` (post 19.01.2026; „przed” = zdjęcia z FB, „po” = album nr 250–257, 06.09.2025)

- **Miejscowość**: brak (hashtagi #mazowieckie #plock).
- **System okien** (post: „okna PVC ze szprosami”), rodzaj szprosów (wiedeńskie, naklejane, międzyszybowe), producent klamek retro.
- Drzwi balkonowe ze szprosami (album nr 253–255) – czy to ta sama dostawa?
- Zdjęcia „przed” to zrzuty z FB (1001 px) – lepiej pozyskać oryginały z telefonu.

### P5 – `/realizacje/okna-drzwi-brama-dom-parterowy/` (post 29.01.2026, album nr 343–358, 28–29.01.2026)

- **Miejscowość**: brak.
- **Systemy i producenci** okien, drzwi i bramy – post ich nie podaje (na stronie: „do potwierdzenia”).
- Na zdjęciach widać też przesuwne drzwi tarasowe (album nr 349). Czy były w zakresie? Jakiego typu (HST, PSK)?
- „Standardowy montaż” – czy to montaż tradycyjny na piankę? Doprecyzować, jeśli ma pasować do `/montaz-okien/`.

### P6 – `/realizacje/wymiana-okien-i-drzwi-bez-remontu/` (post 03.02.2026, tylko kopie z FB, 789 px)

- **Miejscowość**: brak (#oknaplock).
- **Systemy**: na ramach widać etykiety VEKA – profil okien? Producent drzwi wejściowych (antracyt z przeszkleniem) i drzwi tarasowych.
- Ile okien i drzwi wymieniono, ile trwały prace – jeśli klient potwierdzi, dopiszemy (dziś celowo bez liczb).
- Dom jest zamieszkany i widać fragment prywatnego tarasu (`fb-2026-02-03-5`) – **zgoda domowników**.
- Oryginalne zdjęcia z telefonu (obecne to zrzuty z FB).

### P7 – `/realizacje/okna-drewnopodobne-zaluzje-fasadowe/` (post 05.07.2026, kopie z FB)

- **Miejscowość**: brak.
- **Okleina** (np. złoty dąb, orzech), system VEKA (np. Softline 82), producent i typ żaluzji fasadowych (C80, Z90), napęd i sterowanie.
- Brama Wiśniowski 5 m: model i okleina.
- Oryginały zdjęć (FB: 789 px; zdjęcia 7 i 9 mamy w 1080 px z posta 13.08).

### P8 – `/realizacje/okna-dako-hst-dom-parterowy/` (post 09.08.2026, kopie z FB)

- **Miejscowość**: brak („Płocka i okolic”).
- **Modele**: system okien DAKO na profilu VEKA (np. DPQ-82?), wymiary HST, które drzwi są Erkado, a które Wikęd (wejściowe czy wewnętrzne?), model bramy Wiśniowski, producent rolet (na kasecie rolety widać napis ALUPROF).
- „Szczelny montaż w systemie Soudal” – taśmy, piana, ciepły montaż? Jeśli to montaż warstwowy, warto podlinkować `/cieply-montaz-okien/`.
- Bus z logo Inter Windows na zdjęciach – tablica rozmyta. Czy zostawiamy te zdjęcia?

## Czego nie opublikowaliśmy i dlaczego

- **P4** (post 20.01.2026, dom z bramą garażową): pewne jest tylko zdjęcie drzwi (album nr 258–260). Pozostałe zdjęcia z albumu przypisano „prawdopodobnie”. Do potwierdzenia, które zdjęcia należą do tej budowy; wtedy dodamy stronę.
- **P9 / P10** (zbiorcze posty o drzwiach wewnętrznych i zewnętrznych) i **P11** (porada rolety/żaluzje): to nie są pojedyncze realizacje. Można z nich zrobić galerie na stronach kategorii.
- **Post 15** (21.01.2026, link do Instagrama: VEKA, ciepły montaż, drzwi Erkado z doświetlem, rolety): brak zdjęć na FB. Jeśli klient przekaże zdjęcia, będzie z tego kolejna strona.
- Pozostałe 38 zdjęć z albumu (`src/data/realizacje-zdjecia.ts`) jest na `/realizacje/` w galerii „Więcej zdjęć z montaży”, bez miejscowości i systemów.
