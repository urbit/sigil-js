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
]





export default symset
