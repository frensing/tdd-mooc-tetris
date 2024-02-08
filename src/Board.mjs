export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from(Array(height), _ => Array(width).fill('.'))
  }

  drop(piece) {
    this.board[0][Math.floor(this.width/2)] = piece
  }

  toString() {
    return this.board.map(x => x.join('')).join('\n') + '\n';
  }
}
