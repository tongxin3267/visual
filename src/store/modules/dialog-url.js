import {
    SET_DIALOG_URL,
    ON_OFF_DIALOG_URL,
    SET_MODULES_URL
} from '../mutation-type'

import {
    apiDialogUrl
} from 'config'

const state = {
    urlList: [],
    settingType: {
        type: "",
        bShowDialog: false,
        total: 0,
        pageSize: 0,
        currentPage: 1,
        modulesIndex: 0,
        listIndex: 0,
        dialogTitle: ""
    }
}

const mutations = {
    [SET_DIALOG_URL](state, o) {
        state.urlList = o.data.url
        state.settingType.total = o.data.total
    },
    [ON_OFF_DIALOG_URL](state, o) {
        if (o.bShowDialog) {
            if (o.type != "custom") {
                state.settingType.pageSize = o.pageSize
                state.settingType.currentPage = o.currentPage
            }
            state.settingType.type = o.type
            state.settingType.bShowDialog = o.bShowDialog
            state.settingType.modulesIndex = o.modulesIndex
            state.settingType.listIndex = o.listIndex
            state.settingType.dialogTitle = o.dialogTitle
        } else {
            state.settingType.bShowDialog = o.bShowDialog
        }
    },
    [SET_MODULES_URL](state, { rootState, o }) {
        let nListIndex = state.settingType.listIndex
        let nModulesIndex = state.settingType.modulesIndex
        let list = rootState.modules[nModulesIndex].data.list[nListIndex]
        list.urlCatetory = o.dialogTitle
        list.urlName = o.urlName
        list.url = o.url
    }
}

const actions = {
    onOffDialogUrl({ commit }, o) {
        commit(ON_OFF_DIALOG_URL, o)
    },
    setDialogUrl({ commit }, o) {
        apiDialogUrl.getDialog(o, {
            setDialogUrl(data) {
                commit(SET_DIALOG_URL, { data })
            },
            onOffDialogUrl() {
                commit(ON_OFF_DIALOG_URL, o)
            }
        })
    },
    setModulesUrl({ commit, rootState }, o) {
        commit(SET_MODULES_URL, { rootState, o })
    }
}

export default {
    state,
    mutations,
    actions
}