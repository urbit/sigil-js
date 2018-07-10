import { flatten, size, map, isUndefined } from 'lodash'

import {
  isMate,
} from './lib'



const seq = num => Array.from(Array(num), (nada, i) => i)



const swap = (x, y, [...xs]) => size(xs) > 1
 ? ([xs[x], xs[y]] = [xs[y], xs[x]], xs)
 : xs;


// makes a 2D array of points parameters
const lat = params => {

  // margin, size, pointCount, isFlat or not
  const { m, s, p, flat } = params

  // Make blank arrays from point count
  const n = { x: seq(p.x), y: seq(p.y), }

  // Inner grid sizing, x: width, y: height
  const i = { x: s.x - (m.x * 2), y: s.y - (m.y * 2), }

  // Cell sizing, x: width, y: height
  const c = { x: i.x / p.x, y: i.y / p.y, }

  // make a matrix where each item is a {x, y} with real coordinates
  const matrix = map(n.y, y => map(n.x, x => {
    const res = {
      x: (x * c.x) + m.x + (x),
      y: (y * c.y) + m.y + (y),
    }
    // console.log((x * c.x) + (m.x * 2))
    return res
  }
))

  // flatten the matrix if param set
  if (flat) return flatten(matrix)
  return matrix
}



const end = arr => arr[size(arr) - 1]


const isAtEnd = (length, index) => index < length ? false : true


const isAtStart = (length, index) => index === 0 ? true : false


const length = arr => size(arr)

const len = arr => size(arr)

const isEmpty = arr => isUndefined(arr)
  ? true
  : arr.length === 0


const lastIndex = arr => size(arr) - 1



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
  x:  (matrix, cI) => cI < lastIndex(matrix[0]),
  y: (matrix, rI) => rI < lastIndex(matrix),
}



const mmap = (arr, callback) => {
  return map(arr, (row, rI, wholeMatrix) => {
    return map(row, (cell, cI, wholeRow) => {
      return callback(cell, [rI, cI], wholeMatrix)
    })
  })
}



const transpose = matrix => map(matrix[0], (x,i) => map(matrix, x => x[i]))



const isFirstIdx = i => i === 0



const isLastIdx = (arr, i) => i === lastIndex(arr)



const partition = avatar => {
  const horizontal = grainPartition(avatar.matrix)
  // const twoByTwos = horizontal.forEach((row, rI) => {
  // })

  const vertical = grainPartition(transpose(avatar.matrix))

  return {
    horizontal,
    vertical,
  }
}



const multisplice = (arr, indices) => map(indices, (startI, i) => arr.slice(startI, indices[i + 1]))




const sort = (arr, comparator, key) => arr.sort((a, b) => comparator(a, b, key))




const rotate = (arr, n) => {
  var L = arr.length;
  return arr.slice(L - n).concat(arr.slice(0, L - n));
};

const scan = m => {
  return [
       m[0][0], m[0][1], m[1][0], m[1][1],
       m[0][2], m[0][3], m[1][2], m[1][3],
       m[2][0], m[2][1], m[3][0], m[3][1],
       m[2][2], m[2][3], m[3][2], m[3][3],
  ]
}


const arrEq = (a, b) => size(a) === size(b)
  ? a.every((v, i) => v === b[i])
  : false


// this could use reduce or just a for loop
const grainPartition = matrix => {
  let sequences = []
  matrix.forEach((row, rI) => {

    let rowBreaks = []
    row.forEach((cell, cI) => {

      // append the start idx at the start of each row loop
      if (isFirstIdx(cI)) rowBreaks = [...rowBreaks, 0]
      if (isInBounds.x(matrix, cI)) {
        const cellToRight = getCellTo.right(matrix, rI, cI)
        const thisRightEdge = getEdge.right(cell)
        const thatLeftEdge = getEdge.left(cellToRight)
        if (!isMate(thisRightEdge, thatLeftEdge)) {
          // append the start index of the next mate seq
          rowBreaks = [...rowBreaks, cI + 1]
        }
      }
    })

    sequences = [...sequences, multisplice(row, rowBreaks)]
  })

  return sequences
}

export {
  seq,
  swap,
  end,
  lastIndex,
  getEdge,
  getCellTo,
  isInBounds,
  mmap,
  transpose,
  isFirstIdx,
  isLastIdx,
  partition,
  multisplice,
  sort,
  rotate,
  scan,
  arrEq,
  grainPartition,
  lat,
  isAtEnd,
  isAtStart,
  isEmpty,
  len,
}
