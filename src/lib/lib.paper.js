import {
  Project,
  Path,
  Point,
  Group,
  Layer,
  Shape,
  Rectangle,
  Size,
  Arc,
  CompoundPath,
} from 'paper'

import chr from 'chroma-js'

import {
  map,
  split,
  callIfDef,
  sequence,
  flatten,
  end,
} from './lib'

// import { getChar, getSet } from './lib.symset'

const pPathRect = (...params) => new Path.Rectangle(...params)

const pPathLine = (...params) => new Path.Line(...params)

const pRect = (...params) => new Rectangle(...params)

const pPoint = (...params) => new Point(...params)

const pGroup = (...params) => new Group(...params)

const pPathCircle = (...params) => new Path.Circle(...params)

const pSize = (...params) => new Size(...params)

const pPathArc = (...params) => new Path.Arc(...params)

const pCompoundPath = (...params) => new CompoundPath(...params)

const pPath = (...params) => new Path(...params)

// const genAvatar = (name, quadrants, symGrid, set) => {
//   const avatar = map(name, (sylArr, i) => {
//     // split each syllable into a 3 item array, like ['r', 'i', 'd']
//     const charsInSyl = split(sylArr)('')
//     // set some parameters
//     const params = {
//       fillColor: chr.random().hex(),
//       // fillColor: 'black',
//       strokeWidth: 1,
//       // strokeColor: 'white',
//       blendMode:'multiply'
//     }
//     // map through letters of a syllable and call it's same-named method
//     const sylShapes = map(charsInSyl, char => {
//       return callIfDef(getChar(set, char))(symGrid, params)
//     })
//     const symbolGroup =  pGroup({
//       children: sylShapes,
//       position: quadrants[i],
//     })
//     return symbolGroup
//   })
//   return pGroup({ children: avatar, })
// }

// const drawChars = (symset, grid) => map(syms, (sym, i) => {
//   const params = {
//     scaling: 1,
//     fillColor: 'black',
//     position: grid[i],
//   }
//   return callIfDef(getChar(sym, symset))(params)
// })

const opPipe = arr => op => arr.reduce((acc, item) => acc[op](item), end(arr))

const rectGrid = (origin, cellSize, extents, flat) => {
  const x = sequence(extents.x)
  const y = sequence(extents.y)
  const nestedGrid = map(y, iY => map(x, iX => ({
    x: origin.x + (cellSize.x * iX),
    y: origin.y + (cellSize.y * iY),
  })
  ))
  if (flat) return flatten(nestedGrid)
  return nestedGrid
}

const pointOnArcPath = (radians, radius, center) => {
  const x = center.x + (Math.cos(radians) * radius)
  const y = center.y + (Math.sin(radians) * radius)
  return pPoint(x, y)
}

const toDegrees = angle => angle * (180 / Math.PI)

const toRadians = angle => angle * (Math.PI / 180)

const pPathCenterPointArc = (angles, radius, center, params) => {
  const from = pointOnArcPath(toRadians(angles.from), radius, center)
  const to = pointOnArcPath(toRadians(angles.to), radius, center)
  const through = pointOnArcPath(toRadians(angles.through), radius, center)
  return pPathArc({from, through, to, ...params})
}

export {
  pPathRect,
  pRect,
  pPoint,
  pGroup,
  pPathCircle,
  pSize,
  pPathArc,
  pPathCenterPointArc,
  pCompoundPath,
  pPathLine,
  pPath,
  rectGrid,

  opPipe,

  pointOnArcPath,
  toDegrees,
  toRadians,

  // genAvatar,
  // drawChars,
}
