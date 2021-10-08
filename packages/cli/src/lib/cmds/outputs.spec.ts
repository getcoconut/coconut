import fs = require('fs-extra');
import os = require('os');
import path = require('path');
import { LocalWorkspace, OutputMap, Stack } from '@pulumi/pulumi/automation';

import config = require('../config');
import { getOutputTargetFile, unmarshalOutputs } from '../utils';

import { action } from './outputs';

jest.mock('@pulumi/pulumi/automation');
jest.mock('../lib/config');

const MockedLocalWorkspace = LocalWorkspace as jest.Mocked<
  typeof LocalWorkspace
>;

const mockedConfig = config as jest.Mocked<typeof config>;

describe('Outputs command', () => {
  let projectDir: string;

  beforeEach(() => {
    projectDir = fs.mkdtempSync(path.join(os.tmpdir(), `coconut-test-`));
    fs.ensureDirSync(projectDir);
  });

  afterEach(() => {
    jest.resetAllMocks();
    fs.removeSync(projectDir);
  });

  it('Writes the outputs to the outputs targets', async () => {
    const stackName = 'test';

    const outputs: OutputMap = {
      res1: { value: 'value 1', secret: false },
      res2: { value: 'value 2', secret: false },
    };

    const targets = [
      path.resolve(projectDir, 'target1'),
      path.resolve(projectDir, 'target2'),
    ];

    const targetFiles = targets.map((target) =>
      getOutputTargetFile(target, stackName)
    );

    const stack: Stack = {
      refresh: jest.fn(),
      outputs: jest.fn().mockResolvedValue(outputs),
    } as unknown as Stack;

    MockedLocalWorkspace.selectStack.mockResolvedValue(stack);

    mockedConfig.get.mockReturnValue({ outputs: { targets } });

    await action({ projectDir, stack: stackName });

    expect(stack.refresh).toHaveBeenCalledTimes(1);
    expect(stack.outputs).toHaveBeenCalledTimes(1);

    targetFiles.forEach((targetFile) => {
      const content = fs.readJSONSync(targetFile);

      expect(content).toEqual(
        expect.objectContaining(unmarshalOutputs(outputs))
      );
    });
  });
});
