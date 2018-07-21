# Urbit Seals
A JS slate, non-pinniped, untyped visual representation of patp

## Commands
`yarn` or `npm` may be used

|Commands              | Description                                   |
| -------------------- | --------------------------------------------- |
|`$ yarn start`        | Start development server                      |
|`$ yarn build`        | Create a build of the `pour()` lib              |

## How this works
The library is designed to have 1 + *n* parts, where *n* are renderers that produce outputs from a POJO representation of an SVG. The universal part is a function called pour().

![how this works](https://github.com/urbit/avatars/blob/master/docs/high-level-flow.png?raw=true)

## Pour() Params
|Param     | Explanation                                                                                    | type                                                | optional
| ---------| -----------------------------------------------------------------------------------------------|-----------------------------------------------------|------------------------|
|`patp`      | any valid urbit patp                                                                             | `string` or `array` of form `['syl', 'syl', ...]`   | No, and can only accept galaxies, stars and planets.
|`sylmap`    | a mapping between syllables and symbols                                                        | `object` or `JSON`                                  | Yes, will return default symbols if no `sylmap` provided
|`renderer`  | an object with methods that transform the output of svg object representation output of pour() | `object` with methods                               | Yes, will return POJO svg representation if no `renderer` provided
|`size`      | width and height of final output                                                               | `integer`                                           | Yes, will default to 256px without `size` provided

## Using this Repo

### Consuming the `pour()` lib
 1. install deps
 2. run `npm run build`
 3. the built `pour()`` library will be in `build/static/js`
 4. you may need to write your own renderer based on `src/ReactSVGComponents.js`

### Example

 ```js
 <div> {
   pour({
     patp: 'zod',
     sylmap: undefined,
     renderer: ReactSVGComponents,
     size: 128,
   })
 } </div>

 ```

### Designing symbols
  1. `npm run start`
  2. Use Lung to generate combinations of geons, which are imported from Figma with it's js API
  3. ???
