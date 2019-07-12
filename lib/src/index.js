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



const grid = ( length, margin, size, strokeWidth ) => {

  const rm = margin

  // calculate symbols size based on margin.
  const symbolSize = size - (rm * 2) - (strokeWidth / 2);

  const ss = symbolSize / 2

  // put everything together into a profile object
  const p = {
    // number of symbols
    le: length,
    // how big is the background square in px?
    tw: size,
    // how big are the symbols in px?
    ss: ss,
    // real margin: how big is the margin in px?
    rm: rm,
    // real padding: how big is the space in between symbols?
    sw: strokeWidth,
  };

  let resultGrid = []

  if (length === 16) {

  }

  if (length === 8) {

  }

  if (length === 4) {
    resultGrid = [
      { x: d1(p), y: d1(p) },
      { x: d2(p), y: d1(p) },
      { x: d1(p), y: d2(p) },
      { x: d2(p), y: d2(p) },
    ]
  }

  if (length === 2) {
    resultGrid = [
      { x: d1(p), y: dc(p) },
      { x: d2(p), y: dc(p) },
    ]
  }

  if (length === 1) {
    resultGrid = [
      { x: dc(p), y: dc(p) },
    ]
  }

  return {
    ...p,
    scale: p.ss / UNIT,
    grid: resultGrid,
  };
};


// center a rectangle
const dc = p => p.tw - (p.ss * 1.5) - p.rm - (p.sw / 4);

// 2 dimensional offset for position 1
// 1.5 is used because stroke alignment = center
const d1 = p => p.rm - (p.sw / 4);

// 2 dimensional offset for position 2
// 1.5 is used because stroke alignment = center
const d2 = p => p.tw - p.ss - p.rm + (p.sw / 4);

//
const proportionFunction = t => t/256 + 0.33


// perform transformations
const transformations = (symbols, layout) => {
  return symbols.map((symbol, index) => {
    const { x, y } = layout.grid[index];

    let affineMatrix
    // If the symbols has no transformations, generate
    if (symbol.attributes === undefined) {
     affineMatrix = transform(
        translate(x, y),
        scale(layout.scale, layout.scale),
      );
      symbol.attributes = {}
    } else {
      let existingTransformation = symbol.attributes.transform === undefined
        ? identity()
        : fromString(symbol.attributes.transform)

      affineMatrix = transform(
        translate(x, y),
        scale(layout.scale, layout.scale),
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

  const attributes = params.attributes === undefined
    ? {}
    : params.attributes


  const margin = params.margin === undefined
    ? MARGIN_RATIO * params.size
    // 2 is added to offset center stroke alignment
    : params.margin + 2

  const strokeWidth = params.strokeWidth === undefined
    ? proportionFunction(params.size)
    : params.strokeWidth

  params.class = params.class === undefined
    ? ''
    : params.class

  // get phonemes as array from patp input
  let phonemes = params.patp.replace(/[\^~-]/g,'').match(/.{1,3}/g)

  if (params.iconMode === true) {
    phonemes = [phonemes[0]]
  }


  //
  // const pass = phonemes.filter(p => phonemes.includes(p) === false)

  // console.log(pass)

  // if (pass.length !== 0) throw new ConfigError(`patp is invalid`)

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

  // make a layout object for the transformations function
  const layout = grid(symbols.length, margin, params.size, strokeWidth)

  // apply the transformations
  const arranged = transformations(symbols, layout)

  // wrap symbols in SVG tag and add background rect
  const wrapped = {
    name: 'svg',
    attributes: {
      style: {
        width: `${params.size}px`,
        height: `${params.size}px`,
        // prevent bottom margin on svg tag
        display: 'block'
      },
      viewBox:`0 0 ${params.size} ${params.size}`,
      version:'1.1',
      xmlns:"http://www.w3.org/2000/svg",
      class: params.class,
      ...attributes,
    },
    children: [
      {
        name: 'rect',
        attributes: {
          fill: BG,
          width: `${params.size}px`,
          height: `${params.size}px`,
          x: 0,
          y: 0,
        },
        children: [],
      },
      ...arranged,
    ],
  }

  // apply color
  const resultAST = paint(wrapped, colors, strokeWidth)

  return params.renderer === undefined
    ? resultAST
    : params.renderer(resultAST)

}


export {
  sigil,
  stringRenderer,
  reactRenderer,
}
