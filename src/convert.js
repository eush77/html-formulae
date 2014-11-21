'use strict';

var symtable = require('./symtable');

var template = require('lodash.template')
  , curry = require('dyn-curry');


var preConvertHooks = [
  function smartHyphen(code) {
    var letterBlock = '[a-zA-Z\']{2,}';
    var beginBlock = '(``)?';
    var endBlock = '[,:)!?;"]?';
    var wordRegex = new RegExp(template('^${begin}' +
                                        '(${letters}-)+${letters}' +
                                        '${end}$',
                                        {
                                          letters: letterBlock,
                                          begin: beginBlock,
                                          end: endBlock
                                        }));
    return code.replace(/\S+/g, function (word) {
      return wordRegex.test(word) ? word.replace(/-/g, '\\$&') : word;
    });
  },

  function skipRegularLetterDoubling(code) {
    var inTextReplacePattern = '$1\\$2';
    ['T', 'B'].forEach(function (char) {
      var regexLeft = new RegExp(template('(\\w${c})(${c})', {c: char}), 'g');
      var regexRight = new RegExp(template('(${c})(${c}\\w)', {c: char}), 'g');
      code = code.replace(regexLeft, inTextReplacePattern)
      .replace(regexRight, inTextReplacePattern);
    });
    return code;
  },

  function doubleLetterO(code) {
    var isLetter = function (char) {
      return /[a-zA-Z]/.test(char || '');
    };
    return code.replace(/oo/g, function (match, offset) {
      var protect = isLetter(code[offset - 1]) || isLetter(code[offset + match.length]);
      return protect ? 'o\\o' : 'oo';
    });
  },
];

var postConvertHooks = [];


// Replace character sequences according to the symbol table.
var replace = (function () {

  // Split symtable into groups by key length (= replace priority).
  var replaceBase = (function () {
    var base = [];
    for (var seq in symtable) {
      var key = seq.length;
      if (!(key in base)) {
        base[key] = {
          len: key,
          dict: {}
        };
      }
      base[key].dict[seq] = symtable[seq];
    }
    return base.filter(Boolean).reverse(); // Compress and reverse
  }());

  return function (plain) {
    var output = '', pos = 0;
    var escaped = false;
    outer:while (pos < plain.length) {
      if (escaped) {
        output += plain[pos++];
        escaped = false;
      }
      else if (plain[pos] == '\\') {
        ++pos;
        escaped = true;
      }
      else {
        for (var r = 0; r < replaceBase.length; ++r) {
          var len = replaceBase[r].len, substr = plain.slice(pos, pos + len);
          if (substr in replaceBase[r].dict) {
            output += replaceBase[r].dict[substr];
            pos += len;
            continue outer;
          }
        }
        output += plain[pos++];
      }
    }
    return output;
  };
}());


// Recursive descent parser
var convert = (function () {
  var surroundByTag = function (tag) {
    return template(
      template('<${tag}><% print("${string}") %></${tag}>', { tag: tag }),
      null,
      { variable: 'string' }
    );
  };

  var curlies = {
    '_': surroundByTag('sub'),
    '^': surroundByTag('sup')
  };

  /**
   * Parse the input as html-formulae code and construct HTML output.
   * Curried function.
   *
   * @arg {Object} [options]
   * @property {string} [wrap] - Tag to wrap the output in. Wrapping is disabled by default.
   * @arg {string} code
   * @return {string}
   */
  return curry(function convert(options, code) {
    if (arguments.length < 2) {
      if (typeof options == 'string') {
        code = options;
        options = {};
      }
      else {
        return curry;
      }
    }
    else {
      options = options || {};
    }

    preConvertHooks.forEach(function (hook) {
      code = hook(code);
    });

    var pos = 0;
    code = (function emit(level, quota) {
      quota = quota || Infinity;
      var c, output = [], buffer = '';
      var escaped = false; // Double escaping avoided
      while ((c = code[pos++]) && (c != '}' || level == 0 || escaped)) {
        if (!escaped && c in curlies && code[pos]) {
          var group;
          if (code[pos] == '{') {
            ++pos;
            group = emit(level + 1);
          }
          else {
            group = emit(level, 1);
          }
          output.push(replace(buffer), curlies[c](group));
          buffer = '';
        }
        else {
          buffer += c;
          if (!(escaped = !escaped && c == '\\') && !--quota) {
            break;
          }
        }
      }
      if (escaped) {
        buffer += '\\';
      }
      return output.concat(replace(buffer)).join('');
    }(0));

    postConvertHooks.forEach(function (hook) {
      code = hook(code);
    });

    if (options.wrap != null) {
      code = surroundByTag(options.wrap)(code);
    }

    return code;
  });
}());


module.exports = convert;
