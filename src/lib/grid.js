import { flatten, size, map, isUndefined, reduce, isNumber } from 'lodash'

const grid = ({ length, margin, size }) => {

  if (margin * 2 > size) {
    console.warn('sigil-js: margin cannot be larger than sigil size')
  }

  const FIGMA_SIZE_UNIT = 128;
  const FIGMA_LINE_WIDTH = 2;
  const HORIZONTAL_SYMBOL_COUNT = 2;

  // is a margin defined and not 'auto'
  const mm = isNotMarginMode(margin);

  // calculate real margin in px.
  const rm = mm
    ? 0.08 * size
    : margin;

  // calculate symbols size based on margin.
  const symbolSize = size - (rm * 2);

  // symbols should always be the same size bewteen ships if a margin is not
  // defined or set to 'auto'
  const sw = mm || length > 1
    ? symbolSize / HORIZONTAL_SYMBOL_COUNT
    : symbolSize;

  // calculate symbols padding width
  const rp = (sw / FIGMA_SIZE_UNIT) * FIGMA_LINE_WIDTH;

  // put everything together into a profile object
  const p = {
    // number of symbols
    le: length,
    // is margin mode off?
    mm: mm,
    // how big is the background square in px?
    tw: size,
    // how big are the symbols in px?
    sw: sw,
    // real margin: how big is the margin in px?
    rm: rm,
    // real padding: how big is the space in between symbols?
    rp: rp,
  };

  const layoutTypes = {
    1: [
      { x: dc(p), y: dc(p) },
    ],
    2: [
      { x: d1(p), y: dc(p) },
      { x: d2(p), y: dc(p) },
    ],
    4: [
      { x: d1(p), y: d1(p) },
      { x: d1(p), y: d2(p) },
      { x: d2(p), y: d1(p) },
      { x: d2(p), y: d2(p) },
    ],
  };

  return {
    ...p,
    scale: p.sw / FIGMA_SIZE_UNIT,
    grid: layoutTypes[length],
  };
};


const isNotMarginMode = margin => margin === 'auto' || isUndefined(margin);

// 2 dimensional centering for a square
const dc = ({ le, mm, tw, sw, rm, rp }) => le > 1 || mm === true
  ? tw - (sw * 1.5) - rm
  : rm;

// 2 dimensional offset for position 1
const d1 = ({ tw, sw, rm, rp }) => rm - (rp / 2);

// 2 dimensional offset for position 2
const d2 = ({ tw, sw, rm, rp }) => tw - sw - rm + (rp / 2);

export default grid;
