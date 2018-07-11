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

const D_COLOR = '#8000FF'

const FG_COLOR = '#fff'

const BG_COLOR = '#4330FC'

const client = Figma.Client({ personalAccessToken: TOKEN })

const cast = callback => {
  console.log('Calling Figma')
  client.file('BegaVM3GXXhSsi3dTVbdvsGy', { geometry: 'paths' })
    .then(({ data }) => compose(callback, turn, transform)(data))
    .catch(err => console.error('Inhale() choked: ', err))
}



// Translate Figma data object into SVG/JSON structure
//
const transform = data => {
  // The GET endpoint returns a full document. Here we get all child elements of
  // a page in a document
  const docEls = get(data, ['document', 'children', 0, 'children'])

  // Return a POJO of transformed Figma elements by key
  const cylinder = reduce(docEls, (acc, docEl) => {

    // Extra metadata is store in the title field of the figma object. We
    // retrieve it here.
    const csv = titleParser(get(docEl, 'name', ''))

    // We make a key for the object that reduce forms. This key stores
    // permutation data as a way to refer to a specific permutation, which are
    // made later. 'key.degreesRotation.fillStyle.strokeStyle'
    const key = `${get(csv, 'k', 'zz')}.0.fg.n`

    // make a tag from each Figma frame element
    const tag = makeTag({
      tag: get(figmaTypeTags, docEl.type),
      meta: {
        wall: get(csv, 'm', 'dddd'),
        perm: {r: parseInt(get(csv, 'r', '1')) },
        style: 0,
        type: get(csv, 't', false),
        id: get(docEl, 'id', false),
        key: key,
      },
      attr: {rotate:0},
      children: map(get(docEl, 'children'), child => makeTag({
        tag: get(figmaTypeTags, child.type),
        attr: getAttr(child),
        meta: { type: get(child, 'name') },
        children: [],
      })),
    })

    // Append to accumulator with a key
    acc[key] = tag
    return acc
  }, {})

  return cylinder
}



// take deco types and make fill=false / stroke=BG_COLOR
//
const a = base => reduce(base, (acc, group) => {
    const type = group.meta.type
    if (type === 'deco' || type === 'dot') {

      // update the reference key
      const splitKey = group.meta.key.split('.')
      splitKey[2] = 'n'
      splitKey[3] = 'bg'
      const newKey = splitKey.join('.')

      const clone = deepClone(group)

      clone.children = map(clone.children, child => {
        const c = deepClone(child)
        set(c, ['attr', 'fill'], D_COLOR)
        set(c, ['attr', 'fillOpacity'], 0)
        set(c, ['attr', 'strokeWidth'], 1)
        set(c, ['attr', 'stroke'], BG_COLOR)
        return c
      })

      set(clone, ['meta', 'key'], newKey)
      acc[newKey] = clone
    }
    return acc

}, base)


// take deco types and make fill=FG_COLOR / stroke=BG_COLOR
//
const b = base => reduce(base, (acc, group) => {
    const type = group.meta.type
    if (type === 'deco') {

      // update the reference key
      const splitKey = group.meta.key.split('.')
      splitKey[2] = 'bg'
      splitKey[3] = 'fg'
      const newKey = splitKey.join('.')

      const clone = deepClone(group)

      clone.children = map(clone.children, child => {
        const c = deepClone(child)
        set(c, ['attr', 'fill'], BG_COLOR)
        set(c, ['attr', 'fillOpacity'], 1)
        set(c, ['attr', 'strokeWidth'], 1)
        set(c, ['attr', 'stroke'], FG_COLOR)
        return c
      })

      set(clone, ['meta', 'key'], newKey)
      acc[newKey] = clone

    }

    return acc

}, base)

// no fill, stroke FG_COLOR
const c = base => reduce(base, (acc, group) => {
    const type = group.meta.type
    if (type === 'deco' || type === 'dot') {

      // update the reference key
      const splitKey = group.meta.key.split('.')
      splitKey[2] = 'fg'
      splitKey[3] = 'n'
      const newKey = splitKey.join('.')

      const clone = deepClone(group)

      clone.children = map(clone.children, child => {
        const c = deepClone(child)
        set(c, ['attr', 'fill'], D_COLOR)
        set(c, ['attr', 'fillOpacity'], 0)
        set(c, ['attr', 'strokeWidth'], 1)
        set(c, ['attr', 'stroke'], FG_COLOR)
        return c
      })

      set(clone, ['meta', 'key'], newKey)
      acc[newKey] = clone
    }
    return acc

}, base)


