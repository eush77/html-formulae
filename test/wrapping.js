/* global describe, it */
'use strict';

var convert = require('..');


describe('Wrapping', function () {
  it('should wrap the output with custom tag', function () {
    convert({ wrap: 'p' }, '2_2').should.equal('<p>2<sub>2</sub></p>');
    convert({ wrap: 'span' }, '').should.equal('<span></span>');
  });
});
