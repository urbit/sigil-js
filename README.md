# Urbit Seals
A JS slate, non-pinniped, untyped visual representation of @P

## Commands
`yarn` or `npm` may be used

|Commands              | Description                                   |
| -------------------- | --------------------------------------------- |
|`$ yarn start`        | Start development server                      |
|`$ yarn build`        | Create a build of the pour() lib              |

## How this works
The library is designed to have 1 + n parts, where n are renderers that produce outputs from a POJO representation of an SVG. The universal part is a function called pour().

![how this works](https://raw.githubusercontent.com/urbit/avatars/master/docs/high-level-flow.png)

## Pour() Params
|Param     | Explanation                                                                                    | type                                                |
| ---------| -----------------------------------------------------------------------------------------------|-----------------------------------------------------|
|patp      | any valid urbit @P                                                                             | `string` or array of form `['syl', 'syl', ...]`     |
|sylmap    | a mapping between syllables and symbols                                                        | `object or JSON`                                    |
|renderer  | an object with methods that transform the output of svg object representation output of pour() | `object with methods`                               |
|size      | width and height of final output                                                               | `integer`                                           |

## Using this Repo
### Consuming the pour() lib
 1. install deps
 - run `npm run build`
 - the build pour() library will be in `build/static/js`
 - you will need to write your own renderer based on `src/ReactSVGComponents.js`
### Designing symbols
  1. `npm run start`
  - Use Lung to generate combinations of geons, which are imported from Figma
