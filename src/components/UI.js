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

export {
  TabButton,
  ToggleButton,
  RadioButton,
}
