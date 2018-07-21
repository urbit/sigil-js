import { map, get, set, filter, reduce, isUndefined, forEach, flatten } from 'lodash'
import Combinatorics from 'js-combinatorics'
import * as Figma from 'figma-js'

import { scale, translate, transform, toSVG, rotateDEG } from 'transformation-matrix'

import {
  mergeUpdates,
  updaters,
  entries,
  includes,
  keys,
  deepClone,
  compose,
} from '../lib/lib'

import { seq, rotateArray, len } from '../lib/lib.array'

import { dye } from '../lib/pour'

const TOKEN = '1952-9da74b1b-551c-4acf-83b4-23b31743ab51'
const DOC_KEY = 'Qto2VhnBg0PJVNGskZfLH95i'

const D_COLOR = '#8000FF'
const FG_COLOR = '#fff'
const BG_COLOR = '#4330FC'

const client = Figma.Client({ personalAccessToken: TOKEN })

const inhale = callback => {
  // Call figma api, transform data and callback
  client.file(DOC_KEY, { geometry: 'paths' })
    .then(({ data }) => {
      callback(makeReference(data))
    })
    .catch(err => console.error('inhale() choked: ', err))
}


// Translates Figma data into a geon reference object.
const makeReference = doc => {

  // get the all artboards from the 1st page of the figma doc
  const artboards = get(doc, ['document', 'children', 0, 'children'])

  // get the artboards that serve as containers for geons and their valid decorators
  const geonContainers = filter(artboards, artboard =>
    artboard.name !== 'SYMBOLS' && artboard.name.split('.')[0] === 'g')

  // get the artboards that serve as containers for decorators and their valid decorators
  const decoContainers = filter(artboards, artboard =>
    artboard.name !== 'SYMBOLS' && artboard.name.split('.')[0] === 'd')

  // get the symbol board, and there should be only one
  const symbols = filter(artboards, artboard => artboard.name === 'SYMBOLS')[0]

  // make the reference object
  const reference = {
    geonLinks: link(geonContainers),
    decoLinks: link(decoContainers),
    symbols: reduce(symbols.children, (acc, child) => {
      acc[child.name] = walk(child)
      return acc
    }, {} ),
  }

  return reference
}





// Each geon is put in an artboard with instances of decorators that it can
// accept. This function makes a structured reference from geon to valid
// decorators per geon.
const link = containers => {

  // map each child name to a parent key/val pair
  return reduce(containers, (acc, container) => {
    const { children, name } = container

    // don't map if the child name === parent name
    acc[name] = map(filter(children, child => child.name !== name), item => item.name)
    return acc
  }, {} )
}




// recurse through children and add metadata and attributes
const walk = child => ({
  attr: getAttrs(child),
  children: unfurl(child),
  meta: getMetas(child),
  tag: get(figTypeMap, child.type),
})





// unfurl handles unnesting fillGeometry paths into real path nodes along walk()
const unfurl = parent => {

  const children = get(parent, 'children', [])

  return reduce(children, (acc, child) => {

    const { fillGeometry } = child

    if (!isUndefined(fillGeometry)) {

      const paths = map(fillGeometry, path => ({
        tag: svg.path,
        attr: { ...getAttrs(child), d: path.path, fillRule: path.windingRule },
        children: [],
        meta: getMetas(parent).type === 'g'
          ? { style: { fill: 'FG', stroke: 'NO' } }
          : { style: { fill: 'BG', stroke: 'NO' } },
      }))

      return [...acc, ...paths]

    } else {

      return walk(child)

    }
  }, [])

}


// gets attributes from Figma data for a child. Group types are used for
// positioning and so their styling attributes are not passed.
const getAttrs = child => {
  let { type } = child

  if (groupTypes.includes(type)) {
    return {}
  } else {
    return reduce(entries(attrGetters), (a, [n, get]) => ({
      ...a,
      ...attrMap[n](get(child)),
    }), {})
  }
}



