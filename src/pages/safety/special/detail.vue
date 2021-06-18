<template>
  <view class="main">
    <view class="main-body">
      <view>
        <view class="card">
          <uni-form-item label="工种">
            <view class="disabled">{{ $getLabel(workTypeList, info.workType) }}</view>
          </uni-form-item>
          <uni-form-item label="施工部位">
            <view class="disabled">{{ info.constructionArea }}</view>
          </uni-form-item>
          <uni-form-item label="作业类型/内容">
            <view class="disabled">{{ info.taskContentType }}</view>
          </uni-form-item>
          <uni-form-item label="施工负责人">
            <view class="disabled">{{ info.constructionMangerName }}</view>
          </uni-form-item>
          <uni-form-item label="计划起始日期">
            <view class="disabled">{{ info.planStartDate | ymd }}~{{ info.planEndDate | ymd }}</view>
          </uni-form-item>
          <uni-form-item label="安全防护措施">
            <view class="disabled">{{ info.safetyPrecautions }}</view>
          </uni-form-item>
          <uni-form-item label="创建人">
            <view class="disabled">{{ info.creatorName }}</view>
          </uni-form-item>
          <uni-form-item label="创建时间">
            <view class="disabled">{{ info.createTime }}</view>
          </uni-form-item>
          <uni-form-item class="file-item" label="现场照片">
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
import Api from '@/pages/safety/api'
import { mapGetters } from 'vuex'
export default {
  name: 'SafetySpecialDetail',
  components: {},
  data() {
    return {
      info: {},
      id: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['userId']),
    //工种类型
    workTypeList() {
      return this.$getArgList('workType') || []
    }
  },
  onLoad(options) {
    this.id = options.id
    this.init()
  },
  onShow() {},
  mounted() {},
  methods: {
    //初始化页面参数
    init() {
      this.getDetail()
    },
    //获取详情
    async getDetail() {
      let res = await Api.getSpecialDetail(this.id)
      this.info = { ...res.data }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/pages/quality/detail.less');
</style>
