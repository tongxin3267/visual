<template>
    <nav class="commom-nav dis-box ts-5" id="commom-nav" style="top:76%">
        <div class="left-icon">
            <div class="filter-top filter-top-index" id="scrollUp">
                <i class="iconfont icon-jiantou12"></i>
                <span>顶部</span>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'filter-top'

    }

</script>

<style scoped>
    .commom-nav {
        position: fixed;
        right: -82%;
        top: 66%;
        width: 82%;
        z-index: 12;
        margin-right: 4.5rem;
    }
    
    .filter-top {
        width: 4.5rem;
        position: absolute;
        text-align: center;
        padding: 1.3rem .4rem .6rem .4rem;
        ;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 0.5rem 0 0 0.5rem;
        display: none;
    }
    
    .filter-top span {
        font-size: 1rem;
        display: block;
        text-align: center;
        padding-top: .7rem;
        color: #fff;
    }
    
    .filter-top-index img {
        width: 2.4rem;
        position: absolute;
        top: 0rem;
        left: 50%;
        margin-left: -1.2rem;
    }
    
    .filter-top .icon-jiantou12 {
        position: absolute;
        left: 0;
        right: 0;
        top: .2rem;
        font-size: 1.8rem;
        color: #fff;
        -moz-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        transform: rotate(90deg);
    }
</style>