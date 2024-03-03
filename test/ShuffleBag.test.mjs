import { beforeEach, describe, test, vi } from "vitest";
import { expect } from "chai";
import { Shufflebag } from "../src/Shufflebag.mjs";

describe('Filling the Shufflebag', () => {
  let shufflebag
  beforeEach(() => {
    shufflebag = new Shufflebag()
  })

  test('bag is empty when initialized', () => {
    expect(shufflebag.getSize()).to.equal(0)
  })

  test('can add one element', () => {
    shufflebag.add('T')
    expect(shufflebag.getSize()).to.equal(1)
  })

  test('can add multiple elements', () => {
    shufflebag.add('L', 3)
    expect(shufflebag.getSize()).to.equal(3)
  })
  
  test('can retrieve an element', () => {
    shufflebag.add('T', 1)
    expect(shufflebag.getNext()).to.equal('T')
  })
})