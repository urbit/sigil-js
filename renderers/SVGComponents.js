import React from 'react'

const ReactSVGRenderer = node => {
  return (
    React.createElement(
      node.name,
      node.attributes,
      node.children.map(child => ReactSVGRenderer(child))
    )
  )
}

export default ReactSVGRenderer;
