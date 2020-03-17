import {
  scale,
  translate,
  transform,
  toString,
} from 'transformation-matrix';

import invariant from 'invariant'

import stringRenderer from './stringRenderer'
import reactRenderer from './reactRenderer'
import reactImageRenderer from './reactImageRenderer'
import { Ast } from '../types'

type Config = {
  patp: string
  colors?: string[]
  attributes?: {}
  style?: {
    height ?: string
    width?: string
  }
  class?: string
  size?: number
  width?: number
  height?: number
  margin?: boolean
  strokeScalingFunction?: Function
  renderer?: Function
}

import {
  deepClone,
  chunkStr,
  isUndefined,
} from './lib'

import index from './index.json'

const FG = 1
const BG = 0

const COLOR_CODES = {
  FG: '@FG',
  BG: '@BG',
}

const UNIT_GRIDS = {
  4: [
    {x:0, y:0},
    {x:128, y:0},
    {x:0, y:128},
    {x:128, y:128},
  ],
  2: [
    {x:0, y:0},
    {x:128, y:0},
  ],
  1: [
    {x:0, y:0},
  ],
}

const TILEMAP = {
  4: {x:2,y:2},
  2: {x:2,y:1},
  1: {x:1,y:1},
}

// class ConfigError extends Error {}


// apply color preference
const paint = (node:Ast, colors:string[], strokeWidth:number):Ast => {

  const fillIndex = node.attributes.fill === COLOR_CODES.FG ? FG : BG
  const strokeIndex = node.attributes.stroke === COLOR_CODES.FG ? FG : BG

  if (
    node.attributes.fill !== undefined
    && node.attributes.fill !== 'none'
  ) {
    node.attributes.fill = colors[fillIndex]
  }

  if (
    node.attributes.stroke !== undefined
    && node.attributes.stroke !== 'none'
  ) {
    node.attributes.stroke = colors[strokeIndex]
    node.attributes['stroke-width'] = strokeWidth + 'px'
    node.attributes['stroke-linecap'] = 'square'
    // non-scaling-stroke is used to prevent the stroke from scaling when a scaling transformation is applied by sigil()
    node.attributes['vector-effect'] = 'non-scaling-stroke'
  }

  return {
    name: node.name,
    attributes: node.attributes,
    children: node.children.map(n => paint(n, colors, strokeWidth)),
    ...node
  }
}


