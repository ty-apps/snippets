var gulp = require('gulp');
var compass = require('gulp-compass');
var browserSync = require('browser-sync');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('css', function(done) {
  return gulp.src(paths.sassSrc + '/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      sass: paths.srcDir + '/scss',
      css: paths.destDir + '/css',
      image: paths.destDir + '/images',
      font: paths.destDir + '/fonts',
      javascript: paths.destDir + '/js'
    }))
    .on('error', errorAlert)
    .pipe(gulp.dest(paths.destDir + '/css'));
});
