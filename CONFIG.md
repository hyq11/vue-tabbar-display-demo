# vue.config.js 中配置(按需使用)

```js

// vue.config.js
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var vConsolePlugin = require('vconsole-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 去掉注释插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 基本路径
  publicPath: '/index',
  // 输出文件目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 以多页模式构建应用程序。
  pages:{
     index: {
      // page 的入口
      entry: 'src/index/main.js',
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
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/subpage/main.js'
  },
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require('os').cpus().length > 1,
  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  // webpack配置
  // 对内部的 webpack 配置进行更细粒度的修改 https://github.com/neutrinojs/webpack-chain see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    /**
     * 删除懒加载模块的prefetch，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
     */
    // config.plugins.delete('prefetch');
    // if(process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
    // } else {// 为开发环境修改配置...
    // }
  },
  // 调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: config => {
    // 生产and测试环境
    let pluginsPro = [
      new CompressionPlugin({ // 文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'), //匹配文件名
        threshold: 8192, //对超过80k的数据压缩
        minRatio: 0.8,
        deleteOriginalAssets: false //不删除源文件
      }),
      // Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      new BundleAnalyzerPlugin(),
      // 安装uglifyjs-webpack-plugin打包后去掉注释和console
      new UglifyJsPlugin({
          uglifyOptions: {
              compress: {
                  warnings: false,
                  drop_debugger: true,
                  drop_console: true,
              },
          },
      })
    ]
    // 开发环境
    let pluginsDev = [
      // 移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
      new vConsolePlugin({
        filter: [], // 需要过滤的入口文件
        enable: true // 发布代码前记得改回 false
      }),
    ]
    config.plugins.push(new HtmlWebpackPlugin({
      title: 'vue-demo',
      filename: 'index.html',
      template: 'public/index.html'
    }))
    if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      config.plugins = [...config.plugins, ...pluginsPro]
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev]
    }
  },
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        // 设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
        data: ` $baseUrl: "/"; @import '@/assets/scss/_common.scss';`
        // data: `
        // $baseUrl: "/";
        // `
      }
    }
  },
  // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
  devServer: {
    // host: 'localhost',
    host: '127.0.0.1',
    port: 9527, // 端口号
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8000'   // 配置跨域处理,只有一个代理
    //  多个代理
    proxy: { // 配置自动启动浏览器
      '/rest/*': {
        target: 'http://172.16.1.12:7071',
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false
      },
      '/pbsevice/*': {
        target: 'http://172.16.1.12:2018',
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false
      }
    }
  },
  // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
  pluginOptions: {
    'style-resources-loader': { // https://github.com/yenshih/style-resources-loader
      preProcessor: 'scss', // 声明类型
      'patterns': [
        // path.resolve(__dirname, './src/assets/scss/_common.scss'),
      ]
      // injector: 'append'
    }
  }
}
```

> postcss-px2rem 和 postcss-px2rem-exclude 两个插件是互相冲突的, 在postcss.config.js中配置一个即可
