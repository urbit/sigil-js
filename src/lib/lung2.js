import { map, get, set, filter, reduce, isUndefined, forEach, flatten } from 'lodash'
import Combinatorics from 'js-combinatorics'
import * as Figma from 'figma-js'

import {
  mergeUpdates,
  updaters,
  entries,
  includes,
  keys,
  deepClone,
  compose,
} from '../lib/lib'

import { seq, rotate } from '../lib/lib.array'

const TOKEN = '1952-9da74b1b-551c-4acf-83b4-23b31743ab51'
const DOC_KEY = 'Qto2VhnBg0PJVNGskZfLH95i'

const D_COLOR = '#8000FF'
const FG_COLOR = '#fff'
const BG_COLOR = '#4330FC'

const client = Figma.Client({ personalAccessToken: TOKEN })

const inhale = callback => {
  // Call figma api, transform data and callback
  client.file(DOC_KEY, { geometry: 'paths' })
    .then(({ data }) => callback(transform(data)))
    .catch(err => console.error('inhale() choked: ', err))
}


// Translates Figma data into a geon reference object.
const transform = doc => {

  // get the all artboards from the 1st page of the figma doc
  const artboards = get(doc, ['document', 'children', 0, 'children'])

  // get the artboards that serve as containers for geons and their valid decorators
  const containers = filter(artboards, artboard => artboard.name !== 'SYMBOLS')

  // get the symbol board
  const symbols = filter(artboards, artboard => artboard.name === 'SYMBOLS')

  // make the reference object
  const reference = {
    links: link(containers),
    symbols: reduce(symbols[0].children, (acc, child) => {
      acc[child.name] = walk(child)
      return acc
    }, {} ),
  }
  return reference
}



// Each geon is put in an artboard with instances of decorators that it can
// accept. This function makes a structured reference from geon to valid
// decorators.
const link = containers => {

  // map each child name to a parent key/val pair
  return reduce(containers, (acc, container) => {
    const { children, name } = container

    // don't map if the child name === parent name
    acc[name] = filter(children, child => child.name !== name)
    return acc
  }, {} )
}



// recurse through children and add metadata and attributes
const walk = child => ({
  attr: getAttrs(child),
  children: map(get(child, 'children', []), child => walk(child)),
  meta: getMetas(child),
  tag: get(figTypeMap, child.type),
})



// gets attributes from Figma data for a node/child. Group types are used for
// positioning and and don't get any of their figma attributes passed
const getAttrs = node => {
  let { type } = node

  if (groupTypes.includes(type)) {
    return {}
  } else {
    return reduce(entries(attrGetters), (a, [n, get]) => ({
      ...a,
      ...attrMap[n](get(node)),
    }), {})
  }
}



// keys for meta properties stored in figma frame/component/instance name field.
// Stored by index that matches index in a split Figma name field
const metaKeys = ['type', 'axel', 'key', 'edge']


// Figma object types that are transformed into groups.
const groupTypes = ['FRAME', 'COMPONENT', 'INSTANCE']


// get meta properties from figma frame/component/instance name field
const getMetas = node => {
  const { type } = node

  // set default meta property
  let meta = { style: {fill: 'NO', stroke: 'NO'} }

  // if the node type should be a high-level symbol wrapping group, append meta k/v
  if (groupTypes.includes(type)) {
    meta = reduce(get(node, 'name', '').split('.'), (a, v, i) => {
      metaKeys[i] = v
      return a
    }, meta )
  }

  return meta
}



// functions that get properties of from figma object, or set a default value
const attrGetters = {
  fill: node => 'none',
  fillOpacity: node => get(node, 1, 1),
  d: node =>  get(node, ['fillGeometry', 0, 'path']),
  stroke: node => BG_COLOR,
  strokeWidth: node => 0,
  relativeTransform: node => get(node, ['relativeTransform']),
}



// mappings between attribute names and final values
const attrMap = {
  fill: color => ({ fill: color }),
  stroke: color => ({ stroke: color }),
  strokeWidth: num => ({ strokeWidth: num }),
  cx: num => ({ cx: num }),
  cx: num => ({ cy: num }),
  r: num => ({ r: num }),
  d: str => ({ d: str }),
  fillOpacity: float => ({ fillOpacity: float}),
  relativeTransform: a => ({transform: `matrix(${a[0][0]} ${a[1][0]} ${a[0][1]} ${a[1][1]} ${a[0][2]} ${a[1][2]})` })
}



// consistant SVG tag names
const svg = {
  g: 'g',
  rect: 'rect',
  circle: 'circle',
  ellipse: 'ellipse',
  polygon: 'polygon',
  polyline: 'polyline',
  svg: 'svg',
  path: 'path',
  line: 'line',
  metadata: 'metadata',
}



// mapping between Figma types and svg tags
const figTypeMap = {
  VECTOR: svg.path,
  RECTANGLE: svg.path,
  ELLIPSE: svg.path,
  LINE: svg.path,
  FRAME: svg.g,
  COMPONENT: svg.g,
  INSTANCE: svg.g,
}


export {
  inhale,
  walk,
}
