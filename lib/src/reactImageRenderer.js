import React from 'react'
import stringRenderer from './stringRenderer'

const reactImageRenderer = (node) => {
  return (
    React.createElement(
      node.name,
       {style: {
         backgroundRepeat: 'no-repeat',
         width: node.attributes.style.width,
         height: node.attributes.style.height,
         backgroundImage: `url(data:image/svg+xml;base64,${btoa(stringRenderer(node))})`
       }},
    )
  )
}

export default reactImageRenderer;
