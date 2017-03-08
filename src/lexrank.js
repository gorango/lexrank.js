const utils = require('./utils')

function analyze (text, callback) {
  // Tokenize text to sentences
  const sentencesRaw = utils.sentencesArray(text)
  const sentencesOriginal = [...sentencesRaw]

  // Tokenize words in sentences
  const sentencesAndWords = sentencesRaw.map(utils.wordsArray)

  // Construct matrix and rank sentences
  const matrix = utils.constructMatrix(sentencesAndWords)
  const sentencesRanked = utils.pageRank(matrix, sentencesOriginal)

  // Return top `lines` number of lines
  const ranked = sentencesRanked.sort((a, b) => a.index - b.index)

  // Concatenate top lines for a "summary"
  // TODO: build a better summary algorithm
  const lines = Math.round(ranked.length * 15 / 100)
  const summary = [...ranked]
    .sort((a, b) => b.weight - a.weight)
    .filter((_, i) => i < Math.min(lines, sentencesRanked.length))
    .sort((a, b) => a.index - b.index)
    .reduce((result, line) =>
      result + (result ? ' ' : '') + line.text, '')

  const result = { ranked, summary }
  callback && callback(false, result)
  return result
}

module.exports = {
  analyze
}
