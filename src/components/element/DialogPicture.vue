<template>
    <div>
        <ec-dialog 
            class="dialog-ec dialog-picture" 
            size="small" top="10%" 
            :visible.sync="bThisShowDialog" 
            @close="thisClose">
            <template v-if="tabSelect == 'picture'">
                <div slot="title" class="el-dialog__title">
                    我的图片
                    <span class="select-num" v-show="this.oneOrMore == 'more'">已选择
                        <em>{{pictureLength}}</em> 张</span>
                    <a href="javascript:;" @click.stop="updatePicture" class="select-a">刷新</a>
                </div>
                <div class="sidebar">
                    <nav>
                        <ul>
                            <li 
                                v-for="(item,index) in thumbList" 
                                :key="index"
                                :class="{'show':item.bActive}">
                                <a 
                                    href="javascript:;" 
                                    :class="{'active':item.album_id == albumId}"
                                     @click.stop="tabThumb(index,item.album_id,item.name)">
                                    <img src="../../assets/images/jiantou.png" alt="">
                                    {{ item.name }}
                                </a>
                                <ul>
                                    <li 
                                        v-for="itemTree in item.tree" 
                                        :key="itemTree.album_id"
                                        :class="{'active':itemTree.album_id == albumId}"
                                        @click.stop="tabThumb(index,itemTree.album_id,itemTree.album_mame)">
                                        {{ itemTree.album_mame }}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
                <ul class="picture-list">
                    <li 
                        v-for="(item,index) in dialogPictureList" 
                        :key="index" 
                        @click="oneMoreSelect(index)">
                        <div class="dialog-picture-active" v-show="item.bActive">
                            <span>
                                <i class="iconfont icon-correct"></i>
                            </span>
                        </div>
                        <figure>
                            <img :src="item.pic_file" alt="">
                            <figcaption :title="item.pic_name">
                                {{ item.pic_name }}
                            </figcaption>
                        </figure>
                    </li>
                </ul>
                <div slot="footer" class="dialog-footer">
                    <pagination 
                        :page-size="pageSize" 
                        :current-page="currentPage" 
                        :total="total" 
                        @current-change="handleCurrentChange" 
                        layout="total, prev, pager, next">
                    </pagination>
                    <div class="button-list">
                        <ec-button 
                            type="info" 
                            @click.native="updaloadImg">
                            上传
                        </ec-button>
                        <ec-button 
                            type="success" 
                            @click.native="confirmSelect">
                            确认选择
                        </ec-button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div slot="title" class="el-dialog__title ec-dialog-titles">
                    <ul>
                        <li>
                            <a href="javascript:;" @click="returnPcture">
                                <i class="iconfont icon-jiantou12"></i>返回
                            </a>
                        </li>
                        <li>上传图片</li>
                    </ul>
                    <p class="ec-dialog-tips">上传至
                        <strong>{{albumName}}</strong>
                        相册
                    </p>
                </div>
                <ec-upload 
                    ref="upload" 
                    :action="sUpload" 
                    :data="{'album_id':albumId}" 
                    list-type="picture-card" 
                    :on-preview="handlePictureCardPreview" 
                    :on-remove="handleRemove" 
                    :auto-upload="false" 
                    accept="image/gif,image/jpeg,image/png" 
                    :multiple="true">
                    <i class="el-icon-plus"></i>
                </ec-upload>
                <div 
                    slot="footer" 
                    class="dialog-footer" 
                    style="justify-content: flex-end;">
                    <div class="button-list">
                        <ec-button 
                            type="success" 
                            @click="submitUpload">
                            开始上传
                        </ec-button>
                    </div>
                </div>
            </template>
        </ec-dialog>
        <ec-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
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
    Table,
    TableColumn,
    Button,
    Loading,
    Dialog,
    Pagination,
    Upload
} from 'element-ui'

