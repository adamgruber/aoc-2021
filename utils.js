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
