#!/usr/bin/env node
'use strict';

var convert = require('..');

var concat = require('parse-concat-stream')
  , parseArgs = require('minimist');


var argv = parseArgs(process.argv.slice(2), {
  alias: {
    wrap: 'w'
  },
  unknown: function () {
    console.log('Usage:  html-formulae [-w <tagname> | --wrap <tagname>]');
    process.exit(1);
  }
});


process.stdin.pipe(concat({
  parse: convert({
    wrap: argv.wrap
  })
}, function (err, output) {
  if (err) throw err;

  console.log(output);
}));
