# webpack 配置postcss

###必要插件说明

1. html-webpack-plugin

这个插件用于自动加载资源，不用手动更新。

2. clean-webpack-plugin

主要用于dist文件夹清理

3. webpack-dev-server

webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)

4. webpack-cli

webpack官方的命令端启动工具，非全局安装webpack需要通过命令端启动webpack或启动webpack-dev-server则需要安装webpack-cli来启动本项目内的webpack命令或webpack-dev-server命令，这是webpack4.0版本后必须安装的插件，否则是无法再本地项目中使用命令模式，即使绝对路径启动也不行。