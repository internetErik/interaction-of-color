var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    postcss    = require('gulp-postcss'),
    uncss      = require('postcss-uncss'),
    livereload = require('gulp-livereload'),
    connect    = require('gulp-connect');

gulp.task('connect',function(){
  connect.server({
    root: [ './' ],
    port: 3000,
    livereload: true,
    open: { browser: 'Google Chrome'},
  });
 });﻿

gulp.task('scss', function() {
  var plugins = [ uncss({ html: ['*.html'] }) ];
  gulp.src('src/scss/*.scss')
    .pipe(sass({
      includePaths: ['node_modules/susy/scss']
    }))
    // .pipe(postcss(plugins))
    .pipe(gulp.dest('public/css'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./*.html'], ['html']);
  gulp.watch('./src/scss/**/*.scss', ['scss']);
});

gulp.task('default', ['connect', 'scss', 'watch']);
