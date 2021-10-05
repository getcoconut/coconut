import { Command } from 'commander';
import { command as mockCommand } from './cmds/mock';
import { command as outputsCommand } from './cmds/outputs';

export const program = new Command('coconut');

program.addCommand(mockCommand);
program.addCommand(outputsCommand);
