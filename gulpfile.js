// Gulp plugins
var gulp = require("gulp");
var rollup = require("gulp-better-rollup");
var minify = require("gulp-minify");
var sucrase = require("@sucrase/gulp-plugin");
var rename = require("gulp-rename");
var exec = require('child_process').exec;
var gzip = require('gulp-gzip')
// Rollup plugins
var resolve = require("rollup-plugin-node-resolve");
var commonjs = require("rollup-plugin-commonjs");
var replace = require("rollup-plugin-replace");
var json = require("rollup-plugin-json");
var builtins = require("rollup-plugin-node-builtins");
var rootImport = require("rollup-plugin-root-import");
var globals = require("rollup-plugin-node-globals");

// Package.json
var pkg = require("./package.json");

const plugins = {
  // gulp
  minify: minify,
  sucrase: sucrase,
  rename: rename,
  // rollup
  rollup: rollup,
  resolve: resolve,
  commonjs: commonjs,
  replace: replace,
  json: json,
  builtins: builtins,
  rootImport: rootImport,
  globals: globals,
  exec: exec,
};

function getTask(task, src, dest, pkg) {
  return require("./gulp/" + task)(gulp, plugins, src, dest);
}


var PATHS = {
  src: "./src",
  dist: "./dist",
};


gulp.task(
  "transpile",
  getTask(
    "js_sucrase",
    `${PATHS.src}/*.js`,
    `${PATHS.dist}`
  )
);


gulp.task(
  "bundle-cjs",
  getTask(
    "js_bundle_cjs",
    `${PATHS.dist}/index.js`,
    `${PATHS.dist}`,
  )
);


gulp.task('copy-json', function () {
  return gulp
    .src(`${PATHS.src}/index.json`)
    .pipe(gulp.dest(`${PATHS.dist}`))
})


gulp.task(
  "minify",
  getTask(
    "js_minify",
    `${PATHS.dist}/index.js`,
    `${PATHS.dist}`,
  )
);


gulp.task('gzip', function () {
  return gulp
    .src(`${PATHS.dist}/index-min.js`)
    .pipe(gzip())
    .pipe(gulp.dest(`${PATHS.dist}`));
});


gulp.task(
  'default',
  gulp.series(
    'copy-json',
    'transpile',
    'bundle-cjs',
    'minify',
    'gzip'
  )
)
