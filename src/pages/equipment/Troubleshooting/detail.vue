<template>
  <view class="main">
    <view class="main-body">
      <uni-card :title="`${baseInfo.equipmentName || ''}${baseInfo.equipmentCode || ''}` || '设备名称'">
        <uni-form-item label="设备维修编码" align="left">
          <view class="placeholder">{{ baseInfo.code }}</view>
        </uni-form-item>

        <uni-form-item label="规格型号" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.models }}</view>
        </uni-form-item>
        <uni-form-item label="故障发生时间" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.faultTime | formatDataTime }}</view>
        </uni-form-item>
        <uni-form-item label="故障等级" :border="false" align="left">
          <view class="placeholder">{{ $getLabel(levelList, baseInfo.level) }}</view>
        </uni-form-item>
        <uni-form-item label="故障类别" :border="false" align="left">
          <view class="placeholder">{{ $getLabel(categoryList, baseInfo.type) }}</view>
        </uni-form-item>
        <uni-form-item label="故障描述" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.description }}</view>
        </uni-form-item>

        <uni-form-item label="是否外委" :border="false" align="left">
          <view class="placeholder">{{ $getLabel(isOutsourceList, baseInfo.isOutsource) }}</view>
        </uni-form-item>
        <uni-form-item label="操作人员" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.operatorName }}</view>
        </uni-form-item>
        <uni-form-item label="操作人员电话" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.operatorPhone }}</view>
        </uni-form-item>
        <uni-form-item label="维修班组" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.repairDepartmentName }}</view>
        </uni-form-item>
        <uni-form-item label="紧急程度" :border="false" align="left">
          <view class="placeholder">{{ $getLabel(urgencyList, baseInfo.urgency) }}</view>
        </uni-form-item>
        <uni-form-item label="是否停机" :border="false" align="left">
          <view class="placeholder">{{ $getLabel(isStopList, baseInfo.isStop) }}</view>
        </uni-form-item>
      </uni-card>
      <uni-card>
        <uni-form-item label="创建人" :border="false" align="left">
          <view class="placeholder"> {{ baseInfo.creatorName }}</view>
        </uni-form-item>

        <uni-form-item label="创建时间" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.createTime | ymd }}</view>
        </uni-form-item>
      </uni-card>

      <uni-card class="attachmentInfo">
        <uni-form-item label="备注" :border="false" align="left">
          <view class="placeholder"> {{ baseInfo.remark }}</view>
        </uni-form-item>

        <uni-form-item label="附件" :border="false" align="left">
          <uni-attachment v-if="baseInfo.fileIds" v-model="baseInfo.fileIds"></uni-attachment>
        </uni-form-item>
      </uni-card>
      <!-- 审批记录 start -->
      <uni-check-detail v-if="baseInfo.repairStatus === 1" :id="id"></uni-check-detail>
      <!-- 审批记录 end -->
      <!-- 报修基本信息 end  -->
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import levelList from './lib/levelList'
import categoryList from './lib/categoryList'
import urgencyList from './lib/urgencyList'
import isStopList from './lib/isStopList'
import isOutsourceList from './lib/isOutsourceList'
import checkResult from './lib/checkResult'
import moment from 'moment'

export default {
  data() {
    return {
      id: '', //设备ID
      isDraft: true, //是否草稿
      repairStatus: null, //报修单状态
      baseInfo: {}, //设备基本信息
      levelList,
      categoryList,
      urgencyList,
      isStopList,
      isOutsourceList,
      checkResult,
      // 报修审核数据
      form: {
        status: null
      },
      rules: {
        status: {
          required: true
        },
        optionContent: {
          required: true
        }
      },
      createTime: moment().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    ...mapGetters(['projectId', 'userName'])
  },
  onLoad(options) {
    this.form.id = this.id = options.id
    this.repairStatus = Number(options.repairStatus)
    this.isDraft = this.repairStatus === 0
  },
  onShow() {
    this.init()
  },
  onNavigationBarButtonTap(obj) {
    if (obj.type === 'menu' && this.isDraft) {
      this.showMenu()
    }
  },
  methods: {
    async init() {
      let result = await this.fly.material.get(`equipmentRepair/get/${this.id}`)
      console.log(result)
      if (result.code === 200) {
        this.baseInfo = result.data || {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('detail.less');
</style>
