import { pour } from '../dist/bundle'

test('converts zod', () => {
  const r = pour({
    patp: 'zod',
    renderer: undefined,
    size: 128
  })
  console.log(r)
  expect(r).toBeDefined();
});
