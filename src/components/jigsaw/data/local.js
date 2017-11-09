module.exports = {
    module: "jigsaw",
    componentName: "拼图",
    suggest: "",
    setting: "0",
    data: {
        list: [],
        showStyle:[{
            key:"0",
            type:"radio",
            title:"风格1"
        },{
            key:"1",
            type:"radio",
            title:"风格2"
        }],
        showStyleList: [{
            key: "1",
            type: "checkbox",
            title: "内边距"
        }, {
            key: "2",
            type: "checkbox",
            title: "边框"
        }],
        showPosition:[{
            key:"0",
            type:"radio",
            title:"左浮动"
        },{
            key:"1",
            type:"radio",
            title:"右浮动"
        }],
        allValue: {
            showStyle2Size: "1:2:3",
            showStyle1Size:"",
            showStyle1Right:"",
        },
        styleSelList: [],
        isStyleSel:"0",
        isPositionSel:"0"
    }
}
