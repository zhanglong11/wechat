<template>
  <view class="main">
    <view class="main-body">
      <uni-card>
        <uni-form-item label="资料名称">
          <view class="placeholder">{{ detailInfo.name }}</view>
        </uni-form-item>
        <uni-form-item label="资料描述">
          <view class="placeholder">{{ detailInfo.desp }}</view>
        </uni-form-item>
        <uni-form-item label="项目名称">
          <view class="placeholder">{{ $store.state.project.projectName }}</view>
        </uni-form-item>
        <uni-form-item label="分类">
          <view class="placeholder">{{ informationType }}</view>
        </uni-form-item>
        <uni-form-item label="文件数量">
          <view class="placeholder">{{ detailInfo.fileList.length }}</view>
        </uni-form-item>
        <uni-form-item label="备注信息">
          <view class="placeholder">{{ detailInfo.remark }}</view>
        </uni-form-item>
      </uni-card>
    </view>

    <view v-if="detailInfo.fileList.length" class="file-data-title">资料目录</view>

    <uni-card v-if="detailInfo.fileList.length" style="margin-top: 0px">
      <ul>
        <li v-for="(item, index) in detailInfo.fileList" :key="index" class="file-list" @click="toDetail(item)">
          <span class="file-item-name">
            <span class="ellipsis">{{ item.fileName }}</span>
          </span>
          <span style="display: flex; align-items: baseline">
            <span class="placeholder file-item-time">{{ item.createTime }}</span>
            <span class="file-item-view"></span>
          </span>
          <span v-if="detailInfo.fileList.length - 1 !== index" class="file-item-border"></span>
        </li>
      </ul>
    </uni-card>
  </view>
</template>

<script>
import Api from './api/index'
export default {
  data() {
    return {
      detailInfo: {
        fileList: []
      },
      informationType: ''
    }
  },
  onLoad(options) {
    this.id = options.id || ''
    if (this.id) {
      this.init()
    }
  },
  methods: {
    // 获取资料详情
    init() {
      Api.getProjectDataDetail(this.id).then(res => {
        this.detailInfo = res.data
        let informationTypeList = this.$getArgList('informationType') || []
        this.informationType = informationTypeList[0]
          ? informationTypeList.filter(info => info.value === this.detailInfo.informationType)[0].label
          : ''
      })
    },
    // 打开文件详情
    toDetail(item) {
      this.$utils.toUrl(`/pages/dataManage/projectData/file-detail?fileId=${item.fileId}&id=${this.id}`)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('add.less');
.placeholder {
  color: @placeholderColor;
}
.file-data-title {
  font-size: 14px;
  padding: 0px 0px 40px 68px;
}
.project-data-delete {
  margin-top: 20px;
}
.file-item-time {
  font-size: 12px;
}
</style>
