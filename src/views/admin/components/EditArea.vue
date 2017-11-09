<template>
    <div id='edit-area'>
        <header>
            <h4>{{ editArea.text }}</h4>
            <div class="compontent-tool">
                <label @click="removeModules" for="">
                    <i class="iconfont" :class="'icon-'+editArea.function.clear.icon"></i>清空
                </label>
                <label for="" v-if="!bStore && sDefault != 0" @click.stop="restoreModules">
                    <i class="iconfont" :class="'icon-'+editArea.function.restore.icon"></i>还原
                </label>
                <label @click="saveModules" for="">
                    <i class="iconfont" :class="'icon-'+editArea.function.save.icon"></i>存储
                </label>
            </div>
        </header>
        <div class="edit-area-con" :class="{no:!isMoudles}">
            <div style="height:auto">
                <draggable v-model="modules" style="min-height:10rem; height:auto;" :options="{group:'people',handle:'.handle'}" @start="isDragging=true" @add="onDraggAdd($event)" :move="onDraggMove" @end="isDragging=false">
                    <component class="component" v-for="(item,index) in modules" :key="index" :is="'b-'+item.module" :modules-index="index" :onlineData="item.data" :setting="item.setting" :data-index="index">
                    </component>
                </draggable>
            </div>
        </div>
    </div>
</template>
<script>
//node library
import qs from 'qs'
// mapActions mapState
import {
    mapActions,
    mapState
} from 'vuex'

// third party libraries
import 'html2canvas'

// custom components
import BSlide from 'components/slide/Backend'
import BTitle from 'components/title/Backend'
import BAnnouncement from 'components/announcement/Backend'
import BNav from 'components/nav/Backend'
import BLine from 'components/line/Backend'
import BBlank from 'components/blank/Backend'
import BJigsaw from 'components/jigsaw/Backend'
import BProduct from 'components/product/Backend'
import BCoupon from 'components/coupon/Backend'
import BCountDown from 'components/count-down/Backend'
import BButton from 'components/button/Backend'
import BSearch from 'components/search/Backend'
import BStore from 'components/store/Backend'
import BShopSigns from 'components/shop-signs/Backend'
import BTabDown from 'components/tab-down/Backend'

// third party components
import {
    MessageBox,
    Message,
    Loading
} from 'element-ui'
import draggable from 'vuedraggable'

