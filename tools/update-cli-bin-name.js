const fs = require('fs');

const NAME = 'coconut';
const PATH = './dist/packages/cli/package.json';

const jsonIn = fs.readFileSync(PATH, { encoding: 'utf8' });
const obj = JSON.parse(jsonIn);

if (!obj.bin || !obj.bin.cli) {
  throw new Error(
    "Couldn't find an entry for 'bin.cli'. Please make sure the CLI name is defined in that field or update this script according to the new configuration."
  );
}

obj.bin[NAME] = obj.bin.cli;
delete obj.bin.cli;

const jsonOut = JSON.stringify(obj, null, 2);

fs.writeFileSync(PATH, jsonOut, { encoding: 'utf8' });

console.log(`Name of executable updated to '${NAME}'.`);
