<template>
    <footer class='tab-down'>
        <ul :style="oPosition">
            <li v-for="(item,index) in list" :key="index" :class="{active:aActive[index]}">
                <a v-href="{sUrl:item.url,preview:preview}"></a>
                <i></i>
                <span>{{ item.desc }}</span>
            </li>
        </ul>
    </footer>
</template>

<script>
//nodes library
import qs from 'qs'

// custom components

// third party components

//mixins

export default {
    name: 'tab-down',
    props: ['data', 'preview'],
    mixins: [],
    components: {

    },
    data() {
        return {
            list:[{
                url:"",
                desc:"首页"
            },{
                url:"index.php?m=category",
                desc:"分类"
            },{
                url:"index.php?m=search",
                desc:"搜索"
            },{
                url:"index.php?m=cart",
                desc:"购物车"
            },{
                url:"index.php?m=user",
                desc:"我"
            }]
        }
    },
    created() {


    },
    mounted() {
        this.tabDownActive()
    },
    methods: {
        tabDownActive() {

        }
    },
    computed: {
        localHttp() {
            return !this.release ? `${window.ROOT_PIC}${window.PC_URL}` : window.PC_URL
        },
        aActive() {
            let arr = []
            this.list.forEach(v => {
                arr.push(false)
            })
            arr[0] = true
            return arr
        },
        aImgList() {

        },
        oPosition() {
            let o = {}
            this.preview ? o.position = "relative" : o.position = "fixed"
            return o
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.tab-down {
    height: 5.46rem;
}

.tab-down ul {
    width: 100%;
    z-index: 111;
    background: #fff;
    width: 100%;
    bottom: 0;
    border-top: 1px solid $border-color-split;
    @include disBox();
    @include disFlex();
}

.tab-down ul li {
    position: relative;
    padding: .4rem 0;
    text-align: center;
    @include flex1-1();
    &:nth-child(2) i{
        background-position: -2.701rem 0rem
    }
    &:nth-child(3) i{
        background-position: -13.9rem 0rem
    }
    &:nth-child(4) i{
        background-position: -5.78rem 0rem
    }
    &:nth-child(5) i{
        background-position: -8.38rem 0rem
    }
}

.tab-down ul li.active {
    color: $color;
}

.tab-down ul li a {
    @include urlAbsolute();
}

.tab-down ul li i {
    display: block;
    margin: 0 auto;
    width: 2.7rem;
    height: 2.7rem;
    background-size: 80%;
    background-repeat: no-repeat;
    background-position-x: center;
    background:url("../../assets/images/ec-icon.png");
    background-size: 32.1rem;
   
}


.tab-down ul li.active i {
    background-position-y: -2.78rem;
}

.tab-down ul li span {
    font-size: 1.2rem;
    display: block;
}
</style>