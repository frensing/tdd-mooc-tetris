import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe('Tetrominoes are defined', () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 3);
  });

  test('I shape', () => {
    board.drop(Tetromino.I_SHAPE)
    expect(board.toString()).to.equalShape(
      `...IIII...
       ..........
       ..........`
    )
  })

  test("T shape", () => {
    board.drop(Tetromino.T_SHAPE);
    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........`
    );
  })

  test('O shape', () => {
    board.drop(Tetromino.O_SHAPE);
    expect(board.toString()).to.equalShape(
      `....OO....
       ....OO....
       ..........`
    );
  })

  test('L shape', () => {
    board.drop(Tetromino.L_SHAPE)
    expect(board.toString()).to.equalShape(
      `...LLL....
       ...L......
       ..........`
    )
  })
})