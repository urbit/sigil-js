import {
  scale,
  translate,
  transform,
  toSVG,
  // rotateDEG,
  fromString,
  identity
} from 'transformation-matrix';

import stringRenderer from './stringRenderer'
import reactRenderer from './reactRenderer'

import index from './index.json'

const UNIT = 128
const UNIT_CENTER = UNIT / 2
const MARGIN_RATIO = 0.1
const FG = 1
const BG = 0

class ConfigError extends Error {}


// apply color preference
const paint = (node, colors, strokeWidth) => {

  if (
    node.attributes.fill !== undefined
    && node.attributes.fill !== 'none'
  ) {
    node.attributes.fill = colors[node.attributes.fill]
  }

  if (
    node.attributes.stroke !== undefined
    && node.attributes.stroke !== 'none'
  ) {
    node.attributes.stroke = colors[node.attributes.stroke]
    node.attributes['stroke-width'] = strokeWidth + 'px'
    node.attributes['stroke-linecap'] = 'square'
  }

  return {
    name: node.name,
    attributes: node.attributes,
    children: node.children.map(n => paint(n, colors, strokeWidth))
  }
}


// perform transformations
const transformations = (symbols, grid, scaleFactor) => {
  return symbols.map((symbol, i) => {
    const x = grid[i][0]
    const y = grid[i][1]

    let affineMatrix
    // If the symbols has no transformations, generate affine matrix
    if (symbol.attributes === undefined) {
     affineMatrix = transform(
        translate(x, y),
        scale(scaleFactor, scaleFactor),
      );
      symbol.attributes = {}
    } else {
      let existingTransformation = symbol.attributes.transform === undefined
        ? identity()
        : fromString(symbol.attributes.transform)

      affineMatrix = transform(
        translate(x, y),
        scale(scaleFactor, scaleFactor),
        existingTransformation
      );
    }

    symbol.attributes.transform = toSVG(affineMatrix)
    return symbol
  })
}


//==============================================================================
// Main function
//
const sigil = params => {

  // Set default values from config
  const colors = params.colors === undefined
    ? ['#000', '#fff']
    : params.colors

  params.attributes = params.attributes === undefined
    ? {}
    : params.attributes
  //
  // params.background = params.background === undefined
  //   ? true
  //   : params.background

  params.full = params.full === undefined
    ? false
    : params.full

  params.style = params.style === undefined
    ? {}
    : params.style

  params.class = params.class === undefined
    ? ''
    : params.class

  params.size = params.size === undefined
    ? params.height
    : params.size

  params.width = params.width === undefined
    ? params.size
    : params.width

  params.height = params.height === undefined
    ? params.size
    : params.height

  const sw = ((params.size / 128) + 0.33)

  // get phonemes as array from patp input
  let phonemes = params.patp.replace(/[\^~-]/g,'').match(/.{1,3}/g)

  if (params.iconMode === true) {
    phonemes = [phonemes[0]]
  }


  if (phonemes.length !== 1 && phonemes.length !== 2 && phonemes.length !== 4) {
    throw new ConfigError(`sigil.js cannot render @p of length ${phonemes.length}. Only lengths of 1 (galaxy), 2 (star), and 4 (planet) are supported at this time.`)
  }


  // get symbols and clone them.
  const symbols = phonemes.map(phoneme => {
    const ast = index[phoneme]
    if (ast !== undefined) {
      return JSON.parse(JSON.stringify(ast))
    } else {
      throw new ConfigError(`@p is invalid. Recieved '${params.patp}'`)
    }
  })


  const ss = params.size
  const ma = params.margin = params.margin === undefined
      ? MARGIN_RATIO * ss
      : params.margin

  const sz = (ss - (ma*2) - sw) / 2

  const grids = {
    '4':[
      [ma, ma], // 1st Quartile
      [ma + sz + sw, ma], // 2nd Quartile
      [ma, ma + sz + sw], // 3rd Quartile
      [ma + sz + sw, ma + sz + sw] // 4th Quartile
    ],
    '2':[
      [ma, ss - (ss/2) - (sz/2)], // Left half
      [ma + sz + sw, ss - (ss/2) - (sz/2)], // Right half
    ],
    '2-f':[
      [ma, ma], // [x,y] Left half
      [ma + (sz*2) + sw, ma], // [x,y] Right half
    ],
    '1':[
      [ss - (ss/2) - (sz/2), ss - (ss/2) - (sz/2)]
    ],
    '1-f':[
      [ma, ma]
    ],
  }

  const gridKey = params.full === true ?
    `${symbols.length}-f`
    : symbols.length

  const grid = grids[gridKey]

  const scaleFactor = params.full === true
    ? (sz / UNIT) * 2
    : (sz / UNIT)

  // apply the transformations
  const arranged = transformations(symbols, grid, scaleFactor)


  if (params.style.width === undefined) {
    params.style.width = `${params.width}px`
  }

  if (params.style.height === undefined) {
    params.style.height = `${params.height}px`
  }

  // wrap symbols in SVG tag and add background rect. Also merge in values from the params including class and attributes.

  // const children = params.background === true
  //   ? [
  //       {
  //       name: 'rect',
  //       attributes: {
  //         fill: BG,
  //         width: `${params.width}px`,
  //         height: `${params.height}px`,
  //         x: 0,
  //         y: 0,
  //       },
  //       children: [],
  //     },
  //     ...arranged,
  //   ]
  // : arranged

  const wrapped = {
    name: 'svg',
    attributes: {
      style: {
        // prevent bottom margin on svg tag
        display: 'block',
        ...params.style
      },
      viewBox: `0 0 ${params.width} ${params.height}`,
      version: '1.1',
      xmlns: "http://www.w3.org/2000/svg",
      class: params.class,
      ...params.attributes,
    },
    children: [
      {
      name: 'rect',
      attributes: {
        fill: BG,
        width: `${params.width}px`,
        height: `${params.height}px`,
        x: 0,
        y: 0,
      },
      children: [],
    },
    ...arranged,
    ]
  }


  // apply color
  const resultAST = paint(wrapped, colors, sw / scaleFactor)

  return params.renderer === undefined
    ? resultAST
    : params.renderer(resultAST)
}


export {
  sigil,
  stringRenderer,
  reactRenderer,
}