export default {
    name: "dialog-picture",
    props: {
        dialogPictureList: {
            type: Array,
            default: () => {
                return []
            }
        },
        thumbList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {
        "EcDialog": Dialog,
        "EcButton": Button,
        "EcUpload": Upload,
        Pagination
    },
    data() {
        return {
            tabSelect: "picture",
            dialogImageUrl: '',
            dialogVisible: false,
            bThisShowDialog: false,
        }
    },
    created() {
    },
    methods: {
        submitUpload() {
            if (this.tabSelect != 'picture') {
                this.$refs.upload.submit()
            }
        },
        returnPcture() {
            this.tabSelect = "picture"
        },
        updaloadImg() {
            this.tabSelect = ""
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            this.getPicture(this.albumId, currentPage)
        },
        updatePicture() {
            this.getPicture(this.albumId, this.currentPage)
        },
        tabThumb(index, albumId, albumName) {
            if (albumId == this.albumId) {
                return false
            }
            this.getPicture(albumId, 1)
            this.$store.dispatch('tabThumb', {
                index,
                albumId,
                albumName
            })
        },
        getPicture(albumId, currentPage) {
            let o = {
                albumId,
                currentPage,
                bShowDialog: true,
                oneOrMore: this.oneOrMore,
                pageSize: this.pageSize,
                modulesIndex: this.modulesIndex,
                residueLength: this.residueLength,
                maxLength: this.maxLength
            }
            if (this.allValuesType) {
                o.allValuesType = this.allValuesType
            } else {
                o.listIndex = this.listIndex
            }
            this.$store.dispatch('setDialogPicture', o)
        },
        confirmSelect() {
            let aSelectPic = []
            let sDispatch = ""

            if (this.listIndex || this.listIndex == 0 || this.allValuesType) {
                this.dialogPictureList.forEach(v => {
                    if (v.bActive) {
                        let o = {
                            desc: "",
                            url: "",
                            urlCatetory: "",
                            urlName: "",
                            img: v.pic_file
                        }
                        aSelectPic.push(o)
                    }
                })
                sDispatch = "updatePicture"
            } else {
                if (sessionStorage.getItem("aPicture")) {
                    let sLocalPicture = sessionStorage.getItem("aPicture")
                    let aPicture = JSON.parse(sLocalPicture)
                    aPicture.forEach(v => {
                        let o = {
                            desc: "",
                            url: "",
                            urlCatetory: "",
                            urlName: "",
                            img: v.pic_file
                        }
                        aSelectPic.push(o)
                    })
                }
                sDispatch = "addListPicture"
            }
            this.$store.dispatch(sDispatch, {
                aSelectPic
            })
            this.thisClose()
        },
        oneMoreSelect(index) {
            this.$store.dispatch('oneMoreSelect', {
                listIndex: index
            })
        },
        thisClose() {
            sessionStorage.removeItem("aPictureId")
            this.$store.dispatch('onOffDialogPicture', {
                bShowDialog: false
            })
        },
        //Upload
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    computed: {
        ...mapState({
            bShowDialog: state => state.dialogPicture.settingType.bShowDialog,
            allValuesType: state => state.dialogPicture.settingType.allValuesType,
            modulesIndex: state => Number(state.dialogPicture.settingType.modulesIndex),
            listIndex: state => Number(state.dialogPicture.settingType.listIndex),
            total: state => Number(state.dialogPicture.settingType.total),
            pageSize: state => Number(state.dialogPicture.settingType.pageSize),
            currentPage: state => Number(state.dialogPicture.settingType.currentPage),
            oneOrMore: state => state.dialogPicture.settingType.oneOrMore,
            albumId: state => state.dialogPicture.settingType.albumId,
            albumName: state => state.dialogPicture.settingType.albumName,
            residueLength: state => state.dialogPicture.settingType.residueLength,
            maxLength: state => state.dialogPicture.settingType.maxLength,
            pictureLength: state => state.dialogPicture.settingType.pictureLength
        }),
        localHttp() {
            return !this.release ? `${window.ROOT_PIC}${window.PC_URL}` : window.PC_URL
        },
        sUpload() {
            return getUrl(`console&c=${window.apiAuthority}&a=upload`)
        }
    },
    watch: {
        bShowDialog(val, oldVal) {
            this.bThisShowDialog = val
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.dialog-picture ul.picture-list {
    overflow: hidden;
    margin-left: 12rem;
}

.dialog-picture ul.picture-list li {
    width: 24.4%;
    margin: .3%;
    text-align: center;
    position: relative;
    float: left;
    background: rgba(0, 0, 0, .03);
    box-sizing: border-box;
    border: 2px solid #fff;
}

.dialog-picture ul.picture-list li:hover {
    border: 2px solid #20a0ff;
    cursor: pointer;
}

.dialog-picture ul.picture-list li .dialog-picture-active {
    position: absolute;
    background: rgba(32, 160, 255, .08);
    border: 2px solid #20a0ff;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1
}

.dialog-picture ul.picture-list li .dialog-picture-active span {
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

.dialog-picture ul.picture-list li .dialog-picture-active span i {
    font-size: 1.6rem;
}

.dialog-picture ul.picture-list li figure {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 13rem;
}

.dialog-picture ul.picture-list li figcaption {
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

.dialog-picture ul.picture-list li img {
    max-width: 100%;
    max-height: 100%;
}

.dialog-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.sidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 12rem;
    background: #e7ecec;
    overflow-y: auto;
    float: left;
}

.sidebar nav ul {
    margin-left: 0;
    width: 100%;
}

.sidebar nav li {
    font-size: 1.28rem;
    color: #666;
    width: 100%;
    cursor: pointer;
    user-select: none;
    &.show{
        background:#f4f4f4;
        font-weight: bold;
        img{
            transform:rotate(90);
            -ms-transform:rotate(90deg); 	/* IE 9 */
            -moz-transform:rotate(90deg); 	/* Firefox */
            -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
            -o-transform:rotate(90deg); 
        }
        ul{
            display:inherit;
        }
    }
    ul{
        display:none;
    }
    ul li {
        padding:.6rem 1rem;
        padding-left:2.2rem;
    }
    ul li:first-of-type{
        padding-top:0;
    }
}

.sidebar nav li a{
    color: #333;
    display:block;
    padding: .8rem 1rem;
    &.active{
        color: #000;
    }
    img{
        display:inline-block;
        width:.8rem;
        height:auto;
    }
}

.sidebar nav li.active {
    color: #3eb1fa;
}

.dialog-picture .el-dialog__title {
    display: inline-block;
}

.dialog-picture .select-num {
    font-size: 12px;
    font-weight: normal;
    color: #777;
    margin-left: 1rem;
}

.dialog-picture .select-num em {
    color: #000;
}

.dialog-picture .select-a {
    font-size: 13px;
    font-weight: normal;
}

.ec-dialog-titles ul li {
    display: inline-block;
    margin-right: .6rem;
}

.ec-dialog-titles ul li i {
    font-size: 14px;
}

.ec-dialog-tips {
    color: #666;
    font-size: 1.3rem;
    margin-left: 20px;
    position: absolute;
    right: 2rem;
    top: 50%;
    left: 11.4rem;
    transform: translateY(-50%);
    font-weight: normal;
}

@media only screen and (max-width: 1540px) {
    .dialog-picture ul.picture-list li figure {
        height: 11rem;
    }
}

@media only screen and (max-width: 1440px) {
    .dialog-picture ul.picture-list li figure {
        height: 9rem;
    }
}

//Upload 上传组件
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>