import React, { Component } from 'react'
//
import Lung from './Lung'
import Scope from './Scope'
import Pour from './Pour'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      route: 'lung',
    }
  }

  render() {
    let route
    if (this.state.route === 'lung') {
      route = <Lung />
    } else if (this.state.route === 'scope') {
      route = <Scope />
    } else {
      route = <Pour patps={['monnum-rocdeg']} />
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
              onClick={() => this.setState({route: 'lung'})}
              keySelectedInPanel={this.state.route === 'lung'}
              title={'Lung'}
              id={'lung'} />
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

// const Button = ({ keySelectedInPanel, title, onClick, id }) => {
//   const classes = keySelectedInPanel === id ? 'selected button' : 'unselected button'
//   return (
//     <button className={classes} onClick={onClick}>{title}</button>
//   )
// }
//
const TabButton = ({ keySelectedInPanel, title, onClick, id }) => {
  const classes = keySelectedInPanel ? 'selected tab' : 'unselected tab'
  return (
    <div className={classes}>
      <button className={classes} onClick={onClick}>{title}</button>
    </div>
  )
}

const RadioButton = ({ keySelectedInPanel, title, onClick, id }) => {
  const classes = keySelectedInPanel ? 'selected radio' : 'unselected radio'
  return (
    <div className={classes}>
      <button className={classes} onClick={onClick} />
      {title}
    </div>
  )
}

export default App
