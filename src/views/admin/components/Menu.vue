<template>
  <div class='menu'>
    <header>
      <span class="page-list header-btn" :class="{active:bPageListTitle}" @click="isShowPageList">
        <i class="iconfont" :class="'icon-'+pageListTitle.icon"></i>
      </span>
      <nav class="header-nav">
        <ul>
          <li class="header-btn" v-for="(item, index) in menuComponent" :key="index" v-show="item.isShow" @mouseenter="navHoverTab(index,$event)" @mouseleave.stop="navOutTab(index)">
            <span class="header-btn-span" :class="{active:item.isActive}">{{ item.text }}</span>
            <div class="sub-menu" :class="{active:item.isActive}">
              <ul>
                <draggable :options="options" @clone="onDraggClone($event)">
                  <li v-for="(itemSub, index) in item.subComponent" :key="'itemSub'+index" v-if="itemSub.isShow && (itemSub.type == 'all' || itemSub.type == sType)" :data-module="itemSub.module">
                    <i class="iconfont" :class="'icon-'+itemSub.icon"></i>
                    <span>{{ itemSub.text }}</span>
                  </li>
                </draggable>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      <ul class="global" v-if="bStore">
        <li v-if="globaSettings.isShow">{{globaSettings.text}}</li>
        <li><a :href="pcUrl+'seller'">返回</a></li>
      </ul>
    </header>
  </div>
</template>

<script>
// mapActions mapState
import { mapActions, mapState } from 'vuex'

// third party components
import draggable from 'vuedraggable'

export default {
  name: 'menu',
  components: {
    draggable
  },
  data() {
    return {
      options: {
        group: {
          name: 'people',
          pull: 'clone',
          put: false,
          sort: false
        }
      }
    }
  },
  beforeMount() {
  },
  methods: {
    onDraggClone(e) {
      e.item.style.listStyle = "none"
    },
    navHoverTab(index) {
      this.$store.dispatch('navEnterTab', index)
    },
    navOutTab(index) {
      this.$store.dispatch('navLeaveTab', index)
    },
    isShowPageList() {
      this.$store.dispatch('updateSettingActive', 'pageListTitle')

    }
  },
  computed: {
    ...mapState({
      pageListTitle: state => state.dashboard.configInfo.headerMenu.pageListTitle,
      menuComponent: state => state.dashboard.configInfo.headerMenu.menuComponent,
      globaSettings: state => state.dashboard.configInfo.headerMenu.globaSettings,
      bPageListTitle: state => state.dashboard.configInfo.headerMenu.pageListTitle.isActive
    }),
    pcUrl(){
      return window.PC_URL
    },
    bStore() {
      return window.shopInfo.ruid != 0
    },
    sType() {
      return window.shopInfo.ruid != 0 ? "shop" : "platform"
    }
  }
}

</script>

<style lang="scss" scoped>
@import '../../../assets/style/config';
@import '../../../assets/style/mixins/common';
$header-bg: #293031;
$header-pagelist-active: #232829;
$nav-left: 16rem;
$header-size:1.4rem;
.menu header {
  background: $header-bg;
  height: $header-height;
  width: 100%;
  z-index: 2;
  position: fixed;
}

.menu .page-list,
.global {
  color: $write-color;
  height: $header-height;
  float: left;
  width: $header-height;
  @include direction(center, center);
}

.menu .page-list i {
  font-size: 2.2rem;
}

.menu .header-btn:hover,
.header-btn.active {
  background: $header-pagelist-active;
  cursor: pointer;
}

.menu .header-btn-span {
  font-size: 1.45rem;
  width: 100%;
  height: $header-height;
  line-height: $header-height;
  padding: 0 $nav-padding;
  position: relative;
}

.menu .header-btn-span.active {
  background: $header-pagelist-active;
}

.menu .header-btn-span.active:after {
  content: " ";
  position: absolute;
  bottom: 0;
  left: 50%;
  @include triangle(7px, transparent, transparent, #fff, transparent);
  @include translateX(-50%);
}

.menu .global {
  font-size: $header-size;
  float: right;
  width: initial;
  li {
    margin: 0 ($nav-padding - .2rem);
    text-align: center;
    font-size: 1.42rem;
    width: $header-height;
    height: $header-height;
    line-height: $header-height;
    background: $info-color;
    position: relative;
    &:last-child {
      margin-right: 0;
    }
    &:hover{
      background:$link-color;
      cursor: pointer;
    }
    a{
      color:#fff;
      @include urlAbsolute();
    }
  }
}

.menu .header-nav {
  color: $write-color;
  margin-left: $nav-left;
}

.menu .header-nav ul li {
  float: left;
  font-size: $header-size;
  height: $header-height;
  @include direction(center, center);
}

.menu .sub-menu {
  color: $text-color;
  position: absolute;
  left: 0;
  right: 0;
  top: $header-height;
  height: ($header-height - .1rem);
  background: $write-color;
  @include shadow(1px, 1px, 4px, rgba(106, 106, 106, .2));
  display: none;
  z-index: 2;
}

.menu .sub-menu ul li {
  padding: 0 ($nav-padding - .6rem);
}

.menu .sub-menu.active {
  display: block;
}

.menu .sub-menu ul {
  margin-left: $nav-left;
}

.menu .sub-menu i.iconfont {
  margin-right: $icon-margin;
  font-size: 1.8rem;
}

.menu .sub-menu i.icon-title {
  font-size: 1.4rem
}

.menu .sub-menu i.icon-rick-text {
  font-size: 1.1rem
}

.menu .sub-menu i.icon-text-nav {
  font-size: 1.3rem
}

.menu .sub-menu i.icon-slide {
  font-size: 2.1rem
}

.menu .iconfont.icon-magic-cube {
  font-size: 1.3rem;
}
</style>