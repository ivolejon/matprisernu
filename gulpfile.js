var gulp = require('gulp');

var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

var concat = require('gulp-concat');
var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

var vendor = ['public/vendor/bootstrap/']

gulp.task('minify-css', function() {
  return gulp.src('public/css/matpriser.css')
  	.pipe(autoprefixer())
    .pipe(minifyCss({compatibility: 'ie8','processImport':false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/dist/css'));
    
});

gulp.task('default', [], function() {
	livereload.listen();
	nodemon({
		// the script to run the app
		script: 'app.js',
		ext: 'js'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('app.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	});
});