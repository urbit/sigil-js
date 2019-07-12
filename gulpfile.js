// Gulp plugins
var gulp = require("gulp");
var rollup = require("gulp-better-rollup");
var cssimport = require('gulp-cssimport');
var cssnano = require('gulp-cssnano');
var minify = require("gulp-minify");
var sucrase = require("@sucrase/gulp-plugin");
var rename = require("gulp-rename");
var exec = require('child_process').exec;
var gzip = require('gulp-gzip')
var server = require("gulp-server-livereload");

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
  src: "./lib/src",
  dist: "./lib/dist",
  preview: "./toolkit/preview"
};

// Build sigil-js library //////////////////////////////////////////////////////
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


// gulp.task('copy-json', function () {
//   return gulp
//     .src(`${PATHS.src}/index.json`)
//     .pipe(gulp.dest(`${PATHS.dist}`))
// })


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
    // 'copy-json',
    'transpile',
    'bundle-cjs',
    'minify',
    'gzip'
  )
)

// Build and serve preview site ////////////////////////////////////////////////

gulp.task(
  "site-transpile",
  getTask("js_sucrase", `${PATHS.preview}/src/**/*.js`, `${PATHS.preview}/dist`)
);

gulp.task(
  "site-bundle",
  getTask(
    "js_bundle_cjs",
    `${PATHS.preview}/dist/js/index.js`,
    `${PATHS.preview}/dist/js`
  )
);

gulp.task(
  "copy-site-html",
  getTask("copy", `${PATHS.preview}/src/index.html`, `${PATHS.preview}/dist`)
);

gulp.task(
  "copy-site-assets",
  getTask("copy", `${PATHS.preview}/src/assets/**/*.*`, `${PATHS.preview}/dist/assets`)
);


gulp.task("site-react", gulp.series("site-transpile", "site-bundle"));

// TODO: Change to SASS
gulp.task("site-css", function() {
  return gulp
    .src(`${PATHS.preview}/src/css/index.css`)
    .pipe(cssimport())
    .pipe(cssnano())
    .pipe(gulp.dest(`${PATHS.preview}/dist/css`));
});

gulp.task("watch-site-react", function() {
  gulp.watch(`${PATHS.preview}/src/js/**/*.{js,json}`, gulp.series("site-react"));
  // gulp.watch(`./vendor/**/*.js`, gulp.series("site-react"));
});

// TODO: Change to SASS
gulp.task("watch-site-css", function() {
  gulp.watch(`${PATHS.preview}/src/css/**/*.css`, gulp.series("site-css"));
});

gulp.task("watch-site-assets", function() {
  gulp.watch(`${PATHS.preview}/src/assets/**/*.*`, gulp.series("copy-site-assets"));
});

gulp.task("site-webserver", function() {
  gulp.src(`${PATHS.preview}/dist`).pipe(
    server({
      livereload: true,
      open: true,
      port: 3001,
      defaultFile: "index.html"
    })
  );
});

gulp.task(
  "site",
  gulp.series(
    gulp.series("site-react", "site-css", "copy-site-assets", "copy-site-html"),
    gulp.parallel(
      "watch-site-react",
      "watch-site-css",
      "watch-site-assets",
      "site-webserver"
    )
  )
);
