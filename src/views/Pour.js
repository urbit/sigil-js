import React, { Component } from 'react'
// import fileDownload from 'js-file-download'
import _ from 'lodash'
import { toPlanetName } from 'urbit-ob'

import geonset from '../geonsets/geonset_001'
import sylmap from '../sylmaps/sylmap_000.json'

import {
  randomShip,
} from '../lib/lib'

import { pour } from '../lib/pour'

import ReactSVGComponents from '../renderers/ReactSVGComponents'

const SIZE = 600

class Pour extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seals: false
    }
  }

  componentDidMount = () => {
    const randomPlanet = toPlanetName(randomShip('planet'))
    const constantPlanet = '~ridlur-figbud'
    const seals = multiPour([randomPlanet], geonset, sylmap)
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
            : () => {}
        }
      </div>
    )
  }
}




const insert = seal => ReactSVGComponents.svg(seal.model)



export default Pour
