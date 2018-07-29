import React, { Component } from 'react'
import { toPlanetName } from 'urbit-ob'

import {
  randomShip,
} from '../lib/lib'

import { pour } from '../lib/pour'

import { ReactSVGComponents } from '../renderers/ReactSVGComponents'

import sylmap from '../sylmaps/sylmap'

import { InputBox } from '../components/UI'

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
    const { patp } = this.state
    return (
      <div>
        <button onClick={() => this.setState({ patp: toPlanetName(randomShip('planet')) })}>
          {'Random @P'}
        </button>
        <InputBox
          placeholder={'~ridlur-figbud'}
          title={'Submit'}
          submit={(content) => {
            console.log(content)
            this.setState({patp: content})
          }}
        />
        {
          pour({
            patp: this.state.patp,
            sylmap: sylmap,
            renderer: ReactSVGComponents,
            size: 256,
          })
        }
        <p>{this.state.patp}</p>
      </div>
    )
  }
}


export default Pour
