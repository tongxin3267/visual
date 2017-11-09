<template>
    <div class='pages' :class="{'close-page-list':!bPageListTitle}">
        <div class="search" v-show="activeName == 'custom'">
            <div class="search-text">
                <i class="iconfont icon-search"></i>
                <input type="text" placeholder="页面搜索" v-model="searchValue">
            </div>
        </div>
        <tabs class="ec-tabs" v-model="activeName" type="border-card" @tab-click="tabClick()" ref="pageTabs">
            <tab-pane :label="pageListTool.system.text" name="system" :class="'system'">
                <page-list :page-list="systemPageList" :system="true"></page-list>
            </tab-pane>
            <tab-pane :label="pageListTool.custom.text" name="custom" v-if="oCustom">
                <page-list :page-list="customPageList" @custom="updateDialog">
                    <figure slot="addPage" class="add-page" @click.stop="addPage">
                        <i class="iconfont icon-plus"></i>
                    </figure>
                </page-list>
            </tab-pane>
        </tabs>
        <ec-dialog :title="nUpdateId==-1 ? '新增页面' : '修改页面'" size="tiny" v-model="bAddPageDialog" :modal-append-to-body="false" @close="closePageDialog">
            <div class="form-group">
                <label class="group-l">
                    专题名称：
                </label>
                <div class="group-r">
                    <ec-input size="small" :maxlength="15" v-model="sTitle" placeholder="请输入页面名称，15字以内"></ec-input>
                </div>
            </div>
            <div class="form-group">
                <label class="group-l">
                    专题图片：
                </label>
                <div class="group-r">
                    <ec-upload class="custom-uploader" ref="upload" :action="sUpload" :data="uploadData" :show-file-list="false" :auto-upload="false" :before-upload="beforeAvatarUpload" :on-change="changeAvatarUpload" :on-success="successAvatarUpload" accept="image/jpeg,image/png">
                        <i class="iconfont icon-plus" v-if="!sImageUrl"></i>
                        <img :src="sImageUrl" class="avatar" v-else>
                    </ec-upload>
                    <p class="ec-remark">图片尺寸建议：640*300，大小不超过200Kb</p>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <ec-button size="small" @click="bAddPageDialog = false">取 消</ec-button>
                <ec-button size="small" type="primary" @click="confirmAddPage">确 定</ec-button>
            </div>
        </ec-dialog>
    </div>
</template>

<script>
//node library
import qs from 'qs'
import url from 'url'

//loadsh library
import debounce from 'lodash/debounce'

// mapActions mapState
import { mapActions, mapState } from 'vuex'

// custom components
import PageList from 'components/element/PageList'

// api
import {
    apiModules
} from 'config'

// third party components
import {
    Tabs,
    TabPane,
    MessageBox,
    Message,
    Dialog,
    Input,
    Button,
    Upload,
    Loading
} from 'element-ui'

