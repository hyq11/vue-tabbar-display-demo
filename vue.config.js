// vue.config.js
const path = require('path')

module.exports = {
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 以多页模式构建应用程序。
  pages: {
    index: {
      // page的入口文件
      entry: 'src/page/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  runtimeCompiler: false,
  productionSourceMap: false,
  chainWebpack: (config) => {
    // webpack目录别名alias
    // 以使用了webpack-chain链式API
    config.resolve.alias.set('@', path.join(__dirname, 'src'))
  }
  // devServer: {
  //   // host: 'localhost',
  //   host: '192.168.50.59',
  //   port: 8080, // 端口号
  //   https: false, // https:{type:Boolean}
  //   open: true, // 配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/
  //   hotOnly: true // 热更新
  // }
}
