'use strict';

module.exports = function(config) {
  // Documentation: https://karma-runner.github.io/0.13/config/configuration-file.html
  config.set({
    browsers: [ 'PhantomJS' ],

    files: [
      'test/**/*.tests.ts'
    ],

    port: 9876,

    frameworks: [ 'jasmine', 'browserify', 'phantomjs-shim' ],

    logLevel: config.LOG_INFO, //config.LOG_DEBUG

    preprocessors: {
      'src/lib/**/*.ts': [ 'browserify', 'coverage' ],
      'test/**/*.tests.ts': [ 'browserify' ]
    },

    // browserify configuration
    browserify: {
      debug: true,
      plugin: [ 'tsify' ],
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
