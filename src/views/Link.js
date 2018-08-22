import React, { Component } from 'react'

import ReactSVGComponents from '../renderers/ReactSVGComponents'
import { pour } from '../lib/pour'
import { pull, fan } from '../lib/lung'
import { map, filter, forEach, reduce, chunk,shuffle, isString, cloneDeep, isNumber } from 'lodash'
import fileDownload from 'js-file-download'
import omitEmpty from 'omit-empty'
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

import { suffixes, prefixes } from '../lib/lib.urbit'

import {
  values,
  keys,
  entries,
} from '../lib/lib'

class Link extends Component {
  constructor(props) {
    super(props)
    this.state = {
      compositions: [],
      dictionary: [],
      reference: null,
      adam: null,
      pairedAdams: [],
      eve: null,
      pairedEves: [],
    }
  }

  componentDidMount = () => {
    const { adam, eve } = this.state

    window.addEventListener('keydown', e => {
      if (e.keyCode === 13) this.pair()
      if (e.keyCode === 85) this.unpair(adam, eve)
    })

    const dictionary = {
      suffixes: sylSort(suffixesSorted),
      prefixes: sylSort(prefixesSorted),
    }

    this.setState({
      dictionary,
    })

    pull(reference => {
      // combinatorics with fan()
      const compositions = fan(reference)

      // localStorage includes a 'length' value, filter it out
      const withoutIndexValue = filter(values(localStorage), item => isString(item))

      //
      const symbolArray = map(withoutIndexValue, s => parseInt(s))

      console.log(symbolArray)




      this.setState({
        pairedAdams: symbolArray,
        pairedEves: filter(keys(localStorage), item => item !== 'length'),
        reference,
        compositions, })



        const ls = cloneDeep(localStorage)

        // delete ls.nada
        //
        // ls.bic = '7'
        // ls.fal = '8'

        // const missingKeys = filter([...suffixes, ...prefixes], syl => !keys(ls).includes(syl))
        //
        // var ks = Object.keys(ls);
        // var dupe = false;
        //
        // for(var i=0;i<ks.length;i++){
        //  for(var j=i+1;j<ks.length;j++){
        //    if(ls[ks[i]] === ls[ks[j]]){
        //      dupe = true;
        //      break;
        //    }
        //  }
        //  if(dupe){ console.log("dupe value is there..", ls[ks[i]], i); break; }
        // }
        //
        // let arr = keys(ls)
        // var cache = {};
        // var results = [];
        // for (var i = 0, length = arr.length; i < length; i++) {
        //   if(cache[arr[i]] === true){
        //       results.push(arr[i]);
        //    }else{
        //        cache[arr[i]] = true;
        //    }
        //
        // }


        const rebuild = reduce(entries(localStorage), (acc, [key, value]) => ({
          ...acc,
          [key]: compositions[value]
        }), {})

        const json = JSON.stringify(omitEmpty({...rebuild}))

        fileDownload(json, 'sylmap.json')
    })
  }



  pair = () => {
    const { adam, eve, } = this.state

    if (adam === null || eve === null) {
      return
    }

    localStorage.setItem(`${eve}`, adam)

    this.setState({
      adam: null,
      eve: null,
    })
  }


  unpairSymbol = index => {
    const ls = localStorage
    const indexOfKey = values(ls).indexOf(`${index}`)

    if (indexOfKey !== -1) {
      const key = keys(ls)[indexOfKey]
      localStorage.removeItem(key)
      this.setState({adam: null})
    }
  }



  unpairSyllable = key => {
    localStorage.removeItem(key)
    this.setState({eve: null})
  }


  unpair = (index, key) => {
    if (index !== null) {
      this.unpairSymbol(index)
    } else if (key !== null) {
      this.unpairSyllable(key)
    }
  }



  clearAll = () => {
    localStorage.clear()
    this.setState({
      pairedEves: [],
      pairedAdams: []
    })
  }

  exportSylmap = () => {
    // const filtered = filter(entries(localStorage),
    // map(entries(localStorage))
    // return
  }

   unPair = (syl) => {
  //   const {
  //     selectedSyllable,
  //     reference,
  //     adam,
  //     eve,
  //     pairedEves,
  //     pairedAdams,
  //   } = this.state
  //   localStorage.removeItem(`${syl}`)
  //   console.log(localStorage)
  //   indexOf(syl)
  //   remove(pairedEves, item => )
  //   this.setState({
  //
  //   })
  //
  }


  render = () => {
    const {
      compositions,
      adam,
      pairedAdams,
      pairedEves,
      eve,
      dictionary,
    } = this.state

    return [
      <nav>
      <button onClick={() => this.pair()}>{'Pair'}</button>
      <button onClick={() => this.unpair(adam, eve)}>{'Unpair'}</button>

      <button onClick={() => this.exportSylmap()}>{'Export'}</button>

      {
        // <button onClick={() => this.clearAll()}>{'CLEAR ALL'}</button>
      }
      </nav>,
      <div className={'grid'}>
        <section className={'a flex'}>
          {
            map(compositions, (symbol, i) =>
              <Sym
                key={`symbol-${i}`}
                index={i}
                symbol={symbol}
                isSelected={i === adam}
                isPaired={pairedAdams.includes(i)}
                select={() => this.setState({adam: i})}
              /> )
          }
        </section>

        <section className={'b flex-v'}>
        <SylCategory
          title={'Suffixes'}
          payload={dictionary.suffixes}
          eve={eve}
          pairedEves={pairedEves}
          select={(name) => this.setState({eve: name})}
          />
          <SylCategory
            title={'Prefixes'}
            payload={dictionary.prefixes}
            eve={eve}
            pairedEves={pairedEves}
            select={(name) => this.setState({eve: name})}
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
    pairedEves,
    eve
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
                  isPaired={pairedEves.includes(member)}
                  isSelected={member === eve}
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
        pour({
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
