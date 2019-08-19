<template>
  <div class="hello">
    <!--  这个只是显示 路由name== helloWorld的中的页面，包括子页面只会在这个router-view中显示 -->
    <router-view></router-view>

    <van-tabbar
      fixed
      v-model="active"
      @change="onChange"
      route>
      <van-tabbar-item replace v-for="(tab, i) in tabbar" :name="tab.name" :key="i" :to="tab.name">
        <span :class="{'icon-style': name ===tab.name}">{{ tab.title }}</span>
          <i
            slot="icon"
            :class="[name === tab.name ? `${tab.icon} icon-style `:tab.activeIcon,'icon']"
          ></i>
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
import { TABBAR } from '@/system/constants/tabbar'

export default {
  name: 'index',
  data () {
    return {
      tabbar: TABBAR,
      active: 0,
      name: 'home'
    }
  },
  methods: {
    // Uncaught (in promise) NavigationDuplicated{_name: "NavigationDuplicated", name: "NavigationDuplicated"}
    // 这里会报导航重复错误
    onChange (index) {
      this.name = index
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
.icon-style {
  color: #42b983;
}
</style>
