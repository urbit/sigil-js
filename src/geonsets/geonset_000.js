import {
  // pPathRect,
  // pPoint,
  // pGroup,
  // pSize,
  // pPathCircle,
  // pPatfronc,
  // pPathCenterPointArc,
  // pPathLine,
  compoundPath,
  path,
  rectGrid,
  opPipe,
} from '../lib/lib.paper'

import {
  keys,
  prop,
} from '../lib/lib'

const size = 256

const geons = {
  coin: 'M0 64C0 28.6538 28.6538 0 64 0C99.3462 0 128 28.6538 128 64C128 99.3462 99.3462 128 64 128C28.6538 128 0 99.3462 0 64Z',
  qoin: "M128 0V128H0C0 57.3076 57.3076 0 128 0Z",
  blok: "M0 128V0H128V128H0Z",
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
  bugg: [
    "M128 32C128 49.6731 113.673 64 96 64C78.3269 64 64 49.6731 64 32C64 14.3269 78.3269 0 96 0C113.673 0 128 14.3269 128 32Z",
    "M64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32Z",
    "M0 128C0 92.6538 28.6538 64 64 64C99.3462 64 128 92.6538 128 128H0Z",
  ],
}

// edge types
const e = {
  full: 'full',
  round: 'round',
  none: 'none',
  half_top: 'half_top',
  half_bottom: 'half_bottom',
  half_left: 'half_leftå',
  half_right: 'half_right',
}

