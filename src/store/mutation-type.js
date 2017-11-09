const SET_MODULE_INFO = 'setModuleInfo'
const SET_PAGE_LIST = 'setPageList'
const UPDATE_PAGE = 'updatePage'
const ADD_PAGE = 'addPage'
const REMOVE_PAGE = 'removePage'
const SEARCH_PAGE_LIST = 'searchPageList'
const UPDATE_PAGE_PIC = "updatePagePic"

const SET_DOC_CONFIG = 'dashboard/setDocConfig'
const NAV_ENTER_TAB = 'dashboard/navHoverTab'
const NAV_LEAVE_TAB = 'dashboard/navOutTab'
const NAV_HIDDEN_TAB = 'dashboard/navHiddenTab'
const ADD_MODULES = 'dashboard/addModules'
const UPDATE_MODULES = 'dashboard/updateModules'
const REMOVE_MODULES = 'dashboard/removeModules'
const REMOVE_ALL_MODULES = 'dashboard/removeAllModules'
const IS_SHOW_EDIT_COMPONENT = 'dashboard/isShowEditComponent'
const SORT_MODULES = 'dashboard/sortModules'
const UPDATE_RADIO_SEL = 'dashboard/updateRadioSel'
const UPDATE_TEXT = 'dashboard/updateText'
const UPDATE_LIST_TEXT = 'dashboard/updateListText'
const REMOVE_LIST = 'dashboard/removeList'
const ADD_LIST = 'dashboard/addList'
const REMOVE_MENU_URL = 'dashboard/removeMenuUrl'
const IS_UPDATE_MODULES = 'dashboard/isUpdateModules'
const UPDATE_SETTING_ACTIVE = 'dashboard/updateSettingActive'


const SET_DIALOG_URL = 'dialogUrl/setDialogUrl'
const ON_OFF_DIALOG_URL = 'dialogUrl/onOffDialogUrl'
const SET_MODULES_URL = 'dialogUrl/setModulesUrl'

const SET_DIALOG_PICTURE = "dialogPicture/setDialogPicture"
const SET_DIALOG_PICTURE_THUMB = "dialogPicture/setDialogPictureThumb"
const ON_OFF_DIALOG_PICTURE = "dialogPicture/onOffDialogPicture"
const SET_MODULES_PICTURE = "dialogPicture/setModulesPicture"
const ONE_MORE_SELECT = "dialogPicture/oneMoreSelect"
const ADD_LIST_PICTURE = "dialogPicture/addListPicture"
const UPDATE_PICTURE = "dialogPicture/updatePicture"
const TAB_THUMB = "dialogPicture/tabThumb"

const ON_OFF_DIALOG_GOODS = 'dialogGoods/onOffDialogGoods'
const SET_DIALOG_GOODS = 'dialogGoods/setDialogGoods'
const SELECT_GOODS = 'dialogGoods/SelectGoods'
const SET_DIALOG_SEL_GOODS = 'dialogGoods/setDialogSelGoods'
const REMOVE_SELECT = 'dialogGoods/removeSelect'
const CLEAR_SEL_GOODS = 'dialogGoods/clearSelGoods'

export{
    SET_MODULE_INFO,//赋值modoues
    SET_PAGE_LIST,//赋值pagelist
    UPDATE_PAGE,//修改pagelist指定数据
    ADD_PAGE,//新增一条 pagelist数据
    REMOVE_PAGE,//删除一条 pagelist 数据
    SEARCH_PAGE_LIST,//搜索 pagelist 数据
    REMOVE_MENU_URL,//删除组件list列表对应的链接
    UPDATE_PAGE_PIC,//

    SET_DOC_CONFIG,//赋值config
    NAV_ENTER_TAB,//nav导航切换
    NAV_LEAVE_TAB,//nav离开导航事件
    NAV_HIDDEN_TAB,//置入editArea影藏下拉
    ADD_MODULES,//增加 module
    UPDATE_MODULES,//修改modules排序
    REMOVE_MODULES,//当前module删除
    REMOVE_ALL_MODULES,//清空module
    IS_SHOW_EDIT_COMPONENT,//显示隐藏编辑框配置
    SORT_MODULES,//modules排序
    UPDATE_RADIO_SEL,//修改radio选择
    UPDATE_TEXT,//修改两类text文本框内容
    UPDATE_LIST_TEXT,//修改data list中desc内容
    REMOVE_LIST,//根据索引删除指定list,
    ADD_LIST,//增加一个list
    IS_UPDATE_MODULES,//当前modules是否修改
    UPDATE_SETTING_ACTIVE,//修改active显示隐藏状态

    SET_DIALOG_URL,//设置 url 链接
    ON_OFF_DIALOG_URL,//开关 url 弹出层
    SET_MODULES_URL,//设置赋值于对应值

    SET_DIALOG_PICTURE,//设置 picture 列表
    SET_DIALOG_PICTURE_THUMB,//设置 picture thumb 列表
    ON_OFF_DIALOG_PICTURE,//开关 url 弹出层
    SET_MODULES_PICTURE,//设置赋值于对应值
    ONE_MORE_SELECT,//单选多选
    ADD_LIST_PICTURE,//添加图片至对应modules
    UPDATE_PICTURE,//修改图片至对应modules
    TAB_THUMB, //切换相册背景色

    ON_OFF_DIALOG_GOODS,//开关 goods 弹出层
    SET_DIALOG_GOODS,//商品列表赋值
    SELECT_GOODS,//选择商品
    SET_DIALOG_SEL_GOODS,//已选择商品列表赋值
    REMOVE_SELECT,//移除已选中列表中的商品
    CLEAR_SEL_GOODS,//清空已选项
}