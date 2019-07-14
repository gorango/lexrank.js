/* eslint-env mocha */
const { expect } = require('chai')
const fs = require('fs')
const lexrank = require('./lexrank')

const text = fs.readFileSync('./fixtures/test.txt', 'utf8')

describe('lexrank.js', () => {
  describe('lexrank(text)', async () => {
    const expected = `Automatic summarization is the process of reducing a text document with a computer program in order to create a summary that retains the most important points of the original document.`
    const result = lexrank(text)
    it('should return arrays of ranked sentences', () => {
      expect(result).to.be.a('array')
      expect(result[0]).to.be.a('array')
      expect(result.length).to.equal(8)
      expect(result[0].length).to.equal(11)
    })
    it('should accept a callback', () => {
      lexrank(text, (_, res) => {
        expect(res.length).to.equal(8)
        expect(res[0][0].text).to.equal(expected)
      })
    })
  })
})
