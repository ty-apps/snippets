var gulp = require('gulp');
var wiredep = require('wiredep').stream;

gulp.task('wiredep', function () {
  gulp.src(paths.srcDir + '/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest(paths.destDir));
});
