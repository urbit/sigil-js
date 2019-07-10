# sigil-js

![example images](https://github.com/urbit/sigil-js/blob/master/docs/outbound.png?raw=true)

## Build

|Commands              | Description                                   |
| -------------------- | --------------------------------------------- |
|`gulp` or `npm run build`| Build the library from source                 |
|`npm run test`| Runs a basic test                 |


## Usage

### Params

|Param     | Explanation                                                                                    | Type                                                | optional?
| ---------| -----------------------------------------------------------------------------------------------|-----------------------------------------------------|------------------------|
|`patp`      | any valid urbit patp                                                                             | `string` or `array` of form `['syl', 'syl', ...]`   | No, and can only accept galaxies, stars and planets.
|`renderer`  | an object with methods that transform the output of svg object representation output of pour() | `object` with methods                               | Yes, will return POJO svg representation if no `renderer` provided
|`size`      | width and height of final output                                                               | `integer`                                           | Yes, will default to 256px without `size` provided |
|`colors`      | Two colors to paint the sigil                                | `array` of form `[#background, #foreground]`                                           | Yes, will default to internal `dye()` method without `colorway` provided

## Using this Lib

### Example

 ```js
 import { sigil } from 'sigil-js'
 import ReactSVGComponents from 'ReactSVGComponents'

 <div> {
   sigil({
     patp: 'zod',
     renderer: ReactSVGComponents,
     size: 128,
     colors: ['black', 'white'],
   })
 } </div>

 ```
