<template>
  <view class="main">
    <view class="main-body">
      <uni-card>
        <uni-form-item label="租赁单编号" :border="false" align="left">
          <view>{{ baseInfo.code }}</view>
        </uni-form-item>
        <uni-form-item label="" style="margin: 0 0 -15px 0; padding-bottom: 0">
          <view v-if="baseInfo.status >= 0">
            <span class="circle" :style="{ backgroundColor: purchaseStatus[baseInfo.status].color }"></span
            >{{ purchaseStatus[baseInfo.status].label }}
          </view>
        </uni-form-item>

        <uni-form-item label="申请部门" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.applyDepartmentName }}</view>
        </uni-form-item>
        <uni-form-item label="申请原因" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.applyReason }}</view>
        </uni-form-item>
        <uni-form-item label="使用位置" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.usePart }}</view>
        </uni-form-item>
        <uni-form-item label="设备使用人" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.userName }}</view>
        </uni-form-item>
        <uni-form-item label="设备使用单位" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.useCompanyName }}</view>
        </uni-form-item>
        <uni-form-item label="租赁单位" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.leaseCompany }}</view>
        </uni-form-item>
        <uni-form-item label="租赁人" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.leaseUserName }}</view>
        </uni-form-item>
        <uni-form-item label="租赁联系方式" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.leaseUserPhone }}</view>
        </uni-form-item>
        <uni-form-item label="租赁开始时间" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.leaseStartTime | formatData }}</view>
        </uni-form-item>
        <uni-form-item label="租赁结束时间" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.leaseEndTime | formatData }}</view>
        </uni-form-item>
        <uni-form-item label="租赁总期限（天）" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.leasePeriod }}</view>
        </uni-form-item>
      </uni-card>
      <view class="card-title-outer">
        <view class="title">租赁明细</view>
      </view>
      <uni-card>
        <block v-for="(item, index) in baseInfo.details || []" :key="index">
          <view v-if="index > 0" class="line"></view>
          <uni-form-item label="序号" :border="false" align="left">
            <view class="placeholder">{{ index + 1 > 9 ? index + 1 : '0' + (index + 1) }}</view>
          </uni-form-item>
          <uni-form-item label="设备名称" :border="false" align="left">
            <view class="placeholder">{{ item.name }}</view>
          </uni-form-item>
          <uni-form-item label="规格型号" :border="false" align="left">
            <view class="placeholder">{{ item.models }}</view>
          </uni-form-item>
          <uni-form-item label="租赁数量" :border="false" align="left">
            <view class="placeholder">{{ item.number }}</view>
          </uni-form-item>
          <uni-form-item label="单位" :border="false" align="left">
            <view class="placeholder">{{ item.unit }}</view>
          </uni-form-item>
          <uni-form-item label="设备类别" :border="false" align="left">
            <view>{{
              ['特种设备', '监测设备', '起重机械', '基础设备', '办公设备', '其他'][Number(item.type) + 1]
            }}</view>
          </uni-form-item>
          <uni-form-item label="生产厂家" :border="false" align="left">
            <view class="placeholder">{{ item.manufacturer }}</view>
          </uni-form-item>
          <uni-form-item label="供应商" :border="false" align="left">
            <view class="placeholder">{{ item.supplier }}</view>
          </uni-form-item>
          <uni-form-item label="租赁押金" :border="false" align="left">
            <view class="placeholder">{{ item.rentDeposit }}</view>
          </uni-form-item>
          <uni-form-item label="租赁期限" :border="false" align="left">
            <view class="placeholder">{{ item.rentTime }}</view>
          </uni-form-item>
          <uni-form-item label="租赁租金" :border="false" align="left">
            <view class="placeholder">{{ item.rentReprises }}</view>
          </uni-form-item>
          <block v-if="baseInfo.status >= 5">
            <uni-form-item label="到货数量" :border="false" align="left">
              <view class="placeholder">{{ item.arrivalNumber }}</view>
            </uni-form-item>
            <uni-form-item label="可入库量" :border="false" align="left">
              <view class="placeholder">{{ item.enableInputNumber }}</view>
            </uni-form-item>
          </block>
          <block v-if="baseInfo.status >= 6">
            <uni-form-item label="检定验收结果" :border="false" align="left">
              <view class="placeholder">{{ item.acceptResult }}</view>
            </uni-form-item>
            <uni-form-item label="检定验收单位" :border="false" align="left">
              <view class="placeholder">{{ item.acceptUnit }}</view>
            </uni-form-item>
            <uni-form-item label="检定验收内容" :border="false" align="left">
              <view class="placeholder">{{ item.acceptContent }}</view>
            </uni-form-item>
            <uni-form-item label="检定验收时间" :border="false" align="left">
              <view class="placeholder">{{ item.acceptTime }}</view>
            </uni-form-item>
            <uni-form-item label="备注" :border="false" align="left">
              <view class="placeholder">{{ item.remark }}</view>
            </uni-form-item>
          </block>
        </block>
      </uni-card>
      <uni-card>
        <uni-form-item label="租赁总押金(￥)" :border="false" align="left">
          <view class="placeholder"> {{ baseInfo.totalDeposit }}</view>
        </uni-form-item>
        <uni-form-item label="租赁总租金(￥)" :border="false" align="left">
          <view class="placeholder"> {{ baseInfo.totalRent }}</view>
        </uni-form-item>
        <uni-form-item label="备注" :border="false" align="left">
          <view class="placeholder">{{ baseInfo.remark }}</view>
        </uni-form-item>
      </uni-card>
      <!-- 入库人信息 start -->
      <uni-card>
        <uni-form-item label="申请人" :border="false" align="left">
          <view class="placeholder"> {{ baseInfo.applicantName }}</view>
        </uni-form-item>

        <uni-form-item label="申请时间" :border="false" align="left">
          <view class="placeholder">{{ (baseInfo.applyTime || '') | formatData }}</view>
        </uni-form-item>
      </uni-card>

      <uni-card v-if="baseInfo.status >= 5">
        <uni-form-item label="到货确认人" :border="false" align="left">
          <view class="placeholder"> {{ baseInfo.arrivalPersonName }}</view>
        </uni-form-item>

        <uni-form-item label="到货确认时间" :border="false" align="left">
          <view class="placeholder">{{ (baseInfo.arrivalDate || '') | formatData }}</view>
        </uni-form-item>
      </uni-card>
      <!--到货确认人 end-->
      <!--鉴定验收人 start-->
      <uni-card v-if="baseInfo.status >= 6">
        <uni-form-item label="鉴定验收人" :border="false" align="left">
          <view class="placeholder"> {{ baseInfo.acceptName }}</view>
        </uni-form-item>

        <uni-form-item label="鉴定验收时间" :border="false" align="left">
          <view class="placeholder">{{ (baseInfo.acceptDate || '') | formatData }}</view>
        </uni-form-item>
      </uni-card>
      <!--鉴定验收人 end-->
      <!--入库人 start-->
      <uni-card v-if="baseInfo.status >= 7">
        <uni-form-item label="入库人" :border="false" align="left">
          <view class="placeholder"> {{ baseInfo.inventoryPersonName }}</view>
        </uni-form-item>
        <uni-form-item label="入库时间" :border="false" align="left">
          <view class="placeholder">{{ (baseInfo.inventoryDate || '') | formatData }}</view>
        </uni-form-item>
      </uni-card>
      <!--入库人 end-->
      <!-- 审批记录 start -->
      <uni-check-detail :id="id"></uni-check-detail>
      <!-- 审批记录 end -->
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { Api } from '@/api/material/equipment/lease'
import purchaseStatus from './lib/purchaseStatus'
import _ from 'lodash'

