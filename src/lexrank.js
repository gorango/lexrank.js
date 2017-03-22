const utils = require('./utils')

/**
 * Performs text analysis using the Lexrank algorithm.
 * 1. Runs the algorithm on the entire text to get the global scores for each sentence
 * 2. Then runs it again on each paragraph to get the local scores for each sentence
 *   - NOTE: this second computation is fairly expensive on long bodies of text
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
 *         // relevance score relative to the entire text
 *         global: <Number(0-1)>,
 *         // relevance score relative to the parent paragraph
 *         paragraph: <Number(0-1)>
 *       },
 *       text: <String>,
 *       index: <Number>
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
  const result = paragraphs.map((sentences, paragraphIndex) => {
    // Calculate paragraph-level relevance scores for each sentence
    const ranked = utils.pageRank(sentences)
    return ranked.map((sentence, sentenceIndex) => {
      // Find global indices for each sentence object.
      const index = paragraphIndex > 0
        ? paragraphs
            .slice(0, paragraphIndex)
            .reduce((sum, paragraph) => (
              (sum + paragraph.length)
            ), 0) + sentenceIndex
        : sentenceIndex

      // global sentence score
      const global = globalRanked[index].weight
      // Update the sentence weight to an object containing global, paragraph, and avg scores
      const weight = {
        global,
        paragraph: sentence.weight,
        average: (global + sentence.weight) / 2
      }
      return Object.assign(sentence, { index, weight })
    })
  })

  callback && callback(false, result)
  return result
}
