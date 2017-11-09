<template>
    <div class='shop-signs'>
        <header>
            <img :src="sStreetBg" alt="">
            <figure>
                <img :src="sLogoImg" alt="">
                <figcaption>
                    <h4>{{ sShopName }}</h4>
                    <p>已经有
                        <strong>{{likeNum}}</strong> 人关注</p>
                </figcaption>
            </figure>
            <a href="javascript:;" class="heart" :class="{'active':!bFollow}" @click.stop="isFollow()">
                <i class="iconfont icon-heart1"></i>
                {{sFollow}}
            </a>
            <div class="shop-signs-mask"></div>
        </header>
        <section class="info-nums">
            <ul>
                <li>
                    <a v-href="{sUrl:sAllProductUrl,preview:preview}"></a>
                    <h4>{{ nProductNum }}</h4>
                    <p>全部商品</p>
                </li>
                <li>
                    <a v-href="{sUrl:sNewProductUrl,preview:preview}"></a>
                    <h4>{{ nNewProductNum }}</h4>
                    <p>新品</p>
                </li>
                <li>
                    <a v-href="{sUrl:sPromotePoductUrl,preview:preview}"></a>
                    <h4>{{ nPromoteProductNum }}</h4>
                    <p>促销</p>
                </li>
            </ul>
        </section>
        <ec-confirm :option="confirmOption" :visible.sync="showConfirm"></ec-confirm>
    </div>
</template>

<script>
//node library
import qs from 'qs'

// custom components
import EcConfirm from 'components/element/Confirm'

// third party components
import {
    Loading,
} from 'element-ui';

//mixins

export default {
    name: 'shop-signs',
    props: ['data', 'preview'],
    mixins: [],
    components: {
        Loading,
        EcConfirm
    },
    data() {
        return {
            sShopName: "",
            nProductNum: 0,
            nNewProductNum: 0,
            nPromoteProductNum: 0,
            sLogoImg: "",
            sStreetBg: "",
            bFollow: false,
            sFollow: "点击关注",
            likeNum: "",
            confirmOption:{
                title:"提示",
                context:"登录后进行关注"
            },
            showConfirm:false
        }
    },
    beforeCreate() {
        let loadingInstance = Loading.service({ fullscreen: true, text: "数据正在传递……" });
        this.$http.post(getUrl(`console&c=${window.apiAuthority}&a=storeIn`), qs.stringify({
            ruid: window.shopInfo.ruid
        })).then(({ data: { store } }) => {
            let oStore = store[0]
            if (oStore.count_gaze) {
                this.bFollow = true
                this.sFollow = "已关注"
            } else {
                this.bFollow = false
                this.sFollow = "点击关注"
            }
            this.sShopName = oStore.rz_shopname
            this.nProductNum = oStore.total
            this.nNewProductNum = oStore.new
            this.nPromoteProductNum = oStore.promote
            this.likeNum = oStore.like_num
            this.sLogoImg = oStore.logo_thumb
            this.sStreetBg = oStore.street_thumb
            loadingInstance.close()
        })
    },
    mounted() {
    },
    methods: {
        isFollow() {
            if (!this.preview) {
                this.$http.post(this.url(`console&c=${window.apiAuthority}&a=addCollect`), qs.stringify({
                    ruid: window.shopInfo.ruid
                })).then(({ data }) => {
                    if (data.error == 0) {
                        this.showConfirm = true
                    } else if (data.error == 1) {
                        this.bFollow = true
                        this.sFollow = "已关注"
                        this.likeNum++
                    } else {
                        this.bFollow = false
                        this.sFollow = "点击关注"
                        this.likeNum--
                    }
                })
            }
        }
    },
    computed: {
        localHttp(){
            return !this.release ? `${window.ROOT_PIC}${window.PC_URL}` : window.PC_URL
        }, 
        sAllProductUrl() {
            return this.url(`store&a=pro_list&ru_id=${window.shopInfo.ruid}`)
        },
        sNewProductUrl() {
            return `${this.sAllProductUrl}&type=store_new`
        },
        sPromotePoductUrl() {
            return `${this.sAllProductUrl}&type=is_promote`
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.shop-signs header {
    height: 9.4rem;
    overflow: hidden;
    position: relative;
}

.shop-signs header>img {
    width: 100%;
    height: auto;
}

.shop-signs header figure {
    position: absolute;
    z-index: 10;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    margin-left: 1rem;
}

.shop-signs header figure h4 {
    margin-top: 1rem;
    font-size: 1.4rem;
}

.shop-signs header figure p {
    font-size: 1.1rem;
    margin-top: -.1rem;
}

.shop-signs header figure img {
    width: 5.6rem;
    height: auto;
    display: block;
    float: left;
}

.shop-signs header figcaption {
    color: #fff;
    float: left;
    margin-left: .6rem;
}

.shop-signs header .heart {
    z-index: 10;
    background: $color;
    border-color: $color;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    color: #fff;
    font-size: 1.2rem;
    height: 2.6rem;
    line-height: 2.6rem;
    padding: 0rem .8rem;
    border-radius: 1.2rem;
}

.shop-signs header .heart i {
    font-size: 1.3rem;
}

.shop-signs header .heart.active {
    border: 1px solid #fff;
    background: #fff;
    color: $color;
}

.shop-signs header .shop-signs-mask {
    background: rgba(0, 0, 0, .4);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1
}

.shop-signs .info-nums {
    background: #fff;
    overflow: hidden;
    padding: .6rem 0;
    ul {
        @include disBox();
        @include disFlex();
        li {
            text-align: center;
            border-right: 1px solid $border-color-split;
            position: relative;
            @include flex1-1();
            h4 {
                font-size: 1.8rem;
            }
            p {
                font-size: 1.2rem;
                margin-top: -.2rem;
                color: $title-color;
            }
            a {
                @include urlAbsolute();
            }
        }
        li:last-of-type {
            border-right: none;
        }
    }
}
</style>