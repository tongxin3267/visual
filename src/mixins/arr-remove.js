/**
 * Array数组原型添加删除方法
 */
function remove(val,number) {
    let arrIndex = this.indexOf(val),
        num =  Number(number)
    if(num > this.length) num = this.length
    if(arrIndex != -1 && num > 0){
        this.splice(arrIndex, num)
    }
}

export default {
    remove
}