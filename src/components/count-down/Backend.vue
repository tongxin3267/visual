<template>
    <div class='b-count-down'>
        <component-con :modules-index="modulesIndex" :component-name="componentName" :setting="setting">
            <div class="form-group">
                <label class="group-l">
                        样式：
                    </label>
                <radio-group v-model="styleSel" size="small">
                    <radio v-for="item in data.showStyle" :key="item.key" :label="item.key">{{ item.title }}</radio>
                </radio-group>
            </div>
            <div class="form-group">
                <label class="group-l">
                        标题图片：
                    </label>
                <div class="group-r">
                    <edit-img :image="data.allValue.titleImg" :modules-index="modulesIndex" all-values-type="titleImg"></edit-img>
                </div>
            </div>
            <div class="form-group" v-show="styleSel == '1'">
                <label class="group-l">
                        大图图片：
                    </label>
                <div class="group-r">
                    <edit-img :image="data.allValue.productImg" :modules-index="modulesIndex" all-values-type="productImg"></edit-img>
                    <p class="ec-remark">*大图高度最好不超过右侧高度</p>
                </div>
            </div>
            <div class="form-group">
                <label class="group-l">
                        秒杀描述：
                    </label>
                <div class="group-r">
                    <ec-input size="small" v-model="spikeDesc" placeholder="众多精美商品等你秒杀"></ec-input>
                </div>
            </div>
            <div class="form-group">
                <label class="group-l">
                        倒计时：
                    </label>
                <div class="group-r">
                    <date-picker v-model="endTime" type="datetime" size="small" placeholder="选择时间" :clearable="false" :editable="false"></date-picker>
                </div>
            </div>
            <div class="form-group">
                <label class="group-l">
                        商品数量：
                    </label>
                <div class="group-r">
                    <ec-input type="number" size="small" v-model="number" placeholder="默认10张图片"></ec-input>
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
        CheckboxGroup,
        Checkbox,
        Radio,
        RadioGroup,
        Input,
        DatePicker
    } from 'element-ui'

    // minxin
    import formProcessing from 'mixins/form-processing'

    // localData
    import localData from './data/local'

    export default {
        name: 'b-count-down',
        props: ['setting', 'onlineData', 'modulesIndex'],
        mixins: [formProcessing],
        data() {
            return {
                componentName: localData.componentName
            }
        },
        components: {
            Radio,
            Checkbox,
            CheckboxGroup,
            RadioGroup,
            ComponentCon,
            "EcInput": Input,
            EditImg,
            DatePicker
        },
        created() {
            
        },
        computed: {
            number:{
                get() {
                    return this.data.allValue.number
                },
                set(value) {
                    this.updateTitleText('number', Number(value))
                }
            },
            spikeDesc: {
                get() {
                    return this.data.allValue.spikeDesc
                },
                set(value) {
                    this.updateTitleText('spikeDesc', value)
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
            endTime: {
                get() {
                    return this.data.allValue.endTime
                },
                set(value) {
                    this.updateTitleText('endTime', value)
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