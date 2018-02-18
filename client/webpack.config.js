var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var JS_DIR = path.resolve(__dirname, '../server/js');
var CSS_DIR = path.resolve(__dirname, '../server/css');
var APP_DIR = path.resolve(__dirname, '../client');

var jsxConfig = {
  entry: APP_DIR + '/App.jsx',
  output: {
    path: JS_DIR,
    filename: 'agility.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      }
    ]
  }
};

var sassConfig = {
  entry: APP_DIR + '/main.scss',
  output: {
    path: CSS_DIR,
    filename: 'agility.styles.js'
  },
  module: {
    loaders: [
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}
    ]
  },
  plugins: [new ExtractTextPlugin({
      filename: 'agility.css',
      allChunks: true
    })]
};

module.exports = [jsxConfig, sassConfig];