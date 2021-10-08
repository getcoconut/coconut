import Ajv, { JSONSchemaType } from 'ajv';
import { cosmiconfigSync } from 'cosmiconfig';

import { CustomError } from './errors';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const SCHEMA: JSONSchemaType<Config> = require('../schemas/config.schema.json');

export interface Config {
  outputs?: {
    targets?: string[];
  };
}

let _config: Config = {};

export function get() {
  return _config;
}

export function load(projectDir?: string) {
  const ajv = new Ajv({ allErrors: true });
  const isValidConfig = ajv.compile(SCHEMA);
  const explorer = cosmiconfigSync('coconut');

  let coconutConfig;

  try {
    const result = explorer.search(projectDir);

    coconutConfig = result?.config;
  } catch (err) {
    const message = `Error parsing Coconut configuration file: ${err.message}`;

    throw new CustomError(message);
  }

  if (!coconutConfig) {
    console.info('No Coconut configuration found.');

    return;
  }

  if (isValidConfig(coconutConfig)) {
    _config = coconutConfig;
  } else {
    const message = `Invalid Coconut configuration.
Config:
${JSON.stringify(coconutConfig, null, 2)}

Errors:
${JSON.stringify(isValidConfig.errors, null, 2)}`;

    throw new CustomError(message);
  }
}
