/* global describe, it */
'use strict';

var convert = require('..');


describe('Core functionality', function () {
  it('should map empty string to itself', function () {
    convert('').should.equal('');
  });

  it('should treat backslash as an escape character', function () {
    var bs = function (str) {
      return str.replace(/\//g, '\\');
    };
    convert(bs('e/-mail')).should.equal('e-mail');
    convert(bs('/\n')).should.equal('\n');
    convert(bs('=/=/.')).should.equal('==.');
    convert(bs('/&Delta;^{/&dagger;}')).should.equal('&Delta;<sup>&dagger;</sup>');
    convert(bs('/')).should.equal(bs('/'));
    convert(bs('//')).should.equal(bs('/'));
    convert(bs('///')).should.equal(bs('//'));
    convert(bs('////')).should.equal(bs('//'));
  });

  it('should support indices and powers syntax', function () {
    convert('2^2').should.equal('2<sup>2</sup>');
    convert('2_2').should.equal('2<sub>2</sub>');
    convert('2_{2}').should.equal('2<sub>2</sub>');
    convert('2_{2^2}').should.equal('2<sub>2<sup>2</sup></sub>');
    convert('2_{2^{2}}^2').should.equal('2<sub>2<sup>2</sup></sub><sup>2</sup>');
  });

  it('should preserve newlines', function () {
    convert('\n').should.equal('<br/>');
    convert('1\n2\n\n3').should.equal('1<br/>2<br/><br/>3');
  });
});
