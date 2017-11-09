<template>
    <div class='b-announcement'>
        <component-con :modules-index="modulesIndex" :component-name="componentName" :setting="setting">
            <div class="form-group" v-if="bStyleSel">
                <label class="group-l">
                        显示方式：
                    </label>
                <radio-group v-model="styleSel" size="small">
                    <radio v-for="item in data.showStyle" :key="item.key" :label="item.key">{{ item.title }}</radio>
                </radio-group>
            </div>
            <div class="form-group">
                <label class="group-l">
                        ICON：
                    </label>
                <div class="group-r">
                    <edit-img :image="onlineData.allValue.img" :modules-index="modulesIndex" all-values-type="img"></edit-img>
                    <p class="ec-remark">*图片建议宽度：72px，高度：72px，大小不超过200kb</p>
                </div>
            </div>
             <div class="form-group" v-show="bNews">
                <label class="group-l">
                        显示日期：
                    </label>
                <radio-group v-model="dateSel" size="small">
                    <radio v-for="item in data.showDate" :key="item.key" :label="item.key">{{ item.title }}</radio>
                </radio-group>
            </div>
            <div class="form-group" v-show="!bNews">
                <label class="group-l">
                        公告内容：
                    </label>
                 <div class="group-r">
                    <ec-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" v-model="announContent"></ec-input>
                    <p class="ec-remark">*项目正式发布可实现无缝滚动功能</p>
                </div>
            </div>
        </component-con>
    </div>
</template>

<script>
    // custom components
    import ComponentCon from '../element/ComponentCon'
    import EditImg from '../element/EditImg'

    // third party components
    import {
        Radio,
        RadioGroup,
        Input
    } from 'element-ui'

    // minxin
    import formProcessing from 'mixins/form-processing'

    // localData
    import localData from './data/local'

    export default {
        name: 'b-announcement',
        props: ['setting', 'onlineData', 'modulesIndex'],
        mixins: [formProcessing],
        data() {
            return {
                componentName: localData.componentName,
            }
        },
        components: {
            Radio,
            RadioGroup,
            ComponentCon,
            EditImg,
            "EcInput": Input
        },
        beforeMount() {
        },
        methods: {
        },
        computed: {
            bStyleSel(){
                return window.shopInfo.ruid == 0
            },
            bNews(){
                return this.styleSel == "0" ? true : false;
            },
            announContent:{
                get(){
                    return this.data.allValue.announContent
                },
                set(value){
                    this.updateTitleText('announContent', value)
                }
            },
            styleSel: {
                get() {
                    return window.shopInfo.ruid == 0 ? this.data.isStyleSel : 1
                },
                set(value) {
                    this.updateRadioSel('isStyleSel', value)
                }
            },
            dateSel:{
                get() {
                    return this.data.isDateSel
                },
                set(value) {
                    this.updateRadioSel('isDateSel', value)
                }
            },
            data() {
                return Object.assign({}, localData.data, this.onlineData)
            }
        }

    }

</script>

<style scoped>

</style>