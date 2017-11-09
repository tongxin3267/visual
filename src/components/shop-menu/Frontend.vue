<template>
    <footer class="shop-menu" :class="{'preview':preview}">
        <ul :class="{preview:preview}">
            <li>
                <a v-href="{sUrl:sShopAboutUrl,preview:preview}"></a>
                店铺详情
            </li>
            <li :class="bCategorySubmenu" @click.stop="showCategory">
                <i class="iconfont icon-shop-mune"></i>
                热门分类
                <ul class="sub-menu">
                    <li v-for="(item,index) in aCategory" :key="index">
                        <a v-href="{sUrl:getCatUrl(item.cat_id),preview:preview}"></a>
                        {{item.cat_name}}
                    </li>
                </ul>
            </li>
            <li class="kf">
                <a :href="sKf">
                    <i class="iconfont icon-service"></i>客服
                </a>
            </li>
        </ul>
    </footer>
</template>

<script>
//node library
import qs from 'qs'

// custom components

// third party components


//mixins

export default {
    name: 'shop-menu',
    props: ['data', 'preview'],
    mixins: [],
    components: {

    },
    data() {
        return {
            bCategorySubmenu: {
                active: false,
            },
            bKfSubmenu: {
                active: false,
            },
            aCategory: [],
            sKf:''
        }
    },
    created() {
        this.$http.post(getUrl(`console&c=${window.apiAuthority}&a=storeDown`), qs.stringify({
            ruid: window.shopInfo.ruid
        })).then(({ data: { store } }) => {
            const {
                shop_category: shopCategory,
                shop_about: shopAbout,
                kf,
            } = store[0]
            this.sKf = kf
            this.aCategory = shopCategory.slice(0,9)
        })
    },
    mounted() {
    },
    methods: {
        getCatUrl(str) {
            return this.url(`store&a=pro_list&ru_id=${window.shopInfo.ruid}&cat_id=${str}`)
        },
        showCategory() {
            if (this.bCategorySubmenu.active) {
                this.bCategorySubmenu.active = false
            } else {
                this.bKfSubmenu.active = false
                this.bCategorySubmenu.active = true
            }
        },
    },
    computed: {
        sShopAboutUrl() {
            return this.url(`store&a=shop_about&ru_id=${window.shopInfo.ruid}`)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.shop-menu {
    height: 4.4rem;
    ul {
        width: 100%;
        background: #fff;
        border-top: 1px solid $border-color-split;
        li {
            padding: 1rem 0;
            text-align: center;
            border-right: 1px solid $border-color-split;
            font-size: 1.46rem;
            position: relative;
            background: #fff;
            @include flex1-1();
            a {
                @include urlAbsolute();
            }
            i.iconfont {
                margin-right: .2rem;
            }
            i.icon-shop-mune {
                font-size: 1.36rem;
            }
            i.icon-service {
                font-size: 1.44rem;
            }
        }
        li.active {
            .sub-menu {
                transform: translateY(0);
                visibility: visible;
                opacity: 1;
                @include transition(all, .2s);
            }
        }
    }
}

.shop-menu.preview,
.shop-menu ul.preview {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.shop-menu>ul {
    z-index: 10;
    bottom: 0;
    position: fixed;
    @include disBox();
    @include disFlex();
    .kf a{
        padding:1rem 0;
        font-size:1.46rem;
        color:$text-color;
    }
}

.sub-menu {
    position: absolute;
    bottom: 100%;
    transform: translateY(100%);
    visibility: hidden;
    opacity: 0;
    @include transition(all, .2s);
    width: 100%;
    z-index: -1;
    display: block;
    float: inherit;
    padding: 0;
    border-left: 1px solid $border-color-split;
    li {
        font-size: 1.36rem;
        padding: 1rem 0;
        border: none;
        position: relative;
        border-bottom: 1px solid $border-color-split;
        a {
            color: $text-color;
        }
     
    }
    
}
</style>