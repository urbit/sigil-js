import React, { Component } from 'react'

import Lung from './views/Lung'
import Scope from './views/Scope'
import Pour from './views/Pour'
import Link from './views/Link'

import { TabButton } from './components/UI'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      route: 'Pour',
    }
  }

  render() {
    let r
    const { route } = this.state
    if (route === 'Lung') {
      r = <Lung />
    } else if (route === 'scope') {
      r = <Scope />
    } else if (route === 'Pour') {
      r = <Pour />
    } else {
      r = <Link />
    }

    return (
      <div className="App">
        <nav className={'top'}>
          <span className={'ml-2'}>
            <TabButton
              onClick={() => this.setState({route: 'scope'})}
              keySelectedInPanel={this.state.route === 'scope'}
              title={'Scope'}
              id={'scope'} />
            <TabButton
              onClick={() => this.setState({route: 'Lung'})}
              keySelectedInPanel={this.state.route === 'Lung'}
              title={'Lung'}
              id={'Lung'} />
            <TabButton
              onClick={() => this.setState({route: 'Pour'})}
              keySelectedInPanel={this.state.route === 'Pour'}
              title={'Pour'}
              id={'Pour'} />
            <TabButton
              onClick={() => this.setState({route: 'Link'})}
              keySelectedInPanel={this.state.route === 'Link'}
              title={'Link'}
              id={'Link'} />
          </span>
        </nav>
        { r }
      </div>
    )
  }
}



export default App
