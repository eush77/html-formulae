# html-formul&aelig; [![Build Status][travis-badge]][travis] [![Code Climate][codeclimate-badge]][codeclimate] [![Dependency Status][david-badge]][david]

[![npm](https://nodei.co/npm/html-formulae.png)](https://nodei.co/npm/html-formulae/)

[travis]: https://travis-ci.org/eush77/html-formulae
[travis-badge]: https://travis-ci.org/eush77/html-formulae.svg
[codeclimate]: https://codeclimate.com/github/eush77/html-formulae
[codeclimate-badge]: https://codeclimate.com/github/eush77/html-formulae/badges/gpa.svg
[david]: https://david-dm.org/eush77/html-formulae
[david-badge]: https://david-dm.org/eush77/html-formulae.png

`html-formulae` is a mini-language for describing mathematical formulas that compiles to HTML.

It is designed to be:

* **readable**, say markdown for formulas;
* **lightweight**, it should not take much to start using it in no time;
* **flexible**, plain HTML entities and tags should be supported, too.

Some features (dashes, quotation marks, whitespace) also make `html-formulae` suitable for plain text.

## Example

```
\&forall;(x,y)\&isin;setR^2:␣␣[y>0.&.(x!=0.||.y=1)]<=>[\&exist;a>0:.a^x=y]
```

compiles down to:

```html
&forall;(x,y)&isin;&#8477;<sup>2</sup>:&ensp;[y&gt;0&thinsp;&amp;&thinsp;(x&ne;0&thinsp;&or;&thinsp;y=1)]&thinsp;&hArr;&thinsp;[&exist;a&gt;0:&thinsp;a<sup>x</sup>=y]
```

&forall;(x,y)&isin;&#8477;<sup>2</sup>:&ensp;[y&gt;0&thinsp;&amp;&thinsp;(x&ne;0&thinsp;&or;&thinsp;y=1)]&thinsp;&hArr;&thinsp;[&exist;a&gt;0:&thinsp;a<sup>x</sup>=y]

## Syntax

1. `\` escapes.
2. `^` and '_' stand for superscript and subscript, TeX-style grouping (`{}`) is supported. Example: `x^{x_0}` is rendered as x<sup>x<sub>0</sub></sup>.
3. Newlines are autoencoded to `<br/>`.
4. There is also some built-in logic that protects hyphens in compound words from being interpreted as minuses, same for `TT` and `BB`.
5. Some characters come with some spacing around: `<=>`, `=>`, `=<`, `<==>`, `==>`, `==<`, ']]`.

The complete table of symbols:

Sequence                                                           | Description
:----------------------------------------------------------------: | -----------
`mbscriptA`&ndash;`mbscriptZ`, `mbscripta`&ndash;`mbscriptz`       | Mathematical bold script letters: &#x1d4d0;&ndash;&#x1d4e9;, &#x1d4ea;&ndash;&#x1d503;
`setP`, `setN`, `setZ`, `setQ`, `setR`, `setC`, `setF`             | Abstract and common number sets: &#8473;, &#8469;, &#8484;, &#8474;, &#8477;, &#8450;, &#120125;
`+`, `-`, `*`, `/`, `&&`, `ǀǀ`, `!`                                | Arithmetic and logical operators: +, &minus;, &sdot;, /, &and;, &or;, &not;
`=`, `==`, `<`, `<=`, `>`, `>=`, `!=`, `/=`, `~`, `~~`, `<<`, `>>` | Comparison relations: =, &#9552;, &lt;, &le;, &gt;, &ge;, &ne;, &ne;, &sim;, &asymp;, &#8810;, &#8811;
`<=>`, `=>`, `=<`, `<==>`, `==>`, `==<`, `ǀ-`, `ǀ=`, `TT`, `BB`    | Inference relations and constants: &hArr;, &rArr;, &lArr;, &#10234;, &#10233;, &#10232;, &#8866;, &#8872;, &#8868;, &perp;
`<->`, `->`, `<-`, `<-->`, `-->`, `<--`                            | Other arrows: &harr;, &rarr;, &larr;, &#10231;, &#10230;, &#10229;
`]]`, `:=`, `=def=`                                                | &ldquo;Let&rdquo; and defining signs: &#8848;, &#8788;, &#8797;
`+-`, `-+`, `&amp;`, `oo`                                          | Various symbols: &plusmn;, &#8723; &amp;, &infin;
`---`, `--`                                                        | Dashes (em-dash, en-dash): &mdash;, &ndash;
`ˋˋ`, `''`, `<<<`, `>>>`                                           | Quotation marks: &ldquo;, &rdquo;, &laquo;, &raquo;
`␣␣␣`, `␣␣`, `.`                                                   | Whitespace sequences: em-space, en-space, thin-space

Note: backticks, pipes and spaces in the table above are replaced with other similar-looking (visible) characters.

### HTML

HTML is also supported, but must be properly escaped.

For example, `\&forall;` and `\&exist;` are rather commonly used entities, check the complete [list](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references "List of HTML entities").

Another example: `\<b\>bold\</b\>`.

## API

### htmlFormulae([options], code)

Compile `code` to HTML.

The function is curried with [dyn-curry](https://www.npmjs.org/package/dyn-curry), so you can fix options and get the converter function back:

```js
var converter = htmlFormulae(options);
converter(code); // -> HTML
```

`options.wrap` controls whether the output should be wrapped in a tag. `null` disables wrapping.

```js
> htmlFormulae('2_2')
'2<sub>2</sub>'
> htmlFormulae({ wrap: 'p' }, '2_2')
'<p>2<sub>2</sub></p>'
```

| Option | Type   | Required? | Default |
| :------| :----- | :-------: | :------ |
| wrap   | string | No        | `null`  |

## CLI

`html-formulae` comes with a simple CLI.

```
Usage:  html-formulae [-w <tagname> | --wrap <tagname>]
```

## Install

```shell
npm install html-formulae
```

## License

MIT
