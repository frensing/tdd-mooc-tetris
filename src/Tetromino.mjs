import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  shape;
  orientations;

  constructor(shape, orientations) {
    this.shape = shape
    this.orientations = orientations
  }

  static T_SHAPE = new Tetromino(RotatingShape.fromString(
    `.T.
     TTT
     ...`
  ), 4);

  rotateRight() {
    return new Tetromino(this.shape.rotateRight(), this.orientations)
  }

  rotateLeft() {
    return new Tetromino(this.shape.rotateLeft(), this.orientations)
  }

  toString() {return this.shape.toString()}
}