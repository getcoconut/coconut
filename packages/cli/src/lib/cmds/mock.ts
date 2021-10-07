import fs = require('fs-extra');
import os = require('os');
import path = require('path');
import uniqid = require('uniqid');
import { LocalWorkspace, Stack } from '@pulumi/pulumi/automation';
import { Command } from 'commander';

import { CustomError } from '../errors';
import { unmarshalOutputs, writeOutputs } from '../utils';

import { pulumiProgram } from './mock/pulumiProgram';

export const command = new Command('mock')
  .description('mock a Pulumi Cloud project')
  .option('-p, --project <dir>', 'project directory', '.')
  .action(action);

export async function action(options) {
  const projectDir = path.resolve(options.project);
  const projectName = path.basename(projectDir);
  const projectFile = path.join(projectDir, 'index.ts');

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), `coconut-${projectName}-`)
  );

  console.info(`mocking project ${projectFile}...`);

  if (!fs.pathExistsSync(projectFile)) {
    throw new CustomError('project file does not exist');
  }

  fs.ensureDirSync(tempDir);

  const workspace = await LocalWorkspace.create({
    projectSettings: {
      name: projectName,
      runtime: 'nodejs',
      backend: { url: `file://${tempDir}` },
    },
    envVars: {
      PULUMI_CONFIG_PASSPHRASE: uniqid(),
    },
    program: pulumiProgram(projectFile),
  });

  const stack = await Stack.createOrSelect('mock', workspace);

  await stack.setConfig('cloud:provider', { value: 'mock' });

  const result = await stack.up();
  const outputs = unmarshalOutputs(result.outputs);

  // write outputs to configured outputs targets
  writeOutputs(outputs, 'mock');

  // write outputs to console
  console.info(JSON.stringify(outputs, null, 4));
}