// keys for meta properties stored in figma frame/component/instance name field.
// Stored by index that matches index in a split Figma name field
const metaKeys = ['type', 'key', 'axel', 'edge']



// Figma object types that are transformed into groups by this transformer.
const groupTypes = ['FRAME', 'COMPONENT', 'INSTANCE']



// get meta properties from figma frame/component/instance name field
const getMetas = child => {
  const { type } = child
  // set default meta property
  let meta = {}
  // if the child type should be a high-level symbol wrapping group, append meta k/v
  if (groupTypes.includes(type)) {
    meta = reduce(get(child, 'name', '').split('.'), (a, v, i) => {
      a[metaKeys[i]] = v
      return a
    }, meta )
  }

  meta = meta.type === 'g' && child.tag !== 'g'
    ? {...meta, style: { fill: 'FG', stroke: 'NO' } }
    : {...meta, style: { fill: 'BG', stroke: 'NO' } }

  return meta
}



// functions that get properties of from figma object, or set a default value
const attrGetters = {
  relativeTransform: child => get(child, ['relativeTransform']),
}



// mappings between attribute names and final values
const attrMap = {
  relativeTransform: a => ({ transform: matrix2DOMString(a) })
}



const matrix2DOMString = m => `matrix(${m[0][0]} ${m[1][0]} ${m[0][1]} ${m[1][1]} ${m[0][2]} ${m[1][2]})`


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


const pRotate = (acc, symbol, f) => {
  const perms =
  return f([...acc, ...perms],
}

const branch = reference => {
  const { symbols, decoLinks, geonLinks } = reference
  const geonSymbols = filter(symbols, symbol => symbol.meta.type === 'g')
  const decoSymbols = filter(symbols, symbol => symbol.meta.type === 'd')

  reduce(geonSymbols, (acc, g) => {
    return pRotate(acc, g, (acc, r) => {
      return pDeco(acc, g, (acc, d) => {
        return pRotate(acc, d, (acc, ))
      })
    })})
}

const fan = a => {}

const permute = reference => {
  const { symbols, decoLinks, geonLinks } = reference

  const geonSymbols = filter(symbols, symbol => symbol.meta.type === 'g')
  const decoSymbols = filter(symbols, symbol => symbol.meta.type === 'd')

  const accumulator = []

  forEach(entries(geonLinks), ([geonKey, decoKeys]) => {
    forEach(decoKeys, decoKey => {
      const combination = group([
        symbols[geonKey],
        symbols[decoKey],
      ])

      accumulator.push(combination)

      })
    })

    return accumulator
}

const group = (children) => {
  return {
    tag: svg.g,
    children,
    attr: {},
    meta: {},
  }
}



const axel2Deg = (total, idx) => {
  if (idx === 0) return 0
  if (idx === 1) return 90
  return (360 / total) * idx
}



// const permute = symbols => {
//   return reduce(symbols, (acc, symbol) => {
//     const numRotations = parseInt(get(symbol.children[0], 'meta.axel', 0), 10)
//     const rotations = map(seq(numRotations), (rotationAcc, index) => {
//
//       const clone = deepClone(symbol)
//       const deg = axel2Deg(numRotations, index)
//       // console.log(deg)
//       // const rotatedEdgemap = rotateArray(get(clone, ['meta', 'edge'] ).split(''), index).join('')
//       // console.log(deg)
//
//       // const splitKey = k.split('.')
//       // splitKey[2] = deg
//       // const newKey = splitKey.join('.')
//       // console.log(deg)
//       set(clone, ['meta', 'rotation'], deg)
//       // set(clone, ['meta', 'wall'], rotatedEdgemap)
//       // set(clone, ['meta', 'key'], newKey)
//       return clone
//     })
//     return [...acc, ...rotations]
//   }, [])
//
//   return symbols
// }


export {
  inhale,
  walk,
  permute,
}
