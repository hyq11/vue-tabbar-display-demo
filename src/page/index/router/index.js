export default [
  {
    name: 'index',
    path: '/',
    component () {
      return import(/* webpackChunkName:'login' */ '@/page/index/view/index.vue')
    },
    redirect: '/home',
    children: [
      {
        name: 'home',
        path: '/home',
        component () {
          return import(/* webpackChunkName:'login' */ '@/page/index/view/home/HomeIndex.vue')
        }
      },
      {
        name: 'mine',
        path: '/mine',
        component () {
          return import(/* webpackChunkName:'login' */ '@/page/index/view/mine/Mine.vue')
        }
      }
    ]
  }
]
