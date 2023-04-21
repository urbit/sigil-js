import invariant from 'invariant';
import {Config, SymbolIndex} from './types';
import DEFAULT_INDEX from './symbols/default'
import ICON_INDEX from './symbols/icon' 

// Splits a string into equal-sized substrings and returns an array of these substrings.
const chunkStr = (str: string, size: number):string[] => {
  const regex = new RegExp(`.{1,${size}}`, 'g')
  const result = str.match(regex)
  
  if (result === null) {
    return ['']
  }

  return result
}

export default function sigil({
  point,
  background = '#000',
  foreground = '#FFF',
  size = 128,
  space = 'default',
  detail = 'default',
}: Config) {

  // Point must be defined, otherwise there is nothing to do.

  invariant(
    point !== undefined,
    "@tlon/sigil-js must be given a point name as input."
  )

  // The 'none' mode visually removes all superimposed linework on top of the core shapes of the sigil. It is implemented as a separate index.

  let symbolsIndex:SymbolIndex
  if (detail === 'none') {
    symbolsIndex = ICON_INDEX
  } else {
    symbolsIndex = DEFAULT_INDEX
  }

  // Get phonemes as array from patp input and split into array

  let phonemes = chunkStr(point.replace(/[\^~-]/g, ''), 3)

  // Point name must be valid in several ways. 1) must be a valid @p data type. 2) Must be a planet, star or galaxy.

  invariant(
    Array.isArray(phonemes) || phonemes !== null,
    `@urbit/sigil-js recieved an invalid point name and cannot render a sigil. Recieved '${point}'.`
  )

  invariant(
    phonemes.length === 1 || phonemes.length === 2 || phonemes.length === 4,
    `@tlon/sigil-js cannot render point name of length '${phonemes.length}'.  Recieved "${point}". Only lengths of 1 (galaxy), 2 (star), and 4 (planet) are supported at this time.`
  )

  // Symbols are stored in the index js files as svg strings indexed by phoneme. They need to be retrieved from the index with a little bit of string processing to fill in the templated parts of the SVG, ie color.

  const innerSVG = phonemes.reduce((acc, phoneme, index) => {

    invariant(
      typeof symbolsIndex[phoneme] !== 'undefined',
      `@tlon/sigil-js requires a valid point name. '${phoneme}' is not a valid point name phoneme.`
    )

    const SVGSubstring = symbolsIndex[phoneme] as string

    // Symbols don't know where they should be on the canvas out of the index.

    const scale = (size / 256)
    const symbolTransformation = index === 0
      ? `scale(${scale}) translate(0,0) `
      : index === 1
      ? `scale(${scale}) translate(128,0)`
      : index === 2
      ? `scale(${scale}) translate(0,128)`
      : `scale(${scale}) translate(128,128)`
    
    // Path stroke-widths should never be less than 1px wide
    const strokeWidth = size < 64
      ? (256 / size).toString()
      : '4'

    // Symbols also don't know what color they should be. Variables in symbols are denoted with an '@'. 
    // @GF = foreground color, @BG = background color, @TR = transformation applied to each symbol and @SW = stroke-width
  
    let newSVGSubstring = SVGSubstring
      .replaceAll('@FG', foreground)
      .replaceAll('@BG', background)
      .replaceAll('@TR', symbolTransformation)
      .replaceAll('@SW', strokeWidth)

    acc = acc + newSVGSubstring
    return acc
  }, '');

  // 'Space' is a number in pixels which determines the interior space between the symbols and the background border.
  // Space adjusts `scale`, which makes the existing symbols smaller. It also needs to adjust `translate` because the symbols will need to be recentered.
  // The symbols are wrapped in a group so they can be moved around instead of adjusted individually.

  const width = size

  // If the sigil is for a star, and space is set to 'none', change the height so a rectangle is returned.

  const height = space === 'none' && phonemes.length === 2
    ? size / 2
    : size

  const groupTransformation = function f() {
    if (space === 'none') {
      return phonemes.length === 1
        ? `scale(2)`
        : phonemes.length === 2
        ? ``
        : ``
    } else if (space === 'large') {
      return phonemes.length === 1
        ? `translate(${(size*0.5) - (size*0.125)},${(size*0.5) - (size*0.125)}) scale(0.50)`
        : phonemes.length === 2
        ? `translate(${(size*0.5) - (size*0.25)},${(size*0.5) - (size*0.125)}) scale(0.50)`
        : `translate(${(size*0.5) - (size*0.25)},${(size*0.5) - (size*0.25)}) scale(0.50)`
    } else {
      return phonemes.length === 1
        ? `translate(${(size*0.5) - (size*0.1875)},${(size*0.5) - (size*0.1875)}) scale(0.75)`
        : phonemes.length === 2
        ? `translate(${(size*0.5) - (size*0.3750)},${(size*0.5) - (size*0.1875)}) scale(0.75)`
        : `translate(${(size*0.5) - (size*0.3750)},${(size*0.5) - (size*0.3750)}) scale(0.75)`
    }
  }()

  // Merge arguments, computed property values and inner SVG substring and return.

  return `
    <svg
      style="display: block;"
      width="${width}"
      height="${height}"
      viewbox="0 0 ${width} ${height}"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="${background}" width="${width}" height="${height}" x="0" y="0" />
      <g transform="${groupTransformation}">
        ${innerSVG}
      </g>
    </svg>
  `
}
