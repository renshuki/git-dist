// Include gulp
var gulp = require('gulp'); 

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var filter = require('gulp-filter');

// Configuration file
var config = require('./config.json');

// Concatenate & Minify CSS
gulp.task('styles', function() {
    return gulp.src(config.srcCSSFolder)
    	.pipe(concat('all.css'))
    	.pipe(rename('all.min.css'))
    	.pipe(uglifycss())
        .pipe(gulp.dest(config.distFolder));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(config.srcJSFolder)
        .pipe(concat('all.js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.distFolder));
});

// Watch files for changes
gulp.task('watch', function() {
    gulp.watch(config.srcJSFolder, ['scripts']);
    gulp.watch(config.srcCSSFolder, ['styles']);
});

// Default task
gulp.task('default', ['styles', 'scripts'], function(){
    return gulp.src(config.srcHTMLFolder)
        .pipe(useref())
        .pipe(gulp.dest(config.distFolder));
});
