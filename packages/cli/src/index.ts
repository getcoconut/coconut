import { isCustomError } from './lib/errors';
import { program } from './lib/program';

(async function run() {
  try {
    await program.parseAsync();
  } catch (err) {
    if (isCustomError(err)) {
      console.error('error:', err.message);
    } else if (err?.commandResult?.stderr) {
      console.error(err.commandResult.stderr);
    } else {
      // eslint-disable-next-line no-ex-assign
      if (err?.commandResult?.err) err = err.commandResult.err;

      console.error(`an unexepcted error has occurred: ${err?.message || err}`);
    }
  }
})();
