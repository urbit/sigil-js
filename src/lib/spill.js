import {
  set,
  map,
  isString,
  get,
  isUndefined,
  last,
  has,
  reduce,
} from 'lodash'

// import { toAddress } from 'urbit-ob'

import { scale, translate, transform, toSVG, fromString, rotateDEG } from 'transformation-matrix'
// import chroma from 'chroma-js'

import {
  quickHash,
  randomShip,
  patpArrToStr,
  patpStrToArr,
  isEven,
  isOdd,
  deepClone,
  remap,
} from '../lib/lib'

import { len, lat, sq, lid } from '../lib/lib.array'

import { suffixes, prefixes, } from '../lib/lib.urbit'


const cw = [
  ['#fff', '#000000'],
  ['#fff', '#4330FC'],
  ['#fff', '#372284'],
  ['#fff', '#129485'],
  ['#fff', '#928472'],
]




const dye = (model, colorway) => {

  // if the monotoneColorway param is true, return a black and white seal
  return dip(model, colorway)

  // pick a colorscheme from patp contents
  // colorway = prism(patp, cw)

  // apply a color to the model
  // return dip(model, colorway)
}

const apply = {
  strokeWidth: p => {
    switch(p) {
      case 'FG': return 1
      case 'BG': return 1
      default: return 0
    }
  },
  fillOpacity: p => {
    switch(p) {
      case 'FG': return 1
      case 'BG': return 1
      default: return 0
    }
  },
  color: (p, colorway) => {
    switch(p) {
      case 'FG': return colorway[0]
      case 'BG': return colorway[1]
      case 'TC': return colorway[2]
      default: return last(colorway)
    }
  }
}

// apply style attributes to a tag
const applyStyle = (style, colorway) => {
  const { fill, stroke } = style
  return {
    fill: apply.color(fill, colorway),
    // stroke: apply.color(stroke, colorway),
    // strokeWidth: apply.strokeWidth(stroke),
    fillOpacity: apply.fillOpacity(fill),
  }
}

// Only apply styling to nodes that have a style meta property
const dip = (node, colorway) => {
  const style = get(node, ['meta', 'style'], false)
  const children = get(node, 'children', [])
  const attr = get(node, 'attr', {})
  // if there is a style attribute set, apply style attributes based on meta.style
  return {
    ...node,
    attr: style !== false
      ? {...attr, ...applyStyle(style, colorway)}
      : {...attr},
    children: map(children, child => dip(child, colorway)),
  }

}


// This symbol is rendered when there is no sylmap
const defaultSymbol = {
  tag: 'g',
  attr: {},
  children: [{
      tag: 'path',
      meta: { style: { fill: 'FG', stroke: 'NO' } },
      attr: {
        d: 'M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128ZM81.2255 35.9706L92.5392 47.2843L75.5686 64.2549L92.5392 81.2253L81.2255 92.5391L64.2549 75.5685L47.2843 92.5391L35.9706 81.2253L52.9412 64.2549L35.9706 47.2843L47.2843 35.9706L64.2549 52.9412L81.2255 35.9706Z',
      }
  }]
}


const createGrid = (p, bw, size) => {

  // create an offset that is used to center a single tile
  const ctr = (0.5 * bw) + (0.25 * size)

  // generate a grid specific to the patp length
  switch (len(p)) {
    case 1: return lat({
        m: sq(ctr),
        s: sq(size),
        p: {x: 1, y: 1},
        flat: true,
      })
    case 2: return lat({
        m: { x: bw, y: ctr },
        s: sq(size),
        p: {x: 2, y: 1},
        flat: true,
      })
    default: return lat({
        m: sq(bw),
        s: sq(size),
        p: sq(len(p) / 2),
        flat: true,
      })
  }
}


const spill = ({ symbols, renderer, size, colorway }) => {
  // The size of each svg as drawn in Figma
  const UNIT = 128

  if (isUndefined(renderer)) throw Error('Missing Renderer')

  // if needed, set a size default param
  size = isUndefined(size)
    ? UNIT * 2
    : size

  // calculate a border width
  const bw = size / 16


  // make a grid suited to ship class
  const grid = createGrid(symbols, bw, size)


  // transform symbols into position on grid
  const knolled = map(symbols, (item, index) => {

    // clone the entire reference to the current symbol to a new obj
    const clone = deepClone(item)

    // get point coordinates from grid at symbol index
    const { x, y } = grid[index]

    // For some reason this is necessary to control the gap bewteen symbols
    const fudge = -2

    // calculate scale factor, where 256 is the unit measurement
    const scaleFactor = (size - (bw * 2) + fudge) / (UNIT * 2)

    const deg = get(clone, ['meta', 'rotate'], 0)

    // console.log(clone.children[lid(clone.children)])
    const center = UNIT / 2
    // make an affine transformation matrix with x/y translation and uniform scaling
    const affineMatrix = transform(translate(x, y), scale(scaleFactor, scaleFactor), rotateDEG(deg, center, center))

    // console.log(affineMatrix)
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
  }, colorway)

  // return a full POJO svg representation
  return renderer.svg(model)
}


// const spinThru = child => {
//   const deg = get(child, ['meta', 'rotation'], 0)
//   const center = UNIT / 2
//   const affineMatrix = transform(translate(x, y), scale(scl, scl), rotateDEG(deg, center, center))
//
//   return {
//     ...child,
//     attr: {...child.attr, transform: toSVG(affineMatrix)},
//     children: chi
//   }
// }


export { spill, dye }
