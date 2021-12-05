import { getExampleInput, getInput } from '../utils.js';

const tx = str => {
  str = str.split('\n\n');
  const draws = str.splice(0, 1)[0].split(',');
  str = str.map(b => b.split('\n'));
  return [draws, str];
};
const ex = getExampleInput(4, tx);
const input = getInput(4, tx);

class Bingo {
  constructor(draws, boards) {
    this.draws = draws;
    this.currentDraw = null;
    this.boards = boards.map(b => new Board(b));
    this.numBoards = boards.length;
    this.winner = null;
    this.winners = [];
  }

  checkForWinner() {
    this.winner = this.boards.find(b => b.hasWon());
  }

  play() {
    while (!this.winner) {
      this.currentDraw = this.draws.shift();
      this.boards.forEach(b => b.drawNum(this.currentDraw));
      this.checkForWinner();
    }
  }

  playPt2() {
    while (!this.winner) {
      this.currentDraw = this.draws.shift();
      this.boards.forEach((b, i) => {
        b.drawNum(this.currentDraw);
        if (b.hasWon() && !this.winners.includes(i)) {
          this.winners.unshift(i);
        }
      });
      if (this.winners.length === this.numBoards) {
        this.winner = this.boards[this.winners[0]];
      }
    }
  }

  getScore() {
    return this.currentDraw * this.winner.getUnmarkedSum();
  }
}

class Board {
  constructor(boardsArr) {
    this.rows = [];
    this.cols = [];
    this.size = 5;
    this.wins = [];
    this.draws = new Set();
    this.parseBoard(boardsArr);
  }

  parseBoard(board) {
    board.forEach((row, i) => {
      row = row.trim().split(/\s+/);
      this.rows[i] = [];
      row.forEach((num, j) => {
        if (!this.cols[j]) {
          this.cols[j] = [];
        }
        this.rows[i].push(num);
        this.cols[j].push(num);
      });
    });
  }

  drawNum(num) {
    this.draws.add(num);
    this.check();
  }

  hasWon() {
    return this.wins[0] !== undefined || this.wins[1] !== undefined;
  }

  check() {
    if (this.draws.size < this.size || this.hasWon()) {
      return;
    }

    const winningRow = this.rows.findIndex(row =>
      row.every(num => this.draws.has(num))
    );

    const winningCol = this.cols.findIndex(row =>
      row.every(num => this.draws.has(num))
    );

    if (winningRow > -1) {
      this.wins[0] = winningRow;
    }
    if (winningCol > -1) {
      this.wins[1] = winningCol;
    }
  }

  getUnmarked() {
    return this.rows.reduce((acc, row) => {
      return [...acc, ...row.filter(num => !this.draws.has(num))];
    }, []);
  }

  getUnmarkedSum() {
    return this.getUnmarked().reduce((acc, num) => acc + Number(num), 0);
  }
}

// const exGame = new Bingo(...ex);
// exGame.play();
// console.log(exGame.getScore());

const game = new Bingo(...input);
game.play();
console.log(game.getScore());

// const game2 = new Bingo(...input);
// game2.playPt2();
// console.log(game2.getScore());
