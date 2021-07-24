import test from 'tape'
import fs from 'fs'
import lexrank from './lexrank.js'

const text = fs.readFileSync('./fixtures/test.txt', 'utf8')

test('lexrank.js', () => {
  test('lexrank(text)', async () => {
    const expected = `Automatic summarization is the process of reducing a text document with a computer program in order to create a summary that retains the most important points of the original document.`
    const result = lexrank(text)
    test('should return arrays of ranked sentences', () => {
      t.equal(typeof result, 'array')
      t.equal(typeof result[0], 'array')
      t.equal(result.length, 8)
      t.equal(result[0].length, 11)
    })
    test('should accept a callback', () => {
      lexrank(text, (_, res) => {
        t.equal(res.length, 8)
        t.equal(res[0][0].text, expected)
      })
    })
  })
})
