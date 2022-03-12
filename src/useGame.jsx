import { useState } from 'react'
import Cell from './Cell'

function mod(x, y) {
  return ((x % y) + y) % y
}

function fldmod(x, y) {
  return [Math.floor(x / y), mod(x, y)]
}

export default function useGame(n = 1) {
  const [cells, setCells] = useState(() => createCells(n))
  const [head, setHead] = useState(0)
  const [active, setActive] = useState(1)

  const owner = cells[head].owner
  const size = cells[head].size
  const pieces = getPieces(cells, cells[head].children, size)

  const prevHead = () => setHead((h) => mod(h - 1, cells.length))
  const nextHead = () => setHead((h) => mod(h + 1, cells.length))

  const apply = (index, func, allowRoot = true) => {
    if (index === -1) {
      if (allowRoot || head !== 0) func(head)
      return
    }
    const offset = getOffset(size)
    const [x, y] = fldmod(index, size).map((v) => v - offset)
    const c = cellAt(cells, head, x, y)
    if (allowRoot || c !== 0) func(c)
  }

  const goToParent = () => {
    const p = cells[head].parent
    if (p !== null) setHead(p)
  }

  const focus = () => {
    setHead(cells[active].parent)
  }

  const activePiece = getActivePiece(cells, head, active, size)

  return {
    board: { owner, pieces, size, currentPiece: head, activePiece },
    controls: {
      head: { prev: prevHead, next: nextHead, goToParent, focus },
      activate: (index) => apply(index, setActive, false),
      enter: (index) => apply(index, setHead),
    },
  }
}

function createCells(count) {
  const root = new Cell({ owner: undefined })
  const cells = [root]
  for (let index = 1; index <= count; index++) {
    const last = cells[index - 1]
    const c = last.addChild({ owner: index % 2 })
    cells.push(c)
  }

  return cells
}

function getPieces(cells, children, size) {
  const offset = getOffset(size)
  const scale = 0.95

  const pieces = [...Array(size).keys()].map((X) =>
    [...Array(size).keys()].map((Y) => {
      const [x, y] = [X - offset, Y - offset]
      return { owner: undefined, inside: x * x + y * y <= (size * size * scale) / 4 }
    })
  )

  for (const c of children) {
    const { x, y, owner } = cells[c]
    const [X, Y] = [x + offset, y + offset]
    pieces[X][Y].owner = owner
  }

  return pieces.flat()
}

function getOffset(size) {
  return Math.floor(size / 2)
}

function cellAt(cells, parent, X, Y) {
  const children = cells[parent].children
  return children.find((c) => {
    const { x, y } = cells[c]
    return x === X && y === Y
  })
}

function getActivePiece(cells, head, active, size) {
  const children = cells[head].children
  if (head === active) return -1
  if (!children.includes(active)) return undefined
  const { x, y } = cells[active]
  const offset = getOffset(size)
  return (x + offset) * size + (y + offset)
}
