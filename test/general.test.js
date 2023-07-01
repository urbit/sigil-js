const sigil = require('../dist/index').default;

const config = {
  point: null,
  foreground: 'blue',
  background: 'green',
};

test('Galaxy works', () => {
  config.point = 'zod';
  expect(() => {
    sigil(config);
  }).not.toThrow();
});

test('Star works', () => {
  config.point = 'ridlur';
  expect(() => {
    sigil(config);
  }).not.toThrow();
});

test('Planet works', () => {
  config.point = 'littel-ponnys';
  expect(() => {
    sigil(config);
  }).not.toThrow();
});

test('Moon works', () => {
  config.point = 'dister-dister-datryn-ribdun';
  expect(() => {
    sigil(config);
  }).not.toThrow();
});

test('Invalid name is invalidated', () => {
  config.point = 'and';
  expect(() => {
    sigil(config);
  }).toThrow();
});
