import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe('Tetrominoes move', () => {
  let board
  beforeEach(() => {
    board = new Board(10, 6)
  })

  test('to the left', () => {
    board.drop(Tetromino.T_SHAPE)
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    )
  })

  test('to the right', () => {
    board.drop(Tetromino.T_SHAPE)
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    )
  })

  test('down', () => {
    board.drop(Tetromino.T_SHAPE)
    board.moveDown()

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    )
  })
})

describe('Tetrominoes cannot move beyond the board', () => {
  let board
  beforeEach(() => {
    board = new Board(10, 6)
  })

  test('to the left', () => {
    board.drop(Tetromino.T_SHAPE)
    board.moveLeft()
    board.moveLeft()
    board.moveLeft() // edge
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    )

    board.moveLeft() // stop at edge
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    )
  })

  test('to the right', () => {
    board.drop(Tetromino.T_SHAPE)
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight() // edge
    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    )

    board.moveRight() // stop at edge
    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    )
  })

  test('to the bottom', () => {
    board.drop(Tetromino.T_SHAPE)
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown() // bottom
    expect(board.hasFalling(), "the tetromino should still be moving").to.be.true;
    board.moveDown() // stop at bottom

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    )

    expect(board.hasFalling(), "the tetromino should stop moving").to.be.false;
  })
})

describe('Tetrominoes cannot move through other blocks', () => {
  let board
  beforeEach(() => {
    board = new Board(10, 6)
    board.drop(Tetromino.I_SHAPE.rotateRight())
    board.moveRight()
    board.tick()
    board.tick()
    board.tick()
  })

  test('to the left', () => {
    board.drop(Tetromino.T_SHAPE)
    board.moveRight()
    board.moveRight()
    board.moveDown() // next to I

    expect(board.toString()).to.equalShape(
      `..........
       ......T...
       ....ITTT..
       ....I.....
       ....I.....
       ....I.....`
    )

    board.moveLeft() // should not move
    expect(board.toString()).to.equalShape(
      `..........
       ......T...
       ....ITTT..
       ....I.....
       ....I.....
       ....I.....`
    )
  })

  test('to the right', () => {
    board.drop(Tetromino.T_SHAPE)
    board.moveLeft()
    board.moveLeft()
    board.moveDown() // next to I

    expect(board.toString()).to.equalShape(
      `..........
       ..T.......
       .TTTI.....
       ....I.....
       ....I.....
       ....I.....`
    )

    board.moveRight() // should not move
    expect(board.toString()).to.equalShape(
      `..........
       ..T.......
       .TTTI.....
       ....I.....
       ....I.....
       ....I.....`
    )
  })

  test('to the bottom', () => {
    board.drop(Tetromino.T_SHAPE) // above I

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ....I.....
       ....I.....
       ....I.....
       ....I.....`
    )
    expect(board.hasFalling(), "the tetromino should still be moving").to.be.true;

    board.moveDown() // should not move
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ....I.....
       ....I.....
       ....I.....
       ....I.....`
    )
    expect(board.hasFalling(), "the tetromino should stop moving").to.be.false;
  })
})