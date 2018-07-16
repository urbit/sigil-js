import {
  set,
  map,
  isString,
  get,
  isUndefined,
  last,
  has,
} from 'lodash'

// import { toAddress } from 'urbit-ob'

import { scale, translate, transform, toSVG } from 'transformation-matrix'
// import chroma from 'chroma-js'

import {
  quickHash,
  randomShip,
  patpArrToStr,
  patpStrToArr,
  isEven,
  deepClone,
} from '../lib/lib'

import { len, lat, sq } from '../lib/lib.array'

const dye = (model, addr) => {
  const swatches = ['white', '#4330FC', 'purple']
  return dip(model, swatches)
}

const applyColor = (p, swatches) => {
  switch(p) {
    case 'FG': return swatches[0]
    case 'BG': return swatches[1]
    default: return last(swatches)
  }
}

const applyFillOpacity = p => {
  switch(p) {
    case 'FG': return 1
    case 'BG': return 1
    default: return 0
  }
}

const applyStrokeWidth = p => {
  switch(p) {
    case 'FG': return 1
    case 'BG': return 1
    default: return 0
  }
}

const stir = (attr, style, swatches) => {
  const { fill, stroke } = style
  return {
    ...attr,
    fill: applyColor(fill, swatches),
    stroke: applyColor(stroke, swatches),
    strokeWidth: applyStrokeWidth(stroke),
    fillOpacity: applyFillOpacity(fill),
  }
}


const dip = (node, swatches) => {
  const style = get(node, ['meta', 'style'], false)
  if (style !== false) {
    return {
      ...node,
      attr: stir(get(node, 'attr', {}), style, swatches),
      children: map(get(node, 'children', []), child => dip(child, swatches)),
    }
  }
  return {
    ...node,
    children: map(get(node, 'children', []), child => dip(child, swatches)),
  }
}



const defaultSymbol = {
  tag: 'g',
  attr: {},
  children: [{
      tag: 'path',
      meta: {style: {fill: 'FG', stroke: 'NO'}},
      attr: {
        d: 'M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128ZM81.2255 35.9706L92.5392 47.2843L75.5686 64.2549L92.5392 81.2253L81.2255 92.5391L64.2549 75.5685L47.2843 92.5391L35.9706 81.2253L52.9412 64.2549L35.9706 47.2843L47.2843 35.9706L64.2549 52.9412L81.2255 35.9706Z',
      }
  }]
}


const createGrid = (p, bw, size) => {
  const ctr = (0.5 * bw) + (0.25 * size)
  switch (len(p)) {
    case 1: return lat({
        m: sq(ctr),
        s: sq(size),
        p: {x: 1, y: 1},
        flat: true,
      })
      break
    case 2: return lat({
        m: { x: bw, y: ctr },
        s: sq(size),
        p: {x: 2, y: 1},
        flat: true,
      })
      break
    default: return lat({
        m: sq(bw),
        s: sq(size),
        p: sq(len(p) / 2),
        flat: true,
      })
  }
}


const pour = ({ patp, sylmap, renderer, size }) => {
  // The size of each svg as drawn in Figma
  const UNIT = 128 * 2

  // renderer and @P are not optional
  if (isUndefined(patp)) throw Error('Missing @P')
  if (isUndefined(renderer)) throw Error('Missing Renderer')

  // if string recieved, convert to array, where each syllable is a string in the array.
  if (isString(patp)) patp = patpStrToArr(patp)
  if (!isEven(len(patp) && len(patp !== 1))) throw Error('@Ps are always of even length')

  // if needed, set a size default param
  size = isUndefined(size)
    ? UNIT
    : size

  // calculate a border width
  const bw = size / 16

  // make a color palette from ship address
  const palette = dye()

  // make a grid suited to ship class
  const grid = createGrid(patp, bw, size)

  // get svg objects from sylmap. If no sylmap defined, use the default symbol
  const symbols = isUndefined(sylmap)
    ? map(patp, syllable => defaultSymbol)
    : map(patp, syllable => get(sylmap, syllable))

  // transform symbols into position on grid
  const knolled = map(symbols, (item, index) => {
    // get point coordinates from grid at symbol index
    const { x, y } = grid[index]

    // calculate scale factor, where 256 is the unit measurement
    const scl = (size - (bw * 2)) / UNIT

    // make an affine transformation matrix with x/y translation and uniform scaling
    const affineMatrix = transform(translate(x, y), scale(scl, scl))

    // clone the entire reference to the current symbol to a new obj
    const clone = deepClone(item)

    // set the transform attr on the clone with the new affine matrix
    set(clone, ['attr', 'transform'], toSVG(affineMatrix))

    // return an SVG group with symbol
    return clone
  })

  // make a background rectangle
  const bg = {
    tag: 'rect',
    meta: { style: { fill: 'BG', stroke: 'NO' } },
    attr: {
      width: size,
      height: size,
      x: 0,
      y: 0,
    }
  }

  // insert symbol groups into SVG model, and apply color style
  const model = dye({
    tag: 'svg',
    meta: {},
    attr: { width: size, height: size },
    children: [bg, ...knolled],
  })


  // return a full POJO svg representation
  return renderer.svg(model)
}


export default pour
