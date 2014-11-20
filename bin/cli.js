#!/usr/bin/env node
'use strict';

var convert = require('..');

var concat = require('parse-concat-stream');


process.stdin.pipe(concat({ parse: convert }, function (err, output) {
  if (err) throw err;
  console.log(output);
}));
