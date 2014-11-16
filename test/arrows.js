/* global describe, it */
'use strict';

var convert = require('..');


describe('Arrows', function () {
  it('should replace symbols with corresponding entities', function () {
    convert('A -> B <-> C <- D').should.equal('A &rarr; B &harr; C &larr; D');
    convert('A --> B <--> C <-- D').should.equal('A &#10230; B &#10231; C &#10229; D');
  });
});
