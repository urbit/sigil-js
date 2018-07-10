import { get, set, reduce, size } from 'lodash'
import Combinatorics from 'js-combinatorics'


const randInt = max => Math.floor(Math.random() * Math.floor(max))


const avg = arr => reduce(arr, (a,b) => a + b, 0) / size(arr)


const keys = obj => Object.keys(obj)


const entries = obj => Object.entries(obj)


const values = obj => Object.values(obj)


const includes = (arr, val) => arr.includes(val)


const compose = (...fs) => fs.reduceRight((pF, nF) => (...args) => nF(pF(...args)), v => v)


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


const numComparator = (a, b, key) => {
  if (a[key] < b[key]) return -1
  if (a[key] > b[key]) return 1
  return 0
}

const comparator = (a, b) => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}



const isEven = n => n % 2 === 0



const isOdd = n => n % 2 !== 0



const collider = (array, method, qty) => {
  const all = Combinatorics[method](array, qty).toArray()

  // const withMateCount = all.map(geonmap => ({
  //   geonmap,
  //   // mateCount: countMates(geonset, geonmap, 2),
  // }))

  // const sorted = sort(withMateCount, numComparator, 'mateCount').reverse()
  return all
}


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
  prepend: (existingValue, payload) => [payload, ...existingValue],
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


const deepClone = any => JSON.parse(JSON.stringify(any))


export {
  randInt,
  numComparator,
  isEven,
  isOdd,

  values,
  entries,
  keys,
  includes,

  quickHash,
  mergeUpdates,
  isMate,

  randomShip,
  patpArrToStr,
  patpStrToArr,

  collider,

  updaters,
  comparator,
  deepClone,
  compose,

}
