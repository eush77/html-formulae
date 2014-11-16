/* global describe, it */
'use strict';

var convert = require('..');


describe('Abstract and common number sets', function () {
  it('should replace symbols with corresponding entities', function () {
    convert('setA').should.equal('setA');
    convert('setF').should.equal('&#120125;');
    convert('setC').should.equal('&#8450;');
    convert('setR').should.equal('&#8477;');
    convert('setQ').should.equal('&#8474;');
    convert('setZ').should.equal('&#8484;');
    convert('setN').should.equal('&#8469;');
    convert('setP').should.equal('&#8473;');
    convert('setsetR').should.equal('set&#8477;');
  });
});
