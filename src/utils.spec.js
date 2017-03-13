const chai = require('chai')
const fs = require('fs')
const utils = require('./utils')

const expect = chai.expect
const text = fs.readFileSync('./fixtures/test.txt', 'utf8')

describe('utils.js', () => {
  describe('flatten()', () => {
    it('should flatten an array of objects', () => {
      const array = [[1, 2, 3], [4, 5, 6]]
      expect(utils.flatten(array).length).to.equal(6)
    })
  })
  describe('normalize()', () => {
    it('should normalize an array of numbers', () => {
      const array = [0.1, 0.2, 0.5]
      const expected = [0.2, 0.4, 1]
      expect(utils.normalize(array)).to.eql(expected)
    })
  })
  describe('tanimoto()', () => {
    it('should return a small tanimoto distance for two dissimilar sentences', () => {
      const a = utils.wordsArray('This is one really awesome sentence')
      const b = utils.wordsArray('This is a much more different sentence')
      expect(utils.tanimoto(a, b)).to.equal(0.3)
    })
    it('should return a large tanimoto distance for two similar sentences', () => {
      const a = utils.wordsArray('This is definitely a really awesome sentence')
      const b = utils.wordsArray('This is definitely a really similar sentence')
      expect(utils.tanimoto(a, b)).to.equal(0.75)
      expect(utils.tanimoto(a, a)).to.equal(1)
    })
  })
  describe('eigenvalues()', () => {
    it('should scale and normalize matrix scores', () => {
      const sentences = utils.sentencesArray(utils.paragraphsArray(text)[0])
      const matrix = utils.wordsMatrix(sentences.map(utils.wordsArray))
      const eigen = utils.eigenvalues(matrix, sentences)
      expect(sentences.length).to.equal(eigen.length)
      expect(sentences[0]).to.be.a('string')
      expect(eigen[0]).to.be.a('number')
    })
  })
  describe('paragraphsArray()', () => {
    it('should return an array of paragraphs from text', () => {
      const result = utils.paragraphsArray(text)
      expect(result.length).to.equal(8)
    })
  })
  describe('sentencesArray()', () => {
    it('should return an array of sentences from text', () => {
      const result = utils.sentencesArray(text)
      expect(result.length).to.equal(24)
    })
  })
  describe('wordsArray()', () => {
    it('should return an array of words from text', () => {
      const expected = utils.wordsArray('Automatic summarization is the process of reducing a text document with a computer program in order to create a summary that retains the most important points of the original document.')
      const result = utils.wordsArray(utils.sentencesArray(utils.paragraphsArray(text)[0])[0])
      expect(result).to.eql(expected)
    })
  })
  describe('wordsMatrix()', () => {
    it('should construct a two-dimentional matrix of tanimoto distance scores', () => {
      const text = `This is one sentence. 'This is quoted text' in a sentence.\n\n` +
        `This sentence is in a new paragraph! This sentence: is split right up.`
      const sentencesAndWords = utils.sentencesArray(text).map(utils.wordsArray)
      const matrix = utils.wordsMatrix(sentencesAndWords)
      const expected = [1, 0.2222222222222222, 0.2222222222222222, 0.25]
      expect(matrix.length).to.equal(4)
      expect(matrix[0]).to.eql(expected)
    })
    it('should not rank sentences below a provided threshold', () => {
      const text = `This is one sentence. 'This is quoted text' in a sentence.\n\n` +
        `This sentence is in a new paragraph! This sentence: is split right up.`
      const sentencesAndWords = utils.sentencesArray(text).map(utils.wordsArray)
      const matrix = utils.wordsMatrix(sentencesAndWords, 0.23)
      const expected = [1, 0, 0, 0.25]
      expect(matrix.length).to.equal(4)
      expect(matrix[0]).to.eql(expected)
    })
  })
  describe('pageRank()', () => {
    it('should return objects with scores for each sentence', () => {
      const sentences = utils.sentencesArray(text)
      const ranked = utils.pageRank(sentences)
      const expected = { weight: 1,
        text: 'Automatic summarization is the process of reducing a text document with a computer program in order to create a summary that retains the most important points of the original document.',
        index: 0
      }
      expect(ranked.length).to.equal(24)
      expect(ranked).to.contain(expected)
    })
  })
})
