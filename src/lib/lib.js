
import Graph from 'graphology'
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

const getEdgeToBelow = (matrix, r, c) => getTopEdge(getCellBelow(matrix, r, c))

const getEdgeToRight = (matrix, r, c) => getLeftEdge(getCellRight(matrix, r, c))

const isMate = (a, b) => {
  if (a === b) {
    if (a === 'full') {
      return true
    }
  } else {
    return false
  }
}

const lastIndex = arr => arr.length - 1

const getTopEdge = cell => cell.edgeMap[0]
const getRightEdge = cell => cell.edgeMap[1]
const getBottomEdge = cell => cell.edgeMap[2]
const getLeftEdge = cell =>  cell.edgeMap[3]

const getCellLeft = (matrix, rI, cI) => matrix[rI][cI - 1]
const getCellRight = (matrix, rI, cI) => matrix[rI][cI + 1]
const getCellAbove = (matrix, rI, cI) => matrix[rI - 1][cI]
const getCellBelow = (matrix, rI, cI) => matrix[rI + 1][cI]

const inBoundsX = (matrix, cI) => cI < lastIndex(matrix[0])
const inBoundsY = (matrix, rI) => rI < lastIndex(matrix)

const mmap = (arr, callback) => arr.map((row, rI, wholeMatrix) => row.map((cell, cI, wholeRow) => callback(cell, [rI, cI], wholeMatrix)))

const transpose = matrix => matrix[0].map((x,i) => matrix.map(x => x[i]))





const partition = avatar => {
  horizontalGrainPartition(avatar.matrix)
}
//~monnum-rocdeg
const horizontalGrainPartition = matrix => {
  let acc = []
  matrix.forEach((row, rI) => {
    let cycleAcc = []
    row.forEach((cell, cI) => {

      // console.log('cycle: ', cycleAcc)

      if (inBoundsX(matrix, cI)) {

        const rightEdge = getRightEdge(cell)
        const leftEdge = getEdgeToRight(matrix, rI, cI)

        // console.log('---> idx: ', rI, cI)
        // console.log('n: ', cell.name, 'k: ', cell.ownKey, 'r: ', rightEdge, 'l: ', leftEdge)

        if (isMate(rightEdge, leftEdge)) {

          const cellRight = getCellRight(matrix, rI, cI)

          if (cI === 0) {
            cycleAcc = [...cycleAcc, cell, cellRight]
          } else {
            cycleAcc = [...cycleAcc, cellRight]
          }


        } else {
          // if there was a break in continuity
          // if there is no mate, than we need to append single item to acc as a cycleAcc
          if (cycleAcc.length > 0) {
            acc = [...acc, cycleAcc]
          }
          cycleAcc = []

        }


      } else {
        // if we are at the last col index
        if (cycleAcc.length > 0) {
          acc = [...acc, cycleAcc]
        }
        cycleAcc = []
      }


      // if (cI === lastIndex(row)) {
      //   rowAcc = rowAcc.concat(cycleAcc)
      //   cycleAcc = []
      // }
      // console.log('row: ', rowAcc)
  })
})
console.log(acc)

}






const countMates = (geonset, glyphMap, width) => {
  const reshaped = chunk(glyphMap, width)
  const edges = reshaped.map(row => row.map(cell => geonset.geons[cell].edgeMap))
  let acc = 0
  edges.forEach((row, rI) => row.forEach((cell, cI) => {
    if (inBoundsX(edges, cI)) {
      if (isMate(getRightEdge(cell), getEdgeToRight(edges, rI, cI))) {
        acc++
      }
    }
    if (inBoundsY(edges, rI)) {
      if (isMate(getBottomEdge(cell), getEdgeToBelow(edges, rI, cI))) {
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

  geonList.forEach((row, rI) => row.forEach((cell, cI) => graph.addNode(cell.index, {ref:cell})))

  geonList.forEach((row, rI) => row.forEach((cell, cI) => {
    if (inBoundsX(geonList, cI)) {
      if (isMate(getRightEdge(cell), getEdgeToRight(geonList, rI, cI))) {
        const properties = {
          bond: getRightEdge(cell),
          dir: 'rightward',
        }
        graph.addEdge(cell.index, getCellRight(geonList, rI, cI).index, properties)
      }
    }
    if (inBoundsY(geonList, rI)) {
      if (isMate(getBottomEdge(cell), getEdgeToBelow(geonList, rI, cI))) {
        const properties = {
          bond: getBottomEdge(cell),
          dir: 'bottomward',
        }
        graph.addEdge(cell.index, getCellBelow(geonList, rI, cI).index, properties)
      }
    }
  }))
  console.log(graph)
  return graph
}

const dedupe = mates => {
  return mates.reduce((acc, mate) => {
    if (!(mate.reverse() in acc)) {
      return [...acc, mate]
    }
  }, [])
}


const subgraphs = graph => {

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
    '#000',
    '#B1B1B1',
    '#EB5757',
  ]
}

const etch = (avatar, etchset) => {
  // return avatar.geonList.map(geon => {
  //   if (geon.name === 'coin') {
  //     return () => etchset.dott({  })
  //   } else {
  //     return
  //   }
  // })

}

const quickHash = entropy => Math.random().toString(36).substr(2, entropy)


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
  partition,
}
