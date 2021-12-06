
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./sigil-js.cjs.production.min.js')
} else {
  module.exports = require('./sigil-js.cjs.development.js')
}
