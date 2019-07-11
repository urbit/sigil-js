module.exports = function (gulp, plugins, src, dest) {
  return function () {
    var stream = gulp
      .src(src)
      .pipe(plugins.rollup({
        plugins: [
          plugins.json({
            preferConst: true,
          }),
          plugins.commonjs({
            exclude: ['index.json'],
            namedExports: {
              'node_modules/react/index.js': [ 'Component' ]
            }
          }),
          plugins.replace({
            'process.env.NODE_ENV': JSON.stringify('development')
          }),
          plugins.rootImport({
            root: `${__dirname}/dist`,
            useEntry: 'prepend',
            extensions: ['.js']
          }),
          // plugins.globals(),
          // plugins.builtins(),
          plugins.resolve({
            extensions: ['.js', '.json'],
          }),
        ]
      }, 'cjs'))
      .on('error', function(e){
        console.log(e);
        // cb();
      })
      .pipe(gulp.dest(dest))
      // .on('end', cb);
  return stream
  };
};
