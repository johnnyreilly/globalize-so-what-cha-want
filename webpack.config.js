/* eslint-disable no-var, strict, prefer-arrow-callback */
'use strict';

var path = require('path');
// var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: {
    main: './src/demo/main.js',
    vendor: [
      'react/addons',
      'flux',
      'events',
      'babel/polyfill'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist/scripts'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          stage: 3
        }
      }
    ]
  },
  plugins: [
  ]
};
