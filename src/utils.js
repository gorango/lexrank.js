const wuzzy = require('wuzzy')

const normalize = (array) => {
  const distance = Math.sqrt(array.reduce((dist, line) => (dist + line * line), 0))
  return array.map(line => ( line / distance ))
}

const constructMatrix = (sentences, threshold) => {
  return sentences.map(sentenceA => {
    return normalize(
      sentences.map(sentenceB => {
        const value = wuzzy.tanimoto(sentenceB, sentenceA)
        return !!threshold && value < threshold ? 0 : value
      })
    )
  })
}

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
  constructMatrix,
  pageRank
}
