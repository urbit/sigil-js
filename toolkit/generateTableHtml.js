const fs = require('fs');
const svgson = require('svgson')
const path = require('path')
const del = require('del');

const { PATHS, EXT } = require('./constants')

// This script modifies strokeWidth of SVGs to make image testing faster and easier by enabling smaller PNGs.

const INPUT_PATH = PATHS.log
const OUTPUT_PATH = PATHS.log

const buffer = fs.readFileSync(INPUT_PATH + 'log.json')

const html = JSON
  .parse(buffer)
  .reduce(p => {
    return (
      `<div class='flex'>
        <p class='mono'>${p}</p>
        <img class='s8' src='media.urbit.org/sigil/${p}-old.png' />
        <img class='s8' src='media.urbit.org/sigil/${p}-new.png' />
        <img class='s8' src='media.urbit.org/sigil/${p}-diff.png' />
      </div>
      `
    )
  }, '')

  const pre = `<div class='flex-col'>`
  const post = `</div>`

  const out = [pre, html, post].join('\n')

  fs.writeFile(
    OUTPUT_PATH + log.html,
    out,
    err => { if (err) console.error(err) }
  )

// delete existing files
// del.sync(OUTPUT_PATH)
//
// // Recurses through AST
// const process = node => {
//
//   if (node.attributes.stroke !== undefined) {
//     node.attributes['stroke-width'] = '3px'
//   }
//
//   return {
//     ...node,
//     children: node.children.map(n => process(n))
//   }
// }

// fs.readdirSync(INPUT_PATH)
//   .filter(f => path.extname(f).toLowerCase() === EXT.csv)
//   .forEach(f => {
//     // get the file contents as UTF8
//     const content = fs.readFileSync(INPUT_PATH + f, 'utf8');
//     // parse the SVG string into an AST
//     const ast = svgson.parseSync(content)
//     // change attributes in the AST
//     const astProcessed = process(ast)
//     // parse the AST back into svg
//     const result = svgson.stringify(astProcessed)
//     // Write out new files
//     fs.writeFile(
//       OUTPUT_PATH + f,
//       result,
//       err => { if (err) console.error(err) }
//     )
//   })
