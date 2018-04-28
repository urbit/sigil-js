import {
  pPathRect,
  pPoint,
  pGroup,
  pSize,
  pPathCircle,
  pPathArc,
  pPathCenterPointArc,
  pPathLine,
  pCompoundPath,
  pPath,
  unitRect,
  extent,
  unit,
  origin,
  rectGrid,
  opPipe,
  pointOnArcPath,
  toDegrees,
  toRadians,
} from '../lib/lib.paper'
//'unite', 'intersect', 'subtract', 'exclude', 'divide'

const scale = 0.5
const size = 16

const glyphset = {
  glyphs: [
    {
      1: {
        svg: (g, params) => {
          const path = pPath({pathData: 'M 32 0L 16 0L 16 0C 16 3.31371 13.3137 6 10 6L 0 6L 0 26L 10 26C 13.3137 26 16 28.6863 16 32L 16 32L 32 32L 32 0Z', ...params})
          path.scale(scale)
          return path
        },
        edgeMap: { t:'a', r:'b', b:'b', l:'b' },
        transform: ['rotate', 'flip'],
      },
    },
  ],
  glyphGrid: () => rectGrid({ x:0, y:0 }, { x:size, y:size }, { x: 2, y: 2 }, false),
  groupGrid: () => rectGrid({ x:0, y:0 }, { x:size, y:size }, { x: 2, y: 2 }, false),
  name: 'Lorem'
}

// generate combinations of the edgemap
// generate every set, but don't render
// filter sets with rules
// render remainder

const generate = gyphset => method => iter => method(gyphset, iter).toArray()

const toAbove = xy => {
  const row = xy[0]
  const col = xy[1]
  return col = 0
    ? false
    : [col - 1, row]
}

// cord = [0,0], row, column
// returns an index to the left of an item
const toLeft = xy => {
  const row = xy[0]
  const col = xy[1]
  return row = 0
    ? false
    : [col, row - 1]
}

const getAtCoord = grid => coord => grid[coord[0]][coord[1]]

// ruleset is a whitelist
const ruleSet = {
  // where each key references items that can be mates
  edgeMap: [
    a: 'a'
    b: 'b'
  ],
}

// filter symbols based on their own ruleset
// where symbol is a matrix of the same shape as a grid
const sieve = symbol => ruleSet => {
  filter(symbol, (row, rowIdx) => filter(row, (column, colIdx) => {

  }))
}



const edgeMapComparator = a => b => {

}




export default symset
