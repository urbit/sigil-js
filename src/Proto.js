import React, { Component } from 'react'
import chr from 'chroma-js'
import paper from 'paper'
import { bigCombination, permutation, baseN } from 'js-combinatorics'

import fileDownload from 'js-file-download'

import { initCanvas } from './lib/lib.canvas'
import { genAvatar, drawChars, rectGrid, pGroup, opPipe, pPathRect, pCompoundPath, pPath, pPathCircle } from './lib/lib.paper'
// import {randomShipName, printShip, randomShipArray } from './lib/lib.urbit'
import glyphset from './symsets/glyphset'

import { suffixes, prefixes } from './lib/lib.urbit'

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
  reduce,
  countMates,
  sort,
  numComparator,
  rotateArr,
  objHasAnyPropInArr,
} from './lib/lib'

import {
  isObject,
  isString,
} from './lib/lib.type'

import { base, baseState } from './lib/lib.firebase'

const PER_PAGE = 1


const DB_GLYPHSET_KEY = 'a-v001'

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
      // ships: randomShipArray(1)(32),
      debug: false,
      input: '',
      symSet: 'glyphset',
      symbolState: 'glyphset',
      pageIndex: 0,
      combMethod: bigCombination,
      comboState: 'bigCombination',
      currentPage: [],
      sorted: [],
      all: [],
      baseState: baseState.idle,
      sylset: [],
      syllables: [...prefixes, ...suffixes]
    }
  }

  componentDidMount = () => {
    const { ctx, canvas } = initCanvas(this.paperCanvas, {x:600, y:600})
    paper.setup(canvas)
    // paper is a globally scoped object and independant from the vDOM
    this.generate(bigCombination)
    this.getGlyphset(DB_GLYPHSET_KEY)

    window.addEventListener('keydown', e => {
      if (e.keyCode === 39) {
        this.nextPage()
      }
      if (e.keyCode === 37) {
        this.prevPage()
      }
    })




    this.setState({ didInit: true })
  }

  getGlyphset = () => {
    base.fetch(DB_GLYPHSET_KEY, {
      context: this,
      asArray: true
    }).then(data => {
      const dataWithLookup = {}
      Object.values(data).forEach((val, index) => {
        const key = [...prefixes, ...suffixes][index]
         dataWithLookup[key] = val.glyph
      })
      this.setState({ sylset: dataWithLookup })
    }).catch(err => {
      console.error(err)
    })
  }


  addGlyph = (glyph) => {
    base.post(DB_GLYPHSET_KEY, {
      data: glyph
    }).then(() => {
      console.log(glyph)
    }).catch(err => {
      console.error(err)
    })
  }

  pushGlyph = (glyph) => {
    base.push(DB_GLYPHSET_KEY, {
      data: {glyph}
    }).then(() => {
      console.log(glyph)
      this.getGlyphset(DB_GLYPHSET_KEY)
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
    // const glyphset = getSet(this.state.symSet)

    const motifGrid = glyphset.glyphGrid()
    const avatarGrid = glyphset.groupGrid()

    const pageGrid = rectGrid({x:300, y:300}, {x: (size * 2) + gap, y: (size * 2) + gap}, { x: 2, y: 2 }, true)
    // const backdrop = pPathRect({ from: [0,0], to: [512, 512], fillColor: 'white', selected: this.state.debug })
    // backdrop.position = [428,428]
    // const backdrop = pPathRect({from: [350, 350], to:[450, 450], fillColor: '#fff'})
    // backdrop.scale(6)


    // draw
    const refs = map(currentPage, glyphMap => map(glyphMap.glyph, (symbolKey, index) => {
      const params = {
        fillColor: '#333',
        // strokeWidth: 1,
        scaleFactor: 0.1,
        selected: this.state.debug,
        position: motifGrid[index],
        insert: true,
      }
      const ref = glyphset.glyphs[symbolKey].render(params)

      return ref
    }))

    this.drawAvatar(glyphset, this.state.sylset, '~ridlur-figbud')



    // const ranked = map(this.state.all, set => map(set, (symbolKey, index) => {
    //
    //
    //
    // }))






    // const avatar = map(currentPage, (outerItem, outerIndex) => {

    // const sigil = map(outerItem, (innerItem, innerIndex) => {
    //
    //   // stop throwing 1 million errors
    //   if (!def(glyphset.glyphs[innerItem])) return
    //
    //   const glyphRenderer = glyphset.glyphs[innerItem].render
    //
    //   const glyphReference = glyphRenderer(motifGrid, {
    //       fillColor: '#000',
    //       // strokeWidth: 1,
    //       scaleFactor: 0.1,
    //       selected: this.state.debug,
    //       position: motifGrid[innerIndex],
    //       // insert: true,
    //   })
    //
    //   glyphReference.scale(0.1)
    //
    //   return glyphReference
    // })

    // // const s = pCompoundPath({children:sigil})
    // const s = pGroup(sigil)
    // s.position = avatarGrid[outerIndex]
    // // s.insert = true
    // return s

    // })


    // const a = pCompoundPath({children:avatar})
    // const a = pGroup(avatar)
    // a.position = [300, 300]
    // // a.insert = true
    // a.fillColor = '#000'
    //
    // a.scale(4)

    paper.view.draw()
  }


  drawGlyph = (glyphset, syllable) => {

  }

  drawAvatar = (glyphset, syllablemap, patp) => {
    if (isString(patp)) patp = patp.replace('~','').replace('-','').match(/.{1,3}/g)

    const motifGrid = glyphset.glyphGrid()
    const avatarGrid = glyphset.groupGrid()

    patp.map((syllable, index) => {
      // map(currentPage, glyphMap => map(glyphset.glyph, (symbolKey, index) => {
      //   const params = {
      //     fillColor: '#333',
      //     // strokeWidth: 1,
      //     scaleFactor: 0.1,
      //     selected: this.state.debug,
      //     position: motifGrid[index],
      //     insert: true,
      //   }
      //   const ref = glyphset.glyphs[symbolKey].render(params)
      //
      //   return ref
      // }))
    })

  }

  // randomShip = length => {
  //   this.setState({ ships: randomShipArray(length)(32) })
  // }

  randomContinuous = () => {
    const { index, speed } = this.state
    const timeout = setInterval(
      () => this.randomShip(1), speed)
    this.setState({ timeout })
  }

  // setShip = ship => {
  //   const parsed = match(ship)(/.{1,3}/g)
  //   this.setState({ships: [parsed]})
  // }

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
    const set = glyphset
    const glyphs = prop('glyphs')(set)
    const iter = keys(glyphs)
    const combinations = method(iter, 4).toArray()

    // turn into object to support extra metadata
    // const deAliased = {}
    // const delimiter = '-'
    // combinations.forEach(glyphMap => {
    //   const rotationalAliases = sequence(4).map(i => rotateArr(glyphMap, i).join(delimiter))
    //   const test = objHasAnyPropInArr(deAliased, rotationalAliases)
    //   if (test === false) {
    //     deAliased[glyphMap.join(delimiter)] = glyphMap
    //   }
    // })

    // console.log(Object.values(deAliased).length)

    // console.log(objHasAnyPropInArr(test, testArr))





    // const sortedCopy = [...sorted]
    //
    // const first = sortedCopy[0]
    //
    // const bySequence = {}
    // sorted.forEach(glyph => {
    //
    //   const rotations = sequence(4).map(index => rotateArr(glyph.glyph, index))
    //
    //
    //   const key = glyph.glyph.join('-')
    //
    //
    //
    //   if (hasAnyOwnProperty(glyph.glyph, rotations)) {
    //
    //   } else {
    //
    //   }
    // })
    //
    // const glyphRotations = sequence(4).map(index => rotateArr(first.glyph, index))
    //
    // console.log(glyphRotations)

    // const groupBy = (arr, prop) => {
    //   return arr.reduce((groups, item) => {
    //     const val = item[prop]
    //     groups[val] = groups[val] || []
    //     groups[val].push(item)
    //     return groups
    //   }, {})
    // }

    // sortedCopy.forEach(glyph => {
    //   const glyphRotations = sequence(4).reduce((acc, index) => acc.concat(rotateArr(acc)), glyph.glyph)
    //
    // })

    const withMateCount = map(combinations, glyph => ({
      glyph,
      key: glyph.join('-'),
      mateCount: countMates(glyphset, glyph, 2),
    }))

    const sorted = sort(withMateCount, numComparator, 'mateCount')


    this.setState({all: sorted.reverse() })
  }

  goToIndex = index => this.setState({pageIndex: index})

  exportSVG = () => {
    const data = paper.project.exportSVG({asString: true})
    fileDownload(data, 'avatar.svg')
  }

  exportJSON = (data, filename) => {
    fileDownload(JSON.stringify(data, null, 2), `${filename}.json`)
  }

  render = () => {
    if (this.state.didInit && this.state.currentPage.length > 0 ) this.draw()
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

            // <Button
            //   onClick={() => this.setSymbolSet('glyphsetSchemaA')}
            //   title={'A'}
            //   id={'glyphsetSchemaA'}
            //   keySelectedInPanel={this.state.symbolState} />
            // <Button
            //   onClick={() => this.setSymbolSet('glyphsetSchemaB')}
            //   title={'B'}
            //   id={'glyphsetSchemaB'}
            //   keySelectedInPanel={this.state.symbolState} />
            // <Button
            //   onClick={() => this.setSymbolSet('glyphsetSchemaC')}
            //   title={'C'}
            //   id={'glyphsetSchemaC'}
            //   keySelectedInPanel={this.state.symbolState} />
            // <Button
            //   onClick={() => this.setSymbolSet('glyphsetSchemaD')}
            //   title={'D'}
            //   id={'glyphsetSchemaD'}
            //   keySelectedInPanel={this.state.symbolState} />
          }


          </span>

          <span>
            <Button
              onClick={() => this.setMethod(bigCombination)}
              title={'bigCombination'}
              id={'bigCombination'}
              keySelectedInPanel={this.state.comboState} />
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

            <Button
              onClick={() => this.pushGlyph(this.state.currentPage[0])}
              title={'Push'}
              id={'pushGlyph'} />

          </span>

          <span>
            <p>{this.state.all.length}</p>
          </span>

          <span>
            <button onClick={() => this.exportSVG()}>{'export'}</button>
            <button onClick={() => this.exportJSON(this.state.sylset, 'sylset')}>{'export sylset'}</button>

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
