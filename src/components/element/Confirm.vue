<template>
    <div class="confirm" v-show="visible">
        <div class="msgbox">
            <div class="msgbox-header">
                <div class="msgbox-title">{{option.title}}</div>
            </div>
            <div class="msgbox-content">
                <div class="msgbox-message">{{option.context}}</div>
            </div>
            <div class="msgbox-btns">
                <button class="msgbox-btn msgbox-cancel" @click="cancelConfirm">取消</button>
                <button class="msgbox-btn msgbox-confirm" @click="confirm">确定</button>
            </div>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script>
//node library
import qs from 'qs'

// custom components

// third party components
import {
    Loading,
} from 'element-ui';

//mixins

export default {
    name: 'confirm',
    props: ['option', 'visible'],
    components: {
    },
    data() {
        return {
            confirmButtonText:'',
            cancelButtonText:'',
            context:'',
            title:''
        }
    },
    created() {
        
    },
    mounted() {
    },
    methods: {
        cancelConfirm(){
            this.$emit('update:visible',false)
        },
        confirm(context,title,options){
            location.href = `${window.ROOT_URL}index.php?m=user&c=login`
        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.msgbox {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    width: 85%;
    border-radius: 3px;
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .2s;
    transition: .2s;
    z-index: 2017;
}

.msgbox-header {
    padding: 15px 0 0;
}

.msgbox-title {
    text-align: center;
    padding-left: 0;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 700;
    color: #333;
}

.msgbox-content {
    padding: 10px 20px 15px;
    border-bottom: 1px solid #ddd;
    min-height: 36px;
    position: relative;
}

.msgbox-message {
    color: #999;
    margin: 0;
    text-align: center;
    line-height: 36px;
}

.msgbox-btns {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 40px;
    line-height: 40px;
}

.msgbox-cancel {
    width: 50%;
    border-right: 1px solid #ddd;
}

.msgbox-btn {
    line-height: 35px;
    display: block;
    background-color: #fff;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 0;
    border: 0;
}

.msgbox-confirm {
    color: $color;
    width: 50%;
}

.msgbox-btn {
    line-height: 35px;
    display: block;
    background-color: #fff;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 0;
    border: 0;
}
</style>