// Parametric SVG drawing of one configured item (pure functions → SVG string).
// Used at build time (template thumbnails in Configurator.astro) and in the browser (live preview,
// project list, summary). Geometry is in millimetres; line widths are scaled so they look the same
// at any drawing size.
//
// Conventions (standard European elevation symbols, to be confirmed against DAKO catalogues):
//   - default view = from the inside; "lewe" = hinges on the left seen from the inside
//   - turn: two lines from the handle-side corners meeting in the middle of the HINGE side
//   - tilt: two lines from the top corners meeting in the middle of the BOTTOM edge
//   - solid lines = sash opens towards the viewer (inside view), dashed = away from the viewer (outside view)
//   - sliding (HST): arrow in the sliding direction with a short "lift" stroke at its tail; F = fixed glazing
//   - handles and hinge caps are drawn only in the inside view (they are not visible from outside)
import {
  templateById,
  systemById,
  finishById,
  handleById,
  openings as OPENINGS,
  openingCycle,
  type Item,
  type Opening,
} from '../../data/konfigurator';

export type View = 'in' | 'out';
export type Mode = 'full' | 'mini' | 'thumb';

export interface Field {
  x: number;
  y: number;
  w: number;
  h: number;
  transom: boolean;
  /** index in the row and number of fields in the row */
  col: number;
  cols: number;
}

const n = (v: number) => Math.round(v * 10) / 10;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Size used for the drawing: own dimensions (clamped to the template limits) or template proportions. */
export function itemSize(item: Item) {
  const tpl = templateById(item.template);
  const own = item.sizeMode === 'wlasne';
  const pick = (v: number, lim: [number, number], d: number) => (own && Number.isFinite(v) && v > 0 ? clamp(v, lim[0], lim[1]) : d);
  return { w: pick(item.w, tpl.limits.w, tpl.size.w), h: pick(item.h, tpl.limits.h, tpl.size.h), own };
}

/** Clear openings of all fields (rows top→bottom, columns left→right, inside view). */
export function layoutFields(item: Item, W: number, H: number): Field[] {
  const tpl = templateById(item.template);
  const { frame: f, mullion: m } = systemById(item.system).faces;
  const sumH = tpl.rows.reduce((a, r) => a + r.h, 0);
  const innerH = H - 2 * f - (tpl.rows.length - 1) * m;
  const fields: Field[] = [];
  let y = f;
  for (const r of tpl.rows) {
    const rh = (innerH * r.h) / sumH;
    const sumW = r.cols.reduce((a, c) => a + c, 0);
    const innerW = W - 2 * f - (r.cols.length - 1) * m;
    let x = f;
    r.cols.forEach((c, i) => {
      const cw = (innerW * c) / sumW;
      fields.push({ x, y, w: cw, h: rh, transom: !!r.transom, col: i, cols: r.cols.length });
      x += cw + m;
    });
    y += rh + m;
  }
  return fields;
}

/** Fields of the item's template without geometry (count, transom flags, names). */
export function fieldsOf(item: Item): Field[] {
  const tpl = templateById(item.template);
  return layoutFields(item, tpl.size.w, tpl.size.h);
}

/** Opening types allowed for field k. */
export function allowedOpenings(item: Item, k: number): Opening[] {
  const field = fieldsOf(item)[k];
  return field?.transom ? openingCycle.naswietle : openingCycle[item.type];
}

const POS: Record<number, string[]> = {
  1: [''],
  2: ['lewe', 'prawe'],
  3: ['lewe', 'środkowe', 'prawe'],
  4: ['skrajne lewe', 'środkowe lewe', 'środkowe prawe', 'skrajne prawe'],
};
/** "Pole 2 (prawe)" – position seen from the inside. */
export function fieldName(item: Item, k: number): string {
  const fs = fieldsOf(item);
  const f = fs[k];
  if (!f) return `Pole ${k + 1}`;
  const pos = f.transom ? 'naświetle' : (POS[f.cols]?.[f.col] ?? '');
  return fs.length === 1 ? 'Skrzydło' : `Pole ${k + 1}${pos ? ` (${pos})` : ''}`;
}

