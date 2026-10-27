// Build-time check whether a file exists in public/ (frontmatter only – uses node:fs).
// Lets components fall back to a placeholder instead of rendering a broken image when a photo
// listed in a data file has not been delivered yet.
import { existsSync } from 'node:fs';
import { join } from 'node:path';

/** true when public/<root path> exists, e.g. inPublic('/img/ekipa/monter-1.webp') */
export const inPublic = (path?: string | null) => !!path && existsSync(join(process.cwd(), 'public', path));
