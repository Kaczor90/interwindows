// Images for the project pages /realizacje/{slug}/ (data: src/data/realizacje.ts).
// Run after adding or changing project photos:  node scripts/realizacje-projekty.mjs
//
// Sources (raw, not in the repo):
//   _tresci/obrazy/realizacje/projekty/album-<nr>.jpg  – full-size originals from the Google Photos album
//                                                      (album.json, numbers as in _tresci/obrazy/INDEX.md)
//   _tresci/obrazy/realizacje/IMG_xxxx.jpg            – originals already downloaded earlier
//   _tresci/facebook/zdjecia/fb-<date>-<n>.jpg        – copies from the Facebook posts (686–1080 px)
// Output: public/img/realizacje/projekty/<name>.webp (max 1600 px) + <name>-800.webp (max 800 px)
//         public/img/realizacje/projekty/og/<slug>.jpg (1200×630, Open Graph)
// Photos that were already processed by scripts/images.mjs (public/img/realizacje/) are reused as they are
// and are NOT listed here – except IMG_4279, which gets a privacy-blurred copy (see below).
//
// PRIVACY (blur boxes in source pixels, after EXIF rotation). Keep this list in sync with
// docs/realizacje-do-potwierdzenia.md:
//   album-327            licence plate of the tow truck carrying the mini crane
//   IMG_4279             person visible through the arched transom glass (face in profile)
//   fb-2026-08-09-1/2/7  licence plate of the company van (Mercedes Sprinter)
//   fb-2026-07-05-10     small figure of a person seen through the corner window
// Other edits: fb-2026-02-03-1 cropped (caption text from the FB post removed), fb-2026-02-03-6 cropped
// on the left (laundry on the terrace).
import sharp from 'sharp';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ALBUM = '_tresci/obrazy/realizacje/projekty';
const OLD = '_tresci/obrazy/realizacje';
const FB = '_tresci/facebook/zdjecia';
const OUT = 'public/img/realizacje/projekty';

const ensure = (dir) => existsSync(dir) || mkdirSync(dir, { recursive: true });
ensure(OUT);
ensure(join(OUT, 'og'));

