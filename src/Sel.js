import React, { Component } from 'react'
// import chr from 'chroma-js'
import paper from 'paper'
import { bigCombination, permutation, baseN } from 'js-combinatorics'
import fileDownload from 'js-file-download'

import { initCanvas } from './lib/lib.canvas'
import { rectGrid } from './lib/lib.paper'
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
  dePinwheel,
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

const constantAssignments = {
  'zod': [1, 2, 3, 4]
}

// import { base, baseState } from './lib/lib.firebase'
const DB_GLYPHSET_KEY = 'a-v002'


class Gen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didInit: false,
      debug: false,
      all: [],
      currentIndex: 0,
    }
  }

  componentDidMount = () => {
    const { ctx, canvas } = initCanvas(this.sel_canvas, {x:600, y:600})
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

  // getGlyphset = () => {
  //   base.fetch(DB_GLYPHSET_KEY, {
  //     context: this,
  //     asArray: true
  //   }).then(data => {
  //     const dataWithLookup = {}
  //     values(data).forEach((val, index) => {
  //       const key = [...prefixes, ...suffixes][index]
  //        dataWithLookup[key] = val.glyph
  //     })
  //     this.setState({ sylset: dataWithLookup })
  //   }).catch(err => {
  //     console.error(err)
  //   })
  // }
  //
  // pushGlyph = glyph => {
  //   base.push(DB_GLYPHSET_KEY, {
  //     data: { glyph }
  //   }).then(() => {
  //     console.log(glyph)
  //     this.getGlyphset(DB_GLYPHSET_KEY)
  //   }).catch(err => {
  //     console.error(err)
  //   })
  // }


  draw = () => {
    paper.project.clear()

    const { all, currentIndex } = this.state
    const geonMap = all[currentIndex]

    if (isDef(geonMap)) this.drawGlyph(geonset, geonMap)

    paper.view.draw()
  }




  drawGlyph = (geonset, geonMap) => {

    const grid = geonset.geonGrid()

    const glyphRefs = geonMap.glyph.map((geonRef, geonIndex) => {
      const params = {
        fillColor: '#fff',
        selected: this.state.debug,
        insert: true,
      }
      const glyphRef = geonset.glyphs[geonRef].insert(params)
      return glyphRef
    })
    // map to grid
    const newSylRefs = glyphRefs.map((geon, index) => {
      geon.position = grid[index]
    })
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
          <h2>Sel</h2>
          <span>
            <Button
              onClick={ () => this.toggleDebug() }
              title={'debug'}
              id={true}
              keySelectedInPanel={this.state.debug} />
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




export default Gen