export default {
    name: 'pages',
    data() {
        return {
            activeName: 'system',
            sTitle: '',
            bAddPageDialog: false,
            searchValue: '',
            sImageUrl: '',
            bUpdate: false,
            nUpdateId: -1,
            loadingInstance: null
        }
    },
    components: {
        Tabs,
        TabPane,
        PageList,
        MessageBox,
        Message,
        Loading,
        "EcDialog": Dialog,
        "EcInput": Input,
        "EcButton": Button,
        "EcUpload": Upload
    },
    created() {
        this.setPageList()
    },
    mounted() {

    },
    methods: {
        tabClick() {
            let sCurrentName = this.$refs.pageTabs.value
            let sActiveName = this.activeName
            if (sCurrentName != sActiveName) {
                if (sActiveName == 'custom') {
                    let nCustomLen = this.customPageList.length
                    if (nCustomLen > 0) {
                        let nId = this.customPageList[0].id
                        if (this.modulesId != nId)
                            this.$store.dispatch("setModuleInfo", {
                                id: nId
                            })
                    } else {
                        MessageBox.confirm("暂无自定义页面，是否新增？", "提示", {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            setTimeout(() => {
                                this.addPage()
                            }, 400);
                        }).catch(() => {
                            Message.info("您已取消操作！")
                        })
                    }
                } else {
                    let nSystemLen = this.systemPageList.length
                    if (nSystemLen > 0) {
                        let nId = this.systemPageList[0].id
                        if (this.modulesId != nId)
                            this.$store.dispatch("setModuleInfo", {
                                id: nId
                            })
                    }
                }
            }
        },
        updateDialog(o) {
            this.sImageUrl = ""
            this.sTitle = o.title
            let picUrl = ""
            if (o.thumb_pic != "") {
                picUrl = `${window.PC_URL}data/gallery_album/original_img/${o.thumb_pic}`
            }
            this.sImageUrl = picUrl
            this.bAddPageDialog = true
            this.nUpdateId = o.id
        },
        changeAvatarUpload(file, fileList) {
            this.sImageUrl = file.url
            this.$refs.upload.uploadFiles = this.$refs.upload.uploadFiles.filter(item => {
                return Object.is(item.uid, file.uid)
            })
        },
        successAvatarUpload({ error, page }, file) {
            if (error == 0) {
                this.addOrUpdatePage(page)
            } else {
                Message.error("添加失败！")
            }
        },
        beforeAvatarUpload(file) {//添加新页面上传图片前钩子
            const isLt200 = file.size / 1024 < 200
            if (!isLt200) {
                Message.error("上传图片大小不能超过200Kb！")
                setTimeout(() => {
                    this.loadingInstance.close()
                    this.sImageUrl = ""
                }, 300)
            }
            return isLt200
        },
        confirmAddPage() {
            this.loadingInstance = Loading.service({ fullscreen: true, text: "数据正在传递……" });
            if (this.sTitle != "") {
                if (this.$refs.upload.uploadFiles.length > 0) {
                    this.$refs.upload.submit()
                } else {
                    this.$http.post(getUrl(`console&c=${window.apiAuthority}&a=title`), qs.stringify(
                        this.uploadData
                    )).then(({ data: { error, page } }) => {
                        if (error == 0) {
                            this.addOrUpdatePage(page)
                        }
                        if (error == 1) {
                            Message.error("没有权限！")
                            this.loadingInstance.close()
                        }
                    }).catch(err => {
                        this.loadingInstance.close()
                    })
                }
            } else {
                Message.warning('请填写新增页面名称！')
            }
        },
        addOrUpdatePage(page) {
            let o = {
                id: page.id,
                type: page.type,
                default: page.default,
                thumb_pic: page.thumb_pic,
                title: this.sTitle.trims()
            }
            if (this.nUpdateId == -1) {
                this.$store.dispatch("addPage", o)
                this.loadingInstance.close()
                Message.success('页面新增成功！')
                this.$store.dispatch("setModuleInfo", {
                    id: o.id,
                    title: o.title
                })
            } else {
                this.$store.dispatch("updatePage", o)
                this.loadingInstance.close()
                Message.success('页面修改成功！')
            }
            this.nUpdateId = -1
            this.sTitle = ""
            this.sImageUrl = ""
            this.bAddPageDialog = false
        },
        addPage() {
            this.sImageUrl = ""
            this.nUpdateId = -1
            let sLocalModules,
                sModules = JSON.stringify(this.modules)
            if (sessionStorage.getItem("modules")) {
                sLocalModules = sessionStorage.getItem("modules")
            }
            if (!(sLocalModules === sModules)) {
                apiModules.tipsSaveModules({
                    modulesId: this.modulesId,
                    modules: sModules,
                }).then(resolve => {
                    if (resolve) {
                        Message.success("页面保存成功！")
                        setTimeout(() => {
                            this.bAddPageDialog = true
                        }, 700)
                    }
                }, reject => {
                    if (!reject) Message.error("保存失败！")
                    if (reject === "messageBox catch") this.bAddPageDialog = true
                })
            } else {
                this.bAddPageDialog = true
            }
        },
        searchPageList: debounce(function (o) {
            this.$store.dispatch('searchPageList', o)
        }, 600),
        setPageList() {
            return new Promise((resolve, reject) => {
                let ruid = window.shopInfo.ruid
                let sDefault = 3 //1为默认，0为自定义页面，3返回全部页面
                let number = 0
                this.$store.dispatch('initPageModule', {//将pagelist赋值给store  pageList对象
                    ruid: ruid,
                    sDefault,
                    number
                })
            })
        },
        closePageDialog() {
            this.sTitle = ""
            let file = document.querySelector(".custom-uploader .el-upload__input")
            if (file.value) {
                file.value = ""
            } else {
                file.outerHTML = file.outerHTML
            }
            this.$refs.upload.uploadFiles = []
        },
        isEqualTitle(o) {
            this.$store.dispatch(o)
        }
    },
    computed: {
        ...mapState({
            pageListTool: state => state.dashboard.configInfo.pageListTool,
            bPageListTitle: state => state.dashboard.configInfo.headerMenu.pageListTitle.isActive,
            pageList: state => state.pageList,
            systemPageList: state => {
                return state.pageList.filter(item => {
                    return item.default == 1
                })
            },
            customPageList: state => state.customPageList,
            modules: state => state.modules,
            modulesId: state => state.pageSetting.modulesId,
            oCustom: () => window.shopInfo.ruid == 0
        }),
        sUpload() {
            return getUrl(`console&c=${window.apiAuthority}&a=title`)
        },
        uploadData() {
            if (this.nUpdateId != -1) {
                return {
                    title: this.sTitle.trims(),
                    ruid: 0,
                    id: this.nUpdateId
                }
            }
            let oUrl = url.parse(window.location.href,true)
            let topicId = ''
            if(oUrl.query.topic_id){
                topicId = oUrl.query.topic_id
            }
            return {
                title: this.sTitle.trims(),
                ruid: 0,
                topic_id: topicId ? topicId : void 0,
                type: 'topic'
            }
        }
    },
    watch: {
        searchValue(val, oldVal) {
            let nDefault = this.activeName == "system" ? 1 : 0
            this.searchPageList({
                title: val,
                default: nDefault
            })
        }
    }
}

