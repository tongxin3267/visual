<template>
    <div class='search' :style="{position:oPosition.position,width:preview ? '318px' : ''}">
        <header :style="{'background-color':oPosition.backgroundColor}">
            <a v-href="{sUrl:sLocationUrl,preview:preview}" class="position" v-if="bPosition" :style="{'color':sFontColor}">
                <i class="iconfont icon-position"></i>
                <span>{{ lbsCityName }}</span>
                <i class="iconfont icon-down-arrow"></i>
            </a>
            <section class="input" :style="{'color':sFontColor}">
                <a v-href="{sUrl:sSearchUrl,preview:preview}"></a>
                <i class="iconfont icon-search"></i>{{searchValue}}
            </section>
            <a v-href="{sUrl:sMessageUrl,preview:preview}" class="message" v-if="bMessage" :style="{'color':sFontColor}">
                <span></span>
                <i class="iconfont icon-message"></i>
            </a>
        </header>
        <div class="mask"></div>
    </div>
</template>

<script>
//node library
import url from 'url'
import qs from 'qs'

//mixins
import frontendGet from "mixins/frontend-get"

export default {
    name: "search",
    props: ["data", "preview"],
    mixins: [frontendGet],
    components: {},
    data() {
        return {
            nSearchOpacity: 0,
            lbsCityName: "定位中...",
            sFontColor: "#ffffff"
        }
    },
    created() {
    },
    mounted() {
        let sLbsCityName = qs.parse(document.cookie.replace(/; /ig, '&')).lbs_city_name
        if (sLbsCityName) {
            this.lbsCityName = unescape(sLbsCityName)
        }
        if (!this.bStore && !sLbsCityName) {
            /**
            * Gps 
            **/
            let geolocation = new qq.maps.Geolocation(this.sTenKey, "h5")
            let options = { timeout: 8000 }
            geolocation.getLocation(this.showPosition, this.showErr, options)
        }
        this.searchScrollTop()
    },
    methods: {
        showPosition(position) {
            if (position.city) {
                this.lbsCityName = this.formatCity(position.city)
            }
        },
        showErr(err) {
            return false
        },
        /*
        * 格式化城市 将城市 “市” 去掉
        */
        formatCity(city) {
            let lastIndex = city.length - 1
            return city.charAt(lastIndex) == "市" ? city.slice(0, lastIndex) : city
        },
        /**
         * 计算头部搜索与滚动条位置动态显示背景颜色
        */
        searchScrollTop() {
            this.$nextTick(() => {
                let oDomScroll = null,
                    nSearchOpacity = 0,
                    vm = this
                this.preview ? oDomScroll = document.body.querySelector(".phone-edit-con") : oDomScroll = document.body
                oDomScroll.onscroll = function () {
                    let nScrollT = oDomScroll.scrollTop
                    nSearchOpacity = nScrollT / 10 / 16
                    if (nSearchOpacity >= 1) {
                        nSearchOpacity = 1
                    }
                    vm.nSearchOpacity = nSearchOpacity
                    if (nScrollT > 120) {
                        vm.sFontColor = vm.getText({
                            dataNext: "allValue",
                            attrName: "fontColor",
                            defaultValue: "#333333"
                        })
                    } else {
                        vm.sFontColor = "#ffffff"
                    }
                }
            })
        }
    },
    computed: {
        bStore() {
            return window.shopInfo.ruid != 0
        },
        searchValue() {
            return this.getText({
                dataNext: "allValue",
                attrName: "searchValue",
                defaultValue: "搜索商品或图片"
            })
        },
        sTenKey() {
            return this.getText({
                dataNext: "allValue",
                attrName: "tenKey",
                defaultValue: "F75BZ-54UKV-6AGPT-UYF6Z-BLUBV-22BAE"
            })
        },
        bMessageUnread() {

        },
        bPosition() {
            return this.data.isPositionSel == "0" && window.shopInfo.ruid == 0 ? true : false
        },
        bMessage() {
            return this.data.isMessageSel == "0" && window.shopInfo.ruid == 0 ? true : false
        },
        bSuspend() {
            return this.data.isSuspendSel == "0" ? true : false
        },
        sBgColor() {
            return this.getText({
                dataNext: "allValue",
                attrName: "bgColor",
                defaultValue: "#ff495e"
            })
        },
        sLocationUrl() {
            return this.url("location")
        },
        sSearchUrl() {
            if (window.shopInfo.ruid != 0) {
                return `${window.ROOT_URL}index.php?m=store&a=pro_list&ru_id=${window.shopInfo.ruid}`
            }
            return this.url("search")
        },
        sMessageUrl() {
            return this.url("user&a=messagelist")
        },
        oPosition() {
            let o = {}
            if (this.bSuspend) {
                o.position = "fixed"
                let aRgbVal = this.sBgColor.colorRgb(0, true)
                o.backgroundColor = `rgba(${aRgbVal[0]},${aRgbVal[1]},${aRgbVal[2]},${this.nSearchOpacity})`
            } else {
                o.position = "relative"
                o.backgroundColor = this.sBgColor
            }
            return o
        }
    }
}

</script>

<style lang="scss" scoped>
@import "../../assets/style/config";
@import "../../assets/style/mixins/common";
.search {
    width: 100%;
    height: auto;
    overflow: hidden;
    z-index: 11;
    position: fixed;
}


.search header {
    left: 0;
    right: 0;
    padding: 1rem .8rem;
    @include disFlex();
}

.search a {
    color: #fff;
    text-align: left;
    font-size: 1.2rem;
    @include disFlex();
    @include direction(center, center);
}

.search a span {
    margin-left: .1rem;
}

.search a.message {
    position: relative;
    text-align: right;
}

.message span {
    background: #ff0000;
    display: block;
    width: .8rem;
    height: .8rem;
    position: absolute;
    top: .3rem;
    right: -.2rem;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, .8);
}

.search .iconfont {
    font-size: 1.7rem;
}

.search .icon-down-arrow {
    font-size: .9rem;
    margin-left: .18rem;
    font-weight: bold;
}

.search .input {
    font-size: 1.3rem;
    height: 2.86rem;
    line-height: 2.86rem;
    padding: 0 1rem;
    margin: 0 .6rem;
    border-radius: 1.43rem;
    color: #fff;
    position: relative;
    background: rgba(255, 255, 255, .4);
    @include flex1-1();
    @include disFlex();
    @include direction(center, flex-start);
}

.search .input .icon-search {
    font-size: 1.4rem;
    margin-right: .4rem;
}

.search .input a {
    @include urlAbsolute()
}

.search .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    background: linear-gradient(to bottom, rgba(0, 0, 0, .8) 0%, rgba(0, 0, 0, 0) 100%);
}
</style>