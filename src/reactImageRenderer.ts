import React from 'react';
import stringRenderer from './stringRenderer';
import {Ast} from '../types';

const reactImageRenderer = (node: Ast) => {
  let w;
  let h;

  if (node.attributes.style) {
    w = node.attributes.style.width || '';
    h = node.attributes.style.height || '';
  }

  return React.createElement('div', {
    style: {
      backgroundRepeat: 'no-repeat',
      width: w,
      height: h,
      backgroundImage: `url(data:image/svg+xml;base64,${btoa(stringRenderer(node))})`,
    },
  });
};

export default reactImageRenderer;
