/* jshint varstmt: false, esnext: false */
var path = require('path');
var Server = require('karma').Server;
var gutil = require('gulp-util');

function runTests(options) {
  // Documentation: https://karma-runner.github.io/0.13/dev/public-api.html
  var karmaConfig = {
    configFile: path.join(__dirname, '../karma.conf.js'),
    singleRun: !options.shouldWatch,

    // Fancy runner
    plugins: ['karma-jasmine','karma-mocha-reporter', 'karma-junit-reporter', 'karma-coverage', 'karma-browserify', 'karma-phantomjs-launcher', 'karma-phantomjs-shim'], // karma-phantomjs-shim only in place until PhantomJS hits 2.0 and has function.bind
    reporters: (options.isDevelopment ? ['mocha'] : ['mocha','junit'])
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

module.exports = {
  build: function(done) { return runTests({ done: done, isDevelopment: false, shouldWatch: false }); },
  watch: function(done) { return runTests({ done: done, isDevelopment: true,  shouldWatch: true  }); }
};
