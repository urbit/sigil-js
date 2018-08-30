# sigil.js
[Github](https://github.com/urbit/sigil.js)

![example images](https://github.com/urbit/sigil.js/blob/master/docs/outbound.png?raw=true)


## Overview
In production, this repo is a library that expose `pour()` is a function that generates an object representation of an SVG seal. The library requires a 2nd function called a renderer, which takes the output of `pour()` and translates it into DOM nodes.


## Build

|Commands              | Description                                   |
| -------------------- | --------------------------------------------- |
|`$ gulp`              | Build the library from source                 |


![how this works diagram](https://github.com/urbit/sigil.js/blob/master/docs/high-level-flow.png?raw=true)

## `Pour()`
### Params
|Param     | Explanation                                                                                    | Type                                                | optional?
| ---------| -----------------------------------------------------------------------------------------------|-----------------------------------------------------|------------------------|
|`patp`      | any valid urbit patp                                                                             | `string` or `array` of form `['syl', 'syl', ...]`   | No, and can only accept galaxies, stars and planets.
|`renderer`  | an object with methods that transform the output of svg object representation output of pour() | `object` with methods                               | Yes, will return POJO svg representation if no `renderer` provided
|`size`      | width and height of final output                                                               | `integer`                                           | Yes, will default to 256px without `size` provided
|`colorway`      | a consistent colorscheme that ignores internal color method                                | `array` of form `[#background, #foreground]`                                           | Yes, will default to internal `dye()` method without `colorway` provided

## Using this Lib

### Consuming the `pour()` lib
 1. install deps: ``
 2. run `npm run build`
 3. the built `pour()` library will output to `dist/bundle.js`
 4. you may need to write your own renderer based on `src/renderers/ReactSVGComponents.js`

### Example

 ```js
 import pour from 'sigil-js'
 import ReactSVGComponents from 'ReactSVGComponents'

 <div> {
   pour({
     patp: 'zod',
     renderer: ReactSVGComponents,
     size: 128,
   })
 } </div>

 ```

### Designing symbols
  To develop symbols, pair symbols / syllables, or visually validate the library, use [sigil-toolkit](https://github.com/urbit/sigil-toolkit)
