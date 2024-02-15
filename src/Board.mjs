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

    piece = piece.toString().split("\n")

    this.fallingPiece = piece
    this.fallingLoc = {
      x: Math.floor(this.width/2 - piece[0].length + 1),
      y: 0
    }
    this.falling = true

    piece.forEach((line, y) => {
      line.split('').forEach((e, x) => {
        this.board[y][this.fallingLoc.x + x] = e
      })
    });
  }

  tick() {
    this.fallingLoc.y += 1
    if (this.fallingLoc.y >= this.height || 
        this.board[this.fallingLoc.y][this.fallingLoc.x] != '.') {
      this.falling = false
    } else {
      this.board[this.fallingLoc.y - 1][this.fallingLoc.x] = '.'
      this.board[this.fallingLoc.y][this.fallingLoc.x] = this.fallingPiece
    }
  }

  hasFalling() {
    return this.falling
  }

  toString() {
    return this.board.map(x => x.join('')).join('\n') + '\n';
  }
}
