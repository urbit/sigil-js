import {
  set,
  map,
  isString,
  get,
  isUndefined,
  cloneDeep,
  isNumber,
} from 'lodash';
import { scale, translate, transform, toSVG, rotateDEG } from 'transformation-matrix';

import { patpStrToArr, isEven, len } from './lib';
import grid from './grid'
import dyes from './dyes'
import sylmapjson from '../sylmaps/sylmap.json';


// generate a seal
const _pour = ({ patp, renderer, sylmap, size, colorway, symbols, margin }) => {

  // if string recieved, convert to array, where each syllable is a string in the array.
  patp = !isUndefined(patp) && isString(patp) ? patpStrToArr(patp) : undefined;

  // get svg objects from sylmap. If there is no sylmap, or if the syllable
  // symbol cannot be found, return a default symbol instead.
  symbols = !isUndefined(symbols) ? symbols : lookup(patp, sylmap);

  const layout = grid({
    length: len(symbols),
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
    children: [ baseRectangle(size), ...knolled ],
  }, patp, colorway);

  // Return the rendered object or the object itself.
  return isUndefined(renderer)
    ? withColor
    : renderer.svg(withColor);
};




const lookup = (patp, sylmap) => {
  // renderer and @P are not optional
  if (isUndefined(patp)) throw Error('Missing patp argument to pour()');

  return isUndefined(sylmap)
    ? map(patp, syllable => DEFAULT_SYMBOL)
    : map(patp, syllable => get(sylmap, syllable, DEFAULT_SYMBOL));
};




const knoll = (symbols, layout) => {

  const knolled = map(symbols, (sym, index) => {
    const clone = cloneDeep(sym);

    const { x, y } = layout.grid[index];

    // make an affine transformation matrix with x/y translation and uniform scaling
    const affineMatrix = transform(
      translate(x, y),
      scale(layout.scale, layout.scale),
    );

    if (isUndefined(clone.attr)) clone.attr = {}

    // set the transform attr on the clone with the new affine matrix
    clone.attr.transform = toSVG(affineMatrix)
    // return an SVG group with symbol
    return clone;
  })

  return knolled;
}



const baseRectangle = size => ({
  tag: 'rect',
  meta: { style: { fill: 'BG', stroke: 'NO' } },
  attr: {
    width: size,
    height: size,
    x: 0,
    y: 0,
  }
});



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



// wrap _pour with sylmap
const pour = ({ patp, renderer, size, colorway, symbols, margin }) => {
  const sylmap = sylmapjson;
  return _pour({ patp, sylmap, renderer, size, colorway, symbols, margin });
};


// rename for testing
const _createGrid = createGrid;

export {
  pour,
  _pour,
};
