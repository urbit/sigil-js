import {
  // pPathRect,
  // pPoint,
  // pGroup,
  // pSize,
  // pPathCircle,
  // pPatfronc,
  // pPathCenterPointArc,
  // pPathLine,
  pCompoundPath,
  pPath,
  rectGrid,
  opPipe,
} from '../lib/lib.paper'

const size = 256

const path = pPath
const compoundPath = pCompoundPath

const geons = {
  circ: 'M0 64C0 28.6538 28.6538 0 64 0C99.3462 0 128 28.6538 128 64C128 99.3462 99.3462 128 64 128C28.6538 128 0 99.3462 0 64Z',
  qirc: "M128 0V128H0C0 57.3076 57.3076 0 128 0Z",
  sqar: "M0 128V0H128V128H0Z",
  toom: "M64 0H128V64C128 99.3467 99.346 128 64 128C28.6538 128 0 99.3467 0 64V0H64",
  leef: "M0 0H60.718V0.0827026C61.8052 0.0277926 62.8992 0 64 0C98.2452 0 126.209 26.8969 127.917 60.718H128V128H67.282V127.917C67.1496 127.924 67.0168 127.93 66.884 127.936C65.928 127.978 64.9664 128 64 128C29.7546 128 1.79106 101.103 0.0827332 67.282H0V0Z",
  teer: "M0 64V0H64C99.3462 0 128 28.6538 128 64C128 99.3462 99.3462 128 64 128C28.6538 128 0 99.3462 0 64Z",
  book: "M0 128V0H96C113.673 0 128 14.3271 128 32C128 49.6733 113.673 64 96 64C113.673 64 128 78.3271 128 96C128 113.673 113.673 128 96 128H0Z",
  kell: "M0 96C0 113.673 14.3267 128 32 128C49.6733 128 64 113.673 64 96C64 113.673 78.3267 128 96 128C113.673 128 128 113.673 128 96V32C128 14.3267 113.673 0 96 0C78.3267 0 64 14.3267 64 32C64 14.3267 49.6733 0 32 0C14.3267 0 0 14.3267 0 32V96Z",
  grap: [
    "M32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0Z",
    "M32 64C49.6731 64 64 78.3269 64 96C64 113.673 49.6731 128 32 128C14.3269 128 0 113.673 0 96C0 78.3269 14.3269 64 32 64Z",
    "M96 0C113.673 0 128 14.3269 128 32C128 49.6731 113.673 64 96 64C78.3269 64 64 49.6731 64 32C64 14.3269 78.3269 0 96 0Z",
    "M96 64C113.673 64 128 78.3269 128 96C128 113.673 113.673 128 96 128C78.3269 128 64 113.673 64 96C64 78.3269 78.3269 64 96 64Z",
  ],
  fatt: [
    "M32 128C14.3269 128 0 113.673 0 96V32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32V96C64 113.673 49.6731 128 32 128Z",
    "M96 128C78.3269 128 64 113.673 64 96V32C64 14.3269 78.3269 0 96 0C113.673 0 128 14.3269 128 32V96C128 113.673 113.673 128 96 128Z",
  ],
}

// const mates = {
//   // fulll
//   a: [m.full],
//   // nonee
//   b: [m.none],
//   // backf
//   c: ['c', m.full],
// }

// mates
const m = {
  full: 'full',
  rond: 'rond',
  none: 'none',
  fron: 'fron',
  back: 'back',
}

