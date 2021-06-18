<template>
  <view class="main">
    <view class="main-body">
      <uni-card>
        <uni-form-item label="规范名称">
          <view class="placeholder">{{ detailInfo.specificationName }}</view>
        </uni-form-item>
        <uni-form-item label="规范编号">
          <view class="placeholder">{{ detailInfo.specificationNumber }}</view>
        </uni-form-item>
        <uni-form-item label="类别">
          <view class="placeholder">{{ $getLabel(norm, detailInfo.category) }}</view>
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
          <uni-attachment v-model="detailInfo.contentFileIds"></uni-attachment>
        </uni-form-item>
      </uni-card>
    </view>
  </view>
</template>

<script>
import Api from './api/index'
import norm from './lib/norm'
export default {
  data() {
    return {
      norm,
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
    // 获取验收规范详情
    init() {
      Api.getCheckSpecificDetail(this.id).then(res => {
        this.detailInfo = res.data
      })
    },
  }
}
</script>

<style lang="less" scoped>
@import url('../add.less');
.placeholder {
  color: @placeholderColor;
}
.quality-data-delete {
  margin-top: 20px;
}
</style>
