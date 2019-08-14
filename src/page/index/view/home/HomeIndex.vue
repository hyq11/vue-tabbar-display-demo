<template>
  <div>
    <van-button @click="$router.push('/goods-detail')">上频频go</van-button>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  name: 'home',
  components: {
    [Button.name]: Button
  }
}
</script>

<style>

</style>
