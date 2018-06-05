import {
  pPathRect,
  pPoint,
  pGroup,
  pSize,
  pPathCircle,
  unitRect,
  extent,
  unit,
  origin,
  rectGrid,
  opPipe,
} from '../lib/lib.paper'

// Point: x, y
const alphabet = {
  a: (g, params) => {
    return pPathRect({ from: g[0][0], to:g[8][1], ...params })
  },
  b: (g, params) => {
    return pPathRect({ from: g[0][0], to:g[8][3], ...params })
  },
  c: (g, params) => {
    return pPathRect({ from: g[0][0], to:g[8][5], ...params })
  },
  d: (g, params) => {
    return pPathRect({ from: g[0][0], to:g[8][7], ...params })
  },
  e: (g, params) => {
    return pPathRect({ from: g[0][0], to:g[1][8], ...params })
  },
  f: (g, params) => {
    return pPathRect({ from: g[0][0], to:g[3][8], ...params })
  },
  g: (g, params) => {
    return pPathRect({ from: g[0][0], to:g[5][8], ...params })
  },
  h: (g, params) => {
    return pPathRect({ from: g[0][0], to:g[7][8], ...params })
  },
  i: (g, params) => {
    return pPathCircle({ center:g[4][4], radius:128, ...params })
  },
  j: (g, params) => {
    return pPathCircle({ center:g[4][4], radius:64, ...params })
  },
  k: (g, params) => {
    return pPathCircle({ center:g[4][4], radius:32, ...params })
  },
  l: (g, params) => {
    const a = pPathCircle({ center:g[4][4], radius:128, ...params, insert: false})
    const b = pPathCircle({ center:g[4][4], radius:32, ...params, insert: false})
    return opPipe([a, b])('exclude')
  },
  m: (g, params) => {
    const a = pPathCircle({ center:g[4][4], radius:128, ...params, insert: false})
    const b =  pPathRect({ from: g[0][0], to:g[8][4], ...params, insert: false})
    return opPipe([a, b])('unite')
  },
  n: (g, params) => {
    // return pPathCircle({ center:g[2][4], radius:32, ...params })
  },
  o: (g, params) => {
    // return pPathCircle({ center:g[2][6], radius:32, ...params })
  },
  p: (g, params) => {
    // return pPathCircle({ center:g[6][2], radius:32, ...params })
  },
  q: (g, params) => {
    const a = pPathCircle({ center:g[4][4], radius:128, ...params, insert: false})
    const b =  pPathRect({ from: g[0][0], to:g[4][8], ...params, insert: false})
    return opPipe([a, b])('unite')
  },
  r: (g, params) => {
    const a = pPathCircle({ center:g[4][4], radius:128, ...params, insert: false})
    const b = pPathCircle({ center:g[4][4], radius:64, ...params, insert: false})
    return opPipe([a, b])('exclude')
  },
  s: (g, params) => {
    const a = pPathCircle({ center:g[4][4], radius:128, ...params, insert: false})
    const b =  pPathRect({ from: g[0][0], to:g[4][4], ...params, insert: false})
    return opPipe([a, b])('unite')
  },
  t: (g, params) => {
    return pPathCircle({ center:g[2][2], radius:64, ...params, insert: false})
  },
  u: (g, params) => {
    return pPathCircle({ center:g[6][6], radius:64, ...params, insert: false})
  },
  v: (g, params) => {
    return pPathCircle({ center:g[2][6], radius:64, ...params, insert: false})
  },
  w: (g, params) => {
    return pPathCircle({ center:g[6][2], radius:64, ...params, insert: false})
  },
  x: (g, params) => {

  },
  y: (g, params) => {

  },
  z: (g, params) => {
    const zod = pPathCircle({ center: g[4][4], radius: 32, ...params, fillColor:'black' })
    return zod
  },
}

export default alphabet
