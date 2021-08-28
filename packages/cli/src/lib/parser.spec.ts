import yargs = require('yargs');

import { createParser } from './parser';

describe('Parser', () => {
  let parser: yargs.Argv;

  beforeEach(() => {
    parser = createParser();
  });

  it('Fails if called without a command', async () => {
    await expect(() => parser.parse('')).toThrow(/Please pass a command/);
  });

  it('Fails if called with an unknown command', async () => {
    await expect(() => parser.parse('unknown')).toThrow(
      /Invalid command "unknown"/
    );
  });
});
