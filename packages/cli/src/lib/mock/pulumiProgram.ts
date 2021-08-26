/* eslint-disable @typescript-eslint/no-var-requires */
import path = require('path');

export function pulumiProgram(projectPath: string) {
  return async function () {
    console.log('Running program...');

    try {
      const moduleAlias = require('module-alias');

      moduleAlias.addAlias(
        '@pulumi/cloud-mock',
        '@getcoconut/pulumi-cloud-mock'
      );

      require('ts-node').register({ transpileOnly: true });

      const outputs = require(path.join(projectPath, 'index.ts'));

      return outputs;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}
