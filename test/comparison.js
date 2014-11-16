/* global describe, it */
'use strict';

var convert = require('..');


describe('Comparison relations', function () {
  it('should replace symbols with corresponding entities', function () {
    convert('x = 1 < 2 <= 3 == 3 >= 2 > 1 != 0 /= x')
      .should.equal('x = 1 &lt; 2 &le; 3 &#9552; 3 &ge; 2 &gt; 1 &ne; 0 &ne; x');
    convert('x <== y').should.equal('x &le;= y');
    convert('x<<+oo, x>>-oo').should.equal('x&#8810;+&infin;, x&#8811;&minus;&infin;');
    convert('x ~ y ~~ z').should.equal('x &sim; y &asymp; z');
  });

  it('should parse equals/tilde sequences greedily', function () {
    convert('===').should.equal('&#9552;=');
    convert('====').should.equal('&#9552;&#9552;');
    convert('=====').should.equal('&#9552;&#9552;=');
    convert('~~~').should.equal('&asymp;&sim;');
    convert('~~~~').should.equal('&asymp;&asymp;');
    convert('~~~~~').should.equal('&asymp;&asymp;&sim;');
  });
});
