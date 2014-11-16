/* global describe, it */
'use strict';

var convert = require('..');


describe('Quotation marks', function () {
  it('should replace symbols with corresponding entities', function () {
    convert('``Hello\'\' --- he said').should.equal('&ldquo;Hello&rdquo; &mdash; he said');
    convert('<<<Hello>>> --- he said').should.equal('&laquo;Hello&raquo; &mdash; he said');
  });

  it('should parse lt/gt sequences greedily', function () {
    convert('<<<').should.equal('&laquo;');
    convert('<<<<').should.equal('&laquo;&lt;');
    convert('<<<<<').should.equal('&laquo;&#8810;');
    convert('<<<<<<').should.equal('&laquo;&laquo;');
    convert('<<<<<<<').should.equal('&laquo;&laquo;&lt;');
    convert('>>>').should.equal('&raquo;');
    convert('>>>>').should.equal('&raquo;&gt;');
    convert('>>>>>').should.equal('&raquo;&#8811;');
    convert('>>>>>>').should.equal('&raquo;&raquo;');
    convert('>>>>>>>').should.equal('&raquo;&raquo;&gt;');
  });
});
