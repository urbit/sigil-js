import React, { Component } from 'react'
import { map, filter, forEach, reduce, chunk,shuffle } from 'lodash'
import fileDownload from 'js-file-download'
import { toPlanetName } from 'urbit-ob'

import { inhale, walk, permute, wedge } from '../lib/lung2'
import { base, baseState } from '../lib/lib.firebase'
import {
  collider,
  deepClone,
  randInt,
  randomShip,
  entries,
} from '../lib/lib'

import {
  lastIndex,
  len,
  isAtEnd,
  isAtStart,
  seq,
  isEmpty,
} from '../lib/lib.array'

import {
  suffixes,
  prefixes,
} from '../lib/lib.urbit'

import { ToggleButton } from '../components/UI'

import { pourject } from '../lib/pourject'

import {
  ReactSVGComponents,
  insert,
  mapInsert,
} from '../renderers/ReactSVGComponents'

import { SVGStringComponents } from '../renderers/SVGStringComponents'

const DB_PASS_ONE_KEY = 'c000'
const DB_PASS_TWO_KEY = 'c001'
const DB_PASS_THREE_KEY = 'c002'



// Lung is a tool to make glyphs that represent syllables
//
class Lung extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lung: null,
      geons: [],
      currentIndex: 0,
      colliderMethod: 'bigCombination',
      laminationTwo: [],
      laminationOne: [],
      laminationZero: [],
      approvedTwo: [],
      approvedOne: [],
      selectedFiche: 'B',
      lam: [],
    }
  }


  componentDidMount = () => {

    inhale((reference) => {
      this.setState({ reference, lam: permute(reference) })
    })

  }


  pullFromFireBase = (key, cb) => {
    base.fetch(key, {
      context: this,
      asArray: true,
    }).then(data => cb(data))
  }


  pushToFirebase = key => {
    // const { comb, currentIndex } = this.state
    // base.push(key, {
    //   data: { group: group(comb[currentIndex])}
    // }).then(() => {
    //   console.log('success')
    // })
  }

  render = () => {
    const {
      laminationZero,
      laminationOne,
      laminationTwo,
      selectedFiche,
      laminationThree,
      approvedTwo,
      approvedOne,
      geons,
      lam,
    } = this.state

    return (
      <div>
      <Fiche
        page={lam}
        pageLength={len(lam)}
        isFocussed={selectedFiche === '1'}
        switchStages={() => this.setState({ selectedFiche: '1' })}
        fbk={'c000'}
        title={'Lamination'}
        id={'1'} />

      <RandomGrid page={this.state.lam} />

      <FicheList page={this.state.lam} />
        {


        // <Fiche
        //   page={laminationZero}
        //   pageLength={len(laminationZero)}
        //   isFocussed={selectedFiche === 'A'}
        //   switchStages={() => this.setState({ selectedFiche: 'A' })}
        //   fbk={'c000'}
        //   title={'Lamination A'}
        //   id={'A'} />
        //
        // <h1 className={'arrow'}>{'↓'}</h1>
        //
        // <Fiche
        //   page={laminationTwo}
        //   pageLength={len(laminationTwo)}
        //   isFocussed={selectedFiche === 'B'}
        //   switchStages={() => this.setState({ selectedFiche: 'B' })}
        //   fbk={'c001'}
        //   title={'Lamination B'}
        //   id={'B'} />
        //
        // <h1 className={'arrow'}>{'↓'}</h1>
        //
        // <Fiche
        //   page={laminationThree}
        //   pageLength={len(laminationThree)}
        //   isFocussed={selectedFiche === 'C'}
        //   switchStages={() => this.setState({ selectedFiche: 'C' })}
        //   fbk={'c002'}
        //   title={'Lamination C'}
        //   id={'C'} />
        //
        // <div className={'flex'}>
        //
        //   <RandomGrid page={[...geons, ...approvedOne, ...approvedTwo]} num={4} />
        //
        // </div>

        }

      </div>
    )
  }
}


