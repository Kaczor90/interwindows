// Human-readable descriptions of configured items: live summary, project list, screen-reader
// description of the drawing and the plain-text "konfiguracja" field sent to kontakt.php.
import {
  productTypes,
  contexts,
  templateById,
  systemById,
  finishById,
  handleById,
  openings,
  panes,
  glassToggles,
  safetyGlass,
  barKinds,
  hinges,
  security,
  shadings,
  drives,
  screens,
  sills,
  mountings,
  removal,
  type Item,
  type Project,
  type Choice,
} from '../../data/konfigurator';
import { fieldsOf, fieldName } from './rysunek';

type AnyChoice = Choice<string | number>;
const find = <T extends AnyChoice>(list: readonly T[], id: string | number) => list.find((c) => c.id === id);
const mark = (c: { tbc?: boolean | string } | undefined, on: boolean) => (on && c?.tbc ? ' (do potwierdzenia)' : '');
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export const typeLabel = (item: Item) => find(productTypes, item.type)?.label ?? 'Okno';
export const finishLabel = (id: string) => {
  const f = finishById(id);
  return f.code ? `${f.label} ${f.code}` : f.label;
};
export const itemTitle = (item: Item, i: number) => `${i + 1}. ${item.name.trim() || typeLabel(item)}`;

export function sizeText(item: Item, long = false) {
  if (item.sizeMode !== 'wlasne') return long ? 'poda technik przy pomiarze' : 'do pomiaru';
  const v = (x: number) => (Number.isFinite(x) && x > 0 ? String(Math.round(x)) : '?');
  return `${v(item.w)} × ${v(item.h)} mm${long ? ' (orientacyjnie)' : ''}`;
}

export function layoutText(item: Item) {
  return fieldsOf(item)
    .map((_, k) => `${fieldName(item, k)}: ${openings[item.openings[k] ?? 'fix'].label}`)
    .join('; ');
}

export function glassText(item: Item, tbc = false) {
  const g = item.glass;
  const parts = [find(panes, g.pane)?.label.replace('Pakiet', 'pakiet') ?? ''];
  for (const t of glassToggles) if (g[t.id]) parts.push(lower(t.label) + mark(t, tbc));
  if (g.safety !== 'none') {
    const s = find(safetyGlass, g.safety);
    parts.push(lower(s?.label ?? '') + mark(s, tbc));
  }
  return parts.filter(Boolean).join(', ');
}

export function barsText(item: Item, tbc = false) {
  if (item.bars.kind === 'none') return 'bez szprosów';
  const b = find(barKinds, item.bars.kind);
  const kind = (b?.label ?? '').replace(/^Szprosy /, '');
  return `${kind}${mark(b, tbc)}: ${item.bars.v} pion. × ${item.bars.h} poz. w każdym polu`;
}

export function hardwareText(item: Item, tbc = false) {
  const h = find(hinges, item.hardware.hinges);
  const s = find(security, item.hardware.rc);
  return [
    // sliding doors have no turn hinges
    item.type === 'hst' ? '' : lower(h?.label ?? '') + mark(h, tbc),
    `klamka ${lower(handleById(item.hardware.handle).label)}`,
    lower(s?.label ?? '') + mark(s, tbc),
  ]
    .filter(Boolean)
    .join('; ');
}

export function extrasText(item: Item, tbc = false) {
  const e = item.extras;
  const parts: string[] = [];
  if (e.shading !== 'none') {
    const s = find(shadings, e.shading);
    parts.push(`${lower(s?.label ?? '')}, ${lower(find(drives, e.drive)?.label ?? '')}`);
  }
  if (e.screen !== 'none') {
    const s = find(screens, e.screen);
    parts.push(lower(s?.label ?? '') + mark(s, tbc));
  }
  if (item.type === 'okno') {
    for (const s of sills) if (e[s.id]) parts.push(lower(s.label) + mark(s, tbc));
  }
  return parts.length ? parts.join('; ') : 'bez dodatków';
}

