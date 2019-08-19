<template>
  <div id="app">
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->

  <!--  这个 是指整个单页面的页面都会在这里显示  -->
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>

  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
  position: absolute;
  top: 0;
  left:0;
  right: 0;
  bottom: 0;
  width: 100%;
}

// 页面切换的css效果
.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}
.fade-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.fade-leave-to {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>
