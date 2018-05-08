import React, { Component } from 'react'
import chr from 'chroma-js'
import paper from 'paper'
import { bigCombination, permutation, baseN } from 'js-combinatorics'

import fileDownload from 'js-file-download'

import { initCanvas } from './lib/lib.canvas'
import { genAvatar, drawChars, rectGrid, pGroup, opPipe, pPathRect, pCompoundPath, pPath, pPathCircle } from './lib/lib.paper'
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

import {
  isObject,
} from './lib/lib.type'

import { base, baseState } from './lib/lib.firebase'

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
      baseState: baseState.idle,
    }
  }

  componentDidMount = () => {
    const { ctx, canvas } = initCanvas(this.paperCanvas, {x:600, y:600})
    paper.setup(canvas)
    // paper is a globally scoped object and independant from the vDOM
    this.generate(bigCombination, 'glyphsetSchemaA')
    this.getGlpyhset('A')
    this.setState({ didInit: true })
  }

  getGlpyhset = key => {
    base.fetch(key, {
      context: this,
      asArray: false
    }).then(data => {
      // console.log(data)
    }).catch(err => {
      console.error(err)
    })
  }


  addGlpyh = (glyph, key) => {
    base.post(key, {
      data: glyph
    }).then(() => {
      console.log(glyph)
    }).catch(err => {
      console.error(err)
    })
  }

  pushGlpyh = (glyph, key) => {
    base.push(key, {
      data: glyph
    }).then(() => {
      console.log(glyph)
    }).catch(err => {
      console.error(err)
    })
  }

  draw = () => {
    const { currentPage } = this.state

    paper.project.clear()
    const size = 128
    // const gap = -0.02
    const gap = 0
    const glyphset = getSet(this.state.symSet)

    const motifGrid = glyphset.glyphGrid()
    const avatarGrid = glyphset.groupGrid()

    const pageGrid = rectGrid({x:300, y:300}, {x: (size * 2) + gap, y: (size * 2) + gap}, { x: 2, y: 2 }, true)
    // const backdrop = pPathRect({ from: [0,0], to: [512, 512], fillColor: 'white', selected: this.state.debug })
    // backdrop.position = [428,428]
    // const backdrop = pPathRect({from: [350, 350], to:[450, 450], fillColor: '#fff'})
    // backdrop.scale(6)


    const avatar = map(currentPage, (outerItem, outerIndex) => {

      const sigil = map(outerItem, (innerItem, innerIndex) => {

        // stop throwing 1 million errors
        if (!def(glyphset.glyphs[innerItem])) return

        const glyphFn = glyphset.glyphs[innerItem].svg

        const glyphReference = glyphFn(motifGrid, {
            fillColor: '#000',
            // strokeWidth: 1,
            scaleFactor: 1,
            selected: this.state.debug,
            position: motifGrid[innerIndex],
            // insert: true,
        })

        return glyphReference
      })

      // const s = pCompoundPath({children:sigil})
      const s = pGroup(sigil)
      s.position = avatarGrid[outerIndex]
      // s.insert = true
      return s

    })


    // const a = pCompoundPath({children:avatar})
    const a = pGroup(avatar)
    a.position = [300, 300]
    // a.insert = true
    a.fillColor = '#000'
    // a.strokeWidth = 1
    // a.strokeColor = '#000'

    // a.fillColor = 'black'
    // a.rotate(45)
    a.scale(4)


    // pPathCircle({center: [400 - 128, 400 - 128], radius: 16, fillColor: '#000'})
    // pPathCircle({center: [400 + 128, 400 + 128], radius: 16, fillColor: '#000'})
    // pPathCircle({center: [400 - 128, 400 + 128], radius: 16, fillColor: '#000'})
    // pPathCircle({center: [400 + 128, 400 - 128], radius: 16, fillColor: '#000'})






    // const shapeBackdropA = pPath({pathData: 'M 512 512L 0 0L 0 512L 512 512Z', fillColor: '#DD6F66'})
    // const shapeBackdropB = pPath({pathData: 'M 512 512L 0 0L 0 512L 512 512Z', fillColor: '#2B821C'})
    // const shapeBackdropC = pPath({pathData: 'M 512 512L 0 0L 0 512L 512 512Z', fillColor: '#102D56'})
    // const shapeBackdropD = pPath({pathData: 'M 512 512L 0 0L 0 512L 512 512Z', fillColor: '#C4B6FD'})
    //
    // shapeBackdropB.scale(1.67)
    // shapeBackdropB.rotate(270)
    // shapeBackdropC.scale(1.67)
    // shapeBackdropC.rotate(180)
    // shapeBackdropA.scale(1.67)
    // shapeBackdropD.scale(1.67)
    // shapeBackdropD.rotate(180)
    //
    //
    // shapeBackdropB.position=[400,400]
    // shapeBackdropC.position=[400,400]
    // shapeBackdropA.position=[400,400]
    // shapeBackdropD.position=[400,400 - 256]

    // const avatarPath = pCompoundPath({ children: avatar, fillColor: 'black' })

    // const maskingGroup = pGroup([ a, shapeBackdropC, shapeBackdropD, shapeBackdropB, shapeBackdropA ])
    // const maskingGroup = pGroup([a, c, b])
    // maskingGroup.clipped = true




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

  exportSVG = () => {
    const data = paper.project.exportSVG({asString: true})
    fileDownload(data, 'avatar.svg')
  }


  render = () => {
    if (this.state.didInit && this.state.currentPage.length > 0 ) this.draw()
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
            <Button
              onClick={() => this.setSymbolSet('glyphsetSchemaC')}
              title={'C'}
              id={'glyphsetSchemaC'}
              keySelectedInPanel={this.state.symbolState} />
            <Button
              onClick={() => this.setSymbolSet('glyphsetSchemaD')}
              title={'D'}
              id={'glyphsetSchemaD'}
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

          <span>
            <button onClick={() => this.exportSVG()}>{'export'}</button>
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
