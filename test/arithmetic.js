/* global describe, it */
'use strict';

var convert = require('..');


describe('Arithmetic and logical operators', function () {
  it('should replace symbols with corresponding entities', function () {
    convert('1+1-1*1/1').should.equal('1+1&minus;1&sdot;1/1');
    convert('true && false || !true').should.equal('true &and; false &or; &not;true');
    convert('x&&!!x||!x').should.equal('x&and;&not;&not;x&or;&not;x');
  });

  it('should not replace hyphens with minuses in compound words', function () {
    convert('test-driven').should.equal('test-driven');
    convert('test-driven0').should.equal('test&minus;driven0');
    convert('test-driven-').should.equal('test&minus;driven&minus;');
    convert('co-sine^2').should.equal('co&minus;sine<sup>2</sup>');
    convert('merry-go-round').should.equal('merry-go-round');
    convert('de-Stalinisation').should.equal('de-Stalinisation');
    convert('Merriam-Webster\'s').should.equal('Merriam-Webster\'s');
    convert('father-in-law\'s').should.equal('father-in-law\'s');
    convert('O\'Brien-Schwartz\'s restaurant').should.equal('O\'Brien-Schwartz\'s restaurant');
    convert('syl-la-bi-fi-ca-tion').should.equal('syl-la-bi-fi-ca-tion');
    convert('e-mail').should.equal('e&minus;mail'); // Single letters don't count.
    convert('pre-1949').should.equal('pre&minus;1949');
    convert('``furthest-in-future\'\'').should.equal('&ldquo;furthest-in-future&rdquo;');
    convert('``furthest-in-future').should.equal('&ldquo;furthest-in-future');
    convert('furthest-in-future\'\'').should.equal('furthest-in-future&rdquo;');
    convert('ten-year-old;').should.equal('ten-year-old;');
    convert('``ho-ho ho-ho\'\'').should.equal('&ldquo;ho-ho ho-ho&rdquo;');
    convert('``ho-ho ho-ho+\'\'').should.equal('&ldquo;ho-ho ho&minus;ho+&rdquo;');
    convert('``ho-ho+ ho-ho\'\'').should.equal('&ldquo;ho&minus;ho+ ho-ho&rdquo;');
  });
});
