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

  inside(x, y) {
    const scale = 0.95
    const r = this.size / 2
    return x * x + y * y <= r * r * scale
  }

  isEmptyAt(cells, x, y) {
    return cellAt(cells, this.parent, x, y) === undefined
  }

  setParent(cells, newParent) {
    // remove from children list from old parent
    const oldChildren = cells[this.parent].children
    const index = oldChildren.indexOf(this._id)
    if (index > -1) oldChildren.splice(index, 1)

    // add to children list from new parent
    const newChildren = cells[newParent].children
    newChildren.push(this._id)

    // set and return new parent
    return (this.parent = newParent)
  }

  getEntryPoint(direction) {
    const r = Math.floor(this.size / 2)
    const entryMap = {
      bottom: [0, -r - 1],
      left: [r + 1, 0],
      top: [0, r + 1],
      right: [-r - 1, 0],
    }
    return entryMap[direction.name]
  }
  move(cells, direction) {
    const { dx, dy } = direction
    const next = [this.x + dx, this.y + dy]
    if (this.inside(...next)) {
      const c = cellAt(cells, this.parent, ...next)
      if (c === undefined) {
        const [x, y] = next
        this.x = x
        this.y = y
        return
      }
      // c is defined, so next is not empty
      this.setParent(cells, c)
      const [x, y] = cells[c].getEntryPoint(direction)
      this.x = x
      this.y = y
      return this.move(cells, direction)
    }
    // next is outside
    return
  }

  static incrementCount() {
    if (!this.count) this.count = 0
    return this.count++
  }
}

export function moveCell(cells, id, direction) {
  const newCells = structuredClone(cells)
  newCells.forEach((cell) => Object.setPrototypeOf(cell, Cell.prototype))
  newCells[id].move(newCells, direction)
  return newCells
}

export function cellAt(cells, parent, X, Y) {
  const children = cells[parent].children
  return children.find((c) => {
    const { x, y } = cells[c]
    return x === X && y === Y
  })
}
