import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'vant/lib/index.css'
// import 'lib-flexible/flexible.js'
import '../../assets/index.scss'

Vue.config.productionTip = false

Vue.use(VueRouter)

const { routes } = require('@/page/index/router/routes')
console.log(routes)

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes // (缩写) 相当于 routes: routes
})

// 渲染一个路由的过程中，需要尝试解析一个异步组件时发生错误
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
