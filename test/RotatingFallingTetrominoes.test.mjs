import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe('Falling Tetrominoes', () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test('can be rotatated to the left', () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `....TT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  })

  test('can be rotatated to the right', () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `...TT.....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  })
})

describe('Tetromino cannot be rotated if no room to rotate', () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.setState(
      `..........
       ..........
       ..........
       ..T.......
       ..TT......
       ..T.......`
    )
  });

  test('no rotation left and right', () => {
    // drop testpiece
    board.drop(Tetromino.T_SHAPE)
    board.rotateRight()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveDown()
    board.moveDown()
    board.moveDown()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .T........
       TTT.......
       .TTT......
       ..T.......`
    );
    
    board.rotateLeft() // expect no effect
        
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .T........
       TTT.......
       .TTT......
       ..T.......`
    );

    board.rotateRight() // expect no effect
        
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .T........
       TTT.......
       .TTT......
       ..T.......`
    );
  })
})

describe('Wall Kicks', () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.setState(
      `..........
       ..........
       ..........
       ...T......
       ...TT.....
       ...T......`
    )
  });

  test('when block against right wall, jump left (rotation left)', () => {
    board.drop(Tetromino.T_SHAPE)
    board.rotateRight()
    board.moveDown()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `.........T
       ........TT
       .........T
       ...T......
       ...TT.....
       ...T......`
    );

    board.rotateLeft() // wall kick

    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
       ...T......
       ...TT.....
       ...T......`
    );
  })

  test('when block against left wall, jump right (rotation left)', () => {
    board.drop(Tetromino.T_SHAPE)
    board.rotateLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveDown()
    board.moveDown()

    expect(board.toString()).to.equalShape(
      `..........
       T.........
       TT........
       T..T......
       ...TT.....
       ...T......`
    );

    board.rotateLeft() // wall kick

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .T........
       TTTT......
       ...TT.....
       ...T......`
    );
  })

  test('when block against right wall, jump left (rotation right)', () => {
    board.drop(Tetromino.T_SHAPE)
    board.rotateRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `........TT
       .........T
       ..........
       ...T......
       ...TT.....
       ...T......`
    );

    board.rotateRight() // wall kick

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ...T......
       ...TT.....
       ...T......`
    );
  })

  test('when block against left wall, jump right (rotation right)', () => {
    board.drop(Tetromino.T_SHAPE)
    board.rotateLeft()
    board.moveDown()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveDown()
    board.moveDown()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       T.........
       TT.T......
       T..TT.....
       ...T......`
    );

    board.rotateRight() // wall kick

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       TTTT......
       .T.TT.....
       ...T......`
    );
  })

  test('when block against other block', () => {
    // drop testpiece
    board.drop(Tetromino.T_SHAPE)
    board.rotateRight()
    board.moveDown()
    board.moveLeft()
    board.moveLeft()
    board.moveDown()
    board.moveDown()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..T.......
       .TTT......
       ..TTT.....
       ...T......`
    );
    
    board.rotateLeft() // wall kick from block
        
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       TTTT......
       .T.TT.....
       ...T......`
    );

    board.rotateRight()
    board.moveRight() // reset

    board.rotateRight() // wall kick from block
        
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .T.T......
       TTTTT.....
       ...T......`
    );
  })
})