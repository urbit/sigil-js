import React, { Component } from 'react'
import paper from 'paper'
import fileDownload from 'js-file-download'
import { connectedComponents } from 'graphology-components'

import { initCanvas } from './lib/lib.canvas'
import { rectGrid, pointText, group, pathRect } from './lib/lib.paper'
import { suffixes, prefixes, patp } from './lib/lib.urbit'

import geonset from './geonsets/geonset_000'
import etchset from './etchsets/etchset_000'
import sylmap from './sylmaps/sylmap_000.json'

import {
  countMates,
  flatten,
  sequence,
  chunk,
  abc,
  randInt,
  end,
  compose,
  sort,
  prop,
  set,
  numComparator,
  rotateArr,
  objHasAnyPropInArr,
  scan,
  isEven,
  isOdd,
  arrEq,
  isObject,
  isArray,
  isString,
  values,
  entries,
  keys,
  swap,
  graph,
  subgraphs,
  dedupe,
  palette,
  etch,
  quickHash,
  partition
} from './lib/lib'


// import { base, baseState } from './lib/lib.firebase'
const SIZE = 600

class AvatarGenerator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didInit: false,
    }
  }

  componentDidMount = () => {
    const { ctx, canvas } = initCanvas(this.gen_canvas, { x:SIZE, y:SIZE })
    paper.setup(canvas)
    const svgs = this.pipeRender(this.props.patps)
    console.log(svgs)
  }


  // rend = avatar => {
  //   paper.project.clear()
  //
  //   const grid = geonset.grid()
  //
  //   const bg = pathRect({from: [0,0], to: [SIZE, SIZE], fillColor: avatar.palette[0]})
  //
  //   const refs = avatar.geonList.map((geonRef, geonIndex) => {
  //
  //     const params = {
  //       fillColor: '#fff',
  //       strokeColor: avatar.palette[0],
  //       strokeWidth: 1,
  //       selected: this.state.debug,
  //       insert: true,
  //     }
  //
  //     const glyphRef = geonRef.insert(params)
  //
  //     if (this.state.debug === true) {
  //       const label = pointText({ fillColor: 'black', content: `idx:${geonIndex} / key:${geonRef.name}`, fontSize: 10 })
  //       label.translate({x: 24, y: 64})
  //       return group([glyphRef, label])
  //     }
  //
  //     return group([glyphRef])
  //   })
  //
  //   refs.map((geon, index) => {
  //     geon.position = grid[index]
  //   })
  //
  //   // avatar.etch.map()
  //   const svg = paper.project.exportSVG({ asString: true })
  //   paper.view.draw()
  //   return svg
  // }


  gen = p => {
    if (isString(p)) p = patp.arr(p)
    // here is where @p validation could happen
    // generate the geonset grid, a 2x2 arr of points
    // const geonsetGrid = geonset.grid()

    // defaults
    let avatar = {
      patp: p,
      glyphs: [],
      geonList: [],
      color: [],
      // partition: [],
      graph: null,
    }

    // turn quadrants into 1d array in correct order
    set('geonList', avatar, scan(p.map(syl => {
      return sylmap.sylmap[syl].geonmap.map(k => geonset.geons[k])
    })))

    // give each geon a set of new metadata
    set('geonList', avatar, avatar.geonList.map((item, index) => {
      return {
        ...item,
        hash: quickHash(4),
        index,
      }
    }))

    const matrix = chunk(avatar.geonList, 4)



    // produce a graph representation of edgemates
    // set('graph', avatar, graph(avatar2dArr), geonset)
    //
    // // produces subgraphs
    // set('subgraphs', avatar, connectedComponents(avatar.graph)
    //   .map(sg => sg.map(idx => avatar.geonList[idx]))
    // )

    set('matrix', avatar, matrix.map((row, iR) => row.map((cell, iC) => ({...cell, origin: [iR, iC] }))), geonset)

    set('partition', avatar, partition(avatar))
    console.log(avatar.partition)
    set('palette', avatar, palette(p))

    set('etch', avatar, etch(avatar, etchset))

    // paint(avatar)

    return avatar
  }

  // exportSVG = () => {
  //   const data = paper.project.exportSVG({ asString: true })
  //   // fileDownload(data, 'avatar.svg')
  // }

  // pipeRender = patps => patps.map(p => this.rend(this.gen(p)))
  pipeRender = patps => patps.map(p => this.gen(p))

  render = () => {
    return (
      <canvas
        ref={ gen_canvas => this.gen_canvas = gen_canvas }
        data-paper-resize
        id={`gen_canvas`} />
    )
  }
}




export default AvatarGenerator