/** [source, output name, options] – options: blur: [{left, top, width, height}], crop: {left, top, width, height} */
const PHOTOS = [
  // P1 – witryna 330 kg, mini żuraw (album 323–338, 01–03.12.2025)
  [`${ALBUM}/album-325.jpg`, 'witryna-otwor-przed-montazem-widok-z-wnetrza'],
  [`${ALBUM}/album-326.jpg`, 'witryna-budynek-otwor-przed-montazem'],
  [`${ALBUM}/album-327.jpg`, 'witryna-mini-zuraw-hoeflon-c4-rozladunek', { blur: [{ left: 1640, top: 1930, width: 250, height: 130 }] }],
  [`${ALBUM}/album-329.jpg`, 'witryna-mini-zuraw-osadzanie-tafli'],
  [`${ALBUM}/album-332.jpg`, 'witryna-budynek-okno-i-brama-antracyt'],
  [`${ALBUM}/album-333.jpg`, 'witryna-budynek-brama-segmentowa-antracyt'],
  [`${ALBUM}/album-336.jpg`, 'witryna-budynek-przeszklenie-narozne'],
  [`${ALBUM}/album-337.jpg`, 'witryna-budynek-po-montazu'],
  [`${ALBUM}/album-338.jpg`, 'witryna-budynek-drzwi-wejsciowe-antracyt'],

  // P2 – drzwi drewniane w kamienicy, Płock (album 339–342, 23.12.2025)
  [`${OLD}/IMG_4279.jpg`, 'drzwi-drewniane-kamienica-plock-01', { blur: [{ left: 1880, top: 800, width: 400, height: 470 }] }],
  [`${ALBUM}/album-340.jpg`, 'drzwi-drewniane-kamienica-plock-od-wewnatrz'],
  [`${ALBUM}/album-342.jpg`, 'drzwi-drewniane-kamienica-plock-front'],

  // P3 – dom szkieletowy, okna ze szprosami (FB 19.01.2026 = przed, album 250–257 z 06.09.2025 = po)
  [`${FB}/fb-2026-01-19-1.jpg`, 'dom-szkieletowy-przed-montazem-01'],
  [`${FB}/fb-2026-01-19-2.jpg`, 'dom-szkieletowy-przed-montazem-02'],
  [`${ALBUM}/album-257.jpg`, 'dom-szkieletowy-po-okna-szprosy-taras'],
  [`${ALBUM}/album-253.jpg`, 'dom-szkieletowy-drzwi-balkonowe-szprosy-wnetrze'],
  [`${ALBUM}/album-254.jpg`, 'dom-szkieletowy-drzwi-balkonowe-szprosy-widok-na-taras'],
  [`${ALBUM}/album-255.jpg`, 'dom-szkieletowy-klamki-retro-detal'],

  // P5 – dom parterowy zimą (album 343–358, 28–29.01.2026)
  [`${ALBUM}/album-343.jpg`, 'dom-parterowy-zima-naroznik-okna'],
  [`${ALBUM}/album-344.jpg`, 'dom-parterowy-zima-widok-ogolny'],
  [`${ALBUM}/album-349.jpg`, 'dom-parterowy-zima-drzwi-tarasowe-przesuwne'],
  [`${ALBUM}/album-352.jpg`, 'dom-parterowy-zima-sciana-boczna-okna'],
  [`${ALBUM}/album-353.jpg`, 'dom-parterowy-zima-okno-antracyt'],
  [`${ALBUM}/album-355.jpg`, 'dom-parterowy-zima-brama-i-wejscie'],
  [`${ALBUM}/album-356.jpg`, 'dom-parterowy-zima-drzwi-wejsciowe-antracyt'],
  [`${ALBUM}/album-357.jpg`, 'dom-parterowy-zima-brama-segmentowa-antracyt'],
  [`${ALBUM}/album-358.jpg`, 'dom-parterowy-zima-front'],

  // P6 – wymiana okien i drzwi bez remontu (FB 03.02.2026; 1 = przed, 2–6 = po)
  [`${FB}/fb-2026-02-03-1.jpg`, 'wymiana-bez-remontu-przed-szczyt', { crop: { left: 0, top: 0, width: 789, height: 785 } }],
  [`${FB}/fb-2026-02-03-2.jpg`, 'wymiana-bez-remontu-po-szczyt'],
  [`${FB}/fb-2026-02-03-3.jpg`, 'wymiana-bez-remontu-drzwi-wejsciowe-antracyt'],
  [`${FB}/fb-2026-02-03-4.jpg`, 'wymiana-bez-remontu-okna-sciana-boczna'],
  [`${FB}/fb-2026-02-03-5.jpg`, 'wymiana-bez-remontu-drzwi-tarasowe'],
  [`${FB}/fb-2026-02-03-6.jpg`, 'wymiana-bez-remontu-elewacja-ogrodowa', { crop: { left: 110, top: 0, width: 679, height: 1052 } }],

  // P7 – okna drewnopodobne, brama 5 m, żaluzje fasadowe (FB 05.07.2026; 08-13-2/3 = lepsze kopie zdjęć 9 i 7)
  [`${FB}/fb-2026-07-05-1.jpg`, 'okna-drewnopodobne-dom-widok-ogolny'],
  [`${FB}/fb-2026-07-05-6.jpg`, 'okna-drewnopodobne-okno-narozne'],
  [`${FB}/fb-2026-08-13-3.jpg`, 'okna-drewnopodobne-okno-z-kaseta-zaluzji'],
  [`${FB}/fb-2026-08-13-2.jpg`, 'okna-drewnopodobne-zaluzja-fasadowa-opuszczona'],
  [`${FB}/fb-2026-07-05-10.jpg`, 'okna-drewnopodobne-okno-narozne-zaluzje-od-wewnatrz', { blur: [{ left: 0, top: 495, width: 64, height: 105 }] }],
  [`${FB}/fb-2026-07-05-3.jpg`, 'okna-drewnopodobne-brama-garazowa-5-m'],
  [`${FB}/fb-2026-07-05-4.jpg`, 'okna-drewnopodobne-brama-garazowa-od-wewnatrz'],
  [`${FB}/fb-2026-07-05-2.jpg`, 'okna-drewnopodobne-sciana-z-drzwiami-tarasowymi'],

  // P8 – okna DAKO/VEKA z HST, drzwi, brama, rolety (FB 09.08.2026; 08-13-1 = zdjęcie 10)
  [`${FB}/fb-2026-08-09-1.jpg`, 'okna-dako-hst-dom-z-busem-ekipy', { blur: [{ left: 296, top: 620, width: 38, height: 34 }] }],
  [`${FB}/fb-2026-08-09-4.jpg`, 'okna-dako-hst-dom-widok-ogolny'],
  [`${FB}/fb-2026-08-09-6.jpg`, 'okna-dako-hst-naroznik-duze-przeszklenia'],
  [`${FB}/fb-2026-08-09-3.jpg`, 'okna-dako-hst-okna-pod-okapem'],
  [`${FB}/fb-2026-08-09-5.jpg`, 'okna-dako-hst-naroznik-okna'],
  [`${FB}/fb-2026-08-09-9.jpg`, 'okna-dako-hst-okno-i-drzwi-wejsciowe'],
  [`${FB}/fb-2026-08-13-1.jpg`, 'okna-dako-hst-roleta-zewnetrzna'],
  [`${FB}/fb-2026-08-09-2.jpg`, 'okna-dako-hst-bus-przy-budowie', { blur: [{ left: 0, top: 905, width: 96, height: 100 }] }],
  [`${FB}/fb-2026-08-09-8.jpg`, 'okna-dako-hst-dom-niebo'],
  [`${FB}/fb-2026-08-09-7.jpg`, 'okna-dako-hst-dom-i-bus', { blur: [{ left: 716, top: 700, width: 70, height: 46 }] }],
];

