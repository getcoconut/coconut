import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv)).strict().commandDir('cmds').demandCommand().help()
  .argv;
