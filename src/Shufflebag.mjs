export class Shufflebag {
  bag

  constructor() {
    this.bag = Array()
  }

  add(element, count=1) {
    for(let i = 0; i < count; i++) {
      this.bag.push(element)
    }
  }

  getNext() {
    return this.bag[0]
  }

  getSize() {
    return this.bag.length
  }
}