<template>
  <div class="done">
    <h1>{{ msg }}</h1>

    <router-link :to="{path:'/'}" tag="a">
      返回首页
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'done',
    data () {
      return {
        msg: '订单提交成功.'
      }
    }
  }
</script>
