var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
  return gulp.src(['public/vendor/bootstrap/dist/css'])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build/vendor.js'));
});