export interface DrawOptions {
  view: View;
  mode: Mode;
  /** unique prefix for pattern ids (several drawings live on one page) */
  id: string;
  /** clickable fields (role=button) – full preview only */
  interactive?: boolean;
  /** thumbnails: neutral white frame regardless of the item's colours */
  neutral?: boolean;
  /** full preview: inner size of the box the SVG is fitted into (px) – keeps labels ~12 px at any size */
  box?: { w: number; h: number };
}

export function drawItem(item: Item, o: DrawOptions): string {
  const tpl = templateById(item.template);
  const sys = systemById(item.system);
  const { w: W, h: H, own } = itemSize(item);
  const full = o.mode === 'full';
  const thumb = o.mode === 'thumb';
  const out = o.view === 'out';
  const isDoor = item.type !== 'okno';
  const person = full && isDoor;
  const fin = finishById(o.neutral ? 'bialy' : out ? item.colorOut : item.colorIn);
  const finOut = finishById(o.neutral ? 'bialy' : item.colorOut);
  const ex = item.extras;
  const shading = thumb ? 'none' : ex.shading;

  // ------------------------------------------------------------ geometry of extras (mm)
  const boxH = shading === 'roleta-nadstawna' ? 190 : shading === 'roleta-podtynkowa' ? 210 : shading === 'roleta-elewacyjna' ? 180 : shading === 'zaluzja' ? 150 : 0;
  const boxDrawn = boxH > 0 && (shading === 'roleta-nadstawna' || shading === 'roleta-podtynkowa' || out);
  const boxOver = shading === 'roleta-elewacyjna' ? 40 : shading === 'zaluzja' ? 30 : shading === 'roleta-podtynkowa' ? 20 : 0;
  const railsOutside = out && (shading === 'roleta-elewacyjna' || shading === 'roleta-podtynkowa' || shading === 'zaluzja') ? 42 : 0;
  const sill = !thumb && item.type === 'okno' && (out ? ex.sillOut : ex.sillIn);
  const sillOver = sill ? (out ? 45 : 60) : 0;
  const sillH = sill ? (out ? 30 : 36) : 0;
  const side = Math.max(boxOver, railsOutside, sillOver);
  const extW = W + 2 * side + (person ? 240 + 440 : 0);
  const extH = H + (boxDrawn ? boxH : 0) + sillH;

  // P = mm per screen pixel. Full preview: fitted to the box, minus the space taken by dimensions
  // and captions (≈95 px horizontally, ≈125 px vertically); small drawings: fixed target size.
  const box = o.box ?? { w: 560, h: 400 };
  const P = full
    ? Math.max(extW / Math.max(140, box.w - 95), extH / Math.max(110, box.h - 125))
    : Math.max(extW, extH * 1.2) / (o.mode === 'mini' ? 150 : 104);
  const sw = (k: number) => n(k * P);

  const { mullion: mu } = sys.faces;
  const fields = layoutFields(item, W, H);
  const id = o.id.replace(/[^a-z0-9_-]/gi, '');
  const fill = fin.grain ? `url(#${id}-wood)` : fin.hex;

  // mirrored x for the outside view
  const X = (x: number) => n(out ? W - x : x);
  const R = (x: number, y: number, w: number, h: number) => `x="${n(out ? W - x - w : x)}" y="${n(y)}" width="${n(Math.max(0, w))}" height="${n(Math.max(0, h))}"`;

  // ------------------------------------------------------------ defs
  let defs = '';
  if (fin.grain) {
    const tw = 170 * P;
    const th = 44 * P;
    const wave = (y: number, a: number) => `M0 ${n(y)} q ${n(tw / 4)} ${n(a)} ${n(tw / 2)} 0 t ${n(tw / 2)} 0`;
    defs += `<pattern id="${id}-wood" patternUnits="userSpaceOnUse" width="${n(tw)}" height="${n(th)}"><rect width="${n(tw)}" height="${n(th)}" fill="${fin.hex}"/><path d="${wave(th * 0.2, -3 * P)} ${wave(th * 0.55, 2.5 * P)} ${wave(th * 0.85, -2 * P)}" fill="none" stroke="${fin.grain}" stroke-width="${sw(1.1)}" opacity=".55"/></pattern>`;
  }
  const mesh = out && ex.screen !== 'none' && !thumb;
  if (mesh) {
    const t = 4 * P;
    defs += `<pattern id="${id}-mesh" patternUnits="userSpaceOnUse" width="${n(t)}" height="${n(t)}"><path d="M0 0H${n(t)}M0 0V${n(t)}" class="kf-mesh-line" stroke-width="${sw(0.5)}"/></pattern>`;
  }

  const parts: string[] = [];

  // person for scale (behind everything, never mirrored)
  const personX = W + side + 240;
  if (person) {
    const x0 = personX;
    const y1 = H - 1800 + 255;
    parts.push(
      `<g class="kf-person"><circle cx="${n(x0 + 215)}" cy="${n(H - 1800 + 112)}" r="108"/>` +
        `<path d="M${x0 + 10} ${n(y1 + 90)} Q${x0 + 10} ${n(y1)} ${x0 + 100} ${n(y1)} H${x0 + 330} Q${x0 + 420} ${n(y1)} ${x0 + 420} ${n(y1 + 90)} V${n(y1 + 690)} H${x0 + 340} V${n(H)} H${x0 + 232} V${n(y1 + 760)} H${x0 + 198} V${n(H)} H${x0 + 90} V${n(y1 + 690)} H${x0 + 10} Z"/></g>` +
        `<text class="kf-cap" x="${n(x0 + 215)}" y="${n(H - 1800 - 40)}" font-size="${sw(10.5)}" text-anchor="middle">180 cm</text>`,
    );
  }

  // roller / blind box above the frame
  if (boxDrawn) {
    const bx = -boxOver;
    const bw = W + 2 * boxOver;
    if (shading === 'roleta-podtynkowa') {
      parts.push(`<rect class="kf-hidden" ${R(bx, -boxH, bw, boxH)} stroke-width="${sw(1)}" stroke-dasharray="${sw(6)} ${sw(4)}"/>`);
    } else {
      const boxFill = shading === 'roleta-nadstawna' ? fill : finOut.hex;
      parts.push(`<rect class="kf-box" ${R(bx, -boxH, bw, boxH)} fill="${boxFill}" stroke-width="${sw(1.2)}"/>`);
      if (shading === 'roleta-nadstawna' && !out) {
        parts.push(`<path class="kf-thin" d="M${X(bx + 30)} ${n(-boxH * 0.42)} H${X(bx + bw - 30)}" stroke-width="${sw(0.8)}"/>`);
      }
    }
  }

  // frame
  parts.push(`<rect class="kf-frame" ${R(0, 0, W, H)} fill="${fill}" stroke-width="${sw(thumb ? 1.3 : 1.4)}"/>`);

  // fields
  const glassCls = item.glass.matte && !thumb ? 'kf-glass kf-glass--mat' : 'kf-glass';
  fields.forEach((fd, k) => {
    const opId: Opening = item.openings[k] ?? 'fix';
    const op = OPENINGS[opId] ?? OPENINGS.fix;
    const moving = opId !== 'fix';
    const face = sys.faces.sash + (op.slide ? 24 : 0);
    const sash = { x: fd.x, y: fd.y, w: fd.w, h: fd.h };
    const g = moving ? { x: fd.x + face, y: fd.y + face, w: fd.w - 2 * face, h: fd.h - 2 * face } : { x: fd.x + 6, y: fd.y + 6, w: fd.w - 12, h: fd.h - 12 };
    const p: string[] = [];

    if (moving) p.push(`<rect class="kf-sash" ${R(sash.x, sash.y, sash.w, sash.h)} fill="${fill}" stroke-width="${sw(1.1)}"/>`);
    p.push(`<rect class="${glassCls}" ${R(g.x, g.y, g.w, g.h)} stroke-width="${sw(0.8)}"/>`);

    // reflections
    if (!thumb && !item.glass.matte) {
      const len = Math.min(g.w, g.h) * 0.2;
      const sx = g.x + g.w * 0.6;
      const sy = g.y + g.h * 0.1;
      p.push(`<path class="kf-shine" d="M${X(sx)} ${n(sy + len)} L${X(sx + len)} ${n(sy)} M${X(sx + len * 0.4)} ${n(sy + len * 1.3)} L${X(sx + len * 1.3)} ${n(sy + len * 0.4)}" stroke-width="${sw(1.4)}"/>`);
    }

    // glazing bars (same grid in every field)
    if (!thumb && item.bars.kind !== 'none') {
      const bw = item.bars.kind === 'wiedenskie' ? 26 : 16;
      const cls = item.bars.kind === 'wiedenskie' ? 'kf-bar' : 'kf-bar kf-bar--mid';
      const barFill = item.bars.kind === 'wiedenskie' ? fill : fin.hex;
      for (let i = 1; i <= item.bars.v; i++) {
        const x = g.x + (g.w * i) / (item.bars.v + 1) - bw / 2;
        p.push(`<rect class="${cls}" ${R(x, g.y, bw, g.h)} fill="${barFill}" stroke-width="${sw(0.6)}"/>`);
      }
      for (let j = 1; j <= item.bars.h; j++) {
        const y = g.y + (g.h * j) / (item.bars.h + 1) - bw / 2;
        p.push(`<rect class="${cls}" ${R(g.x, y, g.w, bw)} fill="${barFill}" stroke-width="${sw(0.6)}"/>`);
      }
    }

    // opening symbol
    const L = g.x;
    const Rr = g.x + g.w;
    const T = g.y;
    const B = g.y + g.h;
    const CX = g.x + g.w / 2;
    const CY = g.y + g.h / 2;
    let d = '';
    if (op.hinge === 'l') d += `M${X(Rr)} ${n(T)} L${X(L)} ${n(CY)} L${X(Rr)} ${n(B)} `;
    if (op.hinge === 'p') d += `M${X(L)} ${n(T)} L${X(Rr)} ${n(CY)} L${X(L)} ${n(B)} `;
    if (op.tilt) d += `M${X(L)} ${n(T)} L${X(CX)} ${n(B)} L${X(Rr)} ${n(T)} `;
    if (d) {
      const dash = out ? ` stroke-dasharray="${sw(7)} ${sw(5)}"` : '';
      p.push(`<path class="kf-sym" d="${d.trim()}" stroke-width="${sw(thumb ? 1 : 1.15)}"${dash}/>`);
    }
    if (op.slide) {
      const dir = op.slide === 'l' ? -1 : 1;
      const tail = CX - dir * g.w * 0.3;
      const head = CX + dir * g.w * 0.3;
      const ah = Math.min(g.w, g.h) * 0.07;
      p.push(
        `<path class="kf-sym" d="M${X(tail)} ${n(CY + g.h * 0.08)} L${X(tail)} ${n(CY)} L${X(head)} ${n(CY)} M${X(head - dir * ah)} ${n(CY - ah * 0.7)} L${X(head)} ${n(CY)} L${X(head - dir * ah)} ${n(CY + ah * 0.7)}" stroke-width="${sw(thumb ? 1.1 : 1.4)}"/>`,
      );
    }
    if (!moving) {
      const fsz = Math.min(g.w, g.h, 1400) * (thumb ? 0.2 : 0.11);
      p.push(`<text class="kf-fix" x="${X(CX)}" y="${n(CY + fsz * 0.36)}" font-size="${n(fsz)}" text-anchor="middle">F</text>`);
    }

    // hinge caps and handle – inside view only
    if (!out && moving) {
      if (!thumb && item.hardware.hinges === 'standard' && !op.slide) {
        const hw = face * 0.2;
        if (op.hinge) {
          const hx = (op.hinge === 'l' ? sash.x : sash.x + sash.w) - hw / 2;
          p.push(`<rect class="kf-hinge" ${R(hx, sash.y + 70, hw, 80)} stroke-width="${sw(0.6)}"/>`);
          p.push(`<rect class="kf-hinge" ${R(hx, sash.y + sash.h - 150, hw, 80)} stroke-width="${sw(0.6)}"/>`);
        } else if (op.tilt) {
          const hy = sash.y + sash.h - hw / 2;
          p.push(`<rect class="kf-hinge" ${R(sash.x + 70, hy, 80, hw)} stroke-width="${sw(0.6)}"/>`);
          p.push(`<rect class="kf-hinge" ${R(sash.x + sash.w - 150, hy, 80, hw)} stroke-width="${sw(0.6)}"/>`);
        }
      }
      const hc = handleById(item.hardware.handle).hex;
      const hs = `class="kf-handle" fill="${hc}" stroke-width="${sw(0.7)}"`;
      if (op.slide) {
        const cx = op.slide === 'l' ? sash.x + sash.w - face / 2 : sash.x + face / 2;
        const cy = clamp(sash.y + sash.h - 1050, sash.y + 200, sash.y + sash.h - 200);
        p.push(`<rect ${hs} ${R(cx - face * 0.16, cy - 170, face * 0.32, 340)} rx="${n(face * 0.12)}"/>`);
      } else if (op.hinge) {
        const cx = op.hinge === 'l' ? sash.x + sash.w - face / 2 : sash.x + face / 2;
        const cy = isDoor ? clamp(sash.y + sash.h - 1050, sash.y + 200, sash.y + sash.h - 200) : sash.y + sash.h / 2;
        const bw = face * 0.42;
        const bh = face * 0.95;
        p.push(`<rect ${hs} ${R(cx - bw / 2, cy - bh / 2, bw, bh)} rx="${n(bw * 0.3)}"/>`);
        p.push(`<rect ${hs} ${R(cx - face * 0.12, cy - face * 0.08, face * 0.24, face * 1.75)} rx="${n(face * 0.1)}"/>`);
      } else if (op.tilt) {
        const cx = sash.x + sash.w / 2;
        const cy = sash.y + face / 2;
        const bw = face * 0.95;
        const bh = face * 0.42;
        p.push(`<rect ${hs} ${R(cx - bw / 2, cy - bh / 2, bw, bh)} rx="${n(bh * 0.3)}"/>`);
        p.push(`<rect ${hs} ${R(cx - face * 0.08, cy - face * 0.12, face * 1.75, face * 0.24)} rx="${n(face * 0.1)}"/>`);
      }
    }

    // insect screen over opening sashes – outside view
    if (mesh && moving) {
      p.push(`<rect class="kf-mesh" ${R(sash.x + face * 0.35, sash.y + face * 0.35, sash.w - face * 0.7, sash.h - face * 0.7)} fill="url(#${id}-mesh)" stroke-width="${sw(0.9)}"/>`);
    }

    if (o.interactive && full) {
      const allowed = fd.transom ? openingCycle.naswietle : openingCycle[item.type];
      const label = `${fieldName(item, k)}: ${op.label}. Naciśnij, aby zmienić sposób otwierania (${allowed.length} warianty).`;
      p.push(`<rect class="kf-hit" ${R(fd.x, fd.y, fd.w, fd.h)}/>`);
      parts.push(`<g class="kf-field" data-field="${k}" role="button" tabindex="0" aria-label="${esc(label)}">${p.join('')}</g>`);
    } else {
      parts.push(p.join(''));
    }
  });

  // external shading: rails and partly lowered curtain / lamellas (outside view)
  if (out && shading !== 'none') {
    const rw = shading === 'zaluzja' ? 26 : 42;
    const inFrame = shading === 'roleta-nadstawna';
    const lx = inFrame ? 0 : -rw;
    const rx = inFrame ? W - rw : W;
    const top = -boxH;
    const railCls = `class="kf-rail" fill="${finOut.hex}" stroke-width="${sw(0.8)}"`;
    parts.push(`<rect ${railCls} ${R(lx, top, rw, H - top)}/>`, `<rect ${railCls} ${R(rx, top, rw, H - top)}/>`);
    const cx0 = inFrame ? rw : 0;
    const cw = inFrame ? W - 2 * rw : W;
    if (shading === 'zaluzja') {
      const drop = H * 0.3;
      for (let y = 30; y < drop; y += 85) {
        parts.push(`<rect class="kf-slat" ${R(cx0, y, cw, 58)} fill="${finOut.hex}" stroke-width="${sw(0.6)}"/>`);
      }
    } else {
      const drop = H * 0.14;
      parts.push(`<rect class="kf-curtain" ${R(cx0, 0, cw, drop)} fill="${finOut.hex}" stroke-width="${sw(0.8)}"/>`);
      let lines = '';
      for (let y = 40; y < drop - 10; y += 40) lines += `M${X(cx0)} ${n(y)} H${X(cx0 + cw)} `;
      if (lines) parts.push(`<path class="kf-thin" d="${lines.trim()}" stroke-width="${sw(0.5)}"/>`);
    }
  }

  // sills
  if (sill) {
    parts.push(`<rect class="${out ? 'kf-sill kf-sill--out' : 'kf-sill'}" ${R(-sillOver, H, W + 2 * sillOver, sillH)} stroke-width="${sw(1)}"/>`);
    if (out) parts.push(`<path class="kf-thin" d="M${X(-sillOver)} ${n(H + sillH * 0.55)} H${X(W + sillOver)}" stroke-width="${sw(0.6)}"/>`);
  }

  // ------------------------------------------------------------ dimensions (full preview only)
  const fs = 12.5 * P;
  let left = side + 6 * P;
  let right = side + (person ? 240 + 440 : 0) + 6 * P;
  let top = (boxDrawn ? boxH : 0) + 6 * P;
  let bottom = sillH + 6 * P;
  if (full) {
    // architectural 45° ticks at dimension ends
    const tick = (x: number, y: number) => `M${n(x - 4 * P)} ${n(y + 4 * P)} L${n(x + 4 * P)} ${n(y - 4 * P)} `;
    const tickV = tick;
    let lines = '';
    let ext = '';
    const texts: string[] = [];
    const label = (v: number) => (own ? `${Math.round(v)}` : '');

    // horizontal: segments of the bottom row (own sizes) + overall width
    const bottomRow = fields.filter((fd) => !fd.transom);
    const segs = own && bottomRow.length > 1;
    const y1 = H + sillH + 24 * P;
    const yOverall = segs ? y1 + 30 * P : y1;
    ext += `M0 ${n(H + sillH + 5 * P)} V${n(yOverall + 5 * P)} M${n(W)} ${n(H + sillH + 5 * P)} V${n(yOverall + 5 * P)} `;
    if (segs) {
      const bounds = [0, ...bottomRow.slice(0, -1).map((fd) => fd.x + fd.w + mu / 2), W];
      lines += `M0 ${n(y1)} H${n(W)} `;
      bounds.forEach((b, i) => {
        const bx = Number(X(b));
        lines += tick(bx, y1);
        if (i > 0 && i < bounds.length - 1) ext += `M${n(bx)} ${n(H + sillH + 5 * P)} V${n(y1 + 5 * P)} `;
        if (i < bounds.length - 1) {
          const mid = Number(X((b + bounds[i + 1]) / 2));
          texts.push(`<text class="kf-dim kf-dim--seg" x="${n(mid)}" y="${n(y1 - 5 * P)}" font-size="${n(fs * 0.85)}" text-anchor="middle">${label(bounds[i + 1] - b)}</text>`);
        }
      });
    }
    lines += `M0 ${n(yOverall)} H${n(W)} ` + tick(0, yOverall) + tick(W, yOverall);
    texts.push(`<text class="kf-dim" x="${n(W / 2)}" y="${n(yOverall + fs * 1.3)}" font-size="${n(fs)}" text-anchor="middle">${own ? `${Math.round(W)} mm` : 'do pomiaru'}</text>`);
    bottom = sillH + (yOverall - H - sillH) + fs * 1.3 + 10 * P;

    // vertical (left): transom split (own sizes) + overall height
    const vsegs = own && fields.some((fd) => fd.transom);
    const x1 = -side - 24 * P;
    const xOverall = vsegs ? x1 - 30 * P : x1;
    ext += `M${n(-side - 5 * P)} 0 H${n(xOverall - 5 * P)} M${n(-side - 5 * P)} ${n(H)} H${n(xOverall - 5 * P)} `;
    if (vsegs) {
      const tr = fields.find((fd) => fd.transom)!;
      const b = tr.y + tr.h + mu / 2;
      lines += `M${n(x1)} 0 V${n(H)} ` + tickV(x1, 0) + tickV(x1, b) + tickV(x1, H);
      ext += `M${n(-side - 5 * P)} ${n(b)} H${n(x1 - 5 * P)} `;
      texts.push(
        `<text class="kf-dim kf-dim--seg" x="${n(x1 + 5 * P + fs * 0.6)}" y="${n(b / 2)}" font-size="${n(fs * 0.85)}" text-anchor="middle" transform="rotate(-90 ${n(x1 + 5 * P + fs * 0.6)} ${n(b / 2)})">${label(b)}</text>`,
        `<text class="kf-dim kf-dim--seg" x="${n(x1 + 5 * P + fs * 0.6)}" y="${n((b + H) / 2)}" font-size="${n(fs * 0.85)}" text-anchor="middle" transform="rotate(-90 ${n(x1 + 5 * P + fs * 0.6)} ${n((b + H) / 2)})">${label(H - b)}</text>`,
      );
    }
    lines += `M${n(xOverall)} 0 V${n(H)} ` + tickV(xOverall, 0) + tickV(xOverall, H);
    const tx = xOverall - 8 * P;
    texts.push(`<text class="kf-dim" x="${n(tx)}" y="${n(H / 2)}" font-size="${n(fs)}" text-anchor="middle" transform="rotate(-90 ${n(tx)} ${n(H / 2)})">${own ? `${Math.round(H)} mm` : 'do pomiaru'}</text>`);
    left = -xOverall + 8 * P + fs + 6 * P;

    parts.push(`<path class="kf-ext" d="${ext.trim()}" stroke-width="${sw(0.7)}"/>`);
    parts.push(`<path class="kf-dimline" d="${lines.trim()}" stroke-width="${sw(1.1)}"/>`);
    parts.push(...texts);

    // caption
    top = (boxDrawn ? boxH : 0) + 34 * P;
    const capX = W + right - 6 * P;
    parts.push(`<text class="kf-cap" x="${n(capX)}" y="${n(-top + 14 * P)}" font-size="${sw(10.5)}" text-anchor="end">${out ? 'WIDOK Z ZEWNĄTRZ' : 'WIDOK OD WEWNĄTRZ'}</text>`);
  }

  const vb = `${n(-left)} ${n(-top)} ${n(W + left + right)} ${n(H + top + bottom)}`;
  const aria = full
    ? `role="group" aria-label="Rysunek pozycji – ${out ? 'widok z zewnątrz' : 'widok od wewnątrz'}"`
    : 'aria-hidden="true" focusable="false"';
  return `<svg class="kf-svg kf-svg--${o.mode} is-${o.view}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" ${aria}>${defs ? `<defs>${defs}</defs>` : ''}${parts.join('')}</svg>`;
}
