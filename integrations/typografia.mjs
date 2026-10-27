// Polish typography after `astro build`: a non-breaking space after one-letter words
// (a, i, o, u, w, z – also capitalised), so they never hang at the end of a line ("w | Płocku").
//
// Only text between tags is changed. Tags and their attributes, comments, <script>, <style>,
// <textarea>, <pre>, <code> and <title> are left exactly as built. Runs on every HTML file in dist/.
// In `astro dev` the texts are not processed (dev shows plain spaces).
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const TOKENS = /<!--[\s\S]*?-->|<(script|style|textarea|pre|code|title)\b[\s\S]*?<\/\1>|<[^>]+>|[^<]+/gi;
// one-letter word at the start of a text node or after whitespace / an opening bracket or quote,
// followed by whitespace and a non-space character (the next word)
const ORPHAN = /(?<=^|[\s („"'])([aiouwzAIOUWZ])[ \t\r\n]+(?=\S)/g;
// the same at the very end of a text node that is followed by an inline element: "w <a>Płocku</a>"
const ORPHAN_END = /(?<=^|[\s („"'])([aiouwzAIOUWZ])[ \t\r\n]+$/;
const INLINE_NEXT = /^<(a|strong|em|b|span|time|abbr|mark|small)\b/i;

export const fixText = (html) =>
  html.replace(TOKENS, (tok, raw, offset) => {
    if (raw || tok.startsWith('<')) return tok;
    let out = tok.replace(ORPHAN, '$1&nbsp;');
    const next = html.slice(offset + tok.length, offset + tok.length + 12);
    if (INLINE_NEXT.test(next)) out = out.replace(ORPHAN_END, '$1&nbsp;');
    return out;
  });

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

export default function typografia() {
  return {
    name: 'interwindows-typografia',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        let n = 0;
        for (const file of walk(fileURLToPath(dir))) {
          const html = readFileSync(file, 'utf8');
          const out = fixText(html);
          if (out !== html) {
            writeFileSync(file, out);
            n++;
          }
        }
        logger.info(`twarde spacje po jednoliterowych wyrazach: ${n} plików HTML`);
      },
    },
  };
}
