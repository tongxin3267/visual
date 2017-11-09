import Vue from 'vue'

var speed = 50;
function cloneInnerHtml(el, binding) {
    let parentElWidth = el.parentNode.offsetWidth,
        childrenElWidth = el.querySelector(".seamless-scroll-wrapper").offsetWidth,
        elWidth = childrenElWidth * 2;
    if (!binding.value.preview && parentElWidth < childrenElWidth) {
        el.style.width = elWidth + 1 + "px"
        el.innerHTML += el.innerHTML
        clearInterval(window[binding.value.winObj])
        window[binding.value.winObj] = setInterval(marquee, speed, el)
    }
}

function marquee(el) {
    el.style.left = (el.offsetLeft - 1) + "px"
    if (el.offsetLeft < -(el.offsetWidth / 2)) {
        el.style.left = 0
    }
}


export default {
    bind(el, binding) {
        window[binding.value.winObj] = null;
        Vue.nextTick(() => {
            cloneInnerHtml(el, binding);
        })
    },
    update(el, binding) {
        Vue.nextTick(() => {
            cloneInnerHtml(el, binding);
        })
    }
}