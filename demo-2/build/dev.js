const path = require('path');
const webpackConfig = require('../config/webpack.config');

const Webpack = require('webpack');
const WebpackServer = require('webpack-dev-server');

let compiler = Webpack(webpackConfig);

const server = new WebpackServer(compiler, {
  contentBase: './dist',
  stats: {
  	colors: true,
  }
});

server.listen('8080', '127.0.0.1', () => {
	console.log('Starting server on http://localhost:8080');
});





