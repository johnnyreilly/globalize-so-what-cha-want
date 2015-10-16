/* eslint-disable no-var, strict, prefer-arrow-callback */
'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('./gulp/webpack');
var eslint = require('gulp-eslint');
var staticFiles = require('./gulp/staticFiles');
var tests = require('./gulp/tests');
var clean = require('./gulp/clean');
var inject = require('./gulp/inject');

var lintSrcs = ['./gulp/**/*.js', './src/**/*.js'];//, './test/**/*.js'];

gulp.task('delete-dist', function (done) {
  clean.run(done);
});

gulp.task('build-process.env.NODE_ENV', function () {
  process.env.NODE_ENV = 'production';
});

gulp.task('build-js', ['delete-dist', 'build-process.env.NODE_ENV'], function(done) {
  webpack.build().then(function() { done(); });
});

gulp.task('build-other', ['delete-dist', 'build-process.env.NODE_ENV'], function() {
  staticFiles.build();
});

gulp.task('build', ['build-less', 'build-js', 'build-other', 'lint'], function () {
  inject.build();
});

gulp.task('lint', function () {
  return gulp.src(lintSrcs)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', ['delete-dist'], function() {
  process.env.NODE_ENV = 'development';
  Promise.all([
    webpack.watch()//,
    //less.watch()
  ]).then(function() {
    gutil.log('Now that initial assets (js and css) are generated inject will start...');
    inject.watch();
  }).catch(function(error) {
    gutil.log('Problem generating initial assets (js and css)', error);
  });

  gulp.watch(lintSrcs, ['lint']);
  staticFiles.watch();
  tests.watch();
});
