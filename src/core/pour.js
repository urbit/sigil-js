import {
  set,
  map,
  isString,
  get,
  chunk,
  flatten,
  isUndefined,
} from 'lodash'

import { toAddress } from 'urbit-ob'

import {
  scale,
  rotate,
  translate,
  transform,
  toString,
  fromString,
  toSVG,
} from 'transformation-matrix'
// import { patp } from '../lib/lib.urbit'
import chroma from 'chroma-js'
// import Graph from 'graphology'
// import { connectedComponents } from 'graphology-components'

import {
  quickHash,
  randomShip,
  patpArrToStr,
  patpStrToArr,
  updaters,
  isEven,
  deepClone,
} from '../lib/lib'

import {
  seq,
  len,
  lat,
} from '../lib/lib.array'

const dye = address => {
  return '#4330FC'
}

const defaultSymbol = {
  tag: 'g',
  attr: {},
  children: [
    {
      tag: 'path',
      attr: {
        fill: 'white',
        d: 'M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128ZM81.2255 35.9706L92.5392 47.2843L75.5686 64.2549L92.5392 81.2253L81.2255 92.5391L64.2549 75.5685L47.2843 92.5391L35.9706 81.2253L52.9412 64.2549L35.9706 47.2843L47.2843 35.9706L64.2549 52.9412L81.2255 35.9706Z',
      }
    }
  ]
}

const createGrid = (p, bw, size) => {
  let grid
  const ctr = (0.5 * bw) + (0.25 * size)
  switch (len(p)) {
    case 1: grid = lat({
        m: sq(ctr),
        s: sq(size),
        p: {x: 1, y: 1},
        flat: true,
      })
      break
    case 2: grid = lat({
        m: { x: bw, y: ctr },
        s: sq(size),
        p: {x: 2, y: 1},
        flat: true,
      })
      break
    default: grid = lat({
        m: sq(bw),
        s: sq(size),
        p: sq(len(p) / 2),
        flat: true,
      })
  }
  return grid
}


const sq = l => ({x: l, y: l})


const pour = ({ patp, sylmap, renderer, size }) => {

  // renderer and @P are not optional
  if (isUndefined(patp)) throw Error('Missing @P')
  if (isUndefined(renderer)) throw Error('Missing Renderer')

  // if string recieved, convert to array, where each syllable is a string in the array.
  if (isString(patp)) patp = patpStrToArr(patp)
  if (!isEven(len(patp) && len(patp !== 1))) throw Error('@Ps are always of even length')

  let p = patp
  const bw = size / 16

  // set a size param default
  size = isUndefined(size)
    ? 256
    : size

  // get svg objects from sylmap
  const symbols = isUndefined(sylmap)
    ? map(p, syllable => defaultSymbol)
    : map(p, syllable => get(sylmap, syllable))

  const grid = createGrid(p, bw, size)

  // transform into position
  const knolled = map(symbols, (item, index) => {
    const { x, y } = grid[index]
    const scl = (size - (bw * 2)) / 256
    const affineMatrix = transform(translate(x, y), scale(scl, scl))
    const clone = deepClone(item)
    set(clone, ['attr', 'transform'], toSVG(affineMatrix))
    return clone
  })


  const bg = {
    tag: 'rect',
    attr: {
      width: size,
      height: size,
      x: 0,
      y: 0,
      fill: dye(),
    }
  }


  const model = {
    tag: 'svg',
    meta: {},
    attr: { width: size, height: size },
    children: [bg, ...flatten(knolled)],
  }

  // return
  return renderer.svg(model)
}


export {
  pour,
}
