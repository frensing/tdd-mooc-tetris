export class Shufflebag {
  bag

  constructor() {
    this.bag = Array()
  }

  add(element) {
    this.bag.push(element)
  }

  getSize() {
    return this.bag.length
  }
}