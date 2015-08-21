/* jshint varstmt: false, esnext: false */
var gulp = require('gulp');
var Server = require('karma').Server;
var path = require('path');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var src = ['./index.js', './test/**/*.js'];

gulp.task('build', function(done) {
  hint({ shouldWatch: false });
  runTests({ done: done, shouldWatch: false});
});

gulp.task('watch', function(done) {
  hint({ shouldWatch: true });
  runTests({ done: done, shouldWatch: true});
});

function runTests(options) {
  // Documentation: https://karma-runner.github.io/0.13/dev/public-api.html
  var karmaConfig = {
    configFile: path.join(__dirname, './karma.conf.js'),
    singleRun: !options.shouldWatch,

    // Fancy runner
    plugins: ['karma-jasmine','karma-mocha-reporter', 'karma-coverage', 'karma-browserify', 'karma-phantomjs-launcher', 'karma-phantomjs-shim'], // karma-phantomjs-shim only in place until PhantomJS hits 2.0 and has function.bind
    reporters: ['mocha']
  };

  new Server(karmaConfig, karmaCompleted).start();

  function karmaCompleted(karmaResult) {
    gutil.log('Karma completed!');
    if (karmaResult === 1) {
      options.done('karma: tests failed with code ' + karmaResult);
    } else {
      options.done();
    }
  }
}

function hint(options) {
  function run() {
    gulp.src(src)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  }

  run();

  if (options.shouldWatch) {
    gulp.watch(src, run);
  }
}
