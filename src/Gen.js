import React, { Component } from 'react'
import chroma from 'chroma-js'
import paper from 'paper'
import { bigCombination, permutation, baseN } from 'js-combinatorics'
import fileDownload from 'js-file-download'
import Graph from 'graphology'

import { initCanvas } from './lib/lib.canvas'
import { rectGrid, pointText, group, pathRect, pathCircle } from './lib/lib.paper'
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
} from './lib/lib'


// import { base, baseState } from './lib/lib.firebase'
const SIZE = 600

class Gen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didInit: false,
      debug: false,
      patpInput: 'ridlur-figbud',
      dupes: [],
      avatar: false,
    }
  }

  componentDidMount = () => {
    const { ctx, canvas } = initCanvas(this.gen_canvas, { x:SIZE, y:SIZE })
    paper.setup(canvas)
    this.setState({ didInit: true })
  }


  rend = avatar => {
    paper.project.clear()

    const grid = geonset.grid()

    const bg = pathRect({from: [0,0], to: [SIZE, SIZE], fillColor: avatar.palette[0]})

    const refs = avatar.geonList.map((geonRef, geonIndex) => {

      const params = {
        fillColor: '#fff',
        strokeColor: avatar.palette[0],
        strokeWidth: 0,
        selected: this.state.debug,
        insert: true,
      }

      const glyphRef = geonRef.insert(params)

      if (this.state.debug === true) {
        const label = pointText({ fillColor: '#239CE8', content: `idx:${geonIndex} / key:${geonRef.name}`, fontSize: 10 })
        label.translate({x: 24, y: 256})

        etchset.grid().map(point => pathCircle({center: point, radius: 2, fillColor: 'red'}))

        return group([glyphRef, label])
      }

      return group([glyphRef])
    })

    refs.map((geon, index) => {
      geon.position = grid[index]
    })

    const etchRefs = avatar.etch.map(members => members.map(insert => insert()))

    paper.view.draw()
  }


  gen = (geonset, sylmap, p) => {
    if (isString(p)) p = patp.arr(p)
    // here is where @p validation could happen
    // generate the geonset grid, a 2x2 arr of points
    const geonsetGrid = geonset.grid()

    // defaults
    let avatar = {
      patp: p,
      glyphs: [],
      geonList: [],
      color: [],
      // partition: [],
      graph: null,
    }

    set('charCodes', avatar, p.join('').split('').map(c => c.charCodeAt(0)))

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
        ownOrigin: geonsetGrid[index]
      }
    }))

    const avatar2dArr = chunk(avatar.geonList, 4)

    // produce a graph representation of edgemates
    set('graph', avatar, graph(avatar2dArr), geonset)

    // produces subgraphs
    // set('subgraphs', avatar, connectedComponents(avatar.graph)
    //   .map(sg => sg.map(idx => avatar.geonList[idx]))
    // )

    // this was hard
    set('subgraphs', avatar, subgraphs(avatar))

    // generates a deterministic color palette
    set('palette', avatar, palette(p))

    // matches parameterized etch templates to graph
    set('etch', avatar, etch(avatar, etchset))
    // console.log(avatar.graph.export())
    // paint(avatar)
    console.log(avatar.subgraphs)
    return avatar
  }


  create = (geonset, sylmap, p) => {
    const avatar = this.gen(geonset, sylmap, p)
    this.setState({ avatar })
  }

  exportSVG = () => {
    const data = paper.project.exportSVG({ asString: true })
    fileDownload(data, 'avatar.svg')
  }

  exportJSON = (data, filename) => {
    fileDownload(JSON.stringify(data, null, 2), `${filename}.json`)
  }

  randomPatp = () => {
    const patpInput = patp.str(patp.random(4))
    this.setState({ patpInput }, () => this.create(geonset, sylmap, patpInput))
  }

  render = () => {
    if (this.state.didInit && this.state.avatar !== false) {
      this.rend(this.state.avatar)
    }
    return (
      <div>
        <nav>
          <span>
            <button onClick={() => this.exportSVG()}>{'export SVG'}</button>
          </span>

          <input placeholder="@p" type="text" value={this.state.patpInput} onChange={e => this.setState({patpInput: e.target.value})} />
          <button
            onClick={() => this.create(geonset, sylmap, this.state.patpInput)}>
            {'Generate'}
          </button>
          <button
            onClick={() => this.randomPatp()}>
            {'Random @p'}
          </button>
        </nav>

        <canvas
          ref={ gen_canvas => this.gen_canvas = gen_canvas }
          data-paper-resize
          id={`gen_canvas`} />
      </div>
    )
  }
}




export default Gen
