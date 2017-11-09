<template>
    <div class="b-jigsaw">
        <component-con :modules-index="modulesIndex" :component-name="componentName" :setting="setting">
            <div class="form-group">
                <label class="group-l">
                        显示方式：
                    </label>
                <radio-group v-model="styleSel" size="small">
                    <radio v-for="item in data.showStyle" :key="item.key" :label="item.key">{{ item.title }}</radio>
                </radio-group>
            </div>
            <div class="form-group">
                <label class="group-l">
                        样式：
                    </label>
                <checkbox-group v-model="styleSelList" size="small">
                    <checkbox v-for="item in data.showStyleList" :key="item.key" :label="item.key">{{ item.title }}</checkbox>
                </checkbox-group>
            </div>
            <div class="form-group" v-show="styleSel=='0'">
                <label class="group-l">
                        定位：
                    </label>
                <radio-group v-model="positionSel" size="small">
                    <radio v-for="item in data.showPosition" :key="item.key" :label="item.key">{{ item.title }}</radio>
                </radio-group>
            </div>
            <template v-if="styleSel=='0'">
                <div class="form-group">
                    <label class="group-l">
                        整体比例：
                    </label>
                    <div class="group-r">
                        <ec-input v-model="style1Size" size="small" placeholder="默认1:1"></ec-input>
                        <p class="ec-remark">*图片比例以英文":"隔开，必须两列</p>
                    </div>
                </div>
                <div class="form-group">
                    <label class="group-l">
                        小图等比：
                    </label>
                    <div class="group-r">
                        <ec-input type="number" v-model="style1RightNum" size="small" min="1" max="5" placeholder="默认为一行两张"></ec-input>
                    </div>
                </div>
            </template>
            <div class="form-group" v-show="styleSel=='1'">
                <label class="group-l">
                        比例：
                    </label>
                <div class="group-r">
                    <ec-input v-model="style2Size" size="small" placeholder="请填写默认1:1"></ec-input>
                    <p class="ec-remark">*图片比例以英文":"隔开</p>
                </div>
            </div>
            <img-ipt-url v-for="(item,index) in data.list" :key="index" :info="item" :modules-index="modulesIndex" :list-index="index" :b-edit-img="true" @setDescValue="updateText">
                <span slot="edit-img-close" class="link-close" @click="removeList(index)">
                                <i class="iconfont icon-close"></i>
                            </span>
                <span slot="link-name-close" class="link-name-close" @click="close()">
                                <i class="iconfont icon-close"></i>
                            </span>
            </img-ipt-url>
            <add-btn :add="add" @click.native="addList('imgList')" v-show="oAddBtn"></add-btn>
        </component-con>
    </div>
</template>

<script>
    // mapActions mapState
    import { mapActions, mapState } from 'vuex'
    // custom components
    import ComponentCon from '../element/ComponentCon'
    import AddBtn from '../element/AddBtn'
    import ImgIptUrl from '../element/ImgIptUrl'


    // third party components
    import {
        Radio,
        RadioGroup,
        Checkbox,
        CheckboxGroup,
        Input
    } from 'element-ui'

    // minxin
    import formProcessing from 'mixins/form-processing'

    // localData
    import localData from './data/local'
    export default {
        name: 'b-jigsaw',
        props: ['setting', 'onlineData', 'modulesIndex'],
        mixins: [formProcessing],
        data() {
            return {
                componentName: localData.componentName,
                add: {
                    title: '添加一个广告位',
                },
                maxLength: 6
            }
        },
        components: {
            Radio,
            RadioGroup,
            Checkbox,
            CheckboxGroup,
            ComponentCon,
            AddBtn,
            ImgIptUrl,
            "EcInput": Input
        },
        created(){
        },
        computed: {
            oAddBtn() {
                return this.maxLength <= this.data.list.length ? false : true
            },
            style1RightNum:{
                get() {
                    return this.data.allValue.showStyle1Right
                },
                set(value) {
                    this.updateTitleText('showStyle1Right', value)
                }
            },
            style1Num: {
                get() {
                    return this.data.allValue.showStyle1Num;
                },
                set(value) {
                    this.updateTitleText('showStyle1Num', value)
                }
            },
            style1Size: {
                get() {
                    return this.data.allValue.showStyle1Size;
                },
                set(value) {
                    let reg = new RegExp(`^[0-9]:[0-9]$`),
                        bTestReg = reg.test(value)
                    if (bTestReg) {
                        this.updateTitleText('showStyle1Size', value)
                    }
                }
            },
            style2Size: {
                get() {
                    return this.data.allValue.showStyle2Size;
                },
                set(value) {
                    let reg = new RegExp(`^([0-9]:){1,${this.maxLength}}[0-9]$`),
                        bTestReg = reg.test(value)
                    if (bTestReg) {
                        this.updateTitleText('showStyle2Size', value)
                    }
                }
            },
            styleSel: {
                get() {
                    return this.data.isStyleSel
                },
                set(value) {
                    this.updateRadioSel('isStyleSel', value)
                }
            },
            styleSelList: {
                get() {
                    return this.data.styleSelList;
                },
                set(value) {
                    this.updateRadioSel('styleSelList', value)
                }
            },
            positionSel: {
                get() {
                    return this.data.isPositionSel;
                },
                set(value) {
                    this.updateRadioSel('isPositionSel', value)
                }
            },
            data() {
                return Object.assign({}, localData.data, this.onlineData)
            }
        }
    }

</script>