// Konfigurator okien – logika w przeglądarce (vanilla TS, bundlowane przez Astro tylko na /konfigurator/).
// Stan projektu → localStorage (każdy dostęp w try/catch, działa też bez niego) + link w hashu (#p=…).
// Markup kroków i opcji renderuje Configurator.astro z src/data/konfigurator.ts; ten skrypt tylko
// synchronizuje pola ze stanem, rysuje podgląd (rysunek.ts), listę pozycji, podsumowanie i wysyła formularz.
//
// Zdarzenia dla analityki (do podpięcia później): window 'konfigurator' z detail.event =
// 'start' | 'step' | 'add' | 'copy-link' | 'submit' | 'sent'.
import {
  steps,
  templates,
  templateById,
  finishes,
  screens,
  openings as OPENINGS,
  defaultTemplate,
  defaultItem,
  newProject,
  uid,
  MAX_ITEMS,
  MAX_QTY,
  BARS_MAX,
  handles,
  systems,
  panes,
  safetyGlass,
  barKinds,
  hinges,
  security,
  shadings,
  drives,
  mountings,
  type Item,
  type Project,
  type Opening,
  type ProductType,
} from '../data/konfigurator';
import { drawItem, fieldsOf, fieldName, allowedOpenings, type View } from '../components/konfigurator/rysunek';
import { itemRows, itemShort, itemTitle, previewText, projectText, totalQty, positionsLabel } from '../components/konfigurator/opis';

const STORE_KEY = 'iw-konfigurator-v1';
const STEP_IDS = steps.map((s) => s.id);
const IDX = (id: (typeof STEP_IDS)[number]) => STEP_IDS.indexOf(id);

// ------------------------------------------------------------------ storage (never throws)
const storage = {
  read(): any {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  write(v: unknown) {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(v));
    } catch {
      /* private mode, quota or disabled storage – the configurator still works */
    }
  },
};

// ------------------------------------------------------------------ helpers
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clampInt = (v: unknown, a: number, b: number, d: number) => {
  const x = Math.round(Number(v));
  return Number.isFinite(x) ? Math.min(b, Math.max(a, x)) : d;
};
const oneOf = <T>(v: unknown, list: readonly T[], d: T): T => (list.includes(v as T) ? (v as T) : d);
const bool = (v: unknown, d: boolean) => (typeof v === 'boolean' ? v : d);
const ids = <T extends { id: unknown }>(list: readonly T[]) => list.map((x) => x.id as T['id']);
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const stacked = () => window.matchMedia('(max-width: 999px)').matches;
const emit = (event: string, detail: Record<string, unknown> = {}) => window.dispatchEvent(new CustomEvent('konfigurator', { detail: { event, ...detail } }));

// ------------------------------------------------------------------ state validation (localStorage / link data is untrusted)
function normalizeItem(raw: any): Item {
  const type = oneOf<ProductType>(raw?.type, ['okno', 'balkonowe', 'hst'], 'okno');
  const d = defaultItem(type);
  const g = raw?.glass ?? {};
  const b = raw?.bars ?? {};
  const hw = raw?.hardware ?? {};
  const e = raw?.extras ?? {};
  const it: Item = {
    id: typeof raw?.id === 'string' && /^[a-z0-9]{1,12}$/.test(raw.id) ? raw.id : d.id,
    name: typeof raw?.name === 'string' ? raw.name.slice(0, 40) : '',
    type,
    template: oneOf(raw?.template, templates.map((t) => t.id), d.template),
    openings: Array.isArray(raw?.openings) ? raw.openings.filter((o: unknown) => typeof o === 'string' && o in OPENINGS) : d.openings,
    sizeMode: oneOf(raw?.sizeMode, ['pomiar', 'wlasne'] as const, 'pomiar'),
    w: clampInt(raw?.w, 0, 20000, d.w),
    h: clampInt(raw?.h, 0, 20000, d.h),
    system: oneOf(raw?.system, ids(systems), 'pcv'),
    colorOut: oneOf(raw?.colorOut, ids(finishes), 'bialy'),
    colorIn: oneOf(raw?.colorIn, ids(finishes), 'bialy'),
    glass: {
      pane: oneOf(g.pane, ids(panes), 3),
      warmEdge: bool(g.warmEdge, d.glass.warmEdge),
      acoustic: bool(g.acoustic, false),
      matte: bool(g.matte, false),
      safety: oneOf(g.safety, ids(safetyGlass), 'none'),
    },
    bars: { kind: oneOf(b.kind, ids(barKinds), 'none'), v: clampInt(b.v, 0, BARS_MAX, 1), h: clampInt(b.h, 0, BARS_MAX, 1) },
    hardware: {
      hinges: oneOf(hw.hinges, ids(hinges), 'standard'),
      handle: oneOf(hw.handle, ids(handles), 'biala'),
      rc: oneOf(hw.rc, ids(security), 'none'),
    },
    extras: {
      shading: oneOf(e.shading, ids(shadings), 'none'),
      drive: oneOf(e.drive, ids(drives), 'reczny'),
      screen: oneOf(e.screen, ids(screens), 'none'),
      sillIn: bool(e.sillIn, false),
      sillOut: bool(e.sillOut, false),
    },
    mount: oneOf(raw?.mount, ids(mountings), 'doradztwo'),
    qty: clampInt(raw?.qty, 1, MAX_QTY, 1),
  };
  return consistent(it);
}

