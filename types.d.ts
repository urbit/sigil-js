type Attributes = {
  style?: {
    width?: string
    height?: string
  }
  width?: string
  height?: string
  viewBox?: string
  fill?: string | number
  xmlns?: string
  id?: string
  'clip-path'?: string
  d?: string
  stroke?: string | number
  'stroke-width'?: string
  x1?: string
  x2?: string
  y2?: string
  'stroke-linecap'?: string
  cx?: string
  cy?: string
  r?: string
  x?: string
  y?: string
  transform?: string;
  'vector-effect'?: string;
  'data-isGeon'?: string
}

type Ast = {
  name: string
  type: string
  value: string
  attributes: Attributes
  children: Ast[]
}

export {
  Attributes,
  Ast,
}
