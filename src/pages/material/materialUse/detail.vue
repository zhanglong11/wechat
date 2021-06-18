<template>
  <view class="main">
    <scroll-view class="scroll-roll" scroll-y>
      <view class="main-body">
        <view v-if="baseInfo.status !== 1 && baseInfo.status !== 0" class="card-title-info">
          <view class="title">审核信息</view>
        </view>
        <uni-card>
          <uni-form-item label="使用申请单编号" :border="false" align="left">
            <view>{{ baseInfo.code }}</view>
          </uni-form-item>
          <uni-form-item label="" style="margin: 0 0 -15px 0; padding-bottom: 0">
            <view v-if="baseInfo.status >= 0">
              <span class="circle" :style="{ backgroundColor: purchaseStatus[baseInfo.status].color }"></span
              >{{ purchaseStatus[baseInfo.status].label }}
            </view>
          </uni-form-item>
          <uni-form-item label="使用申请单名称" :border="false" align="left">
            <view>{{ baseInfo.applyName }}</view>
          </uni-form-item>
          <uni-form-item label="申请部门" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.applyDepartmentName }}</view>
          </uni-form-item>
          <uni-form-item label="申请原因" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.applyReason }}</view>
          </uni-form-item>
          <uni-form-item label="关联进度" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.schduleName }}</view>
          </uni-form-item>
          <uni-form-item label="指定审核人" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.firstAuditPersonName }}</view>
          </uni-form-item>
          <uni-form-item label="备注" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.remark }}</view>
          </uni-form-item>
          <uni-form-item v-if="baseInfo.purchasePersonName" label="通知采购人" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.purchasePersonName }}</view>
          </uni-form-item>
        </uni-card>

        <view class="card-title-outer">
          <view class="title">采购明细</view>
        </view>
        <uni-card>
          <block v-for="(item, index) in baseInfo.details || []" :key="index">
            <view v-if="index > 0" class="line"></view>
            <uni-form-item label="序号" :border="false" align="left">
              <view class="placeholder">{{ index + 1 > 9 ? index + 1 : '0' + (index + 1) }}</view>
            </uni-form-item>
            <uni-form-item label="材料编码" :border="false" align="left">
              <view class="placeholder">{{ item.materialCode || item.materialEntity.code }}</view>
            </uni-form-item>
            <uni-form-item label="材料名称" :border="false" align="left">
              <view class="placeholder">{{ item.materialName || item.materialEntity.name }}</view>
            </uni-form-item>
            <uni-form-item label="规格型号" :border="false" align="left">
              <view class="placeholder">{{ item.materialModels || item.materialEntity.models }}</view>
            </uni-form-item>
            <uni-form-item label="单位" :border="false" align="left">
              <view class="placeholder">{{ item.materialUnit || item.materialEntity.unit }}</view>
            </uni-form-item>
            <uni-form-item label="品牌" :border="false" align="left">
              <view class="placeholder">{{ item.materialBrand || item.materialEntity.brand }}</view>
            </uni-form-item>
            <uni-form-item label="供应商" :border="false" align="left">
              <view class="placeholder">{{ item.materialSupplier || item.materialEntity.supplier }}</view>
            </uni-form-item>
            <uni-form-item label="库存量" :border="false" align="left">
              <view class="placeholder">{{
                  item.materialInventoryNumber || item.materialEntity.inventoryNumber || 0
                }}</view>
            </uni-form-item>
            <!--            <uni-form-item label="预算量" :border="false" align="left">-->
            <!--              <view class="placeholder">{{ item.budgetNumber }}</view>-->
            <!--            </uni-form-item>-->
            <uni-form-item label="材料使用数量" :border="false" align="left">
              <view class="placeholder">{{ item.number }}</view>
            </uni-form-item>
          </block>
        </uni-card>

        <block v-if="baseInfo.status > 1">
          <uni-card title="审核结果">
            <!--            <view v-for="item in baseInfo.auditRecordList" :key="item.auditTime">-->
            <uni-form-item label="审核结果" :border="false">
              <view>{{ $getLabel(purchaseStatus, baseInfo.status) }}</view>
              <!--              <view v-if="baseInfo.status">{{ // baseInfo.status===2?:"" }}</view>-->
            </uni-form-item>
            <!--            <uni-form-item label="备注" :border="false">-->
            <!--              <view>{{ baseInfo.taskRemark }}</view>-->
            <!--            </uni-form-item>-->
            <!--            <uni-form-item label="附件" :border="false">-->
            <!--              <uni-attachment v-model="baseInfo.reviewFileId"></uni-attachment>-->
            <!--            </uni-form-item>-->
            <uni-form-item label="审核人" :border="false">{{ baseInfo.firstAuditPersonName }}</uni-form-item>
            <uni-form-item label="审核意见" :border="false">
              <view>{{ baseInfo.auditOpinion }}</view>
            </uni-form-item>
            <uni-form-item label="审核日期" :border="false" style="border-bottom: 1px solid #f5f5f5">
              <view>{{ baseInfo.auditDate | ymd }}</view>
            </uni-form-item>
            <!--            </view>-->
          </uni-card>
        </block>
        <!-- 审批记录 start -->
        <uni-check-detail :id="id"></uni-check-detail>
        <!-- 审批记录 end -->
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { Api } from '@/api/material/purchaseOrder'
import purchaseStatus from './lib/purchaseStatus'
// import purchaseType from '@/pages/material/purchaseOrder/lib/purchaseType'
import _ from 'lodash'
import moment from 'moment'

export default {
  data() {
    return {
      id: '',
      isDraft: true, //是否草稿
      baseInfo: {},
      purchaseStatus,
      // purchaseType,
      showBarOperate: false,
      status: '',
      totalPrice: '',
      //审核是否合格：
      IsCheck: [
        { name: '通过', value: 2 },
        { name: '驳回', value: 3 }
      ],
      //是否继续
      IsContinue: [
        { name: '是', value: 1 },
        { name: '否', value: 0 }
      ],
      form: {
        nextPersonName: '',
        status: '',
        auditOpinion: '',
        isContinueAudit: '',
        auditTime: moment().format('YYYY-MM-DD')
      },
      personRules: {
        nextPersonName: {
          required: true
        }
      },
      rules: {
        auditTime: { required: true },
        status: { required: true },
        isContinueAudit: { required: true },
        nextPersonName: { required: true }
      },
      subRules: {
        arrivalNumber: {
          required: true
        },
        enableInputNumber: {
          required: true
        }
      },
      //检查结果是否合格
      IsCheckText: '',
      //检查结果是否继续
      IsContinueText: '',
      IsContinueValue: ''
    }
  },
  computed: {
    ...mapGetters(['projectId'])
  },
  onLoad(options) {
    this.id = options.id || ''
    this.status = options.status || ''
    this.isDraft = Number(options.status) === 0
    this.init()
  },
  methods: {
    init() {
      // 通过请求获取材料详情
      Api.getMaterialApplyDetail(this.id).then(res => {
        this.baseInfo = res.data || {}

        //计算采购金额
        let totalPrice = 0
        const base = 1000 //用来避免小数计算产生异常
        if (this.baseInfo) {
          _.forEach(this.baseInfo.detailList, item => {
            if (item.univalence && item.number) {
              totalPrice += item.univalence * base * (item.number * base)
            }
          })
          this.totalPrice = totalPrice / base / base
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import './detail.less';
</style>
