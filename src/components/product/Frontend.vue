<template>
    <section>
        <ul class="product-list" :class="aClass" v-if="data.isStyleSel == '0'">
            <li v-for="(item, index) in oProlist" :key="index">
                <a v-href="{sUrl:item.url,preview}"></a>
                <div class="product-cart" v-if="false">
                    <i class="iconfont icon-cart"></i>
                </div>
                <figure>
                    <div v-box-product-w="{bSizeSel:data.isSizeSel,preview}" class="img-box">
                        <img src="../../assets/images/default-img.jpg" v-if="preview" />
                        <img v-lazy="(item.img || item.goods_img)" v-else/>
                    </div>
                    <figcaption>
                        <h4 v-if="bTitle">{{item.title || item.goods_name}}</h4>
                        <p class="remark" v-if="bSale || bStock">
                            <em v-show="bStock">库存：{{ item.stock || item.goods_number }}</em>
                            <em v-show="bSale">销量：{{ item.sale || item.sales_volume }}</em>
                        </p>
                        <p class="price">
                            <em>{{item.price || (item.shop_price)}}</em>
                        </p>
                    </figcaption>
                </figure>
            </li>
        </ul>
        <scroll-prolist :prolist="oProlist" :scrollNumber="data.allValue.scrollNumber" :bTitle="bTitle" :preview="preview" v-else></scroll-prolist>
    </section>
</template>
<script>
// mapActions mapState
import {
    mapActions,
    mapState
} from 'vuex'
// node library
import qs from 'qs'
// custom components
import ScrollProlist from '../element/ScrollProlist'

// third party components
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper'

//getGoodsSel
import dialogGoods from 'config/api/dialogGoods'

export default {
    name: 'product',
    props: ['data', 'preview'],
    // mixins: [getGoodsSel],
    components: {
        swiper,
        swiperSlide,
        ScrollProlist
    },
    render (createElement, context) {
        return createElement(
            
        )
    },
    data() {
        return {
            previewProlist: [{
                title: "第一张图片",
                sale: "0",
                stock: "0",
                price: "¥238.00",
                marketPrice: "¥413.00"
            }, {
                title: "第二张图片",
                sale: "0",
                stock: "0",
                price: "¥38.00",
                marketPrice: "¥43.00"
            }],
            prolist: [],
        }
    },
    created() {

    },
    mounted () {
        setTimeout(() => {
            if (this.selectGoodsId.length > 0) {
                dialogGoods.getGoodsSel({
                    number:this.selectGoodsId.length,
                    selectGoodsId:this.selectGoodsId
                }).then(({data:{ product }}) => {
                    this.prolist = product
                })
            }else{
                this.$http.post(this.url(`console&c=${window.apiAuthority}&a=product`), qs.stringify({
                    number: this.nNumber < 1 ? 1 : this.nNumber,
                    type: this.moduleSel,
                    ruid: window.shopInfo.ruid,
                    cat_id:this.catId,
                    brand_id:this.brandSelect,
                })).then(({ data: { product } }) => {
                    product && product.length > 0 ? this.prolist = product : this.prolist = []
                })
            }
        }, 100);  
    },
    methods: {
    },
    computed: {
        localHttp() {
            return !this.release ? `${window.ROOT_PIC}` : window.PC_URL
        },
        selectGoodsId(){
            return this.data.allValue.selectGoodsId || []
        },
        brandSelect(){
            return this.data.allValue.brandSelect
        },
        catId(){
            let arr = [],
                len = 0
            this.data.allValue.categorySOption ? arr = this.data.allValue.categorySOption.split(',') : arr = []
            len = arr.length
            return arr[len-1]
        },
        oProlist() {
            if (this.preview && this.data.isStyleSel == "0") {
                return this.previewProlist
            } else {
                return this.prolist
            }
        },
        bPreview() {
            return this.preview
        },
        bStock() {
            return this.data.tagSelList.indexOf("0") != -1 ? true : false
        },
        bSale() {
            return this.data.tagSelList.indexOf("1") != -1 ? true : false
        },
        bTitle() {
            return this.data.tagSelList.indexOf("2") != -1 ? true : false
        },
        nNumber() {
            return this.data.allValue.number
        },
        moduleSel() {
            let sModulesSel = this.data.isModuleSel
            let sReturn = ""
            switch (sModulesSel) {
                case "0":
                    sReturn = "best"
                    break;
                case "1":
                    sReturn = "new"
                    break;
                case "2":
                    sReturn = "hot"
                    break;
                case "3":
                    sReturn = ""
                    break;
                default:
                    sReturn = ""
                    break;
            }
            return sReturn
        },
        aClass() {
            let sSizeSel = this.data.isSizeSel,
                arr = []
            if (this.preview) arr.push("preview")
            switch (sSizeSel) {
                case "0":
                    arr.push("big")
                    break;
                case "2":
                    arr.push("small")
                    break;
                default:
                    break;
            }
            return arr;
        }
    }
}

</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.product-list {
    overflow: hidden;
}

.product-list.small.preview h4,
.product-list.big h4 {
    height: inherit
}

.product-list li {
    width: 50%;
    padding-top: 1px;
    padding-right: 1px;
    float: left;
    position: relative;
}


.product-list li a {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
}

.product-list li .product-cart {
    position: absolute;
    right: .7rem;
    bottom: .7rem;
    width: 2.2rem;
    height: 2.2rem;
    line-height: 2.2rem;
    background: #ec5151;
    text-align: center;
    border-radius: 100%;
    color: #fff;
    z-index: 3;
}

.product-list li .product-cart i {
    font-size: 1.5rem;
}

.product-list figure {
    background: #fff;
    padding: .8rem;
    box-sizing: border-box;
}

.product-list figure img {
    width: 100%;
    height: auto;
}

.product-list figure h4 {
    font-size: 1.4rem;
    height: 3.9rem;
    font-weight: normal;
    @include ellipses();
}

.product-list figcaption {
    margin-top: .8rem;
}

.product-list figure p {
    margin-top: .4rem;
}

.product-list figure .price em {
    color: #ec5151;
    font-size: 1.7rem;
    display: block;
}

.product-list figure .remark em {
    font-size: 1.3rem;
    color: #888;
}

.product-list.big li,
.product-list.small li {
    width: 100%;
    overflow: hidden;
}

.product-list.small li figure {
    width: 100%;
    @include box-pack(center, start);
    @include direction(center, flex-start);
}

.product-list.small li figure figcaption {
    width: 60%;
}

.product-list.small li h4 {
    width: 100%;
    height: inherit;
    white-space: nowrap;
}

.product-list.small li img {
    width: 9.2rem;
    padding: .2rem;
    border: 1px solid #eee;
    margin-right: .8rem;
    height: auto;
}

.product-list.small li figcaption {
    margin-top: 0;
    @include flex1-1();
}
</style>