<template>
    <div class='app-down' v-if="bShow">
        <div class="ect-header-banner dis-box" id="ect-banner">
            <a href="javascript:;" @click="closeAppDown">
                <i class="iconfont icon-guanbi"></i>
            </a>
            <div class="box-flex">
                <img :src="imgUrl" style="margin-right:.4rem">
                <div class="ect-header-text">
                    <h4>享受更加流畅的商城体验</h4>
                    <p>赶快下载多商户APP</p>
                </div>
            </div>
            <a class="btn-submit1" :href="link || 'javascript:;'">立即下载</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app-down',
    data() {
        return {
            imgUrl: `${ROOT_URL}public/img/more_icon.png`,
            link: window.APP_DOWNLOAD_URL,
            isShow: false,
            localShow: true
        }
    },
    created() {
        this.getIsShow()
        if (localStorage.getItem("localShow")) {
            this.localShow = false
        }
    },
    methods: {
        closeAppDown() {
            this.localShow = false
            if (!localStorage.getItem("localShow")) {
                localStorage.setItem("localShow", false)
            }
        },
        getIsShow() {
            this.$http.post(this.url("index&a=appnav")).then(({ data: { data } }) => {
                data == 1 ? this.isShow = true : this.isShow = false
            })
        }
    },
    computed: {
        bShow() {
            return this.isShow && this.localShow
        }
    }
}

</script>

<style scoped>
.app-down {
    height: 5rem;
    z-index: 111;
}

.ect-header-banner {
    background: rgba(0, 0, 0, .9);
    height: 5rem;
    line-height: 5rem;
    width: 100%;
    color: #fff;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 111;
}

.ect-header-banner.active {
    top: -5rem;
}

.box-flex {
    -moz-box-flex: 1;
    -ms-box-flex: 1;
    box-flex: 1;
    -webkit-box-flex: 1;
    display: block;
    width: 100%;
}

.fl {
    float: left;
}

.box-flex img {
    float: left;
}

.ect-header-text {
    padding-left: 1.1rem;
    margin-top: 1.2rem;
}

.ect-header-banner.active {
    display: none;
}

.ect-header-banner i {
    color: #fff;
    font-size: 2rem;
    margin-left: 1rem;
}

.ect-header-banner img {
    width: 3rem;
    height: auto;
    margin-left: 1rem;
    margin-top: 1rem;
}

.ect-header-banner .ect-header-text {
    padding-left: 1.1rem;
    margin-top: 1.2rem;
}

.ect-header-banner h4 {
    font-size: 1.3rem;
    line-height: 1.2;
}

.ect-header-banner p {
    font-size: 1.1rem;
    color: #ccc;
    line-height: 1.2;
}

.ect-header-banner .btn-submit1 {
    padding: .4rem;
    margin-top: -.3rem;
    font-size: 1.2rem;
    margin-right: 1rem;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 4px;
}

.ect-header-banner .btn-submit1:hover {
    border-color: #fff;
}
</style>