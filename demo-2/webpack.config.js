const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
	title: 'auto change html'
});

module.exports = {
	// 注明开发环境
	// 根据不同的开发环境决定是否压缩代码
	mode: 'development',
	// 开启观察模式
	watch: true,
	entry: {
		app: './src/index.js',
		print: './src/print.js'
	},
	plugins: [htmlPlugin],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist/')
	},
	module: {
		rules: [{
			test:/\.css$/,
			exclude: /node_modules/,
			use: [{
				loader: 'style-loader',
			}, {
				loader: 'css-loader',
				options: {importLoaders: 1}
			}, {
				loader: 'postcss-loader'
			}]
		}]
	}
}