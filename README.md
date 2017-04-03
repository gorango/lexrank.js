# lexrank.js

Implements [Radev's Lexrank algorithm](http://www.jair.org/papers/paper1523.html) for unsupervised text summarization in node. Essentially applying PageRank to each sentence in a document and ranking each one for relevance to entire text.

# Usage

Install from npm

```
npm i --save lexrank.js
```

In your script:

```javascript
import lexrank from 'lexrank.js'
lexrank(text, (err, result) => {})
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

Run `npm test` to watch and test all `*.spec.js` files.

Run `npm coverage` to produce a test coverage report.
