<template>
    <div class='b-blank'>
        <component-con :modules-index="modulesIndex" :component-name="componentName" :setting="setting">
            <div class="form-group">
                <label class="group-l">
                        显示高度：
                    </label>
                <div class="group-r">
                    <slider v-model="nHeight" :step="2" :min="0" :max="30"></slider>
                </div>
            </div>
        </component-con>
    </div>
</template>

<script>
    // custom components
    import ComponentCon from '../element/ComponentCon'

    // third party components
    import {
        Slider
    } from 'element-ui'

    // minxin
    import formProcessing from 'mixins/form-processing'

    // localData
    import localData from './data/local'
    export default {
        name: 'b-blank',
        props: ['setting', 'onlineData', 'modulesIndex'],
        mixins: [formProcessing],
        data() {
            return {
                componentName: localData.componentName
            }
        },
        components: {
            ComponentCon,
            Slider
        },
        methods: {
           
        },
        computed: {
            nHeight: {
                get() {
                    let height = this.data.allValue.height
                    return isNaN(height) ? 4 : Number(height)
                },
                set(value) {
                    this.updateTitleText('height', value)
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