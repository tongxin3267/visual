const localUrl = "http://10.10.10.14:3000/"
const pageInfo = {
    headerMenu: {
        pageListTitle: {
            icon: "page",
            isActive: true,
            isShow:true
        },
        globaSettings: {
            text: "全局配置",
            isActive: false,
            isShow:false
        },
        menuComponent: [{
            text: "布局",
            isActive: false,
            isShow: true,
            subComponent: [{
                icon: "line",
                text: "辅助线",
                module: "line",
                type:"all",
                isShow: true,
            }, {
                icon: "blank",
                text: "辅助空白",
                module: "blank",
                type:"all",
                isShow: true,
            }, {
                icon: "magic-cube",
                text: "魔方",
                module: "magic-cube",
                type:"all",
                isShow: false,
            }]
        }, {
            text: "文本",
            isActive: false,
            isShow: true,
            subComponent: [{
                text: "标题",
                icon: "title",
                module: "title",
                type:"all",
                isShow: true,
            }, {
                text: "段落",
                icon: "passage",
                module: "passage",
                type:"all",
                isShow: false,
            }, {
                text: "富文本",
                icon: "rick-text",
                module: "rick-text",
                type:"all",
                isShow: false,
            }, {
                text: "公告",
                icon: "announcement",
                module: "announcement",
                type:"all",
                isShow: true,
            }, {
                text: "文字导航",
                icon: "text-nav",
                module: "textNav",
                type:"all",
                isShow: false,
            }]
        }, {
            text: "图片",
            isActive: false,
            isShow: true,
            subComponent: [{
                icon: "img-nav",
                text: "图片导航",
                module: "nav",
                type:"all",
                isShow: true,
            }, {
                icon: "slide",
                text: "幻灯片",
                module: "slide",
                type:"all",
                isShow: true,
            }, {
                icon: "jigsaw",
                text: "拼图",
                module: "jigsaw",
                type:"all",
                isShow: true,
            }]
        }, {
            text: "功能",
            isActive: false,
            isShow: true,
            subComponent: [{
                icon: "count-down",
                text: "倒计时",
                module: "count-down",
                type:"platform",
                isShow: true,
            }, {
                icon: "coupon",
                text: "优惠券",
                module: "coupon",
                type:"all",
                isShow: false,
            }, {
                icon: "product-list",
                text: "商品列表",
                module: "product",
                type:"all",
                isShow: true,
            }, {
                icon: "search",
                text: "搜索",
                module: "search",
                type:"platform",
                isShow: true,
            }, {
                icon: "button",
                text: "按钮",
                module: "button",
                type:"all",
                isShow: false,
            },{
                icon: "store",
                text: "店铺街",
                module: "store",
                type:"platform",
                isShow: true,
            },{
                icon:"tab-down",
                text:"导航",
                module:"tab-down",
                type:"platform",
                isShow:true
            }]
        }],
    },
    pageListTool: {
        system: {
            text: "系统默认"
        },
        custom: {
            text: "自定义"
        },
        search: {
            icon: "search",
            text: "页面搜索"
        }
    },
    editArea: {
        text: "编辑区域",
        function: {
            clear: {
                text: "清空",
                icon: "clear"
            },
            save: {
                text: "存储",
                icon: "save",
            },
            restore: {
                text: "还原",
                icon: "restore"
            }
        },
        compontentTool: {
            spread: "arrow",
            sort: "sort-arrow",
        }
    },
    previewArea: {
        text: "预览区域",
        function: {
            release: {
                text: "发布",
                icon: "release"
            }
        }
    },
    otherArea: {
        QRCodeText: "扫码手机预览",
        function: {
            import: "本地导入",
            export: "导出至本地"
        },
        prompt: {
            headline: "温馨提示",
            text: "手机扫描二维码，即可在手机进行观看页面效果",
            http: {
                text: "链接名称",
                link: "http://www.ectouch.cn"
            }
        }
    }
} 

export default{
    localUrl,
    pageInfo
}