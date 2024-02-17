export class Board {
  width;
  height;
  fallingPiece;
  fallingPieceArray;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from(Array(height), _ => Array(width).fill('.'))
  }

  drop(piece) {
    if (this.falling) {
      throw('already falling')
    }

    this.fallingPiece = piece
    piece = this.#toArray(piece)

    this.fallingPieceArray = piece
    this.fallingLoc = {
      x: Math.floor(this.width/2 - piece[0].length + 1),
      y: 0
    }
    this.falling = true

    this.#draw(piece, this.fallingLoc)
  }

  #draw(piece, loc, remove=false) {
    piece.forEach((line, y) => {
      line.forEach((e, x) => {
        if (e != '.') {
          this.board[loc.y + y][loc.x + x] = !remove ? e : '.'
        }
      })
    });
  }

  #toArray(piece) {
    return piece.toString().split('\n').map(line => line.split(''))
  }

  tick() {
    this.fallingLoc.y += 1
    if (this.fallingLoc.y + this.fallingPieceArray.length > this.height || 
        this.board[this.fallingLoc.y + this.fallingPieceArray.length -1][this.fallingLoc.x] != '.') {
          this.falling = false
    } else {
      this.#draw(this.fallingPieceArray, {...this.fallingLoc, y: this.fallingLoc.y -1}, true)
      this.#draw(this.fallingPieceArray, this.fallingLoc)
    }
  }

  hasFalling() {
    return this.falling
  }

  toString() {
    return this.board.map(x => x.join('')).join('\n') + '\n';
  }
}
