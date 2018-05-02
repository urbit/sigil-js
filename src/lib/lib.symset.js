import symsetAlphabetA from '../symsets/symset.alphabet.a'
import symsetSymbolsA from '../symsets/symset.symbols.a'
import symsetSymbolsB from '../symsets/symset.symbols.b'
import symsetSymbolsC from '../symsets/symset.symbols.c'
import symsetSymbolsD from '../symsets/symset.symbols.d'
import symsetSymbolsE from '../symsets/symset.symbols.e'
import symsetSymbolsF from '../symsets/symset.symbols.f'
import glyphsetSchemaA from '../symsets/glyphset.schema.a'
import glyphsetSchemaB from '../symsets/glyphset.schema.b'


// re-package sets
const sets = {
  symsetAlphabetA,
  symsetSymbolsA,
  symsetSymbolsB,
  symsetSymbolsC,
  symsetSymbolsD,
  symsetSymbolsE,
  symsetSymbolsF,
  glyphsetSchemaA,
  glyphsetSchemaB,
}

const getChar = (set, char) => getSet(set)[char]

const getSet = set => sets[set]


// generate combinations of the edgemap
// generate every set, but don't render
// filter sets with rules
// render remainder

// const generate = gyphset => method => iter => method(gyphset, iter).toArray()
//
// const toAbove = xy => {
//   const row = xy[0]
//   const col = xy[1]
//   return col === 0
//     ? false
//     : [col - 1, row]
// }
//
// // cord = [0,0], row, column
// // returns an index to the left of an item
// const toLeft = xy => {
//   const row = xy[0]
//   const col = xy[1]
//   return row === 0
//     ? false
//     : [col, row - 1]
// }
//
// const getAtCoord = grid => coord => grid[coord[0]][coord[1]]
//
// // ruleset is a whitelist
// const ruleSet = {
//   // where each key references items that can be mates
//   edgeMap: [
//     a: 'a',
//     b: 'b',
//   ],
// }
//
// // filter symbols based on their own ruleset
// // where symbol is a matrix of the same shape as a grid
// const sieve = symbol => ruleSet => {
//   filter(symbol, (row, rowIdx) => filter(row, (column, colIdx) => {
//     // check left
//     let leftResult = false
//     const leftIndex = toLeft([rowIdx, colIdx])
//     if (isArray(leftIndex)) {
//       const leftGlyph = getAtCoord(symbol, leftIndex)
//       const thisGlyph = getAtCoord(symbol, [rowIdx, colIdx])
//       leftResult = edgeMapComparator(thisGlyph)(leftGlyph)(ruleSet)
//     } else {
//       leftResult = true
//     }
//
//     // check up
//       // basically the same for up
//
//
//   }))
// }
//
//
// const edgeMapComparator = a => b => ruleSet =>  {
//
// }


export {
  sets,
  getChar,
  getSet,
}
