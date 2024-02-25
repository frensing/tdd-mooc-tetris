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

    this.#setPiece(piece)
    this.fallingLoc = {
      x: Math.floor((this.width - this.pieceArray[0].length) / 2),
      y: 0
    }
    this.falling = true

    for (let i = 0; i < this.pieceArray.length; i++) {
      if (this.pieceArray[i].every(x => x === '.')) {
        this.fallingLoc.y -= 1
      } else { break }
    }

    this.#draw()
  }

  moveLeft() {
    this.#remove()
    if (this.#test(this.pieceArray, {...this.fallingLoc, x: this.fallingLoc.x - 1})) {
      this.fallingLoc.x -= 1
    }
    this.#draw()
  }

  moveRight() {
    this.#remove()
    if (this.#test(this.pieceArray, {...this.fallingLoc, x: this.fallingLoc.x + 1})) {
      this.fallingLoc.x += 1
    }
    this.#draw()
  }

  moveDown() {
    this.tick()
  }

  rotateLeft() {
    this.#remove()
    if (this.#test(this.#toArray(this.piece.rotateLeft()), this.fallingLoc)) {
      this.#setPiece(this.piece.rotateLeft())
    } else {
      if (this.#test(this.#toArray(this.piece.rotateLeft()), {...this.fallingLoc, x: this.fallingLoc.x - 1})) {
        this.fallingLoc.x -= 1
        this.#setPiece(this.piece.rotateLeft())
      } else if (this.#test(this.#toArray(this.piece.rotateLeft()), {...this.fallingLoc, x: this.fallingLoc.x + 1})) {
        this.fallingLoc.x += 1
        this.#setPiece(this.piece.rotateLeft())
      }
    }
    this.#draw()
  }

  rotateRight() {
    this.#remove()
    if (this.#test(this.#toArray(this.piece.rotateRight()), this.fallingLoc)) {
      this.#setPiece(this.piece.rotateRight())
    } else {
      if (this.#test(this.#toArray(this.piece.rotateRight()), {...this.fallingLoc, x: this.fallingLoc.x - 1})) {
        this.fallingLoc.x -= 1
        this.#setPiece(this.piece.rotateRight())
      } else if (this.#test(this.#toArray(this.piece.rotateRight()), {...this.fallingLoc, x: this.fallingLoc.x + 1})) {
        this.fallingLoc.x += 1
        this.#setPiece(this.piece.rotateRight())
      }
    }
    this.#draw()
  }

  setState(board) {
    board = board.replaceAll(' ', '').split('\n').map(x => Array(...x))
    if (board.length != this.height || board.some(x => x.length != this.width)) {
      throw('different board size!')
    }
    this.board = board
  }

  #setPiece(piece) {
    this.piece = piece
    this.pieceArray = this.#toArray(piece)
  }

  #draw(remove=false) {
    this.pieceArray.forEach((line, y) => {
      line.forEach((e, x) => {
        if (e != '.' && this.fallingLoc.y + y >= 0) {
          this.board[this.fallingLoc.y + y][this.fallingLoc.x + x] = !remove ? e : '.'
        }
      })
    });
  }

  #remove() {
    this.#draw(true)
  }

  #test(piece, loc) {
    for (let y = 0; y < piece.length; y++) {
      let line = piece[y]
      if (line.every(x => x === '.')) { continue } // empty line in piece
      for(let x = 0; x < line.length; x++) {
        if (loc.y + y >= this.height) { return false } // below the field
        if (line[x] != '.' && this.board[Math.max(loc.y + y, 0)][loc.x + x] != '.') { return false } // hitting other piece
      }
    }
    return true
  }

  #toArray(piece) {
    return piece.toString().split('\n').map(line => line.split(''))
  }

  tick() {
    if (!this.falling) { return }

    this.#remove()
    
    if (!this.#test(this.pieceArray, {...this.fallingLoc, y: this.fallingLoc.y + 1})) {
      this.falling = false
    } else {
      this.fallingLoc.y += 1
    }
    this.#draw()
  }

  hasFalling() {
    return this.falling
  }

  toString() {
    return this.board.map(x => x.join('')).join('\n') + '\n';
  }
}
