const sigil = require('../dist/index').default;

const config = {
  point: 'zod',
};

test('Uses defaults', () => {
  expect(() => {
    const s = sigil(config);
    console.log(s)
  }).not.toThrow();
});
