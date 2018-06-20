import React, { Component } from 'react'
// import fileDownload from 'js-file-download'
import _ from 'lodash'
import ob from 'urbit-ob'

import geonset from './geonsets/geonset_001'
import etchset from './etchsets/etchset_000'
import sylmap from './sylmaps/sylmap_000.json'

import {
  randomShip,
} from './lib/lib'

import { pour, multiPour } from './core/pour'


// import { base, baseState } from './lib/lib.firebase'
const SIZE = 600

class SealGenerator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seals: false
    }
  }

  componentDidMount = () => {
    const randomPlanet = ob.toPlanetName(randomShip('planet'))
    const constantPlanet = '~ridlur-figbud'
    const seals = multiPour([randomPlanet], geonset, etchset, sylmap)
    this.setState({ seals })
  }


  // exportSVG = () => {
  //   const data = paper.project.exportSVG({ asString: true })
  //   // fileDownload(data, 'seal.svg')
  // }


  render = () => {
    return (
      <div>
        {
          this.state.seals
            ? insert(this.state.seals[0])
            : null
        }
      </div>
    )
  }
}




const insert = seal => tags.svg(seal.model)




const tags = {
  svg: p => {
    // console.log(p.children)
    return (
      <svg height={SIZE} width={SIZE} version={'1.1'} xmlns={'http://www.w3.org/2000/svg'}>
        { p.children.map(child => tags[child.tag](child)) }
      </svg>
    )
  },
  circle: p => {
    return (
      <circle {...p.attr}>
        { p.children.map(child => tags[child.tag](child)) }
      </circle>
    )
  },
  rectangle: p => {
    return (
      <rectangle {...p.attr}>
        { p.children.map(child => tags[child.tag](child)) }
      </rectangle>
    )
  },
  path: p => {
    return (
      <path {...p.attr} fill={'white'}>
        { p.children.map(child => tags[child.tag](child)) }
      </path>
    )
  },
  g: p => {
    // console.log(p)
    return (
      <g {...p.attr}>
        { p.children.map(child => tags[child.tag](child)) }
      </g>
    )
  },
}


export default SealGenerator
