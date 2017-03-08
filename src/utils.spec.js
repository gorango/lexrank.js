const chai = require('chai')
const utils = require('./utils')

const expect = chai.expect

describe('utils.js', () => {
  describe('sentencesArray()', () => {
    it('should return an array of sentences from text', () => {
      const text = `This is one sentence. "This is quoted text" in a sentence.\n\n` +
        `This sentence is on a new line! This sentence: is split -- up.`
      const result = utils.sentencesArray(text)
      expect(result.length).to.equal(4)
    })
  })
  describe('wordsArray()', () => {
    it('should return an array of words from text', () => {
      const text = `This sentence: is split -- up.`
      const expected = ['this', 'sentence:', 'is', 'split', '--', 'up.']
      const result = utils.wordsArray(text)
      expect(result).to.deep.equal(expected)
    })
  })
  describe('constructMatrix()', () => {
    it('should construct a two-dimentional matrix of tanimoto distance scores', () => {
      const text = `This is one sentence. "This is quoted text" in a sentence.\n\n` +
        `This sentence is on a new line! This sentence: is split -- up.`
      const sentencesAndWords = utils.sentencesArray(text).map(utils.wordsArray)
      const matrix = utils.constructMatrix(sentencesAndWords)
      const expected = [0.9121556554139507, 0.2736466966241852, 0.20270125675865572, 0.22803891385348768]
      expect(matrix.length).to.equal(4)
      expect(matrix[0]).to.deep.equal(expected)
    })
  })
  describe('pageRank()', () => {
    it('should return objects with scores for each sentence', () => {
      const text = `This is one sentence. "This is quoted text" in a sentence.\n\n` +
        `This sentence is on a new line! This sentence: is split -- up.`
      const sentencesRaw = utils.sentencesArray(text)
      const sentencesOriginal = [...sentencesRaw]
      const sentencesAndWords = sentencesRaw.map(utils.wordsArray)
      const matrix = utils.constructMatrix(sentencesAndWords)
      const sentencesRanked = utils.pageRank(matrix, sentencesOriginal)
      const expected = {
        weight: 0.5447947944386553,
        text: '"This is quoted text" in a sentence.',
        index: 1
      }
      expect(sentencesRanked.length).to.equal(4)
      expect(sentencesRanked).to.contain(expected)
    })
  })
})
