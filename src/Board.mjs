export class Board {
  width;
  height;
  piece;
  pieceArray;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from(Array(height), _ => Array(width).fill('.'))
  }

  drop(piece) {
    if (this.falling) {
      throw('already falling')
    }

    this.piece = piece
    this.pieceArray = this.#toArray(piece)
    this.fallingLoc = {
      x: Math.floor(this.width/2 - this.pieceArray[0].length + 1),
      y: 0
    }
    this.falling = true

    this.#draw(this.pieceArray, this.fallingLoc)
  }

  moveLeft() {
    this.#remove(this.pieceArray, this.fallingLoc)
    if (this.#test(this.pieceArray, {...this.fallingLoc, x: this.fallingLoc.x - 1})) {
      this.fallingLoc.x -= 1
    }
    this.#draw(this.pieceArray, this.fallingLoc)
  }

  moveRight() {
    this.#remove(this.pieceArray, this.fallingLoc)
    if (this.#test(this.pieceArray, {...this.fallingLoc, x: this.fallingLoc.x + 1})) {
      this.fallingLoc.x += 1
    }
    this.#draw(this.pieceArray, this.fallingLoc)
  }

  moveDown() {
    this.tick()
  }

  rotateLeft() {
    this.#remove(this.pieceArray, this.fallingLoc)
    this.piece = this.piece.rotateLeft()
    this.pieceArray = this.#toArray(this.piece)
    this.#draw(this.pieceArray, this.fallingLoc)
  }

  rotateRight() {
    this.#remove(this.pieceArray, this.fallingLoc)
    this.piece = this.piece.rotateRight()
    this.pieceArray = this.#toArray(this.piece)
    this.#draw(this.pieceArray, this.fallingLoc)
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

  #remove(piece, loc) {
    this.#draw(piece, loc, true)
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

    this.#remove(this.pieceArray, this.fallingLoc)
    this.fallingLoc.y += 1

    if (!this.#test(this.pieceArray, this.fallingLoc)) {
      this.falling = false
      this.#draw(this.pieceArray, {...this.fallingLoc, y: this.fallingLoc.y - 1}) // redraw piece
    } else {
      this.#draw(this.pieceArray, this.fallingLoc)
    }
  }

  hasFalling() {
    return this.falling
  }

  toString() {
    return this.board.map(x => x.join('')).join('\n') + '\n';
  }
}
