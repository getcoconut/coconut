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
  const outputs = unmarshalOutputs(await stack.outputs());

  // write outputs to configured outputs targets
  writeOutputs(outputs, options.stack);

  // write outputs to console
  console.info('\noutputs:');
  console.info(JSON.stringify(outputs, null, 4));
}
