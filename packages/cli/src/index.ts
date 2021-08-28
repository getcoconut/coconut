import 'tslib'; // Force Nx to add it to the package's dependencies
import { isCustomError } from './lib/errors';
import { createParser } from './lib/parser';

(async function run() {
  const parser = createParser();

  try {
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
