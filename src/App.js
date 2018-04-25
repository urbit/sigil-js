import React, { Component } from 'react'

import Debug from './Debug'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>{'urbit avatar debug'}</h1>
        <Debug />
      </div>
    )
  }
}

export default App