const glyphset = {
  glyphs: {
    // circle
    0: {
      insert: params => {
        return path({
          pathData: geons.circ,
          ...params,
        })
      },
      edgeMap: [m.rond, m.rond, m.rond, m.rond]
    },
    // Quarter Circle, 0deg
    1: {
      insert: params => {
        return path({
          pathData: geons.qirc,
          ...params,
        })
      },
      edgeMap: [m.none,m.full,m.full,m.none]
    },
    // Quarter Circle, 90deg
    2: {
      insert: params => {
        const p = path({
          pathData: geons.qirc,
          ...params,
        })
        p.rotate(90)
        return p
      },
      edgeMap: [m.none,m.none,m.full,m.full]
    },
    // Quarter Circle, 180deg
    3: {
      insert: params => {
        const p = path({
          pathData: geons.qirc,
          ...params,
        })
        p.rotate(180)
        return p
      },
      edgeMap: [m.full,m.none,m.none,m.full]
    },
    // Quarter Circle, 270deg
    4: {
      insert: params => {
        const p = path({
          pathData: geons.qirc,
          ...params,
        })
        p.rotate(270)
        return p
      },
      edgeMap: [m.full,m.full,m.none,m.none]
    },
    // square
    5: {
      insert: params => {
        const p = path({
          pathData: geons.sqar,
          ...params,
        })
        p.rotate(270)
        return p
      },
      edgeMap: [m.full,m.full,m.full,m.full]
    },
    // toomstone, 0deg
    6: {
      insert: params => {
        return path({
          pathData: geons.toom,
          ...params,
        })
      },
      edgeMap: [m.full,'c',m.none,'c']
    },
    // toomstone, 90deg
    7: {
      insert: params => {
        const p = path({
          pathData: geons.toom,
          ...params,
        })
        p.rotate(90)
        return p
      },
      edgeMap: ['c',m.full,'c',m.none]
    },
    // toomstone, 180deg
    8: {
      insert: params => {
        const p = path({
          pathData: geons.toom,
          ...params,
        })
        p.rotate(180)
        return p
      },
      edgeMap: [m.none,'c',m.full,'c']
    },
    // toomstone, 270deg
    9: {
      insert: params => {
        const p = path({
          pathData: geons.toom,
          ...params,
        })
        p.rotate(270)
        return p
      },
      edgeMap: ['c',m.none,'c',m.full]
    },
    // leef, 0deg
    10: {
      insert: params => {
        return path({
          pathData: geons.leef,
          ...params,
        })
      },
      edgeMap: ['c','c','c','c']
    },
    // leef, 90deg
    11: {
      insert: params => {
        const p = path({
          pathData: geons.leef,
          ...params,
        })
        p.rotate(90)
        return p
      },
      edgeMap: ['c','c','c','c']
    },
    // grap, 0deg
    12: {
      insert: params => {
        return compoundPath({
          children: geons.grap.map(p => path(p)),
          ...params,
        })
      },
      edgeMap: [m.none,m.none,m.none,m.none]
    },
    // fatt, 0deg
    // 13: {
    //   insert: params => {
    //     const p = path({
    //       children: geons.fatt.map(p => path(p)),
    //       ...params,
    //     })
    //     p.rotate(270)
    //     return p
    //   },
    //   edgeMap: [m.none,m.full,m.none,m.full]
    // },
    // teer, 0deg
    14: {
      insert: params => {
        return path({
          pathData: geons.teer,
          ...params,
        })
      },
      edgeMap: ['c',m.none,m.none,'c']
    },
    // teer, 90deg
    15: {
      insert: params => {
        const p = path({
          pathData: geons.teer,
          ...params,
        })
        p.rotate(90)
        return p
      },
      edgeMap: ['c','c',m.none,m.none]
    },
    // teer, 180deg
    16: {
      insert: params => {
        const p = path({
          pathData: geons.teer,
          ...params,
        })
        p.rotate(180)
        return p
      },
      edgeMap: [m.none,'c','c',m.none]
    },
    // teer, 270deg
    17: {
      insert: params => {
        const p = path({
          pathData: geons.teer,
          ...params,
        })
        p.rotate(270)
        return p
      },
      edgeMap: [m.none,m.none,'c','c']
    },
    // // fatt
    // 18: {
    //   insert: params => {
    //     const p = compoundPath({
    //       children: geons.fatt.map(p => path(p)),
    //       ...params,
    //     })
    //     p.rotate(0)
    //     return p
    //   },
    //   edgeMap: [m.none,m.full,m.none,m.full]
    // },
    // // fatt, 90deg
    // 19: {
    //   insert: params => {
    //     const p = compoundPath({
    //       children: geons.fatt.map(p => path(p)),
    //       ...params,
    //     })
    //     p.rotate(90)
    //     return p
    //   },
    //   edgeMap: [m.full,m.none,m.full,m.none]
    // },
  },

  geonGrid: () => rectGrid({ x:256, y:256 }, { x:size, y:size }, { x: 2, y: 2 }, true),
  syllableGrid: () => rectGrid({ x:0, y:0 }, { x:size*2, y:size*2 }, { x: 2, y: 2 }, true),
}

export default glyphset
