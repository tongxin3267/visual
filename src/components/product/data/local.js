module.exports = {
    module: "product",
    componentName: "商品列表",
    suggest: "",
    setting: "0",
    data: {
        showStyle: [{
            key: "0",
            type: "radio",
            title: "默认",
            tags: ["0", "1", "2"]
        }, {
            key: "1",
            type: "radio",
            title: "滚动",
            tags: ["2"]
        }],
        showSize: [{
            key: "0",
            type: "radio",
            title: "大图",
        }, {
            key: "1",
            type: "radio",
            title: "标准",
        }, {
            key: "2",
            type: "radio",
            title: "小图",
        }],
        showTag: [{
            key: "0",
            type: "checkbox",
            title: "库存"
        }, {
            key: "1",
            type: "checkbox",
            title: "销量"
        }, {
            key: "2",
            type: "checkbox",
            title: "标题"
        }],
        showModule: [{
            key: "3",
            type: "radio",
            title: "全部"
        }, {
            key: "0",
            type: "radio",
            title: "精品"
        }, {
            key: "1",
            type: "radio",
            title: "新品"
        }, {
            key: "2",
            type: "radio",
            title: "热卖"
        }],
        allValue: {
            number: 10,
            scrollNumber: 3,
            categorySOption:'',
            brandSelect:'',
            selectGoodsId:[]
        },
        isStyleSel: "0",
        isSizeSel: "0",
        tagSelList: [],
        isModuleSel: "0"
    }
}
