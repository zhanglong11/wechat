<template>
  <view class="main">
    <scroll-view class="scroll-roll" scroll-y>
      <view class="main-body">
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
            <!-- <view class="placeholder">采购入库</view> -->
            <view class="placeholder">{{ baseInfo.appyArrivalTime | formatData }}</view>
          </uni-form-item>
          <uni-form-item label="申请部门" :border="false" align="left">
            <!-- <view class="placeholder">采购入库</view> -->
            <view class="placeholder">{{ baseInfo.applyDepartmentName }}</view>
          </uni-form-item>
          <uni-form-item label="申请原因" :border="false" align="left">
            <!-- <view class="placeholder">采购入库</view> -->
            <view class="placeholder">{{ baseInfo.applyReason }}</view>
          </uni-form-item>
          <uni-form-item label="使用位置" :border="false" align="left">
            <!-- <view class="placeholder">采购入库</view> -->
            <view class="placeholder">{{ baseInfo.usePart }}</view>
          </uni-form-item>
          <uni-form-item label="设备使用人" :border="false" align="left">
            <!-- <view class="placeholder">采购入库</view> -->
            <view class="placeholder">{{ baseInfo.userName }}</view>
          </uni-form-item>
          <uni-form-item label="设备使用部门" :border="false" align="left">
            <!-- <view class="placeholder">采购入库</view> -->
            <view class="placeholder">{{ baseInfo.useCompanyName }}</view>
          </uni-form-item>
        </uni-card>
        <!--采购中 显示 start-->
        <!--        <block v-if="baseInfo.status === 4">-->
        <!--<uni-card isForm>
            <uni-form-item label="指定到货确认人" isLink isRequired prop="consigneeId">
              <uni-select-user v-model="form.consigneeId" :name.sync="form.consigneeName" placeholder="请选择" />
            </uni-form-item>
          </uni-card>-->
        <!--        </block>-->
        <!--采购中 显示 end-->
        <view class="card-title-outer">
          <view class="title">采购明细</view>
        </view>
        <uni-card>
          <block v-for="(item, index) in baseInfo.purchaseDetails || []" :key="index">
            <view v-if="index > 0" class="line"></view>
            <uni-form-item label="序号" :border="false" align="left">
              <view class="placeholder">{{ index + 1 > 9 ? index + 1 : '0' + (index + 1) }}</view>
            </uni-form-item>
            <uni-form-item label="设备名称" :border="false" align="left">
              <view class="placeholder">{{ item.name }}</view>
            </uni-form-item>
            <uni-form-item label="设备类型" :border="false" align="left">
              <view class="placeholder">{{ $getLabel(equipmentType, item.type) }}</view>
            </uni-form-item>
            <uni-form-item label="规格型号" :border="false" align="left">
              <view class="placeholder">{{ item.models }}</view>
            </uni-form-item>
            <uni-form-item label="单位" :border="false" align="left">
              <view class="placeholder">{{ item.materialUnit || item.unit }}</view>
            </uni-form-item>
            <uni-form-item label="生产厂家" :border="false" align="left">
              <view class="placeholder">{{ item.manufacturer }}</view>
            </uni-form-item>
            <uni-form-item label="供应商" :border="false" align="left">
              <view class="placeholder">{{ item.materialSupplier || item.supplier }}</view>
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
      </view>
      <!-- 审批记录 start -->
      <uni-check-detail :id="id"></uni-check-detail>
      <!-- 审批记录 end -->
    </scroll-view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import Api from '@/api/equipmentPurchase'
import purchaseStatus from './lib/purchaseStatus'
import equipmentType from './lib/equipmentType'
import _ from 'lodash'

export default {
  data() {
    return {
      id: '',
      isDraft: true, //是否草稿

      baseInfo: {},
      purchaseStatus,
      equipmentType,
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
      form: {
        nextPerson: '',
        IsContinueValue: '',
        auditStatus: '',
        auditOpinion: '',
        optionContent: ''
      },
      rules: {
        status: { required: true }
      },
      personRules: {
        nextPerson: {
          required: true
        }
      },
      subRules: {
        arrivalNumber: {
          required: true
        },
        enableInputNumber: {
          required: true
        }
      },
      //鉴定验收验证
      subRules5: {
        acceptUnit: {
          required: true
        },
        acceptContent: {
          required: true
        },
        acceptTime: {
          required: true
        }
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
  methods: {
    init() {
      console.log(999)
      // 通过请求获取设备详情
      Api.getEquipmentPurchaseOrderDetail(this.id).then(res => {
        this.baseInfo = res.data || {}
        //计算采购金额
        let totalPrice = 0
        const base = 1000 //用来避免小数计算产生异常
        if (this.baseInfo) {
          _.forEach(this.baseInfo.purchaseDetails, item => {
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
