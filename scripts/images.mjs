// Converts source images from _tresci/ into optimised files in public/.
// Run after adding or changing images:  node scripts/images.mjs
//
// - REALIZACJE: every photo from _tresci/obrazy/realizacje/ → public/img/realizacje/<ascii-name>.webp
//   (max 1600 px on the long edge) + <ascii-name>-800.webp (max 800 px). Descriptions live in
//   src/data/realizacje-zdjecia.ts – keep the names there in sync with this table.
// - SITE: hand-picked crops used in layouts (hero) and the Open Graph image.
// - LOGOS: header/footer logo, favicon, apple-touch-icon (from _tresci/logo/).
// - SUPPLIERS: supplier logos for the brands strip (from _tresci/obrazy/suppliers/).
//
// DAKO marketing photos (prefix DAKO_, INTERWINDOWS_o_nas.webp) carry a "© DAKO" watermark and are
// deliberately NOT processed (see docs/marka.md §7).
import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC = '_tresci/obrazy';
const LOGO = '_tresci/logo';
const OUT = 'public/img';

const ensure = (dir) => existsSync(dir) || mkdirSync(dir, { recursive: true });
ensure(`${OUT}/realizacje`);
ensure(`${OUT}/marki`);

let count = 0;

// ---------- realizacje: source file → ASCII name ----------
export const REALIZACJE = {
  '01878BE8-E44D-4324-8EC4-2515DA8EC7E4.jpg': 'grafika-wizualizacja-zielone-drzwi-kamienica',
  'IMG_1304.jpg': 'dom-pietrowy-stan-surowy-okna',
  'IMG_1789.jpg': 'dom-parterowy-ceramika-okna-zachod-slonca',
  'IMG_1878.jpg': 'okno-balkonowe-wysokie-ceramika',
  'IMG_2082.jpg': 'okno-narozne-antracyt-bez-slupka',
  'IMG_2083.jpg': 'przeszklenie-narozne-antracyt-widok-z-wnetrza',
  'IMG_2307.jpg': 'drzwi-przesuwne-tarasowe-antracyt',
  'IMG_2528.jpg': 'okno-narozne-antracyt-podbitka',
  'IMG_2634.jpg': 'brama-segmentowa-antracyt-stan-surowy',
  'IMG_3166.jpg': 'dom-drewniany-z-gankiem',
  'IMG_3325.jpg': 'wnetrze-przeszklenia-narozne-widok-na-lake',
  'IMG_3327.jpg': 'wnetrze-duze-okno-widok-na-pola',
  'IMG_3328.jpg': 'wnetrze-okno-narozne-widok-na-pole',
  'IMG_3388.jpg': 'drzwi-zewnetrzne-zloty-dab-czarna-rama',
  'IMG_3429.jpg': 'garaz-elewacja-terakota-otwarta-brama',
  'IMG_3436.jpg': 'bramy-segmentowe-antracyt-elewacja-terakota-01',
  'IMG_3437.jpg': 'bramy-segmentowe-antracyt-elewacja-terakota-02',
  'IMG_3501.jpg': 'okno-biale-szprosy-widok-z-wnetrza',
  'IMG_3502.jpg': 'okno-biale-szprosy-klamka-detal',
  'IMG_3506.jpg': 'czarny-dom-drewniany-biale-okna-szprosy',
  'IMG_3563.jpg': 'drzwi-zewnetrzne-orzech-doswietle-stan-surowy',
  'IMG_3609.jpg': 'dom-przeszklenie-szczytowe-stan-surowy',
  'IMG_3630.jpg': 'przeszklenie-szczytowe-zloty-dab-01',
  'IMG_3632.jpg': 'przeszklenie-szczytowe-zloty-dab-02',
  'IMG_3634.jpg': 'przeszklenie-szczytowe-wnetrze-wiezba',
  'IMG_3983.jpg': 'drzwi-zewnetrzne-jasny-dab-doswietle',
  'IMG_3993.jpg': 'brama-segmentowa-biala',
  'IMG_4008.jpg': 'drzwi-zewnetrzne-antracyt-przeszklenie',
  'IMG_4141.jpg': 'budynek-trzy-bramy-segmentowe-antracyt',
  'IMG_4144.jpg': 'bramy-segmentowe-od-wewnatrz-napedy',
  'IMG_4150.jpg': 'dostawa-przeszklen-samochod',
  'IMG_4155.jpg': 'montaz-szyby-minidzwig-przyssawka-01',
  'IMG_4157.jpg': 'montaz-szyby-minidzwig-przyssawka-02',
  'IMG_4279.jpg': 'zielone-drzwi-lukowe-kamienica-01',
  'IMG_4282.jpg': 'zielone-drzwi-lukowe-kamienica-02',
  'IMG_4292.jpg': 'logo-z-albumu-realizacje',
  'IMG_4522.jpg': 'drzwi-wewnetrzne-dab-wnetrze',
  'IMG_4524.jpg': 'drzwi-wewnetrzne-dab-korytarz',
  'IMG_4541.MOV.jpg': 'drzwi-tarasowe-zloty-dab-zima',
  'IMG_4544.jpg': 'okno-trojdzielne-zloty-dab-elewacja-01',
  'IMG_4545.jpg': 'okno-trojdzielne-zloty-dab-elewacja-02',
  'IMG_4550.jpg': 'drzwi-zewnetrzne-orzech-wejscie-wykonczone',
  'IMG_4573.jpg': 'drzwi-wewnetrzne-ciemne-intarsja',
  'IMG_4676.jpg': 'szyby-wielkoformatowe-na-stojakach-zima',
  'IMG_4755.jpg': 'montaz-szyby-przyssawka-prozniowa-01',
  'IMG_4756.jpg': 'montaz-szyby-przyssawka-prozniowa-02',
  'IMG_4766.jpg': 'przeszklenie-narozne-dom-ceramika',
  'IMG_4774.jpg': 'przeszklenie-narozne-pod-okapem',
};

