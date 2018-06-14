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
  PointText,
} from 'paper'

import {
  split,
  callIfDef,
  sequence,
  flatten,
  end,
} from './lib'

// import { getChar, getSet } from './lib.symset'

const pathRect = (...params) => new Path.Rectangle(...params)

const pathLine = (...params) => new Path.Line(...params)

const rect = (...params) => new Rectangle(...params)

const point = (...params) => new Point(...params)

const group = (...params) => new Group(...params)

const pathCircle = (...params) => new Path.Circle(...params)

const size = (...params) => new Size(...params)

const pathArc = (...params) => new Path.Arc(...params)

const compoundPath = (...params) => new CompoundPath(...params)

const pointText = (...params) => new PointText(...params)

const path = (...params) => new Path(...params)

const opPipe = arr => op => arr.reduce((acc, item) => acc[op](item), end(arr))

const rectGrid = (origin, cellSize, extents, flat) => {
  const x = sequence(extents.x)
  const y = sequence(extents.y)
  const nestedGrid = y.map(iY => x.map(iX => ({
    x: origin.x + (cellSize.x * iX),
    y: origin.y + (cellSize.y * iY),
  })
  ))
  if (flat) return flatten(nestedGrid)
  return nestedGrid
}

export {
  pathRect,
  pathLine,
  rect,
  point,
  group,
  pathCircle,
  size,
  pathArc,
  compoundPath,
  path,
  pointText,
  rectGrid,
  opPipe,
}
