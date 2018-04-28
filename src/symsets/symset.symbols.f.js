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
    const path = pCompoundPath({pathData: 'M 32 32L 32 0C 20.5 0 3.1 8.2 11.5 15C 19.9 21.8 0 20.5 0 32L 32 32Z', ...params})
    path.scale(scale)
    path.rotate(0)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 31.9999 32L 31.9999 0C 22 0 21 2 16 17.5C 12.6821 27.7855 14.5 32 0 32L 31.9999 32Z', ...params})
    path.scale(scale)
    path.rotate(0)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 31.9999 32L 31.9999 0C 22 0 26.5 15.5 20 15.5C 9.1926 15.5 14.5 32 0 32L 31.9999 32Z', ...params})
    path.scale(scale)
    path.rotate(0)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 31.9999 32L 31.9999 0C 22 0 5.33333 1 3.5 6.5C 0 17 8.11667 27 10.5 21.5C 15.9167 9 21.5 14 21.5 19.5C 21.5 25 7.10352 32 0 32L 31.9999 32Z', ...params})
    path.scale(scale)
    path.rotate(0)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 32 32L 32 0C 20.5 0 3.1 8.2 11.5 15C 19.9 21.8 0 20.5 0 32L 32 32Z', ...params})
    path.scale(scale)
    path.rotate(90)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 31.9999 32L 31.9999 0C 22 0 21 2 16 17.5C 12.6821 27.7855 14.5 32 0 32L 31.9999 32Z', ...params})
    path.scale(scale)
    path.rotate(90)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 31.9999 32L 31.9999 0C 22 0 26.5 15.5 20 15.5C 9.1926 15.5 14.5 32 0 32L 31.9999 32Z', ...params})
    path.scale(scale)
    path.rotate(90)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 31.9999 32L 31.9999 0C 22 0 5.33333 1 3.5 6.5C 0 17 8.11667 27 10.5 21.5C 15.9167 9 21.5 14 21.5 19.5C 21.5 25 7.10352 32 0 32L 31.9999 32Z', ...params})
    path.scale(scale)
    path.rotate(90)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 32 32L 32 0C 20.5 0 3.1 8.2 11.5 15C 19.9 21.8 0 20.5 0 32L 32 32Z', ...params})
    path.scale(scale)
    path.rotate(180)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 31.9999 32L 31.9999 0C 22 0 21 2 16 17.5C 12.6821 27.7855 14.5 32 0 32L 31.9999 32Z', ...params})
    path.scale(scale)
    path.rotate(180)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 31.9999 32L 31.9999 0C 22 0 26.5 15.5 20 15.5C 9.1926 15.5 14.5 32 0 32L 31.9999 32Z', ...params})
    path.scale(scale)
    path.rotate(180)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 31.9999 32L 31.9999 0C 22 0 5.33333 1 3.5 6.5C 0 17 8.11667 27 10.5 21.5C 15.9167 9 21.5 14 21.5 19.5C 21.5 25 7.10352 32 0 32L 31.9999 32Z', ...params})
    path.scale(scale)
    path.rotate(180)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 32 32L 32 0C 20.5 0 3.1 8.2 11.5 15C 19.9 21.8 0 20.5 0 32L 32 32Z', ...params})
    path.scale(scale)
    path.rotate(270)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 31.9999 32L 31.9999 0C 22 0 21 2 16 17.5C 12.6821 27.7855 14.5 32 0 32L 31.9999 32Z', ...params})
    path.scale(scale)
    path.rotate(270)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 31.9999 32L 31.9999 0C 22 0 26.5 15.5 20 15.5C 9.1926 15.5 14.5 32 0 32L 31.9999 32Z', ...params})
    path.scale(scale)
    path.rotate(270)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 31.9999 32L 31.9999 0C 22 0 5.33333 1 3.5 6.5C 0 17 8.11667 27 10.5 21.5C 15.9167 9 21.5 14 21.5 19.5C 21.5 25 7.10352 32 0 32L 31.9999 32Z', ...params})
    path.scale(scale)
    path.rotate(270)
    return path
  },
]



export default symset
