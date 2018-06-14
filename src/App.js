import React, { Component } from 'react'

import Sel from './Sel'
import Gen from './Gen'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      route: 'gen',
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
        <span>
          <button onClick={() => this.setState({route: 'gen'})}>{'generate'}</button>
          <button onClick={() => this.setState({route: 'sel'})}>{'select'}</button>
        </span>
      </nav>
        { route }
      </div>
    )
  }
}

export default App
