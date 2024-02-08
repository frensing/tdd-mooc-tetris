export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from(Array(height), _ => Array(width).fill('.'))
  }

  toString() {
    return this.board.map(x => x.join('')).join('\n') + '\n';
  }
}
