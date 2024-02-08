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
    this.shape = this.shape.map((line, y) => line.map((e, x) => this.shape[x][y]).reverse());
    return this
  }

  toString() {
    return this.shape.map(x => x.join('')).join('\n') + '\n'
  }
}