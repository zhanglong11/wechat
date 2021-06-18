<template>
  <view class="main">
    <view class="main-body">
      <view>
        <view class="card">
          <uni-form-item label="检查计划编号">
            <view>{{ info.planNum }}</view>
          </uni-form-item>
          <uni-form-item label="计划起止时间">
            <view>{{ info.planStartTime | ymd }}~{{ info.planEndTime | ymd }} </view>
          </uni-form-item>
          <uni-form-item label="检查周期(天)">
            <view>{{ info.inspectDuration }}</view>
          </uni-form-item>
          <uni-form-item label="检查要求">
            <view>{{ info.inspectRequirements }}</view>
          </uni-form-item>
          <uni-form-item label="检查人">
            <view>{{ info.inspectPrincipalName }}</view>
          </uni-form-item>
          <uni-form-item label="检查次数">
            <view>{{ info.implementationList.length }}</view>
          </uni-form-item>
          <uni-form-item label="创建人">
            <view>{{ info.creatorName }}</view>
          </uni-form-item>
          <uni-form-item label="创建时间">
            <view>{{ info.createTime }}</view>
          </uni-form-item>
          <uni-form-item label="状态">
            <view>{{ ['停用', '启用'][info.status - 1] }}</view>
          </uni-form-item>
          <uni-form-item class="file-item" label="附件">
            <uni-attachment v-model="info.fileId"></uni-attachment>
          </uni-form-item>
        </view>
      </view>
      <!-- 审批记录 start -->
      <uni-check-detail :id="id"></uni-check-detail>
      <!-- 审批记录 end -->
    </view>
  </view>
</template>

<script>
import Api from '@/pages/quality/api'
import { mapGetters } from 'vuex'
export default {
  name: 'QualityInspectionDetail',
  components: {},
  data() {
    return {
      info: {},
      id: '',
      isDraft: true, //是否草稿
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  onLoad(options) {
    this.id = options.id
    this.status = options.status || ''
    this.isDraft = Number(options.status) === 0
    this.init()
  },
  methods: {
    //初始化页面参数
    init() {
      this.getDetail()
    },
    //获取详情
    async getDetail() {
      let res = await Api.getPlanDetail(this.id)
      this.info = { ...res.data }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('detail.less');
</style>
