import Vue from 'vue'

const href = {
    bind(el, binding) {
        const { sUrl, preview } = binding.value
        preview || sUrl == "" || !sUrl ? el.href = "javascript:;" : el.href = binding.value.sUrl
    }
}

const boxProductW = {
    bind(el, binding) {
        Vue.nextTick(() => {
            let { bSizeSel, preview,type } = binding.value
            if ((bSizeSel != 2 && !preview) || (type=="store")) {
                el.style.height = el.offsetWidth + "px"
                el.style.lineHeight = el.offsetWidth + "px"
                
            }
        })
    }
}

export {
    href,
    boxProductW
}