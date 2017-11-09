export default {
    methods: {
        /**
         * 点击切换单选按钮
         * @param {单选按钮属性名称} sName 
         * @param {新的值} sValue 
         */
        updateRadioSel(sName, sValue) {
            this.$store.dispatch('updateRadioSel', {
                modulesIndex: this.modulesIndex,
                sName: sName,
                newValue: sValue
            })
        },
        /**
         * 修改list或allValuevalue值
         * @param {*} o
         */
        updateText(o) {
            if (!isNaN(o.listIndex)) {
                o.modulesIndex = this.modulesIndex
            }
            this.$store.dispatch('updateText', o)
        },
        /**
        * 根据属性删除data.list当前索引值
        * @param { list索引值 } index 
        */
        removeList(iIndex) {
            this.$store.dispatch('removeList', {
                modulesIndex: this.modulesIndex,
                listIndex: iIndex
            })
        },
        /**
         * 增加data.list一个数组
         * @param { 根据传入不同的值判断类型 } sType 
         */
        addList(sType) {

            if (sType == "imgList") {
                if (sessionStorage.getItem("aPicture"))
                    sessionStorage.removeItem("aPicture")
                let o = {
                    bShowDialog: true,
                    currentPage: 1,
                    pageSize: 12,
                    oneOrMore: "more",
                    bAlbum: true,
                    modulesIndex: this.modulesIndex,
                    maxLength: this.maxLength,
                    residueLength: this.maxLength - this.onlineData.list.length
                }
                this.$store.dispatch('setDialogPicture', o)
            } else {
                let o = {
                    modulesIndex: this.modulesIndex,
                    url: "",
                    urlCatetory: "",
                    urlName: "",
                    desc: ""
                }
                this.$store.dispatch('addList', o)
            }
        },
        /**
         * 修改指定title allValue中的属性值
         * @param { 当前被修改属性 } sName 
         * @param { 新的value } sValue 
         */
        updateTitleText(sName, sValue) {
            let o = {
                modulesIndex: this.modulesIndex,
                dataNext: "allValue",
                attrName: sName,
                newValue: sValue
            }
            this.updateText(o)
        },
    },

}