const chai = require('chai')
const lexrank = require('./lexrank')

const expect = chai.expect

describe('lexrank.js', () => {
  const text = `Automatic summarization is the process of reducing a text document with a computer program in order to create a summary that retains the most important points of the original document. Technologies that can make a coherent summary take into account variables such as length, writing style and syntax. Automatic data summarization is part of machine learning and data mining. The main idea of summarization is to find a representative subset of the data, which contains the information of the entire set. Summarization technologies are used in a large number of sectors in industry today. An example of the use of summarization technology is search engines such as Google. Other examples include document summarization, image collection summarization and video summarization. Document summarization, tries to automatically create a representative summary or abstract of the entire document, by finding the most informative sentences. Similarly, in image summarization the system finds the most representative and important (or salient) images. Similarly, in consumer videos one would want to remove the boring or repetitive scenes, and extract out a much shorter and concise version of the video. This is also important, say for surveillance videos, where one might want to extract only important events in the recorded video, since most part of the video may be uninteresting with nothing going on. As the problem of information overload grows, and as the amount of data increases, the interest in automatic summarization is also increasing.\n\nGenerally, there are two approaches to automatic summarization: extraction and abstraction. Extractive methods work by selecting a subset of existing words, phrases, or sentences in the original text to form the summary. In contrast, abstractive methods build an internal semantic representation and then use natural language generation techniques to create a summary that is closer to what a human might generate. Such a summary might contain words not explicitly present in the original. Research into abstractive methods is an increasingly important and active research area, however due to complexity constraints, research to date has focused primarily on extractive methods. In some application domains, extractive summarization makes more sense. Examples of these include image collection summarization and video summarization.`
  const expectedSummary = `Automatic summarization is the process of reducing a text document with a computer program in order to create a summary that retains the most important points of the original document. The main idea of summarization is to find a representative subset of the data, which contains the information of the entire set. As the problem of information overload grows, and as the amount of data increases, the interest in automatic summarization is also increasing.`
  const result = lexrank.analyze(text)
  describe('analyze(text)', () => {
    it('should return ranked sentences', () => {
      expect(result.ranked).to.be.a('array')
      expect(result.ranked.length).to.equal(19)
    })
    it('should return a summary', () => {
      expect(result.summary).to.be.a('string')
      expect(result.summary).to.equal(expectedSummary)
    })
    it('should accept a callback', () => {
      lexrank.analyze(text, (err, res) => {
        expect(res.ranked.length).to.equal(19)
        expect(res.summary).to.equal(expectedSummary)
      })
    })
  })
})
