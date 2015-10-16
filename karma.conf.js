/* eslint-disable no-var, strict */
'use strict';

var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  // Documentation: https://karma-runner.github.io/0.13/config/configuration-file.html
  config.set({
    browsers: [ 'PhantomJS' ],

    files: [
      'src/demo/dependencies.js', // Ensure we don't distort code coverage by having both files and the imports supply code
      'test/**/*.tests.js'
    ],

    port: 9876,

    frameworks: [ 'jasmine', 'phantomjs-shim' ],

    logLevel: config.LOG_INFO, //config.LOG_DEBUG

    preprocessors: {
      'src/**/*.js': [ 'webpack', 'sourcemap' ],
      'test/**/*.tests.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      devtool: 'inline-source-map',
      debug: true,
      module: webpackConfig.module,
    },

    webpackMiddleware: {
      quiet: true,
      stats: {
        colors: true
      }
    },

    // reporter options
    mochaReporter: {
      colors: {
        success: 'bgGreen',
        info: 'cyan',
        warning: 'bgBlue',
        error: 'bgRed'
      }
    },

    // the default configuration
    junitReporter: {
      outputDir: 'test-results', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: ''
    },

    coverageReporter: {
      reporters:[
        //{type: 'html', dir:'coverage/'},  // https://github.com/karma-runner/karma-coverage/issues/123
        {type: 'text'},
        {type: 'text-summary'}
      ],
    }
  });
};
