<template>
    <div class='page-list'>
        <slot name="addPage"></slot>
        <figure v-for="(item,index) in pageList" :key="index">
            <template>
                <section class="page-list-handle">
                    <a href="javascript:;" class="remove" title="删除" @click.stop="removePage(item.id,item.title)" v-if="bShowPopover">
                        <i class="iconfont icon-clear"></i>
                    </a>
                    <a href="javascript:;" class="editor" :class="{system:!bShowPopover}" title="编辑" @click.stop="editorPage(item.id,item.title)">
                        <i class="iconfont icon-editor1"></i>
                    </a>
                </section>
                <div class="mask"></div>
            </template>
            <img :src="item.pic" alt="" v-if="item.pic" />
            <img src="../../assets/images/default-img.jpg" alt="" v-else>
            <figcaption>
                <!--<ec-popover v-if="bShowPopover" placement="bottom" width="300" trigger="click" :ref="'popover'+item.id">
                                    <popover-ipt-btn :value="item.title" :list-index="index" :popover-ref="'popover'+item.id" :id="item.id" @updateValue="updatePageTitle"></popover-ipt-btn>    
                                </ec-popover>-->
                <i slot="reference" class="iconfont icon-editor" v-if="bShowPopover" @click.stop="showPageDialog(item.id,item.title,item.thumb_pic)"></i>
                <span>{{ item.title }}</span>
            </figcaption>
        </figure>
    </div>
</template>
<script>
// node library
import qs from 'qs'

// mapActions mapState
import { mapActions, mapState } from 'vuex'
// third party components
import {
    Popover,
    MessageBox,
    Message
} from 'element-ui'

// custom components
import PopoverIptBtn from './PopoverIptBtn'

//api
import {
    apiModules
} from 'config'

export default {
    name: 'page-list',
    props: ['pageList', 'system'],
    components: {
        "EcPopover": Popover,
        PopoverIptBtn
    },
    data() {
        return {
            bShowPopover: true
        }
    },
    created() {
        if (this.system)
            this.bShowPopover = false
    },
    beforeMount() {
        this.$store.dispatch('setDocConfig')//将页面列表信息赋值给store  pagelist对象
    },
    methods: {
        showPageDialog(id, title,thumb_pic) {
            this.$emit('custom', {
                id,
                title,
                thumb_pic
            })
        },
        editorPage(id, title) {
            if (id != this.modulesId) {
                let localModules = ""
                let sModules = JSON.stringify(this.modules)
                if (sessionStorage.getItem("modules")) {
                    localModules = sessionStorage.getItem("modules")
                }
                if (sModules != localModules) {
                    apiModules.tipsSaveModules({
                        modulesId: this.modulesId,
                        modules: sModules
                    }).then(resolve => {
                        if (resolve) {
                            this.$store.dispatch("setModuleInfo", {
                                id,
                                title
                            })
                        }
                    }, reject => {
                        if (reject === "messageBox catch") {
                            this.$store.dispatch("setModuleInfo", {
                                id,
                                title
                            })
                        }
                    })
                } else {
                    this.$store.dispatch("setModuleInfo", {
                        id,
                        title
                    })
                }
            }
        },
        removePage(id, title) {
            apiModules.removeModules({
                id,
                title,
            }).then(resolve => {
                if (resolve) {
                    this.$store.dispatch('removePage', {
                        id
                    })
                    Message.success("删除成功！")
                }
            }, reject => {
                if (!reject) Message.error("删除失败！")
                if (reject === "messageBox catch") Message.warning("取消操作！")
            })
        }
    },
    computed: {
        ...mapState({
            modulesId: state => state.pageSetting.modulesId,
            modules: state => state.modules
        })
    }
}

</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.page-list {
    text-align: center;
    .mask {
        top: 2px;
        left: 2px;
        right: 2px;
        bottom: 2.2rem;
        opacity: 0;
        visibility: hidden;
        @include transition(all, .2s);
    }
}

.page-list figure {
    position: relative;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 1.2rem;
    @include transition(all, .2s);
}

.page-list figure.add-page {
    padding: .8rem 0;
    border: 1px solid $border-color-base;
}

.page-list figure.add-page i {
    color: $border-color-base;
    font-size: 3rem;
}


.page-list figure img:hover,
.page-list .add-page:hover {
    cursor: pointer;
    border-color: $link-color;
}

.page-list .add-page:hover i {
    color: $link-color;
}

.page-list figure img {
    width: 100%;
    height: auto;
    padding: 4px;
    border: 1px solid $border-color-base
}

.page-list figcaption {
    position: relative;
    margin-top: .4rem;
    @include translateX(-.4rem);
}

.page-list span {
    font-size: 1.3rem;
    color: #666;
}

.page-list i.icon-editor {
    color: #aaa;
    font-size: 1.3rem;
    margin-right: .4rem;
    cursor: pointer;
}

.page-list input:focus {
    background: #f1f1f1;
}

.page-list-handle {
    display: block;
    width: 7rem;
    height: 2.8rem;
    line-height: 2.8rem;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 123;
    @include translate3d(-50%, -50%, 0);
    a {
        position: absolute;
        width: 2.8rem;
        height: 2.8rem;
        display: block;
        float: left;
        border-radius: 1.4rem;
        border: 1px solid rgba(255, 255, 255, .4);
        opacity: 0;
        visibility: hidden;
        @include transition(all, .2s);
    }
    a:first-of-type {
        left: -1.6rem;
    }
    a:last-of-type {
        right: -1.6rem;
    }
    a:hover {
        background: $link-color;
        border: 1px solid $link-color;
    }
    a.remove:hover {
        background: $color;
        border: 1px solid $color;
    }
    a.editor.system {
        left: 50%;
        @include translateX(-50%);
    }
    i {
        color: #fff;
    }
}

.page-list figure:hover {
    @include transition(all, .2s);
    .mask {
        opacity: 1;
        visibility: visible;
        @include transition(all, .2s);
    }
    a {
        opacity: 1;
        visibility: visible;
        @include transition(all, .2s);
    }
    a.remove {
        left: 0;
    }
    a.editor {
        right: 0;
    }
}
</style>