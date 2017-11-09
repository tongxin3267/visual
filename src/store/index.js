import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import dashboard from './modules/dashboard'
import dialogUrl from './modules/dialog-url'
import dialogPicture from './modules/dialog-picture'
import dialogGoods from './modules/dialog-goods'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' //发布模式不使用严格模式
const store = new Vuex.Store({
    strict: debug,
    state: {
        modules: [],
        pageList: [],
        customPageList: [],
        pageSetting: {
            ruid: -1,
            modulesId: -1,
            type: "",
            default: ""
        },
        shopInfo: {
            searchStoreData: {
                allValue: {
                    searchValue: "",
                    bgColor: "",
                    tenKey: ""
                },
                isSuspendSel: "1",
                isPositionSel: "0",
                isMessageSel: "0"
            },
            lineData: {
                allValue: {
                    height: 4,
                    bgColor: ""
                }
            },
            titleData: {
                allValue: {
                    title: "产品列表",
                    fitTitle: "",
                    dateTime: "",
                    author: "",
                    bgColor: ""
                },
                list: [
                    {
                        url: `${window.ROOT_URL}index.php?m=store&a=pro_list&ru_id=${window.shopInfo.ruid}`,
                        urlCatetory: "",
                        urlName: "",
                        desc: "更多"
                    }
                ],
                isDate: "0",
                isStyleSel: "2",
                isPositionSel: "0"
            },
            productData: {
                allValue: {
                    number: 10,
                    scrollNumber: 3,
                    selectGoodsId:[],
                    categorySOption:'',
                    brandSelect:''
                },
                isStyleSel: "0",
                isSizeSel: "1",
                tagSelList: [
                    "0",
                    "1",
                    "2"
                ],
                isModuleSel: "0"
            }
        }
    },
    actions,
    mutations,
    modules: {
        namespaced: true,
        dashboard,
        dialogUrl,
        dialogPicture,
        dialogGoods
    }
})


let aHot = [
    './actions',
    './mutations',
    './getters',
    './modules/dashboard',
    './modules/dialog-url',
    './modules/dialog-picture',
    './modules/dialog-goods'
]


if (module.hot) {
    // 使 actions 和 mutations 成为可热重载模块
    module.hot.accept(aHot, () => {
      // 加载新模块 
      store.hotUpdate({
        actions: require('./actions'),
        mutations: require('./mutations'),
        getters: require('./getters'),
        modules: {
          dashboard:require('./modules/dashboard'),
          dialogUrl:require('./modules/dialog-url'),
          dialogPicture:require('./modules/dialog-picture'),
          dialogGoods:require('./modules/dialog-goods')
        }
      })
    })
  }

  export default store