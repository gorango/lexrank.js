'use strict';

var cov_16s8n5kw9g = function () {
  var path = '/home/goran/sandbox/projects/gorango/lexrank.js/src/lexrank.js',
      hash = '61fe2d421b171cfffe1f6d7c4472dc7365dd6381',
      Function = function () {}.constructor,
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/home/goran/sandbox/projects/gorango/lexrank.js/src/lexrank.js',
    statementMap: {
      '0': {
        start: {
          line: 1,
          column: 14
        },
        end: {
          line: 1,
          column: 32
        }
      },
      '1': {
        start: {
          line: 33,
          column: 21
        },
        end: {
          line: 33,
          column: 74
        }
      },
      '2': {
        start: {
          line: 35,
          column: 23
        },
        end: {
          line: 35,
          column: 64
        }
      },
      '3': {
        start: {
          line: 37,
          column: 20
        },
        end: {
          line: 37,
          column: 21
        }
      },
      '4': {
        start: {
          line: 39,
          column: 17
        },
        end: {
          line: 55,
          column: 4
        }
      },
      '5': {
        start: {
          line: 41,
          column: 19
        },
        end: {
          line: 41,
          column: 44
        }
      },
      '6': {
        start: {
          line: 42,
          column: 4
        },
        end: {
          line: 54,
          column: 6
        }
      },
      '7': {
        start: {
          line: 44,
          column: 20
        },
        end: {
          line: 44,
          column: 33
        }
      },
      '8': {
        start: {
          line: 46,
          column: 26
        },
        end: {
          line: 46,
          column: 52
        }
      },
      '9': {
        start: {
          line: 48,
          column: 21
        },
        end: {
          line: 52,
          column: 7
        }
      },
      '10': {
        start: {
          line: 53,
          column: 6
        },
        end: {
          line: 53,
          column: 43
        }
      },
      '11': {
        start: {
          line: 57,
          column: 2
        },
        end: {
          line: 59,
          column: 3
        }
      },
      '12': {
        start: {
          line: 58,
          column: 4
        },
        end: {
          line: 58,
          column: 26
        }
      },
      '13': {
        start: {
          line: 60,
          column: 2
        },
        end: {
          line: 60,
          column: 15
        }
      }
    },
    fnMap: {
      '0': {
        name: 'lexrank',
        decl: {
          start: {
            line: 31,
            column: 16
          },
          end: {
            line: 31,
            column: 23
          }
        },
        loc: {
          start: {
            line: 31,
            column: 41
          },
          end: {
            line: 61,
            column: 1
          }
        },
        line: 31
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 39,
            column: 32
          },
          end: {
            line: 39,
            column: 33
          }
        },
        loc: {
          start: {
            line: 39,
            column: 63
          },
          end: {
            line: 55,
            column: 3
          }
        },
        line: 39
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 42,
            column: 22
          },
          end: {
            line: 42,
            column: 23
          }
        },
        loc: {
          start: {
            line: 42,
            column: 51
          },
          end: {
            line: 54,
            column: 5
          }
        },
        line: 42
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 57,
            column: 2
          },
          end: {
            line: 59,
            column: 3
          }
        },
        type: 'if',
        locations: [{
          start: {
            line: 57,
            column: 2
          },
          end: {
            line: 59,
            column: 3
          }
        }, {
          start: {
            line: 57,
            column: 2
          },
          end: {
            line: 59,
            column: 3
          }
        }],
        line: 57
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0
    },
    b: {
      '0': [0, 0]
    },
    _coverageSchema: '43e27e138ebf9cfc5966b082cf9a028302ed4184'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.lexrank = lexrank;
var utils = (cov_16s8n5kw9g.s[0]++, require('./utils'));

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
function lexrank(text, callback) {
  cov_16s8n5kw9g.f[0]++;

  // Split text into an array of paragraphs, each with an array of sentences
  var paragraphs = (cov_16s8n5kw9g.s[1]++, utils.paragraphsArray(text).map(utils.sentencesArray));
  // Calculate global relevance scores for each sentence
  var globalRanked = (cov_16s8n5kw9g.s[2]++, utils.pageRank(utils.flatten(paragraphs)));
  // Keep a reference to global index to match nested sentences to global scores
  var globalIndex = (cov_16s8n5kw9g.s[3]++, 0);
  // Run detailed analysis on each block of text (paragraph)
  var result = (cov_16s8n5kw9g.s[4]++, paragraphs.map(function (sentences, paragraphIndex) {
    cov_16s8n5kw9g.f[1]++;

    // Calculate paragraph-level relevance scores for each sentence
    var ranked = (cov_16s8n5kw9g.s[5]++, utils.pageRank(sentences));
    cov_16s8n5kw9g.s[6]++;
    return ranked.map(function (sentence, sentenceIndex) {
      cov_16s8n5kw9g.f[2]++;

      // update and copy globalIndex value
      var index = (cov_16s8n5kw9g.s[7]++, globalIndex++);
      // get global sentence score
      var globalScore = (cov_16s8n5kw9g.s[8]++, globalRanked[index].weight);
      // Update the sentence weight to an object containing global, paragraph, and avg scores
      var weight = (cov_16s8n5kw9g.s[9]++, {
        global: globalScore,
        paragraph: sentence.weight,
        average: (globalScore + sentence.weight) / 2
      });
      cov_16s8n5kw9g.s[10]++;
      return _extends({}, sentence, { index: index, weight: weight });
    });
  }));

  cov_16s8n5kw9g.s[11]++;
  if (callback) {
    cov_16s8n5kw9g.b[0][0]++;
    cov_16s8n5kw9g.s[12]++;

    callback(null, result);
  } else {
    cov_16s8n5kw9g.b[0][1]++;
  }
  cov_16s8n5kw9g.s[13]++;
  return result;
}