# sigil-js

![example images](https://github.com/urbit/sigil-js/blob/master/docs/outbound.png?raw=true)

## Overview

In production, this repo is a library that expose `pour()` is a function that generates an object representation of an SVG seal. The library requires a 2nd function called a renderer, which takes the output of `pour()` and translates it into DOM nodes. See ./docs/renderExamples for a few ways to do this.

### Note

sigils-js is now standalone from sigil-toolkit. It can now be added as a git-hosted module in package.json. a sylmap is no longer needed, because the sylmap is included inside the bundle.

## Build

|Commands              | Description                                   |
| -------------------- | --------------------------------------------- |
|`gulp` or `npm run build`| Build the library from source                 |
|`npm run test`| Runs a basic test                 |


![how this works diagram](https://github.com/urbit/sigil-js/blob/master/docs/high-level-flow.png?raw=true)

## `Pour()`

### Params

|Param     | Explanation                                                                                    | Type                                                | optional?
| ---------| -----------------------------------------------------------------------------------------------|-----------------------------------------------------|------------------------|
|`patp`      | any valid urbit patp                                                                             | `string` or `array` of form `['syl', 'syl', ...]`   | No, and can only accept galaxies, stars and planets.
|`renderer`  | an object with methods that transform the output of svg object representation output of pour() | `object` with methods                               | Yes, will return POJO svg representation if no `renderer` provided
|`size`      | width and height of final output                                                               | `integer`                                           | Yes, will default to 256px without `size` provided
| `margin`| 'auto' or integer representing pixels | `string` or `integer` | Yes, 'auto' will be substituted if left undefined |
|`colorway`      | a consistent colorscheme that ignores internal color method                                | `array` of form `[#background, #foreground]`                                           | Yes, will default to internal `dye()` method without `colorway` provided

## Using this Lib

### Building the `pour()` lib

 1. install deps: `npm install --save`
 2. run `npm run build` or `gulp`
 3. the library bundle will output to `./dist/bundle.js`

### Designing Symbols

  To develop symbols, pair symbols / syllables, or visually validate the library, use [sigil-toolkit](https://github.com/urbit/sigil-toolkit)