export default {
  data() {
    return {
      id: '',
      isDraft: true, //是否草稿

      baseInfo: {},
      purchaseStatus,
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
        { name: '否', value: 2 }
      ],
      IsContinueValue: '',
      form: {
        status: '',
        optionContent: '',
        reviewerName: ''
      },
      // personRules: {
      //   nextPerson: {
      //     required: true
      //   }
      // },
      subRules: {
        arrivalNumber: {
          required: true
        },
        enableInputNumber: {
          required: true
        },
        acceptResult: {
          required: true
        },
        acceptContent: {
          required: true
        },
        acceptTime: {
          required: true
        },
        acceptUnit: {
          required: true
        }
      },
      rules: {
        status: { required: true }
      },
      //检查结果是否合格
      IsCheckText: '',
      //检查结果是否继续
      IsContinueText: ''
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

  onReady() {
    // 非草稿状态隐藏顶部更多操作
    // #ifdef  APP-PLUS
    if (!this.isDraft) {
      let webView = this.$mp.page.$getAppWebview()
      webView.setTitleNViewButtonStyle(0, {
        text: '',
        fontSize: 0
      })
    }
    // #endif
  },

  onNavigationBarButtonTap(obj) {
    if (obj.type === 'menu' && this.isDraft) {
      this.showMenu()
    }
  },
  methods: {
    init() {
      // 通过请求获取材料详情
      Api.getLeaseDetail(this.id).then(res => {
        this.baseInfo = res.data || {}

        //计算采购金额
        let totalPrice = 0
        const base = 1000 //用来避免小数计算产生异常
        if (this.baseInfo) {
          _.forEach(this.baseInfo.details, item => {
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
