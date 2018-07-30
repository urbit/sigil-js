import { flatten, size, map, isUndefined } from 'lodash'


const seq = num => Array.from(Array(num), (nada, i) => i)

// makes a 2D array of points parameters
const lat = params => {
  // gutter, size, pointCount, isFlat or not
  const { m, g, s, p, flat } = params
  // Make blank arrays from point count
  const n = { x: seq(p.x), y: seq(p.y), }
  // Inner grid sizing, x: width, y: height
  const i = { x: s.x - (g.x * 2), y: s.y - (g.y * 2), }
  // Cell sizing, x: width, y: height
  const c = { x: i.x / p.x, y: i.y / p.y, }
  // make a matrix where each item is a {x, y} with real coordinates
  const matrix = map(n.y, y => map(n.x, x => {
    const res = {
      x: (x * c.x) + g.x + (x * m.x),
      y: (y * c.y) + g.y + (y * m.y),
    }
    return res
  }
))

  // flatten the matrix if param set
  if (flat) return flatten(matrix)
  return matrix
}

// gets last item in array
const last = arr => arr[size(arr) - 1]

const isAtEnd = (length, index) => index < length ? false : true

const isAtStart = (length, index) => index === 0 ? true : false

const len = arr => size(arr)

const lid = arr => len(arr) - 1

const sq = l => ({x: l, y: l})

const isEmpty = arr => isUndefined(arr)
  ? true
  : len(arr) === 0

// const lastIndex = arr => size(arr) - 1

const getEdge = {
  top:    cell => cell.edgeMap[0],
  right:  cell => cell.edgeMap[1],
  bottom: cell => cell.edgeMap[2],
  left:   cell => cell.edgeMap[3],
}

const getCellTo = {
  left:   (matrix, rI, cI) => matrix[rI][cI - 1],
  right:  (matrix, rI, cI) => matrix[rI][cI + 1],
  above:  (matrix, rI, cI) => matrix[rI - 1][cI],
  below:  (matrix, rI, cI) => matrix[rI + 1][cI],
}

const isInBounds = {
  x:  (matrix, cI) => cI < lid(matrix[0]),
  y: (matrix, rI) => rI < lid(matrix),
}

// const mmap = (arr, callback) => {
//   return map(arr, (row, rI, wholeMatrix) => {
//     return map(row, (cell, cI, wholeRow) => {
//       return callback(cell, [rI, cI], wholeMatrix)
//     })
//   })
// }

const transpose = matrix => map(matrix[0], (x,i) => map(matrix, x => x[i]))

const isFirstIdx = i => i === 0

const isLastIdx = (arr, i) => i === lid(arr)

// const multisplice = (arr, indices) => map(indices, (startI, i) => arr.slice(startI, indices[i + 1]))

// const sort = (arr, comparator, key) => arr.sort((a, b) => comparator(a, b, key))

const rotateArray = (arr, n) => {
  const l = len(arr)
  return arr.slice(l - n).concat(arr.slice(0, l - n))
}


export {
  seq,
  last,
  // lastIndex,
  getEdge,
  getCellTo,
  isInBounds,
  transpose,
  isFirstIdx,
  isLastIdx,
  rotateArray,
  lat,
  isAtEnd,
  isAtStart,
  isEmpty,
  len,
  sq,
  lid
}
