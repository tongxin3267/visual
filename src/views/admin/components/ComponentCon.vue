<template>
    <div id='component-con'>
        <div class="collapse" :class="{close:!isSetting}">
            <header class="title handle">
                <div class="title-left" @click.stop="isShowEditComponent()">
                    <span>
                      {{ componentName }}
                    </span>
                    <span class="rotate-arrow">
                        <i class="iconfont icon-arrow"></i>
                     </span>
                </div>
                <div class="title-right">
                    <ul>
                        <li @click.stop="upModules()" :class="{first:isFirst}">
                            <i class="iconfont icon-sort-arrow"></i>
                        </li>
                        <li @click.stop="downModules()" :class="{last:isLast}">
                            <i class="iconfont icon-sort-arrow"></i>
                        </li>
                        <li @click.stop="removeModules()">
                            <i class="iconfont icon-clear"></i>
                        </li>
                    </ul>
                </div>
            </header>
            <section class="con">
                <slot></slot>
            </section>
        </div>
    </div>
</template>

<script>
    // mapState
    import { mapState } from 'vuex'

    // third party components
    import {
        MessageBox,
        Message
    } from 'element-ui'

    export default {
        name: 'component-con',
        props: ['setting', 'componentName', 'modulesIndex'],
        methods: {
            isShowEditComponent() {
                this.$store.dispatch('isShowEditComponent', {
                    modulesIndex: this.modulesIndex,
                })
            },
            upModules() {
                if (!this.isFirst) {
                    this.$store.dispatch('upModules', {
                        modulesIndex: this.modulesIndex,
                    })
                }
            },
            downModules() {
                if (!this.isLast) {
                    this.$store.dispatch('downModules', {
                        modulesIndex: this.modulesIndex
                    })
                }
            },
            removeModules() {

                MessageBox.confirm('删除该组件，是否继续', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('removeModules', {
                        modulesIndex: this.modulesIndex
                    })
                    Message.success({
                        message: '删除成功!'
                    });
                }).catch(() => {
                    Message.info({
                        message: '已取消操作'
                    });
                });
            }
        },
        computed: {
            ...mapState({
                isFirst(state) {
                    return 0 === this.modulesIndex ? true : false
                },
                isLast(state) {
                    return this.modulesIndex === state.modules.length - 1 ? true : false
                },
            }),
            isSetting(){
                return '0' == this.setting ? false : true
            }
        }

    }

</script>

<style lang="scss" scoped>
    @import '../../../assets/style/config';
    @import '../../../assets/style/mixins/common';
    .title {
        position: relative;
    }
    
    .title-left,
    .title-right {
        position: absolute;
        height: $component-height;
        line-height: $component-height;
    }
    
    .title-left {
        left: .7rem;
        cursor: pointer;
    }
    
    .title-left span {
        min-width: 1rem;
    }
    
    .title-right {
        right: .7rem;
    }
    
    .title-right .iconfont.icon-sort-arrow {
        margin-top: -1px;
        color: #888;
        display: block;
    }
    
    .title-right .iconfont {
        cursor: pointer;
    }
    
    .title-right ul li {
        float: left;
        color: #777;
        margin-left: .4rem;
        cursor: pointer;
        padding:0 1px;
        overflow: hidden;
    }
    
    .title-right ul li.first .iconfont,
    .title-right ul li.last .iconfont {
        color: #bbb;
    }
    
    .title-right ul li:first-of-type .icon-sort-arrow {
        @include ransformRotate(90deg);
    }
    
    .title-right ul li:nth-child(2) .icon-sort-arrow {
        @include ransformRotate(270deg);
    }
    
    .con {
        background: #fff;
    }
</style>