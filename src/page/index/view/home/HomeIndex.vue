<template>
  <div>
    <van-button @click="$router.push('/goods-detail')">上频频go</van-button>
    <van-button @click="postFetch">go</van-button>
  </div>
</template>

<script>
import { Button } from 'vant'
import http from '@/shared/http'
export default {
  name: 'home',
  data () {
    return {}
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      try {
        const res = await http.get('/api/mock')
        console.log(res)
      } catch (err) {

      }
    },
    async postFetch () {
      try {
        const res = await http.post('/api/upload', {
          link: 'http://'
        })
        console.log(res)
      } catch (err) {

      }
    }
  },
  components: {
    [Button.name]: Button
  }
}
</script>

<style>

</style>
