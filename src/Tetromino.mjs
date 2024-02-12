import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  shape;
  numOrientations;
  orientation;

  constructor(shape, numOrientations, orientation) {
    this.shape = shape
    this.numOrientations = numOrientations
    this.orientation = orientation
  }

  static T_SHAPE = new Tetromino(RotatingShape.fromString(
    `.T.
     TTT
     ...`
  ), 4, 0);

  rotateRight() {
    let orientation = (this.orientation + 1) % this.numOrientations
    return new Tetromino(this.shape.rotateRight(), this.numOrientations, orientation)
  }

  rotateLeft() {
    return new Tetromino(this.shape.rotateLeft(), this.numOrientations)
  }

  toString() {return this.shape.toString()}
}