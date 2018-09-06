import {
  set,
  map,
  isString,
  get,
  isUndefined,
  cloneDeep,
} from 'lodash';
import { scale, translate, transform, toSVG, rotateDEG } from 'transformation-matrix';

import { patpStrToArr, isEven } from '../lib/lib';
import { len, lat, sq, last } from '../lib/lib.array';
import sylmapjson from '../sylmaps/sylmap.json';


// generate a seal
const _pour = ({ patp, renderer, sylmap, size, colorway, symbols, noBorder }) => {

  // if string recieved, convert to array, where each syllable is a string in the array.
  patp = !isUndefined(patp) && isString(patp)
    ? patpStrToArr(patp)
    : undefined;

  // get svg objects from sylmap. If there is no sylmap, or if the syllable
  // symbol cannot be found, return a default symbol instead.
  symbols = !isUndefined(symbols)
    ? symbols
    : lookup(patp, sylmap);

  // The size of each svg as drawn in Figma
  const UNIT = 128;

  const BW = noBorder
    ? 1
    : 16

  if (!isEven(len(symbols) && len(symbols !== 1))) throw Error('nongalaxy patp argument to pour() is noneven length');
  // make a layout object
  const layout = makeLayout(len(symbols), UNIT, size, BW);


  // transform symbols into place
  const knolled = knoll(symbols, layout);
  // make a background rectangle
  const baseRectangle = {
    tag: 'rect',
    meta: { style: { fill: 'BG', stroke: 'NO' } },
    attr: {
      width: size,
      height: size,
      x: 0,
      y: 0,
    }
  };
  // insert symbol groups into SVG model, and apply color style
  const model = dye({
    tag: 'svg',
    meta: {},
    attr: { width: size, height: size },
    children: [ baseRectangle, ...knolled ],
  }, patp, colorway);
  // Return the rendered object or the object itself.
  return isUndefined(renderer)
    ? model
    : renderer.svg(model);
};

const lookup = (patp, sylmap) => {
  // renderer and @P are not optional
  if (isUndefined(patp)) throw Error('Missing patp argument to pour()');

  return isUndefined(sylmap)
  ? map(patp, syllable => DEFAULT_SYMBOL)
  : map(patp, syllable => get(sylmap, syllable, DEFAULT_SYMBOL));
};


// transform symbols into position on grid
const knoll = (symbols, layout) => map(symbols, (symbol, index) => {
  const { grid, size, unit, bw, center, fudge } = layout;
  // We are mutating an object in this loop. In order to keep the sylmap pure,
  // we cloneDeep the item.
  const clone = cloneDeep(symbol);
  // For some reason this is necessary to control the gap bewteen symbols
  // get point coordinates from grid at symbol index
  const { x, y } = grid[index];
  // calculate scale factor, where 256 is the unit measurement
  const sclf = (size - (bw * 2) + fudge) / (unit * 2);
  // get rotation value in degrees from the top attr key of the clone
  const deg = get(clone, ['meta', 'rotate'], 0);
  // make an affine transformation matrix with x/y translation and uniform scaling
  const affineMatrix = transform(translate(x, y), scale(sclf, sclf), rotateDEG(deg, center, center));
  // set the transform attr on the clone with the new affine matrix
  set(clone, ['attr', 'transform'], toSVG(affineMatrix));
  // return an SVG group with symbol
  return clone;
})


