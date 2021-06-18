<template>
  <view class="main">
    <scroll-view class="scroll-roll" scroll-y>
      <view class="main-body">
        <!--到货通知信息 显示 start-->
        <block v-if="baseInfo.status === 4 && baseInfo.currentPersonId === $store.state.user.userId">
          <uni-card>
            <uni-form-custom ref="formPerson" :model="form" :rules="personRules">
              <uni-form-item label="指定入库人" isLink isRequired prop="nextPersonName">
                <uni-select-user v-model="form.nextPersonId" :name.sync="form.nextPersonName" placeholder="请选择" />
              </uni-form-item>
            </uni-form-custom>
          </uni-card>
          <br />
        </block>
        <!--到货通知信息 信息 显示 end-->

        <view v-if="baseInfo.status !== 1 && baseInfo.status !== 0" class="card-title-info">
          <view class="title">审核信息</view>
        </view>
        <uni-card>
          <uni-form-item label="采购单编号" :border="false" align="left">
            <view>{{ baseInfo.code }}</view>
          </uni-form-item>
          <uni-form-item label="" style="margin: 0 0 -15px 0; padding-bottom: 0">
            <view v-if="baseInfo.status >= 0">
              <span class="circle" :style="{ backgroundColor: purchaseStatus[baseInfo.status].color }"></span
              >{{ purchaseStatus[baseInfo.status].label }}
            </view>
          </uni-form-item>
          <uni-form-item label="申请到货时间" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.appyArrivalTime | formatData }}</view>
          </uni-form-item>
          <uni-form-item label="申请部门" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.applyDepartmentName }}</view>
          </uni-form-item>
          <uni-form-item label="申请原因" :border="false" align="left">
            <view class="placeholder">{{ baseInfo.applyReason }}</view>
          </uni-form-item>
        </uni-card>
        <view class="card-title-outer">
          <view class="title">采购明细</view>
        </view>
        <uni-card>
          <block v-for="(item, index) in baseInfo.detailList || []" :key="index">
            <view v-if="index > 0" class="line"></view>
            <uni-form-item label="序号" :border="false" align="left">
              <view class="placeholder">{{ index + 1 > 9 ? index + 1 : '0' + (index + 1) }}</view>
            </uni-form-item>
            <uni-form-item label="材料编码" :border="false" align="left">
              <view class="placeholder">{{ item.materialCode || item.code }}</view>
            </uni-form-item>
            <uni-form-item label="材料名称" :border="false" align="left">
              <view class="placeholder">{{ item.materialName || item.name }}</view>
            </uni-form-item>
            <uni-form-item label="规格型号" :border="false" align="left">
              <view class="placeholder">{{ item.materialModels || item.models }}</view>
            </uni-form-item>
            <uni-form-item label="单位" :border="false" align="left">
              <view class="placeholder">{{ item.materialUnit || item.unit }}</view>
            </uni-form-item>
            <uni-form-item label="品牌" :border="false" align="left">
              <view class="placeholder">{{ item.materialBrand || item.brand }}</view>
            </uni-form-item>
            <uni-form-item label="供应商" :border="false" align="left">
              <view class="placeholder">{{ item.materialSupplier || item.supplier }}</view>
            </uni-form-item>
            <uni-form-item label="库存量" :border="false" align="left">
              <view class="placeholder">{{ item.materialInventoryNumber || item.inventoryNumber || 0 }}</view>
            </uni-form-item>
            <uni-form-item label="申请采购数量" :border="false" align="left">
              <view class="placeholder">{{ item.number }}</view>
            </uni-form-item>
            <uni-form-item label="单价" :border="false" align="left">
              <view class="placeholder">{{ item.univalence }}</view>
            </uni-form-item>
            <uni-form-item label="合价" :border="false" align="left">
              <view class="placeholder">{{ item.combinedPrice }}</view>
            </uni-form-item>
            <block v-if="baseInfo.status === 5 || baseInfo.status === 6">
              <uni-form-item label="到货数量" :border="false" align="left">
                <view class="placeholder">{{ item.arrivalNumber }}</view>
              </uni-form-item>
              <uni-form-item label="可入库量" :border="false" align="left">
                <view class="placeholder">{{ item.enableInputNumber }}</view>
              </uni-form-item>
              <uni-form-item label="备注" :border="false" align="left">
                <view class="placeholder">{{ item.remark }}</view>
              </uni-form-item>
            </block>
            <!--采购中 显示 start-->
            <block v-if="baseInfo.status === 4 && baseInfo.currentPersonId === $store.state.user.userId">
              <uni-form-custom :ref="item.id" :model="item" :rules="subRules" class="border-top">
                <uni-card isForm style="border: 0; border-radius: 0; width: 345px">
                  <uni-form-item label="到货数量" isRequired prop="arrivalNumber">
                    <input v-model.number="item.arrivalNumber" class="uni-input" placeholder="点击输入" type="number" />
                  </uni-form-item>
                  <uni-form-item label="可入库量" isRequired prop="enableInputNumber">
                    <input
                      v-model.number="item.enableInputNumber"
                      class="uni-input"
                      placeholder="点击输入"
                      type="number"
                    />
                  </uni-form-item>
                  <uni-form-item label="备注" align="right">
                    <textarea v-model.trim="item.remark" :maxlength="-1" placeholder="请输入" auto-height />
                  </uni-form-item>
                </uni-card>
              </uni-form-custom>
            </block>
            <!--采购中 显示 end-->
          </block>
        </uni-card>
        <!-- 备注信息 start -->
        <uni-card>
          <uni-form-item label="采购金额(￥)" :border="false" align="left">
            <view class="placeholder"> {{ totalPrice }}</view>
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
        <block v-if="baseInfo.status !== 1 && baseInfo.status !== 0">
          <uni-card title="审核结果">
            <uni-form-item label="审核结果" :border="false">
              <view>{{ ['不通过', '通过'][baseInfo.auditStatus] }}</view>
              <!--              <view v-if="baseInfo.status">{{ // baseInfo.status===2?:"" }}</view>-->
            </uni-form-item>
            <!--            <uni-form-item label="备注" :border="false">-->
            <!--              <view>{{ baseInfo.taskRemark }}</view>-->
            <!--            </uni-form-item>-->
            <!--            <uni-form-item label="附件" :border="false">-->
            <!--              <uni-attachment v-model="baseInfo.reviewFileId"></uni-attachment>-->
            <!--            </uni-form-item>-->
            <uni-form-item label="审核人" :border="false">{{ baseInfo.firstAuditPersonName }}</uni-form-item>
            <uni-form-item label="审核意见">
              <view>{{ baseInfo.auditOpinion }}</view>
            </uni-form-item>
            <uni-form-item label="审核日期" :border="false">
              <view>{{ baseInfo.auditTime | ymd }}</view>
            </uni-form-item>
          </uni-card>
        </block>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { Api } from '@/api/material/purchaseOrder'
import purchaseStatus from './lib/purchaseStatus'
import _ from 'lodash'
import moment from 'moment'

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
        { name: '通过', value: 1 },
        { name: '驳回', value: 0 }
      ],
      //是否继续
      IsContinue: [
        { name: '是', value: 1 },
        { name: '否', value: 0 }
      ],
      form: {
        IsContinueValue: '',
        auditStatus: '',
        auditOpinion: '',
        auditTime: moment().format('YYYY-MM-DD')
      },
      personRules: {
        nextPersonName: {
          required: true
        }
      },
      rules: {
        auditTime: { required: true },
        nextPersonId: { required: true },
        auditStatus: { required: true }
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
    console.log(this.isDraft)
    if (obj.type === 'menu' && this.isDraft === true) {
      this.showMenu()
    }
  },
  methods: {
    init() {
      // 通过请求获取材料详情
      Api.getPurchaseOrderDetail(this.id).then(res => {
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
