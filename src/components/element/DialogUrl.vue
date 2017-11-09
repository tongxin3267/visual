<template>
    <ec-dialog class="dialog-ec" :title="dialogTitle" size="small" top="10%" :visible.sync="bThisShowDialog" @close="thisClose">
        <template v-if="type != 'custom'">
            <ec-table class="dialog-url-table" :data="tableData" :default-sort="{prop: 'id', order: 'ascending'}" :row-style="isShowTr" element-loading-text="拼命加载中" height="441" style="width: 100%">
                <ec-table-column v-for="(column,index) in defaultColumns" :key="index" :label="column.text" :width="column.text == 'ID' ? 100 : ''">
                    <template scope="props">
                        {{props.row[column.field]}}
                    </template>
                </ec-table-column>
                <ec-table-column label="操作" width="100" align="right">
                    <template scope="scope">
                        <ec-button size="mini" type="text" @click="handleSelect(scope.row)">
                            选取</ec-button>
                    </template>
                </ec-table-column>
            </ec-table>
            <div slot="footer" class="dialog-footer">
                <pagination :page-size="pageSize" :current-page="currentPage" :total="total" @current-change="handleCurrentChange" layout="total, prev, pager, next">
                </pagination>
            </div>
        </template>
        <template v-else>
            <div class="form-group">
                <label class="group-l">
                    名称：
                </label>
                <div class="group-r">
                    <ec-input size="small" v-model="sCustomName" placeholder="填写名称"></ec-input>
                </div>
            </div>
            <div class="form-group">
                <label class="group-l">
                    链接：
                </label>
                <div class="group-r">
                    <ec-input size="small" v-model="sCustomUrl" placeholder="添加链接"></ec-input>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <ec-button type="primary" @click.stop="trimCustom">确 定</ec-button>
            </div>
        </template>
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
    Pagination,
    Input
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
        "EcInput": Input,
        Loading,
        Pagination
    },
    data() {
        return {
            defaultColumns: [{
                text: 'ID',
                field: 'cat_id'
            }, {
                text: '名称',
                field: 'cat_name'
            }],
            bThisShowDialog: false,
            sCustomUrl: "",
            sCustomName: ""
        }
    },
    beforeCreate() { },
    mounted() {
    },
    methods: {
        isShowTr(row, index) {
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
        trimCustom() {
            this.$store.dispatch('setModulesUrl', {
                dialogTitle: this.dialogTitle,
                urlName: this.sCustomName,
                url: this.sCustomUrl
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
            type: state => state.dialogUrl.settingType.type,
            total: state => Number(state.dialogUrl.settingType.total),
            pageSize: state => Number(state.dialogUrl.settingType.pageSize),
            currentPage: state => Number(state.dialogUrl.settingType.currentPage),
            modulesIndex: state => Number(state.dialogUrl.settingType.modulesIndex),
            listIndex: state => Number(state.dialogUrl.settingType.listIndex),
            dialogTitle: state => state.dialogUrl.settingType.dialogTitle
        })
    },
    watch: {
        bShowDialog(val, oldVal) {
            this.bThisShowDialog = val
            if (val && this.type == "custom") {
                let list = this.$store.state.modules[this.modulesIndex].data.list[this.listIndex]
                this.sCustomName = list.urlName
                this.sCustomUrl = list.url
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>