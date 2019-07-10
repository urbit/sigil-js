const { sigil, stringRenderer } = require('../dist/index')

const config = {
  patp: null,
  size: 128,
  renderer: stringRenderer,
  color: ['#fff', '#000']
}

test('throws on length 3', () => {
  config.patp = 'ridlur-fig'
  expect(() => { sigil(config) }).toThrow()
})

test('throws on length 5', () => {
  config.patp = 'ridlur-figbud-mas'
  expect(() => { sigil(config) }).toThrow()
})

test('throws on length 8', () => {
  config.patp = 'ridlur-figbud-ridlur-figbud'
  expect(() => { sigil(config) }).toThrow()
})
