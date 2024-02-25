export class Scoring {
  level;
  score;

  constructor(level) {
    this.level = level
    this.score = 0
  }

  getScore() {
    return this.score
  }
}