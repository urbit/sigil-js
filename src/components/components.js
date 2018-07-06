import React, { Component } from 'react'

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

export {
  TabButton,
  RadioButton,
}
