// srcset helpers with REAL w-descriptors.
// Image pairs in public/img are made by scripts/images.mjs and scripts/realizacje-projekty.mjs:
//   <name>.webp      – max 1600 px on the long edge (AI backgrounds 2000 px), `width`/`height` in the data files
//   <name>-800.webp  – max 800 px on the LONG edge, never upscaled
// So a portrait 1200×1600 photo has a 600 px wide small file – it must be described as "600w", not "800w",
// otherwise the browser picks the wrong file (blurry on phones, or an oversized download).
import { url } from './url';

/** Width of the small variant of a w×h image whose long edge is scaled down to `max` (default 800). */
export const smallWidth = (w: number, h: number, max = 800) => {
  const long = Math.max(w, h);
  return long <= max ? w : Math.round((w * max) / long);
};

/**
 * srcset for a big/small pair: `${small} {real small width}w, ${big} {width}w`.
 * Paths are root paths ('/img/…'); the base path is added here. `smallW` overrides the computed width
 * (e.g. /img/hero-dom-960.webp is 960 px wide, not scaled by the long edge).
 */
export const srcsetOf = (big: string, width: number, height: number, small?: string, smallW?: number) =>
  small ? `${url(small)} ${smallW ?? smallWidth(width, height)}w, ${url(big)} ${width}w` : undefined;
