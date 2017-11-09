<template>
    <footer class="footer-nav dis-box">
    <a href="/" class="box-flex nav-list active">
        <i class="nav-box i-home"></i><span>首页</span>
    </a>
    <a href="{url('category/index/index')}" class="box-flex nav-list">
        <i class="nav-box i-cate"></i><span>分类</span>
    </a>
    <a href="{url('search/index/index')}" class="box-flex nav-list">
        <i class="nav-box i-shop"></i><span>搜索</span>
    </a>
    <a href="{url('cart/index/index')}" class="box-flex position-rel nav-list">
        <i class="nav-box i-flow"></i><span>购物车</span>
    </a>
    <a href="{url('user/index/index')}" class="box-flex nav-list">
        <i class="nav-box i-user"></i><span>我</span>
    </a>
</template>
<script>
export default {
    name:'tab-down',
    data () {
        return {
            
        }
    },
    created () {
        console.log(this.url('category'))
    }
}
</script>

<style lang="scss" scoped>
/*display盒子*/

.dis-box {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: box;
}

.box-flex {
    box-flex: 1;
    -webkit-box-flex: 1;
    display: block;
    width: 100%;
}


/*footer*/

.footer-nav {
    background-color: rgba(254, 253, 252, 1);
    left: 0;
    right: 0;
    position: fixed;
    margin: 0 auto;
    bottom: 0;
    z-index: 11;
    box-shadow: 1px 5px 15px rgba(50, 50, 50, 0.3);
    border-top: 1px solid #f6f6f9;
    padding: 0.3rem 0
}

.footer-nav .nav-list {
    font-size: 1.1rem;
    display: block;
    text-align: center;
    padding-top: 0rem;
    color: #595959
}

.footer-nav .nav-list .nav-box {
    background: url(../mobile/public/img/ec-icon.png) no-repeat;
    width: 2.7rem;
    height: 2.7rem;
    display: block;
    margin: 0 auto;
    background-size: 32.1rem;
}

.footer-nav .nav-list .i-home {
    background-position: -.02rem 0rem;
}

.footer-nav .nav-list .i-cate {
    background-position: -2.701rem 0rem;
}

.footer-nav .nav-list .i-zhongchou {
    background-position: -16.7rem 0.1rem;
}

.footer-nav .nav-list .i-zhongchou_user {
    background-position: -19.5rem 0.1rem;
}

.footer-nav .nav-list .i-zhongchou-order {
    background-position: -22.25rem 0.1rem;
}

.footer-nav .nav-list .i-shop {
    background-position: -13.9rem 0rem;
}

.footer-nav .nav-list .i-flow {
    background-position: -5.78rem 0rem;
}

.footer-nav .nav-list .i-user {
    background-position: -8.38rem 0rem;
}

.footer-nav .nav-list .i-pintuan {
    background-position: -28.6rem 0rem;
}

.footer-nav .nav-list .i-ranking {
    background-position: -25.4rem 0.1rem;
}

.footer-nav .nav-list.active {
    color: #ec5151
}

.footer-nav .nav-list.active .i-home {
    background-position: .02rem -3rem;
}

.footer-nav .nav-list.active .i-cate {
    background-position: -2.701rem -3rem;
}

.footer-nav .nav-list.active .i-zhongchou {
    background-position: -16.7rem -3rem;
}

.footer-nav .nav-list.active .i-zhongchou_user {
    background-position: -19.5rem -2.9rem;
}

.footer-nav .nav-list.active .i-zhongchou-order {
    background-position: -22.25rem -2.9rem;
}

.footer-nav .nav-list.active .i-shop {
    background-position: -13.9rem -3rem;
}

.footer-nav .nav-list.active .i-flow {
    background-position: -5.78rem -3rem;
}

.footer-nav .nav-list.active .i-user {
    background-position: -8.38rem -3rem;
}

.footer-nav .nav-list.active .i-pintuan {
    background-position: -28.6rem -2.9rem;
}

.footer-nav .nav-list.active .i-ranking {
    background-position: -25.4rem -2.8rem;
}
</style>


