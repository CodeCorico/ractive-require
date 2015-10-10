'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    insert = require('gulp-insert'),
    packagejson = require('./package.json'),
    header = '/*! Ractive-Require (' + packagejson.version + '). (C) 2015 CodeCorico. MIT @license: en.wikipedia.org/wiki/MIT_License */\r\n',
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
    .pipe(insert.prepend(header))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify('ractive-require.min.js', {
      outSourceMap: true
    }))
    .pipe(insert.transform(function(contents) {
      if (contents.substr(0, 1) != '{') {
        contents = header + contents;
      }

      return contents;
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch('./features/**/*.js', ['build']);
});
