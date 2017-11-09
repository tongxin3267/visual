<template>
    <component-con :modules-index="modulesIndex" :component-name="componentName" :setting="setting">
        <div class="form-group">
            <label class="group-l">
                标题：
            </label>
            <div class="group-r">
                <ec-input type="text" size="small" v-model="searchValue"></ec-input>
            </div>
        </div>
        <div class="form-group" v-if="!bStore">
            <label class="group-l">
                定位：
            </label>
            <radio-group v-model="positionSel" size="small">
                <radio v-for="item in data.positionSel" :key="item.key" :label="item.key">{{ item.title }}</radio>
            </radio-group>
        </div>
        <div class="form-group" v-show="positionSel == '0'" v-if="!bStore">
            <label class="group-l">
                Key：
            </label>
            <div class="group-r">
                <ec-input type="text" size="small" v-model="tenKey" placeholder="请输入腾讯地图key，空为初始值"></ec-input>
            </div>
        </div>
        <div class="form-group" v-if="!bStore">
            <label class="group-l">
                消息：
            </label>
            <radio-group v-model="messageSel" size="small">
                <radio v-for="item in data.messageSel" :key="item.key" :label="item.key">{{ item.title }}</radio>
            </radio-group>
        </div>
        <div class="form-group">
            <label class="group-l">
                悬浮：
            </label>
            <radio-group v-model="suspendSel" size="small">
                <radio v-for="item in data.suspendSel" :key="item.key" :label="item.key">{{ item.title }}</radio>
            </radio-group>
        </div>
        <div class="form-group">
            <label class="group-l">
                字体颜色：
            </label>
            <div class="group-r">
                <color-input v-model="fontColor" placeholder="默认为黑色"></color-input>
                <p class="ec-remark">*该颜色头部悬浮后改变</p>
            </div>
        </div>
        <div class="form-group">
            <label class="group-l">
                背景颜色：
            </label>
            <div class="group-r">
                <color-input v-model="bgColor" placeholder="默认为主色系"></color-input>
            </div>
        </div>
         <div class="form-group">
            <label class="group-l">
                
            </label>
            <div class="group-r">
                 <p class="ec-remark">*该组件需放置第一个</p>
            </div>
        </div>
    </component-con>
</template>

<script>
// custom components
import ComponentCon from '../element/ComponentCon'
import ColorInput from '../element/ColorInput'

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
    name: 'b-search',
    props: ['setting', 'onlineData', 'modulesIndex'],
    mixins: [formProcessing],
    data() {
        return {
            componentName: localData.componentName
        }
    },
    components: {
        Radio,
        RadioGroup,
        ComponentCon,
        "EcInput": Input,
        ColorInput
    },
    beforeMount() {
    },
    computed: {
        bStore(){
            return window.shopInfo.ruid != 0
        },
        tenKey: {
            get() {
                return this.data.allValue.tenKey
            },
            set(value) {
                this.updateTitleText('tenKey', value)
            }
        },
        searchValue: {
            get() {
                return this.data.allValue.searchValue
            },
            set(value) {
                this.updateTitleText('searchValue', value)
            }
        },
        fontColor:{
            get(){
                return this.data.allValue.fontColor
            },
            set(value){
                this.updateTitleText('fontColor', value)
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
        positionSel: {
            get() {
                return this.data.isPositionSel
            },
            set(value) {
                this.updateRadioSel('isPositionSel', value)
            }
        },
        messageSel: {
            get() {
                return this.data.isMessageSel
            },
            set(value) {
                this.updateRadioSel('isMessageSel', value)
            }
        },
        suspendSel: {
            get() {
                return this.data.isSuspendSel
            },
            set(value) {
                this.updateRadioSel('isSuspendSel', value)
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