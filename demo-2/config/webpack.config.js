const path = require('path');


// html 文件插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 插件配置
let html_opt = {
	title: 'webpack-postcss',
	// 配置模板文件路径
	template: path.resolve(__dirname, '../index.html')
};
if (process.env.NODE_ENV === 'production') {
	html_opt.filename = path.resolve(__dirname, '../dist/index.html');
}
let htmlPlugin = new HtmlWebpackPlugin(html_opt);


// webpack导出文件清理插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 配置
let cleanOPtions = {
	// 配置当前运行环境的根路径
	root: path.resolve(__dirname, '../'),
	exclude: [],
	verbose: true,
	dry: false
};
let clean = new CleanWebpackPlugin(['dist'], cleanOPtions);


// 指定插件数组
let _plugins = [htmlPlugin];
if (process.env.NODE_ENV === 'production') {
	_plugins.push(clean);
}


module.exports = {
	// 注明开发环境
	// 根据不同的开发环境决定是否压缩代码
	mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
	// 是否开启监听模式
	// watch: true,
	// 生成源码索引，方便错误调试
	devtool: 'inline-source-map',

	entry: {
		app: './src/index.js'
	},
	plugins: _plugins,
	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, '../dist/js/')
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