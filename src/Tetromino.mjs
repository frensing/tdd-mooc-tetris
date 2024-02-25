import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  shapes;

  constructor(shapes) {
    this.shapes = shapes
  }

  static createTetromino(shape, numOrientations) {
    let shapes = []
    for(let i = 0; i < numOrientations; i++) {
      shapes.push(shape)
      shape = shape.rotateRight()
    }
    return new Tetromino(shapes)
  }

  static T_SHAPE = Tetromino.createTetromino(RotatingShape.fromString(
    `.T.
     TTT
     ...`
  ), 4);

  static I_SHAPE = new Tetromino([
    `....\nIIII\n....\n....\n`,
    `..I.\n..I.\n..I.\n..I.\n`
  ])

  static O_SHAPE = new Tetromino([
    `....\n.OO.\n.OO.\n....\n`
  ])

  rotateRight() {
    return new Tetromino([...this.shapes.slice(1), this.shapes[0]])
  }

  rotateLeft() {
    return new Tetromino([this.shapes.at(-1), ...this.shapes.slice(0, -1)])
  }

  toString() {
    return this.shapes[0].toString()
  }
}