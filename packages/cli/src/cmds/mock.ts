import fs = require('fs-extra');
import os = require('os');
import path = require('path');

import uniqid = require('uniqid');
import { LocalWorkspace, OutputMap, Stack } from '@pulumi/pulumi/automation';

import { pulumiProgram } from '../lib/mock/pulumiProgram';
import { CustomError } from '../lib/errors';
import * as config from '../lib/config';
import { getOutputTargetFile } from '../lib/utils';

export const command = 'mock [dir]';
export const desc = 'Mock a Pulumi Cloud project.';

export const builder = {
  dir: {
    default: '.',
    string: true,
  },
};

export const handler = async function (argv) {
  const projectPath = path.resolve(argv.dir);
  const projectName = path.basename(projectPath);
  const projectFile = path.join(projectPath, 'index.ts');

  const tempPath = fs.mkdtempSync(
    path.join(os.tmpdir(), `coconut-${projectName}-`)
  );

  console.log(`Mocking project at ${projectFile}...`);

  if (!fs.pathExistsSync(projectFile)) {
    throw new CustomError('Project file not found.');
  }

  fs.ensureDirSync(tempPath);

  const workspace = await LocalWorkspace.create({
    projectSettings: {
      name: projectName,
      runtime: 'nodejs',
      backend: { url: `file://${tempPath}` },
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

  // write outputs to configured output targets
  config.get().output?.targets?.forEach((target) => {
    const targetFile = getOutputTargetFile(target, 'mock');

    try {
      process.stdout.write(`Writing outputs to ${targetFile}...`);
      fs.outputJSONSync(targetFile, outputs, { spaces: 2 });
      console.log('done.');
    } catch (err) {
      console.log('failed!');

      throw new CustomError(err.message);
    }
  });

  // write outputs to console
  console.log(JSON.stringify(outputs, null, 4));
};

function unmarshalOutputs(outputs: OutputMap) {
  const unmarashled = Object.keys(outputs).reduce((unmarashled, key) => {
    unmarashled[key] = outputs[key]?.value;

    return unmarashled;
  }, {});

  return unmarashled;
}
