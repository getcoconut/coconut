import { isCustomError } from './lib/errors';
import { program } from './lib/program';
import { load as loadConfig } from './lib/config';

(async function run() {
  try {
    loadConfig();
    await program.parseAsync();
  } catch (err) {
    if (isCustomError(err)) {
      console.error(err.message);
    } else {
      console.error(`An unexepcted error has occurred: ${err?.message || err}`);
    }
  }
})();
