import React, { Component } from 'react'

import Lung from './Lung'
import Scope from './Scope'
// import Pour from './Pour'
import { TabButton } from './components/components'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      route: 'Lung',
    }
  }

  render() {
    let route
    if (this.state.route === 'Lung') {
      route = <Lung />
    } else if (this.state.route === 'scope') {
      route = <Scope />
    } else {
      // route = <Pour patps={['monnum-rocdeg']} />
    }

    return (
      <div className="App">
        <nav className={'top'}>
          <span>
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
              onClick={() => this.setState({route: 'pour'})}
              keySelectedInPanel={this.state.route === 'pour'}
              title={'Pour'}
              id={'pour'} />
          </span>
        </nav>
        { route }
      </div>
    )
  }
}



export default App
