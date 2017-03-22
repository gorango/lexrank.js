'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_18qduvjqmv = function () {
  var path = 'C:\\Users\\GORAN\\Dev\\lexrank.js\\src\\lexrank.js',
      hash = 'a99466be4f41a544d0abeaa3b8021dacafa5c2d4',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: 'C:\\Users\\GORAN\\Dev\\lexrank.js\\src\\lexrank.js',
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
          line: 34,
          column: 21
        },
        end: {
          line: 34,
          column: 74
        }
      },
      '2': {
        start: {
          line: 37,
          column: 23
        },
        end: {
          line: 37,
          column: 64
        }
      },
      '3': {
        start: {
          line: 38,
          column: 17
        },
        end: {
          line: 61,
          column: 4
        }
      },
      '4': {
        start: {
          line: 40,
          column: 19
        },
        end: {
          line: 40,
          column: 44
        }
      },
      '5': {
        start: {
          line: 41,
          column: 4
        },
        end: {
          line: 60,
          column: 6
        }
      },
      '6': {
        start: {
          line: 43,
          column: 20
        },
        end: {
          line: 49,
          column: 23
        }
      },
      '7': {
        start: {
          line: 47,
          column: 15
        },
        end: {
          line: 47,
          column: 37
        }
      },
      '8': {
        start: {
          line: 52,
          column: 21
        },
        end: {
          line: 52,
          column: 47
        }
      },
      '9': {
        start: {
          line: 54,
          column: 21
        },
        end: {
          line: 58,
          column: 7
        }
      },
      '10': {
        start: {
          line: 59,
          column: 6
        },
        end: {
          line: 59,
          column: 55
        }
      },
      '11': {
        start: {
          line: 63,
          column: 2
        },
        end: {
          line: 63,
          column: 37
        }
      },
      '12': {
        start: {
          line: 64,
          column: 2
        },
        end: {
          line: 64,
          column: 15
        }
      }
    },
    fnMap: {
      '0': {
        name: 'lexrank',
        decl: {
          start: {
            line: 32,
            column: 16
          },
          end: {
            line: 32,
            column: 23
          }
        },
        loc: {
          start: {
            line: 32,
            column: 41
          },
          end: {
            line: 65,
            column: 1
          }
        },
        line: 32
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 38,
            column: 32
          },
          end: {
            line: 38,
            column: 33
          }
        },
        loc: {
          start: {
            line: 38,
            column: 63
          },
          end: {
            line: 61,
            column: 3
          }
        },
        line: 38
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 41,
            column: 22
          },
          end: {
            line: 41,
            column: 23
          }
        },
        loc: {
          start: {
            line: 41,
            column: 51
          },
          end: {
            line: 60,
            column: 5
          }
        },
        line: 41
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 46,
            column: 20
          },
          end: {
            line: 46,
            column: 21
          }
        },
        loc: {
          start: {
            line: 47,
            column: 15
          },
          end: {
            line: 47,
            column: 37
          }
        },
        line: 47
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 43,
            column: 20
          },
          end: {
            line: 49,
            column: 23
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 44,
            column: 10
          },
          end: {
            line: 48,
            column: 33
          }
        }, {
          start: {
            line: 49,
            column: 10
          },
          end: {
            line: 49,
            column: 23
          }
        }],
        line: 43
      },
      '1': {
        loc: {
          start: {
            line: 63,
            column: 2
          },
          end: {
            line: 63,
            column: 37
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 63,
            column: 2
          },
          end: {
            line: 63,
            column: 10
          }
        }, {
          start: {
            line: 63,
            column: 14
          },
          end: {
            line: 63,
            column: 37
          }
        }],
        line: 63
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
      '12': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0
    },
    b: {
      '0': [0, 0],
      '1': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

exports.lexrank = lexrank;
var utils = (++cov_18qduvjqmv.s[0], require('./utils'));

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
function lexrank(text, callback) {
  ++cov_18qduvjqmv.f[0];

  // Split text into an array of paragraphs, each with an array of sentences
  var paragraphs = (++cov_18qduvjqmv.s[1], utils.paragraphsArray(text).map(utils.sentencesArray));

  // Calculate global relevance scores for each sentence
  var globalRanked = (++cov_18qduvjqmv.s[2], utils.pageRank(utils.flatten(paragraphs)));
  var result = (++cov_18qduvjqmv.s[3], paragraphs.map(function (sentences, paragraphIndex) {
    ++cov_18qduvjqmv.f[1];

    // Calculate paragraph-level relevance scores for each sentence
    var ranked = (++cov_18qduvjqmv.s[4], utils.pageRank(sentences));
    ++cov_18qduvjqmv.s[5];
    return ranked.map(function (sentence, sentenceIndex) {
      ++cov_18qduvjqmv.f[2];

      // Find global indices for each sentence object.
      var index = (++cov_18qduvjqmv.s[6], paragraphIndex > 0 ? (++cov_18qduvjqmv.b[0][0], paragraphs.slice(0, paragraphIndex).reduce(function (sum, paragraph) {
        ++cov_18qduvjqmv.f[3];
        ++cov_18qduvjqmv.s[7];
        return sum + paragraph.length;
      }, 0) + sentenceIndex) : (++cov_18qduvjqmv.b[0][1], sentenceIndex));

      // global sentence score
      var global = (++cov_18qduvjqmv.s[8], globalRanked[index].weight);
      // Update the sentence weight to an object containing global, paragraph, and avg scores
      var weight = (++cov_18qduvjqmv.s[9], {
        global: global,
        paragraph: sentence.weight,
        average: (global + sentence.weight) / 2
      });
      ++cov_18qduvjqmv.s[10];
      return Object.assign(sentence, { index: index, weight: weight });
    });
  }));

  ++cov_18qduvjqmv.s[11];
  (++cov_18qduvjqmv.b[1][0], callback) && (++cov_18qduvjqmv.b[1][1], callback(false, result));
  ++cov_18qduvjqmv.s[12];
  return result;
}