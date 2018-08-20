import React, { Component } from 'react'

const TabButton = ({ isSelected, title, onClick, id }) => {
  const classes = isSelected ? 'selected tab' : 'unselected tab'
  return (
    <div className={classes}>
      <button className={classes} onClick={onClick}>{title}</button>
    </div>
  )
}

const RadioButton = ({ isSelected, title, onClick, id }) => {
  const classes = isSelected ? 'selected radio' : 'unselected radio'
  return (
    <div className={classes}>
      <button className={classes} onClick={onClick} />
      {title}
    </div>
  )
}

const ToggleButton = ({ isSelected, title, onClick, id }) => {
  const classes = isSelected ? 'selected' : 'unselected'
  return (
    <button className={classes} onClick={onClick}>{title}</button>
  )
}

class InputBox extends Component {
  constructor(props) {
    super(props)
    this.state = {c: ''}
  }
  render = () => {
    const { c } = this.state
    const { placeholder, title, submit } = this.props
    return (
      <div className={'inputBox'}>
        <input
          placeholder={placeholder}
          type="text"
          value={c}
          onChange={e => this.setState({c: e.target.value})} />
        <button onClick={() => submit(c)}>{title}</button>
      </div>
    )
  }
}

const InputBoxUpperState = ({ onChange, currentValue, placeholder }) => {
  // const classes = isSelected ? 'selected' : 'unselected'
  return (
    <div className={'inputBox'}>
      <input
        placeholder={placeholder}
        type="text"
        value={currentValue}
        onChange={e => onChange(e)} />
    </div> )
}

export {
  TabButton,
  ToggleButton,
  RadioButton,
  InputBox,
}
