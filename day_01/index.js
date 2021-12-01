import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getInput } from '../utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFile = path.resolve(__dirname, './input.txt');

const sampleInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
const input = getInput(inputFile, str => str.split('\n').map(Number));

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

const sumArray = arr => arr.reduce((acc, i) => (acc += i));

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
