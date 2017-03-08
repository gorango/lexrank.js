
// regex match for words, quotes and parentheses
const TOKENS = /["«»“”()/–—]|--+|\n+|[^\s"“«»”()/–—]+/g

// should return a tanimoto distance for two arrays of String/Number tokens
const tanimoto = (a, b) => {
  let _a = new Set(a);
  let _b = new Set(b);
  let intersection = new Set([..._a].filter(x => _b.has(x)))
	const both = Array.from(intersection).length;
	return (both / (a.length + b.length - both));
}

const normalize = (array) => {
  const distance = Math.sqrt(array.reduce((dist, line) => (dist + line * line), 0))
  return array.map(line => ( line / distance ))
}

// should return an array of sentences from text
const sentencesArray = text => text
  .split('\n')
  .filter(p => p) // filters out null and undefined
  .reduce((array, sentence) => ([
    ...array,
    ...sentence
      .replace(/([\s]+[\w\d]+[.?!…]+[\n\s"])/g, '$1|')
      .split('|')
      .map(s => s.trim())
      .filter(s => s)
  ]), [])

// should return an array of words from text
const wordsArray = sentence => sentence.toLowerCase().match(TOKENS)

// should construct a two-dimentional matrix of tanimoto distance scores
const constructMatrix = (sentences, threshold) => {
  return sentences.map(sentenceA => {
    return normalize(
      sentences.map(sentenceB => {
        const value = tanimoto(sentenceB, sentenceA)
        return !!threshold && value < threshold ? 0 : value
      })
    )
  })
}

// should return objects with scores for each sentence
const pageRank = (matrix, sentences) => {
  let eigen = Array(sentences.length).fill(1)

  Array(10).fill().forEach(() => {
    const w = Array(sentences.length).fill(0)
    sentences.forEach((_, i) => {
      sentences.forEach((_, j) => {
        w[i] = w[i] + matrix[i][j] * eigen[j]
      })
    })
    eigen = normalize(w)
  })

  // sort bags according to eigen value
  return sentences
    .map((sentence, i) => ({
      weight: eigen[i],
      text: sentences[i],
      index: i
    }))
}

module.exports = {
  sentencesArray,
  wordsArray,
  constructMatrix,
  pageRank
}
