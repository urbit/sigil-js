import React, { Component } from 'react'
// import chr from 'chroma-js'
import fileDownload from 'js-file-download'
import { map } from 'lodash'

// import { base, baseState } from './lib/lib.firebase'
import {
  entries,
  values,
  numComparator,
} from './lib/lib'

import {
  zippedPre,
  zippedSuf,
  zippedAll,
  neverPre,
  neverSuf,
  neverDist,
} from './core/scope'

import {
  suf,
  pre,
  suffixes,
  prefixes,
} from './lib/lib.urbit'




// Lung is a tool to make glyphs that represent syllables
//
class Scope extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: false,
    }
  }



  render = () => {

    let preList = [...zippedPre]
    let sufList = [...zippedSuf]
    let allList = [...zippedAll]

    if (this.state.sort === true) {

      preList = preList.sort((va, vb) => numComparator(va, vb, 'frequency')).reverse()
      sufList = sufList.sort((va, vb) => numComparator(va, vb, 'frequency')).reverse()
      allList = allList.sort((va, vb) => numComparator(va, vb, 'frequency')).reverse()

    } else {

    }

    return (
      <div>
        <nav>
          <button onClick={() => this.setState({sort: !this.state.sort})}>{'Sort'}</button>
        </nav>
        <p>PATP DISTRIBUTION</p>
        <div className={'table'}>

          <ol>
          <p>prefixes</p>
          <hr />
            {
              map(preList, (item, index) => {
                return (
                  <li key={`${index}-pre`}>
                    <div className={'label'}>{item.letter}:</div>
                    <div className={'label'}>{item.frequency}</div>
                    <div className={'bar blue-bg'} style={{width: item.frequency}} />
                  </li>
                )
              })
            }
            <hr/>
            excludes:
            {
              map(neverPre, item => `${item.letter}, `)
            }
          </ol>
          <ol>
          <p>suffixes</p>
          <hr />
            {
              map(sufList, (item, index) => {
                return (
                  <li key={`${index}-suf`}>
                  <div className={'label'}>{item.letter}:</div>
                  <div className={'label'}>{item.frequency}</div>
                  <div className={'bar blue-bg'} style={{width: item.frequency}} />
                  </li>
                )
              })
            }
            <hr/>
            excludes:
            {
              map(neverSuf, item => `${item.letter}, `)
            }
          </ol>

          <ol>
          <p>all summed</p>
          <hr />
            {
              map(allList, (item, index) => {
                return (
                  <li key={`${index}-all`}>
                  <div className={'label'}>{item.letter}:</div>
                  <div className={'label'}>{item.frequency}</div>
                    <div className={'bar blue-bg'} style={{width: item.preFrequency}} />
                    <div className={'bar white-bg'} style={{width: item.sufFrequency}} />
                  </li>
                )
              })
            }
            <hr/>
            excludes:
            {
              map(neverDist, item => `${item.letter}, `)
            }
          </ol>


        </div>



      </div>
    )
  }
}




export default Scope
