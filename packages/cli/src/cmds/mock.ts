import fs = require('fs');
import os = require('os');
import path = require('path');

import uniqid = require('uniqid');
import { LocalWorkspace, OutputMap, Stack } from '@pulumi/pulumi/automation';

import { pulumiProgram } from '../lib/mock/pulumiProgram';

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

  const tempPath = fs.mkdtempSync(
    path.join(os.tmpdir(), `coconut-${projectName}`)
  );

  console.log('Mocking project at', projectPath);

  fs.mkdirSync(tempPath, { recursive: true });

  const workspace = await LocalWorkspace.create({
    projectSettings: {
      name: projectName,
      runtime: 'nodejs',
      backend: { url: `file://${tempPath}` },
    },
    envVars: {
      PULUMI_CONFIG_PASSPHRASE: uniqid(),
    },
    program: pulumiProgram(projectPath),
  });

  const stack = await Stack.createOrSelect('mock', workspace);

  await stack.setConfig('cloud:provider', { value: 'mock' });

  const result = await stack.up({ onOutput: console.info });

  console.log(JSON.stringify(unmarshalOutputs(result.outputs), null, 4));
};

function unmarshalOutputs(outputs: OutputMap) {
  const unmarashled = Object.keys(outputs).reduce((unmarashled, key) => {
    unmarashled[key] = outputs[key]?.value;

    return unmarashled;
  }, {});

  return unmarashled;
}
