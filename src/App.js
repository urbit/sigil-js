import React, { Component } from 'react'

import Sel from './Sel'
import Gen from './Gen'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      route: 'gen'
    }
  }
  render() {
    let route
    if (this.state.route === 'gen') {
      route = <Gen />
    } else if (this.state.route === 'sel') {
      route = <Sel />
    } else {

    }
    return (
      <div className="App">
      <nav>
        <button onClick={() => this.setState({route: 'gen'})}>{'Gen'}</button>
        <button onClick={() => this.setState({route: 'sel'})}>{'Sel'}</button>
      </nav>
        { route }

      </div>
    )
  }
}

export default App
