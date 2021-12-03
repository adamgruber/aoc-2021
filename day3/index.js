import { getInput } from '../utils.js';

const transformer = str => str.split('\n');
const input = getInput(3, transformer);

const countBitsAtPosition = (report, position) => {
  const bitCounts = [0, 0];
  const joinedReport = report.join('');

  for (let i = position; i < joinedReport.length; i += report[0].length) {
    bitCounts[joinedReport.charAt(i) === '0' ? 0 : 1] += 1;
  }

  return bitCounts;
};

const flipBits = str =>
  str
    .split('')
    .map(b => (1 - b).toString())
    .join('');

const getLeastCommonBit = (...args) => {
  const [z, o] = countBitsAtPosition(...args);
  if (z === o) return '0';
  return z < o ? '0' : '1';
};

const getMostCommonBit = (...args) => {
  const [z, o] = countBitsAtPosition(...args);
  if (z === o) return '1';
  return z > o ? '0' : '1';
};

function getPowerConsumption(report) {
  let gamma = '';
  for (let i = 0; i < report[0].length; i += 1) {
    gamma = gamma + getMostCommonBit(report, i);
  }
  const epsilon = flipBits(gamma);
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function getLifeSupportRating(type, report, bitPosition = 0) {
  if (report.length === 1) {
    return parseInt(report[0], 2);
  }
  const bitMatch =
    type === 'o2'
      ? getMostCommonBit(report, bitPosition)
      : getLeastCommonBit(report, bitPosition);
  report = report.filter(line => line.charAt(bitPosition) === bitMatch);
  return getLifeSupportRating(type, report, bitPosition + 1);
}

function part1(report) {
  console.log(getPowerConsumption(report));
}

function part2(report) {
  const o2 = getLifeSupportRating('o2', report);
  const co2 = getLifeSupportRating('co2', report);
  console.log(o2 * co2);
}
part1(input);
part2(input);