const geonset = {
  name: 'geonset_000',
  geons: {
    // circle
    0: {
      name: 'coin',
      ownKey: 0,
      insert: params => {
        return path({
          pathData: geons.coin,
          ...params,
        })
      },
      edgeMap: [e.round, e.round, e.round, e.round]
    },
    // Quarter Circle, 0deg
    1: {
      name: 'qoin',
      ownKey: 1,
      insert: params => {
        return path({
          pathData: geons.qoin,
          ...params,
        })
      },
      edgeMap: [e.none,e.full,e.full,e.none]
    },
    // Quarter Circle, 90deg
    2: {
      name: 'qoin',
      ownKey: 2,
      insert: params => {
        const p = path({
          pathData: geons.qoin,
          ...params,
        })
        p.rotate(90)
        return p
      },
      edgeMap: [e.none,e.none,e.full,e.full]
    },
    // Quarter Circle, 180deg
    3: {
      name: 'qoin',
      ownKey: 3,
      insert: params => {
        const p = path({
          pathData: geons.qoin,
          ...params,
        })
        p.rotate(180)
        return p
      },
      edgeMap: [e.full,e.none,e.none,e.full]
    },
    // Quarter Circle, 270deg
    4: {
      name: 'qoin',
      ownKey: 4,
      insert: params => {
        const p = path({
          pathData: geons.qoin,
          ...params,
        })
        p.rotate(270)
        return p
      },
      edgeMap: [e.full,e.full,e.none,e.none]
    },
    // square
    5: {
      name: 'blok',
      ownKey: 5,
      insert: params => {
        const p = path({
          pathData: geons.blok,
          ...params,
        })
        p.rotate(270)
        return p
      },
      edgeMap: [e.full,e.full,e.full,e.full]
    },
    // toomstone, 0deg
    6: {
      name: 'toom',
      ownKey: 6,
      insert: params => {
        return path({
          pathData: geons.toom,
          ...params,
        })
      },
      edgeMap: [e.full,e.half_top,e.round,e.half_top]
    },
    // toomstone, 90deg
    7: {
      name: 'toom',
      ownKey: 7,
      insert: params => {
        const p = path({
          pathData: geons.toom,
          ...params,
        })
        p.rotate(90)
        return p
      },
      edgeMap: [e.half_left,e.full,e.half_left,e.round]
    },
    // toomstone, 180deg
    8: {
      name: 'toom',
      ownKey: 8,
      insert: params => {
        const p = path({
          pathData: geons.toom,
          ...params,
        })
        p.rotate(180)
        return p
      },
      edgeMap: [e.round,e.half_bottom,e.full,e.half_bottom]
    },
    // toomstone, 270deg
    9: {
      name: 'toom',
      ownKey: 9,
      insert: params => {
        const p = path({
          pathData: geons.toom,
          ...params,
        })
        p.rotate(270)
        return p
      },
      edgeMap: [e.half_right,e.round,e.half_right,e.full]
    },
    // leef, 0deg
    10: {
      name: 'leef',
      ownKey: 10,
      insert: params => {
        return path({
          pathData: geons.leef,
          ...params,
        })
      },
      edgeMap: [e.half_left,e.half_bottom,e.half_right,e.half_top]
    },
    // leef, 90deg
    11: {
      name: 'leef',
      ownKey: 11,
      insert: params => {
        const p = path({
          pathData: geons.leef,
          ...params,
        })
        p.rotate(90)
        return p
      },
      edgeMap: [e.half_right, e.half_top, e.half_left, e.half_bottom]
    },
    // grap, 0deg
    12: {
      name: 'grap',
      ownKey: 12,
      insert: params => {
        return compoundPath({
          children: geons.grap.map(p => path(p)),
          ...params,
        })
      },
      edgeMap: [e.none,e.none,e.none,e.none]
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
    //   edgeMap: [e.none,e.full,e.none,e.full]
    // },
    // teer, 0deg
    14: {
      name: 'teer',
      ownKey: 14,
      insert: params => {
        return path({
          pathData: geons.teer,
          ...params,
        })
      },
      edgeMap: [e.half_left,e.round,e.round,e.half_top]
    },
    // teer, 90deg
    15: {
      name: 'teer',
      ownKey: 15,
      insert: params => {
        const p = path({
          pathData: geons.teer,
          ...params,
        })
        p.rotate(90)
        return p
      },
      edgeMap: [e.half_right,e.half_top,e.round,e.round]
    },
    // teer, 180deg
    16: {
      name: 'teer',
      ownKey: 16,
      insert: params => {
        const p = path({
          pathData: geons.teer,
          ...params,
        })
        p.rotate(180)
        return p
      },
      edgeMap: [e.round,e.half_bottom,e.half_right,e.round]
    },
    // teer, 270deg
    17: {
      name: 'teer',
      ownKey: 17,
      insert: params => {
        const p = path({
          pathData: geons.teer,
          ...params,
        })
        p.rotate(270)
        return p
      },
      edgeMap: [e.round,e.round,e.half_left,e.half_bottom]
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
    //   edgeMap: [e.none,e.full,e.none,e.full]
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
    //   edgeMap: [e.full,e.none,e.full,e.none]
    // },
    // bugg 0deg
    20: {
      name: 'bugg',
      ownKey: 20,
      insert: params => {
        const p = compoundPath({
          children: geons.bugg.map(p => path(p)),
          ...params,
        })
        p.rotate(0)
        return p
      },
      edgeMap: [e.none,e.none,e.full,e.none]
    },
    // bugg 90deg
    21: {
      name: 'bugg',
      ownKey: 21,
      insert: params => {
        const p = compoundPath({
          children: geons.bugg.map(p => path(p)),
          ...params,
        })
        p.rotate(90)
        return p
      },
      edgeMap: [e.none,e.none,e.none,e.full]
    },
    // bugg 180deg
    22: {
      name: 'bugg',
      ownKey: 22,
      insert: params => {
        const p = compoundPath({
          children: geons.bugg.map(p => path(p)),
          ...params,
        })
        p.rotate(180)
        return p
      },
      edgeMap: [e.full,e.none,e.none,e.none]
    },
    // bugg 270deg
    23: {
      name: 'bugg',
      ownKey: 23,
      insert: params => {
        const p = compoundPath({
          children: geons.bugg.map(p => path(p)),
          ...params,
        })
        p.rotate(270)
        return p
      },
      edgeMap: [e.none,e.full,e.none,e.none]
    },
  },
  grid: () => rectGrid({ x:96, y:96 }, { x:128, y:128 }, { x:4, y:4 }, true),
  geonGrid: () => rectGrid({ x:96, y:96 }, { x:128, y:128 }, { x:2, y:2 }, true),
  readKeys: geonset => keys(prop('geons', geonset)),
}

export default geonset
