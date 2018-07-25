import React, { Component } from 'react'
import { toPlanetName } from 'urbit-ob'

import {
  randomShip,
} from '../lib/lib'

import { pour } from '../lib/pour'

import { ReactSVGComponents } from '../renderers/ReactSVGComponents'

const SIZE = 600

class Pour extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seals: false,
      patp: '~ridlur-figbud',
    }
  }

  componentDidMount = () => {
    this.setState({ patp: toPlanetName(randomShip('planet')) })
  }


  // exportSVG = () => {
  //   const data = paper.project.exportSVG({ asString: true })
  //   // fileDownload(data, 'seal.svg')
  // }


  render = () => {
    return (
      <div>
        <button onClick={() => this.setState({ patp: toPlanetName(randomShip('planet')) })}>
          {'Random @P'}
        </button>
        {
          pour({
            patp: this.state.patp,
            sylmap: undefined,
            renderer: ReactSVGComponents,
            size: 512,
          })
        }
        <p>{this.state.patp}</p>
      </div>
    )
  }
}


export default Pour
