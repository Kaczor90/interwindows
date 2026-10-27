// Service area shown on /obszar-dzialania/ (docs/seo-plan.md §2.3 and §3.3).
// Distances and drive times from ul. Przemysłowa 22 come from the SEO plan (OSRM/OpenStreetMap,
// rounded) – they are approximate and still to be verified (docs/do-uzupelnienia.md).
// No town pages are generated from this list (anti-doorway rule, §3.3): towns are listed as text only.
//
// review: true = a published client review comes from this town (_tresci/tresci.md §7.7).
// Do not add projects, counts or other facts per town until the client confirms them.

export interface Town {
  name: string;
  /** administrative county ("powiat") – used in the table */
  powiat: string;
  /** road distance in km (rounded) */
  km: number;
  /** drive time in minutes (rounded) */
  min: number;
  review?: boolean;
}

export const OFFICE_TOWN = 'Płock';

export const towns: Town[] = [
  { name: 'Stara Biała', powiat: 'płocki', km: 10, min: 15 },
  { name: 'Słupno', powiat: 'płocki', km: 14, min: 19 },
  { name: 'Radzanowo', powiat: 'płocki', km: 16, min: 21 },
  { name: 'Bielsk', powiat: 'płocki', km: 17, min: 19 },
  { name: 'Łąck', powiat: 'płocki', km: 19, min: 19 },
  { name: 'Brudzeń Duży', powiat: 'płocki', km: 21, min: 26 },
  { name: 'Nowy Duninów', powiat: 'płocki', km: 22, min: 30 },
  { name: 'Staroźreby', powiat: 'płocki', km: 23, min: 26 },
  { name: 'Gąbin', powiat: 'płocki', km: 23, min: 27, review: true },
  { name: 'Bodzanów', powiat: 'płocki', km: 28, min: 39 },
  { name: 'Gostynin', powiat: 'gostyniński', km: 31, min: 32, review: true },
  { name: 'Drobin', powiat: 'płocki', km: 32, min: 33 },
  { name: 'Słubice', powiat: 'płocki', km: 33, min: 36, review: true },
  { name: 'Sierpc', powiat: 'sierpecki', km: 37, min: 43 },
  { name: 'Wyszogród', powiat: 'płocki', km: 41, min: 42 },
];

/** drive-time bands for the overview next to the map */
export const bands = [
  { label: 'do 20 minut', max: 20 },
  { label: '20–30 minut', max: 30 },
  { label: '30–45 minut', max: 45 },
].map((b, i, all) => ({
  ...b,
  towns: towns.filter((t) => t.min <= b.max && (i === 0 || t.min > all[i - 1].max)).sort((a, b) => a.min - b.min),
}));

/** towns with published reviews, Płock first */
export const reviewTowns = [OFFICE_TOWN, ...towns.filter((t) => t.review).map((t) => t.name)];
