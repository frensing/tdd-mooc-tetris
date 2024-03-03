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

  getSize() {
    return this.bag.length
  }
}