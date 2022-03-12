import { useEffect, useState } from 'react'
import Cell, { cellAt, moveCell } from './Cell'

function mod(x, y) {
  return ((x % y) + y) % y
}

function fldmod(x, y) {
  return [Math.floor(x / y), mod(x, y)]
}

export default function useGame(n = 1) {
  const [cells, setCells] = useState(() => createCells(n))
  const [head, setHead] = useState(0)
  const [active, setActive] = useState(n)

  const owner = cells[head].owner
  const size = cells[head].size
  const pieces = getPieces(cells, head, cells[head].children, size)
  const activePiece = getActivePiece(cells, head, active, size)

  const focus = () => {
    setHead(cells[active].parent)
  }

  useEffect(() => focus())

  const move = (dir) => {
    const directionMap = {
      top: { name: 'top', dx: 0, dy: -1 },
      right: { name: 'right', dx: 1, dy: 0 },
      bottom: { name: 'bottom', dx: 0, dy: 1 },
      left: { name: 'left', dx: -1, dy: 0 },
    }
    const newCells = moveCell(cells, active, directionMap[dir])
    setCells(newCells)
  }

  const apply = (index, func, allowRoot = true) => {
    if (index === -1) {
      if (allowRoot || owner !== undefined) func(head)
      return
    }
    const offset = getOffset(size)
    const [y, x] = fldmod(index, size).map((v) => v - offset)
    const c = cellAt(cells, head, x, y)
    if (allowRoot || cells[c].owner !== undefined) func(c)
  }

  const setFirstChildActive = (c) => {
    const f = cells[c].children?.[0]
    if (f && cells[f].owner !== undefined) setActive(f)
  }

  const activable = cells.filter((cell) => cell.owner !== undefined).map((cell) => cell._id)

  const prev = () => {
    const index = activable.indexOf(active)
    const before = mod(index - 1, activable.length)
    setActive(activable[before])
  }

  const next = () => {
    const index = activable.indexOf(active)
    const after = mod(index + 1, activable.length)
    setActive(activable[after])
  }

  return {
    board: {
      pieces,
      size,
      active: { owner: cells[active].owner, index: active },
      head: { owner: cells[head].owner, index: head },
      activePiece,
    },
    controls: {
      prev,
      next,
      activate: (index) => apply(index, setActive, false),
      enter: (index) => apply(index, setFirstChildActive),
      move,
    },
  }
}

function createCells(count) {
  const root = new Cell()
  const cells = [root]
  for (let index = 1; index <= count; index++) {
    const last = cells[index - 1]
    const c = last.addChild({ owner: index % 2 })
    cells.push(c)
  }

  return cells
}

function getPieces(cells, head, children, size) {
  const offset = getOffset(size)

  const pieces = [...Array(size).keys()].map((Y) =>
    [...Array(size).keys()].map((X) => {
      const [x, y] = [X - offset, Y - offset]
      return { owner: undefined, inside: cells[head].inside(x, y) }
    })
  )

  for (const c of children) {
    const { x, y, owner } = cells[c]
    const [X, Y] = [x + offset, y + offset]
    pieces[Y][X].owner = owner
  }

  return pieces.flat()
}

function getOffset(size) {
  return Math.floor(size / 2)
}

function getActivePiece(cells, head, active, size) {
  const children = cells[head].children
  if (head === active) return -1
  if (!children.includes(active)) return undefined
  const { x, y } = cells[active]
  const offset = getOffset(size)
  return (y + offset) * size + (x + offset)
}
