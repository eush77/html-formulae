/* global describe, it */
'use strict';

var convert = require('..');


describe('Currying', function () {
  it('should curry the function until the code is supplied', function () {
    convert({ wrap: 'p' })('2_2').should.equal('<p>2<sub>2</sub></p>');
    convert()({ wrap: 'span' })()('').should.equal('<span></span>');
    convert({ wrap: null })('').should.equal('');
  });
});
