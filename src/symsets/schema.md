```js

const glyphset = {
  glyphs: [
    {
      1: {
        svg: (g, params) => {
          const path = pPath({pathData: 'M 32 0L 16 0L 16 0C 16 3.31371 13.3137 6 10 6L 0 6L 0 26L 10 26C 13.3137 26 16 28.6863 16 32L 16 32L 32 32L 32 0Z', ...params})
          path.scale(scale)
          return path
        },
        edgeMap: [{ 1:'a', 2:'b', 3:'b', 4:'b' }],
        transform: ['rotate'],
      },
    },
  ],
  glyphGrid: rectGrid(...),
  groupGrid: rectGrid(...),
  name: 'Lorem'
}

```
