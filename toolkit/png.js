const fs = require('fs');
const util = require('util');
const path = require('path');
const sharp = require('sharp');
const del = require('del');

const { removeContentSync } = require('./helpers')
const { PATHS, EXT } = require('./constants')

const INPUT_PATH = PATHS.svgSmall
const OUTPUT_PATH = PATHS.pngSmall

const SIZE = 64

// delete existing files
del.sync(OUTPUT_PATH)
fs.mkdirSync(OUTPUT_PATH);

const convertSvgFiles = (inputPath, outputPath, size) => {

  const promises = fs
    .readdirSync(INPUT_PATH)
    .filter(filename => path.extname(filename).toLowerCase() === EXT.svg)
    .map((f, idx) => {

      process.stdout.write(`${idx+1}`)
      process.stdout.write('\033[0G');

      const fileName = path.basename(f, EXT.svg);
      return sharp(INPUT_PATH + f)
        .resize(size)
        .png()
        .toFile(OUTPUT_PATH + fileName + EXT.png, err => {
          if (err) console.log(err)
        });
    })

  Promise.all(promises).then(() => {
    process.stdout.write('\033[0G');
  })
}


convertSvgFiles(INPUT_PATH, OUTPUT_PATH, SIZE)
