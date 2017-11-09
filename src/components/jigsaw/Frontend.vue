<template>
    <div class='jigsaw' :class="aJigsawClass">
        <ul>
            <li class="big-img" :class="aClass" :style="{'width':aStyle1Width0+'%'}" v-if="styleSel == '0' && data.list[0]">
                <a v-href="{sUrl:data.list[0].url,preview:preview}"></a>
                <span class="desc" v-if="data.list[0].desc!=''">
                        {{ data.list[0].desc }}
                    </span>
                <img v-lazy="data.list[0].img" alt="" v-if="data.list[0].img">
                <img src="../../assets/images/default-img.jpg" alt="" v-else>
            </li>
            <li :class="aClass" :style="{'width':aStyle1Width1+'%'}">
                <ul v-if="styleSel == '0'">
                    <li v-for="(item, index) in imgList" :key="index" :class="s2Class" :style="{'width':style1RightW}">
                        <a v-href="{sUrl:item.url,preview:preview}"></a>
                        <span class="desc" v-if="item.desc">{{ item.desc }}</span>
                        <img v-lazy="item.img" alt="" v-if="item.img">
                        <img src="../../assets/images/default-img.jpg" alt="" v-else>
                    </li>
                </ul>
                <ul v-else>
                    <li v-for="(item,index) in imgList" :key="index" :class="s2Class" :style="{'width':aStyle2Width[index]+'%'}">
                        <a v-href="{sUrl:item.url,preview:preview}"></a>
                        <span class="desc" v-if="item.desc">{{ item.desc }}</span>
                        <img v-lazy="item.img" alt="" v-if="item.img">
                        <img src="../../assets/images/default-img.jpg" alt="" v-else>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
// custom components

// third party components

export default {
    name: 'jigsaw',
    props: ['data', 'preview'],
    components: {
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    computed: {
        localHttp() {
            return !this.release ? `${window.ROOT_PIC}${window.PC_URL}` : window.PC_URL
        },
        imgList() {
            let arr = []
            this.data.list.map((v, i) => {
                arr.push(v)
            })
            if (this.styleSel == "0") {
                arr.splice(0, 1)
                return arr
            }
            return arr
        },
        style1RightW() {
            let nStyle1Right = this.data.allValue.showStyle1Right,
                nEvenW = 0
            if (nStyle1Right == "") nStyle1Right == 2
            nEvenW = 100 / Number(nStyle1Right)
            return this.styleSel == "0" ? nEvenW + "%" : ""

        },
        aStyle1Width0() {
            return this.aStyle1Width.length > 0 ? this.aStyle1Width[0] : ""
        },
        aStyle1Width1() {
            return this.aStyle1Width.length > 0 ? this.aStyle1Width[1] : "100"
        },
        aStyle1Width() {
            let arrNum = this.data.allValue.showStyle1Size.split(":"),
                nEven = 0,
                nEvenW = 0,
                aStyleW = []
            arrNum.forEach((v) => {
                nEven += Number(v)
            })
            nEvenW = 100 / nEven
            arrNum.forEach((v) => {
                aStyleW.push(Number(v) * nEvenW)
            })
            return this.styleSel == "0" ? aStyleW : []
        },
        aStyle2Width() {
            let arrNum = this.data.allValue.showStyle2Size.split(":"),
                nEven = 0,
                nEvenW = 0,
                aStyleW = []
            arrNum.forEach((v) => {
                nEven += Number(v)
            });
            nEvenW = 100 / nEven
            arrNum.forEach((v) => {
                aStyleW.push((Number(v) * nEvenW))
            })
            if (this.styleSel == "1") return aStyleW
        },
        styleSel() {
            return this.data.isStyleSel
        },
        s2Class() {
            if (this.styleSel != "0") return 'f-left'
        },
        aClass() {
            let arr = []
            this.data.isPositionSel == "0" ? arr.push("f-left") : arr.push("f-right")
            this.styleSel == "0" ? arr.push("w50deg") : arr.push("w100deg")
            return arr
        },
        aJigsawClass() {
            let arr = []
            arr.push(this.listStyle)
            this.data.styleSelList.map((v, i) => {
                switch (v) {
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
            return arr
        }
    }
}

</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.jigsaw {
    overflow: hidden;
    background: #fff;
}

.jigsaw.all-padding ul>li.big-img,
.all-padding ul>li ul li {
    box-sizing: border-box;
    padding: .4rem;
}

.jigsaw.all-border .big-img {
    border-top: 1px solid $body-background;
}

.jigsaw.all-border ul>li ul li {
    border-left: 1px solid $body-background;
    border-top: 1px solid $body-background;
}

.jigsaw ul>li {
    overflow: hidden;
}

.jigsaw ul>li img {
    width: 100%;
}

.jigsaw ul>li.w100deg {
    width: 100%;
}

.jigsaw ul>.w50deg {
    width: 50%;
}

.jigsaw ul>li ul li,
.jigsaw ul>li ul li img {
    width: 100%;
}

.jigsaw ul>li ul li {
    border-right: 0;
    border-bottom: 0;
    float: left;
}

.jigsaw ul li {
    position: relative;
}

.jigsaw ul li span {
    color: #fff;
    font-size: 1.3rem;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: .4rem .6rem;
    background: rgba(0, 0, 0, .6)
}

.jigsaw ul li a {
    @include urlAbsolute()
}
</style>