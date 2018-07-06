import React, { Component } from 'react'
import { map, filter, forEach } from 'lodash'
import fileDownload from 'js-file-download'
import {cast, makeTag} from './cylinder/cylinder'
import { base, baseState } from './lib/lib.firebase'
import {
  collider,
  deepClone,
} from './lib/lib'

import {
  end,
  length,
} from './lib/lib.array'

import ReactSVGComponents from './ReactSVGComponents'

const DB_PASS_ONE_KEY = 'c000'
const DB_PASS_TWO_KEY = 'c001'


// Lung is a tool to make glyphs that represent syllables
//
class Foundry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cylinder: null,
      comb: null,
      geons: null,
      currentIndex: 0,
      allComb: null,
      colliderMethod: 'bigCombination',
      passOne: null,
      indexInPassOne: 0,
    }
  }

  componentDidMount = () => {
    window.addEventListener('keydown', e => {
      if (e.keyCode === 39) this.nextPage()
      if (e.keyCode === 37) this.prevPage()
      if (e.keyCode === 13) this.pushToFirebase(DB_PASS_TWO_KEY)
    })

    this.pullFromFireBase(DB_PASS_ONE_KEY)

    cast((cylinder) => {
      console.log('start cast')
      const geons = filter(cylinder, member => member.meta.type === 'geon')
      const other = filter(cylinder, member => {
        const key = member.meta.key.split('.')
        return member.meta.type !== 'geon' && key[2] !== 'fg' && key[2] !== 'n'
       })

      let comb = []
      forEach(geons, geon => forEach(other, otherMember => {
        comb.push([geon, otherMember])
      }))

      // console.log(allComb)
      console.log('cast done')
      this.setState({cylinder, geons, comb})
    })
  }

  stage2 = (stage1, cylinder) => {
    
  }

  pullFromFireBase = key => {
    base.fetch(key, {
      context: this,
      asArray: true,
    }).then(data => {
      this.setState({ passOne: map(data, item => item.group) })
    })
  }


  pushToFirebase = key => {
    const { comb, currentIndex } = this.state
    base.push(key, {
      data: { group: group(comb[currentIndex])}
    }).then(() => {
      console.log('success')
    })
  }


  thisPage = index => this.setState({ currentIndex: index })

  nextPage = () => {
    this.setState({ currentIndex: parseInt(this.state.currentIndex) + 1 })
  }

  prevPage = () => {
    this.setState({ currentIndex: parseInt(this.state.currentIndex) - 1 })
  }

  render = () => {
    // if (this.state.comb) console.log(this.state.comb[this.state.currentIndex])
    return (
      <div>
      <nav>
      <span>
        <button onClick={() => this.setState({colliderMethod: 'bigCombination'})}>{'bigCombination'}</button>
        <button onClick={() => this.setState({colliderMethod: 'permutation'})}>{'permutation'}</button>
        <button onClick={() => this.setState({colliderMethod: 'permutationCombination'})}>{'permutationCombination'}</button>
        <button onClick={() => this.setState({colliderMethod: 'baseN'})}>{'baseN'}</button>

      </span>
      <span>
        <button onClick={() => this.setState({currentIndex: 0})}>{'Zero'}</button>
        <button onClick={() => this.prevPage()}>{'←'}</button>
        <button onClick={() => this.nextPage()}>{'→'}</button>
        <button onClick={() => this.setState({currentIndex: end(this.state.comb)})}>{'Max'}</button>
      </span>
      <span>
        <input
          placeholder={this.state.currentIndex}
          type="text"
          value={this.state.currentIndex}
          onChange={e => this.setState({currentIndex: e.target.value})}
        />
        <pre>{` / ${length(this.state.comb)}`}</pre>
      </span>
      </nav>
      <h1>Lung</h1>
      <hr />
      <h2>{'Collider Stage 1'}</h2>
      <button onClick={() => this.pushToFirebase(DB_PASS_ONE_KEY)}>{'Add to First Pass'}</button>
      <button onClick={() => this.pullFromFireBase(DB_PASS_ONE_KEY)}>{'Update Cylinder'}</button>

      <section className={'flex-center-all'}>

        {
          this.state.comb !== null
          ? insert(moveGeonToBack(group(this.state.comb[this.state.currentIndex])))
          : <div />
        }

      </section>

      <h2>{'Collider Stage 2'}</h2>
      <button onClick={() => this.pushToFirebase(DB_PASS_TWO_KEY)}>{'Add to First Pass'}</button>
      <button onClick={() => this.pullFromFireBase(DB_PASS_TWO_KEY)}>{'Update Cylinder'}</button>

      <section className={'flex-center-all'}>

        {
          this.state.passOne !== null
          ? insert(this.state.passOne[this.state.indexInPassOne])
          : <div />
        }

      </section>

      <hr/>
      <h2>{'Pass One'}</h2>
      {
        this.state.passOne !== null
        ? map(this.state.passOne, pair => {
          console.log(pair)
          return insert(pair)
        })
        : <div />
      }


      <hr />
      <h2>{'QA'}</h2>
      <section>
        {
          this.state.cylinder
          ? mapInsert(this.state.cylinder)
          : <div />
        }
      </section>
      <hr />

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


const insert = group => {
  const model = {
    tag: 'svg',
    meta: {},
    attr: {},
    children: [group],
  }
  return ReactSVGComponents.svg(model)
}


const mapInsert = arr => map(arr, group => insert(group))


export default Foundry
