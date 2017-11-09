let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/**
* 16进制的颜色值转成10进制
*/
function colorRgb(opacity,bArr) {
    let sColor = this.toLowerCase();
    if (sColor && reg.test(sColor)) {
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt(sColor.slice(i, i + 2),16));
        }
        if(bArr)return sColorChange
        return opacity == -1 ? `rgb(${sColorChange.join(",")})` : `rgba(${sColorChange.join(",")},${opacity})`
        
    } else {
        return val;
    }
}
export default {
    colorRgb
}