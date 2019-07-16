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

del.sync([PATHS.pngComp + '/*.png', `!${PATHS.pngComp}`]);
del.sync([PATHS.comp + '/*.png', `!${PATHS.comp}`]);

let json = {

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
      .toFile(PATHS.pngComp + p + '-old' + EXT.png)
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
    process.stdout.write(`${p}: new`)
    process.stdout.write('\033[0G');
    return sharp(Buffer.from(s))
      .resize(SIZE)
      .png()
      .toFile(PATHS.pngComp + p + '-new' + EXT.png)
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
  // var out = new PNG({ width: SIZE*3, height: SIZE });
  var numDiffPixels = null

  process.stdout.write(`resolving...`)
  process.stdout.write('\033[0G');

  Promise.all([...oldPromises, ...newPromises])
  .then(() => {
    // filenames should be the same between old and new
    const compositePromises = fs
      .readdirSync(PATHS.svg)
      .filter(f => path.extname(f).toLowerCase() === EXT.svg)
      .map(f => path.basename(f, EXT.svg))
      .map(ph => {
      // png = filenames[i]
      n = PATHS.pngComp + ph + '-new' + EXT.png
      o = PATHS.pngComp + ph + '-old' + EXT.png

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

      json[ph] = {
        phoneme: ph,
        diffPx: numDiffPixels,
      }

      csv = `${csv}\n${ph},${numDiffPixels}`






      fs.writeFileSync(
        `${PATHS.comp}${numDiffPixels}-${ph}-diff${EXT.png}`,
        PNG.sync.write(diff)
      );

      fs.writeFileSync(
        `${PATHS.pngComp}${ph}-diff${EXT.png}`,
        PNG.sync.write(diff)
      );

      return sharp({
          create: {
            width: SIZE*3,
            height: SIZE,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 1 }
          }
        })
        .composite([
          { input: `${PATHS.pngComp}${ph}-old${EXT.png}`, gravity: 'northeast' },
          { input: `${PATHS.pngComp}${ph}-new${EXT.png}`, gravity: 'centre' },
          { input: `${PATHS.pngComp}${ph}-diff${EXT.png}`, gravity: 'northwest' },
        ])
        // .png()
        .toFile(PATHS.allComp + ph + '-all' + EXT.png)

    })

    Promise.all(compositePromises).then(() => {}).catch(e => console.log(e))

    fs.writeFileSync(`${PATHS.logs}log.csv`, csv)
    fs.writeFileSync(`${PATHS.logs}log.json`, JSON.stringify(json))

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
