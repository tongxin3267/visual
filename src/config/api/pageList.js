import url from 'url'
import qs from 'qs'
import axios from 'axios'
import {oldSave} from 'assets/js/data-conversion'

async function getPageList(o) {
    await oldSave()
    return new Promise((reslove, reject) => {
        axios.post(getUrl(`console&c=${window.apiAuthority}&a=view`), qs.stringify({
            ruid: o.ruid,
            default: o.sDefault,
            number: o.number
        })).then(res => {
            reslove(res)
        }).catch(err => {
            console.error(err)
        })
    })
}
export default {
    getPageList
}