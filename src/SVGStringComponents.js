import React, { Component } from 'react'
import { get, map, reduce, isUndefined } from 'lodash'
import { entries } from './lib/lib'

const propToString = obj => {
  if (!isUndefined(obj)) {
    return reduce(entries(obj), (acc, [k, v]) => {
      return `${acc} ${k}='${v}'`
    }, '')
  }
  return ''
}

const SVGStringComponents = {
  svg: p => {
    return (
      `<svg ${propToString(p.attr)} height=${"'128'"} width=${"'128'"} version=${"'1.1'"} xmlns=${"'http://www.w3.org/2000/svg'"}>
      ${ map(get(p, 'children', []), child => SVGStringComponents[child.tag](child)).join('') }
      </svg>`
    )
  },
  rect: p => {
    return (
      `<rect ${propToString(p.attr)}>
      ${ map(get(p, 'children', []), child => SVGStringComponents[child.tag](child)).join('') }
      </rect>`
    )
  },
  path: p => {
    return (
      `<path ${propToString(p.attr)}>
      ${ map(get(p, 'children', []), child => SVGStringComponents[child.tag](child)).join('') }
      </path>`
    )
  },
  g: p => {
    return (
      `<g ${propToString(p.attr)}>
        ${ map(get(p, 'children', []), child => SVGStringComponents[child.tag](child)).join('') }
      </g>`
    )
  },

}


export {
  SVGStringComponents,
}
