# postcss 开发笔记

### 1. 关于postcss插件

### 2. gulp配置

### 3. webpack4.0配置

***

### postcss插件

* **cssnext**

1. cssnext已经停用，由postcss-cssnext替代
2. postcss-cssnext已经包含一些常用插件，例如autoprefixer，关于poastcss-cssnext配置可以参考[这里](https://github.com/MoOx/postcss-cssnext/blob/master/src/features.js)

* **precss**

在css文件中可以直接使用scss文件系统


***

### gulp配置

该项目中demo-1是gulp中postcss的基本配置

必须引入关键模块gulp-postcss

```javascript
const gulp = require('gulp');
const postcss = require('gulp-postcss');

const cssnext = require('postcss-cssnext');

gulp.task('css', function () {
  let plugins = [
    cssnext
    /* 后面所有的post-css插件都引入这个数组里就可以了 */
  ];

  return gulp.src('./src/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dest'));
});

```

***

### webpack4.0配置

不得不说webpack4.0版本更加的好用，对于新手更友好，内置插件也更加全面

目前4.0版本内置了babel，所以对ES6语法将直接转为ES5，无需额外插件

官方文档建议大家不用全局安装webpack，而在本地安装就行，本地安装也是最推荐的方式。

本地安装那么如何来配置呢？

创建基础配置文件webpack.config.js,
```javascript
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
  plugins: [clean, htmlPlugin],
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
```

注意这里如何配置postcss呢，需要安装postcss-loader, 且如上那样配置，详情可以参见[这里](https://www.npmjs.com/package/postcss)。

接下来我们需要创建开发入口文件dev.js，与上配置文件同一目录下    
```javascript
const path = require('path');
const webpackConfig = require('./webpack.config');

const Webpack = require('webpack');
const WebpackServer = require('webpack-dev-server');

let compiler = Webpack(webpackConfig);

const server = new WebpackServer(compiler, {
  contentBase: path.resolve(__dirname, '../dist'),
  stats: {
    colors: true,
  }
});

```
需要注意的是如果使用上面的配置文件启动`webpack-dev-server`是无法实现实时刷新的，如果需要开启实时刷新，需要通过命令执行模式来开启该服务，如下面的package文件配置那样启动，如果未全局安装webpack那么这时使用命令模式就会出错，所以我们还需要安装`webpack-cli`   

**webpack-cli**

webpack官方的命令端启动工具，非全局安装webpack需要通过命令端启动webpack或启动webpack-dev-server则需要安装webpack-cli来启动本项目内的webpack命令或webpack-dev-server命令，这是webpack4.0版本后必须安装的插件，否则是无法再本地项目中使用命令模式，即使绝对路径启动也不行。

接下来我们再创建生产入口文件build.js，与上配置文件同一目录下    
```javascript
process.env.NODE_ENV = 'production';

const webpack = require('webpack');

const config = require('./webpack.build.js');

webpack(config, (err, stats) => {
  if (err) {
    throw err;
  }

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');

  if (stats.hasErrors()) {
    console.log('  Build failed with errors.\n')
    process.exit(1)
  }
});

```
完成以上文件后，在package.json中，配置命令

```json
{
  "scripts": {
    "build": "node build/build.js",
    "dev": "webpack-dev-server --inline --config config/webpack.config.js"
  }
}

```

这样你就可以通过运行`npm run build`完成打包工作了，无需全局安装webpack

既然上面我们已经配置了postcss-loader,那postcss插件如何安装使用呢？这里我们需要在根目录下创建一个postcss.config.js文件。

```javascript
module.exports = {
  plugins: [
  require('postcss-cssnext'),
  /* 后面所有的post-css插件都引入这个数组里就可以了 */
  require('precss');
  ]
}
```

这样就完成了webpack中postcss的配置