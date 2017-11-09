<template>
    <section class="slide">
        <swiper class="swiper" :options="swiperOption" ref="slideSwiper" v-if="!bSeparateShow">
            <!-- 幻灯内容 -->
            <swiper-slide v-for="(item,index) in data.list" :key="index" v-show="bList">
                <a v-href="{sUrl:item.url,preview:preview}"></a>
                <span class="desc" v-show="'' != item.desc">{{ item.desc }}</span>
                <img :data-src="localHttp+item.img" class="swiper-lazy" v-if="item.img" />
                <img src="../../assets/images/default-img.jpg" class="swiper-lazy no-img" v-else/>
                <div class="swiper-lazy-preloader" v-show="index!=0"></div>
            </swiper-slide>
            <swiper-slide class="swiper-slide no-swiper-slide" v-show="!bList">
                <img src="../../assets/images/default-img.jpg" />
            </swiper-slide>
            <!-- 以下控件元素均为可选（使用具名slot来确定并应用一些操作控件元素） -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div v-else class="separat-show">
            <separate-img-list :list="data.list" :isMiniList="bMiniList" :preview="preview" :isList="bList"></separate-img-list>
        </div>
    </section>
</template>

<script>
// custom components
import SeparateImgList from '../element/SeparateImgList'

// third party components
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper'

export default {
    name: 'slide',
    props: ['data', 'preview', 'modulesIndex'],
    components: {
        swiper,
        swiperSlide,
        SeparateImgList
    },
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                pagination: '.swiper-pagination',
                lazyLoading: true,
                autoplay: 5600
            },
        }
    },
    mounted() {
        
    },
    computed: {
        /**
         * 开发模式生效
         * 
         */
        localHttp(){
            return !this.release ? 'http://10.10.10.14/dsc_mall/' : ''
        },
        bSeparateShow() {
            return '1' == this.data.isStyleSel ? true : false
        },
        bMiniList() {
            return '1' == this.data.isSizeSel ? true : false
        },
        bList() {
            return 0 != this.data.list.length ? true : false
        },
        swiper() {
          
        }
    }
}

</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/common';
.slide .swiper {
    width: 100%;
}

.slide .swiper-slide img {
    width: 100%;
    display: block;
}

.swiper-lazy-preloader {
    margin-top: 1rem;
    width: 1.6rem;
}

.slide .swiper-slide a {
    @include urlAbsolute();
}

.slide .desc {
    position: absolute;
    padding: .4rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    color: #fff;
}

.swiper-slide {
    background: #f4f5fa;
    @include box-pack(center, center);
    @include direction(center, center)
}

.slide .swiper-slide.no-swiper-slide img,
.slide .swiper-slide img.no-img {
    width: 50%;
    height: auto;
}
</style>