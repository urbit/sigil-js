import { map, get, set, filter, reduce, isUndefined, forEach } from 'lodash'

import * as Figma from '../figma/build/main/index'

import {
  mergeUpdates,
  updaters,
  entries,
  includes,
  keys,
  deepClone,
} from '../lib/lib'

import { sequence, rotate } from '../lib/lib.array'

const TOKEN = '1952-9da74b1b-551c-4acf-83b4-23b31743ab51'

const DEFAULT_COLOR = '#8000FF'

const client = Figma.Client({ personalAccessToken: TOKEN })

const inhale = callback => {
  client.file('BegaVM3GXXhSsi3dTVbdvsGy', { geometry: 'paths' })
    .then(({ data }) => callback(permute(normalize(transform(data)))))
    .catch(err => console.error('Inhale() choked: ', err))
}



// Translate Figma data object into SVG/JSON structure
//
const transform = data => {
  const rawFrames = get(data, ['document', 'children', 0, 'children'])

   // console.log(groups)
  //
  const newGroups = map(rawFrames, group => {

    // Get info out of csv title field
    const td = titleParser(get(group, 'name', ''))
    if (td.t === 'line') console.log(group)
    // Outer Group
    return makeTag({
      tag: 'g',
      meta: {
        wall: get(td, 'm', 'dddd'),
        perm: {
          r: parseInt(get(td, 'r', '1')),
        },
        type: get(td, 't', false),
        id: get(group, 'id', false),
      },
      attr: {},
      children: map(get(group, 'children'), child => makeTag({
          tag: get(figTags, child.type),
          attr: getAttr(child),
          meta: { type: get(child, 'name')},
          children: [],
        })
      ),
    })
  })
  return newGroups
}

const normalize = groups => {
  return map(groups, group => {
    // TODO: need to normalize line here
    if (group.meta.type === 'line') {
      return {
        ...group,
        children: map(group.children, child => {
          const childCopy = deepClone(child)
          set(childCopy, ['attr', 'fill'], DEFAULT_COLOR)
          set(childCopy, ['attr', 'fillOpacity'], 0)
          set(childCopy, ['attr', 'strokeWidth'], 1)
          set(childCopy, ['attr', 'stroke'], DEFAULT_COLOR)
          // set(childCopy, ['attr','strokeAlignment'], 'inside')
          return childCopy
        })
      }
    }
    return {
      ...group,
      children: map(group.children, child => {
        const childCopy = deepClone(child)
        set(childCopy, ['attr', 'fill'], DEFAULT_COLOR)
        set(childCopy, ['attr', 'fillOpacity'], 1)
        set(childCopy, ['attr', 'strokeWidth'], 0)
        set(childCopy, ['attr', 'stroke'], DEFAULT_COLOR)
        // set(childCopy, ['attr','strokeAlignment'], 'inside')
        return childCopy
      })
    }
  })
}

// Make any programmatic permutations of transformed Figma output
//
const permute = data => {
  let accA = []
  let accB = []

  // Make rotation permutations
  //
  forEach(data, group => {
    const numRotations = group.meta.perm.r
    if (numRotations !== false) {
      forEach(sequence(numRotations), index => {
        const deg = numRotations === 2
          ? index === 0
            ? 0
            : 90
          : (360 / numRotations) * index
        const groupCopy = deepClone(group)
        set(groupCopy, ['attr', 'rotate'], deg)
        const rotatedEdgemap = rotate(get(groupCopy, ['meta', 'wall'] ).split(''), index).join('')
        set(groupCopy, ['meta', 'wall'], rotatedEdgemap)
        accA = accA.concat(groupCopy)
      })
    }
  })

  // Make filled / stroke permutations

  forEach(accA, group => {
    if (group.meta.type === 'geon' || group.meta.type === 'dot' || group.meta.type === 'deco') {
      const copy = deepClone(group)
      copy.children = map(copy.children, child => {
        const childCopy = deepClone(child)
        set(childCopy, ['attr', 'fill'], 'rgb(255,255,255)')
        set(childCopy, ['attr', 'fillOpacity'], 0)
        set(childCopy, ['attr', 'strokeWidth'], 1)
        set(childCopy, ['attr', 'stroke'], '#000')
        return childCopy
      })
      accB = accB.concat(copy)
    }
  })

  return [...accA, ...accB]
}

// take what we can transform and get the value at the address of a node
//
const getAttr = node => {
  const nodeAttr = reduce(entries(figAttrTranformer), (acc, [attrName, getVal]) => {
    return {
      ...acc,
      ...attrBindings[attrName](getVal(node))
    }

  }, {})
  return nodeAttr
}

const t = {
  g: 'g',
  rect: 'rect',
  circle: 'circle',
  ellipse: 'ellipse',
  polygon: 'polygon',
  polyline: 'polyline',
  svg: 'svg',
  path: 'path',
  line: 'line',
  metadata: 'metadata'
}

const figTags = {
  VECTOR: t.path,
  RECTANGLE: t.path,
  ELLIPSE: t.path,
  LINE: t.path,
  FRAME: t.g,
}

const figPaths = {
  fill: ['fills', 0, 'color'],
  strokeGeometry: ['strokeGeometry', 0, 'path'],
  fillGeometry: ['fillGeometry', 0, 'path'],
  stroke: ['strokes', 0, 'color'],
  strokeWidth: ['strokeWeight'],
  relativeTransform: ['relativeTransform'],
}

const rgba = obj => `rgba(${obj.r}, ${obj.g}, ${obj.b}, ${obj.a})`

const rgb = obj => `rgb(${obj.r}, ${obj.g}, ${obj.b})`

const titleParser = str => reduce(str.split(','), (acc, data) => {
  const kv = data.split(':')
  const key = kv[0]
  if (validCSVTags.includes(key)) {
    acc[key] = isUndefined(kv[1])
      ? false
      : kv[1]
    return acc
  }
  return acc
}, {})


const validCSVTags = 'mrt'.split('')

const figAttrTranformer = {
  fill: node => rgba(get(node, figPaths.fill, DEFAULT_COLOR)),
  fillOpacity: node => get(node, figPaths.fill[3], 0),
  d: node =>  {
    const fillGeo = get(node, figPaths.fillGeometry, [])
    const strokeGeo = get(node, figPaths.strokeGeometry, [])
    if (fillGeo.length === 0) return strokeGeo
    return strokeGeo
  },
  stroke: node => get(node, figPaths.stroke, 'none'),
  strokeWidth: node => get(node, figPaths.strokeWidth, 0),
  relativeTransform: node => get(node, figPaths.relativeTransform),
}

const makeTag = params => ({
  ...params,
  tag: params.tag,
  attr: params.attr,
  meta: params.meta,
  children: params.children,
})

const attrBindings = {
  fill: color => ({ fill: color }),
  stroke: color => ({ stroke: color }),
  strokeWidth: num => ({ strokeWidth: num }),
  cx: num => ({ cx: num }),
  cx: num => ({ cy: num }),
  r: num => ({ r: num }),
  d: str => ({ d: str }),
  fillOpacity: float => ({ fillOpacity: float}),
  relativeTransform: a => {
    const prop = `matrix(${a[0][0]} ${a[1][0]} ${a[0][1]} ${a[1][1]} ${a[0][2]} ${a[1][2]})`
    return { transform: prop }
  }
}



export {
  inhale,
  makeTag,
}
