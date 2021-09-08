/* eslint-disable @typescript-eslint/no-var-requires */

export function pulumiProgram(projectFile: string) {
  return async function () {
    const moduleAlias = require('module-alias');

    moduleAlias.addAlias('@pulumi/cloud-mock', '@getcoconut/pulumi-cloud-mock');

    require('ts-node').register({ transpileOnly: true });

    return require(projectFile);
  };
}
