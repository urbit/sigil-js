module.exports = function (gulp, plugins, src, dest) {
  return function () {
    var stream = gulp
      .src(src)
      .pipe(plugins.rollup({
        plugins: [

          plugins.commonjs({
            // exclude: ['index.json'],
            namedExports: {
              'node_modules/react/index.js': [ 'Component' ],
              'node_modules/urbit-ob/dist/index.js': [
                'tierOfadd',
                'patp'
              ]
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
          plugins.json({
            preferConst: true,
          }),
          plugins.globals(),
          plugins.builtins(),

          // Applies object rest/spread syntax polyfill
          plugins.babel({
            babelrc: false,
            extensions: ['js'],
            plugins: [
              ["@babel/plugin-proposal-object-rest-spread", { useBuiltIns: true }]
            ],
            exclude: [
              "node_modules/**",
              "docs/**",
              "bin/**",
              "assets/**",
            ]
          }),
          plugins.resolve(),
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
