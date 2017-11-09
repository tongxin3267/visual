<template>
    <div class='img-ipt-url'>
        <div class="url-edit-img">
            <slot name="edit-img-close"></slot>
                <edit-img :image="info.img" :modules-index="modulesIndex" :list-index="listIndex" v-show="bEditImg"></edit-img>
                <div class="edit-input">
                    <div class="form-group">
                        <label class="group-l">
                            描述：
                        </label>
                        <div class="group-r">
                            <ec-input v-model="desc" size="small" placeholder="添加描述"></ec-input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="group-l">链接：</label>
                        <div class="group-r">
                            <menu-link :catetory="info.urlCatetory" :url-name="info.urlName" :modules-index="modulesIndex" :list-index="listIndex">
                                <span class="link-name-close" slot="link-name-close" @click.stop="removeMenuUrl">
                                    <i class="iconfont icon-close"></i>
                                </span>
                            </menu-link>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
//custom components
import MenuLink from './MenuLink'
import EditImg from './EditImg'
import PopoverIptBtn from './PopoverIptBtn'

import { Input, Popover } from 'element-ui'

//mixins
import fromProcessing from 'mixins/form-processing'

export default {
    name: 'img-ipt-url',
    props: {
        info: {
            type: Object,
            required: true
        },
        bEditImg: {
            type: Boolean,
            required: true
        },
        listIndex: {
            type: Number,
            required: true
        },
        modulesIndex: {
            type: Number,
            required: true
        }
    },
    mixins: [fromProcessing],
    components: {
        "EcInput": Input,
        "EcPopover": Popover,
        PopoverIptBtn,
        MenuLink,
        EditImg
    },
    data() {
        return {

        }
    },
    beforeMount() {

    },
    methods: {
        removeMenuUrl() {
            this.$store.dispatch('removeMenuUrl', {
                modulesIndex: this.modulesIndex,
                listIndex: this.listIndex
            })
        }
    },
    computed: {
        bStore() {
            return window.shopInfo.ruid != 0
        },
        desc: {
            get() {
                return this.info.desc
            },
            set(value) {
                this.$emit("setDescValue", {
                    listIndex: this.listIndex,
                    attrListName: "list",
                    newValue: value
                })
            }
        }
    }

}

</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.url-edit-img {
    box-sizing: border-box;
    border-radius: .4rem;
    padding: 1.2rem 1rem;
    max-width: 60rem;
    margin-top: 1.4rem;
    position: relative;
    border: 1px solid $border-color-split;
    @include direction(center, flex-start)
}

.link-close,
.link-name-close {
    position: absolute;
    right: -.9rem;
    top: -.9rem;
    color: #fff;
    text-align: center;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 1.8rem;
    background: rgba(0, 0, 0, .4);
    border-radius: 9999px;
    transform: scale(.9);
    display: none;
}

.url-edit-img:hover .link-close {
    display: block;
    cursor: pointer;
}

.link-close i {
    font-size: .8rem;
    font-weight: bold;
}

.edit-input {
    flex: 1;
    width: 60%;
}

.edit-input .group-r {
    flex: 1;
    width: 70%;
}
</style>