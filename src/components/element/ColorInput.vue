<template>
    <div class='color-input'>
        <ec-input v-model="ecValue" class="color-value" size="small" :placeholder="placeholder"></ec-input>
        <input v-model="ecValue" class="color-select" type="color" />
    </div>
</template>

<script>
    // third party components
    import {
        Input
    } from 'element-ui'

    export default {
        name: 'color-input',
        props: ["value","placeholder"],
        components: {
            "EcInput": Input
        },
        data() {
            return {
            }
        },
        beforeMount() {
        },
        methods: {
            isColor(sColor){
                let bColor = /^#([0-9a-fA-F]{6})$/
                return bColor.test(sColor)
            }
        },
        computed: {
            ecValue:{
                get(){
                    return this.value
                },
                set(value){
                    if(this.isColor(value) || value == "") this.$emit('input',value)
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
   @import '../../assets/style/config';
    .color-input {
        width: 100%;
        display: inline-table;
    }
    
    .color-value {
        display: table-cell;
        vertical-align: middle;
        width: 100%;
    }
    
    .color-value .el-input__inner {}
    
    .color-select {
        width: 30px;
        height: 30px;
        padding: 1px 2px;
        margin: 0;
        background: #fff;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        display: table-cell;
        border: 1px solid $border-color-split;
        border-left: 0;
    }
</style>