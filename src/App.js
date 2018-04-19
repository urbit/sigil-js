import React, { Component } from 'react'
import chroma from 'chroma-js'
import paper, {
  Project,
  Path,
  Point,
  Group,
  Layer,
  Shape,
  Rectangle,
} from 'paper'

import {
  lineage,
  randomBinaryOfLength,
  flatten,
  sequence,
  factors,
  thread,
  through,
  chunk,
  compose,
  binDec,
  binHex,
  decBin,
  decHex,
  hexBin,
  hexDec,
  loadImage,
  randomShipName,
  randomShipArray,
  join,
  split,
  def,
  callIfDef,
} from './lib'

import alphabet from './sym'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>{'urbit avatar debug'}</h1>
        <Debug />
      </div>
    )
  }
}

const SIZE = 1024
const MAX_BITS = 32
// const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

class Debug extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didInit: false,
      lineage: lineage(randomBinaryOfLength(MAX_BITS)),
      maskIsOn: true,
      speed: 500,
      index: 0,
      playState: 0,
      timeout: null,
      ships: randomShipArray(1)(32)
    }
    // this.Project = false
    // this.canvas = false
  }

  componentDidMount = () => {
    this.init(this.paperCanvas)
    // paper is a globally scoped object
    this.draw(paper)

  }

  init = canvas => {
    const ctx = canvas.getContext('2d')

    const ratio = ctx.webkitBackingStorePixelRatio < 2
      ? window.devicePixelRatio
      : 1

    canvas.width = SIZE * ratio
    canvas.height = SIZE * ratio
    canvas.style.width = SIZE + 'px'
    canvas.style.height = SIZE + 'px'

    paper.setup(canvas)

    this.canvas = canvas
    this.ctx = ctx
    this.setState({ didInit: true })
  }

  draw = () => {
    // constants
    paper.project.clear()
    const view = paper.view
    const bounds = paper.view.bounds
    const lineCount = 16


    // const points = squareGrid(view.bounds.width, lineCount)
    // const pointMarks = new Group(flatten(points).map(point => new Path.Circle({
    //   center: point,
    //   radius: 1,
    //   fillColor: 'black',
    // })))
    //
    // const flattenedShips = this.state.ships.map(ship => split(join(ship)(''))('') )
    // flattenedShips.forEach((ship, i) => ship.forEach(letter => {
    //     const f = alphabet[letter]
    //     if (f) {
    //       f({fillColor: chroma.random().hex(), blendMode: 'multiply'})
    //     }
    //   })
    // )

    const manualGrid = [
      new Point(128, 128),
      new Point(256, 128),
      new Point(128, 256),
      new Point(256, 256)
    ]
    const { ships } = this.state

    const flattenedShips = ships.map(ship => {
      const syllableGroups = ship.map((syllable, index) => {
        const config =  { fillColor: chroma.random().hex(), blendMode: 'multiply' }
        const syllableShapes = split(syllable)('')
          .map(letter => callIfDef(alphabet[letter], config))
        return new Group({
          children: [...syllableShapes],
          position: manualGrid[index % 4]
        })
    })
    return syllableGroups
  })

  new Group(Object.entries(alphabet).map(([k, f], index) => f({
    position: {x: index * (512 * 0.125), y: 512 + (512 * 0.125)},
    scaling: .5,
    fillColor: 'black',
    blendMode: 'multiply'
  })))

		paper.view.draw()
  }


  toggleMask = () => {
    this.setState({maskIsOn: !this.state.maskIsOn}, () => this.draw())
  }

  refreshLineage = () => {
    this.setState({lineage: lineage(randomBinaryOfLength(MAX_BITS))}, () => this.draw())
  }

  parseToHTMLTable = object => Object.entries(object).map(([k, v]) => {
    return (
      <div className={'row'}>
        <pre>{k}</pre>
        <pre>{JSON.stringify(v)}</pre>
      </div>
    )
  })

  increment = () => {
    const { index, speed } = this.state
    const timeout = setInterval(() => this.setState({
        index: index - 1,
        lineage: lineage(decBin(index - 1))
      }), speed)
    this.setState({ timeout })
  }

  decrement = () => {
    const { index, speed } = this.state
    const timeout = setInterval(() => this.setState({
        index: index + 1,
        lineage: lineage(decBin(index + 1))
      }), speed)
    this.setState({ timeout })
  }

  pause = () => clearInterval(this.state.timeout)

  clear = () => this.setState({
    index: 0,
    lineage: lineage(decBin(0))
  })

  randomShip = length => {
    this.setState({ships: randomShipArray(length)(32)}, () => this.draw())
  }

  randomContinuous = () => {
    const { index, speed } = this.state
    const timeout = setInterval(
      () => this.randomShip(1), speed)
    this.setState({ timeout })
  }



  render = () => {
    const paramTable = this.parseToHTMLTable(this.state.lineage.planet)
    return (
      <div>


        <nav>
          {
            // <button onClick={() => this.increment()}>{'=+'}</button>
            // <button onClick={() => this.pause()}>{'||'}</button>
            // <button onClick={() => this.decrement()}>{'=-'}</button>
            // <button onClick={() => this.refreshLineage()}>{'random lineage'}</button>
            // <button onClick={() => this.clear()}>{'clear'}</button>
          }

          <button onClick={() => this.randomShip(1)}>{'random patp'}</button>
          <button onClick={() => this.randomContinuous()}>{'▶'}</button>

          <pre>{JSON.stringify(this.state.ships)}</pre>

        </nav>

        <canvas
          ref={paperCanvas => this.paperCanvas = paperCanvas}
          data-paper-resize
          id={`paperCanvas`} />
      </div>
    )
  }
}

const squareGrid = (width, count) => {
  const pitch = width / count
  const unit = sequence(count)
  return unit.map((a, iY) => unit.map((a, iX) =>
    new Point(iX * pitch, iY * pitch))
  )
}

const vrect = () => {
  return new Path.Rectangle({
    from: [0, 0],
    to: [200, SIZE],
    fillColor: 'red',
  })
}

export default App
