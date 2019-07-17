const { sigil, stringRenderer } = require('../lib/dist/index')

const config = {
  patp: 'zod',
  renderer: stringRenderer,
  size: 128
}

const config2 = {
  patp: 'zod',
  size: 128
}

test('Uses defaults', () => {
  expect(() => { sigil(config) }).not.toThrow()
})

const astStringifiedTarget = {"name":"svg","attributes":{"style":{"width":"100%","height":"100%","display":"block","width": "128px","height": "128px",},"viewBox":"0 0 128 128","version":"1.1","xmlns":"http://www.w3.org/2000/svg"},"children":[{"name":"rect","attributes":{"fill":"#000","width":"128px","height":"128px","x":0,"y":0},"children":[]},{"name":"g","attributes":{"transform":"matrix(0.39837890625,0,0,0.39837890625,38.71125000000001,38.71125000000001)"},"children":[{"name":"circle","attributes":{"cx":"64","cy":"64","r":"64","fill":"#fff"},"children":[]}]}]}

test('Returns AST with no renderer defined', () => {
  expect(sigil(config2)).toMatchObject(astStringifiedTarget)
})
