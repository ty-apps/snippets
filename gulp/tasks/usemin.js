var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');

gulp.task('usemin', function() {
  return gulp.src(paths.destDir + '/index.html')
    .pipe(usemin({
      js: [ uglify() ]
    }))
    .pipe(gulp.dest(paths.destDir + '/'));
});
