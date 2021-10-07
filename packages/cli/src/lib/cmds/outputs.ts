import fs = require('fs-extra');
import path = require('path');
import { Command } from 'commander';
import { LocalProgramArgs, LocalWorkspace } from '@pulumi/pulumi/automation';
import { CustomError } from '../errors';

export const command = new Command('outputs')
  .description("write a Pulumi Cloud project's outputs to outputs targets")
  .requiredOption('-s, --stack <stack>', 'stack to get outputs from')
  .option('-p, --project <dir>', 'project directory', '.')
  .action(action);

export async function action(options) {
  const projectPath = path.resolve(options.project);

  const args: LocalProgramArgs = {
    stackName: options.stack,
    workDir: projectPath,
  };

  console.info(`processing outputs of ${projectPath}...`);

  if (!fs.pathExistsSync(projectPath)) {
    throw new CustomError('project directory does not exist');
  }

  const stack = await LocalWorkspace.selectStack(args);

  console.info('refreshing stack...');
  await stack.refresh();
  console.info('refresh complete');

  const outputs = await stack.outputs();

  console.log(outputs);
}
