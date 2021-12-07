import { getExampleInput, getInput, sumArray } from '../utils.js';

const tx = str => str.split(',').map(Number);

const ex = getExampleInput(6, tx);
const input = getInput(6, tx);

function lanternfish(initialState, days) {
  let currentDay = 0;
  let buckets = Array(9).fill(0);
  initialState.forEach(fish => {
    buckets[fish] += 1;
  });

  while (currentDay < days) {
    let nextBuckets = [];
    let newFish = buckets[0] ?? 0;
    for (let i = 8; i >= 0; i -= 1) {
      switch (i) {
        case 8:
          nextBuckets[i] = newFish;
          break;

        case 6:
          nextBuckets[i] = newFish + (buckets[i + 1] ?? 0);
          break;

        default:
          nextBuckets[i] = buckets[i + 1] ?? 0;
      }
    }

    buckets = nextBuckets;
    currentDay += 1;
  }

  return sumArray(buckets);
}

console.table(lanternfish(ex, 18));
console.table(lanternfish(ex, 80));
console.table(lanternfish(input, 80));
console.table(lanternfish(input, 256));
