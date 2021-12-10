import { getExampleInput, getInput, sumArray } from '../utils.js';

const tx = str => str.split('\n');
const ex = getExampleInput(10, tx);
const input = getInput(10, tx);

function getSyntaxError(str) {
  const LPAREN = '(';
  const LBRACKET = '[';
  const LBRACE = '{';
  const LARROW = '<';
  const RPAREN = ')';
  const RBRACKET = ']';
  const RBRACE = '}';
  const RARROW = '>';

  const openChars = [LPAREN, LBRACKET, LBRACE, LARROW];
  const closeChars = {
    [LPAREN]: RPAREN,
    [LBRACKET]: RBRACKET,
    [LBRACE]: RBRACE,
    [LARROW]: RARROW,
  };

  str = str.split('');
  let illegalCh = false;
  const closings = [];
  while (str.length && !illegalCh) {
    let ch = str.shift();
    // Found open character
    if (openChars.includes(ch)) {
      // add expected closing to stack
      closings.push(closeChars[ch]);
    } else {
      // Found closing character
      // Does it match expected (top of closings stack)
      const expected = closings.pop();
      if (ch === expected) {
        // console.log('good');
      } else {
        // console.log(`Expected ${expected}, but found ${ch} instead.`);
        illegalCh = ch;
      }
    }
  }

  return illegalCh || closings;
}

function getScore(illegalCh) {
  const scoreMap = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };
  return scoreMap[illegalCh];
}

function getClosingScore(closing) {
  closing = closing.reverse();

  const scoreMap = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  };

  let score = 0;

  closing.forEach(ch => {
    score *= 5;
    score += scoreMap[ch];
  });
  return score;
}

function pt1(inp) {
  const errors = [];
  inp.forEach(line => {
    const err = getSyntaxError(line);
    if (typeof err === 'string') {
      errors.push(getScore(err));
    }
  });
  console.log(sumArray(errors));
}

function pt2(inp) {
  const scores = [];
  for (let i = 0; i < inp.length; i += 1) {
    const errOrClosings = getSyntaxError(inp[i]);
    if (typeof errOrClosings === 'string') {
      continue;
    }
    scores.push(getClosingScore(errOrClosings));
  }

  const sorted = scores.sort((a, b) => b - a);
  const middle = Math.floor(sorted.length / 2);
  console.log(sorted[middle]);
}

pt1(ex);
pt1(input);

pt2(ex);
pt2(input);
