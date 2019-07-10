import {
  scale,
  translate,
  transform,
  toSVG,
  // rotateDEG,
  fromString,
  identity
} from 'transformation-matrix';

import stringRenderer from 'stringRenderer'
import reactRenderer  from 'reactRenderer'

import index from './index.json'

const UNIT = 128
const UNIT_CENTER = UNIT / 2
const MARGIN_RATIO = 0.1
const FG = 1
const BG = 0

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
    node.attributes.strokeWidth = strokeWidth
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

  const layoutTypes = number => {

    switch(length) {
      case 4: return [
        { x: d1(p), y: d1(p) },
        { x: d2(p), y: d1(p) },
        { x: d1(p), y: d2(p) },
        { x: d2(p), y: d2(p) },
      ]
      case 2: return [
        { x: d1(p), y: dc(p) },
        { x: d2(p), y: dc(p) },
      ]
      default: return [
        { x: dc(p), y: dc(p) },
      ]
    }
  }

  return {
    ...p,
    scale: p.ss / UNIT,
    grid: layoutTypes(length),
  };
};


// center a rectangle
const dc = p => p.tw - (p.ss * 1.5) - p.rm;

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
    ? ['#fff', '#000']
    : params.colors


  const margin = params.margin === undefined
    ? MARGIN_RATIO * params.size
    // 2 is added to offset center stroke alignment
    : params.margin + 2

  const strokeWidth = params.iconMode === true
    ? 1
    : proportionFunction(params.size)

  // get phonemes as array from patp input
  const phonemes = params.patp.replace(/[\^~-]/g,'').match(/.{1,3}/g)

  // get symbols and clone them.
  const symbols = phonemes.map(phoneme => {
    return JSON.parse(JSON.stringify(index[phoneme]))
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
        // prevent bottom margin on svg tag
        display: 'block'
      },
      viewBox:`0 0 ${params.size} ${params.size}`,
      width: `${params.size}px`,
      height: `${params.size}px`,
      xmlns:"http://www.w3.org/2000/svg",
      className: params.className,
    },
    children: [
      {
        name: 'rect',
        attributes: {
          // 'shape-rendering':'crispEdges',
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
  const withColor = paint(wrapped, colors, strokeWidth)

  return params.renderer(withColor)

}


export {
  sigil,
  stringRenderer,
  reactRenderer,
}
