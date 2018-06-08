import React, { Component } from 'react'
// import chr from 'chroma-js'
import paper from 'paper'
import { bigCombination, permutation, baseN } from 'js-combinatorics'
import fileDownload from 'js-file-download'

import { initCanvas } from './lib/lib.canvas'
import { rectGrid } from './lib/lib.paper'
import { suffixes, prefixes, patp } from './lib/lib.urbit'

import geonset from './geonsets/geonset_000'
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
  numComparator,
  rotateArr,
  objHasAnyPropInArr,
  dePinwheel,
  isEven,
  isOdd,
  arrEq,
  isObject,
  isString,
  values,
  entries,
  keys,
} from './lib/lib'


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

    // const n = entries(sylmap).reduce((acc, [k, v]) => {
    //   acc[k] = {
    //     geonset: v,
    //     mateCount: 0
    //   }
    //   return acc
    // }, {})
    //
    // const updated = {
    //   name: 'sylmap_002',
    //   date: new Date(),
    //   sylmap: {...n},
    // }
    //
    // console.log(updated)
    //
    // this.exportJSON(updated, 'sylmap_002')


    const { ctx, canvas } = initCanvas(this.gen_canvas, {x:600, y:600})
    paper.setup(canvas)
    // const dupes = this.checkDupes(sylmap)
    // paper is a globally scoped object and independant from the vDOM
    this.setState({ didInit: true })
  }


  draw = () => {
    paper.view.draw()
  }


  drawGlyph = (geonset, sylmap, syllable) => {

  }



  drawAvatar = (geonset, sylmap, patp) => {
    paper.project.clear()

    if (isString(patp)) patp = patp.replace('~','').replace('-','').match(/.{1,3}/g)

    const grid = geonset.grid()

    const sylRefs = patp.map((syllable, syllableIndex) => {
      const geonmap = sylmap.sylmap[syllable].geonset
      const glyphRefs = geonmap.map((geonRef, geonIndex) => {
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

    this.exportJSON(newSylmap, 'sylmap_')
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

  // checkDupes = sylmap => {
  //   const geonmaps = values(sylmap)
  //   console.log(geonmaps)
  //   const dupes = geonmaps.geonmap.filter((geonmap, index, arr) => {
  //     const dupeCount = geonmaps.geonmap.reduce((acc, item) => {
  //       const test = arrEq(geonmaps.geonmap.glyph, item)
  //       if (test === true) {
  //         return acc + 1
  //       }
  //       return acc
  //     }, 0)
  //     return dupeCount > 1
  //   })
  //   return dupes
  // }

  render = () => {
    if (this.state.didInit) this.draw()
    return (
      <div>
        <nav>
          <h2>Gen</h2>
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
          <button
            onClick={() => this.drawAvatar(geonset, sylmap, this.state.patpInput)}>
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

const Button = ({ keySelectedInPanel, title, onClick, id }) => {
  const classes = keySelectedInPanel === id ? 'selected' : 'unselected'
  return (
    <button className={classes} onClick={onClick}>{title}</button>
  )
}




export default Gen
