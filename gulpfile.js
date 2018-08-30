var gulp = require('gulp');

var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');

var babel = require('rollup-plugin-babel');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');
var json = require('rollup-plugin-json');
var builtins = require('rollup-plugin-node-builtins');
var rootImport = require('rollup-plugin-root-import');

/***
  End main config options
***/

var cache;

gulp.task('default', function(cb) {
  return rollup({
    input: './src/index.js',
    cache: cache,
    format: "es",
    plugins: [
      babel({
        ignore: ['src/vendor/**', 'node_modules/**']
      }),
      commonjs({
        namedExports: {
          'node_modules/lodash/lodash.js': [
            'map',
            'get',
            'set',
            'cloneDeep',
            'entries',
            'reduce',
            'filter',
            'last',
            'isString',
            'flatten',
            'size',
            'isUndefined'
          ]
        }
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      rootImport({
        root: `${__dirname}/src`,
        useEntry: 'prepend',
        extensions: '.js'
      }),
      json(),
      builtins(),
      resolve()
    ]
  }).on('bundle', function(bundle){ cache = bundle; })
    .on('error', function(e){
      console.log(e);
      cb();
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/'))
    .on('end', cb);
});

gulp.task('default');

gulp.task('watch', gulp.series('default', function() {
  gulp.watch('src/**/*.js', gulp.parallel('bundle-js'));
}));
