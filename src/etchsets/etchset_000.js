import {
  rectGrid,
  pointText,
  group,
  pathRect,
  pathCircle,
  pathLine,
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
  etches: {
    hule: {
      insert: params => {
        const y = params.yOffset
        return pathLine({ ...params, to: [600, y], from:[0, y] })
      },
    },
    dott: {
      insert: params => {
        return pathCircle({  })
      },
    },

  },
  grid: () => rectGrid({ x:96, y:96 }, { x:64, y:64 }, { x:8, y:8 }, true),

}

export default etchset
