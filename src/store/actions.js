import {
    SET_MODULE_INFO,
    SET_PAGE_LIST,
    UPDATE_PAGE,
    REMOVE_PAGE,
    ADD_PAGE,
    REMOVE_MENU_URL,
    SEARCH_PAGE_LIST,
    UPDATE_PAGE_PIC,
} from './mutation-type.js'

import {
    apiModules,
    apiPageList
} from 'config'


export default {
    async setPageList({ commit }, o) {
        return apiPageList.getPageList(o)
    },
    setModuleInfo({ commit }, o) {
        apiModules.getModules(o, {
            getModule(o) {
                commit(SET_MODULE_INFO, o)
            }
        })
    },
    async initPageModule({ dispatch, commit }, o) {
        let defaultModuleId = -1
        let modulesTitle = ""
        await dispatch('setPageList', o).then(({ data: { view } }) => {
            view.forEach(item => {
                if (!item.pic) item.pic = ""
                if (!item.thumb_pic) item.thumb_pic = ""
            })
            commit(SET_PAGE_LIST, {
                pageList: view
            })
            let pageListLen = view.length
            if (pageListLen > 0) {
                for (let i = 0; i < pageListLen; i++) {
                    if ((view[i].type == "index" && view[i].default == 1) || (view[i].type == "store" && view[i].default == 1)) {
                        defaultModuleId = view[i].id
                        break
                    }
                }
            }
        })
       
        if (defaultModuleId > -1) {
            dispatch('setModuleInfo', {
                id: defaultModuleId
            })
        }
    },
    updatePage({ commit }, o) {
        commit(UPDATE_PAGE, o)
    },
    removePage({ commit }, o) {
        commit(REMOVE_PAGE, o)
    },
    addPage({ commit }, o) {
        commit(ADD_PAGE, o)
    },
    isEqualTitle({ commit, rootState }, o) {
        let aPageList = rootState.pageList
        let pageListLen = aPageList.length
        let trimValue = o.value.trims()
        for (let i = 0; i < pageListLen; i++) {
            if (aPageList[i].id == o.id && aPageList[i].title == trimValue) {
                return true
            }
        }
        return false
    },
    searchPageList({ commit }, o) {
        commit(SEARCH_PAGE_LIST, o)
    },
    removeMenuUrl({ commit }, o) {
        commit(REMOVE_MENU_URL, o)
    },
    updatePagePic({ commit }, o) {
        commit(UPDATE_PAGE_PIC, o)
    },
    setConversionModules({commit},o){
        commit(SET_MODULE_INFO,o)
    }
}