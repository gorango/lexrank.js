import {
  paragraphsArray,
  sentencesArray,
  pageRank,
  flatten
} from './utils.js'

/**
 * Performs text analysis using the Lexrank algorithm.
 * 1. Runs the algorithm on the entire text to get the global scores for each sentence
 * 2. Then runs it again on each paragraph to get the local scores for each sentence
 *   - NOTE: this second computation is fairly expensive on long bodies of text
 *     but important if you want granularity in results
 *
 * @param  {String} text       String of content to evaluate
 * @return {Object}            Array of paragraphs with array of sentence objects like so:
 *
 * // paragraphs array
 * [
 *   // sentences array
 *   [{
 *     weight: <Number(0-1)>    // relevance score
 *     text: <String>           // original sentence string
 *     index: <Number>          // global sentence index
 *   }]
 * ]
 */

export default function lexrank(text) {
  const paragraphs = paragraphsArray(text).map(sentencesArray)
  const globalRanked = pageRank(flatten(paragraphs))
  let globalIndex = 0
  const result = paragraphs.map((sentences) => {
    const ranked = pageRank(sentences)
    return ranked.map(({ text, weight }) => {
      const index = globalIndex++
      const globalScore = globalRanked[index].weight
      weight = (globalScore + weight) / 2
      return {text, index, weight}
    })
  })

  return result
}
