import {
  isString,
  isUndefined,
  cloneDeep,
  get,
} from 'lodash';

import { scale, translate, transform, toSVG, rotateDEG } from 'transformation-matrix';

import sylgraphjson from './sylgraph.json';

const last = arr => arr[arr.length - 1]
const patpStrToArr = p => p.replace(/[\^~-]/g,'').match(/.{1,3}/g)


// generate a sigil
const _pour = ({ patp, renderer, sylgraph, size, colorway, symbols, margin, ignoreColorway }) => {

  // if (isUndefined(renderer.svg)) throw new Error('Your renderer must have a `svg` method for pour to call.')

  // if string received, convert to array, where each syllable is a string in
  // the array.
  patp = isString(patp) ? patpStrToArr(patp) : patp;

  // get svg objects from sylgraph. If there is a symbols argument in the config,
  // render than array of symbols. This works well for rendering lists of svg
  // pojos for development.
  symbols = !isUndefined(symbols) ? symbols : lookup(patp, sylgraph);

  const layout = grid({
    length: symbols.length,
    margin: margin,
    size,
  });

  // transform symbols into place
  const knolled = knoll(symbols, layout);

  // insert symbol groups into SVG model, and apply color style
  const withColor = dyes({
    tag: 'svg',
    meta: {},
    attr: { width: size, height: size },
    children: [ baseRectangle(size, ignoreColorway), ...knolled ],
  }, patp, colorway);

  // Return the rendered object or the object itself.
  return isUndefined(renderer)
    ? withColor
    : renderer.svg(withColor);
};




const lookup = (patp, sylgraph) => {

  // lookup requires that there be a patp arg and a sylgraph.
  if (isUndefined(patp)) throw new Error('Missing patp argument to pour()');

  const symbols = patp.map(syl => {
    const symRef = sylgraph.mapping[syl];

    if (isUndefined(symRef)) return DEFAULT_SYMBOL;

    const group = {
      attr: {},
      meta: {},
      tag:'g',
      children: symRef.split(':').map(ref => {
        const elem = sylgraph.symbols[ref];
        return isUndefined(elem) ? DEFAULT_ELEM : elem;
      }),
    };
    return group;
  });

  return symbols;
};




const knoll = (symbols, layout) => {

  const knolled = symbols.map((sym, index) => {
    const clone = cloneDeep(sym);

    const { x, y } = layout.grid[index];

    // make an affine transformation matrix with x/y translation and uniform scaling
    const affineMatrix = transform(
      translate(x, y),
      scale(layout.scale, layout.scale),
    );

    if (isUndefined(clone.attr)) clone.attr = {};

    // set the transform attr on the clone with the new affine matrix
    clone.attr.transform = toSVG(affineMatrix);
    // return an SVG group with symbol
    return clone;
  })

  return knolled;
}


// The backdrop of every sigil.
const baseRectangle = (size, ignoreColorway) => ({
  tag: 'rect',
  meta: ignoreColorway === true
    ? { style: { fill: 'FG', stroke: 'NO' }, bg: true }
    : { style: { fill: 'BG', stroke: 'NO' }, bg: true },
  attr: {
    width: size,
    height: size,
    x: 0,
    y: 0,
  }
});



// Rendered when lookup cannot find target of a reference to a specific element
// ie decorator or geon at specific transformation matrix in sylgraph.symbols by
// reference hash.
const DEFAULT_ELEM = {
  tag: 'g',
  attr: {},
  children: [{
    tag: 'path',
    meta: { style: { fill: 'FG', stroke: 'NO' } },
    attr: {
      d: 'M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128ZM81.2255 35.9706L92.5392 47.2843L75.5686 64.2549L92.5392 81.2253L81.2255 92.5391L64.2549 75.5685L47.2843 92.5391L35.9706 81.2253L52.9412 64.2549L35.9706 47.2843L47.2843 35.9706L64.2549 52.9412L81.2255 35.9706Z',
    }
  }],
};



// This symbol is rendered when lookup cannot find the target of a reference to
// a specific symbol -> syllable mapping by syllable key
const DEFAULT_SYMBOL = {
  tag: 'g',
  attr: {},
  children: [{
    tag: 'path',
    meta: { style: { fill: 'FG', stroke: 'NO' } },
    attr: {
      d: 'M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128ZM81.2255 35.9706L92.5392 47.2843L75.5686 64.2549L92.5392 81.2253L81.2255 92.5391L64.2549 75.5685L47.2843 92.5391L35.9706 81.2253L52.9412 64.2549L35.9706 47.2843L47.2843 35.9706L64.2549 52.9412L81.2255 35.9706Z',
    }
  }],
};