class Fiche extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      indexInput: 0,
      fbState: 'idle'
    }
  }

  componentDidMount = () => {
    window.addEventListener('keydown', e => {
      if (this.props.isFocussed === true) {
        const { pageLength } = this.props
        if (e.keyCode === 39) this.nextPage(pageLength)
        if (e.keyCode === 37) this.prevPage(pageLength)
        if (e.keyCode === 13) this.pushToFirebase(this.props.fbk)
      }
    })
  }

  thisPage = index => this.setState({ currentIndex: index })

  nextPage = pageLength => {
    if (!isAtEnd(pageLength, this.state.index)) {
      this.setState({ index: parseInt(this.state.index) + 1 })
    }
  }

  prevPage = pageLength => {
    if (!isAtStart(pageLength, this.state.index)) {
      this.setState({ index: parseInt(this.state.index) - 1 })
    }
  }

  pullFromFireBase = (key, cb) => {
    base.fetch(key, {
      context: this,
      asArray: true,
    }).then(data => cb(data))
  }

  exportFromFirebase = key => {
    base.fetch(key, {
      context: this,
      asArray: true,
    }).then(data => {
      fileDownload(JSON.stringify(data, null, 2), `svgarr_${key}.json`);
    })

  }


  pushToFirebase = key => {
    const { index } = this.state
    base.push(key, { data: this.props.page[index] })
    .then(() => this.springState({fbState: 'success'}, {fbState:'idle'}, 500))
    .catch(err => this.springState({fbState: 'error'}, {fbState:'idle'}, 500))
  }

  springState = (newState, defaultState, dur) => {
    this.setState(newState)
    setTimeout(() => this.setState(defaultState), dur)
  }


  render = () => {
    const { page, isFocussed, fbk, title, id, switchStages, pageLength } = this.props
    const { index, indexInput } = this.state

    if (!isEmpty(page)) {
      return (
        <section className={isFocussed ? 'blue-stroke' : 'white-stroke'}>
          <div
            onClick={() => switchStages(id)}
            className={isFocussed ? 'blue-fill tab' : 'white-fill tab'}>
            <p>{title}</p>
          </div>
          <div className={'content'}>
            <nav>
              <span>
                <div className={`fill-${this.state.fbState} circle`} />
                <button onClick={() => this.pushToFirebase(fbk)}>{'Approve'}</button>
              </span>
              <span>
                <button className={'warn-fill'} onClick={() => this.pullFromFireBase(fbk)}>{`Update Refs: ${fbk}`}</button>
              </span>
              <span>
                <button onClick={() => this.exportFromFirebase(fbk)}>{`Download: ${fbk}`}</button>
              </span>
              <span>
                <button onClick={() => this.setState({index: 0})}>{'Zero'}</button>
                <button onClick={() => this.prevPage(pageLength)}>{'←'}</button>
                <button onClick={() => this.nextPage(pageLength)}>{'→'}</button>
                <button onClick={() => this.setState({index: lastIndex(page)})}>{'Max'}</button>
                <input
                  placeholder={index}
                  type="text"
                  value={indexInput}
                  onChange={e => this.setState({indexInput: e.target.value})}
                />
                <p>{` of ${len(page)}`}</p>
                <button onClick={() => this.setState({index: indexInput})}>{'Set'}</button>

              </span>
            </nav>
            {
              len(page) === 0
              ? <div><p>{'Zero Length Array'}</p></div>
              : <div> {insert(page[index])} </div>
            }

          </div>
        </section>
      )
    }
    return <div><p>{'LOADING'}</p></div>
  }
}

const FicheList = ({page}) => {
  if (!isEmpty(page)) {
    return [
      <h2>{len(page)}</h2>,
      <section className={'w100'}>
      {
        len(page) === 0
        ? <div><p>{'Zero Length Array'}</p></div>
        : <div className={'biggify'}> {map(page, symbol => {
            return pourject({
              symbols: [symbol],
              renderer: ReactSVGComponents,
              size: 128,
              colorway: ['black', '#fff'],
            })
        })} </div>
      }
      </section>

    ]
  }
  return <div><p>{'LOADING'}</p></div>
}


class RandomGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patp: 'ridlur-figbud',
      index: 0,
    }
  }


  thisPage = index => this.setState({ currentIndex: index })

  nextPage = pageLength => {
    if (!isAtEnd(pageLength, this.state.index)) {
      this.setState({ index: parseInt(this.state.index) + 1 })
    }
  }

  prevPage = pageLength => {
    if (!isAtStart(pageLength, this.state.index)) {
      this.setState({ index: parseInt(this.state.index) - 1 })
    }
  }


  exportSVG = model => {
    fileDownload(model.replace(/\n/g, ''), 'seal_svg.svg')
  }

  render = () => {
    const { page } = this.props
      if (len(page) > 0) {
        const symbols = chunk(page, 4)
        const pageLength = len(symbols)
        return (
          <div>
            <button onClick={() => this.setState({patp: toPlanetName(randomShip('planet')) }) }>{'random @P'}</button>
            <button onClick={() => this.setState({index: 0})}>{'Zero'}</button>
            <button onClick={() => this.prevPage(pageLength)}>{'←'}</button>
            <button onClick={() => this.nextPage(pageLength)}>{'→'}</button>
            <button onClick={() => this.setState({index: lastIndex(page)})}>{'Max'}</button>
            <div>
              {
                pourject({
                  symbols: symbols[this.state.index],
                  renderer: ReactSVGComponents,
                  size: 365,
                  colorway: ['#000', '#fff'],
                })
              }
            </div>
          </div>
        )
      }

    return <div><p>{'LOADING'}</p></div>
  }
}


export default Lung
