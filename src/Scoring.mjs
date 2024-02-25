export class Scoring {
  level;
  score;
  #lineScores = [40, 100, 300, 1200]

  constructor(level) {
    this.level = level
    this.score = 0
  }

  getScore() {
    return this.score
  }

  scoreLineClearing(lines) {
    this.score += this.#lineScores[lines - 1] * (this.level + 1)
  }
}