import {
    ON_OFF_DIALOG_GOODS,
    SET_DIALOG_GOODS,
    SELECT_GOODS,
    SET_DIALOG_SEL_GOODS,
    REMOVE_SELECT,
    CLEAR_SEL_GOODS
} from "../mutation-type"

import Vue from 'vue'

import {
    Loading,
    Message
} from "element-ui"

import { apiDialogGoods } from "config"

let loadingInstance
const state = {
    /**
     * 商品库商品列表
     * 
     * @type {Array}
     */
    goodsList: [],
    /**
     * 选中商品库列表
     * 
     * @type {Array}
     */
    selGoodsList: [],
    /**
     * dialogGoods 相关配置
     * 
     * @type {Object}
     */
    settingType: {
        bShowDialog: false,
        total: 0,
        pageSize: 0,
        currentPage: 0,
        modulesIndex: -1,
        catId: 0,
        brandId: 0,
        type: '',
        brandSelect: '',
        selGoodNum: 0
    },
    /**
     * dialogGoods 已选择商品的相关配置
     * 
     * @type {Object}
     */
    selectGoodsType: {
        total: 0,
        pageSize: 0,
        currentPage: 1
    }
}

const mutations = {
    /**
     * 显示隐藏dialogGoods
     * 
     * @param {*} state 
     * @param {* Object} o 
     */
    [ON_OFF_DIALOG_GOODS](state, o) {
        if (o.bShowDialog) {
            state.settingType.bShowDialog = o.bShowDialog
            state.settingType.modulesIndex = o.modulesIndex
            state.settingType.brandSelect = o.brandSelect
            state.settingType.currentPage = o.currentPage
            state.settingType.catId = o.catId
            state.settingType.type = o.type
            state.settingType.pageSize = o.pageSize
        } else {
            state.settingType.bShowDialog = o.bShowDialog
        }
    },

    /**
     * 将goods列表赋值给goodsList
     * 
     * @param {* Object} state 
     * @param {* Object} o 
     */
    [SET_DIALOG_GOODS](state, o) {
        let { rootState: { modules } } = o,
            selectGoodsId = []
        if (modules[o.modulesIndex].data.allValue.selectGoodsId) {
            selectGoodsId = modules[o.modulesIndex].data.allValue.selectGoodsId
        } else {
            modules[o.modulesIndex].data.allValue = { ...modules[o.modulesIndex].data.allValue, selectGoodsId: [] }
        }
        o.list.map(item => {
            selectGoodsId.map(itemId => {
                if (item.goods_id == itemId) {
                    item.bActive = true
                }
            })
        })
        state.goodsList = o.list
        state.settingType.total = o.total
    },

    /**
     * 点击选择商品库选中并将选中id放入selectGoodsId中便于调用选中商品
     * 
     * @param {*} state 
     * @param {*} o 
     */
    [SELECT_GOODS](state, o) {
        
        let { rootState: { modules } } = o,
            modulesIndex = state.settingType.modulesIndex,
            allValue = modules[modulesIndex].data.allValue
            console.log('select')
            console.log(modulesIndex)
        if (!state.goodsList[o.index].bActive) {
            Vue.set(state.goodsList, o.index, {
                ...state.goodsList[o.index],
                bActive: true
            })
            allValue.selectGoodsId.push(state.goodsList[o.index].goods_id)
        } else {
            state.goodsList[o.index].bActive = false
            let len = allValue.selectGoodsId.length
            for (let i = 0; i < len; i++) {
                if (state.goodsList[o.index].goods_id == allValue.selectGoodsId[i]) {
                    allValue.selectGoodsId.splice(i, 1)
                    break;
                }
            }
        }
    },
    /**
     * 获取已选择商品列表并赋值给selGoodsList
     * 
     * @param {* Object} state 
     * @param {* Object} o 
     */
    [SET_DIALOG_SEL_GOODS](state, o) {
        state.selectGoodsType.pageSize = o.pageSize
        state.selectGoodsType.currentPage = o.currentPage
        state.selGoodsList = o.goodslist
    },
    /**
     * 移除当前选中商品
     * 
     * @param {*} state 
     * @param {* Object} o - 移除当前商品的索引和 goodsId
     */
    [REMOVE_SELECT](state, o) {
        let {
            goodsId,
            pageSize,
            currentPage,
            modulesIndex,
            rootState: {
                modules
            }
        } = o,
            selectGoodsId = modules[modulesIndex].data.allValue.selectGoodsId,
            len = selectGoodsId.length
        for (let i = 0; i < len; i++) {
            if (selectGoodsId[i] == goodsId) {
                selectGoodsId.splice(i, 1)
            }
        }
    },
    /**
     * 清空选中商品
     * 
     * @param {*} state 
     */
    [CLEAR_SEL_GOODS](state, o) {
        let {
            modulesIndex,
            rootState: {
                modules
            }
        } = o
        modules[modulesIndex].data.allValue.selectGoodsId = []

    }
}

const actions = {
    onOffDialogGoods({ commit }, o) {
        commit(ON_OFF_DIALOG_GOODS, o)
    },
    setDialogGoods({ commit, rootState }, o) {
        console.log(o)
        loadingInstance = Loading.service({ target: "body", text: "加载中……" })
        apiDialogGoods.getGoods(o).then(({ data: {
            list,
            total
        } }) => {
            commit(SET_DIALOG_GOODS, {
                rootState,
                modulesIndex: o.modulesIndex,
                list,
                total
            })
            commit(ON_OFF_DIALOG_GOODS, o)
            setTimeout(() => {
                loadingInstance.close()
            }, 100)
        })
    },
    setDialogSelGoods({ commit }, o) {
        apiDialogGoods.getGoodsSel(o).then(({ data: { goodslist } }) => {
            commit(SET_DIALOG_SEL_GOODS, {
                ...o,
                goodslist
            })
        })
    },
    selectGoods({ commit, rootState }, o) {
        console.log('select')
        console.log(o)
        commit(SELECT_GOODS, {
            ...o,
            rootState
        })
    },
    removeSelect({ commit, dispatch, rootState }, o) {
        commit(REMOVE_SELECT, {
            ...o,
            rootState
        })
    },
    clearSelGoods({ commit, rootState }, o) {
        commit(CLEAR_SEL_GOODS, {
            ...o,
            rootState
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}