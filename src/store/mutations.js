import {
    SET_MODULE_INFO,
    SET_PAGE_LIST,
    ADD_PAGE,
    UPDATE_PAGE,
    REMOVE_PAGE,
    SEARCH_PAGE_LIST,
    REMOVE_MENU_URL,
    UPDATE_PAGE_PIC,
} from './mutation-type.js'

export default {
    [SET_MODULE_INFO](state, o) {
        if (o.moduleData == "" || !o.moduleData) {
            o.moduleData = "[]"
        }
        sessionStorage.setItem("modules", o.moduleData)
        state.modules = JSON.parse(o.moduleData)
        state.pageSetting.modulesId = o.id
        state.pageSetting.type = o.type
        state.pageSetting.default = o.default
    },
    [SET_PAGE_LIST](state, o) {
        state.pageList = o.pageList
        state.customPageList = o.pageList.filter(item => {
            return item.default == 0
        })
    },

    [UPDATE_PAGE](state, o) {
        let pageListLen = state.pageList.length
        for (let i = 0; i < pageListLen; i++) {
            if (state.pageList[i].id == o.id) {
                state.pageList[i].title = o.title
                state.pageList[i].thumb_pic = o.thumb_pic
                break
            }
        }
    },
    [ADD_PAGE](state, o) {
        state.customPageList.unshift(o)
        state.pageList.unshift(o)
    },
    [REMOVE_PAGE](state, o) {
        let pageListLen = state.customPageList.length
        for (let i = 0; i < pageListLen; i++) {
            if (state.customPageList[i].id == o.id) {
                state.customPageList.splice(i, 1)
                break
            }
        }
    },
    [SEARCH_PAGE_LIST](state, o) {
        let aFilterPageList = state.pageList.filter(item => {
            return item.title == "" ? item.default == o.default : item.default == o.default && item.title.toLowerCase().includes(o.title.toLowerCase())
        })
        if (o.default == 0) {
            state.customPageList = aFilterPageList
        }
    },
    [REMOVE_MENU_URL](state, o) {
        let list = state.modules[o.modulesIndex].data.list[o.listIndex]
        list.url = ""
        list.urlCatetory = ""
        list.urlName = ""
    },
    [UPDATE_PAGE_PIC](state,o){
        let pageLength = state.pageList.length
        for(let i=0; i<pageLength; i++){
            if(state.pageList[i].id == o.id){
                state.pageList[i].pic = o.pic
                break
            }
        }
    }
}