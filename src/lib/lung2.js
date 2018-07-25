import { map, get, set, filter, reduce, isUndefined, forEach, flatten, head } from 'lodash'
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

import { seq, rotateArray, len, last } from '../lib/lib.array'

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
      acc[typedKey(child)] = walk(child)
      return acc
    }, {} ),
  }

  console.log(reference)

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
    acc[typedKey(container)] = map(filter(children, child => child.name !== name), item => typedKey(item))
    return acc
  }, {} )
}


const typedKey = child => {
  const split = child.name.split('.')
  const key = split[1]
  const type = split[0]
  return `${type}${key}`
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
      // console.log(get(child, 'fills.0.color'))

      const paths = map(fillGeometry, path => ({
        tag: svg.path,
        attr: { ...getAttrs(child), d: path.path, fillRule: path.windingRule },
        children: [],
        // meta: getMetas(parent).type === 'g'
        //   ? { style: { fill: 'FG', stroke: 'NO' } }
        //   : { style: { fill: 'BG', stroke: 'NO' } },
        // TODO: does this still work?
        meta : {},
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

  meta.key = typedKey(child)

  // // if the child is a geon and not a group, give it FG color. otherwise BG color
  // meta = meta.type === 'g' && child.tag !== 'g'


  if (child.tag !== 'g') {
    meta = meta.type === 'g'
    ? {...meta, style: { fill: 'FG', stroke: 'NO' } }
    : {...meta, style: { fill: 'BG', stroke: 'NO' } }

    // if the child has a white fill in figma, give it FG color
    meta = isWhite(get(child, 'children.0.fills.0.color'))
      ? {...meta, style: { fill: 'FG', stroke: 'NO' } }
      : meta
  }

  if (child.tag === 'g') {
    meta = {...meta, style: {}}
  }


  return meta
}


// const o2rgb = o => `rgb(${})`


const isWhite = o => !isUndefined(o)
  ? o.r === 1 && o.g === 1 && o.b === 1
  : false


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



// spin returns an array of iterations of a symbol based on the axel param
const spin = item => {
  // get an array of angles from axel
  const iterable = a2d(last(item.children).meta.axel)
  // produce array of rotation iterations
  const iterations = map(iterable, angle => {
    const clone = deepClone(item)
    return {
      ...clone,
      attr: {},
      meta: { ...clone.meta, permType: 'rotation', rotate: angle },
    }
  })
  return iterations
}




const paste = (item, reference, linkPath) => {
  const links = get(reference, linkPath)
  const symbols = reference.symbols

  const decals = links[last(item.children).meta.key]

  if (isUndefined(decals)) return []

  const rootType = head(item.children).meta.type
  const rootKey = head(item.children).meta.key
  if (rootType !== 'g') throw Error('root element must always be geon')



  // console.log(rootKey)

  const iterations = reduce(decals, (acc, key) => {

    if (reference.geonLinks[rootKey].includes(key)) {
      const clone = deepClone(item)
      const iteration = {
        ...clone,
        children: [...clone.children, deepClone(symbols[key])],
        // attr: clone.attr,
        attr: {},
        meta: { ...clone.meta, permType: 'ndeco' }
      }
      return [...acc, iteration]
    }
    return acc

  }, [])
  return iterations
}


const isGroup = item => item.tag === 'g'

const isGeon = item => item.meta.type === 'g'

const isDeco = item => item.meta.type === 'd'

const getPermType = item => isUndefined(item.meta.permType)
  ? 'none'
  : item.meta.permType


// expand applies a function against each element in an array and concats the
// result to an accumulator
const expand = (a, f) => reduce(a, (acc, item) => [...acc, ...f(item)], [...a])



// fan creates a large array of iterations based on links
const fan = reference => {
  const { symbols, decoLinks, geonLinks } = reference
  const geons = filter(symbols, symbol => isGeon(symbol))

  const regrouped = map(geons, g => group({
    children: [g],
    attr: g.attr,
    meta: g.meta,
  }))
  const all = expand(regrouped, a => {
    return expand(spin(a), b => {
      return expand(paste(b, reference, 'geonLinks'), c => {
        return expand(paste(c, reference, 'decoLinks'), d => {
          return expand(paste(d, reference, 'decoLinks'), e => e)
        })
      })
    })
  })

  return cap(all, symbols)
}


const cap = (all, symbols) => {
  return map(all, item => {
    const baseKey = item.children[0].meta.key
    const hatKey = getHatKey(baseKey)
    return {
      ...item,
      children: [ ...item.children, symbols[hatKey]]
    }
  })
}

const getHatKey = key => {
  const hatKey = key.split('')
  hatKey[0] = 'h'
  return hatKey.join('')
}


const group = ({ children, attr, meta }) => ({
  tag: svg.g,
  children,
  attr,
  meta,
})

const a2d = axel => {
  return map(seq(parseInt(axel)), index => {
    if (index === 0) return 0
    if (index === 1) return 90
    return (360 / axel) * index
  })
}


export {
  inhale,
  fan,
  walk,
}
