<template>
    <div class='b-shop-signs'>
        <component-con :modules-index="modulesIndex" :component-name="componentName" :setting="setting">
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
        name: 'b-shop-signs',
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
            data() {
                return Object.assign({}, localData.data, this.onlineData)
            }
        }
    }

</script>

<style scoped>

</style>