import { set, map, isString, get, chunk, flatten, reduce, filter, sort, groupBy } from 'lodash'


import {
  quickHash,
  randomShip,
  patpArrToStr,
  patpStrToArr,
  updaters,
  entries,
  comparator,
  comparatorWithKey,
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

// const stops = 'tdn'.split('')
//
// const fricatives = 'sfvz'.split('')
//
// const approximants = 'wjrl'.split('')
//
// const bilabial = 'pbm'.split('')
//
// const velar = 'kgcx'.split('')
//
// const glottal = 'h'.split('')

const phonetics = [
  { cat: 'stops', members:'tdn'.split('') },
  { cat: 'fricatives', members:'sfvz'.split('') },
  { cat: 'approximants', members:'wjrl'.split('') },
  { cat: 'bilabial', members:'pbm'.split('') },
  { cat: 'velar', members:'kgcx'.split('') },
  { cat: 'glottal', members:'h'.split('') },
]

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
let suffixesSorted = map(entries(groupBy(suffixes, syl => syl.slice(-2))), ([k, v]) => ({key: k, members:v, qty:v.length}))

let prefixesSorted = map(entries(groupBy(prefixes, syl => syl.slice(-2))), ([k, v]) => ({key: k, members:v, qty:v.length}))

const sharedConsonants = filter(alphabet, letter => !map([...neverSuf, ...neverPre], l => l.letter).includes(letter) && !vowels.includes(letter) )

const sharedVowels = filter(alphabet, letter => !map([...neverSuf, ...neverPre], l => l.letter).includes(letter) && vowels.includes(letter) )


prefixesSorted = map(prefixesSorted, item => {
  const targetConsonant = item.key[1]
  const phoneticMembership = reduce(entries(phonetics), (acc, [kb, vb]) => {
    if (vb.members.includes(targetConsonant)) {
      return vb.cat
    } else {
      return acc
    }
  }, '')
  return {
    ...item,
    vo: item.key[0],
    ll: item.key[1],
    pn: phoneticMembership,
  }
})

suffixesSorted = map(suffixesSorted, item => {
  const targetConsonant = item.key[1]
  const phoneticMembership = reduce(entries(phonetics), (acc, [kb, vb]) => {
    if (vb.members.includes(targetConsonant)) {
      return vb.cat
    } else {
      return acc
    }
  }, '')
  return {
    ...item,
    vo: item.key[0],
    ll: item.key[1],
    pn: phoneticMembership,
  }
})

const sylSort = (toSort) => {
  const sortedByPn = toSort.sort((a, b) => comparatorWithKey(a, b, 'pn'))
  const withSortedMembers = map(sortedByPn, item => {
    return {
      ...item,
      members: item.members.sort((a, b) => comparator(a, b))
    }
  })
  return withSortedMembers
}

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
  sharedConsonants,
  sharedVowels,
  phonetics,
  sylSort,
}
