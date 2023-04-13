import {stringify} from 'svgson';
import {Ast} from './types';

const stringRenderer = (ast: Ast) => {
  if (ast.attributes.style !== undefined) delete ast.attributes.style;
  return stringify(ast);
};

export default stringRenderer;
