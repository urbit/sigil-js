import {
  pPathRect,
  pPoint,
  pGroup,
  pSize,
  pPathCircle,
  pPathArc,
  pPathCenterPointArc,
  pPathLine,
  pCompoundPath,
  pPath,
  unitRect,
  extent,
  unit,
  origin,
  rectGrid,
  opPipe,
  pointOnArcPath,
  toDegrees,
  toRadians,
} from '../lib/lib.paper'

const size = 128

const path = pPath

const roots = {
  circ: 'M0 64C0 28.6538 28.6538 0 64 0C99.3462 0 128 28.6538 128 64C128 99.3462 99.3462 128 64 128C28.6538 128 0 99.3462 0 64Z',
  qirc: "M128 0V128H0C0 57.3076 57.3076 0 128 0Z",
  sqar: "M0 128V0H128V128H0Z",
  toom: "M64 0H128V64C128 99.3467 99.346 128 64 128C28.6538 128 0 99.3467 0 64V0H64",
  leef: "M0 0H60.718V0.0827026C61.8052 0.0277926 62.8992 0 64 0C98.2452 0 126.209 26.8969 127.917 60.718H128V128H67.282V127.917C67.1496 127.924 67.0168 127.93 66.884 127.936C65.928 127.978 64.9664 128 64 128C29.7546 128 1.79106 101.103 0.0827332 67.282H0V0Z",
  teer: "M0 64V0H64C99.3462 0 128 28.6538 128 64C128 99.3462 99.3462 128 64 128C28.6538 128 0 99.3462 0 64Z",
  book: "M0 128V0H96C113.673 0 128 14.3271 128 32C128 49.6733 113.673 64 96 64C113.673 64 128 78.3271 128 96C128 113.673 113.673 128 96 128H0Z",
  kell: "M0 96C0 113.673 14.3267 128 32 128C49.6733 128 64 113.673 64 96C64 113.673 78.3267 128 96 128C113.673 128 128 113.673 128 96V32C128 14.3267 113.673 0 96 0C78.3267 0 64 14.3267 64 32C64 14.3267 49.6733 0 32 0C14.3267 0 0 14.3267 0 32V96Z",
}

const mates = {
  // full
  a: ['a'],
  // none
  b: ['b'],
  // half
  c: ['c', 'a'],
}

const glyphset = {
  glyphs: {
    // circle
    0: {
      render: params => {
        return path({
          pathData: roots.circ,
          ...params,
        })
      },
      edgeMap: ['b','b','b','b']
    },
    // Quarter Circle, 0deg
    1: {
      render: params => {
        return path({
          pathData: roots.qirc,
          ...params,
        })
      },
      edgeMap: ['b','a','a','b']
    },
    // Quarter Circle, 90deg
    2: {
      render: params => {
        const p = path({
          pathData: roots.qirc,
          ...params,
        })
        p.rotate(90)
        return p
      },
      edgeMap: ['b','b','a','a']
    },
    // Quarter Circle, 180deg
    3: {
      render: params => {
        const p = path({
          pathData: roots.qirc,
          ...params,
        })
        p.rotate(180)
        return p
      },
      edgeMap: ['a','b','b','a']
    },
    // Quarter Circle, 270deg
    4: {
      render: params => {
        const p = path({
          pathData: roots.qirc,
          ...params,
        })
        p.rotate(270)
        return p
      },
      edgeMap: ['a','a','b','b']
    },
    // square
    5: {
      render: params => {
        const p = path({
          pathData: roots.sqar,
          ...params,
        })
        p.rotate(270)
        return p
      },
      edgeMap: ['a','a','a','a']
    },
    // toomstone, 0deg
    6: {
      render: params => {
        return path({
          pathData: roots.toom,
          ...params,
        })
      },
      edgeMap: ['a','c','b','c']
    },
    // toomstone, 90deg
    7: {
      render: params => {
        const p = path({
          pathData: roots.toom,
          ...params,
        })
        p.rotate(90)
        return p
      },
      edgeMap: ['c','a','c','b']
    },
    // toomstone, 180deg
    8: {
      render: params => {
        const p = path({
          pathData: roots.toom,
          ...params,
        })
        p.rotate(180)
        return p
      },
      edgeMap: ['b','c','a','c']
    },
    // toomstone, 270deg
    9: {
      render: params => {
        const p = path({
          pathData: roots.toom,
          ...params,
        })
        p.rotate(270)
        return p
      },
      edgeMap: ['c','b','c','a']
    },
    // leef, 0deg
    10: {
      render: params => {
        return path({
          pathData: roots.leef,
          ...params,
        })
      },
      edgeMap: ['c','c','c','c']
    },
    // leef, 90deg
    11: {
      render: params => {
        const p = path({
          pathData: roots.leef,
          ...params,
        })
        p.rotate(90)
        return p
      },
      edgeMap: ['c','c','c','c']
    },
    // // leef, 180deg
    // 12: {
    //   render: params => {
    //     const p = path({
    //       pathData: roots.leef,
    //       ...params,
    //     })
    //     p.rotate(180)
    //     return p
    //   },
    //   edgeMap: ['','','','']
    // },
    // // leef, 270deg
    // 13: {
    //   render: params => {
    //     const p = path({
    //       pathData: roots.leef,
    //       ...params,
    //     })
    //     p.rotate(270)
    //     return p
    //   },
    //   edgeMap: ['','','','']
    // },
    // teer, 0deg
    14: {
      render: params => {
        return path({
          pathData: roots.teer,
          ...params,
        })
      },
      edgeMap: ['c','b','b','c']
    },
    // teer, 90deg
    15: {
      render: params => {
        const p = path({
          pathData: roots.teer,
          ...params,
        })
        p.rotate(90)
        return p
      },
      edgeMap: ['c','c','b','b']
    },
    // teer, 180deg
    16: {
      render: params => {
        const p = path({
          pathData: roots.teer,
          ...params,
        })
        p.rotate(180)
        return p
      },
      edgeMap: ['b','c','c','b']
    },
    // teer, 270deg
    17: {
      render: params => {
        const p = path({
          pathData: roots.teer,
          ...params,
        })
        p.rotate(270)
        return p
      },
      edgeMap: ['b','b','c','c']
    },
  },

  glyphGrid: () => rectGrid({ x:128, y:128 }, { x:size, y:size }, { x: 2, y: 2 }, true),
  groupGrid: () => rectGrid({ x:0, y:0 }, { x:size * 2, y:size *2 }, { x: 2, y: 2 }, true),
}

export default glyphset
