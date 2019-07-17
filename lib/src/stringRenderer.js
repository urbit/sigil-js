import { stringify } from 'svgson'

const stringRenderer = ast => {
  if (ast.attributes.style !== undefined) delete ast.attributes.style
  return stringify(ast)
}

export default stringRenderer
