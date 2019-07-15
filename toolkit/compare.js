const fs = require('fs');
const util = require('util');
const path = require('path');
const sharp = require('sharp');
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch')
const del = require('del')

const { PATHS, EXT } = require('./constants')
const { pour, PlainSVGStringRenderer } = require('./legacy/pour')
const { sigil, stringRenderer } = require('../lib/dist/index')

const MIN_SCORE = 0
const SIZE = 400
// const INPUT_PATH_OLD = PATH.
// const INPUT_PATH_NEW =

const pngOld = __dirname + '/../bin/pngOld/'
const pngNew = __dirname + '/../bin/pngNew/'
const comp = __dirname + '/../bin/comp/'

del.sync([PATHS.pngOld + '/*.png', `!${PATHS.pngOld}`]);
del.sync([PATHS.pngNew + '/*.png', `!${PATHS.pngNew}`]);
del.sync([PATHS.comp + '/*.png', `!${PATHS.comp}`]);

let log = {

}

let csv = ''


const oldPromises = fs
  .readdirSync(PATHS.svg)
  .filter(filename => path.extname(filename).toLowerCase() === EXT.svg)
  .map(f => path.basename(f, EXT.svg))
  .map(p => ({
    s: pour({
      patp: p,
      renderer: PlainSVGStringRenderer,
      colorway: ['white', 'black'],
      size: SIZE,
    }),
    p: p,
  }))
  .map(({ s, p }, idx) => {
    process.stdout.write(`${p}: new`)
    process.stdout.write('\033[0G');
    return sharp(Buffer.from(s))
      .resize(SIZE)
      .png()
      .toFile(PATHS.pngOld + p + EXT.png)
      // .then(info => { console.log(info) })
      // .catch(err => { console.error(err) });
  })

// Generate PNGs with new lib
const newPromises = fs
  .readdirSync(PATHS.svg)
  .filter(filename => path.extname(filename).toLowerCase() === EXT.svg)
  .map(f => path.basename(f, EXT.svg))
  .map(p => ({
    s: sigil({
      patp: p,
      renderer: stringRenderer,
      color: ['white', 'black'],
      size: SIZE,
      margin: 29.5,
      strokeWidth: 2,
    }),
    p: p,
  }))
  .map(({ s, p }, idx) => {
    console.log(s)
    process.stdout.write(`${p}: new`)
    process.stdout.write('\033[0G');
    return sharp(Buffer.from(s))
      .resize(SIZE)
      .png()
      .toFile(PATHS.pngNew + p + EXT.png)
      // .then(info => { console.log(info) })
      // .catch(err => { console.error(err) });
  })

  var png = null
  var a = null
  var n = null
  var o = null
  var nData = null
  var oData = null
  var diff = new PNG({ width: SIZE, height: SIZE });
  var numDiffPixels = null

  process.stdout.write(`resolving...`)
  process.stdout.write('\033[0G');

  Promise.all([...oldPromises, ...newPromises])
  .then(() => {
    // filenames should be the same between old and new
    const filenames = fs
      .readdirSync(PATHS.svg)
      .filter(f => path.extname(f).toLowerCase() === EXT.svg)
      .map(f => path.basename(f, EXT.svg))
      .forEach(ph => {
      // png = filenames[i]
      n = PATHS.pngNew + ph + EXT.png
      o = PATHS.pngOld + ph + EXT.png

      process.stdout.write(`${ph}: compare`)
      process.stdout.write('\033[0G');

      nData = PNG.sync.read(fs.readFileSync(n));
      oData = PNG.sync.read(fs.readFileSync(o));

      numDiffPixels = pixelmatch(
        nData.data,
        oData.data,
        diff.data,
        SIZE,
        SIZE,
        { threshold: 0.1, includeAA: true }
      );

      log[ph] = {

      }

      csv = `${csv}\n${ph},${numDiffPixels}`


      fs.writeFileSync(
        `${PATHS.comp}${ph}:${numDiffPixels}${EXT.png}`,
        PNG.sync.write(diff)
      );

    })

    fs.writeFileSync(`${PATHS.logs}log.csv`, csv)

  })
  .catch(e => console.log(e))



// create and save svgs
// create and save pngs
// pngs
// pngsOld

// for each png in pngs, get the other png from pngsOld
  // then, compare each png with the other png
  // if the diff value is above threshold,
    // save the diff
    // append an item to a CSV log: phoneme, oldPng, newPng, diffpng, diff value
