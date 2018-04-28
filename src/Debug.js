import React, { Component } from 'react'
import chr from 'chroma-js'
import paper from 'paper'
import { bigCombination, permutation, baseN } from 'js-combinatorics'

import { initCanvas } from './lib/lib.canvas'
import { genAvatar, drawChars, rectGrid, pGroup, opPipe } from './lib/lib.paper'
import {randomShipName, printShip, randomShipArray } from './lib/lib.urbit'
import { getChar, getSet } from './lib/lib.symset'

import {
  lineage,
  flatten,
  sequence,
  map,
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
      symSet: false,
    }
  }

  componentDidMount = () => {
    const {ctx, canvas} = initCanvas(this.paperCanvas, {x:2000, y:6000})
    paper.setup(canvas)
    // paper is a globally scoped object and independant from the vDOM
    this.draw()
    // this.drawSymbols()
  }

  // draw = () => {
  //   paper.project.clear()
  //   const symGrid = rectGrid({x:0, y:0}, { x: 32, y: 32 }, { x: 2, y: 2 }, false)
  //   const tileGrid = rectGrid({x:256, y:256}, {x: 256, y: 256}, { x: 2, y: 2 }, true)
  //   const { ships } = this.state
  //   // const allShipGroups = map(ships, name => genAvatar(name, tileGrid, symGrid, 'symsetSymbolsB'))
	// 	paper.view.draw()
  // }

  draw = () => {
    paper.project.clear()

    const size = 16
    const gap = 10

    const symbolGrid = rectGrid({x:0, y:0}, { x:size, y:size }, { x: 2, y: 2 }, false)
    const avatarGrid = rectGrid({x:0, y:0}, {x: size-0.1, y: size-0.1}, { x: 2, y: 2 }, true)
    console.log(symbolGrid)
    const pageGrid = rectGrid({x:100, y:100}, {x: (size * 2) + gap, y: (size * 2) + gap}, { x: 45, y: 256 }, true)
    if (this.state.symSet) {
      const permutations = permutation(getSet(this.state.symSet), 4).toArray()
      const avatarSet = map(permutations, (set, outerIndex) => {
        // const fillColor = chr.random().hex()
        const fillColor = 'black'


        const avatar = map(set, (symbol, innerIndex) => {
          const params = {
            fillColor,
            strokeWidth: 1,
            // strokeColor: 'white',
            // blendMode:'multiply',
            selected: this.state.debug,
            position: avatarGrid[innerIndex],
          }

          return symbol(symbolGrid, params)
        })


      const symbol = pGroup(avatar)
      // console.log(symbol)
      // console.log(count)
      // symbol.position = pageGrid[count]
      return symbol
    })

    console.log(avatarSet.length, avatarSet[0])

    map(avatarSet, (avatar, index) => avatar.position = pageGrid[index] )

    paper.view.draw()
    }
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

  setShip = ship => {
    const parsed = match(ship)(/.{1,3}/g)
    this.setState({ships: [parsed]}, () => this.draw())
  }

  setSymbolSet = setName => this.setState({symSet: setName}, () => this.draw())

  toggleDebug = () => this.setState({debug: !this.state.debug}, () => this.draw())

  render = () => {
    return (
      <div>
        <nav>
          <h3>Urbit Avatar Debug</h3>
          <button onClick={() => this.randomShip(1)}>{'random patp'}</button>
          <button onClick={() => this.randomContinuous()}>{'▶'}</button>
          <button onClick={() => this.toggleDebug()}>{'debug'}</button>
          <span>
            <input
              value={this.state.input}
              onChange={e => this.setState({ input: e.target.value })} />
            <button
              onClick={() => this.setShip(this.state.input)}>
              {'submit'}
            </button>
          </span>
          <button onClick={() => this.setSymbolSet('symsetSymbolsA')}>{'A'}</button>
          <button onClick={() => this.setSymbolSet('symsetSymbolsB')}>{'B'}</button>
          <button onClick={() => this.setSymbolSet('symsetSymbolsC')}>{'C'}</button>
          <button onClick={() => this.setSymbolSet('symsetSymbolsD')}>{'D'}</button>
          <button onClick={() => this.setSymbolSet('symsetSymbolsE')}>{'E'}</button>
          <button onClick={() => this.setSymbolSet('symsetSymbolsF')}>{'F'}</button>

          <h3>{printShip(this.state.ships[0])}</h3>

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
