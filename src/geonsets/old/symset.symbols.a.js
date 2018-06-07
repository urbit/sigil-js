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

// composable symbols
const symset = [
  // start vertical bars
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[8][1], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[8][2], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[8][3], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[8][4], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[8][5], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[8][6], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[8][7], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[8][8], ...params })
  },
  // end vertical bars
  // start horizontal bars
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[1][8], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[2][8], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[3][8], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[4][8], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[5][8], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[6][8], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[7][8], ...params })
  },
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[8][8], ...params })
  },
  // end horizontal bars
  // start squares
  (g, params) => {
    return pPathRect({ center:g[4][4], size: pSize(8,8), ...params })
  },
  (g, params) => {
    return pPathRect({ center:g[4][4], size: pSize(16,16), ...params })
  },
  (g, params) => {
    const a = pPathRect({ center:g[4][4], size: pSize(8,8), ...params })
    a.rotate(45)
    return a
  },
  (g, params) => {
    const a = pPathRect({ center:g[4][4], size: pSize(16,16), ...params })
    a.rotate(45)
    return a
  },
  // end squares
  // start circles
  (g, params) => {
    return pPathCircle({ center:g[4][4], radius:2, ...params })
  },
  (g, params) => {
    return pPathCircle({ center:g[4][4], radius:4, ...params })
  },
  (g, params) => {
    return pPathCircle({ center:g[4][4], radius:8, ...params })
  },
  // end circles
  // start combinations
  (g, params) => {
    const a = pPathRect({ from: g[0][0], to:g[7][1], ...params, insert: false })
    const b = a.clone()
    a.rotate(90)
    // b.rotate(-45)
    return opPipe([a, b])('unite')

  },
  (g, params) => {
    const a = pPathRect({ from: g[0][0], to:g[7][3], ...params, insert: false })
    const b = a.clone()
    a.rotate(90)
    // b.rotate(-45)
    return opPipe([a, b])('unite')
  },
  (g, params) => {
    const a = pPathRect({ from: g[0][0], to:g[7][1], ...params, insert: false })
    const b = pPathRect({ from: g[0][2], to:g[7][3], ...params, insert: false })
    const c = pPathRect({ from: g[0][4], to:g[7][5], ...params, insert: false })
    const d = pPathRect({ from: g[0][6], to:g[7][7], ...params, insert: false })
    return opPipe([a, b, c, d])('unite')
  },
  (g, params) => {
    const a = pPathRect({ from: g[0][0], to:g[7][1], ...params, insert: false })
    const b = pPathRect({ from: g[0][2], to:g[7][3], ...params, insert: false })
    const c = pPathRect({ from: g[0][4], to:g[7][5], ...params, insert: false })
    const d = pPathRect({ from: g[0][6], to:g[7][7], ...params, insert: false })
    const shape = opPipe([a, b, c, d])('unite')
    shape.rotate(90)
    return shape
  },
  (g, params) => {
    const a = pPathCircle({ center:g[4][4], radius:8, ...params, insert: false })
    const b = pPathCircle({ center:g[4][4], radius:2, ...params, insert: false })
    return opPipe([a, b])('exclude')
  },
  (g, params) => {
    const a = pPathCircle({ center:g[4][4], radius:4, ...params, insert: false })
    const b = pPathCircle({ center:g[4][4], radius:2, ...params, insert: false })
    return opPipe([a, b])('exclude')
  },
  (g, params) => {
    const a = pPathCircle({ center:g[4][4], radius:8, ...params, insert: false })
    const b = pPathCircle({ center:g[4][4], radius:4, ...params, insert: false })
    return opPipe([a, b])('exclude')
  },
]

export default symset
