import { getExampleInput, getInput, sumArray } from '../utils.js';

const tx = str => str.split('\n').map(s => s.split('').map(Number));
const ex = getExampleInput(9, tx);
const input = getInput(9, tx);

function mapAdjacenies(heightmap) {
  const cols = heightmap[0].length;
  const rows = heightmap.length;
  const adjacencies = {};
  heightmap.forEach((row, y) => {
    row.forEach((col, x) => {
      const key = [x, y].join(',');
      adjacencies[key] = [];

      // above
      if (y > 0) {
        adjacencies[key].push([x, y - 1]);
      }

      // below
      if (y < rows - 1) {
        adjacencies[key].push([x, y + 1]);
      }

      // left
      if (x > 0) {
        adjacencies[key].push([x - 1, y]);
      }

      // right
      if (x < cols - 1) {
        adjacencies[key].push([x + 1, y]);
      }
    });
  });

  return adjacencies;
}

function getLowPoints(heightmap) {
  const lowPoints = [];
  heightmap.forEach((row, rowIdx) => {
    row.forEach((point, pointIdx) => {
      let adjacents = [];
      // first/last row
      if (rowIdx === 0 || rowIdx === heightmap.length - 1) {
        adjacents.push(9);
      }

      // above
      if (rowIdx > 0) {
        adjacents.push(heightmap[rowIdx - 1][pointIdx]);
      }

      // below
      if (rowIdx < heightmap.length - 1) {
        adjacents.push(heightmap[rowIdx + 1][pointIdx]);
      }

      // first/last point
      if (pointIdx === 0 || pointIdx === row.length - 1) {
        adjacents.push(9);
      }

      // left
      if (pointIdx > 0) {
        adjacents.push(row[pointIdx - 1]);
      }

      // right
      if (pointIdx < row.length - 1) {
        adjacents.push(row[pointIdx + 1]);
      }

      if (
        !adjacents.includes(point) &&
        Math.min(point, ...adjacents) === point
      ) {
        lowPoints.push([point, [pointIdx, rowIdx]]);
      }
    });
  });
  return lowPoints;
}

function getBasins(heightmap) {
  const cols = heightmap[0].length;
  const rows = heightmap.length;
  const lowPoints = getLowPoints(heightmap);

  const p2s = point => point.join(',');

  function getValueAtPoint(point) {
    const [x, y] = point;
    return heightmap[y][x];
  }

  function getValidAdjacentsForPoint(point) {
    const [x, y] = point;
    const adjacents = [];

    const isValid = p => getValueAtPoint(p) !== 9;

    if (x > cols || y > rows) {
      console.error('point is out of bounds');
      console.log(cols, rows, x, y);
      return [];
    }

    // above
    if (y > 0 && isValid([x, y - 1])) {
      adjacents.push([x, y - 1]);
    }

    // below
    if (y < rows - 1 && isValid([x, y + 1])) {
      adjacents.push([x, y + 1]);
    }

    // left
    if (x > 0 && isValid([x - 1, y])) {
      adjacents.push([x - 1, y]);
    }

    // right
    if (x < cols - 1 && isValid([x + 1, y])) {
      adjacents.push([x + 1, y]);
    }

    return adjacents;
  }

  function getBasin(lowPoint) {
    const seenPoints = new Set();
    const pointsStack = [lowPoint];

    while (pointsStack.length) {
      const point = pointsStack.pop();
      seenPoints.add(p2s(point));
      const adjPoints = getValidAdjacentsForPoint(point);
      adjPoints.forEach(pt => {
        if (!seenPoints.has(p2s(pt))) {
          pointsStack.push(pt);
        }
      });
    }
    return seenPoints;
  }

  const basins = lowPoints.map(([val, pt]) => getBasin(pt).size);
  const largestBasins = basins.sort((a, b) => b - a).slice(0, 3);
  const answer = largestBasins.reduce((acc, size) => acc * size, 1);
  console.log(answer);
}

function part1(inp) {
  const lowPoints = getLowPoints(inp);
  const riskLevel = sumArray(lowPoints.map(([ptVal]) => ptVal + 1));
  console.log(riskLevel);
}

part1(ex);
part1(input);

getBasins(ex);
getBasins(input);

// console.log(mapAdjacenies(ex));
