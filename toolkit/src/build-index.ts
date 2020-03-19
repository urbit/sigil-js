// @ts-ignore
import * as svgson from 'svgson'
import * as fs from 'fs'
import * as path from 'path'
import * as del from 'del'
import { Ast } from '../../types'

// Paths relative from /dist
const SVG_INPUT_PATH = __dirname + '/../assets/svg/';
const INDEX_OUTPUT_PATH = __dirname + '/../assets/';
const FG = '@FG'
const BG = '@BG'

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
        // remove several attributes to save disk space
        removeType,
        removeValue,
        removeId,
        // assigns fill and stroke color (FG or BG)
        createPaintTargets,
        // add fill="none" to tags with no fill
        // ensureNoFill,
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

const flatten = (_acc:Ast[], children:Ast[]):Ast[] => children.reduce((acc, c) => {
	acc = [...acc, c]
  return flatten(acc, c.children)
}, _acc)

const removeChildren = (arr:Ast[]):Ast[] => arr.map(n => {
	n.children = []
  return n
})

const removeGroups = (arr: Ast[]):Ast[] => arr.filter(n => {
  if (n.name === 'g') return false
  return true
})

const normalizeGroups = (node:Ast) => {
  const group = {
    name: "g",
    type: "element",
    value: "",
    attributes: {},
    children: removeGroups(removeChildren(flatten([], node.children))),
  }
  // Assign property to root shape
  group.children[0].attributes['dataisgeon'] = 'true'
  return group
}

const createPaintTargets = (node:Ast):Ast => {

  if (node.attributes.fill === undefined) {
    node.attributes.fill = 'none'
  }

  if (node.attributes.fill === 'white') {
    node.attributes.fill = BG
  }

  if (node.attributes.fill === 'black') {
    node.attributes.fill = FG
  }

  if (node.attributes.stroke === 'white') {
    node.attributes.stroke = BG
  }

  if (node.attributes.stroke === 'black') {
    node.attributes.stroke = FG
  }

  return {
    children: node.children.map(n => createPaintTargets(n)),
    ...node,
  }
}

// const ensureNoFill = (node:Ast):Ast => {
//   return {
//     attributes: {
//       ...node.attributes,
//       fill: node.attributes.fill === undefined
//         ? 'none'
//         : node.attributes.fill
//     },
//     children: node.children.map(n => ensureNoFill(n)),
//     ...node
//   }
// }

const removeId = (node:Ast):Ast => {
  delete node.attributes.id
  return {
    ...node,
    children: node.children.map(c => removeId(c))
  }
}

const removeType = (node:Ast):Ast => {
  delete node.type
  return {
    ...node,
    children: node.children.map(c => removeType(c))
  }
}

const removeValue = (node:Ast):Ast => {
  delete node.value
  return {
    ...node,
    children: node.children.map(c => removeValue(c))
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
