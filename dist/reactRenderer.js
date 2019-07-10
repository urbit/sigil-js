import React from 'react'

const reactRenderer = node => {
  return (
    React.createElement(
      node.name,
      node.attributes,
      node.children.map(child => reactRenderer(child))
    )
  )
}

export default reactRenderer;
