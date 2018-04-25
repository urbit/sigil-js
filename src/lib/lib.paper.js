import {
  Project,
  Path,
  Point,
  Group,
  Layer,
  Shape,
  Rectangle,
  Size,
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

import { getChar, getSet } from './lib.symset'

const pPathRect = (...params) => new Path.Rectangle(...params)

const pRect = (...params) => new Rectangle(...params)

const pPoint = (...params) => new Point(...params)

const pGroup = (...params) => new Group(...params)

const pPathCircle = (...params) => new Path.Circle(...params)

const pSize = (...params) => new Size(...params)

const genAvatar = (name, quadrants, symGrid, set) => {
  const avatar = map(name, (sylArr, i) => {
    // split each syllable into a 3 item array, like ['r', 'i', 'd']
    const charsInSyl = split(sylArr)('')
    // set some parameters
    const params = {
      fillColor: chr.random().hex(),
      // fillColor: 'black',
      strokeWidth: 1,
      // strokeColor: 'white',
      blendMode:'multiply'
    }
    // map through letters of a syllable and call it's same-named method
    const sylShapes = map(charsInSyl, char => {
      return callIfDef(getChar(set, char))(symGrid, params )
    })
    const symbolGroup =  pGroup({
      children: sylShapes,
      position: quadrants[i],
    })
    return symbolGroup
  })
  return pGroup({ children: avatar, })
}

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


export {
  pPathRect,
  pRect,
  pPoint,
  pGroup,
  pPathCircle,
  pSize,


  rectGrid,
  opPipe,


  genAvatar,
  // drawChars,
}
