const sigil = require('../dist/index').default;

const config = {
  point: null,
};

test('Accepts sig', () => {
  config.point = '~mitten';
  expect(() => {
    sigil(config);
  }).not.toThrow();
});