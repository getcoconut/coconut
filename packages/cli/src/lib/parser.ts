import yargs, { terminalWidth } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { CustomError } from './errors';

export const createParser = () =>
  yargs(hideBin(process.argv))
    .commandDir('../cmds')
    .wrap(terminalWidth())
    .showHelpOnFail(false)
    .help()
    .alias('h', 'help')
    .command({
      command: '$0', // default command
      handler: (argv) => {
        const cmd = argv._[0];

        const cmdError = cmd
          ? `Invalid command "${cmd}".`
          : `Please pass a command.`;

        const help = `Please run "${argv.$0} help" to get a list of commands.`;

        throw new CustomError(`${cmdError}\n${help}`);
      },
    })
    .fail(false);
