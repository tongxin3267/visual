<template>
  <div class="search">
    <h1>{{ msg }}</h1>

    <router-link :to="{path:'/catelog'}" tag="a">
      全部类别
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data () {
      return {
        msg: 'Welcome to search App'
      }
    }
  }
</script>
