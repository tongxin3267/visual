export default {
    methods: {
        /**
         * 前台组件获取属性值，如果为空返回返回defaultValue
         * @param {*} o 
         */
        getText(o) {
            let inputValue;
            if(o.listIndex == undefined){
                inputValue = this.data[o.dataNext][o.attrName]
            }else{
                inputValue = this.data.list[o.listIndex][o.attrName]
            }
            return inputValue == "" || inputValue == "undefined" ? o.defaultValue : inputValue
        },
    }
}