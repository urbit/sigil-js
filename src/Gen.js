import React, { Component } from 'react'
// import chr from 'chroma-js'
import paper from 'paper'
import { bigCombination, permutation, baseN } from 'js-combinatorics'

import fileDownload from 'js-file-download'

import { initCanvas } from './lib/lib.canvas'
import { rectGrid } from './lib/lib.paper'
// import { genAvatar, drawChars, rectGrid, pGroup, opPipe, pPathRect, pCompoundPath, pPath, pPathCircle } from './lib/lib.paper'
// import {randomShipName, printShip, randomShipArray } from './lib/lib.urbit'
import geonset from './geonsets/geonset_000'
import sylmap from './sylmaps/sylmap_000'
import { suffixes, prefixes, patp } from './lib/lib.urbit'

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
  keys,
  numComparator,
  rotateArr,
  objHasAnyPropInArr,
  dePinwheel,
  isEven,
  isOdd,
  arrEq,
} from './lib/lib'

import {
  isObject,
  isString,
} from './lib/lib.type'

// import { base, baseState } from './lib/lib.firebase'


class Gen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didInit: false,
      debug: false,
      patpInput: '',
      dupes: []
    }
  }

  componentDidMount = () => {
    const { ctx, canvas } = initCanvas(this.paperCanvas, {x:600, y:600})
    paper.setup(canvas)
    const dupes = this.checkDupes(sylmap)
    console.log(dupes)
    // paper is a globally scoped object and independant from the vDOM
    this.setState({ didInit: true, dupes })
  }


  draw = () => {
    paper.view.draw()
  }


  drawGlyph = (geonset, sylmap, syllable) => {

  }



  drawAvatar = (geonset, sylmap, patp) => {
    paper.project.clear()

    if (isString(patp)) patp = patp.replace('~','').replace('-','').match(/.{1,3}/g)

    const geonGrid = geonset.geonGrid()
    const syllableGrid = geonset.syllableGrid()
    const grid = rectGrid({ x:96, y:96 }, { x:128, y:128 }, { x: 4, y: 4 }, true)

    const sylRefs = patp.map((syllable, syllableIndex) => {
      const geonMap = sylmap[syllable]
      const glyphRefs = geonMap.map((geonRef, geonIndex) => {
        const params = {
          fillColor: '#fff',
          selected: this.state.debug,
          insert: true,
        }
        const glyphRef = geonset.glyphs[geonRef].insert(params)
        return glyphRef
      })
      return glyphRefs
    })

    // map to grid
    const newSylRefs = dePinwheel(sylRefs).map((geon, index) => {
      geon.position = grid[index]
    })

    paper.view.draw()
  }



  exportSVG = () => {
    const data = paper.project.exportSVG({asString: true})
    fileDownload(data, 'avatar.svg')
  }

  generateRandomSylmap = (geonset, syllables) => {

    const combinations = this.combinatoric(permutation, geonset)

    const newSylmap = syllables.reduce((acc, syllable) => {
      const random = randInt(combinations.length - 1)
      acc[syllable] = combinations[random]
      return acc
    }, {})

    this.exportJSON(newSylmap, 'sylmap_???')
  }

  combinatoric = (method, geonset) => {
    const glyphs = prop('glyphs', geonset)
    const iter = keys(glyphs)
    const combinations = method(iter, 4).toArray()
    return combinations
  }

  exportJSON = (data, filename) => {
    fileDownload(JSON.stringify(data, null, 2), `${filename}.json`)
  }

  randomPatp = () => {
    const patpInput = patp.str(patp.random(4))
    this.setState({ patpInput }, () => this.drawAvatar(geonset, sylmap, this.state.patpInput))
  }

  checkDupes = sylmap => {
    const geonmaps = Object.values(sylmap)
    const dupes = geonmaps.filter((geonmap, index, arr) => {
      const dupeCount = geonmaps.reduce((acc, item) => {
        const test = arrEq(geonmap, item)
        if (test === true) {
          return acc + 1
        }
        return acc
      }, 0)
      return dupeCount > 1
    })
    return dupes
  }

  render = () => {
    if (this.state.didInit) this.draw()
    return (
      <div>
        <nav>
          <span>
            <Button
              onClick={ () => this.toggleDebug() }
              title={'debug'}
              id={true}
              keySelectedInPanel={this.state.debug} />
            </span>


          <span>
            <button onClick={() => this.exportSVG()}>{'export SVG'}</button>
          </span>

          <input placeholder="@p" type="text" value={this.state.patpInput} onChange={e => this.setState({patpInput: e.target.value})} />
          <button onClick={() => this.drawAvatar(geonset, sylmap, this.state.patpInput)}>{'Generate'}</button>
          <button onClick={() => this.randomPatp()}>{'Random @p'}</button>


          <button onClick={() => this.generateRandomSylmap(geonset, [...suffixes, ...prefixes])}>{'Export random sylmap'}</button>


        </nav>

        <canvas
          ref={paperCanvas => this.paperCanvas = paperCanvas}
          data-paper-resize
          id={`paperCanvas`} />
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
