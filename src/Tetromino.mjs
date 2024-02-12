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

  toString() {return this.shape.toString()}
}