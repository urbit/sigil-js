const {sigil, stringRenderer} = require('../lib/dist/index');

const config = {
  patp: null,
  size: 128,
  renderer: stringRenderer,
  color: ['#fff', '#000'],
};

test('Galaxy works', () => {
  config.patp = 'zod';
  expect(() => {
    sigil(config);
  }).not.toThrow();
});

test('Star works', () => {
  config.patp = 'ridlur';
  expect(() => {
    sigil(config);
  }).not.toThrow();
});

test('Planet works', () => {
  config.patp = 'littel-ponnys';
  expect(() => {
    sigil(config);
  }).not.toThrow();
});

test('Invalid name is invalidated', () => {
  config.patp = 'and';
  expect(() => {
    sigil(config);
  }).toThrow();
});
