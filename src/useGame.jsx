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
  const [active, setActive] = useState(0)

  const owner = cells[head].owner
  const size = cells[head].size
  const pieces = getPieces(cells, cells[head].children, size)

  const prevHead = () => setHead((h) => mod(h - 1, n))
  const nextHead = () => setHead((h) => mod(h + 1, n))

  const activate = (index) => {
    const offset = getOffset(size)
    const [x, y] = fldmod(index, size).map((v) => v - offset)
    setActive(cellAt(cells, head, x, y))
  }

  const activePiece = getActivePiece(cells, head, active, size)
  return {
    board: { owner, pieces, size, currentPiece: head, activePiece },
    controls: { head: { prev: prevHead, next: nextHead }, activate },
  }
}

function createCells(count) {
  const root = new Cell({ owner: 0 })
  const cells = [root]
  for (let index = 1; index < count; index++) {
    const last = cells[index - 1]
    const c = last.addChild({ owner: index % 2 })
    cells.push(c)
  }

  return cells
}

function getPieces(cells, children, size) {
  const pieces = [...Array(size).keys()].map((x) => [...Array(size).keys()].map((y) => undefined))
  const offset = getOffset(size)

  for (const c of children) {
    const { x, y, owner } = cells[c]
    pieces[x + offset][y + offset] = owner
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
