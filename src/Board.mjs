export class Board {
  width;
  height;
  fallingPiece;

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

    this.#draw(piece, this.fallingLoc)
  }

  moveLeft() {
    this.#draw(this.fallingPiece, this.fallingLoc, true)
    if (this.#test(this.fallingPiece, {...this.fallingLoc, x: this.fallingLoc.x -1})) {
      this.fallingLoc.x -= 1
    }
    this.#draw(this.fallingPiece, this.fallingLoc)
  }

  moveRight() {
    this.#draw(this.fallingPiece, this.fallingLoc, true)
    this.fallingLoc.x += 1
    this.#draw(this.fallingPiece, this.fallingLoc)
  }

  moveDown() {
    this.tick()
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

  #test(piece, loc) {
    for (let y = 0; y < piece.length; y++) {
      let line = piece[y]
      if (line.every(x => x === '.')) { continue } // empty line in piece
      for(let x = 0; x < line.length; x++) {
        if (loc.y + y >= this.height) { return false } // below the field
        if (line[x] != '.' && this.board[loc.y + y][loc.x + x] != '.') { return false } // hitting other piece
      }
    }
    return true
  }

  #toArray(piece) {
    return piece.toString().split('\n').map(line => line.split(''))
  }

  tick() {
    if (!this.falling) { return }

    this.#draw(this.fallingPiece, this.fallingLoc, true)
    this.fallingLoc.y += 1

    if (!this.#test(this.fallingPiece, this.fallingLoc)) {
      this.falling = false
      this.#draw(this.fallingPiece, {...this.fallingLoc, y: this.fallingLoc.y - 1}) // redraw piece
    } else {
      this.#draw(this.fallingPiece, this.fallingLoc)
    }
  }

  hasFalling() {
    return this.falling
  }

  toString() {
    return this.board.map(x => x.join('')).join('\n') + '\n';
  }
}
