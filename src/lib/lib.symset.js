import symsetAlphabetA from '../symsets/symset.alphabet.a'
import symsetSymbolsA from '../symsets/symset.symbols.a'

// re-package sets
const sets = {
  symsetAlphabetA,
  symsetSymbolsA,
}

const getChar = (set, char) => getSet(set)[char]

const getSet = set => sets[set]

export {
  sets,
  getChar,
  getSet,
}