const sizes = {};
for (const [src, name] of Object.entries(REALIZACJE)) {
  const file = join(SRC, 'realizacje', src);
  if (!existsSync(file)) {
    console.warn(`Brak pliku: ${file}`);
    continue;
  }
  // rotate() applies EXIF orientation, so phone photos are not sideways
  const big = await sharp(file)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile(join(OUT, 'realizacje', `${name}.webp`));
  await sharp(file)
    .rotate()
    .resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 74 })
    .toFile(join(OUT, 'realizacje', `${name}-800.webp`));
  sizes[name] = [big.width, big.height];
  count += 2;
}
// sizes are written to a JSON file so the manifest can be checked against the real output
writeFileSync('scripts/realizacje-rozmiary.json', JSON.stringify(sizes, null, 2));

// ---------- AI illustrations (_tresci/ai/, see _tresci/ai/INDEX.md) ----------
// Illustrative images, NOT the company's projects – never use them on /realizacje/ or for crew cards.
// Output keeps the ai- prefix: public/img/ai/<name>.webp (max 1600 px, backgrounds 2000 px) + <name>-800.webp.
// Metadata (alt texts, where used): src/data/ai-zdjecia.ts.
ensure(`${OUT}/ai`);
const AI_SRC = '_tresci/ai';
const AI_WIDE = new Set(['ai-montaz-ekipa-dojazd']); // section backgrounds
const aiSizes = {};
if (existsSync(AI_SRC)) {
  for (const file of readdirSync(AI_SRC).filter((f) => /^ai-.+\.(jpe?g|png|webp)$/i.test(f)).sort()) {
    const name = file.replace(/\.[^.]+$/, '');
    const max = AI_WIDE.has(name) ? 2000 : 1600;
    const big = await sharp(join(AI_SRC, file))
      .rotate()
      .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(join(OUT, 'ai', `${name}.webp`));
    await sharp(join(AI_SRC, file))
      .rotate()
      .resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 76 })
      .toFile(join(OUT, 'ai', `${name}-800.webp`));
    aiSizes[name] = [big.width, big.height];
    count += 2;
  }
  writeFileSync('scripts/ai-rozmiary.json', JSON.stringify(aiSizes, null, 2));
}

// ---------- hero + Open Graph ----------
// Black timber house with white muntin windows (IMG_3506). The crop removes a yellow site hose on the left.
const HERO_SRC = join(SRC, 'realizacje', 'IMG_3506.jpg');
const HERO_CROP = { left: 560, top: 120, width: 3472, height: 2904 };
for (const [w, suffix] of [[1600, ''], [960, '-960']]) {
  await sharp(HERO_SRC).rotate().extract(HERO_CROP).resize({ width: w }).webp({ quality: 74 }).toFile(join(OUT, `hero-dom${suffix}.webp`));
  count++;
}

