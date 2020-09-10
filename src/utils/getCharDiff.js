
const ed = require('edit-distance');

const insert = function(_node) { return 1; };  // eslint-disable-line no-unused-vars
const remove = insert;
const update = function(stringA, stringB) { return stringA !== stringB ? 1 : 0; };

function getDiffCharacters(stringA, stringB) {
  const lev = ed.levenshtein(stringA, stringB, insert, remove, update);
  const pairs = lev.pairs().reverse();
  let diffCharIndicies = [];

  pairs.forEach(([left, right], i) => {
    if (left !== null && right !== null && left !== right) {
      diffCharIndicies.push(i);
    }
  })

  return [pairs, diffCharIndicies];
}

export { getDiffCharacters };
