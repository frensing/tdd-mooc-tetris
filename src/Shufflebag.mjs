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
  }

  getNext() {
    this.pos++
    return this.bag[this.pos]
  }

  getSize() {
    return this.bag.length
  }
}