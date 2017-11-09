<template>
    <hr class="line" :style="hrStyle" />
</template>

<script>
    //mixins
    import frontendGet from 'mixins/frontend-get'
    export default {
        name: 'line',
        props: ['data', 'preview'],
        mixins: [frontendGet],
        data() {
            return {
    
            }
        },
        beforeMount() {},
        computed: {
            hrStyle() {
                return {
                    height: this.nHeight + 'px',
                    backgroundColor: this.sBgColor
                }
            },
            nHeight() {
                return this.data.allValue.height
            },
            sBgColor() {
                return this.getText({
                    dataNext: "allValue",
                    attrName: "bgColor",
                    defaultValue: ""
                })
            }
        }
    }
</script>

<style scoped>
    hr.line {
        height: 10px;
        border: 0;
        background: none;
    }
</style>