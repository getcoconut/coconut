import fs = require('fs');
import path = require('path');

const backendFile = path.join(
  __dirname,
  'coconut',
  `${process.env.STACK}.json`
);

const backend = JSON.parse(fs.readFileSync(backendFile, { encoding: 'utf-8' }));

console.log('User app, backend:', backend);
