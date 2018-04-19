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
  ? Array.isArray(x) ? [...flatten(x), ...flatten(xs)] : [x, ...flatten(xs)]
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
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

const loadImage = src => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = err => reject(err)
    img.src = src
  })
}

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


// all urbit ship name prefixes
// regex strips any line breaks from template literal
const pre = replace(`
dozmarbinwansamlitsighidfidlissogdirwacsabwissib
rigsoldopmodfoglidhopdardorlorhodfolrintogsilmir
holpaslacrovlivdalsatlibtabhanticpidtorbolfosdot
losdilforpilramtirwintadbicdifrocwidbisdasmidlop
rilnardapmolsanlocnovsitnidtipsicropwitnatpanmin
ritpodmottamtolsavposnapnopsomfinfonbanmorworsip
ronnorbotwicsocwatdolmagpicdavbidbaltimtasmallig
sivtagpadsaldivdactansidfabtarmonranniswolmispal
lasdismaprabtobrollatlonnodnavfignomnibpagsopral
bilhaddocridmocpacravripfaltodtiltinhapmicfanpat
taclabmogsimsonpinlomrictapfirhasbosbatpochactid
havsaplindibhosdabbitbarracparloddosbortochilmac
tomdigfilfasmithobharmighinradmashalraglagfadtop
mophabnilnosmilfopfamdatnoldinhatnacrisfotribhoc
nimlarfitwalrapsarnalmoslandondanladdovrivbacpol
laptalpitnambonrostonfodponsovnocsorlavmatmipfip
`)(/(\r\n|\n|\r)/gm)('')


// all urbit ship name suffixes
// regex strips any line breaks from template literal
const suf = replace(`
zodnecbudwessevpersutletfulpensytdurwepserwylsun
rypsyxdyrnuphebpeglupdepd 2 ysputlughecryttyvsydnex
lunmeplutseppesdelsulpedtemledtulmetwenbynhexfeb
pyldulhetmevruttylwydtepbesdexsefwycburderneppur
rysrebdennutsubpetrulsynregtydsupsemwynrecmegnet
secmulnymtevwebsummutnyxrextebfushepbenmuswyxsym
selrucdecwexsyrwetdylmynmesdetbetbeltuxtugmyrpel
syptermebsetdutdegtexsurfeltudnuxruxrenwytnubmed
lytdusnebrumtynseglyxpunresredfunrevrefmectedrus
bexlebduxrynnumpyxrygryxfeptyrtustyclegnemfermer
tenlusnussyltecmexpubrymtucfyllepdebbermughuttun
bylsudpemdevlurdefbusbeprunmelpexdytbyttyplevmyl
wedducfurfexnulluclennerlexrupnedlecrydlydfenwel
nydhusrelrudneshesfetdesretdunlernyrsebhulryllud
remlysfynwerrycsugnysnyllyndyndemluxfedsedbecmun
lyrtesmudnytbyrsenwegfyrmurtelreptegpecnelnevfes
`)(/(\r\n|\n|\r)/gm)('')


// parse suffixes and prefixes into strings of length 3
const sufChunk = match(suf)(/.{1,3}/g)
const preChunk = match(pre)(/.{1,3}/g)


// generates a random ship name
const randomShipName = bitLength =>
  sequence(bitLength / 8).map(index => index % 2 === 0
    ? preChunk[randInt(255)]
    : sufChunk[randInt(255)]
  )


const lineage = root => ({
  galaxy: ship(root)(8),
  star: ship(root)(16),
  planet: ship(root)(32),
  // cannot go above 32 bits now
})


const ship = root => offset => {
  const parsed = stringBar(root)
  const binary = barString(fromLeft(parsed)(offset))
  const integer = compose(parseDec, binDec)(binary)
  // const prime = primes(integer)
  const splitTwo = chunk(parsed)(2).map(val => splitInt(val))
  const splitFour = chunk(parsed)(4).map(val => splitInt(val))
  const splitEight = chunk(parsed)(8).map(val => splitInt(val))
  return {
    binary,
    integer,
    // prime,
    splitTwo,
    splitFour,
    splitEight,
  }
}


const randomShipArray = length => bitLength =>
  sequence(length)
  .map(index => randomShipName(bitLength))


const callIfDef = (f, ...args) => def(f)
  ? f(... args)
  : null


export {
  randomBinaryOfLength,
  lineage,
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
  randomShipName,
  randomShipArray,
  join,
  split,
  def,
  callIfDef,
}
