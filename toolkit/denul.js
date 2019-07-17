const fs = require('fs');
const path = require('path');
const { PATHS, EXT } = require('./constants')
const INPUT_PATH = PATHS.svg

// Figma refuses to export a file named 'nul', because of filesystem constraints on Windows machines. This script shims this behavior.

const numComparator = (a, b) => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

const chrono = fs
  .readdirSync(INPUT_PATH)
  .filter(f => path.extname(f).toLowerCase() === EXT.svg)
  .filter(f => f === 'nul.svg' || f === 'nul1.svg' || f === 'nul-1.svg')
  .map(f => ({
    f: f,
    t: fs.statSync(INPUT_PATH + '/' + f, ).birthtimeMs,
  }))
  .sort((a, b) => numComparator(a.t, b.t))

const mostRecent = chrono[0]

const garbage = chrono
  .slice(1)
  .forEach(f => fs.unlinkSync(INPUT_PATH + f.f))


fs.rename(
  INPUT_PATH + mostRecent.f,
  INPUT_PATH + 'nul.svg',
  function(err) {
    if ( err ) console.log('ERROR: ' + err);
  }
);
