import Vue from 'vue'
import { localUrl } from 'config'
import * as global from './directives/global'
import seamlessScroll from './directives/seamlessScroll'

import colorUpdate from 'mixins/color-update'
import arrRemove from 'mixins/arr-remove'
import dateFormat from 'mixins/date-format'

//axios
import axios from 'axios'

// image lazy load
import VueLazyload from 'vue-lazyload'




/**
 * 未发布状态下，引用本地服务器地址
 */
process.env.NODE_ENV !== 'production' ? Vue.prototype.release = false : Vue.prototype.release = true
window.ROOT_PIC = "http://10.10.10.14"

/**
 * Directives
 */
Vue.directive('href', global.href)
Vue.directive('box-product-w', global.boxProductW)
Vue.directive('seamless-scroll', seamlessScroll)

// window.ROOT_URL = "/dsc_mall/mobile/"


/**
 * 返回请求链接地址
 */
if (!window.ROOT_URL)
  window.ROOT_URL = `/dsc_mall/mobile/`

if (!window.PC_URL)
  window.PC_URL = `/dsc_mall/`


if (!Vue.prototype.release) {
  /**
 * 生成服务端入URL
 */
  Vue.prototype.url = function (module) {
    return `/mobile/index.php?m=${module}`
  }
  window.getUrl = function (module) {
    return `/mobile/index.php?m=${module}`
  }
} else {
  Vue.prototype.url = function (module) {
    return `${window.ROOT_URL}index.php?m=${module}`
  }
  window.getUrl = function (module) {
    return `${window.ROOT_URL}index.php?m=${module}`
  }
}


/**
 * 颜色进制转换添加到 String 原型中
 */
String.prototype.colorRgb = colorUpdate.colorRgb

/*
* 去除空格
*/
String.prototype.trims = function () {
  if (this != "" || !this) {
    return this.replace(/\s+/g, "")
  }
}


/**
 * 数组对象新增 remove 原型
 */
Array.prototype.remove = arrRemove.remove

/**
 * Date 对象新增 format 原型
 */
Date.prototype.format = dateFormat.format


//页面刷新清空已有的sessionStorage aPicture
if (!sessionStorage.opened && sessionStorage.getItem('aPicture')) {
  sessionStorage.removeItem('aPicture')
}

window.apiAuthority = "api"
if (window.shopInfo.authority) {
  window.apiAuthority = "view"
} else if (window.shopInfo.ruid != 0) {
  window.apiAuthority = "apiSeller"
} else {
  window.apiAuthority = "api"
}

Vue.use(VueLazyload,{
  preLoad:1.3,
  error:Vue.prototype.release ? `${window.ROOT_URL}public/img/default-img.fe203b8.jpg` : require('assets/images/default-img.jpg'),
  loading:Vue.prototype.release ? `${window.ROOT_URL}public/img/default-img.fe203b8.jpg` : require('assets/images/default-img.jpg'),
  attempt:1
})