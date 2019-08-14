<template>
  <div class="hello">
    <span @click="jumpTo('home')" class="foo">
      home
    </span>
    <span @click="jumpTo('mine')">mine</span>
    <!--  这个只是显示 路由name== helloWorld的中的页面，包括子页面只会在这个router-view中显示 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'index',
  props: {
    msg: String
  },
  methods: {
    jumpTo (name) {
      this.$router.push({ name })
    }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  border:1px solid skyblue;
}
.foo {
  color: #42b983;
}
</style>
