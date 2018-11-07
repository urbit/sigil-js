import {
  isString,
  isUndefined,
  cloneDeep,
} from 'lodash';

import { scale, translate, transform, toSVG, rotateDEG } from 'transformation-matrix';

import { patpStrToArr } from './lib';
import grid from './grid'
import dyes from './dyes'

import sylgraphjson from './sylgraph.json';


// generate a seal
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


// wrap _pour with sylgraph
const pour = ({ patp, renderer, size, sylgraph, colorway, symbols, margin, ignoreColorway }) => {
  sylgraph = isUndefined(sylgraph) ? sylgraphjson : sylgraph
  return _pour({ patp, sylgraph, renderer, size, colorway, symbols, margin, ignoreColorway });
};


// rename for testing
// const _createGrid = createGrid;

export {
  pour,
  _pour,
};
