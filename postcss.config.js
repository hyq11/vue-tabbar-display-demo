// .postcssrc.js

// 项目中安装 lib-flexible 和 postcss-px2rem

// npm install lib-flexible --save
// npm install postcss-px2rem --save

// 入口文件引入
// import 'lib-flexible/flexible.js'

module.exports = {
  plugins: {
    autoprefixer: {},
    // 将px变成rem
    // 'postcss-px2rem': {
    //   remUnit: 75
    // },
    'postcss-px2rem-exclude': {
      remUnit: 37.5,
      exclude: /node_modules|assets|login|main/gi
    }
  }
}
