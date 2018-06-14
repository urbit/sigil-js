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
    // 0: {
    //   svg: (g, params) => {
    //     return pPathRect({ from: [0,0], to:[size,size], ...params })
    //   },
    // },
    1: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 16 32C 24.8367 32 32 24.8365 32 16C 32 7.16345 24.8367 0 16 0L 16 16L 0 16C 0 24.8365 7.16333 32 16 32Z', ...params})
        path.scale(params.scaleFactor)
        return path
      },
    },
    2: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 16 32C 24.8367 32 32 24.8365 32 16C 32 7.16345 24.8367 0 16 0L 16 16L 0 16C 0 24.8365 7.16333 32 16 32Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(90)
        return path
      },
    },
    3: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 16 32C 24.8367 32 32 24.8365 32 16C 32 7.16345 24.8367 0 16 0L 16 16L 0 16C 0 24.8365 7.16333 32 16 32Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(180)
        return path
      },
    },
    4: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 16 32C 24.8367 32 32 24.8365 32 16C 32 7.16345 24.8367 0 16 0L 16 16L 0 16C 0 24.8365 7.16333 32 16 32Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(270)
        return path
      },
    },
    5: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 16 32C 7.16333 32 0 24.8365 0 16L 16 16L 16 0C 24.8367 0 32 7.16345 32 16C 32 16.3358 31.9897 16.6693 31.9692 17L 16 17L 16 32Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(0)
        return path
      },
    },
    6: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 16 32C 7.16333 32 0 24.8365 0 16L 16 16L 16 0C 24.8367 0 32 7.16345 32 16C 32 16.3358 31.9897 16.6693 31.9692 17L 16 17L 16 32Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(90)
        return path
      },
    },
    11: {
      svg: (g, params) => {
        return pPathCircle({ center: [16,16], radius: 16 * params.scaleFactor, ...params })
      },
    },
  },


  glyphGrid: () => rectGrid({ x:0, y:0 }, { x:size, y:size }, { x: 2, y: 2 }, true),
  groupGrid: () => rectGrid({ x:0, y:0 }, { x:size * 2, y:size *2 }, { x: 2, y: 2 }, true),
  name: 'Lorem'
}






export default glyphset
