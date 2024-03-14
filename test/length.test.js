const sigil = require('../dist/index').default;

const config = {
  point: null,
};

test('throws on length 3', () => {
  config.point = 'rafter-fig';
  expect(() => {
    sigil(config);
  }).toThrow();
});

test('throws on length 5', () => {
  config.point = 'rovbud-fignys-mas';
  expect(() => {
    sigil(config);
  }).toThrow();
});

test('throws on length 7', () => {
  config.point = 'ridlur-dozzod-master-lis';
  expect(() => {
    sigil(config);
  }).toThrow();
});

test('throws on length 9', () => {
  config.point = 'ridlur-dozzod-master-listen-mas';
  expect(() => {
    sigil(config);
  }).toThrow();
});
