# lexi

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

Returns an object containing ranked results and a summary string.

```js
// sentences
[
  {
    weight: <Number>,     // lexrank value
    text: <String>,       // original sentence string
    index: <Number>       // sentence index
  },
  ...
]
```

# Tests

Run `npm test` to watch and test all `*.spec.js` files.

Run `npm coverage` to produce a test coverage report.
