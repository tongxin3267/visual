<template>
    <div class='b-store'>
        <component-con :modules-index="modulesIndex" :component-name="componentName" :setting="setting">
            <div class="form-group">
                <label class="group-l">
                    显示数量：
                </label>
                <div class="group-r">
                    <ec-input type="number" size="small" v-model="number" placeholder="默认显示10个店铺"></ec-input>
                    <p class="ec-remark">*店铺数量最少1个，小于1默认为1个</p>
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
    name: 'b-store',
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
        DatePicker,
    },
    mounted() {

    },
    computed: {
        number: {
            get() {
                return this.data.allValue.number < 1 ? 1 : this.data.allValue.number
            },
            set(value) {
                if (value < 1) {
                    value = 1
                }
                this.updateTitleText('number', Number(value))
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