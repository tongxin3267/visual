<template>
    <div class='b-product'>
        <component-con
            :modules-index="modulesIndex"
            :component-name="componentName"
            :setting="setting">
            <div class="form-group">
                <label class="group-l">
                    风格：
                </label>
                <radio-group
                    v-model="styleSel"
                    size="small">
                    <radio
                        v-for="item in data.showStyle"
                        :key="item.key"
                        :label="item.key">
                            {{ item.title }}
                    </radio>
                </radio-group>
            </div>
            <div
                class="form-group"
                v-if="styleSel == '0'">
                <label class="group-l">
                    尺寸：
                </label>
                <radio-group
                    v-model="sizeSel"
                    size="small">
                    <radio
                        v-for="item in data.showSize"
                        :key="item.key"
                        :label="item.key">
                            {{ item.title }}
                    </radio>
                </radio-group>
            </div>
            <div
                class="form-group form-group--remak"
                v-if="styleSel == '0'">
                <label class="group-l"></label>
                 <div class="group-r">
                    <p class="ec-remark">*预览状态显示默认缩略图，正式发布可于前台查看正式效果</p>
                </div>
            </div>
            <div class="form-group">
                <label class="group-l">
                    分类：
                </label>
                <div class="group-r">
                    <cascader 
                        class="cascader"
                        :options="categoryCOption || []"
                        v-model="categorySOption"
                        clearable
                        filterable
                        change-on-select
                        :props="categoryCProps"
                        size="small"
                        placeholder="点击选择或直接搜索">
                    </cascader>
                </div>
            </div>
            <div class="form-group">
                <label class="group-l">
                    品牌：
                </label>
                <div class="group-r">
                    <ec-select 
                        class="brand-select"
                        size="small" 
                        v-model="brandSelect" 
                        clearable
                        filterable
                        placeholder="点击选择或直接搜索">
                        <ec-option 
                            v-for="item in brandList" 
                            :key="item.brand_id"
                            :label="item.brand_name"
                            :value="item.brand_id">
                        </ec-option>
                    </ec-select>
                </div>
            </div>
             <div class="form-group">
                <label class="group-l">
                    模块：
                </label>
                <radio-group v-model="moduleSel" size="small">
                    <radio
                        v-for="item in data.showModule" 
                        :key="item.key" 
                        :label="item.key">
                            {{ item.title }}
                    </radio>
                </radio-group>
            </div>
            <div class="form-group">
                <label class="group-l" style="">
                    选择商品：
                </label>
                <div class="group-r">
                    已选择 {{ selGoodNum }} 个商品 
                    <a href="javascript:;" @click="openDialogGoods()"> 点击选择</a> 
                    <a href="javascript:;" class="clear" @click="clearSelGoods({
                        modulesIndex
                    })"> [ 清空 ]</a>
                </div>
            </div>
            <div class="form-group form-group--remak">
                <label class="group-l" style="">
                </label>
                <div class="group-r">
                    <p class="ec-remark">*如果选中特定的商品时，则按照选定的商品进行显示，否则则根据，分类、品牌、模块进行筛选</p>
                </div>
            </div>
            <div class="form-group">
                <label class="group-l">
                    显示标签：
                </label>
                <checkbox-group v-model="tagSelList" size="small">
                    <checkbox 
                        v-for="item in aShowtags" 
                        :key="item.key" 
                        :label="item.key">
                            {{ item.title }}
                    </checkbox>
                </checkbox-group>
            </div>
            <div class="form-group">
                <label class="group-l">
                    商品数量：
                </label>
                <div class="group-r">
                    <ec-input 
                        type="number" 
                        size="small"
                        min="1"
                        v-model="number"
                        placeholder="默认10张图片">
                    </ec-input>
                </div>
            </div>
            <div class="form-group form-group--remak">
                <label class="group-l" style="">
                </label>
                <div class="group-r">
                    <p class="ec-remark">*图片数量最少1张，小于1默认为1张，已选择商品大于1时该属性将失效</p>
                </div>
            </div>
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

// third party components
import {
    CheckboxGroup,
    Checkbox,
    Radio,
    RadioGroup,
    Input,
    DatePicker,
    Cascader,
    Select,
    Option
} from 'element-ui'

// minxin
import formProcessing from 'mixins/form-processing'

// localData
import localData from './data/local'

