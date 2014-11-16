/* global describe, it */
'use strict';

var convert = require('..');


describe('Mathematical bold script', function () {
  it('should replace symbols with corresponding entities', function () {
    convert('mbscripta').should.equal('&#x1d4ea;');
    convert('mbscriptb').should.equal('&#x1d4eb;');
    convert('mbscriptz').should.equal('&#x1d503;');
    convert('mbscriptA').should.equal('&#x1d4d0;');
    convert('mbscriptZ').should.equal('&#x1d4e9;');
    convert('mbscript').should.equal('mbscript');
    convert('mbscript0').should.equal('mbscript0');
    convert('mbscriptambscripta').should.equal('&#x1d4ea;&#x1d4ea;');
  });
});
