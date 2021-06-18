<template>
  <view class="main">
    <scroll-view class="scroll-roll" scroll-y>
      <view class="main-body">
        <uni-card>
          <uni-form-item label="材料编码" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.code }}</view>
          </uni-form-item>
          <uni-form-item label="材料名称" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.name }}</view>
          </uni-form-item>
          <uni-form-item label="规格型号" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.models }}</view>
          </uni-form-item>
          <uni-form-item label="单位" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.unit }}</view>
          </uni-form-item>
          <uni-form-item label="品牌" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.brand }}</view>
          </uni-form-item>
          <uni-form-item label="供应商" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.supplier }}</view>
          </uni-form-item>
          <uni-form-item label="库存量" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.inventoryNumber }}</view>
          </uni-form-item>
          <uni-form-item label="备注" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.remark }}</view>
          </uni-form-item>
        </uni-card>

        <!-- 创建人信息 start -->
        <uni-card>
          <uni-form-item label="创建人" :border="false" align="left">
            <view class="placeholder"> {{ baseInfo.creatorName }}</view>
          </uni-form-item>

          <uni-form-item label="创建日期" :border="false" align="left">
            <view class="placeholder">{{ (baseInfo.createTime || '') | formatDataTime }}</view>
          </uni-form-item>
        </uni-card>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  data() {
    return {
      materialId: '',
      baseInfo: {}
    }
  },
  computed: {
    ...mapGetters(['projectId'])
  },
  onLoad(options) {
    this.materialId = options.id
  },
  onShow() {
    this.init()
  },
  methods: {
    async init() {
      let result = await this.fly.material.get(`material/get/${this.materialId}`)
      if (result.code === 200) {
        this.baseInfo = result.data || {}
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/common';
.uni-card {
  width: 100%;
}
.main {
  padding-bottom: 30px;
}
.placeholder {
  color: @placeholderColor;
}
.btn-wrapper {
  width: 680px;
}
</style>
