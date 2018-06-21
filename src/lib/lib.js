import { get, set, reduce, size } from 'lodash'


const randInt = max => Math.floor(Math.random() * Math.floor(max))



const avg = arr => reduce(arr, (a,b) => a + b, 0) / size(arr)



const keys = obj => Object.keys(obj)



const entries = obj => Object.entries(obj)



const values = obj => Object.values(obj)



const isMate = (a, b) => {
  if (a === b) {
    if (a === 'full') {
      return true
    }
  } else {
    return false
  }
}


const randomShip = type => {
  let byteLength = 8
  switch (type) {
    case 'comet':
      byteLength = 128
      break
    case 'moon':
      byteLength = 64
      break
    case 'planet':
      byteLength = 32
      break
    case 'star':
      byteLength = 16
      break
    case 'galaxy':
      byteLength = 8
      break
    default: byteLength = 8
  }
  return randInt(Math.pow(2, byteLength))
}


// const countMates = (geonset, glyphMap, width) => {
//   const reshaped = _.chunk(glyphMap, width)
//   const edges = reshaped.map(row => row.map(cell => geonset.geons[cell].edgeMap))
//   let acc = 0
//   edges.forEach((row, rI) => row.forEach((cell, cI) => {
//     if (inBoundsX(edges, cI)) {
//       if (isMate(getRightEdge(cell), getEdgeToRight(edges, rI, cI))) {
//         acc++
//       }
//     }
//     if (inBoundsY(edges, rI)) {
//       if (isMate(getBottomEdge(cell), getEdgeToBelow(edges, rI, cI))) {
//         acc++
//       }
//     }
//   }))
//   return acc
// }



const numComparator = (a, b, key) => {
  if (a[key] < b[key]) return -1
  if (a[key] > b[key]) return 1
  return 0
}



const isEven = n => n % 2 === 0



const isOdd = n => n % 2 !== 0



// const combinatoric = (method, geonset) => {
//   const all = method(geonset.readKeys(geonset), 4).toArray()
//
//   const withMateCount = all.map(geonmap => ({
//     geonmap,
//     mateCount: countMates(geonset, geonmap, 2),
//   }))
//
//   const sorted = sort(withMateCount, numComparator, 'mateCount').reverse()
//   return sorted
// }



const quickHash = entropy => Math.random().toString(36).substr(2, entropy)



const mergeUpdates = (updates, originalElement) => {

  return reduce(updates, (acc, update) => {

    const { action, payload, path} = update

    const existingValue = get(acc, path)

    const method = updaters[action]

    const newValue = method(existingValue, payload)

    set(acc, path, newValue)

    return acc

  }, {...originalElement})
}



const updaters = {
  concat: (existingValue, payload) => [...existingValue, payload],
  replace: (existingValue, payload) => ({...payload}),
  append: (existingValue, payload) => ({...existingValue, ...payload}),
  prependStr: (existingValue, payload) => `${payload} ${existingValue}`,
  concatStr: (existingValue, payload) => `${existingValue} ${payload}`

}





const patpArrToStr = p => {
  return reduce(p, (acc, syl, i) => isEven(i)
    ? i === 0
      ? `~${acc}${syl}`
        ? i === 16
        : `${acc}^${syl}`
      : `${acc}-${syl}`
    : `${acc}${syl}`
  , '')
}



const patpStrToArr = p => p.replace(/[\^~-]/g,'').match(/.{1,3}/g)




export {
  randInt,
  numComparator,
  isEven,
  isOdd,

  values,
  entries,
  keys,

  quickHash,
  mergeUpdates,
  isMate,

  randomShip,
  patpArrToStr,
  patpStrToArr,

  updaters
  // traverse,

}
