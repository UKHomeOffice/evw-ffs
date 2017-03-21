#!/usr/bin/env node

'use strict';

require('colour');
const path = require('path');
const spawn = require('child_process').spawn;
const config = require('../config');

let dysonPort = config.flightService.url.split(':').pop();

if (isNaN(dysonPort)) {
  throw new Error(`dysonPort must be a number, found ${dysonPort}`);
}

const cmd = spawn('node', ['./node_modules/.bin/dyson', path.resolve(__dirname, '../mocks'), dysonPort]);

/*eslint no-console: 0*/
cmd.stdout.on('data', function(data) {
  console.log(data.toString().green);
});

cmd.stderr.on('data', function(data) {
  console.error(data.toString().red);
});

cmd.on('close', function(code) {
  console.log(`child process exited with code ${code}`.yellow);
});
