const sigil = require('../dist/index').default;

const config = {
  point: 'zod',
};

test('Uses defaults', () => {
  expect(() => {
    const s = sigil(config);
  }).not.toThrow();
});
