const {sigil, stringRenderer} = require('../dist/index');

const config = {
  patp: null,
  size: 128,
  renderer: stringRenderer,
  color: ['#fff', '#000'],
};

test('throws on length 3', () => {
  config.patp = 'rafter-fig';
  expect(() => {
    sigil(config);
  }).toThrow();
});

test('throws on length 5', () => {
  config.patp = 'rovbud-fignys-mas';
  expect(() => {
    sigil(config);
  }).toThrow();
});

test('throws on length 8', () => {
  config.patp = 'ridlur-dozzod-master-listen';
  expect(() => {
    sigil(config);
  }).toThrow();
});
