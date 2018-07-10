import React, { Component } from 'react'
import { map, filter, forEach, reduce } from 'lodash'
import fileDownload from 'js-file-download'
import { toPlanetName } from 'urbit-ob'

import { cast, makeTag } from './cylinder/cylinder'
import { base, baseState } from './lib/lib.firebase'
import {
  collider,
  deepClone,
  randInt,
  randomShip,
} from './lib/lib'

import {
  lastIndex,
  len,
  isAtEnd,
  isAtStart,
  seq,
  isEmpty,
} from './lib/lib.array'

import {
  suffixes,
  prefixes,
} from './lib/lib.urbit'

import { ToggleButton } from './components/components'

import pour from './core/pour'

import {
  ReactSVGComponents,
  insert,
  mapInsert,
} from './ReactSVGComponents'

import { SVGStringComponents } from './SVGStringComponents'

const DB_PASS_ONE_KEY = 'c000'
const DB_PASS_TWO_KEY = 'c001'
const DB_PASS_THREE_KEY = 'c002'



// Lung is a tool to make glyphs that represent syllables
//
class Lung extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cylinder: null,
      geons: [],
      currentIndex: 0,
      colliderMethod: 'bigCombination',
      laminationTwo: [],
      laminationOne: [],
      laminationZero: [],
      approvedTwo: [],
      approvedOne: [],
      selectedFiche: 'B',

    }
  }


  componentDidMount = () => {
    cast((cylinder) => {

      const geons = filter(cylinder, member => member.meta.type === 'geon')

      const decorators = filter(cylinder, member => {
        const key = member.meta.key.split('.')
        return member.meta.type !== 'geon' && key[2] !== 'fg' && key[2] !== 'n'
       })

       let laminationZero = []
       forEach(geons, geon => forEach(decorators, otherMember => {
         laminationZero.push({
           ...geon,
           children: [...geon.children, otherMember],
         })
        }))

      this.pullFromFireBase(DB_PASS_ONE_KEY, data => {

        const laminationOne = map(data, item => item.group)
        this.setState({approvedOne: laminationOne})
        let laminationTwo = []
        forEach(laminationOne, group => forEach(decorators, otherMember => {
          laminationTwo.push({
            ...group,
            children: [...group.children, otherMember],
          })
         }))


         this.setState({laminationTwo, laminationOne})

      })




      this.pullFromFireBase(DB_PASS_TWO_KEY, data => {
        // const laminationTwo = map(data, item => item.group)
        this.setState({approvedTwo: data})
        let laminationThree = []
        forEach(data, group => forEach(decorators, otherMember => {
          laminationThree.push({
            ...group,
            children: [...group.children, otherMember],
          })
         }))


         this.setState({ laminationThree })

      })


      this.setState({ cylinder, geons, laminationZero, })

    })
  }


  pullFromFireBase = (key, cb) => {
    base.fetch(key, {
      context: this,
      asArray: true,
    }).then(data => cb(data))
  }


  pushToFirebase = key => {
    const { comb, currentIndex } = this.state
    base.push(key, {
      data: { group: group(comb[currentIndex])}
    }).then(() => {
      console.log('success')
    })
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
    } = this.state

    return (
      <div>
        <Fiche
          page={laminationZero}
          pageLength={len(laminationZero)}
          isFocussed={selectedFiche === 'A'}
          switchStages={() => this.setState({ selectedFiche: 'A' })}
          fbk={'c000'}
          title={'Lamination A'}
          id={'A'} />

        <h1 className={'arrow'}>{'↓'}</h1>

        <Fiche
          page={laminationTwo}
          pageLength={len(laminationTwo)}
          isFocussed={selectedFiche === 'B'}
          switchStages={() => this.setState({ selectedFiche: 'B' })}
          fbk={'c001'}
          title={'Lamination B'}
          id={'B'} />

        <h1 className={'arrow'}>{'↓'}</h1>

        <Fiche
          page={laminationThree}
          pageLength={len(laminationThree)}
          isFocussed={selectedFiche === 'C'}
          switchStages={() => this.setState({ selectedFiche: 'C' })}
          fbk={'c002'}
          title={'Lamination C'}
          id={'C'} />

        <div className={'flex'}>

          <RandomGrid page={[...geons, ...approvedOne, ...approvedTwo]} num={4} />

        </div>

      </div>
    )
  }
}

const moveGeonToBack = group => {
  const noGeons = filter(group.children, child => child.meta.type !== 'geon')
  const geons = filter(group.children, child => child.meta.type === 'geon')
  group.children = [...geons, ...noGeons]
  return group
}


const group = children => makeTag({
  tag: 'g',
  meta: {},
  attr: {},
  children,
})


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
      console.log('ok')
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
    return (
      <section className={'tiny'}>
      {
        len(page) === 0
        ? <div><p>{'Zero Length Array'}</p></div>
        : <div> {mapInsert(page)} </div>
      }
      </section>

    )
  }
  return <div><p>{'LOADING'}</p></div>
}


class RandomGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patp: 'ridlur-figbud'
    }
  }


  exportSVG = model => {
    fileDownload(model.replace(/\n/g, ''), 'seal_svg.svg')
  }

  render = () => {
    const { page } = this.props
    const { patp } = this.state

    if (len(page) > 512) {

      const sylmap = reduce([...prefixes, ...suffixes], (acc, syl, index) => {
        acc[syl] = page[index]
        return acc
      },{})

      return (
        <div>
          <button onClick={() => this.setState({patp: toPlanetName(randomShip('planet')) }) }>{'regen'}</button>
          <button onClick={() => this.exportSVG(pour({
              patp: patp,
              sylmap: sylmap,
              renderer: SVGStringComponents,
            })
          )}>{'Export SVG'}</button>

        <div className={'fakeseal'}>
          {
            pour({
              patp: patp,
              sylmap: undefined,
              renderer: ReactSVGComponents,
              size: 128,
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
