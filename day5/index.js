import bresenham from 'bresenham';
import { getExampleInput, getInput } from '../utils.js';

const tx = str => {
  const lines = str.split('\n').map(line => {
    const {
      groups: { x1, x2, y1, y2 },
    } = line.match(/(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/);
    return [x1, y1, x2, y2].map(Number);
  });
  return lines;
};

const ex = getExampleInput(5, tx);
const input = getInput(5, tx);

const getGridSize = lines => {
  let xSize = 0;
  let ySize = 0;
  lines.forEach(line => {
    const [x1, y1, x2, y2] = line;
    xSize = Math.max(xSize, x1, x2);
    ySize = Math.max(ySize, y1, y2);
  });
  return [xSize, ySize];
};

const filterStraightLines = ([x1, y1, x2, y2]) => x1 === x2 || y1 === y2;

const makeGrid = lines => {
  const [width, height] = getGridSize(lines);
  const grid = [];
  const row = () => Array(width + 1).fill(0);
  for (let i = 0; i < height + 1; i += 1) {
    grid.push(row());
  }
  return grid;
};

const drawLines = (lines, filterFn) => {
  const grid = makeGrid(lines);
  if (filterFn) {
    lines = lines.filter(filterFn);
  }

  lines.forEach((line, i) => {
    const points = bresenham(...line);
    points.forEach(({ x, y }) => {
      grid[y][x] += 1;
    });
  });

  return grid;
};

const countOverlaps = grid => grid.flatMap(r => r.filter(n => n >= 2)).length;

const part1 = raw => countOverlaps(drawLines(raw, filterStraightLines));
const part2 = raw => countOverlaps(drawLines(raw));

console.log(part1(ex));
console.log(part1(input));
console.log(part2(ex));
console.log(part2(input));
