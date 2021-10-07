import * as config from './config';

jest.mock('config');

process.env.NODE_CONFIG_ENV = 'development';
process.env.SUPPRESS_NO_CONFIG_WARNING = 'x';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeConfig = require('config');

// make sure we get the config from the right key
function mockConfigGetter(cfg: unknown) {
  return function getConfig(key: string) {
    if (key === config.MAIN_KEY) {
      return cfg;
    }

    throw new Error(`Invalid key '${key}' used when reading config.`);
  };
}

describe('config', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('is an empty object if config is not defined', () => {
    nodeConfig.has.mockReturnValue(false);

    config.load();
    expect(config.get()).toEqual({});
  });

  it('throws when loading an invalid config', () => {
    const cfg = { unknown: 1 };

    nodeConfig.has.mockReturnValue(true);
    nodeConfig.get.mockImplementation(mockConfigGetter(cfg));

    expect(config.load).toThrow(/Invalid Coconut configuration/);
  });

  it('loads a valid config', () => {
    const cfg = { outputs: { targets: ['target 1', 'target 2'] } };

    nodeConfig.has.mockReturnValue(true);
    nodeConfig.get.mockImplementation(mockConfigGetter(cfg));

    config.load();

    expect(config.get()).toEqual(expect.objectContaining(cfg));
  });
});
