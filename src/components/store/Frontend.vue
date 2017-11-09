<template>
    <div class="store">
        <swiper class="store-swiper" :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide class="store-swiper-slide" v-for="(item ,index) in storeList" :key="index">
                <a v-href="{sUrl:getShopUrl(item.user_id),preview}"></a>
                <div class="box">
                    <h4>
                        <img v-lazy="item.logo_thumb" alt="">
                    </h4>
                    <div v-box-product-w="{bSizeSel:'0',preview,type:'store'}" class="img-box"  v-lazy:background-image="item.street_thumb" :style="'background: center 0%; background-repeat:no-repeat; background-size: 116%;'">
                    </div>
                    <ul>
                        <li v-for="(itemGoods, index) in item.goods" :key="'itemGoods'+index">
                            <img v-lazy="itemGoods.goods_thumb" alt="">
                        </li>
                    </ul>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
//node library
import qs from 'qs'

import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper'
export default {
    name: "store",
    props: ['data', 'preview'],
    components: {
        swiper,
        swiperSlide,
    },
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                slidesPerView: 2.3
            },
            storeList: []
        }
    },
    created() {
        this.$http.post(this.url(`console&c=${window.apiAuthority}&a=store`), qs.stringify({
            number: this.nNumber < 1 ? 1 : this.nNumber,
            childrenNumber: 3
        })).then(({ data: { store } }) => {
            if (store || store.length > 0) {
                this.storeList = store
            }else{
                this.storeList = []
            }
        })
    },
    methods: {
        getShopUrl(id) {
            return `${window.ROOT_URL}index.php?m=store&a=shop_info&id=${id}`
        },
    },
    computed: {
        localHttp() {
            return !this.release ? `${window.ROOT_PIC}${window.PC_URL}` : window.PC_URL
        },
        nNumber() {
            return this.data.allValue.number
        }
    }

}

</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.store-swiper {
    background: #fff;
    padding: $padding-all .3rem;
}

.store-swiper-slide {
    a {
        @include urlAbsolute();
        z-index: 111;
    }
}

.store-swiper-slide .box {
    width: 100%;
    padding: 0 .3rem;
    position: relative;
    .img-box {
        background-size: 50% 50%;
    }
}

.store-swiper-slide .box h4 {
    display: block;
    position: absolute;
    padding: .1rem;
    background: #fff;
    width: 50%;
    height: 3rem;
    line-height: 3rem;
    left: .9rem;
    bottom: .6rem;
    text-align: center;
}

.store-swiper-slide .box h4 img {
    max-width: 100%;
    max-height: 100%;
    display: inline-block;
}

.store-swiper-slide .box img {
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
}

.store-swiper-slide .box ul li {
    background: #fff;
    padding: .3rem .15rem;
    width: 33.333%;
    float: left;
}
</style>