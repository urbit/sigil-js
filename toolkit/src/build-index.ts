// @ts-ignore
import * as svgson from 'svgson'
import * as fs from 'fs'
import * as path from 'path'
import * as del from 'del'
import { Ast } from '../../types'

// Paths relative from /dist
const SVG_INPUT_PATH = __dirname + '/../assets/svg/';
const INDEX_OUTPUT_PATH = __dirname + '/../assets/';

const compose = (...fns: Array<Function>) => {
  return fns.reduce((f, g) => (...xs: any) => {
    const r = g(...xs);
    return Array.isArray(r) ? f(...r) : f(r);
  });
}

const buildIndex = () => {
  // Load all SVGs, process them and add them to an index object
  const index = fs
    .readdirSync(SVG_INPUT_PATH)
    .filter(f => path.extname(f).toLowerCase() === '.svg')
    .reduce((acc, f) => {
      const content = fs.readFileSync(SVG_INPUT_PATH + f, 'utf8');
      const k = path.basename(f, '.svg');
      const ast = svgson.parseSync(content);
      // compose executes functions from bottom (last) to first (top)
      //@ts-ignore
      acc[k] = compose(
        // assigns fill and stroke color (FG or BG)
        createPaintTargets,
        // add fill="none" to tags with no fill
        ensureNoFill,
        // Unwraps nested groups and wraps all children in single group tage with data-geon marked if the element is a base shape
        normalizeGroups,
        // Removes the root tag, in this case we remove the <svg> tag
        removeOuterSVGTag,
        // removeClipPath,
        removeDefs,
      )(ast);
      return acc;
    }, {});

  // Delete the existing index.json file
  del.sync(SVG_INPUT_PATH + 'index.json')

  // Write the index object to disk as JSON file
  fs.writeFile(
    INDEX_OUTPUT_PATH + 'index.json',
    JSON.stringify(index, null, 2),
    (err) => {
      if (err) console.log(err)
  })
}

const removeOuterSVGTag = (node:Ast) => node.children[0];

// flattenGroups and normalize groups propbably could be written better
// const flattenGroups = (acc:Ast[], node:Ast) => {
//   if (node.name === 'g') {
//     // @ts-ignore
//     acc = [...acc, ...node.children.reduce((a, c) => [...a, flattenGroups(a, c)], [])]
//     return acc
//   }
//   return node
// }

const flatten = (_acc:Ast[], children:Ast[]):Ast[] => children.reduce((acc, c) => {
	acc = [...acc, c]
  return flatten(acc, c.children)
}, _acc)

const trim = (arr:Ast[]):Ast[] => arr.map(n => {
	n.children = []
  return n
})

const normalizeGroups = (node:Ast) => {

  const group = {
    name: "g",
    type: "element",
    value: "",
    attributes: {},
    children: trim(flatten([], node.children)),
  }

  // Assign property to root shape
  group.children[0].attributes['data-isGeon'] = 'true'
  return group
}

const FG = '@FG'
const BG = '@BG'

const createPaintTargets = (node:Ast):Ast => {

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
    children: node.children.map(n => createPaintTargets(n)),
    ...node,
  }
}

const ensureNoFill = (node:Ast):Ast => {
  return {
    attributes: {
      ...node.attributes,
      fill: node.attributes.fill === undefined
        ? 'none'
        : node.attributes.fill
    },
    children: node.children.map(n => ensureNoFill(n)),
    ...node
  }
}

const removeDefs = (node:Ast):Ast => {
  return {
    children: node.children
      .filter(n => n.name !== 'defs')
      .map(n => removeDefs(n)),
    ...node,
  }
}

export default buildIndex
