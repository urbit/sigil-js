import React, { Component } from 'react'
import chr from 'chroma-js'
import paper from 'paper'
import {
  bigCombination,
} from 'js-combinatorics'

import {
  initCanvas,
} from './lib/lib.canvas'

import {
  pPoint,
  pGroup,
  pPathRect,
  pPathCircle,
  pRect,
  genAvatar,
  drawChars,
  rectGrid,
  unitePaths,
  intersectPaths,
  excludePaths,
  subtractPaths,
  symGrid,
} from './lib/lib.paper'

import {
  lineage,
  flatten,
  sequence,
  map,
  factors,
  thread,
  through,
  chunk,
  compose,
  join,
  split,
  def,
  callIfDef,
  match,
} from './lib/lib'

import {
  suffixes,
  prefixes,
  randomShipName,
  printShip,
  randomShipArray,
} from './lib/lib.urbit'

import { getChar, getSet } from './lib/lib.symset'

const SIZE_Y = 2048
const SIZE_X = 1024
const MAX_BITS = 32

class Debug extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didInit: false,
      maskIsOn: true,
      speed: 500,
      index: 0,
      playState: 0,
      timeout: null,
      ships: randomShipArray(1)(32),
      debug: false,
      input: '',
    }
  }

  componentDidMount = () => {
    const {ctx, canvas} = initCanvas(this.paperCanvas, {x:1024, y:1024})
    paper.setup(canvas)
    // paper is a globally scoped object and independant from the vDOM
    this.draw()
    // this.drawSymbols()
  }

  draw = () => {
    paper.project.clear()
    const symGrid = rectGrid({x:0, y:0}, { x: 32, y: 32 }, { x: 9, y: 9 }, false)
    const tileGrid = rectGrid({x:256, y:256}, {x: 256, y: 256}, { x: 2, y: 2 }, true)
    const { ships } = this.state
    const allShipGroups = map(ships, name => genAvatar(name, tileGrid, symGrid, 'symsetAlphabetA'))
		paper.view.draw()
  }

  // drawSymbols = () => {
  //   // const alphabetGrid = rectGrid({ x:0, y:512 }, {x: 64, y: 64}, 15, 16, true)
  //   // const allChars = drawChars(abc, alphabetGrid)
  //   const combinationsGrid = rectGrid({x:64, y:768}, {x: 32, y: 32}, 32, 256, true)
  //   const unitGrid = rectGrid({x:0, y:0}, {x: 2, y: 2}, 9, 9, false)
  //
  //   let idx = 0
  //   const operations = ['unite', 'intersect', 'subtract', 'divide']
  //   const combinations = bigCombination(getSet('symsetA'), 2).toArray()
  //   const pairs = map(combinations, combination => {
  //     return map(operations, op => {
  //       const a = combination[0]
  //       const b = combination[1]
  //       const newShape = a(unitGrid)[op](b(unitGrid))
  //
  //       newShape.selected = false
  //       newShape.insert = true
  //       newShape.fillRule = 'evenodd'
  //       newShape.fillColor = 'black'
  //       newShape.position = combinationsGrid[idx]
  //       idx++
  //     })
  //   })
  //   console.log(pairs.length * 4)
  //   paper.view.draw()
  // }

  randomShip = length => {
    this.setState({ ships: randomShipArray(length)(32) }, () => this.draw())
  }

  randomContinuous = () => {
    const { index, speed } = this.state
    const timeout = setInterval(
      () => this.randomShip(1), speed)
    this.setState({ timeout })
  }

  setShip = (ship) => {
    const parsed = match(ship)(/.{1,3}/g)
    this.setState({ships: [parsed]}, () => this.draw())
  }

  render = () => {
    return (
      <div>
        <nav>
          <button onClick={() => this.randomShip(1)}>{'random patp'}</button>
          <button onClick={() => this.randomContinuous()}>{'▶'}</button>
          <span>
            <input
              value={this.state.input}
              onChange={e => this.setState({ input: e.target.value })} />
            <button
              onClick={() => this.setShip(this.state.input)}>
              {'submit'}
            </button>
          </span>
          <h2>{printShip(this.state.ships[0])}</h2>

        </nav>

        <canvas
          ref={paperCanvas => this.paperCanvas = paperCanvas}
          data-paper-resize
          id={`paperCanvas`} />
      </div>
    )
  }
}



export default Debug
