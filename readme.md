# lexrank.js

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Unsupervised text summarization using the [Lexrank algorithm][paper].

# Usage

Install from npm

```
npm i --save lexrank.js
```

In your script:

```js
import lexrank from 'lexrank.js'

const result = lexrank(text)
```

### Returns

Nested arrays of paragraphs containing sentences with ranked results.

```
// paragraphs array
[
  // sentences array
  [{
    weight: <Number(0-1)>    // relevance score
    text: <String>           // original sentence string
    index: <Number>          // global sentence index
  }],
  [ ... ]
]
```

# Tests

Run `npm test` to run tests.

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
[paper]: https://arxiv.org/abs/1109.2128
[license]: license
[author]: https://github.com/gorango
