import {
  lineage,
  flatten,
  sequence,
  map,
  chunk,
  join,
  match,
  replace,
  randInt,
} from './lib'

const pre = `
dozmarbinwansamlitsighidfidlissogdirwacsabwissib\
rigsoldopmodfoglidhopdardorlorhodfolrintogsilmir\
holpaslacrovlivdalsatlibtabhanticpidtorbolfosdot\
losdilforpilramtirwintadbicdifrocwidbisdasmidlop\
rilnardapmolsanlocnovsitnidtipsicropwitnatpanmin\
ritpodmottamtolsavposnapnopsomfinfonbanmorworsip\
ronnorbotwicsocwatdolmagpicdavbidbaltimtasmallig\
sivtagpadsaldivdactansidfabtarmonranniswolmispal\
lasdismaprabtobrollatlonnodnavfignomnibpagsopral\
bilhaddocridmocpacravripfaltodtiltinhapmicfanpat\
taclabmogsimsonpinlomrictapfirhasbosbatpochactid\
havsaplindibhosdabbitbarracparloddosbortochilmac\
tomdigfilfasmithobharmighinradmashalraglagfadtop\
mophabnilnosmilfopfamdatnoldinhatnacrisfotribhoc\
nimlarfitwalrapsarnalmoslandondanladdovrivbacpol\
laptalpitnambonrostonfodponsovnocsorlavmatmipfip\
`

const suf = `
zodnecbudwessevpersutletfulpensytdurwepserwylsun\
rypsyxdyrnuphebpeglupdepdysputlughecryttyvsydnex\
lunmeplutseppesdelsulpedtemledtulmetwenbynhexfeb\
pyldulhetmevruttylwydtepbesdexsefwycburderneppur\
rysrebdennutsubpetrulsynregtydsupsemwynrecmegnet\
secmulnymtevwebsummutnyxrextebfushepbenmuswyxsym\
selrucdecwexsyrwetdylmynmesdetbetbeltuxtugmyrpel\
syptermebsetdutdegtexsurfeltudnuxruxrenwytnubmed\
lytdusnebrumtynseglyxpunresredfunrevrefmectedrus\
bexlebduxrynnumpyxrygryxfeptyrtustyclegnemfermer\
tenlusnussyltecmexpubrymtucfyllepdebbermughuttun\
bylsudpemdevlurdefbusbeprunmelpexdytbyttyplevmyl\
wedducfurfexnulluclennerlexrupnedlecrydlydfenwel\
nydhusrelrudneshesfetdesretdunlernyrsebhulryllud\
remlysfynwerrycsugnysnyllyndyndemluxfedsedbecmun\
lyrtesmudnytbyrsenwegfyrmurtelreptegpecnelnevfes\
`

// parse suffixes and prefixes into strings of length 3
const suffixes = match(suf)(/.{1,3}/g)
const prefixes = match(pre)(/.{1,3}/g)

const randomShipName = bitLength => {
  return sequence(bitLength / 8).map(index => index % 2 === 0
    ? suffixes[randInt(255)]
    : prefixes[randInt(255)])
}

const printShip = ship => `~${ship[0]}${ship[1]}-${ship[2]}${ship[3]}`

const randomShipArray = length => bitLength => {
  return sequence(length).map(index => randomShipName(bitLength))
}


  // generates a random ship name
  // const randomShipName = bitLength =>
  //   sequence(bitLength / 8).map(index => index % 2 === 0
  //     ? preChunk[randInt(255)]
  //     : sufChunk[randInt(255)]
  //   )
  //
  //
  // const lineage = root => ({
  //   galaxy: ship(root)(8),
  //   star: ship(root)(16),
  //   planet: ship(root)(32),
  //   // cannot go above 32 bits now
  // })


  // const ship = root => offset => {
  //   const parsed = stringBar(root)
  //   const binary = barString(fromLeft(parsed)(offset))
  //   const integer = compose(parseDec, binDec)(binary)
  //   // const prime = primes(integer)
  //   const splitTwo = chunk(parsed)(2).map(val => splitInt(val))
  //   const splitFour = chunk(parsed)(4).map(val => splitInt(val))
  //   const splitEight = chunk(parsed)(8).map(val => splitInt(val))
  //   return {
  //     binary,
  //     integer,
  //     // prime,
  //     splitTwo,
  //     splitFour,
  //     splitEight,
  //   }
  // }

export {
  suffixes,
  prefixes,
  randomShipName,
  printShip,
  randomShipArray,
}
