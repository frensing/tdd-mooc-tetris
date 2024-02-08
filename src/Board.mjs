export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from(Array(height), _ => Array(width).fill('.'))
  }

  drop(piece) {
    this.fallingPiece = piece
    this.fallingLoc = {
      x: Math.floor(this.width/2),
      y: 0
    }

    this.board[this.fallingLoc.y][this.fallingLoc.x] = piece
  }

  toString() {
    return this.board.map(x => x.join('')).join('\n') + '\n';
  }
}
