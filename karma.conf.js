'use strict';

module.exports = function(config) {
  // Documentation: https://karma-runner.github.io/0.13/config/configuration-file.html
  config.set({
    browsers: [ 'PhantomJS' ],

    files: [
      'test/**/*.tests.js'
    ],

    port: 9876,

    frameworks: [ 'jasmine', 'browserify', 'phantomjs-shim' ],

    logLevel: config.LOG_INFO, //config.LOG_DEBUG

    preprocessors: {
      'src/**/*.js': [ 'browserify', 'coverage' ],
      'test/**/*.tests.js': [ 'browserify' ]
    },

    // browserify configuration
    browserify: {
      debug: true,
      transform: [
        ['babelify', { sourceMaps: false, stage: 3 }],
        'browserify-istanbul'
      ]
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
