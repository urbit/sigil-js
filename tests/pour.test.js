import { glyph } from '../dist/bundle'

test('converts zod', () => {
  const r = glyph({
    patp: 'zod',
    renderer: undefined,
    size: 128
  });

  expect(r).toBeDefined();
});
