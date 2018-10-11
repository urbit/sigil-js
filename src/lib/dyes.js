import {
  map,
  get,
  isUndefined,
} from 'lodash';
import { last } from './lib';

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
    children: map(children, child => wash(child, colorway)),
  };
};

export default dyes
