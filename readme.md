# lexrank.js

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

NodeJS implementation of [Radev's Lexrank algorithm](http://www.jair.org/papers/paper1523.html) for unsupervised text summarization. Essentially applying PageRank to each sentence in a document and ranking each one for relevance to the entire text.

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

### Params

`text` - plain text string.

### Returns

Returns an array containing ranked results and a summary string.

```
// sentences
[
  {
    weight: {
      global: <Number(0-1)>,       // score relative to entire text
      paragraph: <Number(0-1)>     // score relative to paragraph
    },
    text: <String>,       // original sentence string
    index: <Number>       // sentence index
  },
  ...
]
```

# Tests

Run `npm test` to run tests in all `*.spec.js` files.

Run `npm coverage` to produce a test coverage report.

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
[license]: license
[author]: https://github.com/gorango
