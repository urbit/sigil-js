module.exports = function (gulp, plugins, src, dest) {
    return function () {
        var stream = gulp.src(src)
          .pipe(plugins.sucrase({ transforms: ['jsx'] }))
          .pipe(gulp.dest(dest));
        return stream
    };
};
