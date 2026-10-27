// Internal links and assets are written as root paths ('/okna/', '/img/logo.png').
// url() prefixes them with the configured base, so the same build works at the domain root
// and in a subfolder (e.g. a GitHub Pages preview at /interwindows/).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string) => (path.startsWith('/') ? `${base}${path}` : path);

/** Path of the current page without the base, e.g. '/okna/'. */
export const withoutBase = (pathname: string) => (base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname);
