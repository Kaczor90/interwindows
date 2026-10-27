// Installation crew shown by src/components/CrewGrid.astro ("Poznaj naszych montażystów").
// PLACEHOLDERS – names, roles, experience and photos must come from the client
// (with each person's consent to publish their name and photo). See docs/do-uzupelnienia.md.
//
// photo: root path to a portrait in public/ (e.g. '/img/ekipa/jan-kowalski.webp', 4:5, min. 800×1000 px)
//        or null → an on-brand placeholder is rendered.
// placeholder: true marks entries that are not real people yet; CrewGrid shows a small "do uzupełnienia" note.

export interface CrewMember {
  name: string;
  role: string;
  experience: string;
  /** optional one-line note, e.g. what the person specialises in */
  note?: string;
  photo: string | null;
  placeholder?: boolean;
}

export const ekipa: CrewMember[] = [
  { name: 'Imię Nazwisko', role: 'Monter – brygadzista', experience: 'XX lat doświadczenia', photo: null, placeholder: true },
  { name: 'Imię Nazwisko', role: 'Monter okien i drzwi', experience: 'XX lat doświadczenia', photo: null, placeholder: true },
  { name: 'Imię Nazwisko', role: 'Monter okien i drzwi', experience: 'XX lat doświadczenia', photo: null, placeholder: true },
  { name: 'Imię Nazwisko', role: 'Monter bram i osłon', experience: 'XX lat doświadczenia', photo: null, placeholder: true },
];
