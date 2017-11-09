<template>
  <div class="category">
    <header>
      <div class="input">
        <a href="index.php?m=search"></a>
        <i class="iconfont icon-search"></i>
        商品/店铺搜索
      </div>
    </header>
    <aside>
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide>
          <ul>
            <li 
              v-for="(item, index) in categoryList" 
              :key="'categoryList' + index" 
              :class="{
                active:index === categoryActiveIndex
              }" 
              @click="getCategory(index, item.pid)"
            >
              <a href="javascript:;"> {{ item.title }} </a>
            </li>
          </ul>
        </swiper-slide>
      </swiper>
    </aside>
    <section>
      <h5>
        <a href="">大家电</a>
      </h5>
      <ul>
        <li>
          <div v-box-product-w="{
                          bSizeSel:true,preview:false
                        }">
            <img v-lazy="''" alt="">
          </div>
          <span>平板电脑</span>
        </li>
        <li>
          <div v-box-product-w="{
                          bSizeSel:true,preview:false
                        }">
            <img v-lazy="''" alt="">
          </div>
          <span>平板电脑</span>
        </li>
        <li>
          <div v-box-product-w="{bSizeSel:true,preview:false}">
            <img v-lazy="''" alt="">
          </div>
          <span>平板电脑</span>
        </li>
        <li>
          <div v-box-product-w="{bSizeSel:true,preview:false}">
            <img v-lazy="''" alt="">
          </div>
          <span>平板电脑</span>
        </li>
        <li>
          <div v-box-product-w="{bSizeSel:true,preview:false}">
            <img v-lazy="''" alt="">
          </div>
          <span>平板电脑</span>
        </li>
  
        <li>
          <div v-box-product-w="{bSizeSel:true,preview:false}">
            <img v-lazy="''" alt="">
          </div>
          <span>平板电脑</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>

// third party components
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'

export default {
  name: 'category',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true
      },
      categoryActiveIndex: 0,
      categoryList: [{
        title: '新鲜水果',
        pid: '0'
      }, {
        title: '放心肉品',
        pid: '1'
      }, {
        title: '水产海鲜',
        pid: '2'
      }, {
        title: '蛋品',
        pid: '3'
      }, {
        title: '面点速食',
        pid: '4'
      }, {
        title: '粮油调味',
        pid: '5'
      }, {
        title: '火锅专区',
        pid: '6'
      }, {
        title: '粮油调味',
        pid: '7'
      }, {
        title: '放心肉品',
        pid: '8'
      }, {
        title: '新鲜蔬菜',
        pid: '9'
      }, {
        title: '新鲜水果',
        pid: '10'
      }, {
        title: '水产海鲜',
        pid: '11'
      }, {
        title: '放心肉品',
        pid: '12'
      }]
    }
  },
  created() {

  },
  methods: {
    getCategory(index, pid) {
      if (this.categoryActiveIndex != index) {
        this.categoryActiveIndex = index;
      }
    }
  }
}
</script>
<style lang="scss" scope>
@import '../assets/style/config';
@import '../assets/style/mixins/common';
body {
  background: #fff;
}

.category {
  header {
    padding: .6rem 1rem;
    background: #fff;
    border-bottom: 1px solid #e7ecec;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  .input {
    width: 100%;
    height: 3.2rem;
    line-height: 3.2rem;
    background: #eee;
    color: #777;
    font-size: 1.5rem;
    border-radius: 4px;
    position: relative;
    padding-left: 3.2rem;
    padding-right: 3.2rem;
    i {
      position: absolute;
      left: 1.1rem;
    }
    a {
      @include urlAbsolute();
    }
  }
  aside {
    position: fixed;
    top: 4.4rem;
    bottom: 5.4rem;
    .swiper {
      min-height: 100%;
      max-height: 100%;
      background: #f3f3f3;
      ul li {
        font-size: 1.4rem;
        width: 8.6rem;
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        padding: 1.3rem .8rem;
        box-sizing: border-box;
        &:last-child {
          border-bottom: none;
        }
        & a{
          color:#333;
        }
        &.active {
          background: #fff;
          border-right: 0;
          border-left: 2px solid $color;
          & a{
            color: $color;
          }
        }
      }
    }
  }
  section {
    background: #fff;
    margin-left: 8.6rem;
    margin-top: 4.4rem;
    box-sizing: border-box;
    padding: .6rem;
    h5 {
      font-weight: normal;
      font-size: 1.4rem;
      height: 2.4rem;
      line-height: 2.4rem;
      position: relative;
      a {
        color: #222;
        @include urlAbsolute();
      }
    }
    ul {
      width: 100%;
      overflow: hidden;
      li {
        width: 33.33%;
        float: left;
        box-sizing: border-box;
        padding: .2rem;
        img {
          max-width: 100%;
          max-height: 100%;
        }
        span {
          font-size: 1.3rem;
          color: #777;
          display: block;
          width: 100%;
          height: 2.4rem;
          line-height: 2.4rem;
          text-align: center;
        }
      }
    }
  }
}
</style>

