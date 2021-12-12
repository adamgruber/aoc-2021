import fs from 'fs';
import path from 'path';

export const getExampleInput = (day, transformer = x => x) => {
  const data = fs.readFileSync(path.resolve(`day${day}`, 'example.txt'), {
    encoding: 'utf8',
  });
  return transformer(data);
};

export const getInput = (day, transformer = x => x) => {
  const data = fs.readFileSync(path.resolve(`day${day}`, 'input.txt'), {
    encoding: 'utf8',
  });
  return transformer(data);
};

export const sumArray = arr => arr.reduce((acc, i) => (acc += i));

export const chunk = (arr, size = 1) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export const permuteArray = arr => {
  const results = [];
  const used = [];

  function permute(inputArray) {
    for (let i = 0; i < inputArray.length; i++) {
      // Grab single element from array
      const element = inputArray.splice(i, 1)[0];

      // Add element to list of used elements
      used.push(element);

      if (inputArray.length === 0) {
        results.push(used.slice());
      }

      permute(inputArray);
      inputArray.splice(i, 0, element);

      used.pop();
    }
    return results;
  }

  return permute(arr);
};

export const valueAtPoint = (matrix, x, y) => {
  return matrix[y][x];
};

export const mapAdjacenies = matrix => {
  const adjacencies = {};

  matrix.forEach((row, y) => {
    row.forEach((_, x) => {
      const key = [x, y].join(',');
      adjacencies[key] = [];

      const add = (x, y) => {
        adjacencies[key].push([x, y]);
      };

      // aboveL
      if (x - 1 >= 0 && y - 1 >= 0) {
        add(x - 1, y - 1);
      }

      // above
      if (y - 1 >= 0) {
        add(x, y - 1);
      }

      // aboveR
      if (x + 1 >= 0 && y - 1 >= 0) {
        add(x + 1, y - 1);
      }

      // L
      if (x - 1 >= 0) {
        add(x - 1, y);
      }

      // R
      if (x + 1 < row.length) {
        add(x + 1, y);
      }

      // belowL
      if (x - 1 >= 0 && y + 1 < matrix.length) {
        add(x - 1, y + 1);
      }

      // below
      if (y + 1 < matrix.length) {
        add(x, y + 1);
      }

      // belowR
      if (x + 1 < row.length && y + 1 < matrix.length) {
        add(x + 1, y + 1);
      }
    });
  });

  return adjacencies;
};
