import symsetAlphabetA from '../symsets/symset.alphabet.a'
import symsetSymbolsA from '../symsets/symset.symbols.a'
import symsetSymbolsB from '../symsets/symset.symbols.b'
import symsetSymbolsC from '../symsets/symset.symbols.c'
import symsetSymbolsD from '../symsets/symset.symbols.d'
import symsetSymbolsE from '../symsets/symset.symbols.e'
import symsetSymbolsF from '../symsets/symset.symbols.f'

// re-package sets
const sets = {
  symsetAlphabetA,
  symsetSymbolsA,
  symsetSymbolsB,
  symsetSymbolsC,
  symsetSymbolsD,
  symsetSymbolsE,
  symsetSymbolsF,
}

const getChar = (set, char) => getSet(set)[char]

const getSet = set => sets[set]

export {
  sets,
  getChar,
  getSet,
}
