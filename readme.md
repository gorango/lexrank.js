# lexrank.js

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

NodeJS implementation of [Radev's Lexrank algorithm][paper] for unsupervised text summarization. Essentially applying PageRank to each sentence in a document and ranking each one for relevance to the entire text.

# Usage

Install from npm

```
npm i --save lexrank.js
```

In your script:

```js
import lexrank from 'lexrank.js'

const result = lexrank(text)

// or as a callback
lexrank(text, (err, result) => {
  /* handle result */
})
```

### Returns

Returns a paragraphs array containing sentences of ranked results and a summary string.

```
// paragraphs array
[
  // sentences array
  [
    {
      weight: {
        global: <Number(0-1)>,       // relevance score relative to the entire text
        paragraph: <Number(0-1)>     // relevance score relative to the parent paragraph
      },
      text: <String>,                // original sentence string
      index: <Number>                // global sentence index
    },
    { ... }
  ],
  [ ... ]
]
```

# Tests

Run `npm test` to run tests in all `*.spec.js` files.

Run `npm run coverage` to produce a test coverage report.

## License

[MIT][license] © [Goran Spasojevic][author]

<!-- Definitions -->

[build-badge]: https://github.com/gorango/lexrank.js/workflows/main/badge.svg
[build]: https://github.com/gorango/lexrank.js/actions
[coverage-badge]: https://img.shields.io/codecov/c/github/gorango/lexrank.js.svg
[coverage]: https://codecov.io/github/gorango/lexrank.js
[downloads-badge]: https://img.shields.io/npm/dm/lexrank.js.svg
[downloads]: https://www.npmjs.com/package/lexrank.js
[size-badge]: https://img.shields.io/bundlephobia/minzip/lexrank.js.svg
[size]: https://bundlephobia.com/result?p=lexrank.js
[paper]: http://www.jair.org/papers/paper1523.html
[license]: license
[author]: https://github.com/gorango
