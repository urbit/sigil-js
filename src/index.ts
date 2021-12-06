import invariant from 'invariant';

import {Config, SymbolIndex} from '../types';
import DEFAULT_INDEX from './symbols/default'
import ICON_INDEX from './symbols/icon' 


/* TODO
- Try non-scaling-stroke
- Should icon mode override stroke-width for pixel-perfect symnbol borders?
- 
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
  space = 'default',
  detail = 'default',
}: Config) => {

  invariant(
    point !== undefined,
    "@tlon/sigil-js must be given a point name as input."
  )

  let symbolsIndex:SymbolIndex
  if (detail === 'icon') {
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

  const innerSVG = phonemes.reduce((acc, phoneme, index) => {

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

    // Symbols don't know where they should be on the canvas out of the index.

    const symbolTransformation = index === 0
      ? `scale(${scale}) translate(0,0) `
      : index === 1
      ? `scale(${scale}) translate(128,0)`
      : index === 2
      ? `scale(${scale}) translate(0,128)`
      : `scale(${scale}) translate(128,128)`

    // Symbols also don't know what color they should be. Variables in symbols are denoted with an '@'. 
    // @GF = foreground color, @BG = background color, @TR = transformation applied to each symbol and @SW = stroke-width

    let newSVGSubstring = SVGSubstring
      .replaceAll('@FG', foreground)
      .replaceAll('@BG', background)
      .replaceAll('@TR', symbolTransformation)
      .replaceAll('@SW', '4')

    acc = acc + newSVGSubstring
    return acc
  }, '');

  // 'Space' is a number in pixels which determines the interior space between the symbols and the background border.
  // Space adjusts `scale`, which makes the existing symbols smaller. It also needs to adjust `translate` because the symbols will need to be recentered.
  // The symbols are wrapped in a group so they can be moved around instead of adjusted individually.
  const groupTransformation = function f() {
    if (space === 'none') {
      return phonemes.length === 1
        ? `scale(1) translate(32,32)`
        : phonemes.length === 2
        ? `scale(1) translate(0,32)`
        : `scale(1) translate(0,0)`
    } else if (space === 'large') {
      return phonemes.length === 1
        ? `scale(0.50) translate(96, 96)`
        : phonemes.length === 2
        ? `scale(0.50) translate(64,96)`
        : `scale(0.50) translate(64,64)`
    } else {
      return phonemes.length === 1
        ? `scale(0.75) translate(56, 56)`
        : phonemes.length === 2
        ? `scale(0.75) translate(20,56)`
        : `scale(0.75) translate(20,20)`
    }
  }();

  const resultSVG = `
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
      <g transform="${groupTransformation}">
        ${innerSVG}
      </g>
    </svg>
  `

  return resultSVG
};

export default sigil;
