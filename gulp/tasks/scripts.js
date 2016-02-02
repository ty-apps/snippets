var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var eventStream = require('event-stream');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require("browser-sync");

gulp.task('js', function (done) {

  function getFolders(dir){
    return fs.readdirSync(dir)
      .filter(function(file){
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
  }

  // Compile folders
  var folders = getFolders(paths.srcDir + '/js');
  var tasks = folders.map(function(folder) {
    return gulp.src(path.join(paths.srcDir + '/js', folder, '/*.js'))
      .pipe(concat(folder + '.js'))
      .pipe(gulp.dest(paths.destDir + '/js'))
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
      .pipe(gulp.dest(paths.destDir + '/js'));
  });

  return eventStream.concat.apply(null, tasks);

});
