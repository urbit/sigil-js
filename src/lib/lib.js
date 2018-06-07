import primes from 'prime-factors'

// Math
const randInt = max => Math.floor(Math.random() * Math.floor(max))
const factors = num => sequence(num).filter(i => num % i === 0)

// Array

// Make an array of indexes of any length
const sequence = num => Array.from(Array(num), (nada, i) => i)

//
const fromRight = arr => i => arr.slice(0, i)

//
const fromLeft = arr => i => arr.reverse().slice(0, i).reverse()

//
const flatten = ([x, ...xs]) => x
  ? Array.isArray(x)
    ? [...flatten(x), ...flatten(xs)]
    : [x, ...flatten(xs)]
  : []

const chunk = (arr, mod) => arr.reduce((acc, a, i) => {
  const offset = Math.floor(i / mod)
  if(!acc[offset]) { acc[offset] = [] }
  acc[offset].push(a)
  return acc
}, [])

const avg = arr => arr.reduce((a,b) => a + b, 0) / arr.length


// Object
const thread = obj => f => Object.entries(obj).reduce((acc, [k, v]) => (acc[k] = f(v), acc), {} )

const through = a => a.reduce((acc, entry) => (acc[entry] = entry.toString(), acc), {} )



// FP
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

// the english alphabet as an array
const abc = 'abcdefghijklmnopqrstuvwxyz'.split('')

const end = arr => arr[arr.length - 1]

const numPages = (length, perPage) => Math.ceil(length / perPage)

const getPage = arr => pageIndex => perPage => {
  const start = pageIndex * perPage
  const end = (pageIndex * perPage) + perPage
  return 0 <= pageIndex && pageIndex <= numPages(arr.length, perPage)
    ? arr.slice(start, end)
    : []
}

const keys = obj => Object.keys(obj)

const prop = (key, obj) => obj[key]

const getCellBelow = (matrix, row, col) => {
  return matrix[row + 1][col]
}

const getCellRight = (matrix, row, col) => {
  return matrix[row][col + 1]
}

const getEdgeOfBelow = (matrix, row, col) => {
  return topEdge(getCellBelow(matrix, row, col))
}

const getEdgeOfRight = (matrix, row, col) => {
  return leftEdge(getCellRight(matrix, row, col))
}

const isMate = (a, b) => {
  if (a === b) {
    if (a === 'a') {
      return true
    }
  } else {
    return false
  }
}

const topEdge = cell => cell[0]
const rightEdge = cell => cell[1]
const bottomEdge = cell => cell[2]
const leftEdge = cell => cell[3]

const inBounds = (matrix, row, col) => {
  if (row < matrix.length - 1) {
    if (col < matrix[0].length - 1) {
      return true
    }
  }
  return false
}

const inBoundsX = (matrix, col) => {
  if (col < matrix[0].length - 1) {
    return true
  }
  return false
}

const inBoundsY = (matrix, row) => {
  if (row < matrix.length - 1) {
    return true
  }
}

const countMates = (glyphset, glyphMap, width) => {
  const reshaped = chunk(glyphMap, width)
  const edges = reshaped.map(row => row.map(cell => glyphset.glyphs[cell].edgeMap))
  let acc = 0
  edges.forEach((row, rowIndex) => row.forEach((cell, colIndex) => {
    if (inBoundsX(edges, colIndex)) {
      if (isMate(rightEdge(cell), getEdgeOfRight(edges, rowIndex, colIndex))) {
        acc++
      }
    }
    if (inBoundsY(edges, rowIndex)) {
      if (isMate(bottomEdge(cell), getEdgeOfBelow(edges, rowIndex, colIndex))) {
        acc++
      }
    }
  }))
  return acc
}

const numComparator = (a, b, key) => {
  if (a[key] < b[key]) return -1
  if (a[key] > b[key]) return 1
  return 0
}

const concat = (arr, item) => arr.concat(item)

const sort = (arr, comparator, key) => arr.sort((a, b) => comparator(a, b, key))

const rotateArr = (a, n) => a.slice(n, a.length).concat(a.slice(0, n))

// bad don't use
const objHasAnyPropInArr = (obj, arr) => Object.keys(obj).some(key => {
  return arr.includes(key)
})

const dePinwheel = m => ([
     m[0][0], m[0][1], m[1][0], m[1][1],
     m[0][2], m[0][3], m[1][2], m[1][3],
     m[2][0], m[2][1], m[3][0], m[3][1],
     m[2][2], m[2][3], m[3][2], m[3][3],
])

const isEven = n => n % 2 === 0
const isOdd = n => n % 2 !== 0


const arrEq = (a, b) => a.length === b.length
  ? a.every((v, i) => v === b[i])
  : false


export {
  countMates,
  flatten,
  sequence,
  chunk,
  abc,
  randInt,
  end,
  compose,
  sort,
  prop,
  keys,
  numComparator,
  rotateArr,
  objHasAnyPropInArr,
  dePinwheel,
  isEven,
  isOdd,
  arrEq,
}
