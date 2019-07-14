/* eslint-env mocha */
const { expect } = require('chai')
const fs = require('fs')

const {
  flatten,
  normalize,
  tanimoto,
  eigenvalues,
  paragraphsArray,
  sentencesArray,
  wordsArray,
  wordsMatrix,
  pageRank
} = require('./utils')

const text = fs.readFileSync('./fixtures/test.txt', 'utf8')

describe('utils.js', () => {
  describe('flatten(array)', () => {
    it('should flatten an array of objects', () => {
      const array = [[1, 2, 3], [4, 5, 6]]
      expect(flatten(array).length).to.equal(6)
    })
  })
  describe('normalize(array)', () => {
    it('should normalize an array of numbers', () => {
      const array = [0.1, 0.2, 0.5]
      const expected = [0, 0.25, 1]
      expect(normalize(array)).to.eql(expected)
    })
  })
  describe('tanimoto(sentenceA, sentenceB)', () => {
    it('should return a small tanimoto distance for two dissimilar sentences', () => {
      const a = wordsArray('This is one really awesome sentence')
      const b = wordsArray('This is a much more different sentence')
      expect(tanimoto(a, b)).to.equal(0.3)
    })
    it('should return a large tanimoto distance for two similar sentences', () => {
      const a = wordsArray('This is definitely a really awesome sentence')
      const b = wordsArray('This is definitely a really similar sentence')
      expect(tanimoto(a, b)).to.equal(0.75)
      expect(tanimoto(a, a)).to.equal(1)
    })
  })
  describe('eigenvalues(matrix, sentences)', () => {
    it('should scale and normalize matrix scores', () => {
      const sentences = sentencesArray(paragraphsArray(text)[0])
      const matrix = wordsMatrix(sentences.map(wordsArray))
      const eigen = eigenvalues(matrix, sentences)
      expect(sentences.length).to.equal(eigen.length)
      expect(sentences[0]).to.be.a('string')
      expect(eigen[0]).to.be.a('number')
    })
  })
  describe('paragraphsArray(text)', () => {
    it('should return an array of paragraphs from text', () => {
      const result = paragraphsArray(text)
      expect(result.length).to.equal(8)
    })
  })
  describe('sentencesArray(text)', () => {
    it('should return an array of sentences from text', () => {
      const result = sentencesArray(text)
      expect(result.length).to.equal(24)
    })
  })
  describe('wordsArray(text)', () => {
    it('should return an array of words from text', () => {
      const expected = wordsArray('Automatic summarization is the process of reducing a text document with a computer program in order to create a summary that retains the most important points of the original document.')
      const result = wordsArray(sentencesArray(paragraphsArray(text)[0])[0])
      expect(result).to.eql(expected)
    })
  })
  describe('wordsMatrix(sentences, threshold?)', () => {
    it('should construct a two-dimentional matrix of tanimoto distance scores', () => {
      const text = `This is one sentence. 'This is quoted text' in a sentence.\n\n` +
        `This sentence is in a new paragraph! This sentence: is split right up.`
      const sentencesAndWords = sentencesArray(text).map(wordsArray)
      const matrix = wordsMatrix(sentencesAndWords)
      const expected = [1, 0, 0, 0.03571428571428572]
      expect(matrix.length).to.equal(4)
      expect(matrix[0]).to.eql(expected)
    })
    it('should not rank sentences below a provided threshold', () => {
      const text = `This is one sentence. 'This is quoted text' in a sentence.\n\n` +
        `This sentence is in a new paragraph! This sentence: is split right up.`
      const sentencesAndWords = sentencesArray(text).map(wordsArray)
      const matrix = wordsMatrix(sentencesAndWords, 0.23)
      const expected = [1, 0, 0, 0.25]
      expect(matrix.length).to.equal(4)
      expect(matrix[0]).to.eql(expected)
    })
  })
  describe('pageRank(sentences)', () => {
    it('should return objects with scores for each sentence', () => {
      const sentences = sentencesArray(text)
      const ranked = pageRank(sentences)
      const expected = {
        weight: 0.6568212510946212,
        text: 'Automatic summarization is the process of reducing a text document with a computer program in order to create a summary that retains the most important points of the original document.',
        index: 0
      }
      expect(ranked.length).to.equal(24)
      expect(ranked[0]).to.deep.equal(expected)
    })
  })
})
