<template>
  <div id="dashboard" class="dashboard">
    <ec-menu></ec-menu>
    <ec-pages class="das-admin-pages"></ec-pages>
    <div class="warpper" :class="{'close-page-list':!bPageListTitle}">
      <ec-edit-area class="das-admin-edit-area"></ec-edit-area>
      <ec-preview-area class="das-admin-preview-area"></ec-preview-area>
      <ec-other-area class="das-admin-other-area"></ec-other-area>
    </div>
    <dialog-url :table-data="dialogUrlList"></dialog-url>
    <dialog-picture :dialog-picture-list="dialogPictureList" :thumb-list="thumbList"></dialog-picture>
    <dialog-goods></dialog-goods>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

import EcMenu from './components/Menu'
import EcPages from './components/Pages'
import EcEditArea from './components/EditArea'
import EcPreviewArea from './components/PreviewArea'
import EcOtherArea from './components/OtherArea'
// custom components
import DialogUrl from 'components/element/DialogUrl'
import DialogPicture from 'components/element/DialogPicture'
import DialogGoods from 'components/element/DialogGoods'


//第三方插件
import draggable from 'vuedraggable'
export default {
  name: 'dashboard',
  components: {
    draggable,
    EcMenu,
    EcPages,
    EcEditArea,
    EcPreviewArea,
    EcOtherArea,
    DialogUrl,
    DialogPicture,
    DialogGoods
  },
  data() {
    return {
    }
  },
  beforeMount() {
    this.$store.dispatch('setDocConfig')//将本地配置信息赋值给store  configInfo对象
  },
  computed: {
    ...mapState({
      dialogUrlList: state => state.dialogUrl.urlList,
      dialogPictureList: state => state.dialogPicture.pictureList,
      thumbList: state => state.dialogPicture.thumbList,
      bPageListTitle: state => state.dashboard.configInfo.headerMenu.pageListTitle.isActive
    })
  }
}

</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
$admin-pages-width:216px;
$admin-tool-top:12px;
$admin-preview-area-w:470px;
$admin-other-area-w:192px;
$warpper-l: ($admin-pages-width + $admin-tool-top);
$admin-preview-area-r: ($admin-other-area-w + $admin-preview-area-w + $admin-tool-top * 3);

body {
  min-width: 1440px;
}

.das-admin-pages {
  width: $admin-pages-width;
  position: fixed;
  top: $header-height;
  bottom: 0;
  background: #fff;
  z-index: 1;
}

.warpper {
  position: absolute;
  top: (52px+$admin-tool-top);
  right: 0;
  bottom: $admin-tool-top;
  left: $warpper-l;
  min-width: (1380px - $admin-pages-width);
  overflow: hidden;
  @include transition(left, .3s)
}

.warpper.close-page-list {
  left: 1rem;
  @include transition(left, .3s)
}

.das-admin-edit-area,
.das-admin-preview-area,
.das-admin-other-area {
  position: absolute;
  height: 100%;
  background: $write-color;
}

.das-admin-edit-area {
  left: 0;
  ;
  right: $admin-preview-area-r;
}

.das-admin-preview-area {
  width: $admin-preview-area-w;
  right: ($admin-other-area-w + $admin-tool-top * 2);
}

.das-admin-other-area {
  width: $admin-other-area-w;
  right: $admin-tool-top;
}
</style>