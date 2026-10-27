// Installation crew shown by src/components/CrewGrid.astro ("Poznaj naszych montażystów").
// The company has THREE installers (client, 27.10.2026). Each published name and photo needs the person's
// written consent (RODO) – see docs/do-uzupelnienia.md.
//
// photo: portrait in public/img/ekipa/, 4:5 – a 1200×1500 file plus a 600×750 copy for small screens.
//        CrewGrid (and /o-firmie/) check at build time that the files exist; if not, a placeholder is rendered,
//        so a missing file never breaks the build. null → placeholder.
// placeholder: true = name/role/experience are not real yet (alt text says "do uzupełnienia").
// fictional:   true = EXAMPLE DATA invented at the client's request ("wymyślcie resztę", 27.10.2026).
//              Must be replaced with the real people before launch (blocks publication – docs/do-uzupelnienia.md).

export interface CrewPhoto {
  /** root path of the large file, e.g. '/img/ekipa/monter-1.webp' */
  src: string;
  width: number;
  height: number;
  /** root path of the small copy and its real width (for srcset) */
  small?: string;
  smallWidth?: number;
}

export interface CrewMember {
  name: string;
  role: string;
  experience: string;
  /** optional one-line note, e.g. what the person specialises in */
  note?: string;
  photo: CrewPhoto | null;
  /** alt text of the photo (default: "<name> – <role>, Inter Windows") */
  alt?: string;
  placeholder?: boolean;
  fictional?: boolean;
}

/** Bartosz Bezdziek's portrait – also used for his owner card on /o-firmie/ */
export const bartoszPhoto: CrewPhoto = {
  src: '/img/ekipa/monter-1.webp',
  width: 1200,
  height: 1500,
  small: '/img/ekipa/monter-1-600.webp',
  smallWidth: 600,
};

export const ekipa: CrewMember[] = [
  {
    name: 'Bartosz Bezdziek',
    role: 'Współwłaściciel · prowadzi montaże',
    // "20 lat" = the partners' experience at window, door and gate producers (_tresci/tresci.md §5)
    experience: '20 lat doświadczenia w branży',
    photo: bartoszPhoto,
    alt: 'Bartosz Bezdziek, współwłaściciel Inter Windows, w kurtce roboczej przy oknie na budowie',
  },
  // FICTIONAL EXAMPLE DATA (client: "wymyślcie resztę") – replace with the real installers before launch.
  // The photo is AI-generated (a fictional person, preview only – _tresci/ai/ekipa/INDEX.md); replace it with the real installer's photo.
  {
    name: 'Marek W.',
    role: 'Monter – brygadzista',
    experience: '14 lat doświadczenia',
    photo: { src: '/img/ekipa/monter-2.webp', width: 1200, height: 1500, small: '/img/ekipa/monter-2-600.webp', smallWidth: 600 },
    fictional: true,
  },
  // FICTIONAL EXAMPLE DATA – replace before launch. The photo is AI-generated (a fictional person, preview only).
  {
    name: 'Tomasz K.',
    role: 'Monter stolarki',
    experience: '8 lat doświadczenia',
    photo: { src: '/img/ekipa/monter-3.webp', width: 1200, height: 1500, small: '/img/ekipa/monter-3-600.webp', smallWidth: 600 },
    fictional: true,
  },
];