const d = base => reduce(base, (acc, group) => {
    const type = group.meta.type
    if (type === 'deco' || type === 'dot' || type === 'line') {

      const numRotations = group.meta.perm.r
      const rotations = reduce(seq(numRotations), (smallAcc, index) => {

          if (index !== 0) {

            const clone = deepClone(group)
            const deg = numRotations === 2 ? index === 0 ? 0 : 90 : (360 / numRotations) * index
            const rotatedEdgemap = rotate(get(clone, ['meta', 'wall'] ).split(''), index).join('')

            const splitKey = group.meta.key.split('.')
            splitKey[1] = deg
            const newKey = splitKey.join('.')

            set(clone, ['attr', 'rotate'], deg)
            set(clone, ['meta', 'wall'], rotatedEdgemap)
            set(clone, ['meta', 'key'], newKey)

            smallAcc[newKey] = clone
            return smallAcc

          }
          return smallAcc
        }, {})

        acc = {...acc, ...rotations}

      }
      return acc


}, base)

// line types/ dot types:  fill=BG_COLOR / stroke=NONE
//
const e = base => reduce(base, (acc, group) => {
    const type = group.meta.type
    if (type === 'line' || type === 'dot') {

      // update the reference key
      const splitKey = group.meta.key.split('.')
      splitKey[2] = 'bg'
      splitKey[3] = 'n'
      const newKey = splitKey.join('.')

      const clone = deepClone(group)

      clone.children = map(clone.children, child => {
        const c = deepClone(child)
        set(c, ['attr', 'fill'], BG_COLOR)
        set(c, ['attr', 'fillOpacity'], 1)
        set(c, ['attr', 'strokeWidth'], 0)
        set(c, ['attr', 'stroke'], BG_COLOR)
        return c
      })

      set(clone, ['meta', 'key'], newKey)
      acc[newKey] = clone
    }
    return acc

}, base)


const turn = groups => {
  // never append copies of the originals
  // composes functions that append a stage of permutations to the cylinder

  return compose(a, b, c, e, d)(groups)
}


// take what we can transform and get the value at the address of a node
//
const getAttr = node => reduce(entries(figPropGetters), (acc, [n, get]) => {
    return {
      ...acc,
      ...propBindings[n](get(node)),
    }
  }, {})


const svgTagTypes = {
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


const figmaTypeTags = {
  VECTOR: svgTagTypes.path,
  RECTANGLE: svgTagTypes.path,
  ELLIPSE: svgTagTypes.path,
  LINE: svgTagTypes.path,
  FRAME: svgTagTypes.g,
}


// const rgb = obj => `rgb(${obj.r}, ${obj.g}, ${obj.b})`


const titleParser = str => reduce(str.split(','), (acc, data) => {
  const kv = data.split(':')
  const key = kv[0]
  if ('mrtk'.split('').includes(key)) {
    acc[key] = isUndefined(kv[1]) ? false : kv[1]
    return acc
  }
  return acc
}, {})


// set default values
const figPropGetters = {
  fill: node => FG_COLOR,
  fillOpacity: node => get(node, 1, 1),
  d: node =>  get(node, ['fillGeometry', 0, 'path']),
  stroke: node => BG_COLOR,
  strokeWidth: node => 0,
  relativeTransform: node => get(node, ['relativeTransform']),
}


const makeTag = params => ({
  ...params,
  tag: params.tag,
  attr: params.attr,
  meta: params.meta,
  children: params.children,
})


const propBindings = {
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


const collider = (array, method, qty) => {
  const all = Combinatorics[method](array, qty).toArray()

  // const withMateCount = all.map(geonmap => ({
  //   geonmap,
  //   // mateCount: countMates(geonset, geonmap, 2),
  // }))

  // const sorted = sort(withMateCount, numComparator, 'mateCount').reverse()
  return all
}



export {
  cast,
  makeTag,
  collider,
}