export default {
    name: 'edit-area',
    components: {
        draggable,
        MessageBox,
        Message,
        BSlide,
        BTitle,
        BAnnouncement,
        BNav,
        BLine,
        BBlank,
        BJigsaw,
        BProduct,
        BCoupon,
        BCountDown,
        BButton,
        BSearch,
        BStore,
        BShopSigns,
        BTabDown,
        Loading,
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        generateImage() {
            return new Promise((resolove, reject) => {
                let divImg = document.getElementById("j-phone-edit")
                html2canvas(divImg, {
                    proxy: !this.release ? `${window.ROOT_PIC}${window.ROOT_URL}/html2canvasproxy.php` : `${window.ROOT_URL}/html2canvasproxy.php` ,//跨域支持
                    width: 318,
                    height: 366,
                    background: "#fff",
                    useCORS: false
                }).then(canvas => {
                    resolove(canvas.toDataURL())
                }).catch(err => {
                    reject(false)
                    console.log(err)
                })
            })
        },
        loadImage() {
        },
        onDraggMove({ relatedContext, draggedContext }) {
            const relatedElement = relatedContext.element
            const draggedElement = draggedContext.element

        },
        onDraggAdd(e) {
            let moduleName = e.item.getAttribute("data-module")
            e.item.outerHTML = "" //拖拽添加后删除该内容'
            this.$store.dispatch('navHiddenTab')//拖拽放置结束影藏下拉框
            this.$store.dispatch('addModules', {
                newIndex: e.newIndex,
                module: this.cloneModules(moduleName)
            })
        },
        cloneModules(moduleName) {
            delete require.cache[require.resolve(`components/${moduleName}/data/online`)];
            return require(`components/${moduleName}/data/online`);
        },
        removeModules() {
            if (this.isMoudles) {
                MessageBox.confirm('此操作将清空当前所有组件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('removeAllModules')
                    Message.success("清空成功！")
                }).catch(err => {
                    Message.info("已取消操作！")
                });
            } else {
                Message.warning("暂无数据！")
            }
        },
        saveModules() {
            let sModules = JSON.stringify(this.modules)
            let localModules = ""
            if (sessionStorage.getItem("modules")) {
                localModules = sessionStorage.getItem("modules")
            }
            if (sModules != localModules) {
                MessageBox.confirm('是否保存当前修改', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loadingInstance = Loading.service({ fullscreen: true, text: "数据正在传递……" });
                    this.generateImage().then(resImage => {
                        this.$http.post(this.url(`console&c=${window.apiAuthority}&a=save`), qs.stringify({
                            id: this.modulesId,
                            data: sModules,
                            pic: resImage
                        })).then(res => {
                            if (res.data.error == 0) {
                                Message.success("保存成功！")
                                this.$store.dispatch('updatePagePic', {
                                    pic: resImage,
                                    id: this.modulesId,
                                })
                                loadingInstance.close()
                                sessionStorage.setItem("modules", JSON.stringify(this.modules))
                            } else {
                                Message.error("保存失败！")
                            }
                        }).catch(err => {
                            console.error(err)
                            Message.error("保存失败！")
                        })
                    }, rej => {
                        Message.error("图片生成失败！")
                    })
                }).catch(() => {
                    Message.info("已取消操作！")
                })
            } else {
                Message.warning("当前页面无任何改动！")
            }
        },
        restoreModules() {
            MessageBox.confirm('是否还原成默认数据？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let loadingInstance = Loading.service({ fullscreen: true, text: "数据正在传递……" });
                this.$http.post(this.url(`console&c=${window.apiAuthority}&a=restore`)).then(({ data: { keep: { data } } }) => {
                    loadingInstance.close()
                    this.$store.dispatch('updateModules', {
                        modules: JSON.parse(data)
                    })
                })
            }).catch(err => {
                console.error()
            })
        }
    },
    computed: {
        isMoudles() {
            return 0 < this.modules.length ? true : false
        },
        ...mapState({
            editArea: state => state.dashboard.configInfo.editArea,
            bUpdateModules: state => state.dashboard.bUpdateModules,
            modulesId: state => state.pageSetting.modulesId,
            menuComponent: state => state.dashboard.configInfo.headerMenu.menuComponent,
            sDefault: state => state.pageSetting.default
        }),
        bStore() {
            return window.shopInfo.ruid != 0
        },
        modules: {
            get() {
                return this.$store.state.modules
            },
            set(value) {
                this.$store.dispatch('updateModules', {
                    modules: value
                })
            }
        }
    }
}

</script>

<style lang="scss" scoped>
@import '../../../assets/style/config';
@import '../../../assets/style/mixins/common';
header {
    height: ($tab-height+.4rem);
    background: $tool-bg;
    padding: 0 1rem;
    @include direction(center, space-between)
}

header h4 {
    float: left;
    font-weight: normal;
    font-size: $tool-title-size
}

header .compontent-tool {
    float: right;
}

header .compontent-tool label {
    margin-left: $icon-margin * 1.5;
    color: #555;
    cursor: pointer;
    font-size: 1.4rem;
}

header .compontent-tool label i.iconfont {
    margin-right: ($icon-margin)
}

.edit-area-con {
    background: $write-color;
    position: absolute;
    width: 100%;
    padding: 1.4rem;
    top: ($tab-height+.4rem);
    bottom: 0rem;
    overflow-y: scroll;
}

.edit-area-con.no {
    background: url('../../../assets/images/admin_edit.jpg') no-repeat center center;
}

.component {
    margin-bottom: .8rem
}

.component:last-child {
    margin-bottom: 0;
}

.component.hidden {
    visibility: hidden;
}

.flip-list-move {
    transition: transform 0.5s;
}
</style>