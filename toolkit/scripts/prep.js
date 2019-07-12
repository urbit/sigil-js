const fs = require('fs');
const svgson = require('svgson')
const path = require('path')

const { PATHS, EXT } = require('../constants')
const { removeContentSync } = require('../helpers')

// This script modifies strokeWidth of SVGs to make image testing faster and easier by enabling smaller PNGs.

const INPUT_PATH = PATHS.svg
const OUTPUT_PATH = PATHS.svgSmall

// delete existing files
removeContentSync(OUTPUT_PATH)

// Recurses through AST
const process = node => {

  if (node.attributes.stroke !== undefined) {
    node.attributes['stroke-width'] = '3px'
  }

  return {
    ...node,
    children: node.children.map(n => process(n))
  }
}

fs.readdirSync(INPUT_PATH)
  .filter(f => path.extname(f).toLowerCase() === EXT.svg)
  .forEach(f => {
    // get the file contents as UTF8
    const content = fs.readFileSync(INPUT_PATH + f, 'utf8');
    // parse the SVG string into an AST
    const ast = svgson.parseSync(content)
    // change attributes in the AST
    const astProcessed = process(ast)
    // parse the AST back into svg
    const result = svgson.stringify(astProcessed)
    // Write out new files
    fs.writeFile(
      OUTPUT_PATH + f,
      result,
      err => { if (err) console.error(err) }
    )
  })
