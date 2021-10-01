import path = require('path');

export function getOutputTargetFile(target: string, stack: string) {
  return path.resolve(target, 'coconut', `${stack}.json`);
}
