export class Shufflebag {
  bag
  pos

  constructor() {
    this.bag = Array()
    this.pos = -1
  }

  add(element, count=1) {
    for(let i = 0; i < count; i++) {
      this.bag.push(element)
    }
    this.pos = this.getSize() - 1
  }

  getNext() {
    if (this.pos < 1) {
      this.pos = this.getSize() - 1
      return this.bag[0]
    }
    let nextPos = Math.floor(Math.random() * this.pos)
    let nextItem = this.bag[nextPos]
    this.bag[nextPos] = this.bag[this.pos]
    this.bag[this.pos] = nextItem
    this.pos--
    return nextItem
  }

  getSize() {
    return this.bag.length
  }
}