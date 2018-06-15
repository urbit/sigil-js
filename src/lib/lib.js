import Graph from 'graphology'
import { connectedComponents } from 'graphology-components'

import chroma from 'chroma-js'

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

// does not work on arrays of integers
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

const swap = (x, y, [...xs]) => xs.length > 1
 ? ([xs[x], xs[y]] = [xs[y], xs[x]], xs)
 : xs;

const avg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

const end = arr => arr[arr.length - 1]

const endIdx = arr => arr.length - 1

const length = arr => arr.length

const keys = obj => Object.keys(obj)

const entries = obj => Object.entries(obj)

const values = obj => Object.values(obj)

const prop = (key, obj) => obj[key]

const set = (key, obj, value) => obj[key] = value

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

const topEdge = cell => cell.edgeMap[0]
const rightEdge = cell => cell.edgeMap[1]
const bottomEdge = cell => cell.edgeMap[2]
const leftEdge = cell =>  cell.edgeMap[3]

const getCellLeft = (matrix, rI, cI) => matrix[rI][cI - 1]
const getCellRight = (matrix, rI, cI) => matrix[rI][cI + 1]
const getCellAbove = (matrix, rI, cI) => matrix[rI - 1][cI]
const getCellBelow = (matrix, rI, cI) => matrix[rI + 1][cI]

const inBoundsX = (matrix, cI) => cI < matrix[0].length - 1
const inBoundsY = (matrix, rI) => rI < matrix.length - 1

const countMates = (geonset, glyphMap, width) => {
  const reshaped = chunk(glyphMap, width)
  const edges = reshaped.map(row => row.map(cell => geonset.geons[cell].edgeMap))
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

const scan = m => {
  return [
       m[0][0], m[0][1], m[1][0], m[1][1],
       m[0][2], m[0][3], m[1][2], m[1][3],
       m[2][0], m[2][1], m[3][0], m[3][1],
       m[2][2], m[2][3], m[3][2], m[3][3],
  ]
}

const isEven = n => n % 2 === 0
const isOdd = n => n % 2 !== 0


const arrEq = (a, b) => a.length === b.length
  ? a.every((v, i) => v === b[i])
  : false

const combinatoric = (method, geonset) => {
  const all = method(geonset.readKeys(geonset), 4).toArray()

  const withMateCount = all.map(geonmap => ({
    geonmap,
    mateCount: countMates(geonset, geonmap, 2),
  }))

  const sorted = sort(withMateCount, numComparator, 'mateCount').reverse()
  return sorted
}

const graph = geonList => {
  let graph = new Graph()
  // create nodes
  geonList.forEach((row, rI) => row.forEach((cell, cI) => graph.addNode(cell.index, { ref:cell })))
  // create edges
  geonList.forEach((row, rI) => row.forEach((cell, cI) => {
    if (inBoundsX(geonList, cI)) {
      if (isMate(rightEdge(cell), getEdgeOfRight(geonList, rI, cI))) {
        const properties = {
          bond: rightEdge(cell),
          dir: 'rightward',
        }
        graph.addEdge(cell.index, getCellRight(geonList, rI, cI).index, properties)
      }
    }
    if (inBoundsY(geonList, rI)) {
      if (isMate(bottomEdge(cell), getEdgeOfBelow(geonList, rI, cI))) {
        const properties = {
          bond: bottomEdge(cell),
          dir: 'bottomward',
        }
        graph.addEdge(cell.index, getCellBelow(geonList, rI, cI).index, properties)
      }
    }
  }))
  return graph
}

const dedupe = mates => {
  return mates.reduce((acc, mate) => {
    if (!(mate.reverse() in acc)) {
      return [...acc, mate]
    }
  }, [])
}

const palette = p => {
  const charCodes = p.join('').split('').map(c => c.charCodeAt(0))

  const xMax = 360;
  const xMin = 0;

  const yMax = 121;
  const yMin = 97;

  const inputY = charCodes[0]

  const percent = (inputY - yMin) / (yMax - yMin)
  const outputX = percent * (xMax - xMin) + xMin

  // chroma.scale(['#4330FC','#2A4858'])
  //   .mode('lch')
  //   .colors(6)

  return [
    '#4735F5',
    '#B1B1B1',
    '#EB5757',
  ]
}

const etch = (avatar, etchset) => {

  // const validSites = avatar.subgraphs.filter(graph => {
  //   const isMatch =
  //   return isMatch === true
  // })

  const etchProfile = {
    hule: {
      members: [
        {
          offset: 64,
        },
        {
          offset: 128 + 32,
        },
      ]
    },
    dott: {
      members: [
        {
          target: 2,
          radius: 16,
          // halo: (target, radius) => noop(),
        },
        {
          target: 8,
          radius: 32,
          // halo: (target, radius) => noop(),
        },
      ]
    },
  }

  // makes pre-filled functions for renderer
  const prefill = entries(etchProfile).map(([k, v]) => {
    return v.members.map(params => {
      return () => etchset.etches[k].insert(params)
    })
  })

  return prefill
}

const quickHash = entropy => Math.random().toString(36).substr(2, entropy)

const subgraphs = avatar => {
  const sgs = connectedComponents(avatar.graph)
    .map(sg => {
      let graph = new Graph()
      console.log(sg)
      return sg.forEach(idx => graph.addNode(idx))

  })
  return sgs
}



export {
  countMates,
  flatten,
  sequence,
  chunk,
  swap,
  randInt,
  end,
  compose,
  sort,
  prop,
  set,
  numComparator,
  rotateArr,
  scan,
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
  graph,
  subgraphs,
  dedupe,
  palette,
  etch,
  quickHash,
}
