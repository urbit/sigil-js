import React, { Component } from 'react'
// import chr from 'chroma-js'
import fileDownload from 'js-file-download'
import { map, filter, sort, isUndefined, reduce } from 'lodash'

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
  sharedConsonants,
  sharedVowels,
  phonetics,
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
      sortLetter: false,
      sortEnds: 'qty',
    }
  }



  render = () => {

    let preList = [...zippedPre]
    let sufList = [...zippedSuf]
    let allList = [...zippedAll]


    let ps = [...prefixesSorted].sort((va, vb) => numComparator(va, vb, this.state.sortEnds))
    let ss = [...suffixesSorted].sort((va, vb) => numComparator(va, vb, this.state.sortEnds))

    // console.log(JSON.stringify(ss.map(item => item.key), null, 2))
    // console.log(ps)

    if (this.state.sortLetter === true) {
      preList = preList.sort((va, vb) => numComparator(va, vb, 'frequency')).reverse()
      sufList = sufList.sort((va, vb) => numComparator(va, vb, 'frequency')).reverse()
      allList = allList.sort((va, vb) => numComparator(va, vb, 'frequency')).reverse()
    }

    // ps = ps.sort((va, vb) => numComparator(va, vb, 'qty')).reverse()
    // ss = ss.sort((va, vb) => numComparator(va, vb, 'qty')).reverse()

    const prefixVowels = filter(preList, item => item.frequency !== 0 && vowels.includes(item.letter))
    const prefixConsonants = filter(preList, item => item.frequency !== 0 && consonants.includes(item.letter))

    const suffixVowels = filter(sufList, item => item.frequency !== 0 && vowels.includes(item.letter))
    const suffixConsonants = filter(sufList, item => item.frequency !== 0 && consonants.includes(item.letter))

    return (
      <div>
        <main>
        <h1>Scope</h1>
        <h2>@p Character Distribution</h2>
        <button onClick={() => this.setState({sortLetter: !this.state.sortLetter})}>{'Sort'}</button>

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
          <h4>{'Shared'}</h4>
            <table>
              <tbody>
                <tr>
                  <th>Consontants</th>
                  <th>Vowels</th>
                </tr>
                <tr>
                  <td>{
                    sharedConsonants
                  }</td>
                  <td>{
                    sharedVowels
                  }</td>
                </tr>

              </tbody>
            </table>
            <h4>{'Unique'}</h4>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>Consontants</th>
                  <th>Vowels</th>
                </tr>
                <tr>
                  <td>Prefix</td>
                  <td>{
                    filter(alphabet, letter => !map([...neverPre], l => l.letter).includes(letter) && !vowels.includes(letter) && !sharedConsonants.includes(letter))
                  }</td>
                  <td>{
                    filter(alphabet, letter => !map([...neverPre], l => l.letter).includes(letter) && vowels.includes(letter) && !sharedVowels.includes(letter))
                  }</td>

                </tr>
                <tr>
                  <td>Suffix</td>
                  <td>{
                    filter(alphabet, letter => !map([...neverSuf], l => l.letter).includes(letter) && !vowels.includes(letter) && !sharedConsonants.includes(letter))
                  }</td>
                  <td>{
                    filter(alphabet, letter => !map([...neverSuf], l => l.letter).includes(letter) && vowels.includes(letter) && !sharedVowels.includes(letter))
                  }</td>
                </tr>
              </tbody>
            </table>



          </div>


        </div>
        <hr />
        <h2>Phonetic Sort</h2>
        <button onClick={() => this.setState({sortEnds: 'll'})}>{'last letter'}</button>
        <button onClick={() => this.setState({sortEnds: 'vo'})}>{'vowel'}</button>
        <button onClick={() => this.setState({sortEnds: 'qty'})}>{'qty'}</button>
        <button onClick={() => this.setState({sortEnds: 'pn'})}>{'phonetics'}</button>


        <h2>{`prefix ends: ${keys(prefixesSorted).length}`}</h2>
        <section className={'flex syl'}>
        {
          map(ps, (item, index) => {

            const key = this.state.sortEnds
            let cn = 'hidden'
            if (!isUndefined(ps[index - 1])) {
              if (ps[index - 1][key] !== item[key]) {
                cn = 'vr'
              }
            } else if (index === 0) {
              cn = 'vr'
            }
            return [
              <div className={cn}><p>{item[key]}</p></div>,
              <ol>
                <h3>{`-${item.key}`}</h3>
                {map(item.members, syl => <li>{syl}</li>)}
              </ol>
            ]
          })
        }
        </section>

        <h2>{`suffix ends: ${keys(suffixesSorted).length}`}</h2>
        <section className={'flex syl'}>
        {
          map(ss, (item, index) => {
            const key = this.state.sortEnds
            let cn = 'hidden'
            if (!isUndefined(ss[index - 1])) {
              if (ss[index - 1][key] !== item[key] || index === 0) {
                cn = 'vr'
              }
            } else if (index === 0) {
              cn = 'vr'
            }
            return [
              <div className={cn}><p>{item[key]}</p></div>,
              <ol>
                <h3>{`-${item.key}`}</h3>
                { map(item.members, syl => <li>{syl}</li>) }
              </ol>
            ]

          })
        }
        </section>



      </main>
      </div>
    )
  }
}




export default Scope
