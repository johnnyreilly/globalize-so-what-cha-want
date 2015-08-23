/* jshint varstmt: false, esnext: false */
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var gutil = require('gulp-util');

var src = './src/demo/main.js';
var dest = './dist/scripts';
var dependencies = [
  'react/addons',
  'flux',
  'events',
  'babel/polyfill'
];

function bundle(options) {
  var appBundler = browserify({
    entries: [src],
    transform: [babelify.configure({ sourceMaps: false, stage: 3 })],
    debug: options.isDevelopment,
    cache: {}, packageCache: {}, fullPaths: options.isDevelopment
  });
  appBundler.external(dependencies);

  var vendorsBundler = browserify({
    debug: options.isDevelopment,
    require: dependencies,
    cache: {}, packageCache: {}, fullPaths: options.isDevelopment
  });

  var errorOccurred = false;

  function rebundle() {
    appBundler.bundle()
      .on('error', notify.onError({
        title: 'APP Bundle',
        message: 'Failing to build...',
        emitError: true,
        sound: false
      }))
      .on('error', function(error) {
        gutil.log(error);
        gutil.log(gutil.colors.bgRed.bold('There is a problem in the app bundle!'));
        errorOccurred = true;
      })
      .pipe(source('main.js'))
      .pipe(gulpif(!options.isDevelopment, streamify(uglify())))
      .pipe(gulp.dest(dest))
      .pipe(gulpif(errorOccurred, notify(function () {
        errorOccurred = false;
        return {
          title: 'APP Bundle',
          message:'Building again successfully!',
          sound: false
        };
      })));
  }

  function rebundleVendors() {
    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendor.js'))
      .pipe(gulpif(!options.isDevelopment, streamify(uglify())))
      .pipe(gulp.dest(dest));
  }

  if (options.shouldWatch) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);

    vendorsBundler = watchify(vendorsBundler);
    vendorsBundler.on('update', rebundleVendors);
  }

  rebundle();
  rebundleVendors();
}

module.exports = {
  build: function() { return bundle({ isDevelopment: false, shouldWatch: false }); },
  watch: function() { return bundle({ isDevelopment: true,  shouldWatch: true }); }
};
