import React, { Component } from 'react'
import { get, map } from 'lodash'

const ReactSVGComponents = {
  svg: p => {
    return (
      <svg {...p.attr} height={128} width={128} version={'1.1'} xmlns={'http://www.w3.org/2000/svg'}>
      { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </svg>
    )
  },
  circle: p => {
    return (
      <circle {...p.attr}>
      { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </circle>
    )
  },
  rect: p => {
    return (
      <rect {...p.attr}>
      { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </rect>
    )
  },
  path: p => {
    // console.log(p)
    return (
      <path {...p.attr}>
      { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </path>
    )
  },
  g: p => {
    // console.log(p)
    return (
      <g {...p.attr} transform={`rotate(${get(p, ['attr', 'rotate'], 0)}, 64, 64)`}>
        { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </g>
    )
  },
  polygon: p => {
    return (
      <polygon {...p.attr}>
      { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </polygon>
    )
  },
  line: p => {
    return (
      <line {...p.attr}>
      { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </line>
    )
  },
  polyline: p => {
    return (
      <polyline {...p.attr}>
      { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </polyline>
    )
  }
}


export default ReactSVGComponents
