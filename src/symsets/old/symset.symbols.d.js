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
const symset = [
  (g, params) => {
    const path = pPath({pathData: 'M 32 0L 16 0L 16 0C 16 3.31371 13.3137 6 10 6L 0 6L 0 26L 10 26C 13.3137 26 16 28.6863 16 32L 16 32L 32 32L 32 0Z', ...params})
    path.scale(scale)
    return path
  },
  (g, params) => {
    const path = pPath({pathData: 'M 32 0L 16 0L 16 0C 16 3.31371 13.3137 6 10 6L 0 6L 0 26L 10 26C 13.3137 26 16 28.6863 16 32L 16 32L 32 32L 32 0Z', ...params})
    path.scale(scale)
    path.rotate(180)
    return path
  },
  (g, params) => {
    const path = pPath({pathData: 'M 32 0L 16 0L 16 0C 16 3.31371 13.3137 6 10 6L 0 6L 0 26L 10 26C 13.3137 26 16 28.6863 16 32L 16 32L 32 32L 32 0Z', ...params})
    path.scale(scale)
    path.rotate(90)
    return path
  },
  (g, params) => {
    const path = pPath({pathData: 'M 16 0L 32 0L 32 8L 26 8C 21.5818 8 18 11.5817 18 16C 18 20.4183 21.5818 24 26 24L 32 24L 32 32L 16 32C 16 28.6863 13.3137 26 10 26L 0 26L 0 6L 10 6C 13.3137 6 16 3.31372 16 0Z', ...params})
    path.scale(scale)
    return path
  },
  // (g, params) => {
  //   const path = pPath({pathData: 'M 32 0L 0 0L 0 20L 32 20L 32 0ZM 16 18C 20.4182 18 24 14.4183 24 10C 24 5.58167 20.4182 2 16 2C 11.5818 2 8 5.58167 8 10C 8 14.4183 11.5818 18 16 18Z', ...params})
  //   path.scale(scale)
  //   return path
  // },
  (g, params) => {
    const path = pPath({pathData: 'M 32 0L 16 0L 16 4C 16 8.41828 12.4183 12 8 12L 0 12L 0 32L 16 32C 16 32 16 32 16 32L 32 32L 32 0Z', ...params})
    path.scale(scale)
    return path
  },
]

export default symset
