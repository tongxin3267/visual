import dateFormat from './date-format'
/**
 * 返回一个倒计时字符串或者分解后的对象
 * @param {*} endTime 
 * @param {*} bNotDay 
 * @param {*} bObj 
 */
function getTime(endTime, type, bNotDay, bObj) {
    let now = new Date(),
        end = new Date(Number(endTime) * 1000),
        // end = new Date(endTime),
        leftTime = end.getTime() - now.getTime(),
        d, h, m, s 
    d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
    bNotDay ? h = Math.floor(leftTime / 1000 / 60 / 60) : h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
    m = Math.floor(leftTime / 1000 / 60 % 60)
    s = Math.floor(leftTime / 1000 % 60)
    h = checkTime(h)
    m = checkTime(m)
    s = checkTime(s)
    if (leftTime <= 0 || isNaN(leftTime)) return false
    return bObj ? { d:d, h: h, m: m, s: s } : `${d}:${h}:${m}:${s}`
}


function checkTime(val) {
    if (val < 10) {
        return "0" + val
    }else{
        return val
    }
}

export default {
    getTime
}
