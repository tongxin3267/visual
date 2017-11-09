<template>
    <div class='count-down'>
        <header v-if="styleSel == 0">
            <h4>
                <img v-lazy="data.allValue.titleImg" alt="" v-if="data.allValue.titleImg">
                <img src="../../assets/images/default-img.jpg" alt="" v-else>
            </h4>
            <!-- <section class="date">
                    <span>{{ oDateTime.d }}</span>:
                    <span>{{ oDateTime.h }}</span>:
                    <span>{{ oDateTime.m }}</span>:
                    <span>{{ oDateTime.s }}</span>
                </section> -->
            <section class="day-date">
                <span>{{ oDateTime.d }}</span> 天
                <span>{{ oDateTime.h }}</span> 时
                <span>{{ oDateTime.m }}</span> 分
                <span>{{ oDateTime.s }}</span> 秒
            </section>
            <a class="more-link" v-href="{sUrl:sSeckillUrl,preview}">更多
                <i class="iconfont icon-right-arrow"></i>
            </a>
        </header>
        <section class="count-down-big" v-else>
            <div class="big">
                <a v-href="{sUrl:sSeckillUrl,preview}">
                    <header>
                        <h4>
                            <img v-lazy="data.allValue.titleImg" alt="" v-if="data.allValue.titleImg">
                            <img src="../../assets/images/default-img.jpg" alt="" v-else>
                        </h4>
                        <section class="day-date">
                            <span>{{ oDateTime.d }}</span> 天
                            <span>{{ oDateTime.h }}</span> 时
                            <span>{{ oDateTime.m }}</span> 分
                            <span>{{ oDateTime.s }}</span> 秒
                        </section>
                        <p class="big-desc">{{ spikeDesc }}</p>
                    </header>
                    <img v-lazy="data.allValue.productImg" alt="" v-if="data.allValue.titleImg">
                    <img src="../../assets/images/default-img.jpg" alt="" v-else>
                </a>
            </div>
            <div class="four-product">
                <ul>
                    <li v-for="item in spikeBigProlist" :key="item.id">
                        <a v-href="{sUrl:item.url,preview}"></a>
                        <img v-lazy="item.img" alt="">
                        <span class="price">
                            {{ item.price }}
                        </span>
                        <del>
                            {{ item.marketPrice }}
                        </del>
                    </li>
                </ul>
            </div>
        </section>
        <section class="count-down-all" v-if="bSpikeSwiperProlist">
            <scroll-prolist :prolist="spikeSwiperProlist" scrollNumber="3.5" :preview="preview"></scroll-prolist>
        </section>
    </div>
</template>

<script>
import qs from 'qs'

// custom components
import ScrollProlist from '../element/ScrollProlist'

// third party components
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper'

//mixins
import frontendGet from 'mixins/frontend-get'
import countDown from 'mixins/count-down'

