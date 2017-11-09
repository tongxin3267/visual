<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
// custom components
const Home = () => import('views/Home')
export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style lang="scss">
@import "../assets/style/config";
@import '../assets/style/common/index';

.el-loading-spinner .path {
  stroke: $color !important;
}

.el-loading-spinner .el-loading-text {
  color: $color !important;
}
</style>
