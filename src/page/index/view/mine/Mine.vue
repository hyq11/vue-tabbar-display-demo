<template>
  <div>
    我的页面123456
  </div>
</template>

<script>
import http from '@/shared/http'

export default {
  name: 'mine',
  watch: {
    $route: {
      handler () {
        this.fetch()
      },
      immediate: true
    }
  },
  methods: {
    async fetch () {
      try {
        const res = await http.get('/api/mock')
        console.log(res)
      } catch (err) {

      }
    }
  }
}
</script>

<style>

</style>
