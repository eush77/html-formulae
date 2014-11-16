/* global describe, it */
'use strict';

var convert = require('..');


describe('"Let" and defining signs', function () {
  it('should replace symbols with corresponding entities', function () {
    convert(']]').should.equal('&#8848; ');
    convert('x=def=def=2, y:=5', 'x&#8797;def=2, y&#8788;5');
  });

  it('should put a space after "let"', function () {
    convert(']]x>0').should.equal('&#8848; x&gt;0');
  });
});
