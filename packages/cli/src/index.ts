import { isCustomError } from './lib/errors';
import { createParser } from './lib/parser';
import { load as loadConfig } from './lib/config';

(async function run() {
  const parser = createParser();

  try {
    loadConfig();
    await parser.parse();
  } catch (err) {
    if (isCustomError(err)) {
      console.error(err.message);
    } else {
      console.error(`An unexepcted error has occurred: ${err?.message || err}`);
    }

    parser.exit(1, err);
  }
})();
