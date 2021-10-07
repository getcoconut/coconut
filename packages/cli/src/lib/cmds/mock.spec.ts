import fs = require('fs-extra');
import os = require('os');
import path = require('path');

import config = require('../config');
import { getOutputTargetFile } from '../utils';

import mockProgram = require('./mock/pulumiProgram');
import { action } from './mock';

jest.mock('../lib/config');
jest.mock('./mock/pulumiProgram');

const mockedConfig = config as jest.Mocked<typeof config>;
const mockedMockProgram = mockProgram as jest.Mocked<typeof mockProgram>;

describe('Mock command', () => {
  let projectPath: string;

  beforeEach(() => {
    projectPath = fs.mkdtempSync(path.join(os.tmpdir(), `coconut-test-`));
    fs.ensureDirSync(projectPath);
  });

  afterEach(() => {
    jest.resetAllMocks();
    fs.removeSync(projectPath);
  });

  it('Fails if project file not found', async () => {
    expect(action({ project: projectPath })).rejects.toThrow(
      /project file does not exist/
    );
  });

  it('Runs the Pulumi program with the correct project file', async () => {
    const output = { res1: 'value 1', res2: 'value 2' };
    const projectFile = path.join(projectPath, 'index.ts');

    const targets = [
      path.resolve(projectPath, 'target1'),
      path.resolve(projectPath, 'target2'),
    ];

    const targetFiles = targets.map((target) =>
      getOutputTargetFile(target, 'mock')
    );

    const pulumiProgram = jest.fn().mockReturnValue(output);

    mockedConfig.get.mockReturnValue({ output: { targets } });

    mockedMockProgram.pulumiProgram.mockImplementation(() => pulumiProgram);
    fs.ensureFileSync(projectFile);

    await action({ project: projectPath });

    expect(mockedMockProgram.pulumiProgram).toHaveBeenCalledWith(projectFile);
    expect(pulumiProgram).toHaveBeenCalledTimes(1);

    targetFiles.forEach((targetFile) => {
      const content = fs.readJSONSync(targetFile);

      expect(content).toEqual(expect.objectContaining(output));
    });
  }, 30000);
});
