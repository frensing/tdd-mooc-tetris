import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Scoring } from "../src/Scoring.mjs";

describe('Scoring', () => {
  let scoring;
  beforeEach(() => {
    scoring = new Scoring(0)
  })

  test('has initial score of 0', () => {
    expect(scoring.getScore()).to.equal(0)
  })

  test('update score for one cleared line', () => {
    scoring.scoreLineClearing(1)
    expect(scoring.getScore()).to.equal(40)
  })

  test('score for multiple cleared lines', () => {
    scoring.scoreLineClearing(2)
    expect(scoring.getScore()).to.equal(100)

    scoring.scoreLineClearing(3)
    expect(scoring.getScore()).to.equal(100 + 300)

    scoring.scoreLineClearing(4)
    expect(scoring.getScore()).to.equal(100 + 300 + 1200)
  })
})