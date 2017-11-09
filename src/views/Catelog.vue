<template>
  <div class="catelog">
    <h1>{{ msg }}</h1>

    <router-link :to="{path:'/category', query:{id:1}}" tag="a">
      男装&女装
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'catelog',
    data () {
      return {
        msg: 'Welcome to catelog Page.'
      }
    }
  }
</script>
