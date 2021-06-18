<template>
  <view class="main">
    <view class="main-body">
      <view>
        <view class="card">
          <uni-form-item label="危险源名称">
            <view class="disabled">{{ info.dangerSource }}</view>
          </uni-form-item>
          <uni-form-item label="伤害类型">
            <view class="disabled">{{ $getLabel(harmTypeList, info.harmCategory) }}</view>
          </uni-form-item>
          <uni-form-item label="防范措施">
            <view class="disabled">{{ info.precautionaryMeasure }}</view>
          </uni-form-item>
          <uni-form-item label="备注">
            <view class="disabled">{{ info.dangerSourceRemark }}</view>
          </uni-form-item>
          <uni-form-item class="file-item" label="附件">
            <uni-attachment v-model="info.fileId"></uni-attachment>
          </uni-form-item>
          <uni-form-item label="检查结果">
            <view class="disabled">{{ ['不合格', '合格'][info.firstInspectStatus] }}</view>
          </uni-form-item>
          <uni-form-item label="检查人">
            <view class="disabled">{{ info.creatorName }}</view>
          </uni-form-item>
          <uni-form-item label="检查时间">
            <view class="disabled">{{ info.createTime }}</view>
          </uni-form-item>
        </view>
        <block v-for="(item, index) in info.rectifyReviewList" :key="index">
          <uni-card v-if="item.rectifyReviewFlag === 0" isForm>
            <div slot="title" class="card-title">
              <div>整改</div>
            </div>
            <uni-form-item label="整改方法">
              <view class="disabled">{{ item.rectifyContent }}</view>
            </uni-form-item>
            <uni-form-item label="整改人">
              <view class="disabled">{{ item.rectifyPrincipalName }}</view>
            </uni-form-item>
            <uni-form-item label="整改时间">
              <view class="disabled">{{ item.rectifyTime }}</view>
            </uni-form-item>
            <uni-form-item class="file-item" label="现场照片">
              <uni-attachment v-model="item.rectifyFileId"></uni-attachment>
            </uni-form-item>
          </uni-card>
          <uni-card v-if="item.rectifyReviewFlag === 1" isForm>
            <div slot="title" class="card-title">
              <div>复查</div>
            </div>
            <uni-form-item label="复查结果">
              <view class="disabled">{{ ['不合格', '合格'][item.reviewResult] }}</view>
            </uni-form-item>
            <uni-form-item v-if="item.reviewResult === 0" label="复查意见">
              <view class="disabled">{{ item.reviewOpinion }}</view>
            </uni-form-item>
            <uni-form-item label="复查人">
              <view class="disabled">{{ item.reviewPrincipalName }}</view>
            </uni-form-item>
            <uni-form-item label="复查时间">
              <view class="disabled">{{ item.reviewTime }}</view>
            </uni-form-item>
            <uni-form-item class="file-item" label="现场照片">
              <uni-attachment v-model="item.reviewFileId"></uni-attachment>
            </uni-form-item>
          </uni-card>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
import Api from '@/pages/safety/api'
import { mapGetters } from 'vuex'
export default {
  name: 'SafetyDangerCheckDetail',
  components: {},
  data() {
    return {
      info: {},
      optionList: [
        { label: '不合格', value: 0 },
        { label: '合格', value: 1 }
      ],
      id: '',
      isLoading: false,
      checkForm: { firstInspectStatus: null, fileId: '', remark: '' },
      checkFormRules: {},
      rectifyForm: {},
      rectifyFormRules: {
        rectifyContent: { required: true },
        rectifyFileId: { required: true }
      },
      reviewForm: {},
      reviewFormRules: {
        reviewResult: { required: true },
        reviewFileId: { required: true },
        reviewOpinion: { required: true }
      }
    }
  },
  computed: {
    ...mapGetters(['userId']),
    //伤害类型
    harmTypeList() {
      return this.$getArgList('harmType') || []
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
      let res = await Api.getDangerInspectDetail(this.id)
      this.info = { ...res.data }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/pages/quality/detail.less');
@import url('~@/pages/quality/add.less');
</style>
