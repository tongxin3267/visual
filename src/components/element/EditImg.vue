<template>
    <div class='edit-img'>
        <figure class="edit-img-figure">
            <span class="edit-img-update-click" @click.stop="showDialogPicture">
                <i class="iconfont icon-camera1"></i>
            </span>
            <img :src="image" alt="" v-if="bImage" />
            <img src="../../assets/images/default-img.jpg" alt="" v-else/>
        </figure>
    </div>
</template>

<script>
// mapActions mapState
import {
    mapActions,
    mapState
} from 'vuex'

export default {
    name: 'edit-img',
    props: {
        image: {

        },
        listIndex: {
            type: Number,
            default: -1,
        },
        modulesIndex: {
            type: Number,
            default: -1,
        },
        allValuesType: {
            type: String
        }
    },
    created() {
    },
    methods: {
        showDialogPicture() {
            if (sessionStorage.getItem("aPicture"))
                sessionStorage.removeItem("aPicture")
            let o = {
                bShowDialog: true,
                currentPage: 1,
                pageSize: 12,
                oneOrMore: "one",
                modulesIndex: this.modulesIndex
            }
            if (this.allValuesType) {
                o.allValuesType = this.allValuesType
            } else {
                o.listIndex = this.listIndex
            }
            this.$store.dispatch('setDialogPicture', o)
        }
    },
    computed: {
        localHttp(){
            return !this.release ? `${window.ROOT_PIC}${window.PC_URL}` : window.PC_URL
        }, 
        bImage() {
            return this.image == "" || typeof (this.image) == "undefined" ? false : true
        }
    }
}

</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.edit-img .edit-img-figure {
    position: relative;
    width: 8rem;
    height: 8rem;
    box-sizing: border-box;
    text-align: center;
    line-height: 8rem;
    padding: .4rem;
    border: 1px solid $border-color-split;
    @include direction(center, center);
}

.edit-img .edit-img-figure img {
    max-width: 100%;
    max-height: 100%;
    display: block;
}

.edit-img .edit-img-update-click {
    position: absolute;
    height: 100%;
    width: 100%;
    left:0;
    top:0;
    background: rgba(0, 0, 0, .4);
    visibility: hidden;
    opacity: 0;
    z-index: 1;
    @include transition(all, .2s);
}

.edit-img .edit-img-figure span i {
    color: rgba(255, 255, 255, .8);
    font-size: 4rem;
}

.edit-img .edit-img-figure:hover .edit-img-update-click {
    cursor: pointer;
    visibility: visible;
    opacity: 1;
    @include transition(all, .2s);
}
</style>