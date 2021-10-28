import { isCustomError } from './lib/errors';
import { program } from './lib/program';

(async function run() {
  try {
    await program.parseAsync();
  } catch (err) {
    if (isCustomError(err)) {
      console.error('error:', err.message);
    } else if (err?.commandResult) {
      // Pulumi error
      if (err?.commandResult?.stdout) console.log(err.commandResult.stdout);
      if (err?.commandResult?.stderr) console.log(err.commandResult.stderr);
      if (err?.commandResult?.err) console.error(err.commandResult.err);
    } else {
      console.error(`an unexepcted error has occurred: ${err?.message || err}`);
    }
  }
})();