// og.jpg 1200×630: realization photo, dark gradient on the left, white logo
{
  const W = 1200;
  const H = 630;
  const photo = await sharp(HERO_SRC).rotate().extract({ left: 640, top: 420, width: 3392, height: 1781 }).resize(W, H).toBuffer();
  const shade = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#131418" stop-opacity=".82"/><stop offset=".55" stop-color="#131418" stop-opacity=".35"/><stop offset="1" stop-color="#131418" stop-opacity="0"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/><rect x="64" y="${H - 72}" width="56" height="2" fill="#B08D57"/></svg>`,
  );
  const logo = await sharp(join(LOGO, 'logo-poziome-propozycja-white.png')).resize({ height: 104 }).toBuffer();
  await sharp(photo)
    .composite([
      { input: shade, left: 0, top: 0 },
      { input: logo, left: 64, top: 64 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile('public/og.jpg');
  count++;
}

// ---------- logos ----------
// Header: horizontal proposal (docs/marka.md §1.5, needs client approval), 2× for retina at ~48 px.
await sharp(join(LOGO, 'logo-poziome-propozycja.png')).resize({ height: 104 }).png({ compressionLevel: 9 }).toFile(join(OUT, 'logo.png'));
await sharp(join(LOGO, 'logo-poziome-propozycja-white.png')).resize({ height: 104 }).png({ compressionLevel: 9 }).toFile(join(OUT, 'logo-poziome-white.png'));
// Footer / dark backgrounds: vertical white logo without the slogan (slogan is set as text).
await sharp(join(LOGO, 'logo-white.png')).resize({ width: 280 }).png({ compressionLevel: 9 }).toFile(join(OUT, 'logo-white.png'));
// Full-size logo for schema.org "logo" (square-ish, light background version).
await sharp(join(LOGO, 'logo.png')).resize({ width: 512 }).png({ compressionLevel: 9 }).toFile(join(OUT, 'logo-schema.png'));
count += 4;

// Favicon + apple-touch-icon: sygnet on the warm white of the logo background.
// Below ~32 px the 3D sygnet loses detail – a vector redraw is recommended (docs/marka.md §1.4).
const icon = async (size, pad, radius) => {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(join(LOGO, 'sygnet.png')).trim().resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const bg = Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" rx="${radius}" fill="#F7F6F5"/></svg>`);
  return sharp(bg).composite([{ input: mark, gravity: 'center' }]).png({ compressionLevel: 9 }).toBuffer();
};
writeFileSync('public/apple-touch-icon.png', await icon(180, 0.14, 0));
writeFileSync('public/favicon-32.png', await icon(32, 0.06, 6));
writeFileSync('public/favicon-192.png', await icon(192, 0.12, 36));
// favicon.ico for browsers that request it by default: an ICO container with one embedded 48 px PNG
{
  const png = await icon(48, 0.06, 9);
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  header.writeUInt8(48, 6); // width
  header.writeUInt8(48, 7); // height
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14); // image size
  header.writeUInt32LE(22, 18); // offset
  writeFileSync('public/favicon.ico', Buffer.concat([header, png]));
}
count += 4;

// ---------- supplier logos ----------
const SUPPLIERS = [
  ['dako.jpg', 'dako'],
  ['sonarol.webp', 'sonarol'],
  ['allwindows.webp', 'all-windows'],
  ['wiked.png', 'wiked'],
  ['dre.jpeg', 'dre'],
  ['lagrus.png', 'lagrus'],
  ['baranski.png', 'baranski'],
  ['fill.png', 'fill'],
  ['doorsystem.png', 'doorsystem'],
];
for (const [src, name] of SUPPLIERS) {
  await sharp(join(SRC, 'suppliers', src))
    .flatten({ background: '#ffffff' })
    .trim({ threshold: 20 })
    .resize({ height: 120, width: 360, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(join(OUT, 'marki', `${name}.png`));
  count++;
}

console.log(`Gotowe: ${count} plików.`);
