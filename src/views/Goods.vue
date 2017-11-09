<template>
  <div class="goods">
    <h1>{{ msg }}</h1>

    <router-link :to="{path:'/cart'}" tag="a">
      加入购物车
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'goods',
    data () {
      return {
        msg: 'Welcome to goods Page.'
      }
    }
  }
</script>
