import React, { Component } from 'react'
import { map } from 'lodash'
import fileDownload from 'js-file-download'
import {inhale, makeTag} from './cylinder/cylinder'
// import { base, baseState } from './lib/lib.firebase'
import {
  collider,
} from './lib/lib'

import {
  end,
  length,
} from './lib/lib.array'

import ReactSVGComponents from './ReactSVGComponents'



// Lung is a tool to make glyphs that represent syllables
//
class Lung extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cylinder: null,
      comb: null,
      currentIndex: 0,
      colliderMethod: 'bigCombination'
    }
  }

  componentDidMount = () => {
    window.addEventListener('keydown', e => {
      if (e.keyCode === 39) this.nextPage()
      if (e.keyCode === 37) this.prevPage()
    })
    inhale((cylinder) => {
      const comb = collider(cylinder, this.state.colliderMethod, 3)
      // console.log('comb:', comb, 'cylinder:',cylinder)
      this.setState({cylinder, comb})
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
    // const currentCombination = this.state.comb[this.state.currentIndex]
    // if (this.state.cylinder !== null) console.log(this.state.cylinder[this.state.currentIndex])

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
      <h2>{'Exhale'}</h2>
      <section>
        {
          this.state.comb !== null
          ? insert(group(this.state.comb[this.state.currentIndex]))
          : <div />
        }
      </section>
      <hr />
      <h2>{'Inspect'}</h2>
      <section>
        {
          this.state.cylinder
          ? multinsert(this.state.cylinder)
          : <div />
        }
      </section>
      <hr />

      </div>
    )
  }
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
    attr: [],
    children: [group],
  }
  return ReactSVGComponents.svg(model)
}

const multinsert = arr => map(arr, group => insert(group))


export default Lung
