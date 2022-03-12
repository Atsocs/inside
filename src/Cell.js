export default class Cell {
  constructor(props) {
    const { owner, size, x, y } = props || {}
    this._id = Cell.incrementCount()
    this.owner = owner
    this.size = size || 5
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

  addParent(cells, props) {
    if (this.parent !== null) return this.parent
    const parent = new Cell(props)
    parent.children.push(this._id)
    this.parent = parent._id
    cells.push(parent)
    return parent
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

  getExitPoint(direction) {
    const r = Math.floor(this.size / 2)
    const exitMap = {
      top: [0, -r],
      right: [r, 0],
      bottom: [0, r],
      left: [-r, 0],
    }
    return exitMap[direction.name]
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

  setPosition(newPosition) {
    const [x, y] = newPosition
    this.x = x
    this.y = y
    return [this.x, this.y]
  }

  move(cells, direction) {
    const { dx, dy } = direction
    const next = [this.x + dx, this.y + dy]
    const isNextInside = this.inside(...next)

    if (isNextInside) {
      const c = cellAt(cells, this.parent, ...next)
      if (c === undefined) return this.setPosition(next)

      // c is defined, so next is not empty
      this.setParent(cells, c)
      const [x, y] = cells[c].getEntryPoint(direction)
      this.setPosition([x, y])
      return this.move(cells, direction)
    }

    const [exitX, exitY] = this.getExitPoint(direction)
    if (this.x !== exitX || this.y !== exitY) return null

    const p = this.parent
    if (cells[p].parent === null) {
      if (Cell.flags.allowParentAddition) cells[p].addParent(cells)
      else return null
    }

    const pp = cells[p].parent

    const currentPosition = [this.x, this.y]
    const currentParent = this.parent

    this.setParent(cells, pp)
    const { x, y } = cells[p]
    this.setPosition([x, y])

    const newPosition = this.move(cells, direction)

    if (newPosition === null) {
      this.setParent(currentParent)
      this.setPosition(currentPosition)
      return null
    }

    return newPosition
  }

  static incrementCount() {
    if (!this.count) this.count = 0
    return this.count++
  }

  static flags = { allowParentAddition: false }
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
    const { x, y, owner } = cells[c]
    return owner !== undefined && x === X && y === Y
  })
}
