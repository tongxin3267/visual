<template>
  <div class="checkout">
    <h1>{{ msg }}</h1>

    <router-link :to="{path:'/done'}" tag="a">
      提交订单
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'checkout',
    data () {
      return {
        msg: 'Welcome to checkout Page.'
      }
    }
  }
</script>
