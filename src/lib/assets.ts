import { existsSync } from 'node:fs';
import { join } from 'node:path';

/** True when a file exists in public/ – lets optional photos appear as soon as they are generated. */
export const hasPublicFile = (path: string) => existsSync(join(process.cwd(), 'public', path));
