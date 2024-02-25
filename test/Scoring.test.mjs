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
})