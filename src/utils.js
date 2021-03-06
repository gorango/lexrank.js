// flatten an array of values
const flatten = arr => arr.reduce((a, b) => [...a, ...b], [])

// normalize an array of Numbers
const normalize = arr => {
  /**
   * alternative implementation
   * Produces less accurate scores but normalizes with fewer calculations
   * const ratio = Math.max(...array) / 100
   * return array.map(line => line / ratio / 100)
   */
  const distance = Math.sqrt(arr.reduce((dis, ln) => (dis + ln * ln), 0))
  const result = arr.map(ln => (ln / distance))
  const [aMin, aMax] = [Math.min(...result), Math.max(...result)]
  const [bMin, bMax] = [0, 1]
  // normalize `array` between 0 and 1
  return result.map(ln => bMin + (ln - aMin) * (bMax - bMin) / (aMax - aMin))
}

// return a tanimoto distance for two arrays of String/Number tokens
const tanimoto = (a, b) => {
  const A = new Set(a)
  const B = new Set(b)
  const intersection = new Set([...A].filter(x => B.has(x)))
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
  // Create an array of sentences, each with an array of words
  const words = sentences.map(wordsArray)
  // Construct a matrix of relevance scores with the arrays of words.
  const matrix = wordsMatrix(words)
  // Generate scores for each sentence in text
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
