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
  getPage,
  numPages,
  keys,
  prop,
} from './lib/lib'

import base from './lib/lib.firebase'

const PER_PAGE = 4

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
      symSet: 'glyphsetSchemaA',
      symbolState: 'glyphsetSchemaA',
      pageIndex: 0,
      combMethod: bigCombination,
      comboState: 'bigCombination',
      currentPage: [],
      all: [],
    }
  }

  componentDidMount = () => {
    const {ctx, canvas} = initCanvas(this.paperCanvas, {x:2000, y:2000})
    paper.setup(canvas)
    // paper is a globally scoped object and independant from the vDOM
    this.generate(bigCombination, 'glyphsetSchemaA')
    this.setState({didInit: true})
    this.callBase('slug', false)

  }

  callBase = (key, asArray, callback) => {
    base.listenTo(key, {
     context: this,
     asArray: asArray,
     then(key) { console.log(key) }
   })
 }

  draw = () => {
    paper.project.clear()
    const size = 128
    const gap = -0.4
    const glyphset = getSet(this.state.symSet)

    const glyphGrid = glyphset.glyphGrid()
    const groupGrid = glyphset.groupGrid()

    const pageGrid = rectGrid({x:300, y:300}, {x: (size * 2) + gap, y: (size * 2) + gap}, { x: 2, y: 2 }, true)

    const avatarSet = map(this.state.currentPage, (set, outerIndex) => {
      // const fillColor = chr.random().hex()
      const fillColor = 'black'
      const avatar = map(set, (symbolKey, innerIndex) => {
        const params = {
          fillColor,
          strokeWidth: 1,
          scaleFactor: 4,
          selected: this.state.debug,
          position: groupGrid[innerIndex],
        }
        const symbol = glyphset.glyphs[symbolKey].svg
        return symbol(glyphGrid, params)
      })


      const symbolGroup = pGroup(avatar)
      return symbolGroup
    })

    map(avatarSet, (avatar, index) => avatar.position = pageGrid[index] )

    paper.view.draw()
  }

  randomShip = length => {
    this.setState({ ships: randomShipArray(length)(32) })
  }

  randomContinuous = () => {
    const { index, speed } = this.state
    const timeout = setInterval(
      () => this.randomShip(1), speed)
    this.setState({ timeout })
  }

  setShip = ship => {
    const parsed = match(ship)(/.{1,3}/g)
    this.setState({ships: [parsed]})
  }

  setSymbolSet = symSet => this.setState({symSet, symbolState: symSet}, () => {
    this.generate(this.state.combMethod, symSet)
  })

  toggleDebug = () => this.setState({debug: !this.state.debug})

  thisPage = index => {
    const { all } = this.state
    this.setState({
      pageIndex: index,
      currentPage: getPage(all)(index)(PER_PAGE),
    })
  }

  nextPage = () => {
    const { pageIndex, all } = this.state
    const next = pageIndex + 1
    this.setState({
      pageIndex: next,
      currentPage: getPage(all)(next)(PER_PAGE),
  })
}

  prevPage = () => {
    const { pageIndex, all } = this.state
    const prev = pageIndex - 1
    this.setState({
      pageIndex: prev,
      currentPage: getPage(all)(prev)(PER_PAGE),
    })
  }

  setMethod = combMethod => this.setState({combMethod, comboState: combMethod.name}, () => {
    this.generate(combMethod, this.state.symSet)
  })

  generate = (method, symSet) => {
    const set = getSet(symSet)
    const glyphs = prop('glyphs')(set)
    const iter = keys(glyphs)
    this.setState({all: method(iter, 4).toArray() })
  }

  goToIndex = index => this.setState({pageIndex: index})


  render = () => {
    if (this.state.didInit) this.draw()
    return (
      <div>
        <nav>
          <span>
            <Button
              onClick={() => this.toggleDebug()}
              title={'debug'}
              id={true}
              keySelectedInPanel={this.state.debug} />
            </span>
          {
            // <button onClick={() => this.randomShip(1)}>{'random patp'}</button>
            // <button onClick={() => this.randomContinuous()}>{'▶'}</button>
            // <button onClick={() => this.toggleDebug()}>{'debug'}</button>
            // <span>
            //   <input
            //     value={this.state.input}
            //     onChange={e => this.setState({ input: e.target.value })} />
            //   <button
            //     onClick={() => this.setShip(this.state.input)}>
            //     {'submit'}
            //   </button>
            // </span>
            // <h3>{printShip(this.state.ships[0])}</h3>
          }
          <span>
          {
            // <Button
            //   onClick={() => this.setSymbolSet('symsetSymbolsB')}
            //   title={'B'}
            //   id={'symsetSymbolsB'}
            //   keySelectedInPanel={this.state.symbolState} />
            // <Button
            //   onClick={() => this.setSymbolSet('symsetSymbolsC')}
            //   title={'C'}
            //   id={'symsetSymbolsC'}
            //   keySelectedInPanel={this.state.symbolState} />
            }
            <Button
              onClick={() => this.setSymbolSet('glyphsetSchemaA')}
              title={'A'}
              id={'glyphsetSchemaA'}
              keySelectedInPanel={this.state.symbolState} />
            <Button
              onClick={() => this.setSymbolSet('glyphsetSchemaB')}
              title={'B'}
              id={'glyphsetSchemaB'}
              keySelectedInPanel={this.state.symbolState} />
          </span>

          <span>
            <Button
              onClick={() => this.setMethod(bigCombination)}
              title={'bigCombination'}
              id={'bigCombination'}
              keySelectedIn Panel={this.state.comboState} />
            <Button
              onClick={() => this.setMethod(permutation)}
              title={'permutation'}
              id={'permutation'}
              keySelectedInPanel={this.state.comboState} />
            <Button
              onClick={() => this.setMethod(baseN)}
              title={'baseN'}
              id={'baseN'}
              keySelectedInPanel={this.state.comboState} />
          </span>

          <span>
            <button onClick={() => this.setState({pageIndex: 0})}>{'Go 0'}</button>
            <button onClick={() => this.prevPage()}>{'←'}</button>
            <p>{`${this.state.pageIndex}/${numPages(this.state.all.length, PER_PAGE) - 1}`}</p>
            <button onClick={() => this.nextPage()}>{'→'}</button>

          </span>

          <span>
            <p>{this.state.all.length}</p>
          </span>

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



export default Debug
