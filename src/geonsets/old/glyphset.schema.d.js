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
    // 1: {
    //   svg: (g, params) => {
    //     const path = pPath({pathData: 'M 16 32C 24.8367 32 32 24.8365 32 16C 32 7.16345 24.8367 0 16 0L 16 16L 0 16C 0 24.8365 7.16333 32 16 32Z', ...params})
    //     path.scale(params.scaleFactor)
    //     return path
    //   },
    // },
    2: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 32 0L 0 0C 0 11.6572 3.11646 22.5864 8.56201 32L 32 32L 32 0Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(0)
        return path
      },
    },
    3: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 32 32C 18.7524 24.2572 7.70211 13.2097 0 0L 32 0L 32 32Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(0)
        return path
      },
    },
    4: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 0 23.4379L 0 0L 32 0L 32 32C 20.3428 32 9.41357 28.8833 0 23.4379Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(0)
        return path
      },
    },

    5: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 32 0L 0 0C 0 11.6572 3.11646 22.5864 8.56201 32L 32 32L 32 0Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(90)
        return path
      },
    },
    6: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 32 32C 18.7524 24.2572 7.70211 13.2097 0 0L 32 0L 32 32Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(90)
        return path
      },
    },
    7: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 0 23.4379L 0 0L 32 0L 32 32C 20.3428 32 9.41357 28.8833 0 23.4379Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(90)
        return path
      },
    },

    8: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 32 0L 0 0C 0 11.6572 3.11646 22.5864 8.56201 32L 32 32L 32 0Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(180)
        return path
      },
    },
    9: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 32 32C 18.7524 24.2572 7.70211 13.2097 0 0L 32 0L 32 32Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(180)
        return path
      },
    },
    10: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 0 23.4379L 0 0L 32 0L 32 32C 20.3428 32 9.41357 28.8833 0 23.4379Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(180)
        return path
      },
    },

    11: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 32 0L 0 0C 0 11.6572 3.11646 22.5864 8.56201 32L 32 32L 32 0Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(270)
        return path
      },
    },
    12: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 32 32C 18.7524 24.2572 7.70211 13.2097 0 0L 32 0L 32 32Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(270)
        return path
      },
    },
    13: {
      svg: (g, params) => {
        const path = pPath({pathData: 'M 0 23.4379L 0 0L 32 0L 32 32C 20.3428 32 9.41357 28.8833 0 23.4379Z', ...params})
        path.scale(params.scaleFactor)
        path.rotate(270)
        return path
      },
    },
    // 8: {
    //   svg: (g, params) => {
    //     return pPathCircle({ center: [16,16], radius: 16 * params.scaleFactor, ...params })
    //   },
    // },
  },


  glyphGrid: () => rectGrid({ x:0, y:0 }, { x:size, y:size }, { x: 2, y: 2 }, true),
  groupGrid: () => rectGrid({ x:0, y:0 }, { x:size * 2, y:size *2 }, { x: 2, y: 2 }, true),
  name: 'Lorem'
}






export default glyphset
