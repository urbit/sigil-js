import React, { Component } from 'react'

import { ReactSVGComponents } from '../renderers/ReactSVGComponents'
import { spill } from '../lib/spill'
import { inhale, fan } from '../lib/lung2'
import { map, filter, forEach, reduce, chunk,shuffle, isString } from 'lodash'

import {
  lastIndex,
  len,
  isAtEnd,
  isAtStart,
  seq,
  isEmpty,
} from '../lib/lib.array'

import {
  prefixesSorted,
  suffixesSorted,
  zippedAll,
  sylSort,
} from '../lib/scope'

import {
  values,
  keys,
} from '../lib/lib'

class Link extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lam: [],
      flat: [],
      dictionary: [],
      reference: null,
      selectedSymbolIndex: 0,
      pairedSymbolIndexes: [],
      selectedSyllableName: 'nada',
      pairedSyllableNames: [],
    }
  }

  componentDidMount = () => {
    window.addEventListener('keydown', e => {
      if (e.keyCode === 13) this.pair()
    })
    const dictionary = {
      suffixes: sylSort(suffixesSorted),
      prefixes: sylSort(prefixesSorted),
    }

    const flat = reduce([...dictionary.suffixes, ...dictionary.prefixes], (acc, item) => {
      return [...acc, ...item.members]
    }, [])

    inhale((reference) => {
      this.setState({
        pairedSymbolIndexes: map(filter(values(localStorage), item => isString(item)), s => parseInt(s)),
        pairedSyllableNames: filter(keys(localStorage), item => item !== 'length'),
        dictionary,
        flat,
        reference,
        lam: fan(reference) })
    })


  }

  pair = () => {
    const {
      selectedSyllable,
      lam,
      selectedSymbolIndex,
      selectedSyllableName,
      pairedSyllableNames,
      pairedSymbolIndexes,
    } = this.state
    localStorage.setItem(`${selectedSyllableName}`, selectedSymbolIndex)
    console.log(localStorage, this.state)
    this.setState({
      selectedSymbolIndex: -1,
      selectedSyllableName: 'nada',
      pairedSyllableNames: [...pairedSyllableNames, selectedSyllableName],
      pairedSymbolIndexes: [...pairedSymbolIndexes, selectedSymbolIndex],
    })
  }

  clearAll = () => {
    localStorage.clear()
    this.setState({
      pairedSyllableNames: [],
      pairedSymbolIndexes: []
    })
  }

  exportSylmap = () => {
    // const filtered = filter(entries(localStorage),
    // map(entries(localStorage))
    // return
  }

  // unPair = (syl) => {
  //   const {
  //     selectedSyllable,
  //     reference,
  //     selectedSymbolIndex,
  //     selectedSyllableName,
  //     pairedSyllableNames,
  //     pairedSymbolIndexes,
  //   } = this.state
  //   localStorage.removeItem(`${syl}`)
  //   console.log(localStorage)
  //   indexOf(syl)
  //   remove(pairedSyllableNames, item => )
  //   this.setState({
  //
  //   })
  //
  // }


  render = () => {
    const {
      lam,
      flat,
      selectedSymbolIndex,
      pairedSymbolIndexes,
      pairedSyllableNames,
      selectedSyllableName,
      dictionary,
    } = this.state

    return [
      <nav>
      <button onClick={() => this.pair()}>{'Pair'}</button>
      <button onClick={() => this.exportSylmap()}>{'Export'}</button>

      {
        // <button onClick={() => this.clearAll()}>{'CLEAR ALL'}</button>
      }
      </nav>,
      <div className={'grid'}>
        <section className={'a flex'}>
          {
            map(lam, (symbol, i) =>
              <Sym
                key={`symbol-${i}`}
                index={i}
                symbol={symbol}
                isSelected={i === selectedSymbolIndex}
                isPaired={pairedSymbolIndexes.includes(i)}
                select={() => this.setState({selectedSymbolIndex: i})}
              /> )
          }
        </section>

        <section className={'b flex-v'}>
        <SylCategory
          title={'Suffixes'}
          payload={dictionary.suffixes}
          selectedSyllableName={selectedSyllableName}
          pairedSyllableNames={pairedSyllableNames}
          select={(name) => this.setState({selectedSyllableName: name})}
          />
          <SylCategory
            title={'Prefixes'}
            payload={dictionary.prefixes}
            selectedSyllableName={selectedSyllableName}
            pairedSyllableNames={pairedSyllableNames}
            select={(name) => this.setState({selectedSyllableName: name})}
            />


        </section>
      </div>
    ]
  }
}


const SylCategory = ({
    title,
    payload,
    select,
    pairedSyllableNames,
    selectedSyllableName
  }) => {
  let idx = -1
  return (
    <div>
      <h1>{title}</h1>
      {
        map(payload, item => {
          return <div className={'mt-1 bb'}>
            {
              map(item.members, member => {
                idx++
                return <Syl
                  index={idx}
                  syllable={member}
                  select={select}
                  isPaired={pairedSyllableNames.includes(member)}
                  isSelected={member === selectedSyllableName}
                  />

              })
            }
          </div>
        })
      }
  </div>
  )
}


class Sym extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render = () => {
    const { index, isPaired, symbol, isSelected, select} = this.props


    let colorWay = isSelected ? ['#fff', '#4330FC'] : ['#fff', '#000']
    colorWay = isPaired ? ['#fff', '#FF4C25'] : colorWay

    return (
      <div
        className={'hp'}
        onClick={() => select()}>
      {
        spill({
          symbols: [symbol],
          renderer: ReactSVGComponents,
          size: 96,
          colorway: colorWay,
        })
      }
      </div>
    )
  }
}





class Syl extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render = () => {
    const { syllable, select, isSelected, isPaired, index } = this.props

    let className = isSelected ? 'blue-fill hp mono' : 'black-fill hp mono'
    className = isPaired ? 'orange-fill hp mono' : className

    return (
      <button
        onClick={() => select(syllable)}
        className={className}>
      {syllable}
      </button>
    )
  }
}



export default Link