// color options
const cw = [
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


const dye = (model, patp, colorway) => {
  // if the monotoneColorway param is true, return a black and white seal
  if (!isUndefined(colorway)) return dip(model, colorway);
  // pick a colorscheme from patp contents
  colorway = !isUndefined(patp)
    ? prism(patp, cw)
    : cw[0];
  // apply a color to the model
  return dip(model, colorway);
};

const applyStyle = {
  // return background opacity value for foreground and bg
  fillOpacity: p => {
    switch(p) {
      case 'FG': return 1;
      case 'BG': return 1;
      default: return 0;
    }
  },
  // return colorway index for foreground and bg
  color: (p, colorway) => {
    switch(p) {
      case 'FG': return colorway[0];
      case 'BG': return colorway[1];
      case 'TC': return colorway[2];
      default: return last(colorway);
    }
  }
};


// apply style attributes to a tag
const returnStyleAttrs = (style, colorway) => {
  const { fill } = style;
  return {
    fill: applyStyle.color(fill, colorway),
    fillOpacity: applyStyle.fillOpacity(fill),
  };
}


// Only apply styling to nodes that have a style meta property
// Only apply styling to nodes that have a style meta property
const dip = (node, colorway) => {
  const style = get(node, ['meta', 'style'], false);
  const children = get(node, 'children', []);
  const attr = get(node, 'attr', {});
  // if there is a style attribute set, apply style attributes based on meta.style
  return {
    ...node,
    attr: style !== false
      ? {...attr, ...returnStyleAttrs(style, colorway)}
      : {...attr},
    children: map(children, child => dip(child, colorway)),
  };

};


// This symbol is rendered when there is no sylmap
const DEFAULT_SYMBOL = {
  tag: 'g',
  attr: {},
  children: [{
    tag: 'path',
    meta: { style: { fill: 'FG', stroke: 'NO' } },
    attr: {
      d: 'M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128ZM81.2255 35.9706L92.5392 47.2843L75.5686 64.2549L92.5392 81.2253L81.2255 92.5391L64.2549 75.5685L47.2843 92.5391L35.9706 81.2253L52.9412 64.2549L35.9706 47.2843L47.2843 35.9706L64.2549 52.9412L81.2255 35.9706Z',
    }
  }]
};


// make a layout object for knoll()
const makeLayout = (length, unit, size, borderRatio) => {
  // calc margin size equal to that of etch lines
  const marginSize = size / unit;
  // if size, is undefined, assign a default size.
  const calculatedSize = isUndefined(size) ? () => unit * 2 : size;
  // calculate a gutter size for seal frame
  const bw = calculatedSize / borderRatio;
  // generate a grid
  const grid = createGrid(length, bw, calculatedSize, marginSize);
  // return a layout object
  return {
    unit,
    size: calculatedSize,
    bw,
    grid: grid,
    center: unit / 2,
    fudge: 0
  };
};


// generate a grid based on patp length
const createGrid = (length, bw, size, marginWidth) => {
  // create an offset that is used to center a single tile
  const centerOffset = (0.5 * bw) + (0.25 * size);
  // generate a grid specific to the patp length
  switch (length) {
    // galaxy
    case 1: return lat({
      g: sq(centerOffset),
      m: {x:0, y:0},
      s: sq(size),
      p: {x: 1, y: 1},
      flat: true,
    });
    // star
    case 2: return lat({
      g: { x: bw, y: centerOffset },
      m: {x:marginWidth, y:0},
      s: sq(size),
      p: {x: 2, y: 1},
      flat: true,
    });
    // planet and up
    default: return lat({
      g: sq(bw),
      m: {x: marginWidth, y: marginWidth},
      s: sq(size),
      p: sq(length / 2),
      flat: true,
    });
  };
};

// wrap _pour with sylmap
const pour = ({ patp, renderer, size, colorway, symbols, noBorder }) => {
  const sylmap = sylmapjson;
  return _pour({ patp, sylmap, renderer, size, colorway, symbols, noBorder });
};

// rename for testing
const _createGrid = createGrid;
const _makeLayout = makeLayout;
const _returnStyleAttrs = returnStyleAttrs;
const _dip = dip;
const _knoll = knoll;
const _prism = prism;
const _dye = dye;
const _applyStyle = applyStyle;


export {
  pour,
  _pour,
  _createGrid,
  _makeLayout,
  _returnStyleAttrs,
  _dip,
  _knoll,
  _prism,
  _dye,
  _applyStyle,
};
