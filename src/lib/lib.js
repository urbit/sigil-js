import primes from 'prime-factors'

const splitInt = val => compose(parseDec, binDec, barString)(val)

// Math
const randInt = max => Math.floor(Math.random() * Math.floor(max))
const factors = num => sequence(num).filter(i => num % i === 0)
const randomBinaryOfLength = num => compose(decBin, randInt)(Math.pow(2, num) - 1)

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

//
const filter = ([x, ...xs], f) => def(x)
    ? f(x)
        ? [x, ...filter(xs, f)]
        : [...filter(xs, f)]
    : []

//
const chunk = arr => mod => arr.reduce((acc, a, i) => {
  const offset = Math.floor(i / mod)
  if(!acc[offset]) { acc[offset] = [] }
  acc[offset].push(a)
  return acc
}, [])

// recursive map
const rmap = ([x, ...xs], f) => def(x)
  ? [f(x), ...map(xs, f)]
  : []

// Array.prototype.map() as a pure function
const map = (arr, f) => def(arr)
  ? arr.map((item, i, array) => f(item, i, array))
  : []

const avg = arr => arr.reduce((a,b) => a + b, 0) / arr.length


// const map = Array.prototype.map

// Object
const thread = obj => f => Object.entries(obj).reduce((acc, [k, v]) => (acc[k] = f(v), acc), {} )

const through = a => a.reduce((acc, entry) => (acc[entry] = entry.toString(), acc), {} )



// FP
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))


// Util
const def = a => typeof a !== 'undefined'



// Type Coercion
// String.prototype.split() as a pure function
const split = s => delimiter => s.split(delimiter)
// String.prototype.split() as a pure function
// TODO only use one of these
const splitLim = s => delimiter => lim =>  s.split(delimiter, lim)

// String.prototype.match() as a pure function
const match = s => r => s.match(r)

// Converts a string '01...' to a binary array with leading 0 fill for 32 bits
const stringBar = s => {
  const fill = barString(sequence(32 - s.length).map(item => '0'))
  return split(fill + s)('').map(a => parseDec(a))
}

// Converts a binary array ['0', '1', ...] to a single string '01...'
const barString = arr => join(arr)('')

// Object.prototype.toString() as a pure function
const toString = a => a.toString()

// Array.prototype.join() as a pure function
const join = a => separator => a.join(separator)

// Parse an input into base-10
const parseDec = a => parseInt(a, 10)

const replace = s => test => delimiter => s.replace(test, delimiter)

// the english alphabet as an array
const abc = 'abcdefghijklmnopqrstuvwxyz'.split('')

const loadImage = src => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = err => reject(err)
    img.src = src
  })
}

const end = arr => arr[arr.length - 1]

// Base Conversion
// const binDec = s => parseInt(s, 2).toString(10)
// const binHex = s => parseInt(s, 2).toString(16)
// const decBin = s => parseInt(s, 10).toString(2)
// const decHex = s => parseInt(s, 10).toString(16)
// const hexBin = s => parseInt(s, 16).toString(2)
// const hexDec = s => parseInt(s, 16).toString(10)
// large binary conversion
const { binDec, binHex, decBin, decHex, hexBin, hexDec } = thread({
  binDec: [2, 10],
  binHex: [2, 16],
  decBin: [10, 2],
  decHex: [10, 16],
  hexBin: [16, 2],
  hexDec: [16, 10],
})(bases => {
  const conversion = s => parseInt(s, bases[0]).toString(bases[1])
  return s => conversion(s)
})

const callIfDef = f => (...args) => def(f)
  ? f(...args)
  : null


const slice = arr => start => end => arr.slice(start, end)

const numPages = (length, perPage) => Math.ceil(length / perPage)

const getPage = arr => pageIndex => perPage => {
  const start = pageIndex * perPage
  const end = (pageIndex * perPage) + perPage
  return 0 <= pageIndex && pageIndex <= numPages(arr.length, perPage)
    ? slice(arr)(start)(end)
    : []
}

const keys = obj => Object.keys(obj)

const prop = key => obj => obj[key]


export {
  randomBinaryOfLength,
  flatten,
  sequence,
  filter,
  factors,
  thread,
  through,
  chunk,
  binDec,
  binHex,
  decBin,
  decHex,
  hexBin,
  hexDec,
  loadImage,
  join,
  split,
  def,
  callIfDef,
  map,
  abc,
  match,
  randInt,
  replace,
  end,
  getPage,
  numPages,
  keys,
  prop,
  compose,
}
