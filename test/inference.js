/* global describe, it */
'use strict';

var convert = require('..');


describe('Inference relations and constants', function () {
  it('should put appropriate spacing on both sides of inference arrows', function () {
    convert('A=>B<=>C=<D')
      .should.equal('A&thinsp;&rArr;&thinsp;B&thinsp;&hArr;&thinsp;C&thinsp;&lArr;&thinsp;D');
    convert('A==>B<==>C==<D')
      .should.equal('A&thinsp;&#10233;&thinsp;B&thinsp;&#10234;&thinsp;C&thinsp;&#10232;&thinsp;D');
  });

  it('should replace other symbols with corresponding entities', function () {
    convert('I |= TT').should.equal('I &#8872; &#8868;');
    convert('I |- BB').should.equal('I &#8866; &perp;');
  });

  it('should leave "TT" and "BB" as is, if found close to an alphanumeric character', function () {
    convert('TTop').should.equal('TTop');
    convert('+TTop').should.equal('+TTop');
    convert('boTTom').should.equal('boTTom');
    convert('ttTT').should.equal('ttTT');
    convert('ttTT+').should.equal('ttTT+');
    convert('BBottom').should.equal('BBottom');
    convert('+BBottom').should.equal('+BBottom');
    convert('bbBB').should.equal('bbBB');
    convert('bbBB+').should.equal('bbBB+');
  });
});
