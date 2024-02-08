export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape
  }

  static fromString(shape) {
    shape = shape
      .replaceAll(' ', '')
      .split('\n')
      .map(x => Array(...x))
    return new RotatingShape(shape)
  }

  rotateRight() {
    return new RotatingShape(this.shape.map((line, y) => line.map((e, x) => this.shape[x][y]).reverse()));
  }

  rotateLeft() {
    return this
      .rotateRight()
      .rotateRight()
      .rotateRight()
  }

  toString() {
    return this.shape.map(x => x.join('')).join('\n') + '\n'
  }
}