const sigil = (props:Config) => {

  props = {...props}

  // Set default values from config
  const colors = props.colors || ['#000', '#fff']

  props.attributes = isUndefined(props.attributes)
    ? {}
    : props.attributes

  props.style = isUndefined(props.style)
    ? {}
    : props.style

  props.class = isUndefined(props.class)
    ? ''
    : props.class

  props.size = isUndefined(props.size)
    ? (props.height || 128)
    : props.size

  props.width = isUndefined(props.width)
    ? (props.size || 128)
    : props.width

  props.height = isUndefined(props.height)
    ? (props.size || 128)
    : props.height

  props.margin = isUndefined(props.margin)
    ? true
    : props.margin

  // get phonemes as array from patp input and split into array
  let phonemes = chunkStr(props.patp.replace(/[\^~-]/g,''), 3)

  invariant(
    Array.isArray(phonemes),
    `Invalid patp argument`
  )

  // Throw an error if the phoneme length is not a 32, 16 or 8 bit point.
  const phonemeLengthDidPass = phonemes.length === 1
    || phonemes.length === 2
    || phonemes.length === 4

  invariant(
    phonemeLengthDidPass,
    `urbit-sigil-js cannot render @p of length ${phonemes.length}. Only lengths of 1 (galaxy), 2 (star), and 4 (planet) are supported at this time.`
  )

  // get symbols and clone them. If no symbol is found, the @p prop was invalid.
  let patpDidPass

  const symbols = phonemes.map(phoneme => {
    // @ts-ignore
    const ast = index[phoneme]
    if (isUndefined(ast)) {
      patpDidPass = false
    } else {
      patpDidPass = true
      return deepClone(ast)
    }
  })

  invariant(
    patpDidPass,
    `urbit-sigil-js needs a valid patp (point name). Patp field is invalid. Recieved ${props.patp}`
  )

  const tier = symbols.length === 4
    ? 4
    : symbols.length === 2
    ? 2
    : 1

  // get a grid according to the point's tier (planet, start, galaxy)
  const grid = UNIT_GRIDS[tier]

  // Move each symbol into it's new x/y position on a unit rectangle sized 256 by 256.
  for (let i = 0; i < grid.length; i++) {
    const positionTransform = toString(translate(grid[i].x, grid[i].y))
    if (symbols[i].attributes === undefined) {
      symbols[i].attributes = {}
    }
    symbols[i].attributes.transform = positionTransform
  };

  // Create a variable that will store a ratio used to scale the symbolsGroup to its final size driven primarily by props.size, or props.width fallback.
  let resizeRatio

  if (tier === 1) {
    // If there is only 1 symbol being drawn
    if (props.margin === true) {
      // If this symbol will be drawn with a margin
      resizeRatio = 0.5 * 0.8
    } else {
      // If this symbol will be drawn without a margin
      resizeRatio = 1
    }
  } else {
    // If the sigils is 2 symbols wide
    if (props.margin === true) {
      // If this symbol will be drawn with a margin
      resizeRatio = 0.5 * 0.8
    } else {
      // If this symbol will be drawn without a margin
      resizeRatio = 0.5
    }
  }

  // Calculate the size of each symbol - IE, for planets, there are four symbols.
  const symbolSize = {
    x: (props.width || 128) * resizeRatio,
    y: (props.height || 128) * resizeRatio,
  }

  // Calculate the left and top margins that will be used to transform the symbolsGroup.
  const marginPx = {
    x: ((props.size || 128) - (TILEMAP[tier].x * symbolSize.x)) / 2,
    y: ((props.size || 128) - (TILEMAP[tier].y * symbolSize.y)) / 2,
  }

  // Calculate how much the symbolsGroups should change in scale. 128 is the unit size of the SVGs as drawn in their source file.
  const symbolsGroupScale = (symbolSize.x / 128)

  // First translate the symbols group to a centered x/y position, then scale the group to it's final size.
  const scaleAndCenteringTransform = toString(transform(
    translate(
      marginPx.x,
      marginPx.y
    ),
    scale(
      symbolsGroupScale,
      symbolsGroupScale
    )),
  );

  // Create a SVG AST group and assign the transformation and child symbols to it.
  const symbolsGroup = {
    name: 'g',
    type: '',
    value: '',
    attributes: {
      transform: scaleAndCenteringTransform,
    },
    children: symbols,
  };


  if (props.style === undefined) {
    props.style = {}
  }

  if (props.style.width === undefined) {
    props.style.width = `${props.width}px`
  }

  if (props.style.height === undefined) {
    props.style.height = `${props.height}px`
  }

  const wrapped = {
    name: 'svg',
    type: '',
    value: '',
    attributes: {
      style: {
        // prevent bottom margin on svg tag
        display: 'block',
        ...props.style
      },
      viewBox: `0 0 ${props.width} ${props.height}`,
      version: '1.1',
      xmlns: "http://www.w3.org/2000/svg",
      class: props.class,
      ...props.attributes,
    },
    children: [
      // Background rectangle
      {
        name: 'rect',
        type: '',
        value: '',
        attributes: {
          fill: COLOR_CODES.BG,
          width: `${props.width}px`,
          height: `${props.height}px`,
          x: 0 + 'px',
          y: 0 + 'px',
        },
        children: [],
      },
      symbolsGroup,
    ]
  }

  // Calculate a strokeWidth based on props.size
  let strokeWidth

  if (props.strokeScalingFunction) {
    strokeWidth = props.strokeScalingFunction(props.size)
  } else {
    strokeWidth = ((props.size || 128) / 128) + 0.33
  }

  // Recursively apply color and other style attributes.
  const out = paint(wrapped, colors, strokeWidth)

  // If a renderer function has been provided, call this renderer with provided AST. If there is no renderer, return the AST.
  return props.renderer === undefined
    ? out
    : props.renderer(out)
}


export {
  sigil,
  stringRenderer,
  reactRenderer,
  reactImageRenderer,
}
