<template>
  <div id="app">
      <dashboard></dashboard>  
     <!-- <router-view></router-view>  -->
  </div>
</template>

<script>
// custom components
// import Dashboard from 'views/admin/Dashboard'

const Dashboard = () => import('views/admin/Dashboard')

export default {
  name: 'app',
  components: {
    Dashboard
  }
}
</script>

<style lang="scss">
@import "assets/style/config";
@import 'assets/style/common/index';
</style>
