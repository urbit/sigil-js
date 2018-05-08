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

const size = 32

const glyphset = {
  glyphs: {
    0: {
      svg: (g, params) => {
        return pPathRect({ from: [0,0], to:[size,size], ...params })
      },
    },
    1: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 0 0L 32 0L 32 32C 14.3269 32 0 17.6731 0 0Z', ...params})
        path.scale(params.scaleFactor)
        return path
      },
    },
    2: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 0 0L 32 0L 32 32C 14.3269 32 0 17.6731 0 0Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(90)
        return path
      },
    },
    3: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 0 0L 32 0L 32 32C 14.3269 32 0 17.6731 0 0Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(180)
        return path
      },
    },
    4: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 0 0L 32 0L 32 32C 14.3269 32 0 17.6731 0 0Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(270)
        return path
      },
    },
  },
  glyphGrid: () => rectGrid({ x:0, y:0 }, { x:size, y:size }, { x: 2, y: 2 }, true),
  groupGrid: () => rectGrid({ x:0, y:0 }, { x:size * 2, y:size *2 }, { x: 2, y: 2 }, true),
  name: 'Lorem'
}





export default glyphset
