module.exports = {
    module: "announcement",
    componentName: "公告",
    suggest: "",
    setting: "1",
    data: {
        showStyle: [{
            key: "0",
            type: "radio",
            title: "新闻模式",
        }, {
            key: "1",
            type: "radio",
            title: "公告模式",
        }],
        showDate: [{
            key: "0",
            type: "radio",
            title: "显示"
        }, {
            key: "1",
            type: "radio",
            title: "隐藏"
        }],
        allValue: {
            img: "",
            announContent: "内容",
        },
        img: "",
        isStyleSel: "0",
        isDateSel: "0",
    }
}
