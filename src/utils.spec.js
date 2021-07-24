import test from 'tape'
import fs from 'fs'

import {
  flatten,
  normalize,
  tanimoto,
  eigenvalues,
  paragraphsArray,
  sentencesArray,
  wordsArray,
  wordsMatrix,
  pageRank
} from './utils.js'

const text = fs.readFileSync('./fixtures/test.txt', 'utf8')

test('utils.js', (t) => {
  test('flatten(array)', (t) => {
    test('should flatten an array of objects', () => {
      const array = [
        [1, 2, 3],
        [4, 5, 6]
      ]
      t.equal(flatten(array).length, 6)
    })
  })
  test('normalize(array)', (t) => {
    test('should normalize an array of numbers', () => {
      const array = [0.1, 0.2, 0.5]
      const expected = [0, 0.25, 1]
      t.isEqual(normalize(array), expected)
    })
  })
  test('tanimoto(sentenceA, sentenceB)', (t) => {
    test('should return a small tanimoto distance for two dissimilar sentences', () => {
      const a = wordsArray('This is one really awesome sentence')
      const b = wordsArray('This is a much more different sentence')
      t.equal(tanimoto(a, b), 0.3)
    })
    test('should return a large tanimoto distance for two similar sentences', () => {
      const a = wordsArray('This is definitely a really awesome sentence')
      const b = wordsArray('This is definitely a really similar sentence')
      t.equal(tanimoto(a, b), 0.75)
      t.equal(tanimoto(a, a), 1)
    })
  })
  test('eigenvalues(matrix, sentences)', (t) => {
    test('should scale and normalize matrix scores', () => {
      const sentences = sentencesArray(paragraphsArray(text)[0])
      const matrix = wordsMatrix(sentences.map(wordsArray))
      const eigen = eigenvalues(matrix, sentences)
      t.equal(sentences.length, eigen.length)
      expect(sentences[0]).to.be.a('string')
      expect(eigen[0]).to.be.a('number')
    })
  })
  test('paragraphsArray(text)', (t) => {
    test('should return an array of paragraphs from text', () => {
      const result = paragraphsArray(text)
      t.equal(result.length, 8)
    })
  })
  test('sentencesArray(text)', (t) => {
    test('should return an array of sentences from text', () => {
      const result = sentencesArray(text)
      t.equal(result.length, 24)
    })
  })
  test('wordsArray(text)', (t) => {
    test('should return an array of words from text', () => {
      const expected = wordsArray(
        'Automatic summarization is the process of reducing a text document with a computer program in order to create a summary that retains the most important points of the original document.'
      )
      const result = wordsArray(sentencesArray(paragraphsArray(text)[0])[0])
      t.isEqual(result, expected)
    })
  })
  test('wordsMatrix(sentences, threshold?)', (t) => {
    test('should construct a two-dimentional matrix of tanimoto distance scores', () => {
      const text =
        `This is one sentence. 'This is quoted text' in a sentence.\n\n` +
        `This sentence is in a new paragraph! This sentence: is split right up.`
      const sentencesAndWords = sentencesArray(text).map(wordsArray)
      const matrix = wordsMatrix(sentencesAndWords)
      const expected = [1, 0, 0, 0.03571428571428572]
      t.equal(matrix.length, 4)
      t.isEqual(matrix[0], expected)
    })
    test('should not rank sentences below a provided threshold', () => {
      const text =
        `This is one sentence. 'This is quoted text' in a sentence.\n\n` +
        `This sentence is in a new paragraph! This sentence: is split right up.`
      const sentencesAndWords = sentencesArray(text).map(wordsArray)
      const matrix = wordsMatrix(sentencesAndWords, 0.23)
      const expected = [1, 0, 0, 0.25]
      t.equal(matrix.length, 4)
      t.isEqual(matrix[0], expected)
    })
  })
  test('pageRank(sentences)', (t) => {
    test('should return objects with scores for each sentence', () => {
      const sentences = sentencesArray(text)
      const ranked = pageRank(sentences)
      const expected = {
        weight: 0.6568212510946212,
        text: 'Automatic summarization is the process of reducing a text document with a computer program in order to create a summary that retains the most important points of the original document.',
        index: 0
      }
      t.equal(ranked.length, 24)
      t.deepEqual(ranked[0], expected)
    })
  })
})
