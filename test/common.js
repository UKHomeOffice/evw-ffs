'use strict';

global.chai = require('chai')
  .use(require('sinon-chai'))
  .use(require('chai-as-promised'));
global.should = chai.should();
global.sinon = require('sinon');
require('colour');

process.env.NODE_ENV = 'test';
process.setMaxListeners(0);
process.stdout.setMaxListeners(0);

const path = require('path');
const spawn = require('child_process').spawn;

global.__base = path.resolve(path.join(__dirname, '../'));

global.dysonServer = (options, doneCallback) => {
  let name = options.name || 'Dyson';
  let cmd = spawn('node', ['./node_modules/.bin/dyson', path.resolve(options.mocks), options.port]);

  cmd.stdout.on('data', (data) => {
    console.log(' ', data.toString().replace(/dyson/i, name).green);
    doneCallback();
  });

  cmd.on('close', (code, signal) => {
    console.log(`   ${name} terminated (${signal})`.yellow);
  });

  return cmd;
};
