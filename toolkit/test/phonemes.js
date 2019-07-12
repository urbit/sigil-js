const fs = require('fs');
const { PATHS, EXT } = require('../constants')

const INPUT_PATH = PATHS.lib

const _prefixes = `
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

const _suffixes = `
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

const suffixes = _suffixes.match(/.{1,3}/g);
const prefixes = _prefixes.match(/.{1,3}/g);
const all = [...suffixes, ...prefixes];



const index = fs
  .readFileSync(INPUT_PATH + 'index.json', 'utf8')

const json = JSON.parse(index)

const keys = Object.keys(json)


const missingSuffixes = suffixes.reduce((acc, phoneme) => {
  if (keys.includes(phoneme) === true) {
  } else {
    acc = acc.concat(phoneme)
  }
  return acc
}, [])

const missingPrefixes = prefixes.reduce((acc, phoneme) => {
  if (keys.includes(phoneme) === true) {
  } else {
    acc = acc.concat(phoneme)
  }
  return acc
}, [])

const non = keys.reduce((acc, key) => {
  if (all.includes(key) === true) {
  } else {
    acc = acc.concat(key)
  }
  return acc
}, [])


const results = {
  phonemeCount: `${keys.length} / 512`,
  missingSuffixes: `${missingSuffixes.length}, ${missingSuffixes.toString(', ')}`,
  missingPrefixes: `${missingPrefixes.length}, ${missingPrefixes.toString(', ')}`,
  invalidStrings: `${non.length}, ${non.toString(', ')}`
}

console.table(results)
