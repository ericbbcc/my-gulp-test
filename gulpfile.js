var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var jade = require('gulp-jade');
var webpack = require('webpack');
var gutil = require('gutil');
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var compress = new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}});
var path = require('path');

var plumberOp = {errorHandler: notify.onError('Error:<%= error.message %>')};

//less
gulp.task('less', function() {
    gulp.src('src/less/**/*.less')
        .pipe(plumber(plumberOp))
        .pipe(less())
        .pipe(gulp.dest('build/css'))
        .pipe(livereload());
});

gulp.task('lessWatch', function() {
    livereload.listen();
    gulp.watch('src/**/*.less', ['less']);
});

//jade
gulp.task('jade', function() {
    gulp.src('src/jade/*.jade')
        .pipe(plumber(plumberOp))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('build/html'));
        return gulp.src( '');
});

gulp.task('jadeWatch', function() {
    livereload.listen();
    gulp.watch('src/**/*.jade', ['jade']);
});


//webpack
gulp.task("webpack", function(callback) {
    // run webpack
    webpack({
        plugins: [commonsPlugin],
        entry: {
            index: './src/js/index.js'
        },
        output: {
            filename: '[name].js',
            path: __dirname + '/build/js'
        },
        resolve: {
            alias: {
                zepto: path.resolve(__dirname, './src/libs/zepto.min')
            }
        }
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
        }));
        callback();
    });
});

gulp.task('jsWatch', function() {
    livereload.listen();
    gulp.watch('src/**/*.js', ['webpack']);
});


//dev
gulp.task('default', ['less', 'jade', 'webpack']);
gulp.task('watch', ['lessWatch', 'jadeWatch', 'jsWatch']);