/* global describe, it */
'use strict';

var convert = require('..');


describe('Dashes', function () {
  it('should parse dash sequences greedily', function () {
    convert('--').should.equal('&ndash;');
    convert('---').should.equal('&mdash;');
    convert('----').should.equal('&mdash;&minus;');
    convert('-----').should.equal('&mdash;&ndash;');
    convert('------').should.equal('&mdash;&mdash;');
    convert('-------').should.equal('&mdash;&mdash;&minus;');
  });
});
