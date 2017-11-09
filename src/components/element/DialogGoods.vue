<template>
    <div class='dialog-ec dialog-goods'>
        <ec-dialog 
            :visible.sync="bThisShowDialog" 
            @close="closeDialog()">
            <div slot="title" class="title">
                <ul>
                    <li 
                        v-for="(item,index) in tabSelect" 
                        :key="index" 
                        :class="{
                            active:index == selActive
                        }"
                        @click="tabSelectFn(index)">
                        {{ 
                            item.title == '商品库' 
                                ? item.title 
                                : `${item.title} (${selGoodNum})`
                        }}
                    </li>
                </ul>
                <div class="search" v-show="selActive == 0">
                    <ec-input
                        placeholder="输入商品关键词"
                        icon="search"
                        v-model="kwords"
                        size="small"
                        :on-icon-click="handleIconSearch">
                    </ec-input>
                </div>
            </div>
            <template v-if="selActive == 0">
                <ul class="picture-list">
                    <li 
                        class="dialog-picture-active"
                        v-for="(item,index) in goodsList" 
                        :key="item.goods_id"
                        :title="item.goods_name"
                        @click="select(index)">
                        <div class="dialog-picture-active" v-show="item.bActive">
                            <span>
                                <i class="iconfont icon-correct"></i>
                            </span>
                        </div>
                        <figure>
                            <img :src="localHttp+item.goods_img" alt="">
                        </figure>
                        <figcaption>{{ item.goods_name }}</figcaption>
                    </li>
                </ul>
                <div slot="footer" class="dialog-footer">
                    <pagination 
                        :page-size="pageSize" 
                        :current-page="currentPage" 
                        :total="total" 
                        @current-change="currentChange"
                        layout="total, prev, pager, next">
                    </pagination>
                </div>
            </template>
            <template v-else>
                <ul class="picture-list sel-product-list">
                    <li 
                        class="dialog-picture-active"
                        v-for="(item,index) in selGoodsList" 
                        :key="item.goods_id"
                        :title="item.goods_name"
                        @click="removeSelectGoods({
                            index,
                            goodsId: item.goods_id
                        })">
                        <div class="dialog-picture-active">
                            <span>
                                <i class="iconfont icon-clear1"></i>
                            </span>
                        </div>
                        <figure>
                            <img :src="localHttp+item.goods_img" alt="">
                        </figure>
                        <figcaption>{{ item.goods_name }}</figcaption>
                    </li>
                </ul>
                <div slot="footer" class="dialog-footer">
                    <pagination 
                        :page-size="selPageSize" 
                        :current-page="selCurrentPage" 
                        :total="selGoodNum" 
                        @current-change="selCurrentChange"
                        layout="total, prev, pager, next">
                    </pagination>
                </div>
            </template>
        </ec-dialog>
    </div>
</template>

<script>
// mapActions mapState
import {
    mapActions,
    mapState
} from 'vuex'

// third party components
import {
    Button,
    Loading,
    Dialog,
    Pagination,
    Upload,
    Input
} from 'element-ui'

