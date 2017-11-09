<template>
    <ec-dialog class="dialog-ec" :title="dialogTitle" size="small" top="10%" :visible.sync="bThisShowDialog" @close="thisClose">
        
    </ec-dialog>
</template>

<script>
// mapActions mapState
import {
    mapActions,
    mapState
} from 'vuex'

// third party components
import {
    Table,
    TableColumn,
    Button,
    Loading,
    Dialog,
    Pagination
} from 'element-ui'

export default {
    name: "dialog-url",
    props: {
        tableData: {},
    },
    components: {
        "EcTable": Table,
        "EcTableColumn": TableColumn,
        "EcButton": Button,
        "EcDialog": Dialog,
        Loading,
        Pagination
    },
    data() {
        return {
            bThisShowDialog:false
        }
    },
    beforeCreate() { },
    mounted() { },
    methods: {
        isShowTr(row, index) {
            
            if (row.lev != 0 && !row.show) {
                // return "display:none"
            }
        },
        handleCurrentChange(val) { //分页
            this.$store.dispatch('setDialogUrl', {
                bShowDialog: true,
                type: this.type,
                currentPage: val,
                pageSize: this.pageSize,
                modulesIndex: this.modulesIndex,
                listIndex: this.listIndex,
                dialogTitle: this.dialogTitle
            })
        },
        handleSelect(o) {
            this.$store.dispatch('setModulesUrl', {
                dialogTitle: this.dialogTitle,
                urlName: o.cat_name,
                url: o.url
            })
            this.thisClose()
        },
        thisClose() { //关闭
           
            this.$store.dispatch('onOffDialogUrl', {
                bShowDialog: false
            })
        }
    },
    computed: {
        ...mapState({
            bShowDialog: state => state.dialogUrl.settingType.bShowDialog,
            modulesIndex: state => Number(state.dialogUrl.settingType.modulesIndex),
            listIndex: state => Number(state.dialogUrl.settingType.listIndex),
            dialogTitle: state => state.dialogUrl.settingType.dialogTitle
        })
    },
    watch: {
        bShowDialog(val,oldVal){
            this.bThisShowDialog = val
        }
    }
}
</script>

<style lang="scss" scoped>

</style>