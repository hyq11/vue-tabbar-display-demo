
export default [
  {
    name: 'goods-detail',
    path: '/goods-detail',
    component () {
      return import(/** webpackChunkName:goods */ '@/page/index/view/goods/GoodsDetail.vue')
    }
  }
]
