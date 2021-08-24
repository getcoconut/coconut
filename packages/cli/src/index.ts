import yargs, { terminalWidth } from 'yargs';
import { hideBin } from 'yargs/helpers';

const parser = yargs(hideBin(process.argv))
  .commandDir('cmds')
  .wrap(terminalWidth())
  .showHelpOnFail(false)
  .help()
  .alias('h', 'help')
  .command({
    command: '$0', // default command
    handler: (argv) => {
      const cmd = argv._[0];

      console.error(
        cmd ? `Invalid command "${cmd}".` : `Please pass a command.`
      );

      console.error(`Please run "${argv.$0} help" to get a list of commands.`);
      process.exit(1);
    },
  })
  .fail(false);

(async function run() {
  try {
    await parser.parse();
  } catch (err) {
    console.error(`An unexepcted error has occurred: ${err?.message || err}`);
  }
})();
