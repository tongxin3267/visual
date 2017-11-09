<template>
    <div class='separate-img-list'>
        <ul :class="{mini: isMiniList}">
            <template v-if="isList">
                <li v-for="item in list" :key="item.id">
                    <a v-href="{sUrl:item.url,preview:preview}"></a>
                    <span class="desc" v-show="'' != item.desc">{{ item.desc }}</span>
                    <img v-lazy="item.img || item.goods_img" alt="" v-if="item.img || item.goods_img">
                    <img src="../../assets/images/default-img.jpg" class="no-img" v-else />
                </li>
            </template>
            <li class="default-img" v-else>
                <img src="../../assets/images/default-img.jpg" />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'separate-img-list',
    props: ['list', 'isMiniList', 'preview', 'isList'],
    data() {
        return {

        }
    },
    computed: {
        localHttp() {
            return !this.release ? `${window.ROOT_PIC}${window.PC_URL}` : window.PC_URL
        },
    }
}

</script>

<style lang="scss" scoped>
@import '../../assets/style/mixins/common';
.separate-img-list ul li {
    width: 100%;
    position: relative;
    margin-bottom: .6rem;
    background: #f4f5fa;
    @include box-pack(center, center);
    @include direction(center, center)
}

.separate-img-list ul li:last-child,
.separate-img-list ul li.default-img:last-child {
    margin-bottom: 0
}

.separate-img-list ul li a {
    @include urlAbsolute();
}

.separate-img-list ul li span {
    position: absolute;
    padding: .4rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    @include ellipses();
}

.separate-img-list ul li img {
    width: 100%;
    display: block;
}

.separate-img-list ul.mini {
    overflow: hidden;
}

.separate-img-list ul.mini li {
    width: 50%;
    float: left;
    padding-bottom: 0;
    margin-bottom: 0rem;
}

.separate-img-list ul.mini li.gap {
    padding: .4rem;
}

.separate-img-list ul.mini li.gap:nth-child(2n-1) {
    padding-right: .2rem;
}

.separate-img-list ul.mini li.gap:nth-child(2n) {
    padding-left: .2rem;
}

.separate-img-list ul.mini li.gap:nth-child(2n-1) span {
    left: .4rem;
    right: .2rem;
}

.separate-img-list ul.mini li.gap:nth-child(2n) span {
    left: .2rem;
    right: .4rem;
}

.default-img {
    min-height: 4rem;
    background: #f4f5fa;
    @include direction(center, center)
}

.separate-img-list li.default-img img {
    display: block;
    width: 50%;
    height: auto;
}

.separate-img-list ul li img.no-img {
    width: 50%;
}
</style>