<template>
    <nav class="nav" :class="aClass">
        <section class="list" v-for="(item, index) in data.list" :key="index" :style="liStyle">
            <a v-href="{sUrl:item.url,preview:preview}"></a>
            <img class="icon" v-lazy="item.img" v-if="bIcon && item.img" />
            <img class="icon" src="../../assets/images/default-img.jpg" v-if="bIcon && !item.img" />
            <div class="con" v-if="bDesc">
                <template v-if="item.desc">
                    {{ item.desc }}
                </template>
                <template v-else>
                    [描述]
                </template>
    
            </div>
            <i class="iconfont icon-right-arrow"></i>
        </section>
    </nav>
</template>

<script>
// custom components

// third party components

export default {
    name: 'nav',
    props: ['data', 'preview'],
    components: {
    },
    data() {
        return {
        }
    },
    created() {
    },
    computed: {
        localHttp() {
            return !this.release ? `${window.ROOT_PIC}${window.PC_URL}` : window.PC_URL
        },
        liStyle() {
            if (this.showStyle == 0) return false
            let nWidth = 100 / this.showNumber
            return {
                width: nWidth + "%"
            }
        },
        bIcon() {
            return this.data.isIconSel == "0" ? true : false
        },
        bDesc() {
            if (this.showStyle == "1") {
                return this.data.isDescSel == "0" ? true : false
            } else {
                return true
            }
        },
        listStyle() {
            return this.showStyle == "0" ? "list-style1" : "list-style2"
        },
        showStyle() {
            return this.data.isStyleSel
        },
        showNumber() {
            return this.data.isNumberSel
        },
        aClass() {
            let arr = []
            arr.push(this.listStyle)
            if (this.listStyle == "list-style2") {
                this.data.styleSelList.map((v, i) => {
                    switch (v) {
                        case "0":
                            arr.push("whole-margin")
                            break;
                        case "1":
                            arr.push("all-padding")
                            break;
                        case "2":
                            arr.push("all-border")
                            break;
                        default:
                            break;
                    }
                })
            }
            return arr
        }
    }
}

</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.nav {
    background: #fff;
    overflow: hidden;
}

.nav .list {
    overflow: hidden;
    box-sizing: content-box;
    position: relative;
}

.nav .list img {
    display: block;
}

.nav .con {
    font-size: 1.5rem;
    color: $text-title-color;
    @include flex1-1();
}

.list a {
    border-left: 0;
    @include urlAbsolute();
}

.list-style1 {
    padding-bottom: 0;
    padding: 0 $padding-all;
}

.list-style1 .list {
    height: 4.8rem;
    border-bottom: 1px solid $border-color-split;
    @include box-pack(center, start);
    @include direction(center, initial)
}

.list-style1 .list .icon-right-arrow {
    color: $title-color;
    font-size: 1.2rem;
}

.list-style1 .list:last-of-type {
    border-bottom: 0;
}

.list-style1 .list img {
    height: 64%;
    width: auto;
    margin-right: .5rem;
}

.list-style2 .list {
    width: 20%;
    float: left;
    text-align: center;
    /*border-bottom: 0 !important;*/
    /*padding-top: $padding-all*1.2;*/
    overflow: hidden;
}

.list-style2 .list img {
    width: 100%;
    height: auto;
    margin: 0 auto;
    display: block;
}

.list-style2 .list .con {
    margin-top: .2rem;
    font-size: 1.3rem;
}

.list-style2 .list .icon-right-arrow {
    display: none;
}

.list-style2.whole-margin {
    padding: $padding-all 0;
}

.list-style2.all-padding section {
    box-sizing: border-box;
    padding: .4rem;
}

.list-style2.all-border {}

.list-style2.all-border section {
    box-sizing: border-box;
    margin-bottom: -1px;
    border: 1px solid $body-background;
    border-right: 0;
}
</style>