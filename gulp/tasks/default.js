var gulp = require('gulp');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');

// Default task to be run with `gulp`
// This will run tasks in order, so they can wait for each other to finish.
gulp.task('default', function() {
  runSequence(
    ['js', 'css', 'wiredep'], // Asynchronous
    'usemin',
    'browser-sync',
    function() {
      gulp.watch([paths.srcDir + '/scss/*.scss', paths.srcDir + '/scss/**/*.scss'], ['css']);
      gulp.watch([paths.srcDir + '/js/*.js', paths.srcDir + '/js/**/*.js'], ['js']);
    }
  );
});
