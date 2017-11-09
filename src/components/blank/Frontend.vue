<template>
    <div class='blank' :style="{height:sHeight}">
    </div>
</template>

<script>
    //mixins
    import frontendGet from 'mixins/frontend-get'
    export default {
        name: 'blank',
        props: ['data', 'preview'],
        mixins: [frontendGet],
        data() {
            return {
            }
        },
        beforeMount() {
        },
        computed: {
            sHeight(){
                return (Number(this.data.allValue.height)/10)+'rem'
            }
        }
    }

</script>

<style scoped>

</style>