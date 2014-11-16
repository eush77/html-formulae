/* global describe, it */
'use strict';

var convert = require('..');


describe('Wrapping', function () {
  it('should wrap the output with custom tag', function () {
    convert('2_2', { wrap: 'p' }).should.equal('<p>2<sub>2</sub></p>');
    convert('', { wrap: 'span' }).should.equal('<span></span>');
  });
});
