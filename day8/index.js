import { getExampleInput, getInput, permuteArray } from '../utils.js';

const tx = str =>
  str.split('\n').map(s => s.split(' | ').map(s => s.split(' ')));

const ex = getExampleInput(8, tx);
const input = getInput(8, tx);

function findDigitPatterns(patterns, digit) {
  const lengthMap = {
    1: 2,
    4: 4,
    7: 3,
    8: 7,
  };

  const lengthToMatch = lengthMap[digit];

  if (lengthToMatch) {
    const foundPattern = patterns.find(p => p.length === lengthToMatch);
    return permuteArray(foundPattern.split('')).map(wire => wire.join(''));
  }

  return [];
}

function countDigits(patterns, output, digits) {
  let count = 0;
  digits.forEach(digit => {
    const digitPatterns = findDigitPatterns(patterns, digit);
    output.forEach(outputDigit => {
      if (digitPatterns.includes(outputDigit)) {
        count += 1;
      }
    });
  });
  return count;
}

function getDisplayWiring([patterns, output]) {
  let display = [];

  const strIncludesCharsOfStr = (subject, str) =>
    str.split('').every(char => subject.includes(char));

  display[1] = patterns.find(p => p.length === 2);
  display[4] = patterns.find(p => p.length === 4);
  display[7] = patterns.find(p => p.length === 3);
  display[8] = patterns.find(p => p.length === 7);
  display[3] = patterns.find(
    p => p.length === 5 && strIncludesCharsOfStr(p, display[1])
  );
  display[9] = patterns.find(
    p =>
      p.length === 6 &&
      strIncludesCharsOfStr(p, display[7]) &&
      strIncludesCharsOfStr(p, display[4])
  );
  display[0] = patterns.find(
    p =>
      p.length === 6 && p !== display[9] && strIncludesCharsOfStr(p, display[1])
  );
  display[6] = patterns.find(
    p => p.length === 6 && p !== display[0] && p !== display[9]
  );
  display[5] = patterns.find(
    p => p.length === 5 && strIncludesCharsOfStr(display[6], p)
  );
  display[2] = patterns.find(
    p => p.length === 5 && p !== display[3] && p !== display[5]
  );

  const value = output.map(p => {
    const vals = permuteArray(p.split('')).map(wire => wire.join(''));
    let value;
    for (let i = 0; i < vals.length; i += 1) {
      const found = display.indexOf(vals[i]);
      if (found >= 0) {
        value = found;
        break;
      }
    }
    return value;
  });

  return Number(value.join(''));
}

function part1(entries) {
  let total = 0;
  entries.forEach(entry => {
    total += countDigits(...entry, [1, 4, 7, 8]);
  });
  console.log(total);
}

function part2(entries) {
  let total = 0;
  entries.forEach(entry => {
    total += getDisplayWiring(entry);
  });
  console.log(total);
}

part1(ex);
part1(input);

part2(ex);
part2(input);
