<template>
    <div class='title'  style="position:relative">
        <header class="transition" :style="{'text-align':sPosition}" v-if="bStyleSelTradition || bSimplify">
            <section :class="{simplify:bSimplify}">
                <h1>{{ title }}
                    <span class="link" v-if="bList && bStyleSelTradition">
                        <template> -
                            <a v-href="{sUrl:sUrl,preview:preview}">{{ desc }}</a>
                        </template>
                    </span>
                </h1>
                <a class="more-link" v-href="{sUrl:sUrl,preview:preview}" v-if="bSimplify && bList">{{ desc }}
                    <i class="iconfont icon-right-arrow"></i>
                </a>
            </section>
            <aside v-if="!bSimplify">
                <span v-show="!bDate">{{ data.allValue.fitTitle }}</span>
                <span v-show="bDate">{{ dateTime }}</span>
            </aside>
        </header>
        <header class="w-x" v-else>
            <h1>{{ title }}</h1>
            <aside>
                <span v-show="dateTime">{{ dateTime }}</span>
                <span v-show="data.allValue.author">{{ data.allValue.author }}</span>
                <span class="link" v-if="bList && bWechat">
                    <a v-href="{sUrl:sUrl,preview:preview}">{{ desc }}</a>
                </span>
            </aside>
        </header>
    </div>
</template>

<script>
//mixins
import frontendGet from 'mixins/frontend-get'

export default {
    name: 'title',
    props: ['data', 'preview'],
    mixins: [frontendGet],
    beforeMount() {
    },
    methods: {

    },
    computed: {
        dateTime() {
            let dateTime = this.data.allValue.dateTime
            if (dateTime != "") {
                return (new Date(dateTime)).format("yyyy-MM-dd HH:mm:ss")
            }
        },
        bDate() {
            return this.data.isDate == "0" ? false : true
        },
        bSimplify() {
            return this.data.isStyleSel == "2" ? true : false
        },
        bWechat(){
            return this.data.isStyleSel == "1" ? true : false
        },
        bStyleSelTradition() {
            return this.data.isStyleSel == "0" ? true : false
        },
        sPosition() {
            let sPositionSel = this.data.isPositionSel
            switch (sPositionSel) {
                case "0":
                    return "left"
                    break;
                case "1":
                    return "center"
                    break;
                case "2":
                    return "right"
                    break;
                default:
                    return "left"
                    break;
            }
        },
        title() {
            return this.getText({
                dataNext: "allValue",
                attrName: "title",
                defaultValue: "[编辑标题名]"
            })
        },
        desc() {
            if (this.bList) {
                return this.getText({
                    listIndex: 0,
                    attrName: "desc",
                    defaultValue: "[链接名]"
                })
            }

        },
        sUrl() {
            if (this.bList) {
                return this.getText({
                    listIndex: 0,
                    attrName: "url",
                    defaultValue: "#"
                })
            }
        },
        bgColor() {
            // return 
        },
        bList() {
            return 0 >= this.data.list.length ? false : true
        }
    }
}

</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
header {
    background: #ffffff;
    padding: 1.2rem $padding-all;
}

header section {
    overflow: hidden;
}

header h1 {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.2;

    color: $text-title-color;
}

header aside {
    margin-top: .2rem;
}

header.transition .link {
    font-size: 1.3rem;
    padding-top: .1rem;
    margin-left: .2rem;
}

header.transition span {
    font-size: 1.1rem;
    color: $title-color;
}

header.w-x h1 {
    float: inherit;
}

header.w-x aside {
    font-size: .78rem;
    color: $title-color;
}

header.w-x aside span {
    margin-right: .1rem;
}

.simplify h1 {
    float: left;
}

.simplify .more-link {
    float: right;
}
</style>