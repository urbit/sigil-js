let prodConfig = require('./webpack.config.prod.js');

          prodConfig.entry = [require.resolve('./polyfills'), './src/lib.js']
          prodConfig.output.library = '<projname>'
          prodConfig.output.libraryTarget = 'umd'

          module.exports = prodConfig;
