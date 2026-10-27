import { url } from './url';

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Tiny, safe markup for texts kept in data files:
 *   [label](/path/)  → internal link (base path added by url()); http(s) links open in a new tab
 *   **bold**         → <strong>
 * Everything else is escaped. Use with set:html, e.g. <p set:html={rich(text)} />.
 */
export const rich = (text: string) =>
  escape(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, href: string) => {
      const external = /^https?:/.test(href);
      const target = external ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${external ? href : url(href)}"${target}>${label}</a>`;
    });

/** Plain text without the markup (for meta tags and JSON-LD). */
export const plain = (text: string) => text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
