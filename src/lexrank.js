const utils = require('./utils')

/**
 * Performs text analysis using the Lexrank algorithm.
 * 1. Runs the algorithm on the entire text to get the global scores for each sentence
 * 2. Then runs it again on each paragraph to get the local scores for each sentence
 *   - NOTE: this second computation is fairly expensive on long bodies of text
 *     but important if you want granularity in results
 *
 * @param  {String} text       plain text - each \n indicating new paragraph
 * @param  {Function} callback
 * @return {Object}            Array of paragraphs with array of sentence objects like so:
 *
 * // paragraphs array
 * [
 *   // sentences array
 *   [
 *     {
 *       weight: {
 *         global: <Number(0-1)>,       // relevance score relative to the entire text
 *         paragraph: <Number(0-1)>     // relevance score relative to the parent paragraph
 *       },
 *       text: <String>,
 *       index: <Number>                // global sentence index
 *     },
 *     { ... }
 *   ],
 *   [ ... ]
 * ]
 */
export function lexrank (text, callback) {
  // Split text into an array of paragraphs, each with an array of sentences
  const paragraphs = utils.paragraphsArray(text).map(utils.sentencesArray)
  // Calculate global relevance scores for each sentence
  const globalRanked = utils.pageRank(utils.flatten(paragraphs))
  // Keep a reference to global index to match nested sentences to global scores
  let globalIndex = 0
  // Run detailed analysis on each block of text (paragraph)
  const result = paragraphs.map((sentences, paragraphIndex) => {
    // Calculate paragraph-level relevance scores for each sentence
    const ranked = utils.pageRank(sentences)
    return ranked.map((sentence, sentenceIndex) => {
      // update and copy globalIndex value
      const index = globalIndex++
      // get global sentence score
      const globalScore = globalRanked[index].weight
      // Update the sentence weight to an object containing global, paragraph, and avg scores
      const weight = {
        global: globalScore,
        paragraph: sentence.weight,
        average: (globalScore + sentence.weight) / 2
      }
      return { ...sentence, index, weight }
    })
  })

  callback && callback(false, result)
  return result
}
