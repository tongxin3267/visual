<template>
    <div class='b-title'>
        <component-con :modules-index="modulesIndex" :component-name="componentName" :setting="setting">
            <div class="form-group">
                <label class="group-l">
                        标题名：
                    </label>
                <div class="group-r">
                    <ec-input v-model="title" size="small" placeholder="填写标题名称"></ec-input>
                </div>
            </div>
            <div class="form-group">
                <label class="group-l">
                        标题模板：
                    </label>
                <radio-group v-model="styleSel" size="small">
                    <radio v-for="(item,index) in data.showStyle" :key="index" :label="item.key">{{ item.title }}</radio>
                </radio-group>
            </div>
            <div v-show="styleSel == '0'">
                <div class="form-group">
                    <label class="group-l">
                        副标题：
                    </label>
                    <div class="group-r input-date-group">
                        <ec-input v-model="fitTitle" size="small" placeholder="请填写" v-show="!bDate"></ec-input>
                        <date-picker v-model="dateTime" type="datetime" size="small" placeholder="选择时间" v-show="bDate"></date-picker>
                        <a href="javascript:;" @click="isShowDate()"><span v-show="!bDate">日期</span><span v-show="bDate">文本</span></a>
                    </div>
                </div>
                <div class="form-group">
                    <label class="group-l">
                        显示：
                    </label>
                    <radio-group v-model="positionSel">
                        <radio v-for="item in data.showPosition" :key="item.key" :label="item.key">{{ item.title }}</radio>
                    </radio-group>
                </div>
                <div class="form-group">
                    <label class="group-l">
                        背景颜色：
                    </label>
                    <div class="group-r">
                        <color-input v-model="bgColor" placeholder="默认为透明色"></color-input>
                    </div>
                </div>
            </div>
            <div v-show="styleSel == '1'">
                <div class="form-group">
                    <label class="group-l">
                        日期：
                    </label>
                    <div class="group-r">
                        <date-picker v-model="dateTime" type="datetime" size="small" placeholder="选择时间"></date-picker>
                    </div>
                </div>
                <div class="form-group">
                    <label class="group-l">
                        作者：
                    </label>
                    <div class="group-r">
                        <ec-input v-model="author" size="small" placeholder="请填写"></ec-input>
                    </div>
                </div>
            </div>
            <div v-show="false">
                <div class="form-group">
                    <label class="group-l">
                        更多连接：
                    </label>
                    <div class="group-r">
                        
                    </div>
                </div>
            </div>
            <template v-if="bTextNav">
                <img-ipt-url :info="data.list[0]" :modules-index="modulesIndex" :list-index="0" :b-edit-img="false" @setDescValue="updateText">
                    <span slot="edit-img-close" class="link-close" @click="removeList(0)">
                                    <i class="iconfont icon-close"></i>
                                </span>
                    <span slot="link-name-close" class="link-name-close">
                                    <i class="iconfont icon-close"></i>
                                </span>
                </img-ipt-url>
            </template>
            <add-btn :add="add" @click.native="addList()" v-if="!bTextNav"></add-btn>
        </component-con>
    </div>
</template>

<script>
    // mapActions mapState
    import {
        mapActions,
        mapState
    } from 'vuex'

    // custom components
    import ComponentCon from '../element/ComponentCon'
    import AddBtn from '../element/AddBtn'
    import ColorInput from '../element/ColorInput'
    import MenuLink from '../element/MenuLink'
    import EditImg from '../element/EditImg'
    import ImgIptUrl from '../element/ImgIptUrl'

    // third party components
    import {
        Radio,
        RadioGroup,
        Checkbox,
        Input,
        DatePicker,
    } from 'element-ui'

    // localData
    import localData from './data/local'

    //mixins
    import formProcessing from 'mixins/form-processing'

    export default {
        name: 'b-title',
        props: ['setting', 'onlineData', 'modulesIndex'],
        mixins: [formProcessing],
        data() {
            return {
                add: {
                    title: '添加一个文本导航',
                },
                componentName: localData.componentName,
            }
        },
        components: {
            Radio,
            RadioGroup,
             Checkbox,
            ComponentCon,
            "EcInput": Input,
            AddBtn,
            ColorInput,
            DatePicker,
            MenuLink,
            EditImg,
            ImgIptUrl
        },
        beforeMount() { },
        methods: {
            /**
             * 修改指定title allValue中的属性值
             * @param { 当前被修改属性 } sName 
             * @param { 新的value } sValue 
             */
            updateTitleText(sName, sValue) {
                let o = {
                    modulesIndex: this.modulesIndex,
                    dataNext: "allValue",
                    attrName: sName,
                    newValue: sValue
                }
                this.updateText(o)
            },
            /**
             * 点击切换时间文本值
             */
            isShowDate() {
                if (this.bDate) {
                    this.updateRadioSel('isDate', "0")
                } else {
                    this.updateRadioSel('isDate', "1")
                }

            }
        },
        computed: {
            bTextNav() {
                return this.data.list.length > 0 ? true : false
            },
            bStyleSelTradition() {
                return this.styleSel == "0" ? true : false
            },
            bStyleSelWX() {
                return this.styleSel == "1" ? true : false
            },
            bDate() {
                return this.data.isDate != "0" ? true : false
            },
            bSimplify() {
                return this.styleSel == "2" ? true : false
            },
            styleSel: {
                get() {
                    return this.data.isStyleSel;
                },
                set(value) {
                    this.updateRadioSel('isStyleSel', value)
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
            title: {
                get() {
                    return this.data.allValue.title
                },
                set(value) {
                    this.updateTitleText('title', value)
                }
            },
            fitTitle: {
                get() {
                    return this.data.allValue.fitTitle
                },
                set(value) {
                    this.updateTitleText('fitTitle', value)
                }
            },
            author: {
                get() {
                    return this.data.allValue.author
                },
                set(value) {
                    this.updateTitleText('author', value)
                }
            },
            bgImg: {
                get() {
                    return this.data.allValue.bgImg
                },
                set(value) {
                    this.updateTitleText('bgImg', value)
                }
            },
            bgColor: {
                get() {
                    return this.data.allValue.bgColor
                },
                set(value) {
                    this.updateTitleText('bgColor', value)
                }
            },
            dateTime: {
                get() {
                    return this.data.allValue.dateTime
                },
                set(value) {
                    this.updateTitleText('dateTime', value)
                }
            },
            data() {
                return Object.assign({}, localData.data, this.onlineData)
            }
        }
    }

</script>

<style lang="scss" scoped>

</style>