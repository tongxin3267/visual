<template>
    <swiper class="scroll-prolist" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide class="spike-swiper-slide" v-for="(item,index) in prolist" :key="item.id">
            <a v-href="{sUrl:item.url,preview}"></a>
            <div v-box-product-w="{bSizeSel:true,preview}" class="img-box">
                <!-- {{ item.goods_img }} -->
                <template v-if="index > 3">
                     <img v-lazy="item.img || item.goods_img" class="swiper-lazy" alt="">
                     <div class="swiper-lazy-preloader"></div>
                </template>
                <template v-else>
                    <img v-lazy="item.img || item.goods_img" class="swiper-lazy" alt="">
                </template>
                
                
            </div>
            <h4 v-if="bTitle">{{ item.title || item.goods_name }}</h4>
            <span class="price">
                {{ item.price || (item.shop_price)}}
            </span>
            <del>
                {{ item.marketPrice || (item.market_price) }}
            </del>
        </swiper-slide>
    </swiper>
</template>

<script>
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper'


export default {
    name: "scroll-prolist",
    props: {
        prolist: {},
        scrollNumber: {
            default: 3.4
        },
        bTitle: {},
        preview: {}
    },
    components: {
        swiper,
        swiperSlide,
    },
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                slidesPerView: 3.4,
                lazyLoading: true,
            },
        }
    },
    created() {
    },
    computed: {
         /**
         * 开发模式生效
         * 
         */
        localHttp(){
            return !this.release ? 'http://10.10.10.14/' : ''
        },
    }
}

</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.scroll-prolist {
    background: #fff;
}

.spike-swiper-slide {
    min-height: 4rem;
}

.spike-swiper-slide .price,
.spike-swiper-slide del {
    text-align: center;
    display: block;
}


.scroll-prolist {
    padding: 0 .4rem;
}

.spike-swiper {
    margin-top: -1px;
    border-top: 1px solid $body-background;
}

.spike-swiper-slide {
    text-align: center;
    padding: 1rem .4rem;
    a {
        @include urlAbsolute();
    }
}

.spike-swiper-slide:last-child {
    padding-right: .4rem;
}

.spike-swiper-slide img {
    display: block;
    width: 100%;
}

.spike-swiper-slide h4 {
    font-size: 1.4rem;
    margin-top: .2rem;
    font-weight: 400;
    white-space: nowrap;
    @include ellipses();
}

.spike-swiper-slide .price {
    color: $color;
    font-size: 1.4rem;
}

.spike-swiper-slide del {
    color: $subsidiary-color;
    font-size: 1.1rem;
}
</style>