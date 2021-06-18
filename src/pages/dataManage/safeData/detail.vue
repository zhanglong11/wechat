<template>
  <view class="main">
    <view class="main-body">
      <uni-card>
        <uni-form-item label="制度名称">
          <view class="placeholder">{{ detailInfo.regimeName }}</view>
        </uni-form-item>
        <uni-form-item label="制度编号">
          <view class="placeholder">{{ detailInfo.regimeNumber }}</view>
        </uni-form-item>
        <uni-form-item label="制度内容">
          <view class="placeholder">{{ detailInfo.regimeContent }}</view>
        </uni-form-item>
        <uni-form-item label="创建人">
          <view class="placeholder">{{ detailInfo.creatorName }}</view>
        </uni-form-item>
        <uni-form-item label="创建时间">
          <view class="placeholder">{{ detailInfo.createTime }}</view>
        </uni-form-item>
        <uni-form-item label="备注信息">
          <view class="placeholder">{{ detailInfo.remark }}</view>
        </uni-form-item>
        <uni-form-item class="file-item" label="附件">
          <uni-attachment v-model="detailInfo.files"></uni-attachment>
        </uni-form-item>
      </uni-card>
    </view>
  </view>
</template>

<script>
import Api from './api/index'
export default {
  data() {
    return {
      detailInfo: {}
    }
  },
  onLoad(options) {
    this.id = options.id || ''
    if (this.id) {
      this.init()
    }
  },
  methods: {
    // 获取安全管理制度详情
    init() {
      Api.getManageRegimeDetail(this.id).then(res => {
        this.detailInfo = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../add.less');
.placeholder {
  color: @placeholderColor;
}
.safe-data-delete {
  margin-top: 20px;
}
</style>
