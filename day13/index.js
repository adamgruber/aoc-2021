import { getExampleInput, getInput } from '../utils.js';

const tx = str => {
  let [points, folds] = str.split(/\n\n/);
  points = points.split('\n');
  folds = folds
    .split('\n')
    .map(f => f.replace('fold along ', '').split('='))
    .map(([axis, value]) => [axis, Number(value)]);
  return [points, folds];
};

const ex = getExampleInput(13, tx);
const input = getInput(13, tx);

const DOT = '8';
const EMPTY = ' ';

function flipMatrix(matrix, axis) {
  if (axis === 'x') {
    return matrix.map(row => row.reverse().filter(Boolean));
  }

  if (axis === 'y') {
    return matrix.reduce((acc, row, i) => {
      acc[i] = matrix[matrix.length - (i + 1)];
      return acc;
    }, []);
  }
}

function getMatrixSize(points) {
  let width = 0;
  let height = 0;
  points.forEach(point => {
    const [x, y] = point.split(',').map(Number);
    width = Math.max(x, width);
    height = Math.max(y, height);
  });
  return { width: width + 1, height: height + 1 };
}

function makePaperMatrix(points) {
  const { width, height } = getMatrixSize(points);
  const matrix = [];
  for (let i = 0; i < height; i += 1) {
    matrix[i] = [];
    for (let j = 0; j < width; j += 1) {
      const currentPoint = `${j},${i}`;
      matrix[i][j] = points.includes(currentPoint) ? DOT : EMPTY;
    }
  }
  return matrix;
}

function printMatrix(matrix) {
  matrix.forEach(row => {
    console.log(row.join(''));
  });
  console.log();
}

function splitMatrix(matrix, axis, splitPoint) {
  const newMatrixA = [];
  const newMatrixB = [];

  if (axis === 'y') {
    for (let i = 0; i < matrix.length; i += 1) {
      if (i === splitPoint) {
        continue;
      } else if (i < splitPoint) {
        newMatrixA.push(matrix[i]);
      } else {
        newMatrixB.push(matrix[i]);
      }
    }
  }

  if (axis === 'x') {
    for (let i = 0; i < matrix.length; i += 1) {
      newMatrixA[i] = [];
      newMatrixB[i] = [];
      for (let j = 0; j < matrix[i].length; j += 1) {
        if (j < splitPoint) {
          newMatrixA[i][j] = matrix[i][j];
        } else if (j === splitPoint) {
          continue;
        } else {
          newMatrixB[i][j - 1] = matrix[i][j];
        }
      }
    }
  }

  return [newMatrixA, newMatrixB];
}

function mergeMatrices(a, b, axis) {
  const newMatrix = [];
  const big = a.length >= b.length ? a : b;
  const small = a.length < b.length ? a : b;
  const diff = big.length - small.length;

  for (let i = big.length - 1; i >= 0; i -= 1) {
    newMatrix[i] = i - diff < 0 ? big[i] : mergeLines(big[i], small[i - diff]);
  }
  return newMatrix;
}

function mergeLines(a, b) {
  const newLine = [];
  const big = a.length >= b.length ? a : b;
  const small = a.length < b.length ? a : b;
  const diff = big.length - small.length;

  for (let i = big.length - 1; i >= 0; i -= 1) {
    newLine[i] = small[i - diff] === DOT ? DOT : big[i];
  }
  return newLine;
}

function foldPaper(paperMatrix, [axis, point]) {
  const [a, b] = splitMatrix(paperMatrix, axis, point);
  const bFlipped = flipMatrix(b, axis);
  return mergeMatrices(a, bFlipped, axis);
}

function countDots(matrix) {
  let dots = 0;
  matrix.forEach(row => {
    dots += row.filter(point => point === DOT).length;
  });
  return dots;
}

function part1(inp) {
  const [points, folds] = inp;
  const paper = makePaperMatrix(points);
  const folded = foldPaper(paper, folds[0]);
  console.log(countDots(folded));
}

function part2(inp) {
  const [points, folds] = inp;
  let paper = makePaperMatrix(points);
  while (folds.length) {
    const fold = folds.shift();
    paper = foldPaper(paper, fold);
  }
  printMatrix(paper);
}

part1(ex);
part1(input);
part2(input);
