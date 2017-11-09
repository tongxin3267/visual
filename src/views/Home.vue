<template>
  <div class='home'>
    <template v-if="bStore">
      <ec-search :preview="false" :data="searchStoreData"></ec-search>
      <ec-shop-signs :preview="false"></ec-shop-signs>
      <ec-line :preview="false" :data="lineData"></ec-line>
    </template>
    <template v-else>
      <app-down></app-down>
    </template>
    <component v-for="(item,index) in modules" :key="index" :is="'ec-'+item.module" :data="item.data" :preview="false" :modules-index="index">
      {{ item }}
    </component>
    <template v-if="bStore">
      <ec-title :preview="false" :data="titleData"></ec-title>
      <ec-product :preview="false" :data="productData"></ec-product>
      <ec-shop-menu :preview="false"></ec-shop-menu>
    </template>
    <ec-filter-top :preview="false" v-if="!bStore"></ec-filter-top>
  </div>
</template>

<script>
//node library
import url from 'url'
import qs from 'qs'

// mapActions mapState
import {
  mapActions,
  mapState
} from 'vuex'

// custom components
import EcSlide from 'components/slide/Frontend'
import EcTitle from 'components/title/Frontend'
import EcAnnouncement from 'components/announcement/Frontend'
import EcNav from 'components/nav/Frontend'
import EcLine from 'components/line/Frontend'
import EcBlank from 'components/blank/Frontend'
import EcJigsaw from 'components/jigsaw/Frontend'
import EcProduct from 'components/product/Frontend'
import EcCoupon from 'components/coupon/Frontend'
import EcCountDown from 'components/count-down/Frontend'
import EcButton from 'components/button/Frontend'
import EcSearch from 'components/search/Frontend'
import EcStore from 'components/store/Frontend'
import EcShopSigns from 'components/shop-signs/Frontend'
import EcShopMenu from 'components/shop-menu/Frontend'
import EcTabDown from 'components/tab-down/Frontend'
import EcFilterTop from 'components/element/FilterTop'
import AppDown from 'components/element/AppDown'

// third party components
import {
  Button
} from 'element-ui'


//data-conversion
import { conversion } from 'assets/js/data-conversion'

export default {
  name: 'home',
  components: {
    "EcButton": Button,
    EcSlide,
    EcTitle,
    EcAnnouncement,
    EcNav,
    EcLine,
    EcBlank,
    EcJigsaw,
    EcProduct,
    EcCoupon,
    EcCountDown,
    EcButton,
    EcSearch,
    EcStore,
    EcShopSigns,
    EcShopMenu,
    EcTabDown,
    EcFilterTop,
    AppDown
  },
  data() {
    return {

    }
  },
  created() {
    let { m, a } = this.oQuery
    if (this.oQuery.topic_id) {
      this.$store.dispatch('setModuleInfo', {
        id: this.oQuery.topic_id, type: "topic"
      })
    }
    if ((m == "store" && a == "shop_info") || window.shopInfo.ruid != 0) {
      this.getModule({
        ruid: this.oQuery.id || window.shopInfo.ruid,
        type: m || 'store'
      })
    }else if ((!m || m == "index") && !this.oQuery.topic_id && window.shopInfo.ruid == 0) {
      this.getModule()
    }
  },
  methods: {
    getWxShareConfig() {
      this.$http.post(this.url(`console&c=${window.apiAuthority}&a=index`)).then(({data}) => {
        conso.log(data)
      })
    },
    getModule(o) {
      this.$http.post(this.url(`console&c=${window.apiAuthority}&a=default`), qs.stringify(
        o
      )).then(({ data }) => {
        if (data.type == "old") {
          let oModules = conversion(JSON.parse(data.index))
          this.$store.dispatch('setConversionModules', {
            moduleData: JSON.stringify(oModules)
          })
        } else if (data.type != "old" && data.index) {
          this.$store.dispatch('setModuleInfo', {
            id: data.index
          })
        }
      })
    },
  },
  computed: {
    ...mapState({
      searchStoreData: state => state.shopInfo.searchStoreData,
      lineData: state => state.shopInfo.lineData,
      titleData: state => state.shopInfo.titleData,
      productData: state => state.shopInfo.productData
    }),
    oQuery() {
      const sUrl = window.location.href
      let oUrl = url.parse(sUrl)
      return qs.parse(oUrl.query)
    },
    bStore() {
      return window.shopInfo.ruid != 0
    },
    bMoudles() {
      return 0 < this.modules.length ? true : false
    },
    modules() {
      return this.$store.state.modules
    }
  }
}

</script>

<style lang="scss" scoped>

</style>