/** Open Graph images 1200×630 per page: [slug, source, sharp `position` for the cover crop] */
const OG = [
  ['realizacje', `${OLD}/IMG_4155.jpg`, 'centre'],
  ['witryna-330-kg-mini-dzwig', `${OLD}/IMG_4155.jpg`, 'centre'],
  ['drzwi-drewniane-kamienica-plock', `${ALBUM}/album-342.jpg`, 'north'],
  ['okna-ze-szprosami-dom-szkieletowy', `${OLD}/IMG_3506.jpg`, 'centre'],
  ['okna-drzwi-brama-dom-parterowy', `${ALBUM}/album-358.jpg`, 'centre'],
  ['wymiana-okien-i-drzwi-bez-remontu', `${FB}/fb-2026-02-03-2.jpg`, 'centre'],
  ['okna-drewnopodobne-zaluzje-fasadowe', `${FB}/fb-2026-07-05-6.jpg`, 'centre'],
  ['okna-dako-hst-dom-parterowy', `${FB}/fb-2026-08-09-4.jpg`, 'centre'],
];

/** Load a source, apply EXIF rotation, blur boxes and crop; returns a PNG buffer. */
async function prepare(src, { blur = [], crop } = {}) {
  let buf = await sharp(src).rotate().png().toBuffer();
  if (blur.length) {
    const meta = await sharp(buf).metadata();
    const layers = [];
    for (const b of blur) {
      const box = {
        left: Math.max(0, b.left),
        top: Math.max(0, b.top),
        width: Math.min(b.width, meta.width - Math.max(0, b.left)),
        height: Math.min(b.height, meta.height - Math.max(0, b.top)),
      };
      // pixelate first (nothing readable survives), then soften the blocks
      const small = Math.max(2, Math.round(Math.min(box.width, box.height) / 10));
      const piece = await sharp(buf)
        .extract(box)
        .resize(Math.max(2, Math.round(box.width / small)), Math.max(2, Math.round(box.height / small)), { fit: 'fill' })
        .resize(box.width, box.height, { fit: 'fill', kernel: 'nearest' })
        .blur(Math.max(1.5, small / 2))
        .toBuffer();
      layers.push({ input: piece, left: box.left, top: box.top });
    }
    buf = await sharp(buf).composite(layers).png().toBuffer();
  }
  if (crop) buf = await sharp(buf).extract(crop).png().toBuffer();
  return buf;
}

const sizes = {};
const prepared = {};
let count = 0;
for (const [src, name, opts] of PHOTOS) {
  if (!existsSync(src)) {
    console.warn(`Brak pliku: ${src}`);
    continue;
  }
  const buf = await prepare(src, opts);
  prepared[name] = buf;
  const big = await sharp(buf)
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile(join(OUT, `${name}.webp`));
  await sharp(buf)
    .resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 74 })
    .toFile(join(OUT, `${name}-800.webp`));
  sizes[name] = [big.width, big.height];
  count += 2;
}
writeFileSync('scripts/realizacje-projekty-rozmiary.json', JSON.stringify(sizes, null, 2));

for (const [slug, src, position] of OG) {
  const input = src.startsWith('blurred:') ? prepared[src.slice(8)] : src;
  if (!input || (typeof input === 'string' && !existsSync(input))) {
    console.warn(`Brak źródła OG: ${slug}`);
    continue;
  }
  await sharp(input)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(join(OUT, 'og', `${slug}.jpg`));
  count++;
}

console.log(`Gotowe: ${count} plików.`);
for (const [name, [w, h]] of Object.entries(sizes)) console.log(`${name}: ${w}×${h}`);
