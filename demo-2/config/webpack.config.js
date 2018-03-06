const path = require('path');

// html 文件插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 插件配置
let htmlPlugin = new HtmlWebpackPlugin({
	title: 'webpack-postcss'
});

// webpack导出文件清理插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 配置
let cleanOPtions = {
	exclude: [],
	verbose: true,
	dry: false
};
let clean = new CleanWebpackPlugin(['dist']);



module.exports = {
	// 注明开发环境
	// 根据不同的开发环境决定是否压缩代码
	mode: 'development',
	// 是否开启监听模式
	watch: true,
	// 生成源码索引，方便错误调试
	devtool: 'inline-source-map',

	entry: {
		app: './src/index.js',
		print: './src/print.js'
	},
	plugins: [clean, htmlPlugin],
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