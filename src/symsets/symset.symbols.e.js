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
    const path = pCompoundPath({pathData: 'M 32 8C 30.8108 8 29.6169 7.51123 28.9141 6.552C 26.0027 2.57947 21.3027 0 16 0C 7.16333 0 0 7.16345 0 16C 0 24.8365 7.16333 32 16 32C 21.3027 32 26.0027 29.4205 28.9141 25.448C 29.6169 24.4888 30.8108 24 32 24L 32 8ZM 21 16C 21 18.7615 18.7615 21 16 21C 13.2385 21 11 18.7615 11 16C 11 13.2385 13.2385 11 16 11C 18.7615 11 21 13.2385 21 16Z', ...params})
    path.scale(scale)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 16 0L 32 0L 32 32L 16 32C 16 27.5817 12.4182 24 8 24L 0 24L 0 8L 8 8C 12.4182 8 16 4.41833 16 0ZM 16 21C 18.7615 21 21 18.7615 21 16C 21 13.2385 18.7615 11 16 11C 13.2385 11 11 13.2385 11 16C 11 18.7615 13.2385 21 16 21Z', ...params})
    path.scale(scale)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 14 0C 6.26807 0 0 6.26807 0 14L 0 18C 0 25.7319 6.26807 32 14 32L 18 32C 25.7319 32 32 25.7319 32 18L 32 14C 32 6.26807 25.7319 0 18 0L 14 0ZM 16 21C 18.7615 21 21 18.7615 21 16C 21 13.2385 18.7615 11 16 11C 13.2385 11 11 13.2385 11 16C 11 18.7615 13.2385 21 16 21Z', ...params})
    path.scale(scale)
    return path
  },
  (g, params) => {
    const path = pCompoundPath({pathData: 'M 8.06177 16.998C 7.99341 16.45 7.55005 16.0066 7.00195 15.9384C 3.05469 15.4471 0 12.0803 0 8C 0 3.58167 3.58179 0 8 0C 12.0803 0 15.447 3.05469 15.9382 7.00195C 16.0066 7.55005 16.45 7.99341 16.998 8.06165C 20.6184 8.51221 23.4878 11.3816 23.9382 15.002C 24.0066 15.55 24.45 15.9934 24.998 16.0616C 28.9453 16.5529 32 19.9197 32 24C 32 28.4183 28.4182 32 24 32C 19.9197 32 16.553 28.9453 16.0618 24.998C 15.9934 24.45 15.55 24.0066 15.002 23.9384C 11.3816 23.4878 8.51221 20.6184 8.06177 16.998ZM 13 8C 13 10.7615 10.7615 13 8 13C 5.23853 13 3 10.7615 3 8C 3 5.23853 5.23853 3 8 3C 10.7615 3 13 5.23853 13 8ZM 24 29C 26.7615 29 29 26.7615 29 24C 29 21.2385 26.7615 19 24 19C 21.2385 19 19 21.2385 19 24C 19 26.7615 21.2385 29 24 29Z', ...params})
    path.scale(scale)
    return path
  },
]




export default symset
