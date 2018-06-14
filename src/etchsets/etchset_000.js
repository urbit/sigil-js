import {
  rectGrid,
  pointText,
  group,
  pathRect,
  pathCircle,
} from '../lib/lib.paper'


// const etch = {
//   dot8:
//   dot16:
//   dot32:
//   dot64:
//   circ8:
//   circ16:
//   circ32:
//   circ64:
//   ocirc128:
//   hatch
// }

// params = {
//   size,
//   color,
//   rotation,
//   length (sometimes)
// }


const etchset = {
  dott: params => {
    return pathCircle({ params })
  },
  circ: params => {

  },
  lens: params => {

  },
  hatch: params => {

  },
  hule: params => {

  },
  vule: params => {

  },
}

export default etchset
