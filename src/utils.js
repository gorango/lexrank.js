// flatten an array of values
export const flatten = (arr) => arr.reduce((a, b) => [...a, ...b], [])

// normalize an array of Numbers
export const normalize = (arr) => {
  const distance = Math.sqrt(arr.reduce((d, n) => d + n * n, 0))
  const result = arr.map(n => (distance ? n / distance : 0))
  const [min, max] = [Math.min(...result), Math.max(...result) || 1]
  return result.map(n => (n - min) / max)
}

// return a tanimoto distance for two arrays of String/Number tokens
export const tanimoto = (a, b) => {
  const A = new Set(a)
  const B = new Set(b)
  const intersection = new Set([...A].filter((x) => B.has(x)))
  const both = Array.from(intersection).length
  return both / (a.length + b.length - both)
}

// scale and normalize matrix scores
// http://mathworld.wolfram.com/Eigenvalue.html
export const eigenvalues = (matrix, sentences) => {
  let eigen = Array(sentences.length).fill(1)

  Array(10)
    .fill()
    .forEach(() => {
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
export const paragraphsArray = (text) => text.split('\n').filter((p) => p)

// split text into an array of sentences
export const sentencesArray = (text) =>
  text
    .replace(/([\s,]+([\d,-]|[a-z])+[.?!…]+[\n\s"])/g, '$1|')
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)

// split text into an array of words
export const wordsArray = (text) =>
  text.toLowerCase().match(/["«»“”()/–—]|--+|\n+|[^\s"“«»”()/–—]+/g)

// wordsMatrix - construct a two-dimentional matrix of tanimoto distance scores
// (convert words in sentences into numeric scores that represent the frequency of their occurence in the entire text)
export const wordsMatrix = (sentences, threshold) => {
  return sentences.map((sentenceA) => {
    return normalize(
      sentences.map((sentenceB) => {
        const value = tanimoto(sentenceB, sentenceA)
        return !!threshold && value < threshold ? 0 : value
      })
    )
  })
}

// return objects with scores and meta data for each sentence
export const rankSentences = (matrix, sentences) => {
  // scale and normalize matrix scores
  const eigen = eigenvalues(matrix, sentences)
  return sentences.map((sentence, i) => ({
    weight: eigen[i],
    text: sentence,
    index: i
  }))
}

// Rank the relevance of each sentences to the entire text
export const pageRank = (sentences) => {
  // Create an array of sentences, each with an array of words
  const words = sentences.map(wordsArray)
  // Construct a matrix of relevance scores with the arrays of words.
  const matrix = wordsMatrix(words)
  // Generate scores for each sentence in text
  return rankSentences(matrix, sentences)
}

export default {
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