// TODO revert this once graph is proven
// wrap _pour with sylgraph
const pour = ({ patp, renderer, size, sylgraph, colorway, symbols, margin, ignoreColorway }) => {
  sylgraph = isUndefined(sylgraph) ? sylgraphjson : sylgraph
  return _pour({ patp, sylgraph, renderer, size, colorway, symbols, margin, ignoreColorway });
};

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

  // symbols should always be the same size between ships if a margin is not
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
      { x: d2(p), y: d1(p) },
      { x: d1(p), y: d2(p) },
      { x: d2(p), y: d2(p) },
    ],
  };

  return {
    ...p,
    scale: p.sw / FIGMA_SIZE_UNIT,
    grid: layoutTypes[length],
  };
};


const isNotMarginMode = margin => margin === 'auto' || margin === undefined;

// 2 dimensional centering for a square
const dc = ({ le, mm, tw, sw, rm, rp }) => le > 1 || mm === true
  ? tw - (sw * 1.5) - rm
  : rm;

// 2 dimensional offset for position 1
const d1 = ({ tw, sw, rm, rp }) => rm - (rp / 2);

// 2 dimensional offset for position 2
const d2 = ({ tw, sw, rm, rp }) => tw - sw - rm + (rp / 2);


// color options
const CW = [
  ['#fff', '#000000'],
  // ['#fff', '#4330FC'],
  // ['#fff', '#372284'],
  // ['#fff', '#129485'],
  // ['#fff', '#928472'],
  // ['#fff', '#FC5000'],
  // ['#fff', '#2474D3'],
  // ['#fff', '#A2C8D1'],
  // ['#fff', '#203433'],
  // ['#fff', '#FAA916'],
  // ['#fff', '#00B49D'],
  // ['#fff', '#852E46'],
  // ['#fff', '#AE2B27'],
  // ['#fff', '#E74E19'],
  // ['#fff', '#00482F'],
  // ['#fff', ''],
];


const prism = (patp, colorways) => {
  return colorways[0];
  // get the first syllable
  // const firstSyl = patp[0]
  // // get index of first syllable in syllables
  // const idxOfFirstSyl = len(patp) === 1
  //   ? suffixes.indexOf(firstSyl)
  //   : prefixes.indexOf(firstSyl)
  // // make values for remap
  // const iMax = 512 - 1
  // const iMin = 0
  // const oMax = len(colorways)
  // const oMin = 0
  // // remap index of syllable to range of len(colorways)
  // const index = Math.floor(remap(idxOfFirstSyl, iMax, iMin, oMax, oMin))
  // // return colorway at index
  // return colorways[index]
};



const dyes = (model, patp, colorway) => {
  // if the monotoneColorway param is true, return a black and white seal
  if (!isUndefined(colorway)) return wash(model, colorway);
  // pick a colorscheme from patp contents
  colorway = !isUndefined(patp)
    ? prism(patp, CW)
    : CW[0];
  // apply a color to the model
  return wash(model, colorway);
};


const applyColor = (p, colorway) => {
  if (p === 'FG') return colorway[0];
  if (p === 'BG') return colorway[1];
  if (p === 'TC') return colorway[2];
  if (p === 'NC') return 'grey';
  return last(colorway);
};


// apply style attributes to a tag
const applyStyleAttrs = (style, colorway) => {
  const { fill } = style;
  return {
    fill: applyColor(fill, colorway),
    // fillOpacity: applyStyle.fillOpacity(fill),
  };
};



// Only apply styling to nodes that have a style meta property
const wash = (node, colorway) => {
  const style = get(node, ['meta', 'style'], false);
  const children = get(node, 'children', []);
  const attr = get(node, 'attr', {});
  // if there is a style attribute set, apply style attributes based on meta.style
  return {
    ...node,
    attr: style !== false
      ? {...attr, ...applyStyleAttrs(style, colorway)}
      : {...attr},
    children: children.map(child => wash(child, colorway)),
  };
};

// rename for testing
// const _createGrid = createGrid;

export {
  pour,
  _pour,
};
