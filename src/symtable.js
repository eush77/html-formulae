'use strict';

var extend = require('extend');


var makeAlphabet = function (mnemonicPrefix, aScriptCode, aRegularCode, size) {
  var dict = {};
  for (var letterIndex = 0; letterIndex < size; ++letterIndex) {
    var mnemonic = mnemonicPrefix + String.fromCharCode(aRegularCode + letterIndex);
    var html = ['&#x', (aScriptCode + letterIndex).toString(0x10), ';'].join('');
    dict[mnemonic] = html;
  }
  return dict;
};


var symtable = [];

symtable.mbScript = extend(makeAlphabet('mbscript', 0x1d4d0, 'A'.charCodeAt(), 26),
                           makeAlphabet('mbscript', 0x1d4ea, 'a'.charCodeAt(), 26));

symtable.sets = {
  'setP': '&#8473;',
  'setN': '&#8469;',
  'setZ': '&#8484;',
  'setQ': '&#8474;',
  'setR': '&#8477;',
  'setC': '&#8450;',
  'setF': '&#120125;',
};

symtable.operators = {
  '+': '+',
  '-': '&minus;',
  '*': '&sdot;',
  '/': '/',
  '&&': '&and;',
  '||': '&or;',
  '!': '&not;',
};

symtable.relations = {
  '=': '=',
  '==': '&#9552;',
  '<': '&lt;',
  '<=': '&le;',
  '>': '&gt;',
  '>=': '&ge;',
  '!=': '&ne;',
  '/=': '&ne;',
  '~': '&sim;',
  '~~': '&asymp;',
  '<<': '&#8810;',
  '>>': '&#8811;',
};

symtable.inference = {
  '<=>': '&thinsp;&hArr;&thinsp;',
  '=>': '&thinsp;&rArr;&thinsp;',
  '=<': '&thinsp;&lArr;&thinsp;',
  '<==>': '&thinsp;&#10234;&thinsp;',
  '==>': '&thinsp;&#10233;&thinsp;',
  '==<': '&thinsp;&#10232;&thinsp;',
  '|-': '&#8866;',
  '|=': '&#8872;',
  'TT': '&#8868;',
  'BB': '&perp;',
};

symtable.arrows = {
  '<->': '&harr;',
  '->': '&rarr;',
  '<-': '&larr;',
  '<-->': '&#10231;',
  '-->': '&#10230;',
  '<--': '&#10229;',
};

symtable.definition = {
  ']]': '&#8848; ',
  ':=': '&#8788;',
  '=def=': '&#8797;',
};

symtable.chars = {
  '+-': '&plusmn;',
  '-+': '&#8723;',
  '&': '&amp;',
  'oo': '&infin;',
};

symtable.dashes = {
  '---': '&mdash;',
  '--': '&ndash;',
};

symtable.quotation = {
  '``': '&ldquo;',
  '\'\'': '&rdquo;',
  '<<<': '&laquo;',
  '>>>': '&raquo;',
};

symtable.whitespace = {
  '   ': '&emsp;',
  '  ': '&ensp;',
  '.': '&thinsp;',
  '\n': '<br/>',
};


module.exports = extend.apply(null, [{}].concat(Object.keys(symtable).map(function (group) {
  return symtable[group];
})));