export default {
    name: 'dialog-goods',
    components: {
        'EcInput': Input,
        'EcDialog': Dialog,
        Pagination
    },
    data() {
        return {
            bThisShowDialog: false,
            selActive: 0,
            kwords:'',
            tabSelect: [{
                title: '商品库'
            }, {
                title: '已选择'
            }]
        }
    },
    created() {
        console.log(this.modulesIndex)
    },
    methods: {
        ...mapActions('dialogGoods', [
            'onOffDialogGoods',
            'setDialogGoods',
            'selectGoods',
            'setDialogSelGoods',
            'removeSelect'
        ]),
        /**
         * 关闭goodsDialog 并修改 state 中的状态
         * 
         */
        closeDialog() {
            this.selActive = 0
            this.onOffDialogGoods({
                bShowDialog: false
            })
        },
        /**
         * 切换 tab
         * 
         * @param {* number} 当前索引
         */
        tabSelectFn(index) {
            this.selActive = index
            if (index == 1) {
                this.setDialogSelGoods({
                    selectGoodsId: this.selectGoodsId,
                    currentPage: 1,
                    pageSize: 15
                })
            } else {
                this.currentChange(this.currentPage)
            }
        },
        /**
         * 选中取消当前商品
         * 
         * @param {* index} 当前索引
         */
        select(index) {
            this.selectGoods({
                index
            })
        },
        /**
         * 商品tab 的分页
         * 
         * @param {* Number} val - currentPage
        */
        currentChange(val) {
            this.setDialogGoods({
                bShowDialog: true,
                currentPage: val,
                kwords: this.kwords,
                pageSize: this.pageSize,
                modulesIndex: this.modulesIndex
            })
        },
        /**
         * 选中商品tab 的分页
         * 
         * @param {* Number} val - currentPage
        */
        selCurrentChange(val) {
            this.setDialogSelGoods({
                selectGoodsId: this.selectGoodsId,
                currentPage: val,
                pageSize: this.selPageSize
            })
        },
        /**
         * 删除已选商品
         * 
         * @param {* Object}
         */
        removeSelectGoods(o) {
            this.removeSelect({
                ...o,
                modulesIndex: this.modulesIndex,
                pageSize: this.selPageSize,
                currentPage: this.selCurrentPage,
                total: this.selGoodNum
            })
            this.setDialogSelGoods({
                selectGoodsId: this.selectGoodsId,
                currentPage: this.selCurrentPage,
                pageSize: this.selPageSize
            })
        },
        /**
         * 根据关键字搜索商品
         * 
         */
        handleIconSearch(){
            this.setDialogGoods({
                bShowDialog: true,
                currentPage: 1,
                pageSize: 15,
                modulesIndex: this.modulesIndex,
                kwords: this.kwords
            })
        }
    },
    computed: {
        ...mapState('dialogGoods', {
            bShowDialog: state => state.settingType.bShowDialog,
            pageSize: state => state.settingType.pageSize,
            total: state => state.settingType.total,
            currentPage: state => state.settingType.currentPage,
            goodsList: state => state.goodsList,
            type: state => state.settingType.type,
            brandId: state => state.settingType.brandId,
            modulesIndex: state => state.settingType.modulesIndex,
            catId: state => state.settingType.catId,
            selGoodsList: state => state.selGoodsList,
            selPageSize: state => state.selectGoodsType.pageSize,
            selCurrentPage: state => state.selectGoodsType.currentPage
        }),
        selectGoodsId() {
            let selectGoodsId = []
            if (this.modulesIndex != -1) {
                let allValue = this.$store.state.modules[this.modulesIndex].data.allValue
                if (allValue && allValue.hasOwnProperty('selectGoodsId')) {
                    selectGoodsId = allValue.selectGoodsId
                }
            }
            return selectGoodsId
        },
        selGoodNum() {
            console.log(this.selectGoodsId)
            return this.selectGoodsId.length
        },
        /**
         * 开发模式生效
         * 
         */
        localHttp(){
            return !this.release ? 'http://10.10.10.14/dsc_mall/' : ''
        }
    },
    watch: {
        'bShowDialog'(val, oldVal) {
            if (val) this.bThisShowDialog = true
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.dialog-goods{
    .title{
        display:inline-block;
        .search{
            position: absolute;
            top:50%;
            right:50px;
            margin-top:-15px;
        }
    }
    ul{
        li{
            line-height: 1;
            font-size:16px;
            color:#646b73;
            margin-right:.8rem;
            cursor:pointer;
            display:inline-block;
        }
    }
    .active{
        font-size: 16px;
        font-weight: 700;
        color: #1f2d3d;
    }
}

ul.picture-list {
    overflow: hidden;
    float:inherit;
}

ul.picture-list li {
    width: 19.4%;
    margin: .3%;
    font-size:12px;
    text-align: center;
    position: relative;
    float: left;
    background: rgba(0, 0, 0, .03);
    box-sizing: border-box;
    border: 2px solid #fff;
}

ul.picture-list li:hover {
    border: 2px solid #20a0ff;
    cursor: pointer;
}

ul.picture-list li .dialog-picture-active {
    position: absolute;
    background: rgba(32, 160, 255, .08);
    border: 2px solid #20a0ff;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1
}

ul.picture-list li .dialog-picture-active span {
    background: #20a0ff;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 100%;
    color: #fff;
    display: block;
    height: 3rem;
    width: 3rem;
    line-height: 3rem;
    transform: translate3d(-50%, -60%, 0);
}

ul.picture-list li .dialog-picture-active span i {
    font-size: 1.6rem;
}

ul.picture-list li figure {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 13rem;
}

ul.picture-list li figcaption {
    position: absolute;
    color: #fff;
    height: 2.4rem;
    line-height: 2.4rem;
    background: rgba(0, 0, 0, .5);
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 .4rem;
    z-index: 2;
    @include ellipses()
}

ul.picture-list li img {
    max-width: 100%;
    max-height: 100%;
}

ul.sel-product-list{
    li{
        .dialog-picture-active{
            border:none;
        }
    }
    li.dialog-picture-active span{
        display:none;
    }
    li.dialog-picture-active:hover span{
        display:inherit
    }
}

@media only screen and (max-width: 1540px) {
    .dialog-goods ul.picture-list li figure {
        height: 11rem;
    }
}

@media only screen and (max-width: 1440px) {
    .dialog-goods ul.picture-list li figure {
        height: 9rem;
    }
}
.dialog-footer {
    display: flex;
    justify-content:flex-end; 
}
</style>