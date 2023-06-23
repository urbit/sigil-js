import * as fs from 'fs'
import * as path from 'path'

// Figma refuses to export a file named 'nul', because of filesystem constraints on Windows machines. This script shims this behavior.
const SVG_INPUT_PATH = __dirname + '/../assets/svg/';

const numComparator = (a:number, b:number) => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

const denul = () => {
  const chrono = fs
    .readdirSync(SVG_INPUT_PATH)
    .filter(f => path.extname(f).toLowerCase() === '.svg')
    .filter(f => f === 'nul.svg' || f === 'nul1.svg' || f === 'nul-1.svg')
    .map(f => ({
      f: f,
      t: fs.statSync(SVG_INPUT_PATH + '/' + f, ).birthtimeMs,
    }))
    .sort((a, b) => numComparator(a.t, b.t))

  const mostRecent = chrono[0]

  chrono
    .slice(1)
    .forEach(f => fs.unlinkSync(SVG_INPUT_PATH + f.f))


  fs.rename(
    SVG_INPUT_PATH + mostRecent.f,
    SVG_INPUT_PATH + 'nul.svg',
    function(err) {
      if ( err ) console.log('ERROR: ' + err);
    }
  );
}

export default denul
