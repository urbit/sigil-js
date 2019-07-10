# sigil-js

![example images](https://github.com/urbit/sigil-js/blob/master/docs/outbound.png?raw=true)

## Overview

In production, this repo is a library that expose `sigil()` is a function that generates an object representation of an SVG seal. The library requires a 2nd function called a renderer, which takes the output of `sigil()` and translates it into DOM nodes. See ./docs/renderExamples for a few ways to do this.

## Build

|Commands              | Description                                   |
| -------------------- | --------------------------------------------- |
|`gulp` or `npm run build`| Build the library from source                 |
|`npm run test`| Runs a basic test                 |


## `Sigil()`

### Params

|Param     | Explanation                                                                                    | Type                                                | optional?
| ---------| -----------------------------------------------------------------------------------------------|-----------------------------------------------------|------------------------|
|`patp`      | any valid urbit patp                                                                             | `string` or `array` of form `['syl', 'syl', ...]`   | No, and can only accept galaxies, stars and planets.
|`renderer`  | an object with methods that transform the output of svg object representation output of pour() | `object` with methods                               | Yes, will return POJO svg representation if no `renderer` provided
|`size`      | width and height of final output                                                               | `integer`                                           | Yes, will default to 256px without `size` provided
| `margin`| 'auto' or integer representing pixels | `string` or `integer` | Yes, 'auto' will be substituted if left undefined |
|`colorway`      | a consistent colorscheme that ignores internal color method                                | `array` of form `[#background, #foreground]`                                           | Yes, will default to internal `dye()` method without `colorway` provided

## Using this Lib

### Building the `sigil()` lib

 1. install deps: `npm install --save`
 2. run `npm run build` or `gulp`
 3. the library bundle will output to `./dist/bundle.js`

### Example

 ```js
 import {pour} from 'sigil-js'
 import ReactSVGComponents from 'ReactSVGComponents'

 <div> {
   pour({
     patp: 'zod',
     renderer: ReactSVGComponents,
     size: 128,
     colorway: ['black', 'white'],
     margin: 'auto',
   })
 } </div>

 ```

A margin value can be added to render single symbols.

 ```js
 import {pour} from 'sigil-js'
 import ReactSVGComponents from 'ReactSVGComponents'

 <div> {
   pour({
     patp: 'zod',
     renderer: ReactSVGComponents,
     size: 128,
     colorway: ['black', 'white'],
     margin: 0,
   })
 } </div>

 ```


A default renderer for plain HTML is now also exported.

  ```js
  import { pour, SVGComponents } from 'sigil-js'

  <div> {
    pour({
      patp: 'zod',
      renderer: SVGComponents,
      size: 128,
      colorway: ['black', 'white'],
      margin: 0,
    })
  } </div>

  ```



## Example Renderers

### React

```js
import React from 'react'
import { get, map } from 'lodash'

const ReactSVGComponents = {
  svg: p => {
    return (
      <svg {...p.attr} version={'1.1'} xmlns={'http://www.w3.org/2000/svg'}>
       { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </svg>
    )
  },
  circle: p => {
    return (
      <circle {...p.attr}>
      { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </circle>
    )
  },
  rect: p => {
    return (
      <rect {...p.attr}>
      { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </rect>
    )
  },
  path: p => {
    return (
      <path {...p.attr}>
      { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </path>
    )
  },
  g: p => {
    return (
      <g {...p.attr}>
        { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </g>
    )
  },
  polygon: p => {
    return (
      <polygon {...p.attr}>
      { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </polygon>
    )
  },
  line: p => {
    return (
      <line {...p.attr}>
      { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </line>
    )
  },
  polyline: p => {
    return (
      <polyline {...p.attr}>
      { map(get(p, 'children', []), child => ReactSVGComponents[child.tag](child)) }
      </polyline>
    )
  }
}

export default ReactSVGComponents
```


### Normal SVGs

```js
import { get, map } from 'lodash'

const appendChildNodes = (p, svgNode) => {
  map(get(p, 'children', []), child => SVGComponents[child.tag](child)).forEach(c => {
    svgNode.appendChild(c);
  });
  return svgNode;
};

const createChildNode = (p, nodeName) => {
  let node = document.createElement(nodeName);
  Object.keys(p.attr).forEach(k => {
    node.setAttribute(k, p.attr[k]);
  });
  return appendChildNodes(p, node);
};

const SVGComponents = {
  svg: p => {
    let node = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    node.setAttribute("version", "1.1");
    node.setAttribute("xlmns", "http://www.w3.org/2000/svg");
    Object.keys(p.attr).forEach(k => {
      node.setAttribute(k, p.attr[k]);
    });
    return appendChildNodes(p, node);
  },
  circle: p => {
    return createChildNode(p, "circle");
  },
  rect: p => {
    return createChildNode(p, "rect");
  },
  path: p => {
    return createChildNode(p, "path");
  },
  g: p => {
    return createChildNode(p, "g");
  },
  polygon: p => {
    return createChildNode(p, "polygon");
  },
  line: p => {
    return createChildNode(p, "line");
  },
  polyline: p => {
    return createChildNode(p, "polyline");
  }
}

export default SVGComponents


```
