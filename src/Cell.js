export default class Cell {
  constructor(props) {
    const { owner, size, x, y } = props || {}
    this._id = Cell.incrementCount()
    this.owner = owner
    this.size = size || 3
    this.parent = null
    this.children = []
    this.x = x || 0
    this.y = y || 0
  }

  addChild(props) {
    const child = new Cell(props)
    child.parent = this._id
    this.children.push(child._id)
    return child
  }

  static incrementCount() {
    if (!this.count) this.count = 0
    return this.count++
  }
}

function moveCell(cells, id, direction) {
  // return new array of cells
}
