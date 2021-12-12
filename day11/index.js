import { getExampleInput, getInput, mapAdjacenies } from '../utils.js';

const tx = str => str.split('\n').map(s => s.split('').map(Number));
const ex = getExampleInput(11, tx);
const input = getInput(11, tx);

function octos(initialState, part = 1) {
  const INCREASE_ENERGY = 'INCREASE_ENERGY';
  const FLASH = 'FLASH';

  let state = initialState;
  const adjacencies = mapAdjacenies(state);
  for (const point in adjacencies) {
    adjacencies[point] = adjacencies[point].map(p => p.join(','));
  }
  let totalFlashes = 0;
  let allFlashes = [];
  let flashes = [];

  const addFlash = (x, y) => {
    flashes.push(`${x},${y}`);
  };

  function octosReducer(action) {
    switch (action.type) {
      case INCREASE_ENERGY:
        return state.map((row, y) =>
          row.map((col, x) => {
            const nextValue = col + 1;
            if (nextValue > 9) {
              addFlash(x, y);
              return 0;
            }
            return nextValue;
          })
        );

      case FLASH: {
        totalFlashes += 1;
        const flashPoint = action.payload;
        const adj = adjacencies[flashPoint];
        const pointIsFlash = (x, y) => `${x},${y}` === flashPoint;
        const pointIsAdjacent = (x, y) => adj.includes(`${x},${y}`);
        const pointHasFlashed = (x, y) => allFlashes.includes(`${x},${y}`);

        // console.log('flashPoint', flashPoint);
        // console.log(adj);

        const nextState = state.map((row, y) =>
          row.map((col, x) => {
            if (pointIsFlash(x, y)) {
              return 0;
            }

            if (pointIsAdjacent(x, y) && !pointHasFlashed(x, y)) {
              if (col === 9) {
                // console.log(`new flash: ${x},${y}`);
                addFlash(x, y);
                return 0;
              }

              return col + 1;
            }

            return col;
          })
        );
        return nextState;
      }

      default:
      // Nothing
    }
  }

  function part1() {
    for (let i = 0; i < 100; i += 1) {
      allFlashes = [];
      state = octosReducer({ type: INCREASE_ENERGY });

      while (flashes.length) {
        const flash = flashes.shift();
        allFlashes.push(flash);
        state = octosReducer({ type: FLASH, payload: flash });
      }
    }
    return totalFlashes;
  }

  function part2() {
    let currentStep = 0;
    while (allFlashes.length !== 100) {
      currentStep += 1;
      allFlashes = [];
      state = octosReducer({ type: INCREASE_ENERGY });

      while (flashes.length) {
        const flash = flashes.shift();
        allFlashes.push(flash);
        state = octosReducer({ type: FLASH, payload: flash });
      }
    }
    return currentStep;
  }

  if (part === 1) {
    console.log(part1());
  } else {
    console.log(`step when all flashed: ${part2()}`);
  }
}

octos(ex);
octos(input);

octos(ex, 2);
octos(input, 2);
