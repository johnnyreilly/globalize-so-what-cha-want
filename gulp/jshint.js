/* jshint varstmt: false, esnext: false */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsx = require('jshint-jsx');
var stylish = require('jshint-stylish');

var src = ['./index.js', './src/**/*.js', './test/**/*.js'];

function hint(options) {
  function run() {
    gulp.src(src)
      .pipe(jshint({ linter: jsx.JSXHINT }))
      .pipe(jshint.reporter(stylish));
  }

  run();

  if (options.shouldWatch) {
    gulp.watch(src, run);
  }
}

module.exports = {
  build: function() { return hint({ shouldWatch: false }); },
  watch: function() { return hint({ shouldWatch: true  }); }
};
