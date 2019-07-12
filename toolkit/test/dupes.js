const fs = require('fs');
const util = require('util');
const path = require('path');
const sharp = require('sharp');
const PNG = require('pngjs').PNG
const pixelmatch = require('pixelmatch')
const { removeContentSync } = require('../helpers')
const { PATHS, EXT } = require('../constants')

const INPUT_PATH = PATHS.pngSmall
const OUTPUT_PATH = PATHS.diff
const MAX_SCORE = 4
const SIZE = 64

removeContentSync(OUTPUT_PATH)

const pngs = fs
  .readdirSync(INPUT_PATH)
  .filter(f => path.extname(f).toLowerCase() === EXT.png)

var cache = []
var diff = new PNG({ width: SIZE, height: SIZE });
var aData = null
var bData = null
var a = null
var b = null
var aName = null
var bName = null
var timeA = null
var timeB = null
var numDiffPixels = null

for (var i=0, n=pngs.length; i < n; ++i ) {
// pngs.forEach((a, idx) => {
  a = pngs[i]
  aName = path.basename(a, EXT.png);
  aData = PNG.sync.read(fs.readFileSync(INPUT_PATH + a));

  for (var j=0, m=pngs.length; j < m; ++j ) {
    b = pngs[j]
    bName = path.basename(b, EXT.png);

  // pngs.forEach(b => {
    if (cache.includes(`${bName}:${aName}`) === false && a !== b) {

      process.stdout.write('\033[0G');
      process.stdout.write(`${i+1}:${j+1}`)

      bData = PNG.sync.read(fs.readFileSync(INPUT_PATH + b));

      numDiffPixels = pixelmatch(
        aData.data,
        bData.data,
        diff.data,
        SIZE,
        SIZE,
        { threshold: 0.1 }
      );

      if (numDiffPixels < MAX_SCORE) {
        process.stdout.write('\033[0G');
        process.stdout.write(`O`)
        fs.writeFileSync(
          `${OUTPUT_PATH}${numDiffPixels}:${aName}:${bName}.png`,
          PNG.sync.write(diff)
        );
      }

      cache.push(`${aName}:${bName}`)

    } else {
      process.stdout.write('\033[0G');
      process.stdout.write(`N`)
    }
  }

}
