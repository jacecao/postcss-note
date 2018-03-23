const path = require('path');
const webpackConfig = require('../config/webpack.config');

const Webpack = require('webpack');
const WebpackServer = require('webpack-dev-server');

let compiler = Webpack(webpackConfig);

const server = new WebpackServer(compiler, {
  contentBase: path.resolve(__dirname, '../dist'),
  stats: {
  	colors: true,
  }
});





