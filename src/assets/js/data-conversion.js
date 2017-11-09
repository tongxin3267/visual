import qs from 'qs'
import axios from 'axios'
function conversion(v1) {
    let v2 = []
    v1.forEach(item => {
        let { module, setting, data } = item
        switch (module) {
            case "search":
                v2.push({
                    module: "search",
                    setting: setting ? 1 : 0,
                    data: {
                        allValue: {
                            searchValue: data.text,
                            fontColor: "",
                            bgColor: data.headerStyle.bgStyle,
                            tenKey: data.key
                        },
                        isSuspendSel: data.isFixedSel,
                        isPositionSel: data.isLocationSel,
                        isMessageSel: data.isMessageSel
                    }
                })
                break;
            case "picture":
                v2.push({
                    module: "slide",
                    setting: setting ? 1 : 0,
                    data: {
                        list: function () {
                            let arr = []
                            let i = 0
                            if (data.imgList) {
                                if (data.imgList.length > 0) {
                                    data.imgList.forEach(itemList => {
                                        arr.push({
                                            desc: itemList.desc,
                                            url: itemList.link,
                                            urlCatetory: "自定义页面",
                                            urlName: i++,
                                            img: itemList.img
                                        })
                                    })
                                }
                            }
                            return arr
                        }(),
                        isStyleSel: data.isStyleSel,
                        isSizeSel: data.isSizeSel
                    }
                })
                break;
            case "title":
                v2.push({
                    module: "title",
                    setting: setting ? 1 : 0,
                    data: {
                        allValue: {
                            author: data.wxStyle.author,
                            bgColor: data.traditionStyle.bgStyle,
                            dateTime: function () {
                                if (data.isStyleSel == 0) {
                                    if (new Date(data.traditionStyle.fitTitle) != "Invalid Date") {
                                        return data.traditionStyle.fitTitle
                                    } else {
                                        return ""
                                    }
                                } else if (data.isStyleSel == 1) {
                                    if (new Date(data.traditionStyle.fitTitle) != "Invalid Date") {
                                        return data.traditionStyle.fitTitle
                                    } else {
                                        return ""
                                    }
                                }
                            }(),
                            fitTitle: data.traditionStyle.fitTitle,
                            title: data.title
                        },
                        list: function () {
                            if (data.isStyleSel == 0) {
                                return [{
                                    desc: data.traditionStyle.linkTitle,
                                    url: data.traditionStyle.link,
                                    urlCatetory: "自定义页面",
                                    urlName: "1"
                                }]
                            } else if (data.isStyleSel == 1) {
                                return [{
                                    desc: data.wxStyle.linkTitle,
                                    url: data.wxStyle.link,
                                    urlCatetory: "自定义页面",
                                    urlName: "1"
                                }]
                            }
                        }(),
                        isDate: function () {
                            if (new Date(data.traditionStyle.fitTitle) != "Invalid Date") {
                                return "1"
                            } else {
                                return "0"
                            }
                        }(),
                        isStyleSel: data.isStyleSel,
                        isPositionSel: function () {
                            let n;
                            switch (data.isShowStyle) {
                                case "text-let":
                                    n = "0"
                                    break;
                                case "text-center":
                                    n = "1"
                                    break;
                                case "text-right":
                                    n = "2"
                                    break;
                                default:
                                    n = "0"
                                    break;
                            }
                            return n
                        }()
                    }
                })
                break;
            case "line":
                v2.push({
                    module: "line",
                    setting: setting ? 1 : 0,
                    data: {
                        allValue: {
                            bgColor: data.bgColor,
                            height: 1
                        }
                    },
                })
                break;
            case "blank":
                v2.push({
                    module: "line",
                    setting: setting ? 1 : 0,
                    data: {
                        allValue: {
                            height: data.valueHeight / 16
                        }
                    },
                })
                break;
            case "nav":
                v2.push({
                    module: "nav",
                    setting: setting ? 1 : 0,
                    data: {
                        list: function () {
                            let arr = []
                            let i = 0
                            if (data.imgList) {
                                if (data.imgList.length > 0) {
                                    data.imgList.forEach(itemList => {
                                        arr.push({
                                            desc: itemList.desc,
                                            url: itemList.link,
                                            img: itemList.img,
                                            urlCatetory: "自定义页面",
                                            urlName: i++
                                        })
                                    })
                                }
                            }

                            return arr
                        }(),
                        isNumberSel: Number(data.isStyleSel) + 2,
                        isStyleSel: "1",
                        isDescSel: data.isTextSel,
                        isIconSel: "0",
                        styleSelList: function () {
                            let arr = []
                            if (data.isGapSel) {
                                if (data.isGapSel.length > 0) {
                                    data.isGapSel.forEach(itemGap => {
                                        arr.push(itemGap)
                                    })
                                }
                                if (data.isBorderSel == 0) {
                                    arr.push("2")
                                }
                            }
                            return arr
                        }()

                    },
                })
                break;
            case "spike":
                v2.push({
                    module: "count-down",
                    setting: setting ? 1 : 0,
                    data: {
                        allValue: {
                            endTime: data.endTime,
                            number: 10,
                            spikeDesc: "",
                            titleImg: "../data/gallery_album/original_img/5951ceab15b33.jpg",
                        },
                        isStyleSel: "0"
                    }
                })
                break;
            case "announcement":
                v2.push({
                    module: "announcement",
                    setting: setting ? 1 : 0,
                    data: {
                        allValue: {
                            announContent: "",
                            img: data.icon
                        },
                        isDateSel: "0",
                        isStyleSel: "0",
                    }
                })
                break;
            case "product":
                v2.push({
                    module: "product",
                    setting: setting ? 1 : 0,
                    data: {
                        allValue: {
                            number: data.number,
                        },
                        isStyleSel: data.isShowModule ? data.isShowModule : "0",
                        isSizeSel: data.isStyleSel,
                        isModuleSel: function () {
                            let s = "";
                            switch (data.isShowMod) {
                                case "best":
                                    s = "0"
                                    break;
                                case "new":
                                    s = "1"
                                    break;
                                case "hot":
                                    s = "2"
                                    break;
                                default:
                                    break;
                            }
                            return s
                        }(),
                        tagSelList: function () {
                            let arr = []
                            if (data.isTagSel) {
                                if (data.isTagSel.length > 0) {
                                    data.isTagSel.forEach(item => {
                                        arr.push(item)
                                    })
                                }
                            }
                            arr.push("2")
                            return arr
                        }()
                    }
                })
                break;
            case "list":
                v2.push({
                    module: "nav",
                    setting: setting ? 1 : 0,
                    data: {
                        isIconSel: "1",
                        isNumberSel: "5",
                        isStyleSel: "0",
                        list: function () {
                            let arr = []
                            let i = 0
                            if (data.contListBox) {
                                if (data.contListBox.length > 0) {
                                    data.contListBox.forEach(itemBox => {
                                        arr.push({
                                            desc: itemBox.contName,
                                            url: itemBox.contUrl,
                                            img: "",
                                            urlCatetory: "自定义页面",
                                            urlName: i++
                                        })
                                    })
                                }
                            }
                            return arr
                        }(),
                        styleSelList: []
                    }
                })
                break;
            case "tabdown":
                v2.push({
                    module: "tab-down",
                    setting: setting ? 1 : 0,
                    data: {
                        list: function () {
                            let arr = []
                            let i = 0
                            if (data.imgList) {
                                if (data.imgList.length > 0) {
                                    data.imgList.forEach(itemList => {
                                        arr.push({
                                            desc: itemList.desc,
                                            img: itemList.img,
                                            url: itemList.link,
                                            urlCatetory: "自定义页面",
                                            urlName: i++
                                        })
                                    })
                                }
                            }
                            return arr
                        }()
                    }
                })
                break;
            default:
                break;
        }
    })
    return v2
}

async function getOldData() {
    return new Promise((reslove, reject) => {
        axios.post(getUrl(`console&c=${window.apiAuthority}&a=keep`)).then(({ data: { data, error } }) => {
            if (error == 0 && data != "false") {
                console.log(123)
                let sModules = JSON.stringify(conversion(JSON.parse(data)))
                reslove(sModules)
            } else {
                reslove(false)
            }
        })
    })

}
async function oldSave() {
    let sModules = await getOldData()
    if (sModules) {
        return axios.post(getUrl(`console&c=${window.apiAuthority}&a=oldSave`), qs.stringify({
            data: sModules
        }))
    }
}

export {
    conversion,
    oldSave
}