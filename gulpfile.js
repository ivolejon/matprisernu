var gulp = require('gulp');

var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

var concat = require('gulp-concat');
var minifyJs = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var url_adujuster = require('gulp-css-url-adjuster')
var replace = require('gulp-replace-task');

gulp.task('minify-js', function() {
  return gulp.src(['./public/js/home.js'])
    .pipe(concat('site.js'))
    .pipe(minifyJs())
    .pipe(gulp.dest('./public/dist/js'));
});


gulp.task('minify-css', function() {
     gulp.src('./public/css/matpriser.css')
    .pipe(url_adujuster({
    replace:  ['../img/','../image/'],
  	}))
  	.pipe(autoprefixer())
    .pipe(minifyCss({compatibility: 'ie8','processImport':false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/dist/css'));
    
});

gulp.task('copy-images', function() {
   gulp.src(['./public/image/*'])
   .pipe(gulp.dest('./public/dist/image'));
});


gulp.task('fix-urls', function() {
   gulp.src(['./views/*.handlebars','./views/layouts/*.handlebars'])
   .pipe(replace({
   	usePrefix:false,
      patterns: [
        {
          match: 'image/',
          replacement: 'dist/image/'
        }
      ]
    }))
    .pipe(gulp.dest(function(file) {
    return file.base;
  }));
});


gulp.task('default', ['minify-css','copy-images','minify-js'], function() {

});

gulp.task('run', function() {
	nodemon({
		// the script to run the app
		script: 'app.js',
		ext: 'js'
	});
});