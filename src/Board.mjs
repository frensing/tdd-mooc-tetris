export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from(Array(height), _ => Array(width).fill('.'))
  }

  drop(piece) {
    if (this.falling) {
      throw('already falling')
    }

    piece = this.#toArray(piece)

    this.fallingPiece = piece
    this.fallingLoc = {
      x: Math.floor(this.width/2 - piece[0].length + 1),
      y: 0
    }
    this.falling = true

    piece.forEach((line, y) => {
      line.forEach((e, x) => {
        this.board[y][this.fallingLoc.x + x] = e
      })
    });
  }

  #toArray(piece) {
    return piece.toString().split('\n').map(line => line.split(''))
  }

  tick() {
    this.fallingLoc.y += 1
    if (this.fallingLoc.y + this.fallingPiece.length > this.height || 
        this.board[this.fallingLoc.y + this.fallingPiece.length -1][this.fallingLoc.x] != '.') {
          this.falling = false
    } else {
      this.fallingPiece[0].forEach((_, x) => this.board[this.fallingLoc.y - 1][this.fallingLoc.x + x] = '.')
      this.fallingPiece.forEach((line, y) => {
        line.forEach((e, x) => {
          this.board[this.fallingLoc.y + y][this.fallingLoc.x + x] = e
        })
      });
    }
  }

  hasFalling() {
    return this.falling
  }

  toString() {
    return this.board.map(x => x.join('')).join('\n') + '\n';
  }
}
