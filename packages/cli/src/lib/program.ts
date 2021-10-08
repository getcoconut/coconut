import fs = require('fs-extra');
import path = require('path');
import { Command } from 'commander';

import { load as loadConfig } from './config';
import { CustomError } from './errors';
import { command as mockCommand } from './cmds/mock';
import { command as outputsCommand } from './cmds/outputs';

export const program = new Command('coconut')
  .option('-p, --project <dir>', 'project directory', '.')
  .hook('preAction', (thisCommand, actionCommand) => {
    const projectDir = path.resolve(thisCommand.opts().project);

    if (!fs.pathExistsSync(projectDir)) {
      throw new CustomError('project directory does not exist');
    }

    loadConfig(projectDir);
    actionCommand.setOptionValue('projectDir', projectDir);
  });

program.addCommand(mockCommand);
program.addCommand(outputsCommand);
