import fs = require('fs-extra');
import os = require('os');
import path = require('path');

import * as config from './config';

describe('config', () => {
  let projectDir: string;
  let configFile: string;

  beforeEach(() => {
    projectDir = fs.mkdtempSync(path.join(os.tmpdir(), `coconut-test-`));
    configFile = path.join(projectDir, '.coconutrc.json');

    fs.ensureDirSync(projectDir);
  });

  afterEach(() => {
    jest.resetAllMocks();
    fs.removeSync(projectDir);
  });

  it('is an empty object if no config found', () => {
    config.load(projectDir);

    expect(config.get()).toEqual({});
  });

  it('throws when loading a bad structured config', () => {
    fs.writeFileSync(configFile, '{');

    expect(() => config.load(projectDir)).toThrow(
      /Error parsing Coconut configuration file/
    );
  });

  it('throws when loading an invalid config', () => {
    const cfg = { unknown: 1 };

    fs.writeJSONSync(configFile, cfg);

    expect(() => config.load(projectDir)).toThrow(
      /Invalid Coconut configuration/
    );
  });

  it('loads a valid config', () => {
    const cfg = {
      outputs: { targets: ['target 1', 'target 2'] },
    };

    fs.writeJSONSync(configFile, cfg);

    config.load(projectDir);

    expect(config.get()).toEqual(expect.objectContaining(cfg));
  });
});
