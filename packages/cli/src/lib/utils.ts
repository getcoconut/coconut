import fs = require('fs-extra');
import path = require('path');
import { OutputMap } from '@pulumi/pulumi/automation';

import * as config from './config';
import { CustomError } from './errors';

export function getOutputTargetFile(target: string, stack: string) {
  return path.resolve(target, 'coconut', `${stack}.json`);
}

export function writeOutputs(outputs: unknown, stack: string) {
  const targetFiles: Array<string> = [];

  config.get().outputs?.targets?.forEach((target) => {
    const targetFile = getOutputTargetFile(target, stack);

    try {
      process.stdout.write(`writing outputs to ${targetFile}...`);
      fs.outputJSONSync(targetFile, outputs, { spaces: 2 });
      console.info('done.');
      targetFiles.push(targetFile);
    } catch (err) {
      console.info('failed!');

      throw new CustomError(err.message);
    }
  });

  return targetFiles;
}

export function unmarshalOutputs(outputs: OutputMap) {
  const unmarashled = Object.keys(outputs).reduce((unmarashled, key) => {
    unmarashled[key] = outputs[key]?.value;

    return unmarashled;
  }, {});

  return unmarashled;
}
