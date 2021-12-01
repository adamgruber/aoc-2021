import { getExampleInput, getInput, sumArray } from '../utils.js';

const sampleInput = getExampleInput(1, str => str.split('\n').map(Number));
const input = getInput(1, str => str.split('\n').map(Number));

function countIncreases(depths) {
  let increases = 0;
  for (let i = 0; i < depths.length; i += 1) {
    const prevDepth = depths[i - 1];
    const depth = depths[i];
    if (prevDepth && depth > prevDepth) {
      increases += 1;
    }
  }
  return increases;
}

function countIncreasesInSlidingWindow(depths) {
  let increases = 0;
  for (let i = 0; i < depths.length; i += 1) {
    const window = sumArray([depths[i], depths[i + 1], depths[i + 2]]);
    const nextWindow = sumArray([depths[i + 1], depths[i + 2], depths[i + 3]]);

    if (nextWindow > window) {
      increases += 1;
    }
  }
  return increases;
}

console.log(countIncreases(input));
console.log(countIncreasesInSlidingWindow(input));
