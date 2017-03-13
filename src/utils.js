// flatten an array of values
const flatten = array => array.reduce((a, b) => [...a, ...b], [])

// normalize an array of Numbers
const normalize = array => {
  const ratio = Math.max(...array) / 100
  return array.map(line => line / ratio / 100)
  /**
   * alternative implementation
   * Produces more accurate scores but normalizes further from 1 so that the top scores in
   * a text might never be high enough to stand out in results.
   * NOTE: consider implementing the following code and generating a standard distribution
   * from the resulting array to achieve more emphasis on the relevant bits
   */
  // const distance = Math.sqrt(array.reduce((dist, line) => (dist + line * line), 0))
  // return array.map(line => (line / distance))
}

// return a tanimoto distance for two arrays of String/Number tokens
const tanimoto = (a, b) => {
  let A = new Set(a)
  let B = new Set(b)
  let intersection = new Set([...A].filter(x => B.has(x)))
  const both = Array.from(intersection).length
  return (both / (a.length + b.length - both))
}

// scale and normalize matrix scores
// http://mathworld.wolfram.com/Eigenvalue.html
const eigenvalues = (matrix, sentences) => {
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

  return eigen
}

// split text into an array of paragraphs
const paragraphsArray = text => text
  .split('\n')
  // filters out null and undefined
  .filter(p => p)

// split text into an array of sentences
const sentencesArray = text => text
  .replace(/([\s,]+([\d,-]|[a-z])+[.?!…]+[\n\s"])/g, '$1|')
  .split('|')
  .map(s => s.trim())
  .filter(s => s)

// split text into an array of words
const wordsArray = text => text.toLowerCase().match(/["«»“”()/–—]|--+|\n+|[^\s"“«»”()/–—]+/g)

// wordsMatrix - construct a two-dimentional matrix of tanimoto distance scores
// (convert words in sentences into numeric scores that represent the frequency of their occurence in the entire text)
const wordsMatrix = (sentences, threshold) => {
  return sentences.map(sentenceA => {
    return normalize(
      sentences.map(sentenceB => {
        const value = tanimoto(sentenceB, sentenceA)
        return !!threshold && value < threshold ? 0 : value
      })
    )
  })
}

// return objects with scores and meta data for each sentence
const rankSentences = (matrix, sentences) => {
  // scale and normalize matrix scores
  const eigen = eigenvalues(matrix, sentences)
  return sentences.map((sentence, i) => ({
    weight: eigen[i],
    text: sentences[i],
    index: i
  }))
}

// Rank the relevance of each sentences to the entire text
const pageRank = sentences => {
  // Flatten all paragraphs into an array of sentences, each with an array of words
  const words = sentences.map(wordsArray)
  // Construct a matrix of relevance scores with the arrays of words.
  const matrix = wordsMatrix(words)
  // Generate scores for each sentence in text (ignoring paragraphs)
  return rankSentences(matrix, sentences)
}

module.exports = {
  flatten,
  normalize,
  tanimoto,
  eigenvalues,
  paragraphsArray,
  sentencesArray,
  wordsArray,
  wordsMatrix,
  rankSentences,
  pageRank
}
