import qs from 'qs'
import axios from 'axios'
import Vue from 'vue'

import {
    Loading,
    MessageBox,
    Message
} from 'element-ui';

async function getModules(o, oF) {
    let loadingInstance = Loading.service({ fullscreen: true, text: "玩命加载中……" })
    axios.post(getUrl(`console&c=${window.apiAuthority}&a=view`), qs.stringify(o)).then(res => {
        if (!res.data.view) {
            loadingInstance.close()
            location.href = `${window.ROOT_URL}`
            return
        }
        setTimeout(() => {
            oF.getModule({
                moduleData: res.data.view.data,
                id: o.id,
                title: o.title,
                type: res.data.view.type,
                default: res.data.view.default
            })
            loadingInstance.close()
        }, 100)
    }).catch(err => {
        console.error(err)
    })
}

function saveModules(o) {
    let thisO = {}
    if (o.title && o.title) {
        Object.assign(thisO, {
            title: o.title,
            ruid: o.ruid,
        })
    }
    if (o.modulesId && o.modules) {
        Object.assign(thisO, {
            id: o.modulesId,
            data: o.modules,
        })
    }
    return axios.post(getUrl(`console&c=${window.apiAuthority}&a=save`), qs.stringify(thisO))
}

function tipsSaveModules(o) {
    return new Promise((resolve, reject) => {
        MessageBox.confirm("当前页面数据有改动，是否保存？", "提示", {
            confirmButtonText: '保存',
            cancelButtonText: '丢弃',
            type: 'warning',
        }).then(() => {
            saveModules(o).then(({ data: { error } }) => {
                error == 1 ? reject(false) : resolve(true)
            })
        }).catch(err => {
            reject("messageBox catch")
        })
    })
}

function removeModules(o) {
    return new Promise((resolve, reject) => {
        MessageBox.confirm(`删除 "${o.title}" 页面将无法恢复，是否继续？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).then((action) => {
            axios.post(getUrl(`console&c=${window.apiAuthority}&a=del`), qs.stringify({
                id: o.id
            })).then(({ data: { error } }) => {
                error == 1 ? reject(false) : resolve(true)
            })
        }).catch((err) => {
            reject("messageBox catch")
        })
    })
}

function updateModulesTitle(o) {
    return axios.post(getUrl(`console&c=${window.apiAuthority}&a=title`), qs.stringify({
        id: o.id,
        title: o.title
    }))
}

export default {
    getModules,
    saveModules,
    tipsSaveModules,
    removeModules,
    updateModulesTitle,
}
