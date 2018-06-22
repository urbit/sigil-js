import React, { Component } from 'react'
// import chr from 'chroma-js'
import fileDownload from 'js-file-download'
import { map, filter } from 'lodash'

// import { base, baseState } from './lib/lib.firebase'
import {
  entries,
  values,
  numComparator,
  keys,
} from './lib/lib'

import {
  zippedPre,
  zippedSuf,
  zippedAll,
  neverPre,
  neverSuf,
  neverDist,
  alphabet,
  vowels,
  consonants,
  prefixesSorted,
  suffixesSorted,
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

    }

    const prefixVowels = filter(preList, item => item.frequency !== 0 && vowels.includes(item.letter))
    const prefixConsonants = filter(preList, item => item.frequency !== 0 && consonants.includes(item.letter))

    const suffixVowels = filter(sufList, item => item.frequency !== 0 && vowels.includes(item.letter))
    const suffixConsonants = filter(sufList, item => item.frequency !== 0 && consonants.includes(item.letter))

    return (
      <div>
        <nav>
        </nav>
        <main>
        <p>PATP DISTRIBUTION</p>
        <button onClick={() => this.setState({sort: !this.state.sort})}>{'Sort'}</button>

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

          <div className={'graph'}>
            <div className={'row'}>
              <div>
                <p>v: {map(prefixVowels, l => `${l.letter}, `)}</p>
                <p>c: {map(prefixConsonants, l => `${l.letter}, `)}</p>
              </div>
              <div>
                <p>v: {map(suffixVowels, l => `${l.letter}, `)}</p>
                <p>c: {map(suffixConsonants, l => `${l.letter}, `)}</p>
              </div>
            </div>
            <div className={'row'}>
            <div>
              <p>v: {map(prefixVowels, l => `${l.letter}, `)}</p>
              <p>c: {map(prefixConsonants, l => `${l.letter}, `)}</p>
            </div>
            <div>
              <p>v: {map(suffixVowels, l => `${l.letter}, `)}</p>
              <p>c: {map(suffixConsonants, l => `${l.letter}, `)}</p>
            </div>
            </div>
          </div>


        </div>
        <h2>{`suffixesSorted: ${keys(suffixesSorted).length}`}</h2>

        <section className={'flex syl'}>
        {
          map(entries(suffixesSorted), ([k, v]) => {
            return (
              <ol>
                <h3>{`-${k}`}</h3>
                <hr/>
                {map(v, syl => <li>{syl}</li>)}
              </ol>
            )
          })
        }
        </section>
        <h2>{`prefixesSorted: ${keys(prefixesSorted).length}`}</h2>
        <section className={'flex syl'}>
        {
          map(entries(prefixesSorted), ([k, v]) => {
            return (
              <ol>
                <h3>{`-${k}`}</h3>
                <hr/>
                {map(v, syl => <li>{syl}</li>)}
              </ol>
            )
          })
        }
        </section>


      </main>
      </div>
    )
  }
}




export default Scope
