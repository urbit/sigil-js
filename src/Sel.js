import React, { Component } from 'react'
// import chr from 'chroma-js'
import paper from 'paper'
import { bigCombination, permutation, baseN } from 'js-combinatorics'
import fileDownload from 'js-file-download'

import { initCanvas } from './lib/lib.canvas'
import { rectGrid, group, pointText } from './lib/lib.paper'
import { suffixes, prefixes, patp } from './lib/lib.urbit'
import { base, baseState } from './lib/lib.firebase'
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
  numComparator,
  rotateArr,
  objHasAnyPropInArr,
  scan,
  isEven,
  isOdd,
  arrEq,
  isObject,
  isString,
  isDef,
  values,
  entries,
  keys,
  combinatoric,
  endIdx,
  length,
} from './lib/lib'

import geonset from './geonsets/geonset_000'
import sylmap from './sylmaps/sylmap_000.json'

const constantAssignments = {
  'zod': [1, 2, 3, 4]
}

// import { base, baseState } from './lib/lib.firebase'
const DB_GLYPHSET_KEY = 'a-v002'


class Sel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didInit: false,
      debug: false,
      all: [],
      currentIndex: 0,
      mode: 'syl',
      sylmap: sylmap,
    }
  }

  componentDidMount = () => {
    const size = {
      x: window.innerWidth - 64,
      y: 6512,
    }
    const { ctx, canvas } = initCanvas(this.sel_canvas, size)
    paper.setup(canvas)
    // const dupes = this.checkDupes(sylmap)
    // console.log(dupes)
    // this.getGlyphset(DB_GLYPHSET_KEY)

    // paper is a globally scoped object and independant from the vDOM
    window.addEventListener('keydown', e => {
      if (e.keyCode === 39) this.nextPage()
      if (e.keyCode === 37) this.prevPage()
    })

    this.setState({ didInit: true })
  }

  draw = () => {
    paper.project.clear()

    const geonsetLabel = pointText({
      fillColor: 'white',
      content: `geonset: ${geonset.name}`,
      fontSize: 12,
      position: {x: 120, y: 20},
    })

    const sylsetLabel = pointText({
      fillColor: 'white',
      content: `sylmap: ${sylmap.name}`,
      fontSize: 12,
      position: {x: 256, y: 20},
    })

    const { all, currentIndex } = this.state
    const geonmap = all[currentIndex]

    if (isDef(geonmap) && this.state.mode === 'one') {
      this.drawOneGlyph(sylmap, geonset, geonmap.geonmap)
    }

    if (this.state.mode === 'syl') {
      this.drawAllGlyphs(sylmap, geonset)
    }

    if (this.state.mode === 'geon') {
      this.drawAllGeons(geonset)
    }

    paper.view.draw()
  }

  drawAllGlyphs = (sylmap, geonset) => {

    const geonGrid = geonset.geonGrid()
    const allGrid = rectGrid({ x:96, y:96 }, { x:96, y:96 }, { x:8, y:64 }, true)
    const params = {
      fillColor: '#fff',
      selected: this.state.debug,
      insert: true,
    }
    // render, change position and group
    const allGlyphRefs = entries(sylmap.sylmap).map(([key, val], index) => {
      const geonRefs = this.insertGlyph(geonset, val.geonmap, params)
      const label = pointText({ fillColor: 'white', content: `${index+1} : ${key}`, fontSize: 48 })
      const newGeonRefs = geonRefs.map((geon, index) => {
        geon.position = geonGrid[index]
        return geon
      })
      return group([...newGeonRefs, label])
    })

    const newAllGlyphRefs = allGlyphRefs.map((glyphGroup, index) => {
      glyphGroup.scaling = 0.25
      glyphGroup.position = allGrid[index]
    })
    // const glyphRefs = this.insertGlyph(geonset, geonMap, params)
    //
    // // map to grid
    // const newSylRefs = glyphRefs.map((geon, index) => {
    //   geon.position = grid[index]
    // })
  }

  drawOneGlyph = (sylmap, geonset, geonmap) => {
    const grid = geonset.geonGrid()
    const params = {
      fillColor: '#fff',
      selected: this.state.debug,
      insert: true,
    }

    // const label = pointText({ fillColor: 'white', content: `${index+1} : ${key}`, fontSize: 48 })
    const glyphRefs = this.insertGlyph(geonset, geonmap, params)

    // map to grid
    const newSylRefs = glyphRefs.map((geon, index) => {
      geon.position = grid[index]
    })
    return newSylRefs
  }

  drawAllGeons = geonset => {
    const allGrid = rectGrid({ x:96, y:96 }, { x:96, y:96 }, { x:8, y:64 }, true)
    const params = {
      fillColor: '#fff',
      selected: this.state.debug,
      insert: true,
    }

    const allGeonRefs = entries(geonset.geons).map(([key, val], index) => {
      const label = pointText({ fillColor: 'white', content: `${key} - ${val.name}`, fontSize: 24 })
      const ref = val.insert(params)
      return group([ref, label])
    })

    const newGeonRefs = allGeonRefs.map((geon, index) => {
      geon.scaling = 0.5
      geon.position = allGrid[index]
    })

  }

  insertGlyph = (geonset, geonmap, params) => {
    return geonmap.map(ref => geonset.geons[ref].insert(params))
  }

  exportSVG = () => {
    const data = paper.project.exportSVG({asString: true})
    fileDownload(data, 'avatar.svg')
  }

  thisPage = index => this.setState({ currentIndex: index })

  nextPage = () => this.setState({ currentIndex: this.state.currentIndex + 1 })

  prevPage = () => this.setState({ currentIndex: this.state.currentIndex - 1 })

  exportJSON = (data, filename) => {
    fileDownload(JSON.stringify(data, null, 2), `${filename}.json`)
  }

  generateRandomSylmap = (geonset, syllables) => {
    const { all } = this.state
    const newSylmap = syllables.reduce((acc, syllable) => {
      const random = randInt(all.length - 1)
      acc[syllable] = all[random]
      return acc
    }, {})

    this.exportJSON(newSylmap, 'sylmap_')
  }

  render = () => {
    if (this.state.didInit) this.draw()
    return (
      <div>
        <nav>
          <span>
          <button
            onClick={ () => this.setState({ mode: 'syl'}) }>
            {'Render Sylmap'}
          </button>
          <button
            onClick={ () => this.setState({ mode: 'one'}) }>
            {'Render Single'}
          </button>
          <button
            onClick={ () => this.setState({ mode: 'geon'}) }>
            {'Render Geonset'}
          </button>
          </span>
          <span>
            <button onClick={() => this.exportSVG()}>{'export SVG'}</button>
            <button
              onClick={() => this.generateRandomSylmap(geonset, [...suffixes, ...prefixes])}>
              {'Export random sylmap'}
            </button>
          </span>
          <span>
            <button
              onClick={ () => this.setState({ all: combinatoric(permutation, geonset)}) }>
              {'nPr'}
            </button>
            <button
              onClick={ () => this.setState({ all: combinatoric(bigCombination, geonset)}) }>
              {'nCr'}
            </button>
            <button
              onClick={ () => this.setState({ all: combinatoric(baseN, geonset)}) }>
              {'baseN'}
            </button>
          </span>
          <span>
          <button onClick={() => this.setState({currentIndex: 0})}>{'Zero'}</button>
          <button onClick={() => this.prevPage()}>{'←'}</button>
          <button onClick={() => this.nextPage()}>{'→'}</button>
          <button onClick={() => this.setState({currentIndex: endIdx(this.state.all)})}>{'Max'}</button>
          </span>
          <span>
            <input
              placeholder={this.state.currentIndex}
              type="text"
              value={this.state.currentIndex}
              onChange={e => this.setState({currentIndex: e.target.value})}
            />
            {length(this.state.all)}
          </span>
        </nav>

        <canvas
          ref={sel_canvas => this.sel_canvas = sel_canvas}
          data-paper-resize
          id={`sel_canvas`} />
      </div>
    )
  }
}

const Button = ({ keySelectedInPanel, title, onClick, id }) => {
  const classes = keySelectedInPanel === id ? 'selected' : 'unselected'
  return (
    <button className={classes} onClick={onClick}>{title}</button>
  )
}




export default Sel
