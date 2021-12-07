import { getExampleInput, getInput } from '../utils.js';

const tx = str => (str = str.split(',').map(Number));

const ex = getExampleInput(7, tx);
const input = getInput(7, tx);

function calcFuel(crabs, loopFn) {
  const fuel = [];
  // Loop all numbers from min to max
  const min = Math.min(...crabs);
  const max = Math.max(...crabs);
  for (let i = min; i <= max; i += 1) {
    fuel[i] = 0;
    crabs.forEach(crab => loopFn(fuel, i, crab));
  }

  // Get lowest fuel cost
  return Math.min(...fuel);
}

function getCostBetweenPoints(start, end) {
  let cost = 0;
  const min = start < end ? start : end;
  const max = start < end ? end : start;

  for (let i = min + 1; i <= max; i += 1) {
    cost += i - min;
  }

  return cost;
}

const loopFn1 = (fuel, position, crab) => {
  fuel[position] += Math.abs(position - crab);
};

const loopFn2 = (fuel, position, crab) => {
  fuel[position] += getCostBetweenPoints(position, crab);
};

console.log(calcFuel(ex, loopFn1));
console.log(calcFuel(input, loopFn1));

console.log(calcFuel(ex, loopFn2));
console.log(calcFuel(input, loopFn2));
