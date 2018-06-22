import { set, map, isString, get, chunk, flatten, reduce, filter, sort, groupBy } from 'lodash'


import {
  quickHash,
  randomShip,
  patpArrToStr,
  patpStrToArr,
  updaters,
  entries,
  comparator,
} from '../lib/lib'

import {
  transpose,
  scan,
  grainPartition,
  rectGrid,
} from '../lib/lib.array'

import {
  pre,
  suf,
  eachLPre,
  eachLSuf,
  suffixes,
  prefixes,
} from '../lib/lib.urbit'


const alphabet = 'abcdefghijklmnopqrstuvxyz'.split('')

const vowels = 'aeiouy'.split('')

const consonants = alphabet.filter(l => !vowels.includes(l))

// a = prefixes
// b = consonants
const dist = (a, b) => {
  return map(a, row => reduce(b, (acc, bItem) => {
    // console.log(bItem, row, acc)
    if (bItem === row) {
      return acc + 1
    }
    return acc
  }, 0))
}

const zop = (a, b) => reduce(a, (acc, key, index) => {
  acc[key] = b[index]
  return acc
}, {})

const zadd = (a, b) => map(a, (aItem, index) => aItem + b[index])

const distributionPre = dist(alphabet, eachLPre)
const distributionSuf = dist(alphabet, eachLSuf)

// const totalDist = zadd(distributionPre, distributionSuf)

const zippedPre = map(distributionPre, (count, index) => ({
  letter: alphabet[index],
  frequency: count,
}))

const zippedSuf = map(distributionSuf, (count, index) => ({
  letter: alphabet[index],
  frequency: count,
}))

const zippedAll = map(alphabet, (letter, index) => {
  return ({
    sufFrequency: distributionPre[index],
    preFrequency: distributionSuf[index],
    frequency: distributionPre[index] + distributionSuf[index],
    letter,
  })
})


const isZero = a => a === 0
const nonZero = a => !isZero(a)

const neverPre = filter(zippedPre, item => isZero(item.frequency))
const neverSuf = filter(zippedSuf, item => isZero(item.frequency))
const neverDist = filter(zippedAll, item => isZero(item.frequency))

const reverseStr = s => {
  // console.log(s)
  return s.split('').reverse().join('')
}
// const suffixesSorted = suffixes.sort((a, b) => comparator(reverseStr(a), reverseStr(b)))
//
// const prefixesSorted = prefixes.sort((a, b) => comparator(reverseStr(a), reverseStr(b)))
//
const suffixesSorted = groupBy(suffixes, syl => syl.slice(-2))
const prefixesSorted = groupBy(prefixes, syl => syl.slice(-2))

export {
  alphabet,
  vowels,
  consonants,
  zippedPre,
  zippedSuf,
  zippedAll,
  neverPre,
  neverSuf,
  neverDist,
  suffixesSorted,
  prefixesSorted,
}