function normalizeProject(raw: any): Project {
  const items = Array.isArray(raw?.items) ? raw.items.slice(0, MAX_ITEMS).map(normalizeItem) : [];
  if (!items.length) items.push(defaultItem());
  return {
    v: 1,
    context: oneOf(raw?.context, ['', 'nowy', 'wymiana'] as const, ''),
    demontaz: bool(raw?.demontaz, false),
    items,
    current: clampInt(raw?.current, 0, items.length - 1, 0),
  };
}

/** Enforce dependencies between options after every change. */
function consistent(it: Item): Item {
  let tpl = templateById(it.template);
  if (tpl.type !== it.type) {
    tpl = templateById(defaultTemplate[it.type]);
    it.template = tpl.id;
    it.openings = [...tpl.openings];
  }
  it.openings = fieldsOf(it).map((_, k) => {
    const allowed = allowedOpenings(it, k);
    const o = it.openings[k];
    return allowed.includes(o) ? o : allowed.includes(tpl.openings[k]) ? tpl.openings[k] : allowed[0];
  });
  const available = finishes.filter((f) => f.systems.includes(it.system)).map((f) => f.id);
  if (!available.includes(it.colorOut)) it.colorOut = 'bialy';
  if (!available.includes(it.colorIn)) it.colorIn = 'bialy';
  const sc = screens.find((s) => s.id === it.extras.screen);
  if (!sc || !sc.types.includes(it.type)) it.extras.screen = 'none';
  if (it.type !== 'okno') {
    it.extras.sillIn = false;
    it.extras.sillOut = false;
  }
  return it;
}

function dimsError(it: Item): string {
  if (it.sizeMode !== 'wlasne') return '';
  const t = templateById(it.template);
  const bad = (v: number, [a, b]: [number, number]) => !Number.isFinite(v) || v < a || v > b;
  const msgs: string[] = [];
  if (bad(it.w, t.limits.w)) msgs.push(`szerokość od ${t.limits.w[0]} do ${t.limits.w[1]} mm`);
  if (bad(it.h, t.limits.h)) msgs.push(`wysokość od ${t.limits.h[0]} do ${t.limits.h[1]} mm`);
  return msgs.length
    ? `Podaj ${msgs.join(' i ')} albo wybierz „Wymiary poda nasz technik przy pomiarze”. Większe lub nietypowe wymiary omówimy z doradcą.`
    : '';
}

// ------------------------------------------------------------------ share link (#p=…)
const b64u = {
  enc(bytes: Uint8Array) {
    let s = '';
    bytes.forEach((b) => (s += String.fromCharCode(b)));
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  },
  dec(str: string) {
    const s = atob(str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4));
    return Uint8Array.from(s, (c) => c.charCodeAt(0));
  },
};
const shareable = (p: Project) => ({ v: 1, context: p.context, demontaz: p.demontaz, items: p.items.map(({ id, ...rest }) => rest) });

async function encodeProject(p: Project): Promise<string> {
  const bytes = new TextEncoder().encode(JSON.stringify(shareable(p)));
  if ('CompressionStream' in window) {
    try {
      const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'));
      return 'z' + b64u.enc(new Uint8Array(await new Response(stream).arrayBuffer()));
    } catch {
      /* fall through to plain encoding */
    }
  }
  return 'j' + b64u.enc(bytes);
}

