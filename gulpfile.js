var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var jade = require('gulp-jade');

var plumberOp = plumber({errorHandler: notify.onError('Error:<%= error.message %>')});

gulp.task('less', function() {
    gulp.src('src/less/**/*.less')
        .pipe(plumberOp)
        .pipe(less())
        .pipe(gulp.dest('build/css'))
        .pipe(livereload());
});

gulp.task('lessWatch', function() {
    livereload.listen();
    gulp.watch('src/**/*.less', ['less']);
});

gulp.task('jade', function() {
    gulp.src('src/jade/*.jade')
        .pipe(plumberOp)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('build/html'))
        .pipe(livereload());
});

gulp.task('jadeWatch', function() {
    livereload.listen();
    gulp.watch('src/**/*.jade', ['jade']);
});

gulp.task('default', ['less', 'jade']);
gulp.task('watch', ['lessWatch', 'jadeWatch']);