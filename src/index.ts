import invariant from 'invariant';

import {Config, SymbolIndex} from '../types';
import DEFAULT_INDEX from './symbols/default'
import ICON_INDEX from './symbols/icon' 


/* TODO
- Make galaxies and stars have correct symbol transformations
- Try non-scaling-stroke
- Should icon mode override stroke-width for pixel-perfect symnbol borders?
*/

const chunkStr = (str: string, size: number):string[] => {
  const regex = new RegExp(`.{1,${size}}`, 'g')
  const result = str.match(regex)
  
  if (result === null) {
    return ['']
  }

  return result
}

const sigil = ({
  point,
  background = '#000',
  foreground = '#FFF',
  size = 128,
  style = '',
  className = '',
  mode,
}: Config) => {

  invariant(
    point !== undefined,
    "@tlon/sigil-js must be given a point name as input."
  )

  let symbolsIndex:SymbolIndex
  if (mode === 'icon') {
    symbolsIndex = ICON_INDEX
  } else {
    symbolsIndex = DEFAULT_INDEX
  }

  // get phonemes as array from patp input and split into array
  let phonemes = chunkStr(point.replace(/[\^~-]/g, ''), 3)

  invariant(
    Array.isArray(phonemes) || phonemes !== null, 
    `@tlon/sigil-js recieved an invalid point name and cannot render a sigil. Recieved '${point}'.`
  )

  invariant(
    phonemes.length === 1 || phonemes.length === 2 || phonemes.length === 4,
    `@tlon/sigil-js cannot render point name of length '${phonemes.length}'.  Recieved "${point}". Only lengths of 1 (galaxy), 2 (star), and 4 (planet) are supported at this time.`
  )

  let innerSVG = phonemes.reduce((acc, phoneme, index) => {

    invariant(
      typeof symbolsIndex[phoneme] !== 'undefined',
      `@tlon/sigil-js requires a valid point name. '${phoneme}' is not a valid point name phoneme.`
    )

    const SVGSubstring = symbolsIndex[phoneme] as string

    // if (typeof SVGSubstring === 'undefined') {
    //   return `
    //     <svg
    //       class="${className}"
    //       style="display: block; ${style}"
    //       viewbox="0 0 128 128"
    //       version="1.1"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //     <rect fill="${background}" width="128" height="128" x="0" y="0" />
    //     <!-- tlon/sigil-js requires a valid point name. "${phoneme}" is not a valid point name phoneme. -->
    //     </svg>
    //   `
    // }

    const scale = (size / 256)

    const transformation = index === 0
      ? `scale(${scale}) translate(0,0) `
      : index === 1
      ? `scale(${scale}) translate(128,0)`
      : index === 2
      ? `scale(${scale}) translate(0,128)`
      : `scale(${scale}) translate(128,128)`


    let newSVGSubstring = SVGSubstring
      .replaceAll('@FG', foreground)
      .replaceAll('@BG', background)
      .replaceAll('@TR', transformation)
      .replaceAll('@SW', '4')

    acc = acc + newSVGSubstring
    return acc
  }, '');

  let resultSVG = `
    <svg
      class="${className}"
      style="display: block; ${style}"
      width="${size}"
      height="${size}"
      viewbox="0 0 ${size} ${size}"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
    <rect fill="${background}" width="${size}" height="${size}" x="0" y="0" />
    ${innerSVG}
    </svg>
  `

  return resultSVG
};

export default sigil;
