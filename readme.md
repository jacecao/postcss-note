# postcss 开发笔记

###1. 关于postcss插件

###2. gulp配置

###3. webpack4.0配置

***

###postcss插件

*1.cssnext*

1. cssnext已经停用，由postcss-cssnext替代
2. postcss-cssnext已经包含一些常用插件，例如autoprefixer，关于poastcss-cssnext配置可以参考[这里](https://github.com/MoOx/postcss-cssnext/blob/master/src/features.js)

***

###gulp配置

该项目中demo-1是gulp中postcss的基本配置

必须引入关键模块gulp-postcss

```javascript
const gulp = require('gulp');
const postcss = require('gulp-postcss');

const cssnext = require('postcss-cssnext');

gulp.task('css', function () {
  let plugins = [
    cssnext
  ];

  return gulp.src('./src/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dest'));
});

```

***

###webpack4.0配置

不得不说webpack4.0版本更加的好用，对于新手更友好，内置插件也更加全面

目前4.0版本内置了babel，所以对ES6语法将直接转为ES5，无需额外插件

官方文档建议大家不用再全局安装webpack，而在本地安装就行，本地安装也是最推荐的方式。

本地安装那么如何来配置呢？

依然需要先创建webpack.config.js,
```javascript
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// 这也是官方推荐使用插件，对HTML文件自动更新文件依赖
const htmlPlugin = new HtmlWebpackPlugin({
  title: 'auto change html'
});

module.exports = {
  // 注明开发环境
  // 根据不同的开发环境决定是否压缩代码,这是当前版本新属性
  mode: 'development',
  // 开启观察模式，你看现在这个对于基础打包来讲，配置如此简洁
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
```

注意这里如何配置postcss呢，需要安装postcss-loader, 且如上那样配置，详情可以参见[这里](https://www.npmjs.com/package/postcss)。

接下来我们需要创见入口文件index.js（文件名根据需求来定）
```javascript
const webpack = require('webpack');
// 引入webpack配置
const config = require('./webpack.config.js');

// 注意这个是核心，这里就类似于gulp了
// 我们需要手动运行webpack
webpack(config, (err, stats) => {
  if (err) {
    throw err;
  }
  // 如果没有错误，将得到webpack的编译状态
  // 这个状态会以标准输出在当前线程中
  process.stdout.write(stats.toString({
    colors: true, // 是否对信息开启颜色模式，即不同的信息类型使用不同的颜色
    modules: false, // 是否显示模块执行流程
    children: false, // ?
    chunks: false, //?
    chunkModules: false //?
  }) + '\n\n');
  
  // 如果编译中有错误就输出
  if (stats.hasErrors()) {
      console.log('  Build failed with errors.\n')
      process.exit(1)
  }

  // 如果没有这个回调函数，那么你就无法获取编译过程及编译状态
  // 你也就不知道编译出错的原因
});
```

完成这个两个文件后，在package.json中，配置命令

```json
{
  "scripts": {
    "build": "node index.js"
  }
}

```

这样你就可以通过运行`npm run build`完成打包工作了，无需全局安装webpack

既然上面我们已经配置了postcss-loader,那postcss插件如何安装使用呢？这里我们需要在根目录下创建一个postcss.config.js文件。

```javascript
module.exports = {
  plugins: [require('postcss-cssnext')]
}
```

这样就完成了webpack中postcss的配置