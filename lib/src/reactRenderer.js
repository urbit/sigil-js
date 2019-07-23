import React from 'react'

const toCamelCase = s => s
  .replace(/-([a-z])/g, g => g[1].toUpperCase())


const attributesToProps = (o) => Object
  .entries(o)
  .reduce((a, [k, v]) => {
    if (k === 'class') k = 'className'
    return {...a, [`${toCamelCase(k)}`]: v}
}, {})


const reactRenderer = (node, i) => {
  if (i === undefined) i = ''
  return (
    React.createElement(
      node.name,
       {...attributesToProps(node.attributes), key:`${i}`},
      node.children.map((child, j) => reactRenderer(child, `${i}:${j}`))
    )
  )
}


export default reactRenderer;
