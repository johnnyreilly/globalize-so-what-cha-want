/* jshint varstmt: false, esnext: false */
var gulp = require('gulp');
var browserify = require('./gulp/browserify');
var jshint = require('./gulp/jshint');
var tests = require('./gulp/tests');
var staticFiles = require('./gulp/staticFiles');

gulp.task('build', function() {
  browserify.build();
  jshint.build();
  staticFiles.build();
  tests.build();
});

gulp.task('watch', function() {
  browserify.watch();
  jshint.watch();
  staticFiles.watch();
  tests.watch();
});
