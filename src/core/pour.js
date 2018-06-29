import { set, map, isString, get, chunk, flatten } from 'lodash'
import { toAddress } from 'urbit-ob'
// import { patp } from '../lib/lib.urbit'
// import chroma from 'chroma-js'
// import Graph from 'graphology'
// import { connectedComponents } from 'graphology-components'

import {
  quickHash,
  randomShip,
  patpArrToStr,
  patpStrToArr,
  updaters,
} from '../lib/lib'

import {
  transpose,
  scan,
  grainPartition,
  rectGrid,
} from '../lib/lib.array'


const pour = (p, geonset, etchset, sylmap) => {

  // defaults
  let seal = {
    patp: [],
    geonArray: [],
    geonMatrix: [],
    color: [],
    grid: [],
    // partition: [],
    // graph: null,
    model: [],
  }

  set(seal, 'address', toAddress(p))

  if (isString(p)) p = patpStrToArr(p)

  set(seal, 'patp', p)


  set(seal, 'grid', rectGrid({
    origin: { x: 0, y: 0 },
    cellSize: { x:128, y:128 },
    extents: { x: 4, y: 4 },
    flat: true,
  }))

  // console.log(seal.grid)


  // give each geon a set of new metadata
  set(seal, 'geonList', scan(pull(p, sylmap, geonset)).map((item, index) => {
    return {
      ...item,
      hash: quickHash(4),
      index,
    }
  }))


  // produce a graph representation of edgemates
  // set('graph', seal, graph(seal2dArr), geonset)
  //
  // // produces subgraphs
  // set('subgraphs', seal, connectedComponents(seal.graph)
  //   .map(sg => sg.map(idx => seal.geonList[idx]))
  // )


  set(seal, 'geonMatrix', map(chunk(get(seal, 'geonList'), 4), (row, iR) => {
    return map(row, (cell, iC) => {
      return {
        ...cell,
        origin: [iR, iC],
      }
    })
  })
  )

  // set(seal, 'part', part(seal))

  set(seal, 'dyes', dyes(p))

  // set(seal, 'etch', etch(seal, etchset))

  set(seal, 'model', {
    tag: 'svg',
    attr: [],
    children: map(flatten(seal.geonMatrix), geon => {
      const updates = [{
        action: 'prependStr',
        payload:`translate(${seal.grid[geon.index].x}, ${seal.grid[geon.index].y})`,
        path: 'attr.transform',
      }]
      const model = geon.svg(updates)
      return model
    }),
  })

  console.log(seal)

  // noll(seal.model)




  return seal
}


// as in knolling
const noll = model => {
  // model.children.map(child => {
  //   updaters.
  // })
}




const part = avatar => {
  const horizontal = grainPartition(avatar.geonMatrix)
  const vertical = grainPartition(transpose(avatar.geonMatrix))
  return {
    horizontal,
    vertical,
  }
}

const dyes = p => {
  return [
    '#4735F5',
    '#C4C4C4',
    '#EB5757',
  ]
}

const etch = () => {

}

const pull = (p, sylmap, geonset) => map(p, syl => {
    const geonmap = get(sylmap, ['sylmap', syl, 'geonmap'])
    const geons = map(geonmap, key => get(geonset.geons, key))
    return geons
  })

// const graph = geonList => {
//   let graph = new Graph()
//   // create nodes
//   geonList.forEach((row, rI) => row.forEach((cell, cI) => graph.addNode(cell.index, { ref:cell })))
//   // create edges
//   geonList.forEach((row, rI) => row.forEach((cell, cI) => {
//     if (inBoundsX(geonList, cI)) {
//       if (isMate(getRightEdge(cell), getEdgeToRight(geonList, rI, cI))) {
//         const properties = {
//           bond: getRightEdge(cell),
//           dir: 'rightward',
//         }
//         graph.addUndirectedEdgeWithKey(
//           // `${cell.index}-${cellToRight.index}`,
//           // cell.index,
//           // cellToRight.index,
//           // ...properties
//         )
//       }
//     }
//     if (inBoundsY(geonList, rI)) {
//       if (isMate(getBottomEdge(cell), getEdgeToBelow(geonList, rI, cI))) {
//         const properties = {
//           bond: getBottomEdge(cell),
//           dir: 'bottomward',
//         }
//         graph.addUndirectedEdgeWithKey(
//           // `${cell.index}-${cellToBelow.index}`,
//           // cell.index,
//           // cellToBelow.index,
//           // ...properties
//         )
//       }
//     }
//
//   }))
//   console.log(graph)
//   return graph
// }
//
// const subgraphs = avatar => {
//   console.log(avatar.graph.edges())
//   const sgs = connectedComponents(avatar.graph).map(sg => {
//       let graph = new Graph()
//       const nodes = sg.forEach(idx => {
//         graph.addNode(`${idx}`, {...avatar.graph.getNodeAttributes(idx)})
//       })
//       const edges = sg.forEach(idx => {
//
//
//       })
//
//       return nodes
//
//   })
//   return sgs
// }

const multiPour = (patps, geonset, etchset, sylmap) => patps.map(p => pour(p, geonset, etchset, sylmap ) )

export {
  pour,
  multiPour,
}
