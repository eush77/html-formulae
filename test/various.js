/* global describe, it */
'use strict';

var convert = require('..');


describe('Various symbols', function () {
  it('should replace symbols with corresponding entities', function () {
    convert('x+-y-+z +oo -oo').should.equal('x&plusmn;y&#8723;z +&infin; &minus;&infin;');
    convert('&alpha;').should.equal('&amp;alpha;'); // Do not forget escaping entities.
  });

  it('should not replace double "o" with infinity inside words', function () {
    convert('book').should.equal('book');
    convert('boook').should.equal('boook');
    convert('booook').should.equal('booook');
    convert('booooook').should.equal('booooook');
    convert('booooooook').should.equal('booooooook');
    convert('boobook').should.equal('boobook');
    convert('oocyte').should.equal('oocyte');
    convert('zoo').should.equal('zoo');
    convert('1oo1').should.equal('1&infin;1');
  });
});
