import fs from 'fs';

export const getInput = (path, transformer = x => x) => {
  const data = fs.readFileSync(path, { encoding: 'utf8' });
  return transformer(data);
};
