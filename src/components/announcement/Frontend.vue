<template>
    <div class='announcement' :class="{'date-height':!bDateSel && bNews,'announ':!bNews}">
        <img class="icon" :src="data.allValue.img" v-if="data.allValue.img" />
        <img class="icon" src="../../assets/images/default-img.jpg" alt="" v-else>
        <template v-if="bNews">
            <swiper class="swiper" :options="swiperOption" ref="announSwiper">
                <!-- 幻灯内容 -->
                <swiper-slide class="swiper-slide swiper-no-swiping" :class="{'date-height':bDateSel}" v-for="(item,index) in announcementList" :key="item.article_id">
                    <section>
                        <a v-href="{sUrl:item.url,preview:preview}"></a>
                        <p>{{item.title}}</p>
                        <p class="last" v-if="bDateSel">{{item.date}}</p>
                    </section>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <a v-href="{sUrl:'index.php?m=article',preview:preview}" class="more-link">更多
                <i class="iconfont icon-right-arrow"></i>
            </a>
        </template>
        <template v-else>
            <section class="">
                <div class="seamless-scroll" v-seamless-scroll="{winObj:winScrollObj,preview:preview}">
                    <p class="seamless-scroll-wrapper">{{ data.allValue.announContent }}</p>
                </div>
            </section>
        </template>
    </div>
</template>

<script>
//node library
import qs from 'qs'

// third party components
import Vue from 'vue'
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper'

export default {
    name: 'announcement',
    props: ['data', 'preview', 'modulesIndex'],
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                autoplay: 4000,
                loop: true,
                direction: 'vertical',
                noSwiping: true
            },
            scroll: true,
            winScrollObj: 'announ' + this.modulesIndex,
            announcementList: []
        }
    },
    created() {
        if (this.bNews) {
            this.$http.post(this.url(`console&c=${window.apiAuthority}&a=article`), qs.stringify({ cid: 20 })).then(res => {
                this.announcementList = res.data.article_msg
            }).catch(err => {
                console.error(err);
            })
        }
    },
    mounted() {
    },
    computed: {
        localHttp() {
            return !this.release ? `${window.ROOT_PIC}${window.PC_URL}` : window.PC_URL
        },
        swiper() {
            return this.$refs.announSwiper.swiper
        },
        bNews() {
            if (this.data.isStyleSel == "0" && window.shopInfo.ruid == 0) {
                this.scroll = false
                return true
            } else {
                this.scroll = true
                return false
            }
        },
        bDateSel() {
            return this.data.isDateSel == "0" ? true : false
        }
    },
    watch: {
        scroll(val, oldVal) {
            if (!val) {
                clearInterval(window[this.winScrollObj])
            }
        }
    }
}

</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.announcement {
    background: #fff;
    vertical-align: middle;
    box-sizing: border-box;
    overflow: hidden;
    padding: .7rem $padding-all;
    height: 5rem;
    @include box-pack(center, start);
    @include direction(center, initial)
}

.announcement .icon {
    height: 86%;
    margin-right: .8rem;
    display: block;
}

.swiper {
    font-size: 1.3rem;
    height: 100%;
    @include flex1-1();
}

.swiper-slide {
    overflow: hidden;
    position: relative;
    @include box-pack(center, start);
    @include direction(center, flex-start)
}

.swiper-slide section {
    width: 100%;
}

.swiper-slide p {
    white-space: nowrap;
    font-size: 1.4rem;
    font-weight: 400;
    @include ellipses();
}

.swiper-slide p.last {
    font-size: 1.2rem;
    font-weight: normal;
    color: $subsidiary-color;
}

.swiper .swiper-slide a {
    @include urlAbsolute();
}

.announcement.date-height,
.announcement.announ {
    font-size: 1.2rem;
    height: 4rem;
}

.announcement.date-height section,
.announcement.announ section {
    position: relative;
    @include flex1-1();
    overflow: hidden;
    height: 2.2rem;
    line-height: 2.2rem;
}
</style>