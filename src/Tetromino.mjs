import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  shape;

  constructor(shape) {
    this.shape = shape
  }

  static T_SHAPE = RotatingShape.fromString(
    `.T.
     TTT
     ...`
  )

  
}