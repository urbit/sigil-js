# sigil-js

[![npm (scoped)](https://img.shields.io/npm/v/@tlon/sigil-js?style=flat)](https://www.npmjs.com/package/@tlon/sigil-js)

[→ Github](https://github.com/urbit/sigil-js)

Urbit address space contains ~4.2 billion unique points. Each has a pronounceable, easily memorized name, something like ~ravmel-ropdyl. Sigils visualize these names – there are as many unique Sigils as there are Azimuth points. `@urbit/sigil-js` is a javascript library that converts one of these names into its corresponding Sigil.

![sigil intro image](https://github.com/urbit/sigil-js/blob/master/docs/intro.png?raw=true)

## Basic Usage


### React
 ```js
import '@urbit/sigil-js'

const config = {
  point: '~zod', // or 'zod'
  size: 348,
  background:'#010101', 
  foreground:'yellow',
  detail:'none',
  space:'none',
}

const Sigil = ({ config }) => {
  return (
    <urbit-sigil {...config} />
  )
}
 ```

## Install

`npm install @urbit/sigil-js`

## API

|Param|Explanation|Type|Optional?
|-----|-----------|----|---------
|`point`|Any valid urbit point name|`string`|No, and can only accept galaxies, stars and planets.
|`size`| Size of desired SVG output| `integer`| Yes, defaults to 128px 
|`foreground`| Foreground color| `string` | Yes, defaults to '#FFF' 
|`background`| Background color| `string` | Yes, defaults to '#000' 
|`detail`| Controls whether or not details should be rendered. Useful for small sizes below 48px | `none` or `default` | Yes, defaults to `default`
|`space`| space between edge of sigil and edge of background| `none`, `large` or `default` | Yes, defaults to `default`


### Build

|Commands              | Description                                   |
| -------------------- | --------------------------------------------- |
|`npm run build`| Build the library from source              |
|`npm run dev`| Build the library from source and copies build into `/preview`             |


### Tests and Performance

`npm run test`

### Contributing
Please read [CONTRIBUTING.md](https://github.com/urbit/sigil-js/CONTRIBUTING.md) for details on the process for submitting pull requests to us.

### Authors
- ~ridlur-figbud

### License
This project is licensed under the MIT License - see the [LICENSE.txt](https://github.com/urbit/sigil-js/LICENSE.md) file for details

![sigil outro image](https://github.com/urbit/sigil-js/blob/master/docs/outro.png?raw=true)
