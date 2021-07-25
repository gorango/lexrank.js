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

// flatten(array)
test('should flatten an array of objects', (t) => {
  const array = [
    [1, 2, 3],
    [4, 5, 6]
  ]
  t.equal(flatten(array).length, 6)
  t.end()
})

// normalize(array)
test('should normalize an array of numbers', (t) => {
  const array = [0.1, 0.2, 0.5]
  const expected = [0, 0.25, 1]
  t.deepEqual(normalize(array), expected)
  t.end()
})

// tanimoto(sentenceA, sentenceB)
test('should return a small tanimoto distance for two dissimilar sentences', (t) => {
  const a = wordsArray('This is one really awesome sentence')
  const b = wordsArray('This is a much more different sentence')
  t.equal(tanimoto(a, b), 0.3)
  t.end()
})

test('should return a large tanimoto distance for two similar sentences', (t) => {
  const a = wordsArray('This is definitely a really awesome sentence')
  const b = wordsArray('This is definitely a really similar sentence')
  t.equal(tanimoto(a, b), 0.75)
  t.equal(tanimoto(a, a), 1)
  t.end()
})

// eigenvalues(matrix, sentences)
test('should scale and normalize matrix scores', (t) => {
  const sentences = sentencesArray(paragraphsArray(text)[0])
  const matrix = wordsMatrix(sentences.map(wordsArray))
  const eigen = eigenvalues(matrix, sentences)
  t.equal(sentences.length, eigen.length)
  t.equal(typeof sentences[0], 'string')
  t.equal(typeof eigen[0], 'number')
  t.end()
})

// paragraphsArray(text)
test('should return an array of paragraphs from text', (t) => {
  const result = paragraphsArray(text)
  t.equal(result.length, 8)
  t.end()
})
// sentencesArray(text)
test('should return an array of sentences from text', (t) => {
  const result = sentencesArray(text)
  t.equal(result.length, 24)
  t.end()
})

// wordsArray(text)
test('should return an array of words from text', (t) => {
  const expected = wordsArray(
    'Automatic summarization is the process of reducing a text document with a computer program in order to create a summary that retains the most important points of the original document.'
  )
  const result = wordsArray(sentencesArray(paragraphsArray(text)[0])[0])
  t.deepEqual(result, expected)
  t.end()
})

// wordsMatrix(sentences, threshold?)
test('should construct a two-dimentional matrix of tanimoto distance scores', (t) => {
  const text =
    `This is one sentence. 'This is quoted text' in a sentence.\n\n` +
    `This sentence is in a new paragraph! This sentence: is split right up.`
  const sentencesAndWords = sentencesArray(text).map(wordsArray)
  const matrix = wordsMatrix(sentencesAndWords)
  const expected = [1, 0, 0, 0.03571428571428572]
  t.equal(matrix.length, 4)
  t.deepEqual(matrix[0], expected)
  t.end()
})

test('should not rank sentences below a provided threshold', (t) => {
  const text =
    `This is one sentence. 'This is quoted text' in a sentence.\n\n` +
    `This sentence is in a new paragraph! This sentence: is split right up.`
  const sentencesAndWords = sentencesArray(text).map(wordsArray)
  const matrix = wordsMatrix(sentencesAndWords, 0.23)
  const expected = [1, 0, 0, 0.25]
  t.equal(matrix.length, 4)
  t.deepEqual(matrix[0], expected)
  t.end()
})

// pageRank(sentences)
test('should return objects with scores for each sentence', (t) => {
  const sentences = sentencesArray(text)
  const ranked = pageRank(sentences)
  const expected = {
    weight: 0.6568212510946212,
    text: 'Automatic summarization is the process of reducing a text document with a computer program in order to create a summary that retains the most important points of the original document.',
    index: 0
  }
  t.equal(ranked.length, 24)
  t.deepEqual(ranked[0], expected)
  t.end()
})