async function decodeProject(code: string): Promise<Project | null> {
  try {
    let bytes = b64u.dec(code.slice(1));
    if (code[0] === 'z') {
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
      bytes = new Uint8Array(await new Response(stream).arrayBuffer());
    } else if (code[0] !== 'j') return null;
    return normalizeProject(JSON.parse(new TextDecoder().decode(bytes)));
  } catch {
    return null;
  }
}

const sameProject = (a: Project, b: Project) => JSON.stringify(shareable(a)) === JSON.stringify(shareable(b));
const isPristine = (p: Project) => sameProject(p, newProject());

// ------------------------------------------------------------------ app
async function init(root: HTMLElement) {
  const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const $$ = <T extends Element = HTMLElement>(sel: string) => [...root.querySelectorAll<T>(sel)];

  const stepBtns = $$<HTMLButtonElement>('[data-goto]');
  const stepEls = STEP_IDS.map((id) => $<HTMLElement>(`.kf-step[data-step="${id}"]`));
  const draw = $('[data-kf-draw]');
  const desc = $('[data-kf-desc]');
  const pos = $('[data-kf-pos]');
  const sum = $('[data-kf-sum]');
  const aside = $('[data-kf-aside]');
  const main = $('[data-kf-main]');
  const openingsBox = $('[data-kf-openings]');
  const dimsBox = $('[data-kf-dims]');
  const limitsEl = $('[data-kf-limits]');
  const dimsErr = $('[data-kf-dims-err]');
  const list = $<HTMLUListElement>('[data-kf-list]');
  const total = $('[data-kf-total]');
  const statusEl = $('[data-kf-status]');
  const linkbox = $('[data-kf-linkbox]');
  const review = $('[data-kf-review]');
  const reviewErr = $('[data-kf-review-err]');
  const plain = $('[data-kf-plain]');
  const prev = $<HTMLButtonElement>('[data-kf-prev]');
  const next = $<HTMLButtonElement>('[data-kf-next]');
  const nextLabel = $('[data-kf-next-label]');
  const count = $('[data-kf-count]');
  const form = $<HTMLFormElement>('[data-kf-request]');
  const addBtn = $<HTMLButtonElement>('[data-kf-add]');

  // ---------------------------------------------------------------- load state
  const saved = storage.read();
  let project: Project = saved?.project ? normalizeProject(saved.project) : newProject();
  let step = clampInt(saved?.step, 0, STEP_IDS.length - 1, 0);
  let view: View = saved?.view === 'out' ? 'out' : 'in';
  let showDimErrors = false;
  let notice = '';

  const hash = location.hash.match(/^#p=([A-Za-z0-9_-]+)$/);
  if (hash) {
    const loaded = await decodeProject(hash[1]);
    if (loaded) {
      const keepLocal =
        saved?.project && !isPristine(project) && !sameProject(project, loaded) &&
        !window.confirm('Otworzyć projekt z linku? Projekt zapisany w tej przeglądarce zostanie zastąpiony.');
      if (!keepLocal) {
        project = loaded;
        step = IDX('projekt');
        notice = 'Wczytano projekt z linku.';
      }
    } else {
      notice = 'Nie udało się odczytać projektu z linku. Otwieramy projekt zapisany w tej przeglądarce.';
    }
    history.replaceState(null, '', location.pathname + location.search);
  }

  const cur = () => project.items[project.current];
  const save = () => storage.write({ v: 1, project, step, view });

  // ---------------------------------------------------------------- state access by data-k path
  function getVal(k: string): unknown {
    if (k.startsWith('@')) return (project as any)[k.slice(1)];
    return k.split('.').reduce<any>((o, p) => (o == null ? o : o[p]), cur());
  }
  function setVal(k: string, raw: string | boolean) {
    if (k.startsWith('@')) {
      (project as any)[k.slice(1)] = raw;
      return;
    }
    const path = k.split('.');
    const last = path.pop()!;
    const obj = path.reduce<any>((o, p) => o[p], cur());
    const prevVal = obj[last];
    obj[last] = typeof raw === 'boolean' ? raw : typeof prevVal === 'number' ? (raw === '' ? 0 : Number(raw)) : raw;
  }

  function onField(k: string, value: string | boolean) {
    const it = cur();
    if (k === 'template') {
      const tpl = templateById(String(value));
      it.template = tpl.id;
      it.openings = [...tpl.openings];
      if (it.sizeMode === 'pomiar') Object.assign(it, { w: tpl.size.w, h: tpl.size.h });
    } else if (k === 'type') {
      it.type = value as ProductType;
      const tpl = templateById(it.template);
      if (tpl.type !== it.type) {
        const t = templateById(defaultTemplate[it.type]);
        Object.assign(it, { template: t.id, openings: [...t.openings] });
        if (it.sizeMode === 'pomiar') Object.assign(it, { w: t.size.w, h: t.size.h });
      }
    } else if (k === 'sizeMode') {
      it.sizeMode = value as Item['sizeMode'];
      if (it.sizeMode === 'wlasne' && (!it.w || !it.h)) {
        const t = templateById(it.template);
        Object.assign(it, { w: t.size.w, h: t.size.h });
      }
    } else {
      setVal(k, value);
    }
    // show the side of the window the option is visible from
    if (k === 'colorOut' || (k === 'extras.shading' && value !== 'none') || (k === 'extras.screen' && value !== 'none') || (k === 'extras.sillOut' && value)) view = 'out';
    if (k === 'colorIn' || k.startsWith('hardware.') || (k === 'extras.sillIn' && value)) view = 'in';
    consistent(it);
    save();
    render();
  }

  // ---------------------------------------------------------------- rendering
  let openingsSig = '';
  let descTimer = 0;

  function syncInputs() {
    $$<HTMLInputElement | HTMLSelectElement>('[data-k]').forEach((el) => {
      const v = getVal(el.dataset.k!);
      if (el instanceof HTMLInputElement && el.type === 'radio') el.checked = String(v) === el.value;
      else if (el instanceof HTMLInputElement && el.type === 'checkbox') el.checked = !!v;
      else if (document.activeElement !== el) el.value = v == null || (typeof v === 'number' && !v && el.type === 'number') ? '' : String(v);
    });
    $$<HTMLInputElement>('[data-kf-view]').forEach((r) => (r.checked = r.value === view));
  }

  function availability(it: Item) {
    $$<HTMLElement>('[data-types]').forEach((el) => (el.hidden = !el.dataset.types!.split(' ').includes(it.type)));
    $$<HTMLElement>('[data-systems]').forEach((el) => (el.hidden = !el.dataset.systems!.split(' ').includes(it.system)));
    $('[data-kf-drive]').hidden = it.extras.shading === 'none';
    $('[data-kf-bars]').hidden = it.bars.kind === 'none';
    $('[data-kf-removal]').hidden = project.context !== 'wymiana';
    $('[data-kf-hst-note]').hidden = it.type !== 'hst';
    $('[data-kf-rc-hint]').hidden = it.hardware.rc !== 'rc2';
    const door = it.type !== 'okno';
    $('[data-kf-sills]').hidden = door;
    $('[data-kf-sill-note]').hidden = !door;
  }

  function renderOpenings(it: Item) {
    const fs = fieldsOf(it);
    const sig = `${it.template}|${it.type}`;
    if (sig !== openingsSig) {
      openingsSig = sig;
      openingsBox.innerHTML = fs
        .map((_, k) => {
          const opts = allowedOpenings(it, k)
            .map((o) => `<option value="${o}">${esc(OPENINGS[o].label)}</option>`)
            .join('');
          return `<div class="field"><label for="kf-op-${k}">${esc(fieldName(it, k))}</label><select id="kf-op-${k}" data-op="${k}">${opts}</select></div>`;
        })
        .join('');
    }
    $$<HTMLSelectElement>('[data-op]').forEach((s) => (s.value = it.openings[Number(s.dataset.op)]));
  }

  function renderDims(it: Item) {
    const t = templateById(it.template);
    dimsBox.hidden = it.sizeMode !== 'wlasne';
    limitsEl.innerHTML = `Zakres dla kształtu „${esc(t.label)}”: szerokość ${t.limits.w[0]}–${t.limits.w[1]} mm, wysokość ${t.limits.h[0]}–${t.limits.h[1]} mm. <span class="tbc">wartości prototypowe, do potwierdzenia</span>`;
    const err = dimsError(it);
    dimsErr.textContent = showDimErrors ? err : '';
    const w = $<HTMLInputElement>('#kf-w');
    const h = $<HTMLInputElement>('#kf-h');
    w.min = String(t.limits.w[0]);
    w.max = String(t.limits.w[1]);
    h.min = String(t.limits.h[0]);
    h.max = String(t.limits.h[1]);
    const bad = (v: number, [a, b]: [number, number]) => it.sizeMode === 'wlasne' && showDimErrors && (!v || v < a || v > b);
    w.setAttribute('aria-invalid', String(bad(it.w, t.limits.w)));
    h.setAttribute('aria-invalid', String(bad(it.h, t.limits.h)));
  }

  function renderPreview(it: Item, announce?: string) {
    const focusedField = (document.activeElement as Element | null)?.closest?.('[data-field]')?.getAttribute('data-field');
    const cs = getComputedStyle(draw);
    const bw = draw.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const bh = draw.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const box = bw > 0 && bh > 0 ? { w: bw, h: bh } : undefined;
    draw.innerHTML = drawItem(it, { view, mode: 'full', id: 'kfp', interactive: true, box });
    if (focusedField != null) draw.querySelector<SVGGElement>(`[data-field="${focusedField}"]`)?.focus({ preventScroll: true });
    const name = it.name.trim();
    pos.textContent = `Pozycja ${project.current + 1} z ${project.items.length}${name ? ` · ${name}` : ''}`;
    window.clearTimeout(descTimer);
    if (announce) desc.textContent = announce;
    else descTimer = window.setTimeout(() => (desc.textContent = previewText(it, view)), 450);
  }

  function renderSummary(it: Item) {
    const rows = itemRows(it);
    sum.innerHTML =
      rows.map((r) => `<dt>${esc(r.label)}</dt><dd>${esc(r.value)}</dd>`).join('') + `<dt>Ilość</dt><dd>${it.qty} szt.</dd>`;
  }

  function renderList() {
    const n = project.items.length;
    total.textContent = `${positionsLabel(n)}, łącznie ${totalQty(project)} szt.`;
    list.innerHTML = project.items
      .map((it, i) => {
        const title = itemTitle(it, i);
        const isCur = i === project.current;
        return `<li class="kf-item${isCur ? ' is-current' : ''}">
          <div class="kf-item__draw">${drawItem(it, { view: 'in', mode: 'mini', id: `kfl${i}` })}</div>
          <div class="kf-item__body">
            <p class="kf-item__title">${esc(title)}${isCur ? '<span class="kf-item__badge">edytujesz</span>' : ''}</p>
            <p class="kf-item__meta">${esc(itemShort(it))}</p>
            <div class="kf-item__actions">
              <div class="kf-qty" role="group" aria-label="Ilość: ${esc(title)}">
                <button type="button" data-act="minus" data-i="${i}" aria-label="Mniej sztuk" ${it.qty <= 1 ? 'disabled' : ''}>−</button>
                <input type="number" inputmode="numeric" min="1" max="${MAX_QTY}" value="${it.qty}" data-act="qty" data-i="${i}" aria-label="Liczba sztuk" />
                <button type="button" data-act="plus" data-i="${i}" aria-label="Więcej sztuk" ${it.qty >= MAX_QTY ? 'disabled' : ''}>+</button>
                <span class="kf-qty__unit" aria-hidden="true">szt.</span>
              </div>
              <button type="button" class="kf-textbtn" data-act="edit" data-i="${i}" aria-label="Edytuj: ${esc(title)}">Edytuj</button>
              <button type="button" class="kf-textbtn" data-act="dup" data-i="${i}" aria-label="Duplikuj: ${esc(title)}">Duplikuj</button>
              <button type="button" class="kf-textbtn" data-act="del" data-i="${i}" aria-label="Usuń: ${esc(title)}">Usuń</button>
            </div>
          </div>
        </li>`;
      })
      .join('');
    addBtn.disabled = n >= MAX_ITEMS;
  }

  async function renderReview() {
    const ctx = project.context === 'nowy' ? 'nowy dom' : project.context === 'wymiana' ? 'wymiana okien' : 'nie podano';
    const head = `<article class="kf-rev kf-rev--project"><dl>
      <dt>Projekt</dt><dd>${esc(positionsLabel(project.items.length))}, łącznie ${totalQty(project)} szt.</dd>
      <dt>Inwestycja</dt><dd>${esc(ctx)}</dd>
      ${project.context === 'wymiana' ? `<dt>Demontaż</dt><dd>${project.demontaz ? 'tak' : 'nie'}</dd>` : ''}
    </dl></article>`;
    review.innerHTML =
      head +
      project.items
        .map(
          (it, i) => `<article class="kf-rev">
          <div class="kf-rev__draw">${drawItem(it, { view: 'in', mode: 'mini', id: `kfr${i}` })}</div>
          <div><h3>${esc(itemTitle(it, i))} – ${it.qty} szt.</h3>
          <dl>${itemRows(it, true)
            .map((r) => `<dt>${esc(r.label)}</dt><dd>${esc(r.value)}</dd>`)
            .join('')}</dl>
          <button type="button" class="kf-textbtn kf-rev__edit" data-act="edit" data-i="${i}">Zmień pozycję ${i + 1}</button></div>
        </article>`,
        )
        .join('');
    const bad = project.items.map((it, i) => (dimsError(it) ? i + 1 : 0)).filter(Boolean);
    reviewErr.textContent = bad.length ? `Popraw wymiary w pozycji ${bad.join(', ')} albo wybierz pomiar przez technika.` : '';
    plain.textContent = projectText(project, { contactTime: '(wybór z formularza)', link: await projectLink() });
  }

  function render() {
    const it = cur();
    const id = STEP_IDS[step];
    root.dataset.step = id;
    stepBtns.forEach((b, i) => {
      if (i === step) b.setAttribute('aria-current', 'step');
      else b.removeAttribute('aria-current');
      b.classList.toggle('is-done', i < step);
      b.classList.toggle('has-error', i === IDX('wymiary') && showDimErrors && !!dimsError(it));
    });
    stepEls.forEach((el, i) => (el.hidden = i !== step));
    availability(it);
    syncInputs();
    renderOpenings(it);
    renderDims(it);
    renderPreview(it);
    renderSummary(it);
    if (id === 'projekt') renderList();
    if (id === 'wysylka') void renderReview();
    prev.disabled = step === 0;
    nextLabel.textContent = id === 'montaz' ? 'Dalej: projekt' : id === 'projekt' ? 'Podsumowanie' : id === 'wysylka' ? 'Do formularza' : 'Dalej';
    count.textContent = `${step + 1} / ${STEP_IDS.length}`;
  }

  // ---------------------------------------------------------------- navigation
  const stepValid = (i: number) => STEP_IDS[i] !== 'wymiary' || !dimsError(cur());

  function scrollToSteps() {
    const header = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
    const asideH = stacked() && getComputedStyle(aside).position === 'sticky' && getComputedStyle(aside).display !== 'none' ? aside.getBoundingClientRect().height : 0;
    const target = main.getBoundingClientRect().top + window.scrollY - header - asideH - 12;
    const top = main.getBoundingClientRect().top;
    if (window.scrollY > target || top > window.innerHeight * 0.55) {
      window.scrollTo({ top: Math.max(0, target), behavior: reducedMotion() ? 'auto' : 'smooth' });
    }
  }

  function goTo(n: number, focus = true) {
    n = Math.min(STEP_IDS.length - 1, Math.max(0, n));
    if (n > step) {
      for (let i = step; i < n; i++) {
        if (!stepValid(i)) {
          showDimErrors = true;
          step = i;
          render();
          save();
          scrollToSteps();
          $<HTMLInputElement>(dimsError(cur()).startsWith('Podaj szer') ? '#kf-w' : '#kf-h').focus();
          return;
        }
      }
    }
    const changed = n !== step;
    step = n;
    render();
    save();
    if (changed) {
      scrollToSteps();
      if (focus) stepEls[step].querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
      stepBtns[step].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' });
      emit('step', { step: STEP_IDS[step], index: step + 1 });
    }
  }

  // ---------------------------------------------------------------- project actions
  function status(msg: string) {
    statusEl.textContent = '';
    window.setTimeout(() => (statusEl.textContent = msg), 30);
  }

  function addItem() {
    if (project.items.length >= MAX_ITEMS) return status(`Projekt może mieć najwyżej ${MAX_ITEMS} pozycji. Resztę omówimy z doradcą.`);
    const base = cur();
    const it = defaultItem('okno');
    // keep the "house style" of the previous item; per-window choices (bars, safety glass, RC, extras) start fresh
    Object.assign(it, {
      system: base.system,
      colorOut: base.colorOut,
      colorIn: base.colorIn,
      glass: { ...it.glass, pane: base.glass.pane, warmEdge: base.glass.warmEdge },
      hardware: { ...it.hardware, hinges: base.hardware.hinges, handle: base.hardware.handle },
      mount: base.mount,
    });
    project.items.push(consistent(it));
    project.current = project.items.length - 1;
    emit('add', { items: project.items.length });
    goTo(0);
  }

  function listAction(act: string, i: number, value?: string) {
    const it = project.items[i];
    if (!it) return;
    let focusSel = '';
    if (act === 'edit') {
      project.current = i;
      return goTo(0);
    }
    if (act === 'minus' || act === 'plus' || act === 'qty') {
      it.qty = clampInt(act === 'qty' ? value : it.qty + (act === 'plus' ? 1 : -1), 1, MAX_QTY, 1);
      focusSel = act === 'qty' ? '' : `[data-act="${act}"][data-i="${i}"]`;
    } else if (act === 'dup') {
      if (project.items.length >= MAX_ITEMS) return status(`Projekt może mieć najwyżej ${MAX_ITEMS} pozycji.`);
      const copy: Item = { ...structuredClone(it), id: uid() };
      project.items.splice(i + 1, 0, copy);
      project.current = i + 1;
      status(`Dodano kopię pozycji ${i + 1} jako pozycję ${i + 2}.`);
      focusSel = `[data-act="edit"][data-i="${i + 1}"]`;
    } else if (act === 'del') {
      if (!window.confirm(`Usunąć pozycję ${itemTitle(it, i)}?`)) return;
      if (project.items.length === 1) {
        project.items = [defaultItem()];
        project.current = 0;
      } else {
        project.items.splice(i, 1);
        if (project.current >= i) project.current = Math.max(0, project.current - 1);
      }
      status(`Usunięto pozycję ${i + 1}.`);
      focusSel = `[data-act="edit"][data-i="${Math.min(i, project.items.length - 1)}"]`;
    }
    save();
    render();
    if (focusSel) list.querySelector<HTMLElement>(focusSel)?.focus();
  }

  async function projectLink() {
    return `${location.origin}${location.pathname}#p=${await encodeProject(project)}`;
  }

  async function copyLink() {
    const link = await projectLink();
    emit('copy-link');
    try {
      await navigator.clipboard.writeText(link);
      linkbox.hidden = true;
      status('Link do projektu skopiowany do schowka. Otwórz go na innym urządzeniu albo wyślij domownikom.');
    } catch {
      linkbox.hidden = false;
      const input = linkbox.querySelector('input')!;
      input.value = link;
      input.focus();
      input.select();
      status('Skopiuj zaznaczony link (Ctrl+C lub przytrzymaj na telefonie).');
    }
  }

  function cycleField(k: number) {
    const it = cur();
    const allowed = allowedOpenings(it, k);
    const nextOp: Opening = allowed[(allowed.indexOf(it.openings[k]) + 1) % allowed.length];
    it.openings[k] = nextOp;
    save();
    render();
    window.clearTimeout(descTimer);
    desc.textContent = `${fieldName(it, k)}: ${OPENINGS[nextOp].label}.`;
  }

  // ---------------------------------------------------------------- events
  root.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement | HTMLSelectElement;
    if (t.matches('[data-op]')) {
      cur().openings[Number(t.dataset.op)] = t.value as Opening;
      consistent(cur());
      save();
      render();
      return;
    }
    if (t.matches('[data-kf-view]')) {
      view = t.value === 'out' ? 'out' : 'in';
      save();
      renderPreview(cur());
      return;
    }
    if (t.matches('[data-act="qty"]')) return listAction('qty', Number(t.dataset.i), t.value);
    const k = t.dataset.k;
    if (!k || k === 'name' || k === 'w' || k === 'h') return;
    onField(k, t instanceof HTMLInputElement && t.type === 'checkbox' ? t.checked : t.value);
  });

  root.addEventListener('input', (e) => {
    const t = e.target as HTMLInputElement;
    const k = t.dataset.k;
    if (k === 'name') {
      cur().name = t.value.slice(0, 40);
      save();
      renderPreview(cur());
      renderSummary(cur());
    } else if (k === 'w' || k === 'h') {
      cur()[k] = t.value === '' ? 0 : Math.round(Number(t.value));
      if (showDimErrors && !dimsError(cur())) showDimErrors = false;
      save();
      render();
    }
  });
  // validate dimensions when leaving the field
  root.addEventListener('focusout', (e) => {
    const t = e.target as HTMLElement;
    if ((t.id === 'kf-w' || t.id === 'kf-h') && cur().w && cur().h && dimsError(cur())) {
      showDimErrors = true;
      renderDims(cur());
      stepBtns[IDX('wymiary')].classList.add('has-error');
    }
  });

  root.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const goto = t.closest<HTMLElement>('[data-goto]');
    if (goto) return goTo(Number(goto.dataset.goto));
    const field = t.closest<SVGGElement>('[data-field]');
    if (field) return cycleField(Number(field.dataset.field));
    const act = t.closest<HTMLElement>('[data-act]');
    if (act && act.tagName === 'BUTTON') return listAction(act.dataset.act!, Number(act.dataset.i));
    if (t.closest('[data-kf-prev]')) return goTo(step - 1);
    if (t.closest('[data-kf-next]')) {
      if (STEP_IDS[step] !== 'wysylka') return goTo(step + 1);
      // last step: jump to the request form (below the review on phones)
      const header = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
      window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - header - 16, behavior: reducedMotion() ? 'auto' : 'smooth' });
      form.querySelector<HTMLInputElement>('[name="name"]')?.focus({ preventScroll: true });
      return;
    }
    if (t.closest('[data-kf-add]')) return addItem();
    if (t.closest('[data-kf-copy]')) return void copyLink();
    if (t.closest('[data-kf-samecolor]')) return onField('colorIn', cur().colorOut);
    if (t.closest('[data-kf-reset]')) {
      if (!window.confirm('Zacząć nowy projekt? Obecny projekt zostanie usunięty z tej przeglądarki.')) return;
      project = newProject();
      view = 'in';
      showDimErrors = false;
      status('');
      return goTo(0);
    }
  });

  draw.addEventListener('keydown', (e) => {
    const field = (e.target as Element).closest?.('[data-field]');
    if (field && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      cycleField(Number(field.getAttribute('data-field')));
    }
  });

  // ---------------------------------------------------------------- request form
  const formStatus = form.querySelector<HTMLParagraphElement>('.form__status')!;
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const started = form.querySelector<HTMLInputElement>('input[name="t"]');
  if (started) started.value = String(Date.now());
  const show = (msg: string, ok: boolean, focus?: HTMLElement | null) => {
    formStatus.textContent = msg;
    formStatus.className = `form__status ${ok ? 'is-ok' : 'is-error'}`;
    focus?.focus();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const field = (n: string) => form.querySelector<HTMLInputElement>(`[name="${n}"]`);
    if (!String(data.get('name') || '').trim()) return show('Podaj imię, żebyśmy wiedzieli, jak się do Ciebie zwracać.', false, field('name'));
    if (String(data.get('phone') || '').replace(/\D/g, '').length < 9) return show('Podaj numer telefonu (9 cyfr), żebyśmy mogli oddzwonić.', false, field('phone'));
    const email = field('email');
    if (email && email.value && !email.checkValidity()) return show('Adres e-mail wygląda na niepoprawny.', false, email);
    if (!data.get('consent')) return show('Zaznacz zgodę na przetwarzanie danych.', false, field('consent'));
    const bad = project.items.findIndex((it) => dimsError(it));
    if (bad >= 0) return show(`Popraw wymiary w pozycji ${bad + 1} albo wybierz pomiar przez technika.`, false);

    const contactTime = String(data.get('kontakt_pora') || '');
    data.delete('kontakt_pora');
    data.set('konfiguracja', projectText(project, { contactTime, link: await projectLink() }));
    data.set('topic', `Konfigurator: ${positionsLabel(project.items.length)}, ${totalQty(project)} szt.`);
    data.set('subject', 'Konfigurator');
    emit('submit', { items: project.items.length, qty: totalQty(project) });
    if (import.meta.env.DEV) {
      (window as any).__kfPayload = Object.fromEntries(data);
      console.info('[konfigurator] dane formularza (tylko w trybie dev):', (window as any).__kfPayload);
    }

    if (form.dataset.preview) {
      return show('To podgląd strony. Formularz zacznie wysyłać wiadomości po publikacji na docelowym serwerze.', true);
    }

    submitBtn.disabled = true;
    show('Wysyłanie…', true);
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error);
      emit('sent');
      window.location.href = form.dataset.thanks || '/dziekujemy/';
    } catch (err) {
      show((err as Error).message || 'Nie udało się wysłać. Zadzwoń do nas – chętnie pomożemy.', false);
      submitBtn.disabled = false;
    }
  });

  // a project link pasted into a tab that already shows the configurator only changes the hash
  window.addEventListener('hashchange', () => {
    if (/^#p=[A-Za-z0-9_-]+$/.test(location.hash)) location.reload();
  });

  // the drawing's scale depends on the preview box size
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => renderPreview(cur()), 150);
  });

  // ---------------------------------------------------------------- start
  root.classList.add('is-ready');
  render();
  save();
  if (notice) {
    status(notice);
    desc.textContent = notice;
  }
  emit('start', { items: project.items.length });
}

const root = document.querySelector<HTMLElement>('[data-kf]');
if (root) void init(root);
