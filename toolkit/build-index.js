const fs = require('fs');
const path = require('path');
const svgson = require('svgson')
const del = require('del')

const { PATHS, EXT } = require('./constants')

const INPUT_PATH = PATHS.svg
const OUTPUT_PATH = PATHS.lib

const compose = (...fns) => fns.reduce((fn, g) => (...args) => fn(g(...args)))


const preprocess = (ast) => {
  return compose(
    removeClipPath,
    dropSVGTag,
    createPaintTargets,
    killDefs,
    // addNoScalingStroke,
    wrapRootInGroup,
    ensureNoFill,
    label,
  )(ast)
}



const label = node => {

  const geons = [
    'wedge180',
    'thumb0',
    'thumb90',
    'thumb180',
    'thumb270',
    'wedge0',
    'wedge90',
    'wedge180',
    'wedge270',
    'disc',
    'square',
    'leaf0',
    'leaf180',
  ]

  if (geons.includes(node.attributes.id)) {
    node.attributes['data-id'] = node.attributes.id
  }

  return {
    ...node,
    children: node.children.map(n => label(n)),
  }
}

// add wrap nodes in outer group so it is easily portable later
const wrapRootInGroup = node => {
  return {
    name: 'svg',
    value: node.value,
    attributes: {
      width: '130px',
      height: '130px',
      viewBox:'0 0 130px 130px',
      xmlns:"http://www.w3.org/2000/svg"
    },
    children: [{
      name: 'g',
      value: '',
      attributes: {},
      children: node.children,
    }],
  }
}

// add fill="none" to tags with no fill
const ensureNoFill = (node) => {
  return {
    name: node.name,
    value: node.value,
    attributes: {
      ...node.attributes,
      fill: node.attributes.fill === undefined
        ? 'none'
        : node.attributes.fill
    },
    children: node.children.map(n => ensureNoFill(n)),
  }
}

// add vector-effect="non-scaling-stroke"
const addNoScalingStroke = node => {
  if (node.attributes.stroke !== undefined) {
    node.attributes['vector-effect'] = 'non-scaling-stroke'
  }
  return {
    name: node.name,
    value: node.value,
    attributes: node.attributes,
    children: node.children.map(n => addNoScalingStroke(n)),
  }
}

// remove any <defs> tags
const killDefs = node => {
  return {
    name: node.name,
    value: node.value,
    attributes: node.attributes,
    children: node.children
      .filter(n => n.name !== 'defs')
      .map(n => killDefs(n)),
  }
}

// unrwap nodes with clip-path as they are used when 'clip to artboard' is checked in figma artboard
const removeClipPath = node => {

  if (node.children.length === 0) {
    return node
  }

  if (node.attributes['clip-path'] === undefined) {
    // do nothing
  } else {
    delete node.attributes['clip-path']
    // console.log(node)
  }

  node.children = node.children.map(n => {
    if (n.name === 'clipPath') {
      return []
    } else {
      return removeClipPath(n)
    }
  })



  return node

}



const createPaintTargets = node => {

  const FG = 1
  const BG = 0

  if (node.attributes.fill !== undefined && node.attributes.fill !== 'none') {
    node.attributes.fill = node.attributes.fill === 'white'
      ? BG
      : FG
  }

  if (node.attributes.stroke !== undefined && node.attributes.stroke !== 'none') {
    node.attributes.stroke = node.attributes.stroke === 'white'
      ? BG
      : FG
  }


  return {
    name: node.name,
    value: node.value,
    attributes: node.attributes,
    children: node.children.map(n => createPaintTargets(n)),
  }
}


const dropSVGTag = rootNode => {
  return (
    rootNode.children[0]
  )
}


const ast = fs
  .readdirSync(INPUT_PATH)
  .filter(filename => path.extname(filename).toLowerCase() === EXT.svg)
  .reduce((acc, filename) => {
    const content = fs.readFileSync(INPUT_PATH + filename, 'utf8');
    const key = path.basename(filename, EXT.svg);
    const ast = svgson.parseSync(content)
    acc[key] = preprocess(ast);
    return acc;
}, {});

// clear the existing index
del.sync(OUTPUT_PATH + 'index.json')

fs.writeFile(
  OUTPUT_PATH + 'index.json',
  JSON.stringify(ast, null, 2),
  (err) => {
    if (err) console.log(err)
})
