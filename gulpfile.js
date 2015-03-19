'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    files = [
      'features/get/get.js',
      'features/controller/controller.js',
      'features/require/require.js'
    ];

gulp.task('default', ['build', 'watch']);

gulp.task('build', function() {
  gulp
    .src(files)
    .pipe(concat('ractive-require.js', {newLine: '\r\n'}))
    .pipe(gulp.dest('./dist'));

  gulp
    .src(files)
    .pipe(uglify('ractive-require.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch('./features/**/*.js', ['build']);
});
