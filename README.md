# lexrank.js

Implements [Radev's Lexrank algorithm](http://www.jair.org/papers/paper1523.html) for unsupervised text summarization in node. Essentially applying PageRank to each sentence in a document and ranking each one for relevance to entire text.

# Usage

```
var lexrank = require('lexrank');
lexrank.analyze(text, (err, result) => {})
```

### Params

`text` - plain text string.

### Returns

Returns an object containing ranked results and a summary string.

```
{
  ranked: [
    {
      weight: <Number>,     // lexrank value
      text: <String>,       // original sentence string
      index: <Number>       // sentence index
    },
    ...
  ],
  summary: <String>
}
```

# Tests

Make sure you have `mocha` installed globally (`npm i -g mocha`).

Run `npm test` to run tests in all `*.spec.js` files.

### Coverage

```
npm i -g istanbul
istanbul cover _mocha "./**/*.spec.js"
open coverage/lcov-report/index.html
```

# License

[MIT](https://github.com/gorango/lexrank.js/blob/master/LICENSE) © [Goran Spasojevic](https://gorango.me)
