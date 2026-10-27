// AI-generated ILLUSTRATIONS (source: _tresci/ai/, details and prompts: _tresci/ai/INDEX.md).
// They are NOT photos of Inter Windows projects or crew. Rules:
//  - never on /realizacje/ and never for crew cards (CrewGrid keeps placeholders),
//  - alt texts describe the scene only – never "nasza realizacja", "nasz montaż", "nasza ekipa",
//  - every use is listed in docs/do-uzupelnienia.md ("AI – podmienić na zdjęcie własne").
// Files: public/img/ai/<file>.webp (max 1600 px; ai-montaz-ekipa-dojazd 2000 px) + <file>-800.webp.

export interface AiImage {
  file: string;
  width: number;
  height: number;
  alt: string;
  /** where INDEX.md suggests using it */
  intendedFor: string;
}

export const aiImages: AiImage[] = [
  { file: 'ai-montaz-tasma', width: 1600, height: 1064, alt: 'Dłonie montażysty dociskają taśmę paroizolacyjną na styku ramy okna w kolorze antracytu z murem.', intendedFor: '/montaz-okien/, /cieply-montaz-okien/, home: krok „Montaż”' },
  { file: 'ai-montaz-pomiar', width: 1600, height: 1073, alt: 'Pomiar otworu okiennego dalmierzem laserowym w domu w trakcie budowy.', intendedFor: 'home: krok „Pomiar”, /montaz-okien/, /wymiana-okien/' },
  { file: 'ai-montaz-osadzanie', width: 1600, height: 1064, alt: 'Dwóch montażystów osadza okno w kolorze antracytu w otworze ściany domu w budowie.', intendedFor: 'home: sekcja o własnych ekipach, /montaz-okien/' },
  { file: 'ai-montaz-poziomowanie', width: 1286, height: 1600, alt: 'Sprawdzanie pionu ramy okna poziomicą; widoczna stalowa kotwa i kliny montażowe.', intendedFor: '/montaz-okien/, /cieply-montaz-okien/' },
  { file: 'ai-montaz-odbior', width: 1293, height: 1600, alt: 'Nowe okno w kolorze antracytu w czystym, wykończonym pokoju; na parapecie podkładka z kartką i długopis.', intendedFor: 'home: krok „Odbiór”, /montaz-okien/' },
  { file: 'ai-montaz-ekipa-dojazd', width: 2000, height: 1120, alt: 'Bus dostawczy przed nowoczesnym domem o poranku; dwie osoby wnoszą zafoliowane okno.', intendedFor: 'tło sekcji home o własnych ekipach, /o-firmie/' },
  { file: 'ai-przeszklenia-salon', width: 1600, height: 896, alt: 'Salon z dużym przeszkleniem narożnym w ramach w kolorze antracytu, z widokiem na ogród z brzozami.', intendedFor: '/okna-aluminiowe/ hero, /okna/' },
  { file: 'ai-hst-taras', width: 1600, height: 896, alt: 'Otwarte drzwi tarasowe HST z niskim progiem, prowadzące z salonu na taras i do ogrodu.', intendedFor: '/drzwi-tarasowe/ hero, poradnik HST czy PSK' },
  { file: 'ai-zaluzje-fasadowe', width: 1600, height: 1073, alt: 'Żaluzje fasadowe w kolorze antracytu na dużych oknach białej elewacji domu jednorodzinnego.', intendedFor: '/zaluzje-fasadowe/ hero' },
  { file: 'ai-rolety-zewnetrzne', width: 1600, height: 1073, alt: 'Parterowy dom z białą elewacją i roletą zewnętrzną w kolorze antracytu, opuszczoną do połowy okna.', intendedFor: '/rolety-zewnetrzne/ hero' },
  { file: 'ai-drzwi-wewnetrzne-bezprzylgowe', width: 1293, height: 1600, alt: 'Jasny korytarz z drzwiami wewnętrznymi bezprzylgowymi w kolorze ściany i czarnymi klamkami.', intendedFor: '/drzwi-wewnetrzne/ (sekcja o drzwiach bezprzylgowych)' },
  { file: 'ai-okna-drewniane-willa', width: 1600, height: 1073, alt: 'Dębowe okno dwuskrzydłowe ze szprosami w jasnym pokoju z parkietem w jodełkę.', intendedFor: '/okna-drewniane/ hero, poradnik o kamienicach' },
  { file: 'ai-konfigurator-profil-probki', width: 1600, height: 1073, alt: 'Narożnik profilu okiennego PCV w przekroju i próbki kolorów: antracyt, złoty dąb i biel.', intendedFor: 'home: zapowiedź konfiguratora, /okna-pcv/' },
  { file: 'ai-poradnik-okno-zima', width: 1600, height: 896, alt: 'Okno w kolorze antracytu z widokiem na zaśnieżony ogród; na parapecie wełniany pled.', intendedFor: 'nagłówki poradnika' },
  { file: 'ai-poradnik-salon-probki', width: 1600, height: 896, alt: 'Próbki narożników okien w kolorach antracyt, złoty dąb i biel na stojakach i stole w jasnej sali ekspozycyjnej.', intendedFor: 'nagłówki poradnika (nie podpisywać jako „nasz salon”)' },
  { file: 'ai-poradnik-dom-zmierzch', width: 1600, height: 896, alt: 'Nowoczesny dom jednorodzinny o zmierzchu, z oświetlonymi oknami w ramach w kolorze antracytu.', intendedFor: 'nagłówki poradnika' },
];

export const aiImage = (file: string) => {
  const img = aiImages.find((a) => a.file === file);
  if (!img) throw new Error(`Brak obrazu AI: ${file}`);
  return img;
};
export const aiSrc = (a: Pick<AiImage, 'file'>) => `/img/ai/${a.file}.webp`;
export const aiSrcSmall = (a: Pick<AiImage, 'file'>) => `/img/ai/${a.file}-800.webp`;
