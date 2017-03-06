const Tokenizer = require('sentence-tokenizer')
const natural = require('natural')

const utils = require('./utils')

function summarize(text, callback) {
  // Tokenize text to sentences
  // BUG: need a better sentence tokenizer
  const sentenceTokenizer = new Tokenizer('utterer')
  sentenceTokenizer.setEntry(text)
  const sentencesRaw = sentenceTokenizer.getSentences()
  const sentencesOriginal = [...sentencesRaw]

  // Tokenize words in sentences
  const wordTokenizer = new natural.TreebankWordTokenizer()
  const sentencesScored = sentencesRaw.map(sentence =>
    wordTokenizer.tokenize(sentence.toLowerCase()))

  // Construct matrix and rank sentences
  const matrix = utils.constructMatrix(sentencesScored)
  const sentencesRanked = utils.pageRank(matrix, sentencesOriginal)

  // Return top `lines` number of lines
  const ranked = sentencesRanked.sort((a, b) => a.index - b.index)

  // Concatenate top lines for a "summary"
  // TODO: build a better summary algorithm
  const lines = Math.round(ranked.length / 10)
  const summary = [...ranked]
    .sort((a, b) => b.weight - a.weight)
    .filter((_, i) => i < Math.min(lines, sentencesRanked.length))
    .sort((a, b) => a.index - b.index)
    .reduce((result, line) =>
      result + (result ? ' ' : '') + line.text, '')

  const result = { ranked, summary }

  callback
    ? callback(false, result)
    : result
}

module.exports = summarize
