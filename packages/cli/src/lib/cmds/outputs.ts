import fs = require('fs-extra');
import path = require('path');
import { Command } from 'commander';
import { LocalProgramArgs, LocalWorkspace } from '@pulumi/pulumi/automation';

import * as config from '../config';
import { CustomError } from '../errors';
import { unmarshalOutputs, writeOutputs } from '../utils';

export const command = new Command('outputs')
  .description("write a Pulumi Cloud project's outputs to outputs targets")
  .requiredOption('-s, --stack <stack>', 'stack to get outputs from')
  .option('-p, --project <dir>', 'project directory', '.')
  .action(action);

export async function action(options) {
  const projectDir = path.resolve(options.project);

  const args: LocalProgramArgs = {
    stackName: options.stack,
    workDir: projectDir,
  };

  console.info(`processing outputs of ${projectDir}...`);

  if (!fs.pathExistsSync(projectDir)) {
    throw new CustomError('project directory does not exist');
  }

  if (!config.get().outputs?.targets?.length) {
    console.warn('No outputs targets defined in config!');

    return;
  }

  const stack = await LocalWorkspace.selectStack(args);

  process.stdout.write('refreshing stack...');
  await stack.refresh();
  console.info('done.');

  const outputs = await stack.outputs();

  writeOutputs(unmarshalOutputs(outputs), options.stack);
}