export default {
    name: 'b-product',
    props: ['setting', 'onlineData', 'modulesIndex'],
    mixins: [formProcessing],
    data() {
        return {
            componentName: localData.componentName,
            showDialogGoods: false,
            /**
             * 商品分类列表
             * 
             * @type {Array}
             */
            categoryCOption:[],
            categoryCProps:{
                value:'cat_id',
                label:'cat_name',
                children:'child_tree'
            },
            /**
             * 品牌分类列表
             * 
             * @type {Array}
             */
            brandList:[],
        }
    },
    components: {
        Radio,
        Checkbox,
        CheckboxGroup,
        RadioGroup,
        ComponentCon,
        "EcInput": Input,
        "EcSelect": Select,
        "EcOption": Option,
        DatePicker,
        Cascader
    },
    created () {
        this.init()
    },
    mounted() {

    },
    methods: {
        ...mapActions('dialogGoods',[
            'onOffDialogGoods',
            'setDialogGoods',
            'clearSelGoods'
        ]),
        init(){
            if(window.sessionStorage){
                if(sessionStorage.getItem('categoryCOption')){
                    this.categoryCOption = JSON.parse(sessionStorage.getItem('categoryCOption'))
                }else{
                   this.resCategoryCOption().then(() => {
                       sessionStorage.setItem('categoryCOption',JSON.stringify(this.categoryCOption))
                   })
                }

                if(sessionStorage.getItem('brandList')){
                    this.brandList = JSON.parse(sessionStorage.getItem('brandList'))
                }else{
                   this.resBrandList().then(() => {
                       sessionStorage.setItem('brandList',JSON.stringify(this.brandList))
                   })
                }
            }else{
                this.resCategoryCOption()
                this.resBrandList()
            }
        },
        resCategoryCOption(){
            return this.$http.post(this.url('console&c=api&a=category')).then(({ data }) => {
                let { url } = data
                this.categoryCOption = url
            })
        },
        resBrandList(){
            return this.$http.post(this.url('console&c=api&a=brand')).then(({ data }) => {
                let { brand } = data
                this.brandList = brand
            })
        },
        openDialogGoods(){
            this.setDialogGoods({
                bShowDialog:true,
                currentPage:1,
                modulesIndex:this.modulesIndex,
                pageSize:15
            })
        }
    },
    computed: {
        aShowtags() {
            let styleStyleIndex = 0
            this.data.showStyle.map((v, i) => {
                if (v.key == this.styleSel) styleStyleIndex = i
            })
            let aTag = this.data.showStyle[styleStyleIndex].tags
            let aShowTags = []
            this.data.showTag.map((v, i) => {
                aTag.map((tV, tI) => {
                    if (v.key == tV) {
                        aShowTags.push(v)
                    }
                })
            })
            return aShowTags
        },
        styleSel: {
            get() {
                return this.data.isStyleSel
            },
            set(value) {
                this.updateRadioSel('isStyleSel', value)
            }
        },
        sizeSel: {
            get() {
                return this.data.isSizeSel
            },
            set(value) {
                this.updateRadioSel('isSizeSel', value)
            }
        },
        tagSelList: {
            get() {
                return this.data.tagSelList
            },
            set(value) {
                this.updateRadioSel('tagSelList', value)
            }
        },
        moduleSel: {
            get() {
                return this.data.isModuleSel
            },
            set(value) {
                this.updateRadioSel('isModuleSel', value)
            }
        },
        scrollNumber: {
            get() {
                return this.data.allValue.scrollNumber
            },
            set(value) {
                this.updateTitleText('scrollNumber', value)
            }
        },
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
        brandSelect:{
            get(){
                return this.data.allValue.brandSelect || ''
            },
            set(value){
                this.updateTitleText('brandSelect', value)
            }
        },
        categorySOption:{
            get(){
                let s = this.data.allValue.categorySOption
                return s ? s.split(',') : []
            },
            set(value){
                this.updateTitleText('categorySOption', value.join(','))
            }
        },
        catId(){
            let len = this.categorySOption.length
            return len > 0 ? this.categorySOption[len - 1] : ''
        },
        type(){
            let s = ''
            switch (this.moduleSel) {
                case '0':
                    s = 'best'
                    break;
                case '1':
                    s = 'new'
                    break;
                case '2':
                    s = 'host'
                    break;
                case '3':
                    s = ''
                    break;
                default:
                    s = ''
                    break;
            }
            return s
        },
        selGoodNum(){
            return this.selectGoodsId
                    ? this.selectGoodsId.length
                    : 0
        },
        selectGoodsId(){
            return this.data.allValue.selectGoodsId
        },
        data() {
            return Object.assign({}, localData.data, this.onlineData)
        }
    }
}

</script>

<style scoped>
    .cascader{
        width:100%;
    }
    .brand-select{
        width:100%;
    }
    a.clear{
        color:#999;
    }
</style>