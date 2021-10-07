/**
 * The configuration uses the 'config' module to take advantage of its features of loading configs for different
 * environments.
 *
 * The configuration is loaded from a specific key to allow the developers to also use the 'config' module for their
 * own purposes without conflicting with Coconut.
 */

import Ajv, { JSONSchemaType } from 'ajv';
import { CustomError } from './errors';

export const MAIN_KEY = '@getcoconut/cli';

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

export function load() {
  process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nodeConfig = require('config');
  const ajv = new Ajv({ allErrors: true });
  const isValidConfig = ajv.compile(SCHEMA);
  const cliConfig = nodeConfig.has(MAIN_KEY) ? nodeConfig.get(MAIN_KEY) : {};

  if (isValidConfig(cliConfig)) {
    _config = cliConfig;
  } else {
    const message = `Invalid Coconut configuration.
Config:
${JSON.stringify(cliConfig, null, 2)}

Errors:
${JSON.stringify(isValidConfig.errors, null, 2)}`;

    throw new CustomError(message);
  }
}
