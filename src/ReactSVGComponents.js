import React, { Component } from 'react'

const ReactSVGComponents = {
  svg: p => {
    return (
      <svg height={128} width={128} version={'1.1'} xmlns={'http://www.w3.org/2000/svg'}>
        { p.children.map(child => ReactSVGComponents[child.tag](child)) }
      </svg>
    )
  },
  circle: p => {
    return (
      <circle {...p.attr}>
        { p.children.map(child => ReactSVGComponents[child.tag](child)) }
      </circle>
    )
  },
  rect: p => {
    return (
      <rect {...p.attr}>
        { p.children.map(child => ReactSVGComponents[child.tag](child)) }
      </rect>
    )
  },
  path: p => {
    // console.log(p)
    return (
      <path {...p.attr}>
        { p.children.map(child => ReactSVGComponents[child.tag](child)) }
      </path>
    )
  },
  g: p => {
    return (
      <g {...p.attr} transform={`rotate(${p.attr.rotate ? p.attr.rotate : 0}, 64, 64)`}>
        { p.children.map(child => ReactSVGComponents[child.tag](child)) }
      </g>
    )
  },
  polygon: p => {
    return (
      <polygon {...p.attr}>
        { p.children.map(child => ReactSVGComponents[child.tag](child)) }
      </polygon>
    )
  },
  line: p => {
    return (
      <line {...p.attr}>
        { p.children.map(child => ReactSVGComponents[child.tag](child)) }
      </line>
    )
  },
  polyline: p => {
    return (
      <polyline {...p.attr}>
        { p.children.map(child => ReactSVGComponents[child.tag](child)) }
      </polyline>
    )
  }
}


export default ReactSVGComponents
