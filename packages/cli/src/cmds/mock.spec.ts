import fs = require('fs-extra');
import os = require('os');
import path = require('path');

import mockProgram = require('../lib/mock/pulumiProgram');
import mockCmd = require('./mock');

jest.mock('../lib/mock/pulumiProgram');

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
    expect(mockCmd.handler({ dir: projectPath })).rejects.toThrow(
      /Project file not found/
    );
  });

  it('Runs the Pulumi program with the correct project file', async () => {
    const projectFile = path.join(projectPath, 'index.ts');
    const pulumiProgram = jest.fn();

    mockedMockProgram.pulumiProgram.mockImplementation(() => pulumiProgram);
    fs.ensureFileSync(projectFile);

    await mockCmd.handler({ dir: projectPath });

    expect(mockedMockProgram.pulumiProgram).toHaveBeenCalledWith(projectFile);
    expect(pulumiProgram).toHaveBeenCalledTimes(1);
  });
});