</script>

<style scoped lang="scss">
@import '../../../assets/style/config';
@import '../../../assets/style/mixins/common';
.pages {
    left: 0;
    @include transition(left, .3s)
}

.pages.close-page-list {
    left: -18rem;
    @include transition(left, .3s)
}

.search {
    position: absolute;
    z-index: 11;
    width: 100%;
    top: $tab-height;
    padding: 1.2rem;
    border-bottom: 1px solid $border-color-split;
    background: #fff;
}

.search-text {
    border-radius: 9999px;
    border: 1px solid $border-color-base;
    overflow: hidden;
    position: relative;
    height: 2.4rem;
}

.search-text i {
    font-size: 1.4rem;
    position: absolute;
    left: .8rem;
    color: #999;
    top: 50%;
    @include translateY(-50%);
}

.search input {
    font-size: 1.24rem;
    border: 0;
    height: 2.2rem;
    line-height: 2.2rem;
    position: absolute;
    left: 2.3rem;
    right: -1rem;
    display: inline-block;
    /*width:100%;*/
    color: $text-color;
}

.ec-tabs {
    @include shadow(10px, 0, 20px, raba(0, 0, 0, 0.1));
    border: none !important;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}

.custom-uploader {
    border: 1px dashed $border-color-split;
    max-width: 22rem;
    height: 12rem;
    border-radius: 6px;
    position: relative;
    padding: .8rem;
    @include disFlex();
    @include direction(center, center);
    a {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2.8rem;
        height: 2.8rem;
        line-height: 2.8rem;
        display: block;
        border-radius: 1.4rem;
        border: 1px solid rgba(255, 255, 255, .4); // opacity: 0;
        // visibility: hidden;
        @include transition(all, .2s);
        @include translate3d(-50%, -50%, 0);
        i {
            font-size: 1.6rem;
            color: #fff;
        }
    }
    a:hover {
        background: $color;
    }
}

.custom-uploader i.icon-plus {
    font-size: 4rem;
    display: block;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 12rem;
    color: $border-color-split;
    position: absolute;
}

.custom-uploader img {
    max-width: 20rem;
    max-height: 10rem;
}


.custom-uploader:hover {
    border-color: $link-color;
    cursor: pointer;
}

.custom-uploader:hover i.icon-plus {
    color: $link-color;
}
</style>