module.exports = {
    module: "nav",
    componentName: "图片导航",
    suggest: "",
    setting: "0",
    data: {
        showStyle: [{
            key: "0",
            type: "radio",
            title: "样式1",
        }, {
            key: "1",
            type: "radio",
            title: "样式2"
        }],
        showStyleList: [{
            key: "0",
            type: "checkbox",
            title: "整体边距",
        }, {
            key: "1",
            type: "checkbox",
            title: "内边距"
        }, {
            key: "2",
            type: "checkbox",
            title: "边框"
        }],
        showNumber: [{
            key: "2",
            type: "radio",
            title: "两列"
        }, {
            key: "3",
            type: "radio",
            title: "三列"
        }, {
            key: "4",
            type: "radio",
            title: "四列"
        }, {
            key: "5",
            type: "radio",
            title: "五列"
        }],
        showDesc: [{
            key: "0",
            type: "radio",
            title: "显示",
        }, {
            key: "1",
            type: "radio",
            title: "隐藏"
        }],
        showIcon: [{
            key: "0",
            type: "radio",
            title: "显示",
        }, {
            key: "1",
            type: "radio",
            title: "隐藏",
        }],
        list: [],
        styleSelList: [],
        isNumberSel: "5",
        isStyleSel: "0",
        isIconSel: "0",
        isDescSel:"0"
    }
}