export function mountText(item: Item, tbc = false) {
  const m = find(mountings, item.mount);
  return lower(m?.label ?? '') + mark(m, tbc);
}

export function systemText(item: Item) {
  const s = systemById(item.system);
  return `${s.label} – ${s.name} (${s.line})`;
}

/** Rows for the summary panel and the review step. */
export function itemRows(item: Item, tbc = false) {
  const tpl = templateById(item.template);
  const type = find(productTypes, item.type);
  return [
    { label: 'Typ', value: (type?.label ?? '') + mark(type, tbc) },
    { label: 'Kształt', value: tpl.label + mark(tpl, tbc) },
    { label: 'Otwieranie', value: layoutText(item) },
    { label: 'Wymiary', value: sizeText(item, true) },
    { label: 'System', value: systemText(item) },
    { label: 'Kolor', value: `zewnątrz ${finishLabel(item.colorOut)}, wewnątrz ${finishLabel(item.colorIn)}` },
    { label: 'Szyby', value: glassText(item, tbc) },
    { label: 'Szprosy', value: barsText(item, tbc) },
    { label: 'Okucia', value: hardwareText(item, tbc) },
    { label: 'Dodatki', value: extrasText(item, tbc) },
    { label: 'Montaż', value: mountText(item, tbc) },
  ];
}

/** One line for the project list. */
export function itemShort(item: Item) {
  const tpl = templateById(item.template);
  return [tpl.label, sizeText(item), systemById(item.system).label, `${finishById(item.colorOut).label} / ${finishById(item.colorIn).label}`].join(' · ');
}

/** Text for the aria-live description under the drawing. */
export function previewText(item: Item, view: 'in' | 'out') {
  const tpl = templateById(item.template);
  return `${typeLabel(item)}, ${lower(tpl.label)}, ${sizeText(item, true)}. Widok ${view === 'in' ? 'od wewnątrz' : 'z zewnątrz'}, kolor ${lower(
    finishLabel(view === 'in' ? item.colorIn : item.colorOut),
  )}. ${layoutText(item)}.`;
}

export const totalQty = (p: Project) => p.items.reduce((a, it) => a + it.qty, 0);
const plural = (n: number, one: string, few: string, many: string) =>
  n === 1 ? one : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? few : many;
export const positionsLabel = (n: number) => `${n} ${plural(n, 'pozycja', 'pozycje', 'pozycji')}`;

/** Plain-text "konfiguracja" field for kontakt.php (+ one JSON line for import/archive). */
export function projectText(p: Project, o: { contactTime?: string; link?: string }) {
  const ctx = find(contexts, p.context);
  const lines: string[] = [];
  lines.push(`PROJEKT Z KONFIGURATORA – ${positionsLabel(p.items.length)}, łącznie ${totalQty(p)} szt.`);
  lines.push('Projekt wstępny klienta: wymiary i parametry do sprawdzenia na pomiarze. Opcje „do potwierdzenia” czekają na potwierdzenie oferty.');
  lines.push(`Inwestycja: ${ctx ? lower(ctx.label) : 'nie podano'}`);
  if (p.context === 'wymiana') lines.push(`${removal.label}: ${p.demontaz ? 'tak' : 'nie'} (do potwierdzenia)`);
  if (o.contactTime) lines.push(`Preferowany kontakt: ${o.contactTime}`);
  if (o.link) lines.push(`Link do projektu: ${o.link}`);
  p.items.forEach((it, i) => {
    lines.push('');
    lines.push(`${itemTitle(it, i)} – ${typeLabel(it)}${find(productTypes, it.type)?.tbc ? ' (dostępność do potwierdzenia)' : ''} – ${it.qty} szt.`);
    for (const r of itemRows(it, true)) {
      if (r.label === 'Typ') continue;
      lines.push(`   ${r.label === 'Otwieranie' ? 'Otwieranie (widok od wewnątrz)' : r.label}: ${r.value}`);
    }
  });
  lines.push('');
  lines.push('JSON: ' + JSON.stringify({ v: p.v, context: p.context, demontaz: p.demontaz, items: p.items }));
  return lines.join('\n');
}
