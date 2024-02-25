import { beforeEach, describe, test, vi } from "vitest";
import { expect } from "chai";
import { Scoring } from "../src/Scoring.mjs";
import { Board } from "../src/Board.mjs";

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

describe('Board', () => {
  let board
  let mockScoring
  let scoreSpy
  beforeEach(() => {
    board = new Board(3, 4)
    board.setState(
      `...
       ..T
       T.T
       T.T`
    )
    board.drop('I\nI')
    board.moveDown()
    board.moveDown()

    mockScoring = {
      scoreLineClearing: lines => undefined
    }
    scoreSpy = vi.spyOn(mockScoring, 'scoreLineClearing')
    board.setScoring(mockScoring)
  })

  test('is called when line is cleaned', () => {
    expect(board.hasFalling()).to.be.true
    expect(scoreSpy.mock.calls.length).to.equal(0)
    board.tick()
    expect(board.hasFalling()).to.be.false
    expect(scoreSpy.mock.calls.length).to.equal(1)
    expect(scoreSpy.mock.calls[0] == 2)
  })
})