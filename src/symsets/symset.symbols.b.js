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
// composable symbols
const scale = 0.5
const symset = [
  // start vertical bars
  (g, params) => {
    return pPathRect({ from: g[0][0], to:g[1][1], ...params })
  },
  (g, params) => {
    const path = pPath({pathData: 'M 0 0L 32 0L 32 32C 14.3269 32 0 17.6731 0 0Z', ...params})
    path.scale(scale)
    return path
  },
  (g, params) => {
    const path = pPath({pathData: 'M 0 0L 32 0L 32 32C 14.3269 32 0 17.6731 0 0Z', ...params})
    path.scale(scale)
    path.rotate(90)
    return path
  },
  (g, params) => {
    const path = pPath({pathData: 'M 0 0L 32 0L 32 32C 14.3269 32 0 17.6731 0 0Z', ...params})
    path.scale(scale)
    path.rotate(180)
    return path
  },
  (g, params) => {
    const path = pPath({pathData: 'M 0 0L 32 0L 32 32C 14.3269 32 0 17.6731 0 0Z', ...params})
    path.scale(scale)
    path.rotate(270)
    return path
  },
  (g, params) => {
    const path = pPath({pathData: 'M 32 16L 32 32L 16 32C 7.16333 32 0 24.8365 0 16C 0 7.16345 7.16333 0 16 0L 32 0L 32 16Z', ...params})
    path.scale(scale)
    path.rotate(0)
    return path
  },
  (g, params) => {
    const path = pPath({pathData: 'M 32 16L 32 32L 16 32C 7.16333 32 0 24.8365 0 16C 0 7.16345 7.16333 0 16 0L 32 0L 32 16Z', ...params})
    path.scale(scale)
    path.rotate(90)
    return path
  },
  (g, params) => {
    const path = pPath({pathData: 'M 32 16L 32 32L 16 32C 7.16333 32 0 24.8365 0 16C 0 7.16345 7.16333 0 16 0L 32 0L 32 16Z', ...params})
    path.scale(scale)
    path.rotate(180)
    return path
  },
  (g, params) => {
    const path = pPath({pathData: 'M 32 16L 32 32L 16 32C 7.16333 32 0 24.8365 0 16C 0 7.16345 7.16333 0 16 0L 32 0L 32 16Z', ...params})
    path.scale(scale)
    path.rotate(270)
    return path
  },
  (g, params) => {
    const path = pPath({pathData: 'M 0 0L 0 16.8205L 0.0206831 16.8205C 0.447766 25.2758 7.43865 32 16 32C 16.2416 32 16.482 31.9946 16.721 31.984C 16.7542 31.9826 16.7874 31.981 16.8205 31.9793L 16.8205 32L 32 32L 32 0L 0 0Z', ...params})
    path.scale(scale)
    path.rotate(0)
    return path
  },
  (g, params) => {
    const path = pPath({pathData: 'M 0 0L 15.1795 0L 15.1795 0.0206768C 15.4513 0.00694862 15.7248 0 16 0C 24.5613 0 31.5522 6.72423 31.9793 15.1795L 32 15.1795L 32 32L 16.8205 32L 16.8205 31.9793C 16.7874 31.981 16.7542 31.9826 16.721 31.984C 16.482 31.9946 16.2416 32 16 32C 7.43865 32 0.447766 25.2758 0.0206831 16.8205L 0 16.8205L 0 0Z', ...params})
    path.scale(scale)
    path.rotate(0)
    return path
  },
  // (g, params) => {
  //   const path = pPath({pathData: 'M 9.37258 6.73767e-08L 22.6274 0L 32 9.37258L 32 22.6274L 22.6274 32L 9.37258 32L 6.73766e-08 22.6274L 0 9.37258L 9.37258 6.73767e-08Z', ...params})
  //   path.scale(scale)
  //   path.rotate(0)
  //   return path
  // },
  // (g, params) => {
  //   const path = pPath({pathData: 'M 16 0L 0 0C 0 17.6731 14.3269 32 32 32L 32 16C 23.1633 16 16 8.83655 16 0Z', ...params})
  //   path.scale(scale)
  //   return path
  // },
  // (g, params) => {
  //   const path = pPath({pathData: 'M 16 0L 0 0C 0 17.6731 14.3269 32 32 32L 32 16C 23.1633 16 16 8.83655 16 0Z', ...params})
  //   path.scale(scale)
  //   path.rotate(90)
  //   return path
  // },
  // (g, params) => {
  //   const path = pPath({pathData: 'M 16 0L 0 0C 0 17.6731 14.3269 32 32 32L 32 16C 23.1633 16 16 8.83655 16 0Z', ...params})
  //   path.scale(scale)
  //   path.rotate(180)
  //   return path
  // },
  // (g, params) => {
  //   const path = pPath({pathData: 'M 16 0L 0 0C 0 17.6731 14.3269 32 32 32L 32 16C 23.1633 16 16 8.83655 16 0Z', ...params})
  //   path.scale(scale)
  //   path.rotate(270)
  //   return path
  // },
  // (g, params) => {
  //   // blank
  //   return pPathRect({ from: g[0][0], to:g[1][1], ...params })
  // },
  (g, params) => {
    // blank
    return pPathCircle({ center: g[1][1], radius: 16 * scale, ...params })
  },
  // (g, params) => {
  //   // blank
  //   return pPathCircle({ center: g[1][1], radius: 8 * scale, ...params })
  // },
  // (g, params) => {
  //   const a = pPathCircle({ center:g[1][1], radius:16 * scale, ...params, insert: false })
  //   const b = pPathCircle({ center:g[1][1], radius:8 * scale, ...params, insert: false })
  //   return opPipe([a, b])('exclude')
  // }
]




export default symset