export default {
    name: 'count-down',
    props: ['data', 'preview'],
    mixins: [frontendGet],
    components: {
        swiper,
        swiperSlide,
        ScrollProlist
    },
    data() {
        return {
            spikeProlist: [],
            oDateTime: {
                d: "0",
                h: "00",
                m: "00",
                s: "00"
            },
            endTimeREP: "",
            countDownAuto: null
        }
    },
    created() {
        this.$http.post(this.url(`console&c=${window.apiAuthority}&a=product`), qs.stringify({
            number: this.nNumber,
            type: "promote",
            ruid: window.shopInfo.ruid
        })).then(({ data: { product } }) => {
            if (!product) {
                this.spikeProlist = []
            } else {
                this.spikeProlist = product
            }

        })

    },
    mounted() {
        this.endTimeREP = this.data.allValue.endTime.replace(/(-)/g, '/')
        this.getCountTimeObj()
        clearInterval(this.countDownAuto)
        this.countDownAuto = setInterval(this.getCountTimeObj, 1000)
    },
    methods: {
        getCountTimeObj() {
            let sEndTime = "",
                o
            sEndTime = this.data.allValue.endTime
            o = countDown.getTime(sEndTime, true, true)
            if (o && sEndTime != "") {
                this.oDateTime.d = o.d
                this.oDateTime.h = o.h
                this.oDateTime.m = o.m
                this.oDateTime.s = o.s
            } else {
                this.oDateTime = {
                    d: "0",
                    h: "00",
                    m: "00",
                    s: "00"
                }
            }
        }
    },
    computed: {
        sSeckillUrl() {
            return this.url("seckill")
        },
        localHttp() {
            return !this.release ? `${window.ROOT_PIC}${window.PC_URL}` : window.PC_URL
        },
        bSpikeSwiperProlist() {
            if (this.styleSel == "0") {
                return true
            } else {
                return this.styleSel == "1" && this.spikeProlist.length > 4 ? true : false
            }
        },
        spikeSwiperProlist() {
            let arr = [];
            this.spikeProlist.map((v, i) => {
                arr.push(v)
            })
            if (this.styleSel == "1") arr.splice(0, 4)
            return arr
        },
        spikeBigProlist() {
            let arr = []
            if (this.spikeProlist.length > 0) {
                for (let i = 0; i < 4; i++) {
                    arr.push(this.spikeProlist[i])
                }
                return arr
            }
        },
        spikeDesc() {
            return this.getText({
                dataNext: "allValue",
                attrName: "spikeDesc",
                defaultValue: "众多精美商品等你秒杀"
            })
        },
        nNumber() {
            return this.data.allValue.number
        },
        styleSel: {
            get() {
                return this.data.isStyleSel
            },
            set(value) {
                this.updateRadioSel('isStyleSel', value)
            }
        }
    },
    watch: {
        "data.allValue.endTime": {
            handler(val, oldVal) {
                clearInterval(this.countDownAuto)
                this.countDownAuto = setInterval(this.getCountTimeObj, 1000)
                this.getCountTimeObj()
            }
        }
    }
}

</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.count-down {
    background: #fff;
    overflow: hidden;
    position: relative;
}

.count-down-big {
    min-height: 12rem;
}

.count-down>header {
    font-size: 1.5rem;
    padding: 1rem $padding-all;
    color: $color;
    @include disBox();
    @include disFlex();
    @include direction(center, space-between);
}

.count-down header h4 {
    @include disBox();
    @include disFlex();
    @include direction(center, space-between);
    width: 7rem;
    height: auto;
}

.count-down header h4 img {
    width: 100%;
}

.count-down header section {
    color: #4f4f4f;
    @include direction(center, flex-start);
    margin-left: .6rem;
    @include flex1-1();
}

.count-down header .date span {
    font-size: 1.2rem;
    display: inline-block;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    min-width: 1.8rem;
    padding: 0 .4rem;
    background: #4f4f4f;
    color: #fff;
    margin: 0 .2rem;
    border-radius: 9999px;
}

.count-down header .date span:first-of-type {
    margin-left: 0;
}

.count-down header .icon-bolt {
    font-size: 1.2rem;
}

.count-down .big {
    width: 50%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 50%;
    padding: $padding-all*1.4;
    float: left;
    height: 100%;
    border-bottom: 1px solid $body-background;
    a {
        color: #333;
    }
}

.count-down-big {
    position: relative;
}

.count-down .big img {
    width: 100%;
    height: auto;
}

.count-down .big header {
    padding: 0;
}

.count-down .big header h4 {
    width: 8rem;
}

.count-down .big header .date {
    margin-left: 0;
    margin-top: .6rem;
}

.count-down .big-desc {
    font-size: 1.3rem;
    margin-top: .6rem;
}

.count-down .four-product {
    overflow: hidden;
    border-left: 1px solid $body-background;
    margin-left: 50%;
}

.count-down .four-product li {
    width: 50%;
    float: left;
    position: relative;
    border-bottom: 1px solid $body-background;
    border-right: 1px solid $body-background;
    padding: $padding-all*1.4/2;
    a {
        @include urlAbsolute();
    }
}

.count-down .four-product li img {
    width: 100%;
}

.count-down .four-product li .price,
.count-down .four-product li del,
.spike-swiper-slide .price,
.spike-swiper-slide del {
    text-align: center;
    display: block;
}

.count-down .four-product li .price {
    font-size: 1.3rem;
    color: $color;
}

.count-down .four-product li del {
    color: $subsidiary-color;
    font-size: 1.1rem;
}

.big .day-date{
    font-size:1.3rem;
    margin-top:.4rem;
    margin-left:-.3rem;
}

.day-date{
    font-weight: bold;
}

.day-date span{
    margin:0 .3rem;
}
</style>