var gulp = require('gulp');
var cssimport = require('gulp-cssimport');
var cssnano = require('gulp-cssnano');
var rollup = require('gulp-better-rollup');
var sucrase = require('@sucrase/gulp-plugin');
var minify = require('gulp-minify');
var exec = require('child_process').exec;

var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');
var json = require('rollup-plugin-json');
var builtins = require('rollup-plugin-node-builtins');
var rootImport = require('rollup-plugin-root-import');
var globals = require('rollup-plugin-node-globals');
var server = require("gulp-server-livereload");


gulp.task('jsx-transform', function(cb) {
  return gulp.src('src/**/*.js')
    .pipe(sucrase({
      transforms: ['js']
    }))
    .pipe(gulp.dest('dist'));
});


<<<<<<< HEAD

gulp.task('js-imports', function(cb) {
  return gulp.src('dist/index.js')
    .pipe(rollup({
      plugins: [
        commonjs({
          namedExports: {
            'node_modules/transformation-matrix/build-commonjs/index.js': [
              'scale',
              'translate',
              'transform',
              'toSVG',
              'fromString',
              'identity',
            ]
          }
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),
        rootImport({
          root: `${__dirname}/dist`,
          useEntry: 'prepend',
          extensions: ['.js']
        }),
        json(),
        globals(),
        builtins(),
        resolve()
      ]
    }, 'cjs'))
=======
gulp.task('default', function(cb) {
  return rollup({
    input: './src/index.js',
    cache: cache,
    format: "cjs",
    // name: "sigils-js",
    plugins: [
      babel({
        plugins: ['babel-plugin-lodash'],
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
          ],
          'node_modules/transformation-matrix/build-es/index.js': [
            'scale',
            'translate',
            'transform',
            'toSVG',
            'rotateDEG',
            'scale'
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
      resolve(),
      uglify()
    ]
  }).on('bundle', function(bundle){ cache = bundle; })
>>>>>>> 130200360170483f233247e8d62cb0b1e0574bb1
    .on('error', function(e){
      console.log(e);
      cb();
    })
    .pipe(gulp.dest('./dist/'))
    .on('end', cb);
});

gulp.task('copy-json', function () {
  return gulp
  .src('src/index.json')
  .pipe(gulp.dest('./dist/'))})

gulp.task('js-minify', function () {
  return gulp.src('./dist/index.js')
    .pipe(minify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('js-cachebust', function(cb) {
  return Promise.resolve(
    exec('git log', function (err, stdout, stderr) {
      let firstLine = stdout.split("\n")[0];
      let commitHash = firstLine.split(' ')[1].substr(0, 10);
      let newFilename = "index-" + commitHash + "-min.js";

      exec('mv ./dist/index-min.js ./dist/' + newFilename);
    })
  );
})


gulp.task('default', gulp.series('copy-json', 'jsx-transform', 'js-imports', 'js-minify', 'js-cachebust'))
