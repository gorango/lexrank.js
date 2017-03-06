# lexrank.js

Implements [Radev's Lexrank algorithm](http://www.jair.org/papers/paper1523.html) for unsupervised text summarization in node. Essentially applying PageRank to each sentence in a document and ranking each one for relevance to entire text. 

# Usage

```
var lexrank = require('lexrank');
lexrank.summarize(text, callback)
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

# Roadmap

### Improve sentence tokenization

Currently using [node-sentence-tokenizer](https://github.com/parmentf/node-sentence-tokenizer) which has some flaws:

- runs into issues around titles and abbreviations (Dr. Prof., U.S., etc.)
- occasionally breaks quotes

### Normalize weights

Top sentences should have similar scores. A normal distribution would allow better comparison between articles for density and distribution of relevant information. It would also help with visualizing results if you want to designate a range of colors for different scores.

### Improve summaries

The summary is currently just the top 10% of ranked lines concatenated in a string. Using some of the [retext plugins](https://github.com/wooorm/retext/blob/master/doc/plugins.md) could improve the result.

- [cliches](https://github.com/dunckr/retext-cliches)
- [equality](https://github.com/wooorm/retext-equality)
- [overuse](https://github.com/dunckr/retext-overuse) or [thesaurus](https://github.com/daizoru/node-thesaurus)
- [sentiment](https://github.com/wooorm/retext-sentiment)
- [simplify](https://github.com/wooorm/retext-simplify)

### Add keywords

[retext-keywords](https://github.com/wooorm/retext-keywords)

# License

[MIT](https://github.com/gorango/lexrank.js/blob/master/LICENSE) © [Goran Spasojevic](https://gorango.me)
