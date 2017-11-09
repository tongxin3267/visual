<template>
    <div class='b-line'>
        <component-con :modules-index="modulesIndex" :component-name="componentName" :setting="setting">
            <div class="form-group">
                <label class="group-l">
                        显示高度：
                    </label>
                <div class="group-r">
                    <slider v-model="nHeight" :min="1" :max="20"></slider>
                </div>
            </div>
            <div class="form-group">
                <label class="group-l">
                        背景颜色：
                    </label>
                <div class="group-r">
                    <color-input v-model="bgColor" placeholder="默认为透明色"></color-input>
                </div>
            </div>
        </component-con>
    </div>
</template>

<script>
    // custom components
    import ComponentCon from '../element/ComponentCon'
    import ColorInput from '../element/ColorInput'

    // third party components
    import {
        Slider
    } from 'element-ui'

    // minxin
    import formProcessing from 'mixins/form-processing'

    // localData
    import localData from './data/local'
    export default {
        name: 'b-line',
        props: ['setting', 'onlineData', 'modulesIndex'],
        mixins: [formProcessing],
        data() {
            return {
                componentName: localData.componentName,
            }
        },
        components: {
            ComponentCon,
            Slider,
            ColorInput
        },
        beforeMount() {

        },
        methods: {
           
        },
        computed: {
            nHeight: {
                get() {
                    let height = this.data.allValue.height
                    return isNaN(height) ? 10 : Number(height)
                },
                set(value) {
                    this.updateTitleText('height', value)
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
            data() {
                return Object.assign({}, localData.data, this.onlineData)
            }
        }
    }

</script>

<style scoped>

</style>