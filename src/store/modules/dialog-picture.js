import {
    SET_DIALOG_PICTURE,
    SET_DIALOG_PICTURE_THUMB,
    ON_OFF_DIALOG_PICTURE,
    SET_MODULES_PICTURE,
    ONE_MORE_SELECT,
    ADD_LIST_PICTURE,
    UPDATE_PICTURE,
    TAB_THUMB
} from "../mutation-type"

import {
    Message
} from "element-ui"

import { apiDialogPicture } from "config"

const state = {
    pictureList: [],
    thumbList: [],
    settingType: {
        allValuesType: "",//判断图片赋值于list或allValues
        albumId: 0,//当前相册id
        albumName: "",//当前选中相册名称
        bShowDialog: false,
        total: 0,
        pageSize: 0,
        currentPage: 1,
        modulesIndex: -1,
        listIndex: -1,
        selectPicture: -1,
        oneOrMore: "one",
        maxLength: 0,
        residueLength: 0,
        pictureLength: 0
    }
}

const mutations = {
    [SET_DIALOG_PICTURE](state, o) {
        if (sessionStorage.getItem("aPicture")) {
            JSON.parse(sessionStorage.getItem("aPicture")).forEach(v => {
                o.data.img.forEach(iV => {
                    if (iV.pic_id == v.pic_id) {
                        iV.bActive = true
                    }
                })
            })
        }
        state.pictureList = o.data.img
        state.settingType.total = o.data.total
        state.settingType.oneOrMore = o.oneOrMore
        state.settingType.maxLength = o.maxLength
        state.settingType.residueLength = o.residueLength
    },
    [SET_DIALOG_PICTURE_THUMB](state, o) {
        state.settingType.pictureLength = 0
        state.settingType.albumId = o.albumId
        state.settingType.albumName = o.albumName
        state.thumbList = o.thumb
    },
    [ON_OFF_DIALOG_PICTURE](state, o) {
        if (o.bShowDialog) {
            state.settingType.bShowDialog = o.bShowDialog
            state.settingType.modulesIndex = o.modulesIndex
            state.settingType.listIndex = o.listIndex
            state.settingType.currentPage = o.currentPage
            state.settingType.pageSize = o.pageSize
            state.settingType.allValuesType = o.allValuesType
        } else {
            state.settingType.bShowDialog = o.bShowDialog
        }
    },
    [ONE_MORE_SELECT](state, o) {
        let sOneOrMore = state.settingType.oneOrMore
        let nMaxLength = state.settingType.maxLength
        let nResidueLength = state.settingType.residueLength
        let picture = state.pictureList[o.listIndex]
        let nActiveNum = 0
        let aPicture = []
        if (sOneOrMore == "one") {
            state.pictureList.forEach(v => {
                v.bActive = false
            })
            state.pictureList[o.listIndex].bActive = !state.pictureList[o.listIndex].bActive
        } else {
            if (sessionStorage.getItem("aPicture")) {
                nActiveNum = JSON.parse(sessionStorage.getItem("aPicture")).length
            }
            if (nActiveNum >= nResidueLength) {
                if (!state.pictureList[o.listIndex].bActive) {
                    Message.error(`该组件最多可添加 ${nMaxLength} 张图片`)
                }
                state.pictureList[o.listIndex].bActive = false
            } else {
                state.pictureList[o.listIndex].bActive = !state.pictureList[o.listIndex].bActive
            }
            if (state.pictureList[o.listIndex].bActive) {
                if (sessionStorage.getItem("aPicture")) {
                    let sLocalPicture = sessionStorage.getItem("aPicture")
                    aPicture = JSON.parse(sLocalPicture)
                    if (!aPicture.find(item => Object.is(item.pic_id, picture.pic_id))) {
                        aPicture.push(picture)
                    }
                    sessionStorage.setItem("aPicture", JSON.stringify(aPicture))
                } else {
                    aPicture.push(picture)
                    sessionStorage.setItem("aPicture", JSON.stringify(aPicture))
                }
            } else {
                if (sessionStorage.getItem("aPicture")) {
                    let sLocalPicture = sessionStorage.getItem("aPicture")
                    aPicture = JSON.parse(sLocalPicture)
                    aPicture.map((v, i) => {
                        if (v.pic_id == picture.pic_id) {
                            aPicture.splice(i, 1)
                        }
                    })
                    sessionStorage.setItem("aPicture", JSON.stringify(aPicture))
                }
            }
        }
        state.settingType.pictureLength = aPicture.length
    },
    [ADD_LIST_PICTURE](state, { rootState, o }) {
        let nModulesIndex = state.settingType.modulesIndex
        let moduleData = rootState.modules[nModulesIndex].data
        o.aSelectPic.forEach(v => {
            moduleData.list.push(v)
        })
    },
    [UPDATE_PICTURE](state, { rootState, o }) {
        let nModulesIndex = state.settingType.modulesIndex
        let sAllValuesType = state.settingType.allValuesType
        let moduleData = rootState.modules[nModulesIndex].data
        if (sAllValuesType) {
            if (o.aSelectPic.length > 0) {
                moduleData.allValue[sAllValuesType] = o.aSelectPic[0].img
            }
        } else {
            let nListIndex = state.settingType.listIndex
            if (o.aSelectPic.length > 0) {
                moduleData.list[nListIndex].img = o.aSelectPic[0].img
            }
        }
    },
    [TAB_THUMB](state, o) {
        state.thumbList.forEach(v => {
            v.bActive = false
        })
        state.settingType.albumName = o.albumName
        state.settingType.albumId = o.albumId
        state.thumbList[o.index].bActive = true
    }
}

const actions = {
    onOffDialogPicture({ commit }, o) {
        commit(ON_OFF_DIALOG_PICTURE, o)
    },
    setDialogPicture({ commit }, o) {
        apiDialogPicture.getDialog(o, {
            setDialogPicture(o) {
                commit(SET_DIALOG_PICTURE, o)
            },
            onOffDialogPicture() {
                commit(ON_OFF_DIALOG_PICTURE, o)
            },
            setDialogPictureThumb(o) {
                commit(SET_DIALOG_PICTURE_THUMB, o)
            }
        })
    },
    oneMoreSelect({ commit }, o) {
        commit(ONE_MORE_SELECT, o)
    },
    addListPicture({ commit, rootState }, o) {
        commit(ADD_LIST_PICTURE, { rootState, o })
    },
    updatePicture({ commit, rootState }, o) {
        commit(UPDATE_PICTURE, { rootState, o })
    },
    tabThumb({ commit }, o) {
        commit(TAB_THUMB, o)
    }
}

export default {
    state,
    mutations,
    actions
}