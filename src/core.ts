import {scale, translate, transform, toString} from 'transformation-matrix';
import invariant from 'invariant';

import {deepClone, chunkStr, isUndefined} from './lib';
import index from './index.json';
import {Ast, Config} from './types';

const FG = 1;
const BG = 0;

const COLOR_CODES = {
  FG: '@FG',
  BG: '@BG',
};

const UNIT_GRIDS = {
  4: [
    {x: 0, y: 0},
    {x: 128, y: 0},
    {x: 0, y: 128},
    {x: 128, y: 128},
  ],
  2: [
    {x: 0, y: 0},
    {x: 128, y: 0},
  ],
  1: [{x: 0, y: 0}],
};

const TILEMAP = {
  4: {x: 2, y: 2},
  2: {x: 2, y: 1},
  1: {x: 1, y: 1},
};

// class ConfigError extends Error {}

// apply color preference
const paint = (node: Ast, colors: [string, string], strokeWidth: number): Ast => {
  const fillIndex = node.attributes.fill === COLOR_CODES.FG ? FG : BG;
  const strokeIndex = node.attributes.stroke === COLOR_CODES.FG ? FG : BG;

  if (node.attributes.fill !== undefined && node.attributes.fill !== 'none') {
    node.attributes.fill = colors[fillIndex];
  }

  if (node.attributes.stroke !== undefined && node.attributes.stroke !== 'none') {
    node.attributes.stroke = colors[strokeIndex];
    node.attributes['stroke-width'] = strokeWidth + 'px';
    node.attributes['stroke-linecap'] = 'square';
    // non-scaling-stroke is used to prevent the stroke from scaling when a scaling transformation is applied by sigil()
    node.attributes['vector-effect'] = 'non-scaling-stroke';
  }

  return {
    ...node,
    children: node.children.map(n => paint(n, colors, strokeWidth)),
  };
};

const sigil = ({
  patp,
  icon,
  size = 128,
  margin = true,
  fg = '#fff',
  bg = '#000',
  strokeScalingFunction,
}: Config) => {
  // get phonemes as array from patp input and split into array
  let phonemes = chunkStr(patp.replace(/[\^~-]/g, ''), 3);

  invariant(Array.isArray(phonemes), `Invalid patp argument`);

  // Throw an error if the phoneme length is not a 32, 16 or 8 bit point.
  const phonemeLengthDidPass =
    phonemes.length === 1 || phonemes.length === 2 || phonemes.length === 4;

  invariant(
    phonemeLengthDidPass,
    `@tlon/sigil-js cannot render @p of length ${phonemes.length}. Only lengths of 1 (galaxy), 2 (star), and 4 (planet) are supported at this time.`
  );

  // get symbols and clone them. If no symbol is found, the @p prop was invalid.
  let patpDidPass;

  let symbols = phonemes.map(phoneme => {
    // @ts-ignore
    const ast = index[phoneme];
    if (isUndefined(ast)) {
      patpDidPass = false;
      return {};
    } else {
      patpDidPass = true;
      return deepClone(ast);
    }
  });

  invariant(
    patpDidPass,
    `@tlon/sigil-js  needs a valid patp (point name). Patp field is invalid. Recieved ${patp}`
  );

  if (icon) {
    symbols = symbols.map((s: Ast) => {
      return {
        ...s,
        children: s.children.filter((c: Ast) => c.attributes['dataisgeon']),
      };
    });
  }

  const tier = symbols.length === 4 ? 4 : symbols.length === 2 ? 2 : 1;

  // get a grid according to the point's tier (planet, start, galaxy)
  const grid = UNIT_GRIDS[tier];

  // Move each symbol into it's new x/y position on a unit rectangle sized 256 by 256.
  for (let i = 0; i < grid.length; i++) {
    const positionTransform = toString(translate(grid[i].x, grid[i].y));
    if (symbols[i].attributes === undefined) {
      symbols[i].attributes = {};
    }
    symbols[i].attributes.transform = positionTransform;
  }

  // Create a variable that will store a ratio used to scale the symbolsGroup to its final size driven primarily by props.size, or width fallback.
  let resizeRatio;

  if (tier === 1) {
    // If there is only 1 symbol being drawn
    if (margin) {
      // If this symbol will be drawn with a margin
      resizeRatio = 0.5 * 0.8;
    } else {
      // If this symbol will be drawn without a margin
      resizeRatio = 1;
    }
  } else {
    // If the sigils is 2 symbols wide
    if (margin) {
      // If this symbol will be drawn with a margin
      resizeRatio = 0.5 * 0.8;
    } else {
      // If this symbol will be drawn without a margin
      resizeRatio = 0.5;
    }
  }

  // Calculate the size of each symbol - IE, for planets, there are four symbols.
  const symbolSize = {
    x: size * resizeRatio,
    y: size * resizeRatio,
  };

  // Calculate the left and top margins that will be used to transform the symbolsGroup.
  const marginPx = {
    x: (size - TILEMAP[tier].x * symbolSize.x) / 2,
    y: (size - TILEMAP[tier].y * symbolSize.y) / 2,
  };

  if (!margin) {
    marginPx.x = 0;
    marginPx.y = 0;
  }

  // Calculate how much the symbolsGroups should change in scale. 128 is the unit size of the SVGs as drawn in their source file.
  const symbolsGroupScale = symbolSize.x / 128;

  // First translate the symbols group to a centered x/y position, then scale the group to it's final size.
  const scaleAndCenteringTransform = toString(
    transform(translate(marginPx.x, marginPx.y), scale(symbolsGroupScale, symbolsGroupScale))
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

  const wrapped = {
    name: 'svg',
    type: '',
    value: '',
    attributes: {
      viewBox: `0 0 ${size} ${size}`,
      version: '1.1',
      xmlns: 'http://www.w3.org/2000/svg',
    },
    children: [
      // Background rectangle
      {
        name: 'rect',
        type: '',
        value: '',
        attributes: {
          fill: COLOR_CODES.BG,
          width: `${size}px`,
          height: `${size}px`,
          x: 0 + 'px',
          y: 0 + 'px',
        },
        children: [],
      },
      symbolsGroup,
    ],
  };

  // Calculate a strokeWidth based on props.size
  let strokeWidth;

  if (strokeScalingFunction) {
    strokeWidth = strokeScalingFunction(size);
  } else {
    strokeWidth = size / 128 + 0.33;
  }

  if (icon) {
    strokeWidth = 0.8;
  }

  // Recursively apply color and other style attributes.
  return paint(wrapped, [bg, fg], strokeWidth);
};

export default sigil;
