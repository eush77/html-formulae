/* global describe, it */
'use strict';

var convert = require('..');


describe('Whitespace sequences', function () {
  it('should support thin-space shorthand', function () {
    convert('.').should.equal('&thinsp;');
    convert('x.=.4').should.equal('x&thinsp;=&thinsp;4');
  });

  it('should parse whitespace sequences greedily', function () {
    convert(' ').should.equal(' ');
    convert('  ').should.equal('&ensp;');
    convert('   ').should.equal('&emsp;');
    convert('    ').should.equal('&emsp; ');
    convert('     ').should.equal('&emsp;&ensp;');
    convert('      ').should.equal('&emsp;&emsp;');
  });
});
