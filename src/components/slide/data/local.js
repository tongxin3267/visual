module.exports = {
    module: "slide",
    componentName: "幻灯片",
    suggest: "",
    setting: "0",
    data: {
        showStyle: [{
            key: "0",
            type: "radio",
            title: "轮播显示",
            picSizeKey: ["0"]
        }, {
            key: "1",
            type: "radio",
            title: "分开显示",
            picSizeKey: ["0", "1"]
        }, 
        // {
        //     key: "2",
        //     type: "radio",
        //     title: "分列显示",
        //     picSizeKey: ["0"]
        // }
    ],
        picSize: [{
            key: "0",
            type: "radio",
            title: "大图"
        }, {
            key: "1",
            type: "radio",
            title: "小图",
        }, {
            key: "3",
            type: "radio",
            title: "小图",
        }],
        allValue:{
            number:1
        },
        list: [],
        isStyleSel: "0",
        isSizeSel: "0"
    }
}
