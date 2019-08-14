// 同时为了保证ES版本的兼容，我们还需要配置一下babel.config.js
module.exports = {
  presets: [
    '@vue/app',
    '@babel/preset-env'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      style: true
    }, 'vant']
  ]
}
