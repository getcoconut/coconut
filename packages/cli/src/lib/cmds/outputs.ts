import { Command } from 'commander';
import { LocalProgramArgs, LocalWorkspace } from '@pulumi/pulumi/automation';

import * as config from '../config';
import { unmarshalOutputs, writeOutputs } from '../utils';

export const command = new Command('outputs')
  .description("write a Pulumi Cloud project's outputs to outputs targets")
  .requiredOption('-s, --stack <stack>', 'stack to get outputs from')
  .action(action);

export async function action(options) {
  const args: LocalProgramArgs = {
    stackName: options.stack,
    workDir: options.projectDir,
  };

  console.info(`processing outputs of ${options.projectDir}...`);

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
