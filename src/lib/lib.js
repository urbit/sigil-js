const isObject = any => any && typeof any === 'object' && any.constructor === Object

const isString = any => typeof any === 'string' || any instanceof String

const isNumber = any => typeof any === 'number' && isFinite(any)

const isArray = any => Array.isArray(any)

const isFunction = any => typeof any === 'function'

const isNull = any => any === null

const isUndefined = any => typeof any === 'undefined'

const isDef = any => typeof any !== 'undefined'

const isBoolean = any => typeof any === 'boolean'

const isRegExp = any => any && typeof any === 'object' && any.constructor === RegExp

const isError = any => any instanceof Error && typeof any.message !== 'undefined'

const isDate = any => any instanceof Date

const isSymbol = any => typeof any === 'symbol'

const randInt = max => Math.floor(Math.random() * Math.floor(max))

// const factors = num => sequence(num).filter(i => num % i === 0)

const sequence = num => Array.from(Array(num), (nada, i) => i)

const fromRight = arr => i => arr.slice(0, i)

const fromLeft = arr => i => arr.reverse().slice(0, i).reverse()

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

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const end = arr => arr[arr.length - 1]

const endIdx = arr => arr.length - 1

const length = arr => arr.length

const keys = obj => Object.keys(obj)

const entries = obj => Object.entries(obj)

const values = obj => Object.values(obj)

const prop = (key, obj) => obj[key]

const getCellBelow = (matrix, row, col) => matrix[row + 1][col]

const getCellRight = (matrix, row, col) => matrix[row][col + 1]

const getEdgeOfBelow = (matrix, r, c) => topEdge(getCellBelow(matrix, r, c))

const getEdgeOfRight = (matrix, r, c) => leftEdge(getCellRight(matrix, r, c))

const isMate = (a, b) => {
  if (a === b) {
    if (a === 'full') {
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

const inBoundsX = (matrix, col) => col < matrix[0].length - 1
const inBoundsY = (matrix, row) => row < matrix.length - 1

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

const combinatoric = (method, geonset) => {
  const all = method(geonset.readKeys(geonset), 4).toArray()

  const withMateCount = all.map(glyph => ({
    glyph,
    mateCount: countMates(geonset, glyph, 2),
  }))

  const sorted = sort(withMateCount, numComparator, 'mateCount').reverse()
  return sorted
}



export {
  countMates,
  flatten,
  sequence,
  chunk,
  randInt,
  end,
  compose,
  sort,
  prop,
  numComparator,
  rotateArr,
  dePinwheel,
  isEven,
  isOdd,
  arrEq,
  isObject,
  isString,
  isNumber,
  isArray,
  isFunction,
  isNull,
  isUndefined,
  isBoolean,
  isRegExp,
  isError,
  isDate,
  isSymbol,
  isDef,
  values,
  entries,
  keys,
  combinatoric,
  endIdx,
  length,
}
