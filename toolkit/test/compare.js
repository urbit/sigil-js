const fs = require('fs');
const util = require('util');
const path = require('path');
const sharp = require('sharp');
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch')

const { removeContentSync } = require('../helpers')
const { PATHS, EXT } = require('../constants')
const { pour, PlainSVGStringRenderer } = require('../legacy/pour')
const { sigil, stringRenderer } = require('../../lib/dist/index')

const MIN_SCORE = 500
const SIZE = 400
// const INPUT_PATH_OLD = PATH.
// const INPUT_PATH_NEW =
removeContentSync(PATHS.pngOld)
removeContentSync(PATHS.pngNew)
// Generate PNGs from old lib
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
    process.stdout.write(`${idx+1}`)
    process.stdout.write('\033[0G');
    return sharp(Buffer.from(s))
      .resize(SIZE)
      .png()
      .toFile(PATHS.pngOld + p + EXT.png, err => {
        if (err) console.log(err)
      });
  })

  Promise.all(oldPromises).then(() => {
    process.stdout.write('\033[0G');
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
    }),
    p: p,
  }))
  .map(({ s, p }, idx) => {
    process.stdout.write(`${idx+1}`)
    process.stdout.write('\033[0G');
    return sharp(Buffer.from(s))
      .resize(SIZE)
      .png()
      .toFile(PATHS.pngNew + p + EXT.png, err => {
        if (err) console.log(err)
      });
  })

  Promise.all(newPromises).then(() => {
    process.stdout.write('\033[0G');
  })

// filenames should be the same between old and new
const filenames = fs
  .readdirSync(PATHS.png)
  .filter(filename => path.extname(filename).toLowerCase() === EXT.png)


var png = null
var a = null
var n = null
var o = null
var nData = null
var oData = null
var diff = new PNG({ width: SIZE, height: SIZE });
var numDiffPixels = null

filenames.forEach(png => {
  // png = filenames[i]
  n = PATHS.pngNew + png
  o = PATHS.pngOld + png
  nData = PNG.sync.read(fs.readFileSync(n));
  oData = PNG.sync.read(fs.readFileSync(o));

  numDiffPixels = pixelmatch(
    nData.data,
    oData.data,
    diff.data,
    SIZE,
    SIZE,
    { threshold: 0.1 }
  );

  console.log(numDiffPixels)

  if (numDiffPixels > MIN_SCORE) {
    fs.writeFileSync(
      `${PATHS.comp}${png}:${numDiffPixels}`,
      PNG.sync.write(diff)
    );
  }


})

// create and save svgs
// create and save pngs
// pngs
// pngsOld

// for each png in pngs, get the other png from pngsOld
  // then, compare each png with the other png
  // if the diff value is above threshold,
    // save the diff
    // append an item to a CSV log: phoneme, oldPng, newPng, diffpng, diff value
